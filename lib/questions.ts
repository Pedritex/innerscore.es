export type Question = {
  id: number;
  dimension:
    | 'self-awareness'
    | 'self-regulation'
    | 'motivation'
    | 'empathy'
    | 'social-skills';
  text: string;
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    dimension: 'self-awareness',
    text: 'When something upsets me, I can identify exactly what emotion I am feeling.',
  },
  {
    id: 2,
    dimension: 'self-awareness',
    text: 'Before reacting to a difficult situation, I notice how it is affecting me emotionally.',
  },
  {
    id: 3,
    dimension: 'self-awareness',
    text: 'I understand why certain situations cause me more stress or anxiety than others.',
  },
  {
    id: 4,
    dimension: 'self-regulation',
    text: 'When I receive negative feedback, I manage to stay calm and respond with composure.',
  },
  {
    id: 5,
    dimension: 'self-regulation',
    text: 'In moments of conflict or pressure, I pause before acting rather than reacting impulsively.',
  },
  {
    id: 6,
    dimension: 'self-regulation',
    text: 'I am able to manage frustration when things do not go as expected.',
  },
  {
    id: 7,
    dimension: 'motivation',
    text: 'When I face an obstacle, I find internal reasons — not just external ones — to keep going.',
  },
  {
    id: 8,
    dimension: 'motivation',
    text: 'I stay committed to my goals even when there is no immediate reward or external recognition.',
  },
  {
    id: 9,
    dimension: 'empathy',
    text: 'I notice when someone around me is going through a hard time, even if they do not say so openly.',
  },
  {
    id: 10,
    dimension: 'empathy',
    text: 'When someone shares a problem with me, I focus on understanding how they feel before offering solutions.',
  },
  {
    id: 11,
    dimension: 'empathy',
    text: 'I adapt the way I communicate depending on the emotional state of the person I am talking to.',
  },
  {
    id: 12,
    dimension: 'social-skills',
    text: 'I am able to resolve disagreements with others without the situation escalating into conflict.',
  },
  {
    id: 13,
    dimension: 'social-skills',
    text: 'People in my life tend to come to me for support or advice during difficult moments.',
  },
  {
    id: 14,
    dimension: 'social-skills',
    text: 'I can express my ideas and needs clearly without hurting others.',
  },
];
