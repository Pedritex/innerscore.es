import { Resend } from 'resend';
import { marked } from 'marked';
import { supabaseAdmin } from '@/lib/supabase';
// @ts-expect-error - html-pdf-node ships without type declarations
import htmlPdf from 'html-pdf-node';

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM_ADDRESS = 'reports@innerscore.es';

function buildHtml(reportHtml: string) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>InnerScore EQ Report</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');
* { box-sizing: border-box; }
body {
  font-family: 'Inter', Georgia, serif;
  color: #0f172a;
  line-height: 1.7;
  padding: 56px;
  margin: 0;
  background: #fdf6f0;
}
h1, h2, h3, h4 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  margin-top: 1.6em;
  margin-bottom: 0.4em;
}
h1 { color: #1d4ed8; font-size: 34px; margin-top: 0; }
h2 { color: #0f172a; font-size: 26px; border-bottom: 2px solid #ea580c; padding-bottom: 8px; }
h3 { color: #0f172a; font-style: italic; font-size: 20px; }
h4 { color: #1d4ed8; font-size: 17px; }
p { margin: 0 0 1em; }
strong { color: #1d4ed8; }
em { color: #ea580c; font-style: italic; }
ul, ol { padding-left: 22px; margin: 0 0 1em; }
li { margin-bottom: 0.4em; }
blockquote {
  border-left: 3px solid #ea580c;
  padding: 8px 16px;
  color: #64748b;
  font-style: italic;
  margin: 1em 0;
  background: #fff;
}
hr { border: none; border-top: 1px solid #e8d5c8; margin: 2em 0; }
code { background: #eff6ff; color: #1d4ed8; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
</style>
</head>
<body>
${reportHtml}
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const { email, reportText } = await request.json();

    const reportHtml = await marked.parse(reportText);
    const fullHtml = buildHtml(reportHtml as string);

    const pdfBuffer: Buffer = await htmlPdf.generatePdf(
      { content: fullHtml },
      {
        format: 'A4',
        margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
        printBackground: true,
      },
    );

    const { error: emailError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      subject: 'Your InnerScore EQ Report — Download Attached',
      html: '<p>Hi,</p><p>Your personalized emotional intelligence report is ready! Download it below.</p><p>InnerScore Team</p>',
      attachments: [
        { filename: 'InnerScore-EQ-Report.pdf', content: pdfBuffer },
      ],
    });

    if (emailError) {
      return Response.json({ error: emailError.message }, { status: 400 });
    }

    const { error: dbError } = await supabaseAdmin
      .from('purchases')
      .update({ report_sent: true })
      .eq('email', email);

    if (dbError) {
      return Response.json({ error: dbError.message }, { status: 400 });
    }

    return Response.json({ sent: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 400 });
  }
}
