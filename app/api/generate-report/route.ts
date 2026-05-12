import Anthropic from '@anthropic-ai/sdk';
import { QUESTIONS } from '@/lib/questions';
import { getDimensionLabel } from '@/lib/scoring';
import type { QuizAnswer, QuizResult } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const SYSTEM_PROMPT = `You are an expert emotional intelligence coach. Generate a 15-page detailed personalized EQ report based on the user's test answers and EQ results. The report must include: (1) Personalized cover page with name and score, (2) Executive summary with overall EQ score and interpretation, (3) Deep analysis of each of the 5 EQ dimensions with personalized insights, (4) Emotional archetype profile explaining their unique EQ pattern, (5) Impact section covering relationships, work, and decision-making, (6) Personalized 90-day growth plan with specific exercises and practices. Make it professional, warm, and actionable. Output as markdown with clear section headings.`;

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

    const userPrompt = `Generate a personalized 15-page EQ report for this user.

User: ${email}
Overall EQ Score: ${result.totalScore}/100
Emotional Archetype: ${result.archetype}

Dimension Scores:
${dimensionsText}

Test Answers (scale: 1=Never, 2=Rarely, 3=Sometimes, 4=Often, 5=Always):
${answersText}

Produce the full report now in markdown with clear section headings.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
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
