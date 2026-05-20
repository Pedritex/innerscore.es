import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pi = url.searchParams.get('pi');

    if (!pi) {
      return Response.json({ error: 'Falta el pago principal' }, { status: 400 });
    }

    const mainPi = await stripe.paymentIntents.retrieve(pi);
    if (mainPi.status !== 'succeeded') {
      return Response.json(
        { error: 'El pago principal no está confirmado' },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from('upsell_purchases')
      .select('upsell_slot, amount_cents, currency, stripe_payment_intent_id')
      .eq('main_payment_intent_id', pi)
      .order('upsell_slot', { ascending: true });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({
      main: {
        amountCents: mainPi.amount,
        currency: mainPi.currency,
        email: mainPi.metadata?.email ?? mainPi.receipt_email ?? null,
      },
      upsells: data ?? [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    return Response.json({ error: message }, { status: 400 });
  }
}
