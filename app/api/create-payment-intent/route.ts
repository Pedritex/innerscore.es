import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { email, answers, result } = await request.json();

    if (!email || typeof email !== 'string') {
      return Response.json({ error: 'Falta el correo electrónico' }, { status: 400 });
    }

    const existing = await stripe.customers.list({ email, limit: 1 });
    const customer =
      existing.data[0] ?? (await stripe.customers.create({ email }));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 300,
      currency: 'eur',
      payment_method_types: ['card'],
      customer: customer.id,
      setup_future_usage: 'off_session',
      receipt_email: email,
      description: 'InnerScore — Informe completo de IE',
      metadata: {
        kind: 'main',
        email,
      },
    });

    // Persist quiz answers and result alongside the PI id so the webhook
    // can dispatch the report without relying on Stripe metadata (which is
    // limited to 500 chars per key — the answers JSON overflows it).
    const { error: dbErr } = await supabaseAdmin.from('purchases').insert({
      email,
      stripe_session_id: paymentIntent.id,
      answers: answers ?? [],
      result: result ?? null,
      report_sent: false,
    });

    if (dbErr) {
      console.error('[create-payment-intent] purchases insert failed:', dbErr);
    }

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 400 });
  }
}
