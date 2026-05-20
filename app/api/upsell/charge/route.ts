import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const SLOT_TO_PRICE_ENV: Record<number, string> = {
  1: 'STRIPE_UPSELL_1_PRICE',
  2: 'STRIPE_UPSELL_2_PRICE',
  3: 'STRIPE_UPSELL_3_PRICE',
};

export async function POST(request: Request) {
  try {
    const { pi, slot } = await request.json();

    if (!pi || typeof pi !== 'string') {
      return Response.json(
        { error: 'Falta el identificador del pago principal' },
        { status: 400 },
      );
    }

    if (typeof slot !== 'number' || ![1, 2, 3].includes(slot)) {
      return Response.json({ error: 'Slot inválido' }, { status: 400 });
    }

    const priceEnvKey = SLOT_TO_PRICE_ENV[slot];
    const priceId = process.env[priceEnvKey];
    if (!priceId) {
      return Response.json(
        { error: `Precio del upsell ${slot} no configurado` },
        { status: 500 },
      );
    }

    const { data: existing } = await supabaseAdmin
      .from('upsell_purchases')
      .select('id, stripe_payment_intent_id, amount_cents, currency')
      .eq('main_payment_intent_id', pi)
      .eq('upsell_slot', slot)
      .maybeSingle();

    if (existing) {
      return Response.json({
        success: true,
        alreadyAdded: true,
        paymentIntentId: existing.stripe_payment_intent_id,
        amountCents: existing.amount_cents,
        currency: existing.currency,
      });
    }

    const mainPi = await stripe.paymentIntents.retrieve(pi);
    if (mainPi.status !== 'succeeded') {
      return Response.json(
        { error: 'El pago principal no se ha completado' },
        { status: 400 },
      );
    }
    if (mainPi.metadata?.kind && mainPi.metadata.kind !== 'main') {
      return Response.json({ error: 'Pago principal inválido' }, { status: 400 });
    }

    const customerId =
      typeof mainPi.customer === 'string'
        ? mainPi.customer
        : mainPi.customer?.id ?? null;
    const paymentMethodId =
      typeof mainPi.payment_method === 'string'
        ? mainPi.payment_method
        : mainPi.payment_method?.id ?? null;
    const email = mainPi.metadata?.email ?? mainPi.receipt_email ?? null;

    if (!customerId || !paymentMethodId) {
      return Response.json(
        { error: 'No hay tarjeta guardada para este cliente' },
        { status: 400 },
      );
    }

    const price = await stripe.prices.retrieve(priceId);
    if (!price.unit_amount) {
      return Response.json(
        { error: 'Precio mal configurado en Stripe' },
        { status: 500 },
      );
    }

    let upsellPi: Stripe.PaymentIntent;
    try {
      upsellPi = await stripe.paymentIntents.create({
        amount: price.unit_amount,
        currency: price.currency,
        customer: customerId,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
        receipt_email: email ?? undefined,
        description: `InnerScore — Upsell ${slot}`,
        metadata: {
          kind: 'upsell',
          slot: String(slot),
          main_payment_intent_id: pi,
          price_id: priceId,
          ...(email ? { email } : {}),
        },
      });
    } catch (err) {
      const message =
        err instanceof Stripe.errors.StripeError
          ? err.message
          : 'No se pudo completar el cobro';
      return Response.json({ error: message }, { status: 400 });
    }

    if (upsellPi.status !== 'succeeded') {
      return Response.json(
        { error: `Pago no completado (estado: ${upsellPi.status})` },
        { status: 400 },
      );
    }

    const { error: dbErr } = await supabaseAdmin
      .from('upsell_purchases')
      .insert({
        main_payment_intent_id: pi,
        upsell_slot: slot,
        stripe_payment_intent_id: upsellPi.id,
        amount_cents: price.unit_amount,
        currency: price.currency,
        email: email ?? null,
      });

    if (dbErr) {
      console.error('[upsell/charge] supabase insert error:', dbErr);
    }

    return Response.json({
      success: true,
      paymentIntentId: upsellPi.id,
      amountCents: price.unit_amount,
      currency: price.currency,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[upsell/charge] error:', err);
    return Response.json({ error: message }, { status: 400 });
  }
}
