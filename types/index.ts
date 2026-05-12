export type QuizAnswer = {
  questionId: number;
  value: number;
};

export type DimensionScore = {
  name: string;
  score: number;
  max: number;
};

export type QuizResult = {
  totalScore: number;
  dimensions: DimensionScore[];
  archetype: string;
};

export type Purchase = {
  id: string;
  email: string;
  answers: QuizAnswer[];
  result: QuizResult;
  created_at: string;
};
