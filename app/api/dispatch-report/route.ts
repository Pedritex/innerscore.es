import { after } from 'next/server';
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

export async function POST(request: Request) {
  try {
    const { pi } = await request.json();
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
      return Response.json({ error: lookupError.message }, { status: 500 });
    }
    if (!row) {
      return Response.json(
        { error: 'No se encontró el pedido' },
        { status: 404 },
      );
    }
    if (row.report_sent) {
      return Response.json({ success: true, alreadySent: true });
    }

    // Conditional UPDATE acts as the gate: the first request to flip the flag
    // wins; concurrent ones get 0 rows back and bail out.
    const { data: claimed, error: claimError } = await supabaseAdmin
      .from('purchases')
      .update({ report_sent: true })
      .eq('id', row.id)
      .eq('report_sent', false)
      .select('id');

    if (claimError) {
      return Response.json({ error: claimError.message }, { status: 500 });
    }
    if (!claimed || claimed.length === 0) {
      return Response.json({ success: true, alreadySent: true });
    }

    // From here on, only one request is executing for this purchase.
    const tempPassword = generateTempPassword();

    // Create the Supabase Auth user (or look up the existing one).
    let isNewUser = true;
    const { error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: row.email,
      password: tempPassword,
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
      if (!alreadyRegistered) {
        console.error('[dispatch-report] auth.createUser failed', createError);
      } else {
        isNewUser = false;
      }
    }

    if (isNewUser) {
      const { error: pwSaveError } = await supabaseAdmin
        .from('purchases')
        .update({ temp_password: tempPassword })
        .eq('id', row.id);
      if (pwSaveError) {
        console.error(
          '[dispatch-report] failed to save temp_password',
          pwSaveError,
        );
      }
    }

    // Magic link: our own token, validated by /api/magic-link.
    const magicToken = randomUUID();
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? new URL(request.url).origin;
    const magicLinkUrl = `${baseUrl}/api/magic-link?token=${magicToken}`;

    const { error: linkError } = await supabaseAdmin
      .from('magic_links')
      .insert({
        token: magicToken,
        email: row.email,
      });
    if (linkError) {
      console.error('[dispatch-report] magic_links insert failed', linkError);
    }

    after(() =>
      runReportPipeline({
        email: row.email,
        answers: row.answers,
        result: row.result,
        tempPassword: isNewUser ? tempPassword : null,
        magicLinkUrl,
        purchasedAt: new Date(),
      }),
    );

    return Response.json({ success: true, alreadySent: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 400 });
  }
}
