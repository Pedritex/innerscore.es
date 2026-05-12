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
    const metadata = session.metadata ?? {};

    try {
      const { data: existing, error: lookupError } = await supabaseAdmin
        .from('purchases')
        .select('id')
        .eq('stripe_session_id', session.id)
        .maybeSingle();

      if (lookupError) {
        return Response.json({ error: lookupError.message }, { status: 400 });
      }

      if (existing) {
        return Response.json({ received: true }, { status: 200 });
      }

      const answers = metadata.answers ? JSON.parse(metadata.answers) : [];
      const result = metadata.result ? JSON.parse(metadata.result) : null;

      const { error } = await supabaseAdmin.from('purchases').insert({
        email: metadata.email,
        stripe_session_id: session.id,
        answers,
        result,
        report_sent: false,
      });

      if (error) {
        return Response.json({ error: error.message }, { status: 400 });
      }

      after(() => runReportPipeline(metadata.email, answers, result));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Database error';
      return Response.json({ error: message }, { status: 400 });
    }
  }

  return Response.json({ received: true }, { status: 200 });
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
