import Anthropic from '@anthropic-ai/sdk';
import { QUESTIONS } from '@/lib/questions';
import { getDimensionLabel } from '@/lib/scoring';
import type { QuizAnswer, QuizResult } from '@/types';

export const maxDuration = 800;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const SYSTEM_PROMPT = `Eres una persona experta en coaching de inteligencia emocional y vas a redactar un informe de IE largo, profundamente personalizado y ESCRITO ÍNTEGRAMENTE EN ESPAÑOL (castellano). El informe debe ser sustancial — aproximadamente 15 páginas de markdown renderizado — y DEBE contener cada una de las 15 secciones que se enumeran abajo, en este orden exacto, cada una claramente delimitada con un encabezado markdown de nivel 1 o 2. No omitas, fusiones, abrevies ni resumas ninguna sección. No te detengas antes de tiempo. No sustituyas una sección por un meta-resumen. Si te alargas, sigue hasta completar todas las secciones.

Todo el texto del informe debe estar en español de España. No uses inglés salvo para términos propios o intraducibles. Trata a la persona de tú.

SECCIONES OBLIGATORIAS (las 15, en orden):

1. Portada — título, el correo de la persona usuaria (como identificador), puntuación global de IE, arquetipo emocional y la fecha del informe: "mayo de 2026".
2. Resumen Ejecutivo — puntuación global de IE con una interpretación clara, una instantánea de fortalezas y áreas de crecimiento, y qué cubrirá el resto del informe.
3. Análisis profundo de la dimensión #1: Autoconciencia — puntuación, interpretación, patrones de conducta inferidos a partir de las respuestas, fortalezas, límites y un ejemplo en forma de viñeta.
4. Análisis profundo de la dimensión #2: Autorregulación — misma estructura que arriba, totalmente personalizado a partir de las respuestas.
5. Análisis profundo de la dimensión #3: Motivación — misma estructura, totalmente personalizado.
6. Análisis profundo de la dimensión #4: Empatía — misma estructura, totalmente personalizado.
7. Análisis profundo de la dimensión #5: Habilidades Sociales — misma estructura, totalmente personalizado.
8. Arquetipo Emocional — un perfil rico del arquetipo de la persona usuaria: qué significa, cómo suele manifestarse, sus dones, su lado en sombra y cómo interactúa con sus puntuaciones por dimensión.
9. Zona de Impacto: Relaciones — cómo se manifiesta este perfil de IE con la pareja, la familia y las amistades cercanas; puntos de fricción frecuentes; patrones relacionales concretos que conviene vigilar.
10. Zona de Impacto: Trabajo — cómo influye este perfil en la colaboración, el liderazgo, el conflicto, el feedback y el encaje profesional.
11. Zona de Impacto: Toma de decisiones — cómo modula la emoción las decisiones bajo presión, la tolerancia al riesgo, los sesgos a vigilar y consejos de higiene en la toma de decisiones.
12. Puntos ciegos de tu IE — al menos tres puntos ciegos específicos inferidos a partir de las preguntas con menor puntuación, cada uno con el patrón subyacente y por qué tiende a pasar desapercibido.
13. Plan de Crecimiento de 90 días — un plan concreto, organizado por semanas o por fases (30/60/90), con prácticas específicas, preguntas-guía y puntos de control medibles ligados a las dimensiones más bajas de la persona.
14. Reflexión Final — una carta de cierre cercana y directa que integre el informe y apunte hacia lo que viene a continuación.
15. Apéndice — nota metodológica, definiciones de cada dimensión, tabla o lista de recapitulación con las respuestas de la persona, y un glosario de términos clave.

Estilo: profesional, cálido, en segunda persona ("tú"), específico (cita las puntuaciones y las respuestas concretas) y accionable. Genera markdown válido con encabezados claros "#", "##" y "###" para que cada una de las 15 secciones quede inequívocamente delimitada. No envuelvas la respuesta entera en un bloque de código. Recuerda: todo en español.`;

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

    const userPrompt = `Genera ahora el informe completo y personalizado de IE para esta persona. Todo el informe debe estar redactado en español de España. DEBE contener las 15 secciones definidas en el prompt de sistema, en orden, cada una con su propio encabezado. No te detengas hasta que estén completas todas las secciones, incluidas la Reflexión Final y el Apéndice. Fecha el informe como "mayo de 2026" en la portada y en cualquier otro lugar donde aparezca una fecha.

Persona usuaria: ${email}
Puntuación global de IE: ${result.totalScore}/100
Arquetipo Emocional: ${result.archetype}
Fecha del informe: mayo de 2026

Puntuaciones por dimensión:
${dimensionsText}

Respuestas del test (escala: 1=Nunca, 2=Rara vez, 3=A veces, 4=A menudo, 5=Siempre):
${answersText}

Recordatorio antes de empezar: produce LAS 15 secciones en orden — (1) Portada, (2) Resumen Ejecutivo, (3) Análisis profundo de Autoconciencia, (4) Análisis profundo de Autorregulación, (5) Análisis profundo de Motivación, (6) Análisis profundo de Empatía, (7) Análisis profundo de Habilidades Sociales, (8) Arquetipo Emocional, (9) Zona de Impacto: Relaciones, (10) Zona de Impacto: Trabajo, (11) Zona de Impacto: Toma de decisiones, (12) Puntos ciegos de tu IE, (13) Plan de Crecimiento de 90 días, (14) Reflexión Final, (15) Apéndice. Usa encabezados markdown para delimitar claramente cada sección. Todo en español. Comienza ahora.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 16000,
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
