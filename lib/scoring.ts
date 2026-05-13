import type { DimensionScore, QuizAnswer, QuizResult } from '@/types';
import { QUESTIONS, type Question } from './questions';

type Dimension = Question['dimension'];

const DIMENSION_ORDER: Dimension[] = [
  'self-awareness',
  'self-regulation',
  'motivation',
  'empathy',
  'social-skills',
];

const ARCHETYPES: Record<Dimension, string> = {
  'self-awareness': 'El Observador',
  'self-regulation': 'El Ancla',
  motivation: 'El Impulsor',
  empathy: 'El Empático',
  'social-skills': 'El Conector',
};

// "ancla" is feminine in Spanish, so its evolved form uses "Evolucionada".
const EVOLVED_ARCHETYPES: Record<Dimension, string> = {
  'self-awareness': 'El Observador Evolucionado',
  'self-regulation': 'El Ancla Evolucionada',
  motivation: 'El Impulsor Evolucionado',
  empathy: 'El Empático Evolucionado',
  'social-skills': 'El Conector Evolucionado',
};

const LABELS: Record<Dimension, string> = {
  'self-awareness': 'Autoconciencia',
  'self-regulation': 'Autorregulación',
  motivation: 'Motivación',
  empathy: 'Empatía',
  'social-skills': 'Habilidades Sociales',
};

export function calculateScores(answers: QuizAnswer[]): QuizResult {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.value]));

  const dimensions: DimensionScore[] = DIMENSION_ORDER.map((dim) => {
    const questions = QUESTIONS.filter((q) => q.dimension === dim);
    const score = questions.reduce(
      (sum, q) => sum + (answerMap.get(q.id) ?? 0),
      0,
    );
    const max = questions.length * 5;
    return { name: dim, score, max };
  });

  const rawTotal = dimensions.reduce((s, d) => s + d.score, 0);
  const rawMax = dimensions.reduce((s, d) => s + d.max, 0);
  const totalScore = Math.round((rawTotal / rawMax) * 100);

  let topDim: Dimension = DIMENSION_ORDER[0];
  let topRatio = -Infinity;
  for (const d of dimensions) {
    const ratio = d.max === 0 ? 0 : d.score / d.max;
    if (ratio > topRatio) {
      topRatio = ratio;
      topDim = d.name as Dimension;
    }
  }

  const archetype =
    totalScore >= 80 ? EVOLVED_ARCHETYPES[topDim] : ARCHETYPES[topDim];

  return { totalScore, dimensions, archetype };
}

export function getDimensionLabel(dimension: string): string {
  return LABELS[dimension as Dimension] ?? dimension;
}
