// Shared report-generation + delivery pipeline. Called from
// /api/dispatch-report once the purchase has been validated. Returns a
// structured result so the caller can react to failures and decide
// whether to flip the report_sent flag.

export type ReportPipelineInput = {
  email: string;
  answers: unknown;
  result: unknown;
  tempPassword: string | null;
  magicLinkUrl: string;
  purchasedAt: Date;
  baseUrl?: string;
};

export type ReportPipelineResult =
  | { ok: true }
  | { ok: false; step: 'generate' | 'send' | 'exception'; detail: unknown };

function resolveBaseUrl(provided?: string): string {
  if (provided && provided.length > 0) return provided;
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL;
  if (fromEnv && fromEnv.length > 0) return fromEnv;
  return 'https://innerscore.es';
}

export async function runReportPipeline(
  input: ReportPipelineInput,
): Promise<ReportPipelineResult> {
  const {
    email,
    answers,
    result,
    tempPassword,
    magicLinkUrl,
    purchasedAt,
    baseUrl: providedBaseUrl,
  } = input;
  const baseUrl = resolveBaseUrl(providedBaseUrl);

  console.log('[report-pipeline] start', { email, baseUrl });

  try {
    console.log('[report-pipeline] calling generate-report');
    const genRes = await fetch(`${baseUrl}/api/generate-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, answers, result }),
    });

    if (!genRes.ok) {
      const errBody = await genRes.json().catch(() => ({}));
      console.error(
        '[report-pipeline] generate-report failed',
        genRes.status,
        errBody,
      );
      return { ok: false, step: 'generate', detail: errBody };
    }

    const { report: reportText } = await genRes.json();
    console.log(
      '[report-pipeline] report generated, length:',
      reportText?.length ?? 0,
    );

    console.log('[report-pipeline] calling send-report');
    const sendRes = await fetch(`${baseUrl}/api/send-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        reportText,
        result,
        tempPassword,
        magicLinkUrl,
        purchasedAtIso: purchasedAt.toISOString(),
      }),
    });

    if (!sendRes.ok) {
      const errBody = await sendRes.json().catch(() => ({}));
      console.error(
        '[report-pipeline] send-report failed',
        sendRes.status,
        errBody,
      );
      return { ok: false, step: 'send', detail: errBody };
    }

    console.log('[report-pipeline] send-report ok for', email);
    return { ok: true };
  } catch (err) {
    console.error('[report-pipeline] exception:', err);
    return {
      ok: false,
      step: 'exception',
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}
