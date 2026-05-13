import Anthropic from '@anthropic-ai/sdk';
import { QUESTIONS } from '@/lib/questions';
import { getDimensionLabel } from '@/lib/scoring';
import type { QuizAnswer, QuizResult } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const SYSTEM_PROMPT = `You are an expert emotional intelligence coach writing a long-form, deeply personalized EQ report. The report MUST be substantial — roughly 15 pages of rendered markdown — and MUST contain every one of the 15 sections listed below, in this exact order, each clearly delimited with a level-1 or level-2 markdown heading. Do not skip, merge, abbreviate, or summarize sections. Do not stop early. Do not output a meta-summary in place of a section. If you start running long, keep going until every section is complete.

REQUIRED SECTIONS (all 15, in order):

1. Cover Page — title, the user's email (used as their identifier), overall EQ score, emotional archetype, and the report date "May 2026".
2. Executive Summary — overall EQ score with a clear interpretation, a snapshot of strengths and growth areas, and what the rest of the report will cover.
3. Dimension Deep-Dive #1: Self-Awareness — score, interpretation, behavioral patterns inferred from the user's answers, strengths, edges, and a vignette-style example.
4. Dimension Deep-Dive #2: Self-Regulation — same structure as above, fully personalized to the user's answers.
5. Dimension Deep-Dive #3: Motivation — same structure as above, fully personalized to the user's answers.
6. Dimension Deep-Dive #4: Empathy — same structure as above, fully personalized to the user's answers.
7. Dimension Deep-Dive #5: Social Skills — same structure as above, fully personalized to the user's answers.
8. Emotional Archetype — a rich profile of the user's archetype: what it means, how it typically shows up, its gifts, its shadow side, and how it interacts with their specific dimension scores.
9. Impact Zone: Relationships — how this EQ profile shows up with partners, family, and close friends; common friction points; concrete relational patterns to watch for.
10. Impact Zone: Work — how this profile influences collaboration, leadership, conflict, feedback, and career fit.
11. Impact Zone: Decision-Making — how emotion shapes this user's choices under pressure, risk tolerance, biases to watch, and decision hygiene tips.
12. EQ Blind Spots — at least three specific blind spots inferred from the user's lowest-scoring questions, each with the underlying pattern and why it tends to go unnoticed.
13. 90-Day Growth Plan — a concrete, week-by-week or phase-based plan (30/60/90) with specific practices, prompts, and measurable check-ins tied to the user's actual lowest dimensions.
14. Final Reflection — a warm, direct closing letter to the user that integrates the report and points toward what's next.
15. Appendix — methodology note, dimension definitions, a per-question recap table or list of the user's answers, and a glossary of key terms.

Style: professional, warm, second-person ("you"), specific (cite the user's scores and answers), and actionable. Output valid markdown with clear "#", "##", and "###" headings so each of the 15 sections is unambiguously delineated. Do not wrap the entire response in a code block.`;

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

    const userPrompt = `Generate the full personalized EQ report for this user now. The report MUST contain all 15 sections defined in the system prompt, in order, each with its own heading. Do not stop until every section — including the Final Reflection and the Appendix — is complete. Date the report "May 2026" on the cover page and anywhere else a date appears.

User: ${email}
Overall EQ Score: ${result.totalScore}/100
Emotional Archetype: ${result.archetype}
Report date: May 2026

Dimension Scores:
${dimensionsText}

Test Answers (scale: 1=Never, 2=Rarely, 3=Sometimes, 4=Often, 5=Always):
${answersText}

Reminder before you begin: produce ALL 15 sections in order — (1) Cover Page, (2) Executive Summary, (3) Self-Awareness deep-dive, (4) Self-Regulation deep-dive, (5) Motivation deep-dive, (6) Empathy deep-dive, (7) Social Skills deep-dive, (8) Emotional Archetype, (9) Impact Zone: Relationships, (10) Impact Zone: Work, (11) Impact Zone: Decision-Making, (12) EQ Blind Spots, (13) 90-Day Growth Plan, (14) Final Reflection, (15) Appendix. Use markdown headings so each section is clearly delimited. Begin now.`;

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
