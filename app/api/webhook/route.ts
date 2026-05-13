import { after } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

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
    const { data: existing, error: lookupError } = await supabaseAdmin
      .from('purchases')
      .select('id')
      .eq('stripe_session_id', stripeId)
      .maybeSingle();

    if (lookupError) {
      return { error: lookupError.message };
    }

    if (existing) {
      return {};
    }

    const answers = metadata.answers ? JSON.parse(metadata.answers) : [];
    const result = metadata.result ? JSON.parse(metadata.result) : null;

    const { error } = await supabaseAdmin.from('purchases').insert({
      email: metadata.email,
      stripe_session_id: stripeId,
      answers,
      result,
      report_sent: false,
    });

    if (error) {
      return { error: error.message };
    }

    after(() => runReportPipeline(metadata.email, answers, result));
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
      body: JSON.stringify({ email, reportText }),
    });

    if (!sendRes.ok) {
      const errBody = await sendRes.json().catch(() => ({}));
      console.error('[webhook] send-report failed', sendRes.status, errBody);
    }
  } catch (err) {
    console.error('[webhook] report pipeline error:', err);
  }
}
