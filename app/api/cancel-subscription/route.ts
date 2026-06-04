import Stripe from 'stripe';
import { Resend } from 'resend';
import { createServerSupabase } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM_ADDRESS = 'InnerScore <reports@innerscore.es>';
const SUPPORT_ADDRESS = 'support@innerscore.es';

export async function POST() {
  try {
    console.log('[cancel-subscription] PATH=start');

    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      console.log('[cancel-subscription] PATH=unauthenticated');
      return Response.json({ ok: false, error: 'No autenticado' }, { status: 401 });
    }

    const email = user.email;
    console.log('[cancel-subscription] PATH=authenticated', { email });

    // 1. Try to locate the customer in Stripe by email.
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0];

    let mode: 'stripe' | 'support-email' = 'support-email';

    if (customer) {
      console.log('[cancel-subscription] PATH=customer-found', {
        customerId: customer.id,
      });

      // 2. List active or trialing subscriptions.
      const [activeSubs, trialingSubs] = await Promise.all([
        stripe.subscriptions.list({
          customer: customer.id,
          status: 'active',
          limit: 10,
        }),
        stripe.subscriptions.list({
          customer: customer.id,
          status: 'trialing',
          limit: 10,
        }),
      ]);

      const subs = [...activeSubs.data, ...trialingSubs.data];
      console.log('[cancel-subscription] PATH=subscriptions-listed', {
        count: subs.length,
      });

      if (subs.length > 0) {
        // 3. Cancel at period end so the user keeps access until the period ends.
        for (const sub of subs) {
          console.log('[cancel-subscription] PATH=cancel-at-period-end', {
            subscriptionId: sub.id,
          });
          await stripe.subscriptions.update(sub.id, {
            cancel_at_period_end: true,
          });
        }
        mode = 'stripe';
      }
    } else {
      console.log('[cancel-subscription] PATH=customer-not-found');
    }

    // 4. If no subscription was found, send a manual cancellation request to support.
    if (mode === 'support-email') {
      console.log('[cancel-subscription] PATH=sending-support-email');
      const { error: emailError } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: [SUPPORT_ADDRESS],
        subject: 'Solicitud de cancelación manual',
        text: `Un usuario ha solicitado la cancelación de su suscripción y no se ha encontrado ninguna suscripción activa en Stripe.\n\nEmail del usuario: ${email}\n\nPor favor, gestiona la cancelación manualmente.`,
      });
      if (emailError) {
        console.error('[cancel-subscription] PATH=support-email-failed', emailError);
        return Response.json(
          { ok: false, error: emailError.message },
          { status: 500 },
        );
      }
      console.log('[cancel-subscription] PATH=support-email-sent');
    }

    // 5. Always mark the purchases row(s) as cancelled. Failure is non-fatal.
    try {
      const { error: updErr } = await supabaseAdmin
        .from('purchases')
        .update({ cancelled_at: new Date().toISOString() })
        .eq('email', email);
      if (updErr) {
        console.error('[cancel-subscription] PATH=purchases-update-failed', updErr);
      } else {
        console.log('[cancel-subscription] PATH=purchases-updated');
      }
    } catch (err) {
      console.error('[cancel-subscription] PATH=purchases-update-exception', err);
    }

    console.log('[cancel-subscription] PATH=success', { mode });
    return Response.json({ ok: true, mode });
  } catch (err) {
    console.error('[cancel-subscription] PATH=unexpected-error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
