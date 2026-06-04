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
      piStartsWithPi: typeof pi === 'string' ? pi.startsWith('pi_') : null,
    });
    if (!pi || typeof pi !== 'string') {
      console.warn('[dispatch-report] PATH=invalid-pi → 400');
      return Response.json(
        { error: 'Falta el identificador del pago' },
        { status: 400 },
      );
    }

    // We log all rows that share this stripe_session_id first so we can tell
    // from logs whether the lookup is hitting the expected row (or zero, or
    // duplicates). maybeSingle() below will still error if there are
    // duplicates, so this is purely diagnostic.
    const { data: allRows, error: scanError } = await supabaseAdmin
      .from('purchases')
      .select('id, email, stripe_session_id, report_sent, temp_password, created_at')
      .eq('stripe_session_id', pi);
    if (scanError) {
      console.error('[dispatch-report] diagnostic scan error', scanError);
    } else {
      console.log('[dispatch-report] rows matching stripe_session_id', {
        count: allRows?.length ?? 0,
        rows: (allRows ?? []).map((r) => ({
          id: r.id,
          email: r.email,
          stripe_session_id: r.stripe_session_id,
          report_sent: r.report_sent,
          report_sent_type: typeof r.report_sent,
          hasTempPassword: Boolean(r.temp_password),
          created_at: r.created_at,
        })),
      });
    }

    const { data: row, error: lookupError } = await supabaseAdmin
      .from('purchases')
      .select('id, email, answers, result, report_sent, temp_password, stripe_session_id')
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
      stripe_session_id: row.stripe_session_id,
      stripeIdsMatch: row.stripe_session_id === pi,
      report_sent: row.report_sent,
      report_sent_type: typeof row.report_sent,
      hasTempPassword: Boolean(row.temp_password),
      hasAnswers: Array.isArray(row.answers) && row.answers.length > 0,
      hasResult: row.result !== null && row.result !== undefined,
    });

    // Be strict about the truthiness check so a stray string like "false"
    // doesn't accidentally skip the send. Only literal boolean true counts.
    if (row.report_sent === true) {
      console.log('[dispatch-report] PATH=already-sent → 200 alreadySent:true');
      return Response.json({ success: true, alreadySent: true });
    }
    console.log('[dispatch-report] PATH=proceeding-to-pipeline');

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
    console.log(
      '[dispatch-report] PATH=about-to-run-pipeline t+',
      Date.now() - t0,
      'ms',
    );
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
        '[dispatch-report] PATH=pipeline-failed → 500; report_sent stays false',
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
    console.log(
      '[dispatch-report] PATH=email-sent t+',
      Date.now() - t0,
      'ms; marking report_sent=true for id:',
      row.id,
    );
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
