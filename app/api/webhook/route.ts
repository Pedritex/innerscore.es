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
    const result = await ensureRow(session.id, session.metadata ?? {});
    if (result.error) {
      return Response.json({ error: result.error }, { status: 400 });
    }
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as Stripe.PaymentIntent;
    // Skip non-main intents (e.g. upsell charges).
    if (intent.metadata?.kind && intent.metadata.kind !== 'main') {
      return Response.json({ received: true }, { status: 200 });
    }
    const result = await ensureRow(intent.id, intent.metadata ?? {});
    if (result.error) {
      return Response.json({ error: result.error }, { status: 400 });
    }
  }

  return Response.json({ received: true }, { status: 200 });
}

// The report is no longer dispatched here. Report generation runs when the
// user reaches /upsell/resumen via /api/dispatch-report. This handler only
// ensures a purchases row exists as a safety net in case the upfront insert
// in /api/create-payment-intent didn't land.
async function ensureRow(
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

    const email = metadata.email;
    if (!email) {
      return { error: 'No purchase row and no email in metadata' };
    }

    const { error: insertError } = await supabaseAdmin
      .from('purchases')
      .insert({
        email,
        stripe_session_id: stripeId,
        answers: [],
        result: null,
        report_sent: false,
      });

    if (insertError) {
      return { error: insertError.message };
    }

    return {};
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Database error',
    };
  }
}
