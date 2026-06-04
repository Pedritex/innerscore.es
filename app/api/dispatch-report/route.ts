import { randomBytes, randomUUID } from 'node:crypto';
import { supabaseAdmin } from '@/lib/supabase';
import { runReportPipeline } from '@/lib/report-pipeline';

export const maxDuration = 800;

const SYMBOLS = '!@#$%';
const ALPHANUM = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateTempPassword(): string {
  // 8 chars: 7 alphanum (avoiding lookalikes) + 1 simple symbol.
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

export async function POST(request: Request) {
  try {
    const { pi } = await request.json();
    console.log('[dispatch-report] received pi:', pi);
    if (!pi || typeof pi !== 'string') {
      return Response.json(
        { error: 'Falta el identificador del pago' },
        { status: 400 },
      );
    }

    const { data: row, error: lookupError } = await supabaseAdmin
      .from('purchases')
      .select('id, email, answers, result, report_sent, temp_password')
      .eq('stripe_session_id', pi)
      .maybeSingle();

    if (lookupError) {
      console.error('[dispatch-report] purchases lookup error', lookupError);
      return Response.json({ error: lookupError.message }, { status: 500 });
    }
    if (!row) {
      console.warn('[dispatch-report] no purchase row for pi:', pi);
      return Response.json(
        { error: 'No se encontró el pedido' },
        { status: 404 },
      );
    }
    console.log('[dispatch-report] row found', {
      id: row.id,
      email: row.email,
      report_sent: row.report_sent,
      hasTempPassword: Boolean(row.temp_password),
    });

    if (row.report_sent) {
      console.log('[dispatch-report] already sent, skipping');
      return Response.json({ success: true, alreadySent: true });
    }

    // ── Ensure auth user (idempotent) ───────────────────────────────────
    // We keep / reuse any temp_password already stored from a previous
    // attempt so the email's credentials match what the user can use to
    // log in. If the row has none, we generate a fresh one and try to
    // create the auth user.
    let tempPassword: string | null = row.temp_password;

    if (!tempPassword) {
      const candidate = generateTempPassword();
      console.log('[dispatch-report] creating auth user for', row.email);
      const { error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: row.email,
        password: candidate,
        email_confirm: true,
        user_metadata: { source: 'innerscore-purchase' },
      });

      if (createError) {
        const code = (createError as { code?: string }).code;
        const msg = createError.message?.toLowerCase() ?? '';
        const alreadyRegistered =
          code === 'email_exists' ||
          msg.includes('already') ||
          msg.includes('registered');
        if (alreadyRegistered) {
          console.log(
            '[dispatch-report] auth user already exists, no temp_password to share',
          );
          tempPassword = null;
        } else {
          console.error(
            '[dispatch-report] auth.createUser failed',
            createError,
          );
          return Response.json(
            { error: 'No se pudo crear el usuario', step: 'auth.createUser' },
            { status: 500 },
          );
        }
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
          // Continue: email will still go out with this password but the
          // row won't have it cached for a retry. Acceptable for now.
        }
      }
    } else {
      console.log('[dispatch-report] reusing existing temp_password from row');
    }

    // ── Magic link token ────────────────────────────────────────────────
    const magicToken = randomUUID();
    const baseUrl = resolveBaseUrl(request);
    const magicLinkUrl = `${baseUrl}/api/magic-link?token=${magicToken}`;
    console.log('[dispatch-report] inserting magic_links row');

    const { error: linkError } = await supabaseAdmin
      .from('magic_links')
      .insert({ token: magicToken, email: row.email });
    if (linkError) {
      console.error('[dispatch-report] magic_links insert failed', linkError);
      return Response.json(
        { error: 'No se pudo generar el magic link', step: 'magic_links' },
        { status: 500 },
      );
    }

    // ── Generate + send email (await so failures stay retryable) ────────
    console.log('[dispatch-report] running report pipeline');
    const pipelineResult = await runReportPipeline({
      email: row.email,
      answers: row.answers,
      result: row.result,
      tempPassword,
      magicLinkUrl,
      purchasedAt: new Date(),
      baseUrl,
    });

    if (!pipelineResult.ok) {
      console.error(
        '[dispatch-report] pipeline failed; leaving report_sent=false for retry',
        pipelineResult,
      );
      return Response.json(
        {
          error: 'No se pudo enviar el informe',
          step: pipelineResult.step,
          detail: pipelineResult.detail,
        },
        { status: 500 },
      );
    }

    // ── Only now is the email confirmed delivered to Resend ─────────────
    console.log('[dispatch-report] marking report_sent=true for id:', row.id);
    const { error: flagError } = await supabaseAdmin
      .from('purchases')
      .update({ report_sent: true })
      .eq('id', row.id);
    if (flagError) {
      console.error(
        '[dispatch-report] could not flip report_sent (email already sent)',
        flagError,
      );
      // Don't bubble this error up: the email IS out, the user is fine.
      // The next dispatch attempt would re-send because the flag stayed
      // false — annoying but not broken; log loudly so we notice.
    }

    console.log('[dispatch-report] success for', row.email);
    return Response.json({ success: true, alreadySent: false });
  } catch (err) {
    console.error('[dispatch-report] unexpected error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
