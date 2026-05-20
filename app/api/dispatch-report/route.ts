import { after } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { runReportPipeline } from '@/lib/report-pipeline';

export const maxDuration = 800;

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
      .select('id, email, answers, result, report_sent')
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

    // Flip the flag synchronously before scheduling the pipeline so concurrent
    // requests (page refresh, React StrictMode double-mount) can't double-send.
    const { error: updateError } = await supabaseAdmin
      .from('purchases')
      .update({ report_sent: true })
      .eq('id', row.id)
      .eq('report_sent', false);

    if (updateError) {
      return Response.json({ error: updateError.message }, { status: 500 });
    }

    after(() => runReportPipeline(row.email, row.answers, row.result));

    return Response.json({ success: true, alreadySent: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 400 });
  }
}
