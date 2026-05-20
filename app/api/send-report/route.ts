import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import { Resend } from 'resend';
import { getDimensionLabel } from '@/lib/scoring';
import type { QuizResult } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM_ADDRESS = 'reports@innerscore.es';

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 56;
const MARGIN_Y = 64;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

const NAVY = rgb(0.102, 0.102, 0.180); // #1a1a2e
const ORANGE = rgb(0.957, 0.635, 0.376); // #f4a261
const ORANGE_DIM = rgb(0.957, 0.635, 0.376);
const WHITE = rgb(1, 1, 1);
const DARK = rgb(0.1, 0.1, 0.15);
const MUTED = rgb(0.45, 0.45, 0.5);
const FAINT = rgb(0.86, 0.86, 0.88);
const SUBTLE_BG = rgb(0.97, 0.96, 0.94);

function normalize(s: string): string {
  return s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/ /g, ' ')
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

type SectionKey =
  | 'cover'
  | 'executive'
  | 'dimensions'
  | 'archetype'
  | 'impact'
  | 'plan';

function parseReport(reportText: string): Record<SectionKey, string> {
  const buckets: Record<SectionKey, string[]> = {
    cover: [],
    executive: [],
    dimensions: [],
    archetype: [],
    impact: [],
    plan: [],
  };
  let current: SectionKey = 'cover';

  for (const raw of reportText.split('\n')) {
    const heading = raw.match(/^#{1,3}\s+(.+)$/);
    if (heading) {
      const h = normalize(heading[1]).toLowerCase();
      if (/portada|cover/.test(h)) {
        current = 'cover';
        continue;
      }
      if (/resumen|ejecutivo|executive/.test(h)) {
        current = 'executive';
        continue;
      }
      if (/dimension|autoconcien|autorregula|motivaci|empat|habilidad/.test(h)) {
        current = 'dimensions';
        // Keep dimension sub-headings as part of the body so we can highlight them.
        buckets.dimensions.push(raw);
        continue;
      }
      if (/arquetipo/.test(h)) {
        current = 'archetype';
        continue;
      }
      if (/impacto|relacion|trabajo|decision/.test(h)) {
        current = 'impact';
        // Keep sub-headings to mark relationship/work/decisions subsections.
        buckets.impact.push(raw);
        continue;
      }
      if (/plan|crecimiento|90|30|60|fase|semana/.test(h)) {
        current = 'plan';
        buckets.plan.push(raw);
        continue;
      }
    }
    buckets[current].push(raw);
  }

  return Object.fromEntries(
    Object.entries(buckets).map(([k, lines]) => [k, lines.join('\n').trim()]),
  ) as Record<SectionKey, string>;
}

type Fonts = {
  serif: PDFFont;
  serifBold: PDFFont;
  serifItalic: PDFFont;
  sans: PDFFont;
};

type Ctx = {
  pdfDoc: PDFDocument;
  page: PDFPage;
  y: number;
  fonts: Fonts;
};

function newWhitePage(ctx: Ctx): void {
  ctx.page = ctx.pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  ctx.y = PAGE_HEIGHT - MARGIN_Y;
}

function ensureRoom(ctx: Ctx, needed: number): void {
  if (ctx.y - needed < MARGIN_Y + 24) newWhitePage(ctx);
}

function drawWrapped(
  ctx: Ctx,
  text: string,
  font: PDFFont,
  size: number,
  color = DARK,
  leading?: number,
  indent = 0,
): void {
  const lead = leading ?? Math.round(size * 1.5);
  const lines = wrapLines(text, font, size, CONTENT_WIDTH - indent);
  for (const line of lines) {
    ensureRoom(ctx, lead);
    ctx.page.drawText(line, {
      x: MARGIN_X + indent,
      y: ctx.y,
      font,
      size,
      color,
    });
    ctx.y -= lead;
  }
}

function drawSectionHeader(ctx: Ctx, eyebrow: string, title: string): void {
  newWhitePage(ctx);
  ctx.page.drawText(eyebrow.toUpperCase(), {
    x: MARGIN_X,
    y: ctx.y,
    font: ctx.fonts.sans,
    size: 9,
    color: ORANGE,
  });
  ctx.y -= 22;

  drawWrapped(ctx, title, ctx.fonts.serifBold, 28, DARK, 32);
  ctx.y -= 6;

  ctx.page.drawLine({
    start: { x: MARGIN_X, y: ctx.y },
    end: { x: MARGIN_X + 60, y: ctx.y },
    thickness: 2,
    color: ORANGE,
  });
  ctx.y -= 24;
}

function drawProgressBar(
  ctx: Ctx,
  label: string,
  score: number,
  max: number,
): void {
  ensureRoom(ctx, 44);
  const pct = max === 0 ? 0 : Math.min(1, Math.max(0, score / max));
  const barWidth = CONTENT_WIDTH;
  const filled = Math.round(barWidth * pct);
  const barY = ctx.y - 18;

  ctx.page.drawText(label, {
    x: MARGIN_X,
    y: ctx.y,
    font: ctx.fonts.serifBold,
    size: 13,
    color: DARK,
  });
  const valueLabel = `${score} / ${max}`;
  const valueWidth = ctx.fonts.sans.widthOfTextAtSize(valueLabel, 11);
  ctx.page.drawText(valueLabel, {
    x: MARGIN_X + CONTENT_WIDTH - valueWidth,
    y: ctx.y,
    font: ctx.fonts.sans,
    size: 11,
    color: MUTED,
  });

  ctx.page.drawRectangle({
    x: MARGIN_X,
    y: barY,
    width: barWidth,
    height: 8,
    color: FAINT,
  });
  ctx.page.drawRectangle({
    x: MARGIN_X,
    y: barY,
    width: filled,
    height: 8,
    color: ORANGE,
  });

  ctx.y = barY - 14;
}

function drawPill(ctx: Ctx, label: string): void {
  ensureRoom(ctx, 26);
  const text = label.toUpperCase();
  const padding = 10;
  const textWidth = ctx.fonts.sans.widthOfTextAtSize(text, 9);
  const pillWidth = textWidth + padding * 2;
  const pillHeight = 18;
  const pillY = ctx.y - pillHeight + 4;

  ctx.page.drawRectangle({
    x: MARGIN_X,
    y: pillY,
    width: pillWidth,
    height: pillHeight,
    color: ORANGE_DIM,
  });
  ctx.page.drawText(text, {
    x: MARGIN_X + padding,
    y: pillY + 5,
    font: ctx.fonts.sans,
    size: 9,
    color: WHITE,
  });
  ctx.y = pillY - 10;
}

function drawProse(ctx: Ctx, body: string): void {
  if (!body) return;
  const lines = body.split('\n');
  for (const raw of lines) {
    const line = normalize(raw);
    if (!line.trim()) {
      ctx.y -= 6;
      continue;
    }
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    const bullet = line.match(/^[-*]\s+(.+)$/);

    if (h2) {
      ctx.y -= 8;
      drawWrapped(ctx, stripInline(h2[1]), ctx.fonts.serifBold, 16, DARK, 22);
      ctx.y -= 2;
      continue;
    }
    if (h3) {
      ctx.y -= 4;
      drawWrapped(ctx, stripInline(h3[1]), ctx.fonts.serifItalic, 13, DARK, 18);
      continue;
    }
    if (bullet) {
      ensureRoom(ctx, 16);
      ctx.page.drawText('•', {
        x: MARGIN_X,
        y: ctx.y,
        font: ctx.fonts.sans,
        size: 11,
        color: ORANGE,
      });
      drawWrapped(ctx, stripInline(bullet[1]), ctx.fonts.serif, 11, DARK, 16, 14);
      continue;
    }

    drawWrapped(ctx, stripInline(line), ctx.fonts.serif, 11, DARK, 16);
    ctx.y -= 4;
  }
}

function drawCoverPage(
  ctx: Ctx,
  email: string,
  archetype: string,
  totalScore: number,
): void {
  ctx.page.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: NAVY,
  });

  // Wordmark — top center
  const wordmark = 'INNERSCORE';
  const wordmarkWidth = ctx.fonts.sans.widthOfTextAtSize(wordmark, 11);
  ctx.page.drawText(wordmark, {
    x: (PAGE_WIDTH - wordmarkWidth) / 2,
    y: PAGE_HEIGHT - 80,
    font: ctx.fonts.sans,
    size: 11,
    color: ORANGE,
    // letter spacing approximated by using small size
  });

  // Title
  const title = 'Informe de';
  const subtitle = 'Inteligencia Emocional';
  const titleWidth = ctx.fonts.serifItalic.widthOfTextAtSize(title, 28);
  ctx.page.drawText(title, {
    x: (PAGE_WIDTH - titleWidth) / 2,
    y: PAGE_HEIGHT / 2 + 160,
    font: ctx.fonts.serifItalic,
    size: 28,
    color: WHITE,
  });
  const subWidth = ctx.fonts.serifBold.widthOfTextAtSize(subtitle, 32);
  ctx.page.drawText(subtitle, {
    x: (PAGE_WIDTH - subWidth) / 2,
    y: PAGE_HEIGHT / 2 + 120,
    font: ctx.fonts.serifBold,
    size: 32,
    color: WHITE,
  });

  // Giant orange score
  const scoreText = `${totalScore}`;
  const scoreWidth = ctx.fonts.serifBold.widthOfTextAtSize(scoreText, 140);
  ctx.page.drawText(scoreText, {
    x: (PAGE_WIDTH - scoreWidth) / 2,
    y: PAGE_HEIGHT / 2 - 60,
    font: ctx.fonts.serifBold,
    size: 140,
    color: ORANGE,
  });
  const outOf = '/ 100';
  const outOfWidth = ctx.fonts.sans.widthOfTextAtSize(outOf, 14);
  ctx.page.drawText(outOf, {
    x: (PAGE_WIDTH - outOfWidth) / 2,
    y: PAGE_HEIGHT / 2 - 100,
    font: ctx.fonts.sans,
    size: 14,
    color: WHITE,
  });

  // Archetype name
  const archWidth = ctx.fonts.serifItalic.widthOfTextAtSize(archetype, 22);
  ctx.page.drawText(archetype, {
    x: (PAGE_WIDTH - archWidth) / 2,
    y: PAGE_HEIGHT / 2 - 150,
    font: ctx.fonts.serifItalic,
    size: 22,
    color: ORANGE,
  });

  // Footer block — email + date
  const safeEmail = normalize(email);
  const emailLine = `para: ${safeEmail}`;
  const emailWidth = ctx.fonts.sans.widthOfTextAtSize(emailLine, 10);
  ctx.page.drawText(emailLine, {
    x: (PAGE_WIDTH - emailWidth) / 2,
    y: 120,
    font: ctx.fonts.sans,
    size: 10,
    color: WHITE,
  });
  const dateLine = 'mayo de 2026';
  const dateWidth = ctx.fonts.sans.widthOfTextAtSize(dateLine, 9);
  ctx.page.drawText(dateLine, {
    x: (PAGE_WIDTH - dateWidth) / 2,
    y: 100,
    font: ctx.fonts.sans,
    size: 9,
    color: ORANGE,
  });

  // Thin orange rule under date
  ctx.page.drawLine({
    start: { x: PAGE_WIDTH / 2 - 30, y: 88 },
    end: { x: PAGE_WIDTH / 2 + 30, y: 88 },
    thickness: 1,
    color: ORANGE,
  });
}

const WEEK_PILL = /^(fase\s*1|fase\s*2|fase\s*3|d[ií]a\s*\d+|semana\s*\d+|\d+\s*d[ií]as|30\s*d[ií]as|60\s*d[ií]as|90\s*d[ií]as)\b/i;

function drawPlanSection(ctx: Ctx, body: string): void {
  if (!body) {
    drawWrapped(
      ctx,
      'Tu plan de crecimiento de 90 días estará disponible en la siguiente versión del informe.',
      ctx.fonts.serifItalic,
      11,
      MUTED,
      16,
    );
    return;
  }
  const lines = body.split('\n');
  for (const raw of lines) {
    const line = normalize(raw);
    if (!line.trim()) {
      ctx.y -= 6;
      continue;
    }
    const h = line.match(/^#{2,3}\s+(.+)$/);
    if (h) {
      const headingText = stripInline(h[1]).trim();
      const pillMatch = headingText.match(WEEK_PILL);
      if (pillMatch) {
        ctx.y -= 6;
        drawPill(ctx, pillMatch[1]);
        const remainder = headingText.slice(pillMatch[0].length).replace(/^[\s:·—-]+/, '');
        if (remainder) {
          drawWrapped(ctx, remainder, ctx.fonts.serifBold, 15, DARK, 22);
        }
        continue;
      }
      ctx.y -= 6;
      drawWrapped(ctx, headingText, ctx.fonts.serifBold, 15, DARK, 22);
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      ensureRoom(ctx, 16);
      ctx.page.drawText('•', {
        x: MARGIN_X,
        y: ctx.y,
        font: ctx.fonts.sans,
        size: 11,
        color: ORANGE,
      });
      drawWrapped(ctx, stripInline(bullet[1]), ctx.fonts.serif, 11, DARK, 16, 14);
      continue;
    }
    drawWrapped(ctx, stripInline(line), ctx.fonts.serif, 11, DARK, 16);
    ctx.y -= 4;
  }
}

function drawDimensionsSection(
  ctx: Ctx,
  body: string,
  result: QuizResult,
): void {
  // Always render the 5 progress bars from structured data — reliable.
  for (const d of result.dimensions) {
    drawProgressBar(ctx, getDimensionLabel(d.name), d.score, d.max);
  }
  ctx.y -= 10;

  // Soft separator
  ctx.page.drawLine({
    start: { x: MARGIN_X, y: ctx.y },
    end: { x: MARGIN_X + CONTENT_WIDTH, y: ctx.y },
    thickness: 0.6,
    color: FAINT,
  });
  ctx.y -= 18;

  // Claude's per-dimension prose
  drawProse(ctx, body);
}

function drawArchetypeSection(
  ctx: Ctx,
  body: string,
  archetypeName: string,
): void {
  // Highlight card with archetype name
  const cardHeight = 64;
  const cardY = ctx.y - cardHeight;
  ctx.page.drawRectangle({
    x: MARGIN_X,
    y: cardY,
    width: CONTENT_WIDTH,
    height: cardHeight,
    color: SUBTLE_BG,
  });
  ctx.page.drawRectangle({
    x: MARGIN_X,
    y: cardY,
    width: 4,
    height: cardHeight,
    color: ORANGE,
  });
  ctx.page.drawText('TU ARQUETIPO', {
    x: MARGIN_X + 18,
    y: cardY + cardHeight - 22,
    font: ctx.fonts.sans,
    size: 9,
    color: ORANGE,
  });
  ctx.page.drawText(archetypeName, {
    x: MARGIN_X + 18,
    y: cardY + 18,
    font: ctx.fonts.serifBold,
    size: 22,
    color: DARK,
  });
  ctx.y = cardY - 22;

  drawProse(ctx, body);
}

function drawImpactSection(ctx: Ctx, body: string): void {
  // Just render markdown prose, but with bigger leading on h2/h3 (Relaciones/Trabajo/Decisiones)
  drawProse(ctx, body);
}

async function buildPdf(
  reportText: string,
  result: QuizResult,
  email: string,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle('Informe InnerScore de IE');
  pdfDoc.setProducer('InnerScore');

  const fonts: Fonts = {
    serif: await pdfDoc.embedFont(StandardFonts.TimesRoman),
    serifBold: await pdfDoc.embedFont(StandardFonts.TimesRomanBold),
    serifItalic: await pdfDoc.embedFont(StandardFonts.TimesRomanItalic),
    sans: await pdfDoc.embedFont(StandardFonts.Helvetica),
  };

  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const ctx: Ctx = { pdfDoc, page, y: PAGE_HEIGHT - MARGIN_Y, fonts };

  // 1. Cover (always from structured data)
  drawCoverPage(ctx, email, result.archetype, result.totalScore);

  const sections = parseReport(reportText);

  // 2. Resumen ejecutivo
  drawSectionHeader(ctx, 'Sección 1', 'Resumen ejecutivo');
  drawProse(ctx, sections.executive);

  // 3. Análisis de las 5 dimensiones de IE — progress bars from structured data + Claude prose
  drawSectionHeader(ctx, 'Sección 2', 'Análisis de las 5 dimensiones');
  drawDimensionsSection(ctx, sections.dimensions, result);

  // 4. Perfil de arquetipo emocional
  drawSectionHeader(ctx, 'Sección 3', 'Perfil de arquetipo emocional');
  drawArchetypeSection(ctx, sections.archetype, result.archetype);

  // 5. Impacto en relaciones y trabajo
  drawSectionHeader(ctx, 'Sección 4', 'Impacto en relaciones y trabajo');
  drawImpactSection(ctx, sections.impact);

  // 6. Plan de crecimiento de 90 días — orange pill week badges
  drawSectionHeader(ctx, 'Sección 5', 'Plan de crecimiento de 90 días');
  drawPlanSection(ctx, sections.plan);

  // Page footers (skip cover page 0)
  const total = pdfDoc.getPageCount();
  for (let p = 1; p < total; p++) {
    const pg = pdfDoc.getPage(p);
    pg.drawText(`InnerScore  ·  Página ${p + 1} de ${total}`, {
      x: MARGIN_X,
      y: 28,
      font: fonts.sans,
      size: 9,
      color: MUTED,
    });
  }

  return pdfDoc.save();
}

type SendReportBody = {
  email: string;
  reportText: string;
  result: QuizResult;
  tempPassword?: string | null;
  magicLinkUrl?: string;
  purchasedAtIso?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SendReportBody;
    const { email, reportText, result } = body;
    const tempPassword = body.tempPassword ?? null;
    const magicLinkUrl = body.magicLinkUrl ?? '';
    const purchasedAt = body.purchasedAtIso
      ? new Date(body.purchasedAtIso)
      : new Date();

    const pdfBytes = await buildPdf(reportText, result, email);
    const pdfBuffer = Buffer.from(pdfBytes);

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? 'https://innerscore.es';
    const loginUrl = `${baseUrl}/login`;
    const membersUrl = `${baseUrl}/members`;

    const html = renderWelcomeEmail({
      email,
      tempPassword,
      magicLinkUrl,
      loginUrl,
      membersUrl,
      purchasedAt,
    });

    const { error: emailError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      subject: 'Tu informe de IE InnerScore y tu acceso al área de miembros',
      html,
      attachments: [
        { filename: 'InnerScore-Informe-IE.pdf', content: pdfBuffer },
      ],
    });

    if (emailError) {
      return Response.json({ error: emailError.message }, { status: 400 });
    }

    return Response.json({ sent: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 400 });
  }
}

function renderWelcomeEmail(args: {
  email: string;
  tempPassword: string | null;
  magicLinkUrl: string;
  loginUrl: string;
  membersUrl: string;
  purchasedAt: Date;
}): string {
  const { email, tempPassword, magicLinkUrl, loginUrl, membersUrl, purchasedAt } = args;
  const greetingName = email.split('@')[0];
  const renewalDate = new Date(purchasedAt.getTime() + 7 * 24 * 60 * 60 * 1000);
  const fmtDate = (d: Date) =>
    new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(d);

  const credentialsBlock = tempPassword
    ? `
      <p style="margin: 0 0 12px; color: #0f172a;">También tienes acceso completo a tu área de miembros de InnerScore con las siguientes credenciales:</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin: 16px 0; background: #fdf6f0; border: 1px solid #e8d5c8; border-radius: 12px;">
        <tr>
          <td style="padding: 16px 20px; color: #64748b; font-size: 13px; width: 130px;">Email</td>
          <td style="padding: 16px 20px; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="padding: 16px 20px; color: #64748b; font-size: 13px; border-top: 1px solid #e8d5c8;">Contraseña provisional</td>
          <td style="padding: 16px 20px; color: #0f172a; font-size: 14px; font-weight: 600; font-family: 'SF Mono', Menlo, monospace; border-top: 1px solid #e8d5c8;">${escapeHtml(tempPassword)}</td>
        </tr>
      </table>`
    : `
      <p style="margin: 0 0 12px; color: #0f172a;">Ya tenías una cuenta de InnerScore con este correo, así que sigue usando tu contraseña habitual para acceder a tu área de miembros.</p>`;

  const magicBlock = magicLinkUrl
    ? `
      <p style="margin: 24px 0 12px; color: #64748b; font-size: 13px;">¿Prefieres acceder sin contraseña? Usa este enlace directo de un solo uso (válido 24h):</p>
      <p style="margin: 0 0 24px;">
        <a href="${escapeAttr(magicLinkUrl)}" style="color: #1d4ed8; text-decoration: underline; font-size: 14px;">${escapeHtml(magicLinkUrl)}</a>
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
          <h1 style="margin: 0 0 12px; font-size: 24px; line-height: 1.3; color: #0f172a;">Hola, ${escapeHtml(greetingName)}:</h1>
          <p style="margin: 0; color: #64748b; font-size: 15px; line-height: 1.6;">Tu informe personalizado de inteligencia emocional ya está listo. Lo encontrarás adjunto a este correo, y también puedes descargarlo desde el botón de abajo.</p>
        </td></tr>

        <tr><td style="padding: 24px 32px 0; text-align: center;">
          <a href="${escapeAttr(membersUrl)}" style="display: inline-block; padding: 14px 28px; background: #ea580c; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; border-radius: 10px;">Descargar mi informe</a>
        </td></tr>

        <tr><td style="padding: 32px 32px 0;">
          ${credentialsBlock}
        </td></tr>

        <tr><td style="padding: 8px 32px 0; text-align: center;">
          <a href="${escapeAttr(loginUrl)}" style="display: inline-block; padding: 14px 28px; background: #1d4ed8; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; border-radius: 10px;">Acceder a mi área de miembros</a>
        </td></tr>

        <tr><td style="padding: 0 32px;">
          ${magicBlock}
        </td></tr>

        <tr><td style="padding: 16px 32px 0;">
          <div style="height: 1px; background: #e8d5c8; margin: 8px 0 24px;"></div>
          <p style="margin: 0 0 12px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Detalles del pedido</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #64748b;">Nombre</td><td style="padding: 6px 0; color: #0f172a; text-align: right;">${escapeHtml(greetingName)}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Plan</td><td style="padding: 6px 0; color: #0f172a; text-align: right;">Acceso 7 días InnerScore</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Fecha de inicio</td><td style="padding: 6px 0; color: #0f172a; text-align: right;">${fmtDate(purchasedAt)}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Total pagado</td><td style="padding: 6px 0; color: #0f172a; text-align: right; font-weight: 600;">3,00 €</td></tr>
          </table>
        </td></tr>

        <tr><td style="padding: 24px 32px 0;">
          <div style="background: #fdf6f0; border: 1px solid #e8d5c8; border-radius: 12px; padding: 16px 20px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #0f172a;"><strong>Renovación automática:</strong> Tu suscripción se renovará el ${fmtDate(renewalDate)} por 39,99 €/mes salvo que la canceles antes.</p>
            <p style="margin: 0; font-size: 13px; color: #64748b;">Puedes cancelar en cualquier momento desde tu área de miembros.</p>
          </div>
        </td></tr>

        <tr><td style="padding: 32px 32px 28px;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">Un abrazo,<br><strong style="color: #0f172a;">Equipo de InnerScore</strong></p>
        </td></tr>
      </table>

      <p style="max-width: 580px; margin: 16px auto 0; color: #94a3b8; font-size: 11px; text-align: center;">Si tienes cualquier duda responde a este correo y te ayudamos.</p>
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(s: string): string {
  return escapeHtml(s);
}
