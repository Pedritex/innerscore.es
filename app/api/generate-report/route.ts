import Anthropic from '@anthropic-ai/sdk';
import { QUESTIONS } from '@/lib/questions';
import { getDimensionLabel } from '@/lib/scoring';
import type { QuizAnswer, QuizResult } from '@/types';

export const maxDuration = 800;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const SYSTEM_PROMPT = `Eres una persona experta en coaching de inteligencia emocional y vas a redactar un informe de IE personalizado de exactamente 15 páginas, ESCRITO ÍNTEGRAMENTE EN ESPAÑOL (castellano). Sé conciso y enfocado: el informe debe estar pensado para caber holgadamente por debajo de 8000 tokens de salida sin truncarse. Distribuye el contenido para que el total renderizado ocupe alrededor de 15 páginas, repartidas de forma equilibrada entre las 6 secciones que se indican abajo.

Todo el texto debe estar en español de España. Trata a la persona de tú. Cita las puntuaciones y respuestas concretas cuando aporten valor; evita la paja, la repetición y los meta-resúmenes.

SECCIONES OBLIGATORIAS (exactamente 6, en este orden, cada una con su propio encabezado markdown):

1. Portada personalizada — título del informe, el correo de la persona usuaria como identificador, puntuación global de IE, arquetipo emocional y fecha del informe: "mayo de 2026".
2. Resumen ejecutivo — puntuación global de IE con una interpretación clara, instantánea de fortalezas y áreas de crecimiento, y qué cubre el resto del informe.
3. Análisis de las 5 dimensiones de IE — una subsección por dimensión (Autoconciencia, Autorregulación, Motivación, Empatía, Habilidades Sociales). Para cada una: puntuación, interpretación, patrones inferidos a partir de las respuestas concretas, y un ejemplo cotidiano breve.
4. Perfil de arquetipo emocional — qué significa el arquetipo de la persona, cómo se manifiesta en su día a día, sus dones, su lado en sombra y cómo dialoga con sus puntuaciones por dimensión.
5. Impacto en relaciones y trabajo — cómo este perfil se traduce en relaciones cercanas (pareja, familia, amistades) y en el ámbito laboral (colaboración, liderazgo, conflicto, feedback). Patrones específicos a vigilar.
6. Plan de crecimiento de 90 días — un plan accionable organizado en fases 30/60/90, con prácticas concretas, preguntas-guía y puntos de control medibles, ligado a las dimensiones más bajas de la persona.

Formato: markdown válido con encabezados "#", "##" y "###" para que las 6 secciones queden inequívocamente delimitadas. No envuelvas la respuesta en un bloque de código. Termina limpiamente al cerrar la sección 6 — no añadas apéndices, despedidas extra ni notas finales que inflen el recuento de tokens.`;

type Body = {
  email: string;
  answers: QuizAnswer[];
  result: QuizResult;
};

export async function POST(request: Request) {
  try {
    const { email, answers, result }: Body = await request.json();

    const dimensionsText = result.dimensions
      .map(
        (d) => `- ${getDimensionLabel(d.name)}: ${d.score}/${d.max}`,
      )
      .join('\n');

    const answersText = answers
      .map((a) => {
        const q = QUESTIONS.find((q) => q.id === a.questionId);
        if (!q) return `Q${a.questionId}: ${a.value}/5`;
        return `Q${a.questionId} [${getDimensionLabel(q.dimension)}] "${q.text}" → ${a.value}/5`;
      })
      .join('\n');

    const userPrompt = `Genera ahora el informe personalizado de IE para esta persona, en español de España, ocupando aproximadamente 15 páginas y manteniéndote claramente por debajo de 8000 tokens. Fecha el informe como "mayo de 2026".

Persona usuaria: ${email}
Puntuación global de IE: ${result.totalScore}/100
Arquetipo Emocional: ${result.archetype}
Fecha del informe: mayo de 2026

Puntuaciones por dimensión:
${dimensionsText}

Respuestas del test (escala: 1=Nunca, 2=Rara vez, 3=A veces, 4=A menudo, 5=Siempre):
${answersText}

Recordatorio: exactamente 6 secciones, en este orden — (1) Portada personalizada, (2) Resumen ejecutivo, (3) Análisis de las 5 dimensiones de IE, (4) Perfil de arquetipo emocional, (5) Impacto en relaciones y trabajo, (6) Plan de crecimiento de 90 días. Encabezados markdown claros. Conciso y enfocado. Termina al cerrar la sección 6.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const text = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return Response.json({ report: text });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 400 });
  }
}
