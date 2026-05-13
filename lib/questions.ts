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
    text: 'Cuando algo me molesta, soy capaz de identificar exactamente qué emoción estoy sintiendo.',
  },
  {
    id: 2,
    dimension: 'self-awareness',
    text: 'Antes de reaccionar ante una situación difícil, me doy cuenta de cómo me está afectando emocionalmente.',
  },
  {
    id: 3,
    dimension: 'self-awareness',
    text: 'Entiendo por qué ciertas situaciones me generan más estrés o ansiedad que otras.',
  },
  {
    id: 4,
    dimension: 'self-regulation',
    text: 'Cuando recibo una crítica negativa, consigo mantener la calma y responder con serenidad.',
  },
  {
    id: 5,
    dimension: 'self-regulation',
    text: 'En momentos de conflicto o presión, hago una pausa antes de actuar en lugar de reaccionar impulsivamente.',
  },
  {
    id: 6,
    dimension: 'self-regulation',
    text: 'Soy capaz de gestionar la frustración cuando las cosas no salen como esperaba.',
  },
  {
    id: 7,
    dimension: 'motivation',
    text: 'Cuando me enfrento a un obstáculo, encuentro motivos internos —no solo externos— para seguir adelante.',
  },
  {
    id: 8,
    dimension: 'motivation',
    text: 'Mantengo el compromiso con mis objetivos aunque no haya una recompensa inmediata ni reconocimiento externo.',
  },
  {
    id: 9,
    dimension: 'empathy',
    text: 'Me doy cuenta cuando alguien a mi alrededor está pasando por un mal momento, aunque no lo diga abiertamente.',
  },
  {
    id: 10,
    dimension: 'empathy',
    text: 'Cuando alguien me cuenta un problema, me centro en entender cómo se siente antes de ofrecer soluciones.',
  },
  {
    id: 11,
    dimension: 'empathy',
    text: 'Adapto mi forma de comunicarme según el estado emocional de la persona con la que estoy hablando.',
  },
  {
    id: 12,
    dimension: 'social-skills',
    text: 'Soy capaz de resolver desacuerdos con los demás sin que la situación se convierta en un conflicto.',
  },
  {
    id: 13,
    dimension: 'social-skills',
    text: 'Las personas de mi entorno suelen acudir a mí en busca de apoyo o consejo en momentos difíciles.',
  },
  {
    id: 14,
    dimension: 'social-skills',
    text: 'Puedo expresar mis ideas y necesidades con claridad sin herir a los demás.',
  },
];
