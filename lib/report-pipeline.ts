// Shared report-generation + delivery pipeline. Called from /api/dispatch-report
// after the user reaches /upsell/resumen.

export type ReportPipelineInput = {
  email: string;
  answers: unknown;
  result: unknown;
  tempPassword: string | null;
  magicLinkUrl: string;
  purchasedAt: Date;
};

export async function runReportPipeline(input: ReportPipelineInput) {
  const { email, answers, result, tempPassword, magicLinkUrl, purchasedAt } =
    input;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    console.log('Sending report to:', email);
    const genRes = await fetch(`${baseUrl}/api/generate-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, answers, result }),
    });

    if (!genRes.ok) {
      const errBody = await genRes.json().catch(() => ({}));
      console.error('[report-pipeline] generate-report failed', genRes.status, errBody);
      return;
    }

    const { report: reportText } = await genRes.json();

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
      console.error('[report-pipeline] send-report failed', sendRes.status, errBody);
    }
  } catch (err) {
    console.error('[report-pipeline] error:', err);
  }
}
