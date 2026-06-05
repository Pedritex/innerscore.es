#!/usr/bin/env node
// Builds the 5 pre-rendered archetype PDFs into public/reports/.
// Port of the PDF builder that used to live in app/api/send-report/route.ts;
// the API no longer generates on-demand — it just reads these files.

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(HERE, '..', 'public', 'reports');

// ── Layout constants (kept identical to the previous on-demand builder) ──
const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 56;
const MARGIN_Y = 64;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

const NAVY = rgb(0.102, 0.102, 0.180);
const ORANGE = rgb(0.957, 0.635, 0.376);
const WHITE = rgb(1, 1, 1);
const DARK = rgb(0.1, 0.1, 0.15);
const MUTED = rgb(0.45, 0.45, 0.5);
const FAINT = rgb(0.86, 0.86, 0.88);
const SUBTLE_BG = rgb(0.97, 0.96, 0.94);

const DIMENSION_LABELS = {
  'self-awareness': 'Autoconciencia',
  'self-regulation': 'Autorregulación',
  motivation: 'Motivación',
  empathy: 'Empatía',
  'social-skills': 'Habilidades Sociales',
};

function normalize(s) {
  return s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/ /g, ' ')
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, '');
}

function stripInline(s) {
  return s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
}

function wrapLines(text, font, size, width) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
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

function parseReport(reportText) {
  const buckets = {
    cover: [],
    executive: [],
    dimensions: [],
    archetype: [],
    impact: [],
    plan: [],
  };
  let current = 'cover';

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
        buckets.dimensions.push(raw);
        continue;
      }
      if (/arquetipo/.test(h)) {
        current = 'archetype';
        continue;
      }
      if (/impacto|relacion|trabajo|decision/.test(h)) {
        current = 'impact';
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
  );
}

function newWhitePage(ctx) {
  ctx.page = ctx.pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  ctx.y = PAGE_HEIGHT - MARGIN_Y;
}

function ensureRoom(ctx, needed) {
  if (ctx.y - needed < MARGIN_Y + 24) newWhitePage(ctx);
}

function drawWrapped(ctx, text, font, size, color = DARK, leading, indent = 0) {
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

function drawSectionHeader(ctx, eyebrow, title) {
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

function drawProgressBar(ctx, label, score, max) {
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

function drawPill(ctx, label) {
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
    color: ORANGE,
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

function drawProse(ctx, body) {
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

function drawCoverPage(ctx, archetype, totalScore) {
  ctx.page.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: NAVY,
  });

  const wordmark = 'INNERSCORE';
  const wordmarkWidth = ctx.fonts.sans.widthOfTextAtSize(wordmark, 11);
  ctx.page.drawText(wordmark, {
    x: (PAGE_WIDTH - wordmarkWidth) / 2,
    y: PAGE_HEIGHT - 80,
    font: ctx.fonts.sans,
    size: 11,
    color: ORANGE,
  });

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

  const archWidth = ctx.fonts.serifItalic.widthOfTextAtSize(archetype, 22);
  ctx.page.drawText(archetype, {
    x: (PAGE_WIDTH - archWidth) / 2,
    y: PAGE_HEIGHT / 2 - 150,
    font: ctx.fonts.serifItalic,
    size: 22,
    color: ORANGE,
  });

  const dateLine = 'junio de 2026';
  const dateWidth = ctx.fonts.sans.widthOfTextAtSize(dateLine, 9);
  ctx.page.drawText(dateLine, {
    x: (PAGE_WIDTH - dateWidth) / 2,
    y: 100,
    font: ctx.fonts.sans,
    size: 9,
    color: ORANGE,
  });
  ctx.page.drawLine({
    start: { x: PAGE_WIDTH / 2 - 30, y: 88 },
    end: { x: PAGE_WIDTH / 2 + 30, y: 88 },
    thickness: 1,
    color: ORANGE,
  });
}

const WEEK_PILL =
  /^(fase\s*1|fase\s*2|fase\s*3|d[ií]a\s*\d+|semana\s*\d+|\d+\s*d[ií]as|30\s*d[ií]as|60\s*d[ií]as|90\s*d[ií]as)\b/i;

function drawPlanSection(ctx, body) {
  if (!body) return;
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
        const remainder = headingText
          .slice(pillMatch[0].length)
          .replace(/^[\s:·—-]+/, '');
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

function drawDimensionsSection(ctx, body, dimensions) {
  for (const d of dimensions) {
    drawProgressBar(ctx, DIMENSION_LABELS[d.name] ?? d.name, d.score, d.max);
  }
  ctx.y -= 10;
  ctx.page.drawLine({
    start: { x: MARGIN_X, y: ctx.y },
    end: { x: MARGIN_X + CONTENT_WIDTH, y: ctx.y },
    thickness: 0.6,
    color: FAINT,
  });
  ctx.y -= 18;
  drawProse(ctx, body);
}

function drawArchetypeSection(ctx, body, archetypeName) {
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

async function buildPdf({ reportText, archetype, totalScore, dimensions }) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle('Informe InnerScore de IE');
  pdfDoc.setProducer('InnerScore');

  const fonts = {
    serif: await pdfDoc.embedFont(StandardFonts.TimesRoman),
    serifBold: await pdfDoc.embedFont(StandardFonts.TimesRomanBold),
    serifItalic: await pdfDoc.embedFont(StandardFonts.TimesRomanItalic),
    sans: await pdfDoc.embedFont(StandardFonts.Helvetica),
  };

  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const ctx = { pdfDoc, page, y: PAGE_HEIGHT - MARGIN_Y, fonts };

  drawCoverPage(ctx, archetype, totalScore);
  const sections = parseReport(reportText);

  drawSectionHeader(ctx, 'Sección 1', 'Resumen ejecutivo');
  drawProse(ctx, sections.executive);

  drawSectionHeader(ctx, 'Sección 2', 'Análisis de las 5 dimensiones');
  drawDimensionsSection(ctx, sections.dimensions, dimensions);

  drawSectionHeader(ctx, 'Sección 3', 'Perfil de arquetipo emocional');
  drawArchetypeSection(ctx, sections.archetype, archetype);

  drawSectionHeader(ctx, 'Sección 4', 'Impacto en relaciones y trabajo');
  drawProse(ctx, sections.impact);

  drawSectionHeader(ctx, 'Sección 5', 'Plan de crecimiento de 90 días');
  drawPlanSection(ctx, sections.plan);

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

// ── Archetype data + static report text ──────────────────────────────────

const ARCHETYPES = [
  {
    slug: 'el-ancla',
    name: 'El Ancla',
    totalScore: 74,
    dims: { 'self-awareness': 72, 'self-regulation': 85, motivation: 68, empathy: 75, 'social-skills': 70 },
  },
  {
    slug: 'el-conector',
    name: 'El Conector',
    totalScore: 78,
    dims: { 'self-awareness': 70, 'self-regulation': 65, motivation: 75, empathy: 90, 'social-skills': 88 },
  },
  {
    slug: 'el-empatico',
    name: 'El Empático',
    totalScore: 77,
    dims: { 'self-awareness': 78, 'self-regulation': 60, motivation: 70, empathy: 95, 'social-skills': 82 },
  },
  {
    slug: 'el-impulsor',
    name: 'El Impulsor',
    totalScore: 72,
    dims: { 'self-awareness': 65, 'self-regulation': 58, motivation: 95, empathy: 62, 'social-skills': 78 },
  },
  {
    slug: 'el-observador',
    name: 'El Observador',
    totalScore: 75,
    dims: { 'self-awareness': 92, 'self-regulation': 80, motivation: 72, empathy: 70, 'social-skills': 60 },
  },
];

const REPORT_CONTENT = {
  'el-ancla': {
    executive: `Tu perfil es el de **El Ancla**: una persona estable, consistente y fiable, capaz de mantener la calma cuando todo a tu alrededor se agita. Tu mayor fortaleza es la autorregulación emocional — sabes detenerte antes de reaccionar y eliges tu respuesta con criterio. Esta capacidad te convierte en un punto de referencia para quienes te rodean.

Tu puntuación global de 74/100 te sitúa en un rango sólido. Lo que más te define es que el resto de personas te perciben como alguien con el que se puede contar: tus reacciones son predecibles, tus juicios son ponderados, y tu presencia genera serenidad.

El reto principal de tu perfil está en mantener esa estabilidad sin que se convierta en rigidez. Tu plan se centra en cultivar la flexibilidad y la apertura al cambio, sin perder tu solidez característica.`,
    dimensions: `Tu **autorregulación** (85/100) es tu activo más diferenciador: pocas personas tienen tu capacidad para gestionar emociones intensas sin que se desborden. Lo notas especialmente bajo presión o ante conflictos: mientras otros reaccionan, tú procesas.

Tu **empatía** (75/100) es alta y madura — no absorbes las emociones de los demás, pero las reconoces y las acoges. Esto refuerza tu rol de ancla en relaciones y equipos.

Tu **autoconciencia** (72/100) es robusta. Conoces bien tus límites, tus detonantes y tus valores. Aún así, hay espacio para profundizar más en las capas menos accesibles de tu mundo interno.

Tus **habilidades sociales** (70/100) son sólidas en formato uno-a-uno; en grupos grandes prefieres escuchar y observar antes que tomar protagonismo. Ese estilo discreto te aporta credibilidad pero a veces te resta visibilidad.

Tu **motivación** (68/100) es estable más que entusiasta. No te mueve la novedad por la novedad; necesitas sentido y coherencia con tus valores para implicarte. Esto es una fortaleza, aunque a veces puede confundirse con falta de ambición.`,
    archetype: `**El Ancla** es la persona a la que el resto recurre cuando todo se está moviendo demasiado rápido. Tu superpoder es la consistencia: no eres el más vistoso ni el más ruidoso, pero eres el que sostiene cuando otros se hunden.

## Cómo te ves
Te percibes como alguien con los pies en la tierra. Valoras la coherencia, la palabra dada, el trabajo bien hecho. Te incomodan los giros bruscos, las decisiones precipitadas y los cambios sin justificación. Tu identidad emocional se construye sobre la fiabilidad: prefieres ser el que está siempre antes que el que destaca a veces.

## Cómo te ven los demás
Tu entorno te describe con palabras como "sólido", "de fiar", "tranquilo". En momentos de crisis, eres el primero al que llaman. En la rutina, eres el que sostiene la estructura silenciosamente sin pedir reconocimiento. Algunas personas pueden interpretar tu estabilidad como falta de pasión; lo que ocurre es que tu pasión se expresa de forma sostenida, no explosiva.

## Tus fortalezas
- **Estabilidad emocional bajo presión**: tu sistema nervioso no se desregula con facilidad.
- **Consistencia**: tus comportamientos son predecibles y eso genera confianza.
- **Fiabilidad**: cumples lo que dices; las personas pueden apoyarse en ti.
- **Capacidad de sostener a otros**: tu calma se contagia.
- **Criterio sereno**: tus decisiones son ponderadas, no impulsivas.

## Tus áreas de crecimiento
- **Flexibilidad**: a veces confundes estabilidad con rigidez. No todo cambio es una amenaza.
- **Apertura al cambio**: lo nuevo te incomoda más por costumbre que por riesgo real. Practica el "y si" en lugar del "pero".
- **Expresión emocional**: tiendes a contener. Aprender a poner palabras a lo que sientes te conectaría más profundamente con los demás.
- **Visibilidad**: tu estilo discreto te puede dejar fuera de oportunidades que mereces.`,
    impact: `## Relaciones
En tus relaciones cercanas eres el pilar al que el otro vuelve. Pareja, familia, amistades íntimas: todos te tienen por una presencia segura, alguien que no se enfada por nada, que escucha sin interrumpir, que no se quiebra cuando se le necesita. Esto es valioso, pero también puede generar un desequilibrio: si nunca te muestras vulnerable, los demás dejan de preguntarte cómo estás.

Tu pareja, en concreto, puede sentir a veces que no llega a verte por completo. No porque no la quieras — sino porque tu estilo emocional contenido le exige a la otra persona un esfuerzo extra para descifrarte. Practica el compartir más de lo que sientes, incluso cuando no parezca necesario.

## Trabajo
En el entorno laboral eres el profesional al que se le encarga lo que importa. Te dan responsabilidades porque cumples. Te toca mediar cuando hay tensión porque sabes mantener la calma. Y se te valora aunque no te promocionen al ritmo de otros perfiles más visibles.

Si lideras equipos, tu estilo es de presencia y disponibilidad más que de carisma. Eso construye lealtades profundas. Pero ojo: tu equipo necesita también ver tu emoción, tu reconocimiento explícito y tu visión más allá de lo operativo. Tu reto profesional es aprender a poner palabras a lo que ya transmites con tu presencia.

## Decisiones
Tus decisiones son meditadas, racionales, alineadas con tus valores. Esto es una virtud enorme. La sombra es que a veces te paralizas ante decisiones importantes por miedo a equivocarte, o las pospones esperando "más información" cuando lo que necesitas es decidir.

Practica decisiones rápidas en cosas pequeñas — restaurantes, planes de fin de semana, prendas de ropa — para entrenar el músculo de elegir sin sobreanalizar. Y para decisiones grandes, ponte un plazo y respétalo.`,
    plan: `Este plan de 90 días está diseñado para tu perfil de **El Ancla**: mantener tu solidez característica mientras desarrollas más flexibilidad, expresión emocional y apertura al cambio.

## Fase 1: Conciencia y observación
Las primeras tres semanas se centran en notar tus patrones sin intentar cambiarlos todavía. La observación es siempre el primer paso.

- Lleva un diario emocional breve: tres líneas al día sobre lo que sentiste y qué lo provocó.
- Identifica las situaciones en las que más tiendes a "anclarte" en lugar de moverte.
- Pregunta a una persona de confianza cómo te ve emocionalmente y escucha sin defender.
- Detecta tres ocasiones a la semana en las que contengas una emoción que podrías expresar.

## Fase 2: Expresión y flexibilidad
El segundo bloque introduce micro-prácticas de expresión emocional y de apertura al cambio. Pequeñas, frecuentes, sin grandes saltos.

- Cada día, comparte con alguien una emoción que normalmente te guardarías.
- Acepta una invitación o propuesta que normalmente declinarías por inercia.
- Practica la frase "no estoy seguro, pero podemos probar" en lugar de "no lo veo claro".
- Cambia conscientemente un hábito o ruta semanal: comer fuera, otro camino, otro orden.

## Fase 3: Integración y nuevos patrones
El último mes integra los aprendizajes en tu vida regular. El objetivo es que las nuevas conductas dejen de ser ejercicios y se vuelvan parte de quién eres.

- Identifica un proyecto, conversación o decisión que has pospuesto y avanza con él.
- Pide feedback explícito sobre los cambios percibidos en ti por tu entorno cercano.
- Diseña un ritual semanal de revisión emocional: 15 minutos a solas con tu diario.
- Cierra el plan eligiendo un compromiso continuo para mantener la práctica.`,
  },
  'el-conector': {
    executive: `Tu perfil es el de **El Conector**: una persona naturalmente social, con una empatía excepcional y la capacidad de unir a los demás. Allá donde vas, construyes puentes. Las personas se sienten cómodas contigo porque tienes el don de hacer que cada uno se sienta escuchado y visto.

Tu puntuación global de 78/100 es alta y refleja un perfil emocionalmente competente. Tu superpoder está en las relaciones: lees a las personas con facilidad, anticipas dinámicas grupales y sabes mover a otros desde la conexión más que desde la imposición.

El reto principal está en cuidar de ti misma con la misma intensidad con la que cuidas de los demás. Tu plan se centra en la autorregulación, los límites personales y la motivación intrínseca: aprender a poner tu propia brújula en el centro sin perder tu capacidad de conexión.`,
    dimensions: `Tu **empatía** (90/100) es uno de los rasgos más altos posibles. Captas microexpresiones, cambios de tono, silencios cargados. Sabes exactamente cómo está la otra persona, a menudo antes de que ella misma lo verbalice.

Tus **habilidades sociales** (88/100) son tu segunda gran fortaleza: sabes adaptar tu registro, leer el momento, gestionar conflictos y crear ambientes donde las personas florecen.

Tu **motivación** (75/100) es sólida cuando hay una causa, un grupo o un propósito compartido. Te mueves bien cuando te mueves con otros — sola, te cuesta más arrancar.

Tu **autoconciencia** (70/100) es decente pero no es tu zona más desarrollada. Te conoces a través de los demás más que desde dentro. Hay espacio para escucharte sin filtros externos.

Tu **autorregulación** (65/100) es tu punto más vulnerable. Te sobreestimulas con facilidad, absorbes emociones ajenas y a veces respondes más desde la urgencia de otros que desde tu propio criterio. Aquí es donde más impacto tendrá tu plan.`,
    archetype: `**El Conector** es la persona que hace que el resto se sienta parte de algo. Tu superpoder es la conexión: donde otros ven personas separadas, tú ves los hilos invisibles que las pueden unir.

## Cómo te ves
Te percibes como alguien para quien las relaciones son el centro de la vida. Disfrutas haciendo presentaciones, generando planes en grupo, manteniendo el contacto con personas de distintas etapas de tu vida. Te incomoda la frialdad, la distancia gratuita y los conflictos no abordados.

## Cómo te ven los demás
Tu entorno te describe con palabras como "cálida", "cercana", "alguien que une". Pareces tener tiempo para todo el mundo. Algunos te admiran, otros se apoyan demasiado en ti, y algunos pocos no entienden cómo logras mantener tantas relaciones activas a la vez.

## Tus fortalezas
- **Empatía profunda**: lees a las personas con precisión sorprendente.
- **Comunicación efectiva**: sabes elegir las palabras y el momento.
- **Construcción de redes**: tu capital relacional es uno de tus mayores activos.
- **Gestión de conflictos**: mediates con tacto y firmeza.
- **Capacidad de generar pertenencia**: las personas se sienten parte cuando estás presente.

## Tus áreas de crecimiento
- **Autorregulación**: absorbes lo de los demás. Necesitas rituales propios de descarga.
- **Límites personales**: te cuesta decir que no. Aprende que un no es una forma de cuidado.
- **Motivación propia**: define qué quieres tú, no el grupo. Tu brújula interna necesita más entrenamiento.
- **Tiempo en soledad**: la conexión contigo es tan importante como la conexión con otros.`,
    impact: `## Relaciones
Eres el alma de tu círculo. Recuerdas cumpleaños, organizas reencuentros, das soporte emocional sin que nadie te lo pida. Tus relaciones tienden a ser muchas y profundas a la vez, lo cual es poco común. La parte difícil: a veces sientes que llevas tú el peso de mantenerlas vivas, y eso cansa.

En tu vida de pareja, tu superpoder es la conexión emocional cotidiana. La sombra es que puedes priorizar tanto la armonía que evites confrontaciones necesarias. Tu pareja necesita conocer también tu enfado, no solo tu cariño.

## Trabajo
En el entorno laboral eres la pieza que mantiene unido al equipo. Eres la persona a la que se le confían las cuestiones delicadas, la mediadora en las tensiones, la facilitadora de procesos colectivos. Brillas especialmente en roles de relación: comunicación, ventas consultivas, gestión de personas, liderazgo de equipos.

Si lideras, tu estilo es democrático y participativo. Cuidado con dejar las decisiones difíciles en manos del consenso cuando lo que se necesita es tu criterio. La empatía no debe ser excusa para no liderar.

## Decisiones
Tus decisiones tienden a integrar muchas perspectivas. Esto es una virtud cuando hay tiempo, pero un cuello de botella cuando hay que decidir rápido. A veces te pierdes en intentar que todos estén bien y olvidas qué quieres tú.

Practica decisiones tomadas únicamente desde tu criterio, sin consultar. No para imponerlas, sino para entrenar el músculo de saber qué quieres independientemente de la opinión ajena.`,
    plan: `Este plan de 90 días está pensado para tu perfil de **El Conector**: mantener tu enorme capacidad relacional mientras desarrollas más autorregulación, límites y conexión contigo misma.

## Fase 1: Descarga y diferenciación
Las primeras tres semanas se centran en separar lo tuyo de lo que absorbes de los demás. Una herramienta clave.

- Lleva un registro diario de emociones, marcando cuáles son tuyas y cuáles son de otros.
- Aprende dos técnicas de descarga energética: respiración 4-7-8 y caminata sin móvil.
- Identifica tres relaciones donde sientes que das más de lo que recibes.
- Practica una hora al día completamente a solas, sin interacción.

## Fase 2: Límites y voz propia
El segundo bloque introduce límites concretos en tu vida y empieza a entrenar tu voz propia.

- Cada semana, di un no claro a algo que normalmente aceptarías por inercia.
- Practica la frase "necesito pensarlo" antes de comprometerte con cualquier cosa.
- Identifica una opinión sobre la que no estés de acuerdo con tu grupo y verbalízala.
- Reserva dos noches al mes solo para ti, sin planes con nadie.

## Fase 3: Integración del nuevo equilibrio
El último mes integra los nuevos hábitos en tu vida regular. El objetivo es que tu generosidad relacional siga intacta pero ahora desde el lleno, no desde el sacrificio.

- Define tres prioridades personales que no dependan de nadie más.
- Revisa tu red: invierte más en relaciones recíprocas, suelta las que solo drenan.
- Diseña un ritual semanal de chequeo contigo: 30 minutos para escucharte.
- Cierra el plan con un compromiso explícito a tu pareja, familia o amigos sobre lo que sí necesitas tú.`,
  },
  'el-empatico': {
    executive: `Tu perfil es el de **El Empático**: una persona profundamente sensible al mundo emocional ajeno. Sientes lo que sienten otros con tal intensidad que a veces no distingues lo tuyo de lo suyo. Esta sensibilidad es un regalo y, sin gestión, también una carga.

Tu puntuación global de 77/100 refleja un perfil emocionalmente muy desarrollado. Tu empatía está en el rango más alto posible — pocas personas tienen tu capacidad de captar matices que a otros se les escapan.

El reto principal está en cuidar tu sistema sin perder tu capacidad de conectar. Tu plan se centra en la autorregulación, en no absorber lo ajeno y en construir límites sanos: aprender a sentir con el otro sin perderte en él.`,
    dimensions: `Tu **empatía** (95/100) está en el techo posible. Sabes cómo se siente la otra persona antes de que abra la boca. Esto es tu enorme don y tu mayor desafío.

Tus **habilidades sociales** (82/100) son excelentes en el formato profundo: relaciones uno-a-uno, conversaciones significativas, vínculos duraderos. En lo superficial — small talk, eventos masivos — te agotas rápido.

Tu **autoconciencia** (78/100) es alta. Te conoces bien, identificas tus emociones con precisión, sabes lo que te hace bien y lo que te daña. El problema es que aún sabiéndolo, te cuesta priorizarlo frente a las necesidades de otros.

Tu **motivación** (70/100) es sólida cuando hay un sentido humano detrás de lo que haces. Te cuesta movilizarte por causas abstractas o por incentivos puramente externos.

Tu **autorregulación** (60/100) es tu mayor área de crecimiento. Las emociones — propias y ajenas — te atraviesan con intensidad. Cuando una persona cercana sufre, sufres tú. Cuando una conversación es tensa, te la llevas a casa. Necesitas herramientas concretas para procesar y soltar.`,
    archetype: `**El Empático** es la persona que llora con las películas que a otros les resbalan. Tu superpoder es la sensibilidad: ves capas emocionales que a la mayoría de personas les son invisibles.

## Cómo te ves
Te percibes como alguien que siente todo "demasiado" — y a la vez no querrías ser de otra manera. Tu mundo interior es rico y matizado. Tus relaciones son pocas pero hondas. Te incomoda la superficialidad, el cinismo y la insensibilidad ante el dolor ajeno.

## Cómo te ven los demás
Tu entorno te describe como "alguien que escucha de verdad", "el primero al que recurro cuando estoy mal", "una persona con un corazón enorme". Algunos te admiran, otros te subestiman pensando que eres frágil, y algunos pocos abusan de tu generosidad emocional sin darse cuenta.

## Tus fortalezas
- **Empatía profunda**: tu radar emocional es excepcional.
- **Escucha activa**: las personas se sienten realmente comprendidas contigo.
- **Comprensión emocional**: lees situaciones complejas con claridad inusual.
- **Capacidad de sostener a otros en momentos difíciles**: tu presencia consuela.
- **Sensibilidad estética y vital**: vives la belleza, el arte y los detalles con intensidad.

## Tus áreas de crecimiento
- **Autorregulación**: necesitas técnicas concretas para no quedar atrapada en emociones intensas.
- **No absorber emociones ajenas**: aprender a "sentir con" sin "sentir como" el otro.
- **Límites**: tu generosidad sin freno te agota. Un límite no es una traición.
- **Espacio propio**: necesitas más soledad de la que crees. Reservarla no es egoísmo.`,
    impact: `## Relaciones
En tus relaciones cercanas eres alguien con quien la otra persona puede ser completamente vulnerable. No juzgas, no minimizas, no apuras procesos. Esto te hace una pareja, amiga o familiar extraordinaria — y también te expone a ser la cuidadora emocional permanente.

Tu pareja recibe de ti una intimidad emocional poco común. La sombra es que a veces tu sensibilidad puede leer microreacciones que tu pareja no quería emitir y construir narrativas dolorosas sobre lo que ocurre. Aprende a preguntar antes de interpretar.

## Trabajo
En el entorno laboral brillas en cualquier rol que requiera lectura profunda de personas: psicología, coaching, recursos humanos, ventas consultivas, mediación, escritura, arte. Te agotan los entornos competitivos, ruidosos o impersonales.

Si lideras, tu estilo es muy cuidadoso y orientado al desarrollo individual. Tu equipo siente que te importan de verdad. El reto: a veces te cuesta dar feedback duro o tomar decisiones que duelen a alguien. Recuerda que la verdad bien dada es también un acto de cuidado.

## Decisiones
Tus decisiones suelen pasar por un filtro emocional intenso. Esto te permite captar matices que otros no ven, pero también te ralentiza y a veces te paraliza. Cuando tienes que decidir algo que afectará a otros, tiendes a sufrir antes de decidir.

Practica la separación entre "es una decisión correcta" y "no le gustará a todo el mundo". Las dos cosas pueden ser ciertas a la vez. Tu trabajo no es evitar que alguien sufra; es decidir desde tu mejor criterio.`,
    plan: `Este plan de 90 días está diseñado para tu perfil de **El Empático**: mantener intacta tu enorme sensibilidad mientras desarrollas las herramientas para que no te queme.

## Fase 1: Conciencia somática y de absorción
Las primeras tres semanas se centran en notar cuándo y cómo absorbes lo ajeno, en tu cuerpo y en tu mente.

- Aprende a hacer un escáner corporal de 5 minutos cada noche para soltar tensión acumulada.
- Identifica las tres relaciones en las que más absorbes y observa qué emociones traes a casa.
- Después de cada conversación intensa, dedica 3 minutos a respirar y "devolver" lo que no es tuyo.
- Lleva un diario muy breve: una línea sobre cómo te sientes al despertar, al volver a casa, antes de dormir.

## Fase 2: Técnicas de regulación y micro-límites
El segundo bloque introduce herramientas concretas para regular tu sistema y micro-límites en tu vida diaria.

- Practica la técnica RAIN (Reconocer, Aceptar, Investigar, No identificarse) ante cualquier emoción intensa.
- Diseña un ritual de "descompresión" entre el trabajo y casa: paseo, ducha, música, lo que te funcione.
- Cada semana, di un no claro a algo que normalmente aceptarías por sentir culpa.
- Reserva dos tardes al mes solo para ti, sin compromiso emocional con nadie.

## Fase 3: Integración y cuidado sostenible
El último mes consolida un nuevo equilibrio sostenible a largo plazo. Tu empatía sigue intacta, pero ahora opera desde un sistema regulado.

- Define cuáles son tus tres "fuentes de carga" emocional y limítales tiempo o intensidad.
- Identifica tus tres "fuentes de recarga" (naturaleza, arte, soledad, animales, etc.) y prográmalas semanalmente.
- Establece un ritual de revisión mensual sobre tu equilibrio energético.
- Cierra el plan con un compromiso explícito contigo: una práctica diaria innegociable de autocuidado.`,
  },
  'el-impulsor': {
    executive: `Tu perfil es el de **El Impulsor**: una persona orientada a la acción, con alta energía y una motivación poco común. Cuando algo te entusiasma, lo conviertes en realidad. Eres la persona que empieza cosas, las pone en marcha y mantiene el ritmo cuando otros se cansan.

Tu puntuación global de 72/100 refleja un perfil con un motor potente y áreas claras de desarrollo. Tu superpoder es la motivación intrínseca: no necesitas que nadie te empuje, te empujas tú. Esto te ha llevado a logros importantes y seguirá haciéndolo.

El reto principal está en equilibrar tu energía con más pausa y más escucha. Tu plan se centra en autorregulación, empatía y escucha activa: tres palancas para que tu fuerza no atropelle ni a otros ni a ti mismo.`,
    dimensions: `Tu **motivación** (95/100) es excepcional. Tienes uno de los motores internos más potentes que existen. Te marcas objetivos ambiciosos y los persigues con persistencia y energía sostenida.

Tus **habilidades sociales** (78/100) son altas y orientadas a la acción. Sabes movilizar, inspirar y conseguir que las cosas pasen a través de los demás. Tu liderazgo es natural.

Tu **autoconciencia** (65/100) es decente pero está dominada por la acción más que por la reflexión. Sabes lo que quieres, no siempre sabes por qué lo quieres en profundidad.

Tu **empatía** (62/100) es funcional pero no es tu zona de mayor talento. Lees a las personas suficientemente bien para movilizarlas, no necesariamente para comprenderlas en su complejidad emocional.

Tu **autorregulación** (58/100) es tu área más vulnerable. Cuando algo te frustra o te bloquea, tu respuesta es subir la intensidad — más rápido, más fuerte, más exigente. Esto te lleva a desgastes propios y a generar tensión en quienes te rodean.`,
    archetype: `**El Impulsor** es la persona que enciende motores cuando otros aún están analizando si arrancar. Tu superpoder es la acción: donde otros ven obstáculos, tú ves problemas que resolver.

## Cómo te ves
Te percibes como alguien con energía, ambición y capacidad de ejecución. Te aburre la inacción, te impacientas con los procesos lentos, te frustra cuando las personas no se mueven al ritmo que te parece natural. Tu identidad se construye sobre lo que consigues y avanzas.

## Cómo te ven los demás
Tu entorno te describe como "una fuerza de la naturaleza", "alguien que mueve montañas", "el que tira del carro". Algunos te admiran y te siguen, otros te encuentran intenso o agotador, y unos pocos se sienten presionados o invadidos por tu ritmo.

## Tus fortalezas
- **Motivación intrínseca poderosa**: tu motor interno no se apaga fácilmente.
- **Iniciativa**: no esperas permiso para arrancar.
- **Orientación a objetivos**: defines metas claras y vas a por ellas.
- **Liderazgo movilizador**: tu energía contagia.
- **Resiliencia ante el fracaso**: te caes, te levantas y vuelves.

## Tus áreas de crecimiento
- **Autorregulación bajo presión**: aprender a bajar la intensidad cuando subir no funciona.
- **Empatía activa**: escuchar las emociones de otros, no solo sus objeciones.
- **Escucha activa**: detenerte a entender antes de responder o convencer.
- **Pausa y recuperación**: tu cuerpo y tu mente necesitan más descanso del que les das.`,
    impact: `## Relaciones
En tus relaciones cercanas eres una presencia intensa, energizante y exigente. Mueves a tu entorno, propones planes, das soporte concreto en momentos difíciles. Tus seres queridos saben que pueden contar contigo para resolver, organizar, sacar las cosas adelante.

La parte difícil: tu intensidad puede sentirse como presión. A veces les das soluciones cuando solo querían ser escuchados, o aceleras procesos emocionales que necesitan más tiempo. Tu pareja, sobre todo, necesita que a veces solo estés presente sin proponer nada.

## Trabajo
En el entorno laboral eres el motor de cualquier equipo. Te dan los proyectos difíciles, los que requieren energía, los que están atascados. Brillas en roles de emprendimiento, ventas, dirección de proyectos, transformación. Te ahogan los entornos burocráticos y los procesos lentos.

Si lideras, tu estilo es exigente y orientado a resultados. Tu equipo crece contigo, pero también se quema si no aprendes a calibrar tu ritmo. Recuerda que tu velocidad no es la de todos, y que un equipo sostenible necesita pausas reales.

## Decisiones
Tus decisiones son rápidas, claras y orientadas a la acción. Esto es una virtud enorme cuando hay que arrancar, y un riesgo cuando una decisión necesita más reflexión. A veces decides antes de tener toda la información, y eso te cuesta caro.

Practica una regla simple: para decisiones importantes, espera 24 horas antes de comunicar tu decisión. No para cambiarla necesariamente, sino para verificar que sigue siendo correcta cuando baja la urgencia.`,
    plan: `Este plan de 90 días está diseñado para tu perfil de **El Impulsor**: mantener tu motor extraordinario mientras desarrollas más pausa, escucha y empatía.

## Fase 1: Notar el ritmo y los detonantes
Las primeras tres semanas se centran en observar tu intensidad y los momentos en los que se dispara.

- Lleva un registro diario de tu nivel de energía en una escala de 1 a 10, mañana y noche.
- Identifica los tres detonantes que más te aceleran (frustración, lentitud ajena, bloqueos).
- Practica detenerte 60 segundos antes de responder cuando notes que te activas.
- Pregunta a tres personas cercanas cómo perciben tu ritmo emocional y escucha sin defenderte.

## Fase 2: Pausa, empatía y escucha
El segundo bloque introduce micro-prácticas concretas para bajar tu ritmo y abrir tu escucha.

- Practica la regla del "ladrillo": antes de proponer una solución, haz tres preguntas.
- Reserva dos pausas reales de 15 minutos al día sin pantallas, sin tareas, sin objetivos.
- En conversaciones difíciles, repite con tus palabras lo que la otra persona ha dicho antes de responder.
- Cada semana, dedica una hora a una actividad que no produzca ningún resultado tangible.

## Fase 3: Integración y nuevo equilibrio
El último mes integra el nuevo ritmo en tu vida regular. Tu motor sigue intacto, pero ahora con marchas reales y no solo a tope.

- Define qué actividades te recargan de verdad y prográmalas semanalmente como innegociables.
- Identifica un proyecto o objetivo que puedas soltar o aplazar sin que pase nada importante.
- Practica una conversación a la semana en la que tu único objetivo sea entender, no convencer.
- Cierra el plan con un compromiso explícito a tu pareja o equipo sobre cómo vas a cuidar tu ritmo.`,
  },
  'el-observador': {
    executive: `Tu perfil es el de **El Observador**: una persona profundamente reflexiva, con una autoconciencia excepcional y una mirada analítica sobre tu mundo interior y exterior. Te conoces bien, identificas tus patrones con precisión y sabes ponerle nombre a lo que sientes con una claridad poco común.

Tu puntuación global de 75/100 refleja un perfil emocionalmente maduro y con una zona de altísimo desarrollo: tu autoconciencia. Esto te convierte en una persona con quien las conversaciones tienden a ir hondo rápido y con criterio.

El reto principal está en traducir esa riqueza interior en más conexión externa. Tu plan se centra en habilidades sociales, expresión emocional y conexión con otros: aprender a compartir lo que ya ves con tanta claridad.`,
    dimensions: `Tu **autoconciencia** (92/100) está en uno de los rangos más altos posibles. Te conoces con una precisión que la mayoría de personas tardan décadas en alcanzar — o nunca alcanzan.

Tu **autorregulación** (80/100) es muy sólida. Cuando una emoción aparece, sabes nombrarla, observarla y procesarla sin que te atropelle. Tu mundo interior es ordenado y consciente.

Tu **motivación** (72/100) es estable y orientada a la coherencia con tus valores. Necesitas sentido — no actúas por inercia ni por presión social. Esto te aporta integridad y a veces te ralentiza.

Tu **empatía** (70/100) es alta y matizada. Comprendes muy bien las emociones ajenas en lo cognitivo, aunque a veces te cuesta resonar afectivamente con la misma intensidad con la que las analizas.

Tus **habilidades sociales** (60/100) son tu mayor área de crecimiento. Prefieres lo profundo a lo amplio, y eso es una virtud. Pero a veces te pierdes oportunidades por no invertir en las relaciones más ligeras o por no expresar lo que sientes con claridad hacia afuera.`,
    archetype: `**El Observador** es la persona que ve lo que otros no ven, sobre todo en sí mismo. Tu superpoder es la introspección: tu mundo interior es un territorio que recorres con mapa, brújula y curiosidad.

## Cómo te ves
Te percibes como alguien reflexivo, profundo y honesto contigo mismo. Disfrutas las conversaciones de verdad, los libros de calado, la soledad bien empleada. Te incomoda la superficialidad, las máscaras sociales y las conversaciones huecas.

## Cómo te ven los demás
Tu entorno te describe como "alguien interesante", "alguien que piensa mucho", "alguien con quien se aprende". Algunos te encuentran fascinante, otros te perciben como reservado o distante, y algunos pocos no entienden por qué prefieres pocas relaciones profundas a muchas superficiales.

## Tus fortalezas
- **Autoconciencia excepcional**: te conoces con precisión y honestidad inusuales.
- **Análisis emocional**: ves patrones, conexiones y dinámicas que otros pasan por alto.
- **Capacidad de reflexión**: tus decisiones suelen estar bien pensadas y alineadas.
- **Integridad**: actúas según tus valores, no según la presión externa.
- **Profundidad relacional**: tus pocos vínculos íntimos son extraordinariamente ricos.

## Tus áreas de crecimiento
- **Habilidades sociales**: invertir en relaciones ligeras también enriquece la vida.
- **Expresión emocional**: compartir lo que sientes en voz alta te conectaría más.
- **Conexión con otros**: salir del análisis y entrar en el contacto vital.
- **Acción sin sobreanalizar**: a veces hay que decidir y vivir, no solo entender.`,
    impact: `## Relaciones
En tus relaciones cercanas eres alguien con quien la conversación tiende a ir hondo rápido. Las personas a las que dejas entrar reciben de ti una atención muy presente y una honestidad poco común. La parte difícil: dejas entrar a pocas.

Tu pareja, en concreto, puede sentirse afortunada de la profundidad de vuestra conexión, y a la vez echar de menos más ligereza, más espontaneidad, más expresión espontánea de cariño físico o verbal. Tu mundo interior es rico, pero tu pareja necesita verlo afuera, no solo intuir que existe.

## Trabajo
En el entorno laboral brillas en cualquier rol que requiera análisis, profundidad o reflexión: investigación, estrategia, escritura, terapia, consultoría, diseño. Te agotan los entornos muy ruidosos, los eventos de networking superficial y las reuniones sin sustancia.

Si lideras, tu estilo es reflexivo y cuidadoso. Tu equipo aprende contigo, pero necesita también verte expresarte emocionalmente, dar reconocimiento explícito y entrar en lo informal. Tu silencio puede leerse como distancia aunque tú estés muy presente por dentro.

## Decisiones
Tus decisiones son muy meditadas, alineadas con tus valores y robustas frente al ruido externo. Esto es una virtud enorme. La sombra es que a veces sobreanalizas: hay decisiones que solo se resuelven viviendo, no pensando.

Practica decisiones intuitivas en cosas pequeñas — qué comer, qué leer, qué hacer un sábado — para entrenar el músculo de decidir sin pasar por el córtex. Las grandes decisiones necesitan análisis; las pequeñas, no.`,
    plan: `Este plan de 90 días está diseñado para tu perfil de **El Observador**: mantener intacta tu riqueza interior mientras la traduces en más expresión, conexión y vida compartida.

## Fase 1: Notar tus patrones de retirada
Las primeras tres semanas se centran en observar — paradójicamente, tu zona de confort — los momentos en los que eliges retirarte cuando podrías expresar o conectar.

- Identifica las situaciones sociales que tiendes a declinar por inercia y registra el porqué real.
- Lleva un diario de "expresiones contenidas": cosas que pensaste o sentiste y no compartiste.
- Pregunta a tu pareja, familia o mejor amigo qué les gustaría que les expresaras más.
- Observa una semana entera cuánto tiempo pasas en conversación versus en reflexión interna.

## Fase 2: Expresión y conexión activa
El segundo bloque introduce micro-prácticas de expresión emocional y de inversión social ligera.

- Cada día, comparte una emoción específica con alguien cercano sin esperar a que te pregunten.
- Acepta una invitación social que normalmente declinarías y entra con curiosidad genuina.
- Practica un gesto físico de afecto al día con tu pareja o familia: abrazo, mano, beso espontáneo.
- Inicia una conversación a la semana con una persona conocida pero no íntima.

## Fase 3: Integración y vida compartida
El último mes consolida una vida más expresada y conectada. Tu mundo interior sigue siendo rico, pero ahora se vierte afuera con más fluidez.

- Establece un ritual semanal de "expresión emocional" con tu persona más cercana: 15 minutos compartiendo lo que has sentido en la semana.
- Identifica una relación que querrías profundizar y invierte tiempo proactivo en ella.
- Toma una decisión personal sin sobreanalizarla y vívela durante una semana antes de juzgarla.
- Cierra el plan con un compromiso explícito a las personas más cercanas sobre cómo vas a estar más presente y más expresado.`,
  },
};

function makeReportText(slug) {
  const c = REPORT_CONTENT[slug];
  return [
    '# RESUMEN EJECUTIVO',
    c.executive,
    '# DIMENSIONES',
    c.dimensions,
    '# ARQUETIPO',
    c.archetype,
    '# IMPACTO',
    c.impact,
    '# PLAN DE 90 DÍAS',
    c.plan,
  ].join('\n\n');
}

function makeDimensions(dims) {
  // Use max=100 so the displayed value/max ratio is identical to the score.
  return [
    { name: 'self-awareness', score: dims['self-awareness'], max: 100 },
    { name: 'self-regulation', score: dims['self-regulation'], max: 100 },
    { name: 'motivation', score: dims.motivation, max: 100 },
    { name: 'empathy', score: dims.empathy, max: 100 },
    { name: 'social-skills', score: dims['social-skills'], max: 100 },
  ];
}

// ── Run ──────────────────────────────────────────────────────────────────

mkdirSync(OUT_DIR, { recursive: true });

for (const a of ARCHETYPES) {
  const bytes = await buildPdf({
    reportText: makeReportText(a.slug),
    archetype: a.name,
    totalScore: a.totalScore,
    dimensions: makeDimensions(a.dims),
  });
  const dest = join(OUT_DIR, `informe-${a.slug}.pdf`);
  writeFileSync(dest, bytes);
  console.log(`Wrote ${dest} (${bytes.length} bytes, archetype: ${a.name})`);
}
console.log('Done.');
