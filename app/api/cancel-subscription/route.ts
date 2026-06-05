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

    // 6. Confirmation email to the user and internal notification to support.
    //    Both are best-effort — the cancellation already happened upstream,
    //    so a Resend failure here is a deliverability issue, not a billing one.
    const cancelledAt = new Date();
    try {
      const { error: userEmailError } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: [email],
        subject: 'Confirmación de cancelación — InnerScore',
        html: renderCancellationConfirmation(),
      });
      if (userEmailError) {
        console.error(
          '[cancel-subscription] PATH=user-confirmation-failed',
          userEmailError,
        );
      } else {
        console.log('[cancel-subscription] PATH=user-confirmation-sent');
      }
    } catch (err) {
      console.error(
        '[cancel-subscription] PATH=user-confirmation-exception',
        err,
      );
    }

    try {
      const { error: notifyError } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: [SUPPORT_ADDRESS],
        subject: `Cancelación de suscripción — ${email}`,
        text: `El usuario ${email} ha cancelado su suscripción el ${formatSpanishDate(cancelledAt)}.`,
      });
      if (notifyError) {
        console.error(
          '[cancel-subscription] PATH=internal-notification-failed',
          notifyError,
        );
      } else {
        console.log('[cancel-subscription] PATH=internal-notification-sent');
      }
    } catch (err) {
      console.error(
        '[cancel-subscription] PATH=internal-notification-exception',
        err,
      );
    }

    console.log('[cancel-subscription] PATH=success', { mode });
    return Response.json({ ok: true, mode });
  } catch (err) {
    console.error('[cancel-subscription] PATH=unexpected-error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}

function formatSpanishDate(d: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

function renderCancellationConfirmation(): string {
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><title>Confirmación de cancelación — InnerScore</title></head>
<body style="margin: 0; padding: 0; background: #fdf6f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background: #fdf6f0;">
    <tr><td align="center" style="padding: 32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 580px; width: 100%; background: #ffffff; border: 1px solid #e8d5c8; border-radius: 16px; overflow: hidden;">
        <tr><td style="padding: 28px 32px 0; text-align: center; font-size: 20px;">
          <span style="font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-weight: 700; color: #0f172a;">Inner</span><span style="font-weight: 600; color: #1d4ed8;">Score</span>
        </td></tr>

        <tr><td style="padding: 28px 32px 8px;">
          <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #0f172a;">Estimado cliente,</p>
          <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #0f172a;">Gracias por contactarnos.</p>
          <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #0f172a;">Hemos procesado tu solicitud para cancelar la suscripción a InnerScore. Ten en cuenta que, aunque la suscripción se ha cancelado, seguirás teniendo pleno acceso a todas las funciones y ventajas del servicio hasta el final de tu período de pago actual.</p>
          <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #0f172a;">Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en contactarnos en <a href="mailto:support@innerscore.es" style="color: #1d4ed8;">support@innerscore.es</a>.</p>
        </td></tr>

        <tr><td style="padding: 12px 32px 8px; text-align: center;">
          <a href="https://innerscore.es" style="display: inline-block; padding: 14px 28px; background: #1d4ed8; color: #ffffff; text-decoration: none; border-radius: 12px; font-size: 15px; font-weight: 600;">Volver a InnerScore</a>
        </td></tr>

        <tr><td style="padding: 28px 32px;">
          <p style="margin: 0; font-size: 14px; color: #0f172a;">Atentamente,</p>
          <p style="margin: 4px 0 0; font-size: 14px; color: #0f172a; font-weight: 600;">Equipo de InnerScore</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
