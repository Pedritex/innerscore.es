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
  {
    id: 15,
    dimension: 'self-awareness',
    text: 'Reconozco con facilidad cómo mi estado de ánimo influye en las decisiones que tomo cada día.',
  },
  {
    id: 16,
    dimension: 'self-awareness',
    text: 'Soy consciente de mis principales fortalezas y limitaciones emocionales.',
  },
  {
    id: 17,
    dimension: 'self-awareness',
    text: 'Cuando reacciono de forma desproporcionada, después soy capaz de entender qué lo provocó.',
  },
  {
    id: 18,
    dimension: 'self-regulation',
    text: 'Logro adaptarme con flexibilidad cuando cambian los planes de manera inesperada.',
  },
  {
    id: 19,
    dimension: 'self-regulation',
    text: 'Cuando siento una emoción intensa, encuentro maneras saludables de canalizarla.',
  },
  {
    id: 20,
    dimension: 'self-regulation',
    text: 'Evito decir o hacer cosas de las que después pueda arrepentirme cuando estoy alterado.',
  },
  {
    id: 21,
    dimension: 'motivation',
    text: 'Disfruto del proceso de aprender y mejorar, no solo de los resultados que obtengo.',
  },
  {
    id: 22,
    dimension: 'motivation',
    text: 'Me recupero rápidamente del desánimo después de un fracaso o un revés importante.',
  },
  {
    id: 23,
    dimension: 'motivation',
    text: 'Me marco metas claras y trabajo de forma constante para alcanzarlas.',
  },
  {
    id: 24,
    dimension: 'motivation',
    text: 'Mantengo una actitud optimista incluso cuando las circunstancias son difíciles.',
  },
  {
    id: 25,
    dimension: 'empathy',
    text: 'Soy capaz de ponerme en el lugar de personas cuya forma de pensar es muy distinta a la mía.',
  },
  {
    id: 26,
    dimension: 'empathy',
    text: 'Capto las señales no verbales —tono, gestos, silencios— que muestran cómo se siente alguien.',
  },
  {
    id: 27,
    dimension: 'empathy',
    text: 'Cuando alguien necesita desahogarse, soy capaz de escuchar sin juzgar.',
  },
  {
    id: 28,
    dimension: 'social-skills',
    text: 'Me resulta fácil construir y mantener relaciones de confianza con personas distintas.',
  },
  {
    id: 29,
    dimension: 'social-skills',
    text: 'Sé negociar y llegar a acuerdos en los que todas las partes se sientan respetadas.',
  },
  {
    id: 30,
    dimension: 'social-skills',
    text: 'En un grupo, contribuyo a generar un clima de colaboración y cohesión.',
  },
];
