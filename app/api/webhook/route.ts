import { after } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

export const maxDuration = 800;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return Response.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Invalid signature';
    return Response.json({ error: message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const result = await persistAndDispatch(
      session.id,
      session.metadata ?? {},
    );
    if (result.error) {
      return Response.json({ error: result.error }, { status: 400 });
    }
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as Stripe.PaymentIntent;
    // Skip non-main intents (e.g. upsell charges) so they don't kick off the report pipeline.
    if (intent.metadata?.kind && intent.metadata.kind !== 'main') {
      return Response.json({ received: true }, { status: 200 });
    }
    const result = await persistAndDispatch(
      intent.id,
      intent.metadata ?? {},
    );
    if (result.error) {
      return Response.json({ error: result.error }, { status: 400 });
    }
  }

  return Response.json({ received: true }, { status: 200 });
}

async function persistAndDispatch(
  stripeId: string,
  metadata: Record<string, string>,
): Promise<{ error?: string }> {
  try {
    let { data: row, error: lookupError } = await supabaseAdmin
      .from('purchases')
      .select('id, email, answers, result, report_sent')
      .eq('stripe_session_id', stripeId)
      .maybeSingle();

    if (lookupError) {
      return { error: lookupError.message };
    }

    // Fallback: the row should already exist (create-payment-intent inserts it),
    // but in case the upfront insert failed, create a minimal row from metadata
    // so we don't lose the dispatch entirely. Answers/result will be empty.
    if (!row) {
      const email = metadata.email;
      if (!email) {
        return { error: 'No purchase row and no email in metadata' };
      }
      const { data: inserted, error: insertError } = await supabaseAdmin
        .from('purchases')
        .insert({
          email,
          stripe_session_id: stripeId,
          answers: [],
          result: null,
          report_sent: false,
        })
        .select('id, email, answers, result, report_sent')
        .single();
      if (insertError) {
        return { error: insertError.message };
      }
      row = inserted;
    }

    if (row.report_sent) {
      return {};
    }

    // Mark as dispatched before scheduling the pipeline so duplicate webhook
    // deliveries can't double-send the report.
    const { error: updateError } = await supabaseAdmin
      .from('purchases')
      .update({ report_sent: true })
      .eq('id', row.id);
    if (updateError) {
      return { error: updateError.message };
    }

    after(() => runReportPipeline(row.email, row.answers, row.result));
    return {};
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Database error',
    };
  }
}

async function runReportPipeline(email: string, answers: unknown, result: unknown) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    console.log('Sending report to:', email);
    const genRes = await fetch(`${baseUrl}/api/generate-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, answers, result }),
    });

    if (!genRes.ok) {
      const errBody = await genRes.json().catch(() => ({}));
      console.error('[webhook] generate-report failed', genRes.status, errBody);
      return;
    }

    const { report: reportText } = await genRes.json();

    const sendRes = await fetch(`${baseUrl}/api/send-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, reportText, result }),
    });

    if (!sendRes.ok) {
      const errBody = await sendRes.json().catch(() => ({}));
      console.error('[webhook] send-report failed', sendRes.status, errBody);
    }
  } catch (err) {
    console.error('[webhook] report pipeline error:', err);
  }
}
