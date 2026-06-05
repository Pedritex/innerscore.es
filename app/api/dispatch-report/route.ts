import { randomBytes, randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { getArchetypePdfPath } from '@/lib/archetype-pdf';

export const maxDuration = 60;

const SYMBOLS = '!@#$%';
const ALPHANUM = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const FROM_ADDRESS = 'InnerScore <reports@innerscore.es>';
const SUBJECT = 'Tu informe de Inteligencia Emocional está listo';
const resend = new Resend(process.env.RESEND_API_KEY!);

function generateTempPassword(): string {
  const bytes = randomBytes(8);
  const chars: string[] = [];
  for (let i = 0; i < 7; i++) {
    chars.push(ALPHANUM[bytes[i] % ALPHANUM.length]);
  }
  chars.push(SYMBOLS[bytes[7] % SYMBOLS.length]);
  return chars.join('');
}

function resolveBaseUrl(request: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL;
  if (fromEnv && fromEnv.length > 0) return fromEnv;
  try {
    return new URL(request.url).origin;
  } catch {
    return 'https://innerscore.es';
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fmtDate(d: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

function renderEmail(args: {
  email: string;
  tempPassword: string | null;
  magicLinkUrl: string;
  membersUrl: string;
  purchasedAt: Date;
}): string {
  const { email, tempPassword, magicLinkUrl, membersUrl, purchasedAt } = args;
  const greetingName = email.split('@')[0];
  const renewalDate = new Date(purchasedAt.getTime() + 7 * 24 * 60 * 60 * 1000);

  const credentialsBlock = tempPassword
    ? `
      <p style="margin: 24px 0 12px; color: #0f172a;">Tu acceso al área de miembros:</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin: 0 0 16px; background: #fdf6f0; border: 1px solid #e8d5c8; border-radius: 12px;">
        <tr>
          <td style="padding: 14px 18px; color: #64748b; font-size: 13px; width: 150px;">Email</td>
          <td style="padding: 14px 18px; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="padding: 14px 18px; color: #64748b; font-size: 13px; border-top: 1px solid #e8d5c8;">Contraseña provisional</td>
          <td style="padding: 14px 18px; color: #0f172a; font-size: 14px; font-weight: 600; font-family: 'SF Mono', Menlo, monospace; border-top: 1px solid #e8d5c8;">${escapeHtml(tempPassword)}</td>
        </tr>
      </table>`
    : '';

  const magicBlock = magicLinkUrl
    ? `
      <p style="margin: 18px 0 8px; color: #64748b; font-size: 13px;">O accede directamente sin contraseña (válido 24h):</p>
      <p style="margin: 0 0 24px;">
        <a href="${escapeHtml(magicLinkUrl)}" style="color: #1d4ed8; text-decoration: underline; font-size: 13px; word-break: break-all;">${escapeHtml(magicLinkUrl)}</a>
      </p>`
    : '';

  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><title>Tu informe InnerScore</title></head>
<body style="margin: 0; padding: 0; background: #fdf6f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background: #fdf6f0;">
    <tr><td align="center" style="padding: 32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 580px; width: 100%; background: #ffffff; border: 1px solid #e8d5c8; border-radius: 16px; overflow: hidden;">
        <tr><td style="padding: 28px 32px 0; text-align: center; font-size: 20px;">
          <span style="font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-weight: 700; color: #0f172a;">Inner</span><span style="font-weight: 600; color: #1d4ed8;">Score</span>
        </td></tr>

        <tr><td style="padding: 28px 32px 8px;">
          <h1 style="margin: 0 0 12px; font-size: 22px; line-height: 1.3; color: #0f172a;">Hola, ${escapeHtml(greetingName)}:</h1>
          <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #0f172a;">Tu informe de IE está listo. Puedes descargarlo adjunto a este correo.</p>
        </td></tr>

        <tr><td style="padding: 12px 32px 8px; text-align: center;">
          <a href="${escapeHtml(membersUrl)}" style="display: inline-block; padding: 14px 28px; background: #1d4ed8; color: #ffffff; text-decoration: none; border-radius: 12px; font-size: 15px; font-weight: 600;">Acceder a mi área de miembros</a>
        </td></tr>

        <tr><td style="padding: 8px 32px 0;">
          ${credentialsBlock}
          ${magicBlock}
        </td></tr>

        <tr><td style="padding: 16px 32px 0;">
          <div style="height: 1px; background: #e8d5c8; margin: 8px 0 24px;"></div>
          <p style="margin: 0 0 12px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Detalles del pedido</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #64748b;">Plan</td><td style="padding: 6px 0; color: #0f172a; text-align: right;">Acceso 7 días InnerScore</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Fecha</td><td style="padding: 6px 0; color: #0f172a; text-align: right;">${fmtDate(purchasedAt)}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Importe</td><td style="padding: 6px 0; color: #0f172a; text-align: right; font-weight: 600;">1,95 €</td></tr>
          </table>
        </td></tr>

        <tr><td style="padding: 24px 32px 0;">
          <div style="background: #fdf6f0; border: 1px solid #e8d5c8; border-radius: 12px; padding: 16px 20px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #0f172a;"><strong>Renovación automática:</strong> Tu suscripción se renovará el ${fmtDate(renewalDate)} por 39,99 €/mes salvo que la canceles antes.</p>
            <p style="margin: 0; font-size: 13px; color: #64748b;">Puedes cancelar en cualquier momento desde tu área de miembros o escribiendo a <a href="mailto:support@innerscore.es" style="color: #1d4ed8;">support@innerscore.es</a>.</p>
          </div>
        </td></tr>

        <tr><td style="padding: 24px 32px 28px;">
          <p style="margin: 0; font-size: 14px; color: #0f172a;">Un abrazo,</p>
          <p style="margin: 4px 0 0; font-size: 14px; color: #0f172a; font-weight: 600;">Equipo de InnerScore</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(request: Request) {
  const t0 = Date.now();
  try {
    const rawBody = await request.json().catch((err) => {
      console.error('[dispatch-report] JSON parse failed', err);
      return null;
    });
    const pi = rawBody?.pi;
    console.log('[dispatch-report] received', {
      pi,
      piType: typeof pi,
      piLength: typeof pi === 'string' ? pi.length : null,
    });
    if (!pi || typeof pi !== 'string') {
      console.warn('[dispatch-report] PATH=invalid-pi → 400');
      return Response.json(
        { error: 'Falta el identificador del pago' },
        { status: 400 },
      );
    }

    const { data: row, error: lookupError } = await supabaseAdmin
      .from('purchases')
      .select('id, email, result, report_sent, temp_password, stripe_session_id')
      .eq('stripe_session_id', pi)
      .maybeSingle();

    if (lookupError) {
      console.error('[dispatch-report] PATH=lookup-error → 500', lookupError);
      return Response.json({ error: lookupError.message }, { status: 500 });
    }
    if (!row) {
      console.warn('[dispatch-report] PATH=no-row → 404 for pi:', pi);
      return Response.json(
        { error: 'No se encontró el pedido' },
        { status: 404 },
      );
    }
    console.log('[dispatch-report] row found', {
      id: row.id,
      email: row.email,
      stripeIdsMatch: row.stripe_session_id === pi,
      report_sent: row.report_sent,
      hasTempPassword: Boolean(row.temp_password),
      hasResult: row.result !== null && row.result !== undefined,
    });

    if (row.report_sent === true) {
      console.log('[dispatch-report] PATH=already-sent → 200 alreadySent:true');
      return Response.json({ success: true, alreadySent: true });
    }
    console.log('[dispatch-report] PATH=proceeding-to-pipeline');

    // ── Resolve archetype → PDF file ─────────────────────────────────────
    const archetype: string =
      (row.result && typeof row.result === 'object' && 'archetype' in row.result
        ? (row.result as { archetype: string }).archetype
        : '') || 'El Observador';
    const pdfFilename = getArchetypePdfPath(archetype);
    const pdfPath = join(process.cwd(), 'public', 'reports', pdfFilename);
    let pdfBuffer: Buffer;
    try {
      pdfBuffer = readFileSync(pdfPath);
      console.log('[dispatch-report] loaded PDF', {
        archetype,
        pdfFilename,
        bytes: pdfBuffer.length,
      });
    } catch (err) {
      console.error(
        '[dispatch-report] PATH=pdf-read-failed → 500',
        pdfPath,
        err,
      );
      return Response.json(
        { error: 'No se pudo leer el informe', step: 'pdf-read' },
        { status: 500 },
      );
    }

    // ── Ensure auth user (idempotent) ───────────────────────────────────
    let tempPassword: string | null = row.temp_password;
    if (!tempPassword) {
      const candidate = generateTempPassword();
      console.log('[dispatch-report] creating auth user for', row.email);
      let createError: unknown = null;
      try {
        const { error } = await supabaseAdmin.auth.admin.createUser({
          email: row.email,
          password: candidate,
          email_confirm: true,
          user_metadata: { source: 'innerscore-purchase' },
        });
        createError = error;
      } catch (thrown) {
        createError = thrown;
      }
      if (createError) {
        const errObj = createError as {
          code?: string;
          status?: number;
          message?: string;
          name?: string;
        };
        console.error(
          '[dispatch-report] auth.createUser failed (ignored, continuing)',
          {
            code: errObj.code,
            status: errObj.status,
            name: errObj.name,
            message: errObj.message,
          },
        );
        tempPassword = null;
      } else {
        tempPassword = candidate;
        console.log('[dispatch-report] saving temp_password on purchase row');
        const { error: pwSaveError } = await supabaseAdmin
          .from('purchases')
          .update({ temp_password: candidate })
          .eq('id', row.id);
        if (pwSaveError) {
          console.error(
            '[dispatch-report] failed to save temp_password',
            pwSaveError,
          );
        }
      }
    } else {
      console.log('[dispatch-report] reusing existing temp_password from row');
    }
    console.log('[dispatch-report] PATH=auth-step-done', {
      hasTempPassword: Boolean(tempPassword),
    });

    // ── Magic link token ────────────────────────────────────────────────
    const magicToken = randomUUID();
    const baseUrl = resolveBaseUrl(request);
    const magicLinkUrl = `${baseUrl}/api/magic-link?token=${magicToken}`;
    const membersUrl = `${baseUrl}/members`;

    const { error: linkError } = await supabaseAdmin
      .from('magic_links')
      .insert({ token: magicToken, email: row.email });
    if (linkError) {
      console.error('[dispatch-report] magic_links insert failed', linkError);
      // Non-fatal: the buyer can still log in with the temp password.
      // We omit the magic link in the email body if it failed to persist.
    }

    // ── Send email via Resend ────────────────────────────────────────────
    if (!process.env.RESEND_API_KEY) {
      console.error('[dispatch-report] PATH=missing-resend-key → 500');
      return Response.json(
        { error: 'Missing RESEND_API_KEY' },
        { status: 500 },
      );
    }
    const purchasedAt = new Date();
    const html = renderEmail({
      email: row.email,
      tempPassword,
      magicLinkUrl: linkError ? '' : magicLinkUrl,
      membersUrl,
      purchasedAt,
    });

    // Attachment filename uses the archetype slug from the PDF filename
    // (e.g. "el-ancla") for predictability.
    const archetypeSlug =
      pdfFilename.replace(/^informe-/, '').replace(/\.pdf$/, '') ||
      'innerscore';
    const attachmentName = `informe-innerscore-${archetypeSlug}.pdf`;

    console.log('[dispatch-report] calling Resend');
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [row.email],
      subject: SUBJECT,
      html,
      attachments: [{ filename: attachmentName, content: pdfBuffer }],
    });

    if (emailError) {
      console.error(
        '[dispatch-report] PATH=resend-rejected → 500',
        emailError,
      );
      return Response.json(
        { error: emailError.message, step: 'resend' },
        { status: 500 },
      );
    }
    console.log(
      '[dispatch-report] PATH=email-sent t+',
      Date.now() - t0,
      'ms; resend id:',
      emailData?.id,
    );

    // ── Only now mark report_sent = true ─────────────────────────────────
    const { error: flagError } = await supabaseAdmin
      .from('purchases')
      .update({ report_sent: true })
      .eq('id', row.id);
    if (flagError) {
      console.error(
        '[dispatch-report] could not flip report_sent (email already sent)',
        flagError,
      );
    }

    console.log(
      '[dispatch-report] PATH=success t+',
      Date.now() - t0,
      'ms for',
      row.email,
    );
    return Response.json({ success: true, alreadySent: false });
  } catch (err) {
    console.error(
      '[dispatch-report] PATH=unexpected-exception → 500 t+',
      Date.now() - t0,
      'ms',
      err,
    );
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
