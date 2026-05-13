import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM_ADDRESS = 'onboarding@resend.dev';

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 56;
const MARGIN_Y = 64;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

const BLUE = rgb(0.114, 0.306, 0.847);
const ORANGE = rgb(0.918, 0.345, 0.047);
const DARK = rgb(0.059, 0.09, 0.165);
const MUTED = rgb(0.392, 0.455, 0.545);

function normalize(s: string): string {
  return s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/ /g, ' ')
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, '');
}

function stripInline(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
}

function wrapLines(
  text: string,
  font: PDFFont,
  size: number,
  width: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= width) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [''];
}

async function buildPdf(reportText: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle('Informe InnerScore de IE');
  pdfDoc.setProducer('InnerScore');

  const times = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let page: PDFPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN_Y;

  const newPage = () => {
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN_Y;
  };

  const ensure = (needed: number) => {
    if (y - needed < MARGIN_Y) newPage();
  };

  const drawWrapped = (
    text: string,
    font: PDFFont,
    size: number,
    color = DARK,
    leading?: number,
    indent = 0,
  ) => {
    const lead = leading ?? Math.round(size * 1.45);
    const lines = wrapLines(text, font, size, CONTENT_WIDTH - indent);
    for (const line of lines) {
      ensure(lead);
      page.drawText(line, {
        x: MARGIN_X + indent,
        y,
        font,
        size,
        color,
      });
      y -= lead;
    }
  };

  const drawRule = (color = ORANGE, thickness = 1.5) => {
    ensure(thickness + 4);
    page.drawLine({
      start: { x: MARGIN_X, y },
      end: { x: MARGIN_X + CONTENT_WIDTH, y },
      thickness,
      color,
    });
    y -= 4;
  };

  const lines = reportText.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = normalize(raw);

    if (!line.trim()) {
      y -= 8;
      continue;
    }

    if (line.startsWith('# ')) {
      y -= 10;
      drawWrapped(stripInline(line.slice(2)), timesBold, 26, BLUE, 32);
      drawRule(BLUE, 2);
      y -= 8;
    } else if (line.startsWith('## ')) {
      y -= 12;
      drawWrapped(stripInline(line.slice(3)), timesBold, 19, DARK, 26);
      drawRule(ORANGE, 1.2);
      y -= 6;
    } else if (line.startsWith('### ')) {
      y -= 6;
      drawWrapped(stripInline(line.slice(4)), timesItalic, 15, DARK, 22);
      y -= 2;
    } else if (line.startsWith('#### ')) {
      drawWrapped(stripInline(line.slice(5)), timesBold, 12, BLUE, 18);
    } else if (/^[-*]\s+/.test(line)) {
      const body = stripInline(line.replace(/^[-*]\s+/, ''));
      ensure(16);
      page.drawText('•', {
        x: MARGIN_X,
        y,
        font: helvetica,
        size: 11,
        color: ORANGE,
      });
      drawWrapped(body, helvetica, 11, DARK, 16, 14);
    } else if (/^>\s*/.test(line)) {
      const body = stripInline(line.replace(/^>\s*/, ''));
      ensure(18);
      page.drawLine({
        start: { x: MARGIN_X, y: y + 12 },
        end: { x: MARGIN_X, y: y - 4 },
        thickness: 2,
        color: ORANGE,
      });
      drawWrapped(body, timesItalic, 11, MUTED, 16, 12);
    } else if (/^---+\s*$/.test(line)) {
      y -= 6;
      drawRule(rgb(0.91, 0.835, 0.784), 1);
      y -= 6;
    } else {
      drawWrapped(stripInline(line), helvetica, 11, DARK, 16);
      y -= 4;
    }
  }

  const total = pdfDoc.getPageCount();
  for (let p = 0; p < total; p++) {
    const pg = pdfDoc.getPage(p);
    pg.drawText(`InnerScore  ·  Página ${p + 1} de ${total}`, {
      x: MARGIN_X,
      y: 28,
      font: helvetica,
      size: 9,
      color: MUTED,
    });
  }

  return pdfDoc.save();
}

export async function POST(request: Request) {
  try {
    const { email, reportText } = await request.json();

    const pdfBytes = await buildPdf(reportText);
    const pdfBuffer = Buffer.from(pdfBytes);

    const { error: emailError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      subject: 'Tu informe de IE InnerScore — Descarga adjunta',
      html: '<p>Hola,</p><p>Tu informe personalizado de inteligencia emocional ya está listo. Lo encontrarás adjunto a este correo.</p><p>El equipo de InnerScore</p>',
      attachments: [
        { filename: 'InnerScore-Informe-IE.pdf', content: pdfBuffer },
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
