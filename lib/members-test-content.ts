// Question bank + per-bracket feedback for the 10 member tests.
// Keyed by the catalog test id (string). Each test has 10 questions with
// the correct answer at index 2 (option C) by design.

export type TestQuestion = {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
};

export type ScoreBracket = 'low' | 'mid' | 'high';

export type TestFeedback = Record<
  ScoreBracket,
  { level: string; text: string }
>;

export type TestBank = {
  questions: TestQuestion[];
  feedback: TestFeedback;
};

// ────────────────────────────────────────────────────────────────────────────
// TEST 1 — AUTORREGULACIÓN (slot 1)
// ────────────────────────────────────────────────────────────────────────────
const AUTORREGULACION: TestBank = {
  questions: [
    {
      question: 'Cuando alguien te contradice en público, ¿cómo sueles reaccionar?',
      options: [
        'Me enfado y lo expreso de inmediato',
        'Escucho, respiro y respondo con calma',
        'Me quedo en silencio pero guardo rencor',
        'Evito el tema por completo',
      ],
      correctIndex: 1,
      explanation:
        'La autorregulación implica pausar antes de reaccionar y elegir una respuesta consciente.',
    },
    {
      question: 'Cuando cometes un error importante en el trabajo, ¿qué haces?',
      options: [
        'Me culpo durante días',
        'Lo ignoro y sigo adelante',
        'Lo analizo, aprendo y corrijo el rumbo',
        'Busco a quien culpar',
      ],
      correctIndex: 2,
      explanation:
        'Procesar el error sin quedar atrapado en él es clave en la autorregulación.',
    },
    {
      question: 'Ante una situación muy estresante, ¿cuál es tu primera respuesta?',
      options: [
        'Entro en pánico',
        'Me paralizo',
        'Busco una técnica de calma antes de actuar',
        'Descargo la tensión con otros',
      ],
      correctIndex: 2,
      explanation:
        'Activar mecanismos de calma antes de actuar es la base de la autorregulación emocional.',
    },
    {
      question: 'Si un compañero te trata de manera injusta, ¿qué haces?',
      options: [
        'Le respondo con la misma actitud',
        'Me lo callo y acumulo frustración',
        'Busco un momento tranquilo para hablarlo',
        'Lo comento con todos menos con él',
      ],
      correctIndex: 2,
      explanation:
        'Abordar el conflicto de forma directa y calmada refleja autorregulación e inteligencia social.',
    },
    {
      question: 'Cuando estás muy cansado, ¿cómo afecta eso a tu comportamiento con los demás?',
      options: [
        'No me afecta en absoluto',
        'Soy consciente de ello y me esfuerzo en no descargarlo',
        'Suelo estar más irritable sin darme cuenta',
        'Prefiero aislarme para no molestar',
      ],
      correctIndex: 1,
      explanation:
        'Reconocer cómo el cansancio afecta las emociones y compensarlo es autorregulación avanzada.',
    },
    {
      question: '¿Con qué frecuencia interrumpes a otros cuando hablan?',
      options: [
        'Casi siempre, si tengo algo importante que decir',
        'A veces sin querer',
        'Rara vez, me esfuerzo en esperar mi turno',
        'Nunca, aunque me cueste',
      ],
      correctIndex: 2,
      explanation:
        'Controlar el impulso de interrumpir es una forma directa de autorregulación en la comunicación.',
    },
    {
      question: 'Cuando tomas una decisión impulsiva y sale mal, ¿qué piensas?',
      options: [
        'Que no es culpa mía',
        'Que no debí haberme dejado llevar y aprendo de ello',
        'Que siempre me pasa lo mismo',
        'Que la próxima vez tendré más suerte',
      ],
      correctIndex: 1,
      explanation:
        'Asumir la responsabilidad del impulso y extraer aprendizaje es madurez emocional.',
    },
    {
      question: 'Cuando sientes una emoción muy intensa, ¿qué sueles hacer?',
      options: [
        'Actuar de inmediato según lo que siento',
        'Identificar la emoción antes de actuar',
        'Reprimirla completamente',
        'Distraerme para no sentirla',
      ],
      correctIndex: 1,
      explanation:
        'Nombrar la emoción antes de actuar es el primer paso de la autorregulación efectiva.',
    },
    {
      question: 'En una reunión tensa, ¿cómo gestionas tu estado interno?',
      options: [
        'Me desconecto mentalmente',
        'Respiro y mantengo la calma conscientemente',
        'Expreso todo lo que siento en el momento',
        'Me pongo a la defensiva enseguida',
      ],
      correctIndex: 1,
      explanation:
        'Mantener la regulación emocional en situaciones de tensión grupal es una habilidad clave.',
    },
    {
      question: '¿Cuánto tiempo tardas en calmarte después de un conflicto?',
      options: [
        'Días, no puedo soltarlo fácilmente',
        'Horas, me cuesta pero lo consigo',
        'Relativamente poco, tengo estrategias para soltar',
        'Me calmo enseguida aunque quede resentimiento',
      ],
      correctIndex: 2,
      explanation:
        'La capacidad de recuperación emocional rápida y limpia es el indicador más claro de autorregulación.',
    },
  ],
  feedback: {
    low: {
      level: 'Área de mejora',
      text: 'Tu autorregulación todavía está en construcción y eso es una buena noticia: significa que tienes mucho margen para crecer. Empieza por algo concreto — una pausa de tres respiraciones antes de responder en situaciones tensas. Pequeños cambios sostenidos transforman tu paisaje emocional en cuestión de semanas.',
    },
    mid: {
      level: 'En desarrollo',
      text: 'Tienes una base sólida de autorregulación: la mayoría de las veces consigues pausar y responder con criterio. Tu siguiente nivel está en las situaciones que aún te pillan a contrapié — esos momentos donde reaccionas antes de pensar. Identifícalos y trabaja ahí; el resto ya lo tienes.',
    },
    high: {
      level: 'Fortaleza',
      text: 'La autorregulación es claramente una de tus fortalezas. Sabes cuándo y cómo bajar tus revoluciones internas, y eso te convierte en alguien fiable bajo presión. Tu reto ahora es asegurarte de que esa regulación es elección — no evitación — y enseñar a otros lo que tú haces por instinto.',
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TEST 2 — AUTOCONCIENCIA EMOCIONAL (slot 2)
// ────────────────────────────────────────────────────────────────────────────
const AUTOCONCIENCIA: TestBank = {
  questions: [
    {
      question: 'Cuando sientes que algo te molesta, ¿puedes identificar exactamente qué emoción es?',
      options: [
        'Raramente, solo sé que me siento mal',
        'A veces, con esfuerzo',
        'Casi siempre, tengo un vocabulario emocional amplio',
        'Nunca me paro a pensarlo',
      ],
      correctIndex: 2,
      explanation:
        'La autoconciencia emocional empieza por poder nombrar con precisión lo que se siente.',
    },
    {
      question: '¿Con qué frecuencia notas cómo tu estado emocional afecta tu rendimiento?',
      options: [
        'Casi nunca',
        'Solo cuando es muy evidente',
        'Habitualmente, lo monitorizo de forma activa',
        'Creo que no me afecta',
      ],
      correctIndex: 2,
      explanation: 'Observar la relación entre emoción y rendimiento es autoconciencia aplicada.',
    },
    {
      question: '¿Sabes qué situaciones o personas tienden a activar tus emociones más intensas?',
      options: [
        'No lo he pensado',
        'Tengo una idea vaga',
        'Sí, los conozco bien y los anticipo',
        'Todo me afecta por igual',
      ],
      correctIndex: 2,
      explanation:
        'Identificar los propios detonantes emocionales es un signo claro de autoconciencia profunda.',
    },
    {
      question: 'Cuando tomas una decisión, ¿eres consciente de qué emociones están influyendo?',
      options: [
        'No, decido con la cabeza fría siempre',
        'A veces me doy cuenta después',
        'Suelo identificarlo en el momento',
        'Las emociones no deberían influir en decisiones',
      ],
      correctIndex: 2,
      explanation:
        'Reconocer el papel de las emociones en las decisiones es fundamental para la inteligencia emocional.',
    },
    {
      question: '¿Notas cambios físicos en tu cuerpo cuando experimentas emociones fuertes?',
      options: [
        'No, no les presto atención',
        'Solo en emociones muy intensas',
        'Sí, los reconozco como señales emocionales útiles',
        'A veces, pero no sé qué significan',
      ],
      correctIndex: 2,
      explanation:
        'El cuerpo es el primer registro de las emociones. Leerlo es autoconciencia somática.',
    },
    {
      question: '¿Cuánto conoces tus propios valores y cómo influyen en tus reacciones?',
      options: [
        'No los tengo muy definidos',
        'Los conozco pero no los relaciono con mis emociones',
        'Los tengo claros y entiendo cómo guían mis reacciones',
        'Prefiero no profundizar en eso',
      ],
      correctIndex: 2,
      explanation:
        'Los valores son la brújula emocional. Conocerlos es autoconciencia en su nivel más profundo.',
    },
    {
      question: 'Cuando alguien te señala un comportamiento tuyo, ¿cómo reaccionas?',
      options: [
        'Me pongo a la defensiva',
        'Lo escucho pero no lo integro',
        'Lo considero con apertura como información útil',
        'Lo ignoro si no me convence',
      ],
      correctIndex: 2,
      explanation:
        'La apertura al feedback es un indicador directo del nivel de autoconciencia emocional.',
    },
    {
      question: '¿Llevas algún tipo de registro o reflexión sobre tus estados emocionales?',
      options: [
        'No, nunca',
        'Ocasionalmente',
        'Sí, de forma regular (diario, meditación, etc.)',
        'Lo intenté pero lo dejé',
      ],
      correctIndex: 2,
      explanation:
        'Las prácticas reflexivas regulares desarrollan y consolidan la autoconciencia emocional.',
    },
    {
      question: '¿Puedes distinguir entre sentirte ansioso y sentirte emocionado ante algo nuevo?',
      options: [
        'No, las confundo frecuentemente',
        'A veces',
        'Sí, reconozco los matices entre emociones similares',
        'Para mí son lo mismo',
      ],
      correctIndex: 2,
      explanation:
        'Distinguir emociones similares con precisión es una señal de vocabulario emocional desarrollado.',
    },
    {
      question: 'Cuando te preguntan cómo estás, ¿qué respondes habitualmente?',
      options: [
        'Bien, siempre (sin pensar)',
        'Depende de si me importa la persona',
        'Hago una pausa y respondo desde lo real',
        'No sé muy bien cómo estoy',
      ],
      correctIndex: 2,
      explanation:
        'Responder con autenticidad requiere un momento de introspección real — eso es autoconciencia.',
    },
  ],
  feedback: {
    low: {
      level: 'Área de mejora',
      text: 'Tu autoconciencia tiene aún mucho terreno por explorar — y eso es valioso, porque cada paso aquí desbloquea las otras cuatro dimensiones de la IE. Empieza con un ejercicio sencillo: tres veces al día, pausa 30 segundos y pregúntate qué emoción estás sintiendo. Solo eso, sin juzgarla. En un mes notarás la diferencia.',
    },
    mid: {
      level: 'En desarrollo',
      text: 'Tienes una autoconciencia funcional: identificas tus emociones con cierta claridad y empiezas a leer tu propio paisaje interno. El siguiente nivel está en la profundidad — distinguir matices entre emociones similares, conectar lo que sientes con tus valores, y dar el salto del "qué" siento al "por qué". Un diario emocional acelera mucho ese paso.',
    },
    high: {
      level: 'Fortaleza',
      text: 'Tu autoconciencia es claramente una de tus fortalezas: te conoces a ti mismo con una claridad poco común. Tu reto ahora es que ese mapa interno no se vuelva en tu contra (rumiación, exceso de análisis). La autoconciencia madura sabe cuándo dejar de mirarse para empezar a actuar desde lo que ya ha comprendido.',
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TEST 3 — MOTIVACIÓN INTRÍNSECA (slot 3)
// ────────────────────────────────────────────────────────────────────────────
const MOTIVACION: TestBank = {
  questions: [
    {
      question: '¿Por qué razón principal te esfuerzas en tu trabajo?',
      options: [
        'Por el sueldo',
        'Por el reconocimiento externo',
        'Porque me apasiona lo que hago y quiero crecer',
        'Para evitar consecuencias negativas',
      ],
      correctIndex: 2,
      explanation:
        'La motivación intrínseca se activa cuando la acción tiene valor en sí misma, no solo por sus recompensas.',
    },
    {
      question: 'Cuando un proyecto se pone difícil, ¿qué te mantiene en marcha?',
      options: [
        'El miedo a fallar',
        'La presión de los demás',
        'El propósito que le encuentro al proyecto',
        'Nada, suelo abandonar',
      ],
      correctIndex: 2,
      explanation:
        'El propósito personal es el combustible más sostenible de la motivación intrínseca.',
    },
    {
      question: '¿Con qué frecuencia buscas aprender cosas nuevas por iniciativa propia?',
      options: [
        'Raramente',
        'Solo si es necesario para el trabajo',
        'Habitualmente, la curiosidad me mueve',
        'Cuando alguien me lo pide',
      ],
      correctIndex: 2,
      explanation:
        'La curiosidad espontánea es una de las expresiones más puras de la motivación intrínseca.',
    },
    {
      question: 'Cuando alcanzas un objetivo, ¿qué haces?',
      options: [
        'Me relajo y no me propongo más metas',
        'Espero que me reconozcan el logro',
        'Celebro y me propongo el siguiente reto',
        'Minimizo el logro y sigo sin procesarlo',
      ],
      correctIndex: 2,
      explanation:
        'La orientación al crecimiento continuo es característica de una motivación intrínseca sólida.',
    },
    {
      question: '¿Tienes una visión clara de hacia dónde quieres ir en tu vida?',
      options: [
        'No, voy al día',
        'Tengo ideas vagas',
        'Sí, tengo una visión que me guía y me motiva',
        'Lo he intentado pero no me funciona',
      ],
      correctIndex: 2,
      explanation:
        'Tener una visión personal clara es el ancla de la motivación intrínseca a largo plazo.',
    },
    {
      question: 'Cuando fracasas en algo, ¿cómo lo vives?',
      options: [
        'Como una catástrofe personal',
        'Con resignación',
        'Como información para mejorar y seguir',
        'Intentando culpar a factores externos',
      ],
      correctIndex: 2,
      explanation:
        'La resiliencia ante el fracaso es un indicador directo de motivación intrínseca sólida.',
    },
    {
      question: '¿Te fijas objetivos personales al margen de los que te imponen externamente?',
      options: [
        'No, me muevo por lo que me piden',
        'A veces',
        'Sí, regularmente y con intención',
        'Los objetivos me generan presión',
      ],
      correctIndex: 2,
      explanation:
        'La autogestión de metas es una expresión directa de motivación intrínseca.',
    },
    {
      question: '¿Cómo te sientes cuando haces algo en lo que eres bueno?',
      options: [
        'Indiferente',
        'Bien solo si alguien lo nota',
        'Satisfecho por el proceso en sí',
        'Con presión de mantener el nivel',
      ],
      correctIndex: 2,
      explanation:
        'Disfrutar del proceso independientemente del reconocimiento es motivación intrínseca pura.',
    },
    {
      question: '¿Sueles abandonar proyectos a medias?',
      options: [
        'Con frecuencia',
        'A veces',
        'Raramente, me comprometo con lo que empiezo',
        'Depende de si alguien me supervisa',
      ],
      correctIndex: 2,
      explanation:
        'La constancia sin supervisión externa es uno de los indicadores más claros de motivación intrínseca.',
    },
    {
      question: '¿Cómo de alineado está tu trabajo diario con tus valores personales?',
      options: [
        'Nada alineado',
        'Algo alineado',
        'Muy alineado, lo busco activamente',
        'No me lo he planteado',
      ],
      correctIndex: 2,
      explanation:
        'La alineación entre valores y acción diaria es la fuente más profunda de motivación sostenible.',
    },
  ],
  feedback: {
    low: {
      level: 'Área de mejora',
      text: 'Tu motor interno está algo desconectado ahora mismo, y eso pasa cuando llevas tiempo persiguiendo metas que no son del todo tuyas. No es falta de capacidad — es falta de alineación. Tómate un rato esta semana para escribir qué te gustaría hacer si nadie te juzgase. Ese ejercicio es el primer paso para reconectar con tu motivación intrínseca.',
    },
    mid: {
      level: 'En desarrollo',
      text: 'Tu motivación intrínseca funciona, pero hay áreas donde dependes todavía de empujones externos. Identifica las dos o tres actividades de tu vida donde te mueve realmente lo que haces (no la recompensa) y trata de rediseñar más de tu día a día alrededor de esa energía. El motor interno se entrena escuchándolo, no solo usándolo.',
    },
    high: {
      level: 'Fortaleza',
      text: 'Te mueves desde dentro, y eso se nota en la calidad y sostenibilidad de tu esfuerzo. Tu reto no es encontrar gasolina sino elegir bien dónde la diriges. Revisa cada cierto tiempo si tus objetivos siguen alineados con quien eres ahora, porque la motivación intrínseca persigue versiones obsoletas de uno mismo si nadie la actualiza.',
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TEST 4 — EMPATÍA AVANZADA (slot 4)
// ────────────────────────────────────────────────────────────────────────────
const EMPATIA: TestBank = {
  questions: [
    {
      question: 'Cuando alguien te cuenta un problema, ¿qué haces primero?',
      options: [
        'Dar consejos de inmediato',
        'Contar una experiencia similar tuya',
        'Escuchar y entender su perspectiva antes de responder',
        'Intentar solucionar el problema rápido',
      ],
      correctIndex: 2,
      explanation: 'La empatía empieza por escuchar para comprender, no para responder.',
    },
    {
      question: '¿Puedes entender el punto de vista de alguien aunque no compartas sus creencias?',
      options: [
        'Raramente',
        'Solo si la persona me cae bien',
        'Habitualmente, aunque no esté de acuerdo',
        'No, si no lo comparto no lo entiendo',
      ],
      correctIndex: 2,
      explanation:
        'La empatía cognitiva permite comprender perspectivas ajenas sin necesidad de compartirlas.',
    },
    {
      question: 'Cuando hay tensión en un grupo, ¿lo percibes antes que los demás?',
      options: [
        'Generalmente no',
        'A veces',
        'Casi siempre, soy sensible a la dinámica grupal',
        'Solo cuando alguien lo dice explícitamente',
      ],
      correctIndex: 2,
      explanation:
        'La sensibilidad al clima emocional grupal es una forma de empatía sistémica.',
    },
    {
      question: '¿Con qué frecuencia te preguntas cómo se siente la otra persona en una conversación?',
      options: [
        'Raramente',
        'Solo si parece afectada',
        'Habitualmente, es parte de cómo escucho',
        'Me centro en el contenido, no en las emociones',
      ],
      correctIndex: 2,
      explanation:
        'La pregunta empática activa es una práctica central de la inteligencia emocional interpersonal.',
    },
    {
      question: 'Cuando alguien llora o se emociona, ¿cómo reaccionas?',
      options: [
        'Me incomoda y lo evito',
        'Intento que se calme rápido',
        'Acompaño el momento sin precipitarme',
        'No sé cómo actuar',
      ],
      correctIndex: 2,
      explanation:
        'Sostener el espacio emocional de otra persona sin querer "arreglarlo" es empatía profunda.',
    },
    {
      question: '¿Puedes identificar cuando alguien dice una cosa pero siente otra?',
      options: [
        'No, me quedo con lo que dicen',
        'A veces lo intuyo',
        'Habitualmente leo entre líneas',
        'No me parece relevante',
      ],
      correctIndex: 2,
      explanation:
        'Leer la disonancia entre el mensaje verbal y emocional es empatía avanzada.',
    },
    {
      question: '¿Adaptas tu forma de comunicarte según el estado emocional de la otra persona?',
      options: [
        'No, me comunico igual con todos',
        'Solo con personas cercanas',
        'Sí, ajusto el tono y el contenido según cómo veo a la persona',
        'Me parece difícil de hacer',
      ],
      correctIndex: 2,
      explanation:
        'La comunicación adaptativa basada en la lectura emocional es empatía en acción.',
    },
    {
      question: 'Cuando alguien hace algo que no entiendes, ¿qué piensas?',
      options: [
        'Que está equivocado',
        'Que es raro o diferente',
        'Que debe tener razones que aún no conozco',
        'Que es problema suyo',
      ],
      correctIndex: 2,
      explanation:
        'Asumir que existe una razón detrás del comportamiento ajeno es el fundamento de la empatía.',
    },
    {
      question: '¿Recuerdas detalles personales de las personas que te importan?',
      options: [
        'Raramente',
        'Solo los más importantes',
        'Sí, les presto atención genuina',
        'Se me olvida enseguida',
      ],
      correctIndex: 2,
      explanation:
        'La memoria de detalles personales refleja interés genuino y presencia empática.',
    },
    {
      question: '¿Cómo te sientes cuando alguien cercano sufre?',
      options: [
        'Intento no contagiarme emocionalmente',
        'Me afecta pero mantengo distancia',
        'Lo siento de verdad y busco acompañar',
        'Me resulta difícil conectar con el sufrimiento ajeno',
      ],
      correctIndex: 2,
      explanation:
        'La resonancia emocional auténtica con el sufrimiento ajeno es la expresión más profunda de la empatía afectiva.',
    },
  ],
  feedback: {
    low: {
      level: 'Área de mejora',
      text: 'Tu empatía hoy está más en stand-by que activa, y eso suele ocurrir cuando has tenido que protegerte mucho o cuando vives en entornos que no la premian. Empieza con un microhábito: en tu próxima conversación, antes de responder, intenta nombrar mentalmente qué siente la otra persona. Solo eso. La empatía se entrena prestando atención de forma deliberada.',
    },
    mid: {
      level: 'En desarrollo',
      text: 'Tu empatía está despierta en muchas situaciones, pero todavía hay contextos donde te cuesta — quizás con personas muy distintas a ti, o cuando estás cansado. El siguiente paso es la consistencia: empatizar cuando es fácil es habilidad, empatizar cuando no apetece es maestría. Identifica un escenario donde habitualmente desconectas y practica ahí.',
    },
    high: {
      level: 'Fortaleza',
      text: 'Tu empatía es uno de tus mayores activos: lees a la gente, sostienes su espacio emocional, conectas en profundidad. Tu reto ahora es proteger esa sensibilidad del agotamiento. Empatizar sin fusionarse con el otro, poner límites sin sentirte culpable y reconocer cuándo es tu turno de ser cuidado son las próximas fronteras del nivel maestro.',
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TEST 5 — HABILIDADES SOCIALES (slot 5)
// ────────────────────────────────────────────────────────────────────────────
const HABILIDADES: TestBank = {
  questions: [
    {
      question: 'En una reunión con personas desconocidas, ¿cómo te sientes?',
      options: [
        'Incómodo y retraído',
        'Neutro, espero a que me hablen',
        'Cómodo, tomo iniciativa para conectar',
        'Solo si tengo algo que ganar',
      ],
      correctIndex: 2,
      explanation:
        'La iniciativa social cómoda ante desconocidos es una señal de habilidades sociales desarrolladas.',
    },
    {
      question: 'Cuando hay un conflicto en tu equipo, ¿qué papel adoptas?',
      options: [
        'Me mantengo al margen',
        'Tomo partido por quien creo que tiene razón',
        'Intento facilitar el diálogo y encontrar puntos comunes',
        'Lo ignoro hasta que se resuelva solo',
      ],
      correctIndex: 2,
      explanation:
        'Actuar como facilitador en conflictos grupales es una habilidad social avanzada.',
    },
    {
      question: '¿Con qué facilidad construyes relaciones de confianza?',
      options: [
        'Me cuesta mucho',
        'Solo con personas muy parecidas a mí',
        'Con relativa facilidad, invierto en las relaciones',
        'Prefiero no depender de otros',
      ],
      correctIndex: 2,
      explanation:
        'La capacidad de generar confianza de forma natural es el núcleo de las habilidades sociales.',
    },
    {
      question: 'Cuando necesitas persuadir a alguien, ¿qué estrategia usas?',
      options: [
        'Insisto hasta que cede',
        'Argumento con datos y lógica',
        'Entiendo su perspectiva y adapto el mensaje',
        'Dejo que decida solo',
      ],
      correctIndex: 2,
      explanation:
        'La persuasión empática, basada en entender al otro, es la forma más efectiva y emocionalmente inteligente.',
    },
    {
      question: '¿Cómo manejas las críticas en público?',
      options: [
        'Me cierro y me pongo a la defensiva',
        'Lo acepto pero me afecta durante mucho tiempo',
        'Lo recibo con calma y evalúo si es válido',
        'Lo ignoro si viene de alguien que no respeto',
      ],
      correctIndex: 2,
      explanation:
        'Gestionar las críticas públicas con ecuanimidad es una muestra de madurez social y emocional.',
    },
    {
      question: '¿Sueles hacer que las personas de tu entorno se sientan escuchadas?',
      options: [
        'No lo sé, no lo pienso',
        'Solo cuando tengo tiempo',
        'Sí, es algo que cuido conscientemente',
        'Intento escuchar pero me distraigo',
      ],
      correctIndex: 2,
      explanation:
        'Hacer sentir a otros que son escuchados de verdad es una habilidad social fundamental.',
    },
    {
      question: '¿Cómo reaccionas cuando alguien de tu equipo tiene un mal día?',
      options: [
        'Lo dejo tranquilo y no intervengo',
        'Le pregunto qué le pasa aunque no sea mi problema',
        'Ofrezco apoyo de forma natural sin ser invasivo',
        'Espero que lo solucione solo',
      ],
      correctIndex: 2,
      explanation:
        'El apoyo social calibrado, que respeta el espacio del otro, es una habilidad interpersonal avanzada.',
    },
    {
      question: '¿Te resulta fácil adaptar tu estilo de comunicación según el interlocutor?',
      options: [
        'No, comunico igual con todos',
        'Con esfuerzo',
        'Sí, lo hago de forma bastante natural',
        'Solo con personas muy diferentes a mí',
      ],
      correctIndex: 2,
      explanation:
        'La flexibilidad comunicativa es uno de los indicadores más robustos de habilidades sociales.',
    },
    {
      question: '¿Con qué frecuencia reconoces públicamente el trabajo de otros?',
      options: [
        'Raramente',
        'Solo cuando es extraordinario',
        'Habitualmente, creo que es importante',
        'No me siento cómodo haciéndolo',
      ],
      correctIndex: 2,
      explanation:
        'El reconocimiento genuino fortalece los vínculos y el clima social del grupo.',
    },
    {
      question: 'Cuando tienes que dar malas noticias, ¿cómo lo haces?',
      options: [
        'Lo pospongo todo lo posible',
        'Lo digo de golpe para que no duela más',
        'Busco el momento y la forma más empática posible',
        'Prefiero que lo haga otra persona',
      ],
      correctIndex: 2,
      explanation:
        'Comunicar noticias difíciles con cuidado emocional es una de las habilidades sociales más exigentes.',
    },
  ],
  feedback: {
    low: {
      level: 'Área de mejora',
      text: 'Las habilidades sociales no son tu zona de confort hoy, y eso es completamente legítimo: muchas personas profundamente valiosas se sienten así. La buena noticia es que esta dimensión es la más entrenable de las cinco. Empieza por dos prácticas pequeñas a la semana: una conversación nueva con alguien que apenas conoces y un reconocimiento explícito a alguien cercano. La habilidad se construye con repeticiones cortas.',
    },
    mid: {
      level: 'En desarrollo',
      text: 'Tu habilidad social es competente y operativa. Conectas, gestionas conflictos y mantienes relaciones, pero hay contextos donde aún operas en automático en lugar de con intención. El siguiente nivel está en la calibración fina: leer al interlocutor, ajustar el tono y elegir el momento. Esa precisión es lo que separa la sociabilidad de la maestría social.',
    },
    high: {
      level: 'Fortaleza',
      text: 'Te mueves con fluidez en lo social: la gente se siente cómoda contigo, lees grupos con agilidad, y construyes vínculos casi sin esfuerzo aparente. Tu reto ahora es vigilar que esa fluidez no se convierta en superficialidad. Las habilidades sociales más maduras saben elegir cuándo conectar y cuándo cerrarse, cuándo gustar y cuándo decir la verdad incómoda.',
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TEST 6 — GESTIÓN DEL ESTRÉS (slot 6)
// ────────────────────────────────────────────────────────────────────────────
const ESTRES: TestBank = {
  questions: [
    {
      question: 'Cuando tienes muchas tareas acumuladas, ¿qué haces?',
      options: [
        'Me bloqueo y no sé por dónde empezar',
        'Me pongo nervioso pero empiezo por cualquier cosa',
        'Priorizo, organizo y voy por partes',
        'Lo dejo para después',
      ],
      correctIndex: 2,
      explanation:
        'La organización bajo presión es una estrategia activa de gestión del estrés.',
    },
    {
      question: '¿Con qué frecuencia experimentas síntomas físicos de estrés (tensión, insomnio, dolor)?',
      options: [
        'Casi continuamente',
        'Con frecuencia',
        'Raramente, tengo hábitos que lo previenen',
        'Nunca, no me afecta el estrés',
      ],
      correctIndex: 2,
      explanation:
        'La prevención del estrés crónico mediante hábitos saludables es gestión proactiva.',
    },
    {
      question: 'Cuando no puedes controlar una situación, ¿cómo reaccionas?',
      options: [
        'Me obsesiono con ella',
        'Me frustro mucho',
        'Acepto lo que no depende de mí y actúo sobre lo que sí',
        'Lo evito para no pensar en ello',
      ],
      correctIndex: 2,
      explanation:
        'Distinguir entre lo controlable y lo no controlable es la base de la gestión del estrés efectiva.',
    },
    {
      question: '¿Tienes rutinas establecidas para desconectar del trabajo?',
      options: [
        'No, siempre estoy conectado',
        'Intento pero no lo consigo',
        'Sí, tengo límites claros y los respeto',
        'Los fines de semana intento descansar',
      ],
      correctIndex: 2,
      explanation:
        'Las rutinas de desconexión son una de las herramientas más efectivas contra el estrés crónico.',
    },
    {
      question: 'Cuando estás bajo mucha presión, ¿cómo afecta a tus relaciones?',
      options: [
        'Me vuelvo irritable y lo descargo en los demás',
        'Me aíslo',
        'Soy consciente del impacto y lo gestiono activamente',
        'No creo que afecte a mis relaciones',
      ],
      correctIndex: 2,
      explanation:
        'Gestionar el impacto del estrés propio en las relaciones es inteligencia emocional bajo presión.',
    },
    {
      question: '¿Utilizas alguna técnica consciente para reducir el estrés?',
      options: [
        'No, ninguna',
        'Ocasionalmente',
        'Sí, tengo varias y las uso regularmente',
        'Solo cuando el estrés es muy alto',
      ],
      correctIndex: 2,
      explanation:
        'Tener un repertorio de técnicas de regulación y usarlas preventivamente es gestión del estrés avanzada.',
    },
    {
      question: 'Ante un plazo de entrega muy ajustado, ¿qué haces?',
      options: [
        'Entro en modo pánico',
        'Trabajo sin parar hasta el agotamiento',
        'Organizo el tiempo, pido ayuda si es necesario y mantengo la calma',
        'Negocio el plazo sin intentarlo primero',
      ],
      correctIndex: 2,
      explanation:
        'La gestión estructurada bajo presión de tiempo es una competencia de estrés esencial.',
    },
    {
      question: '¿Cuánto tarda en bajar tu nivel de activación después de un momento estresante?',
      options: [
        'Días',
        'Horas',
        'Relativamente poco, tengo estrategias de bajada de activación',
        'Bajo rápido pero quedo irritable',
      ],
      correctIndex: 2,
      explanation:
        'La velocidad de recuperación tras el estrés es un indicador directo de resiliencia fisiológica y emocional.',
    },
    {
      question: '¿Cómo interpretas generalmente los retos difíciles?',
      options: [
        'Como amenazas',
        'Como cargas',
        'Como oportunidades de aprendizaje',
        'Depende del día',
      ],
      correctIndex: 2,
      explanation:
        'La interpretación de los retos como oportunidades activa la respuesta de crecimiento en lugar de la respuesta de amenaza.',
    },
    {
      question: '¿Cuidas tu sueño, alimentación y ejercicio como parte de tu gestión emocional?',
      options: [
        'No, no los relaciono',
        'A veces',
        'Sí, los veo como pilares de mi equilibrio emocional',
        'Cuando tengo tiempo',
      ],
      correctIndex: 2,
      explanation:
        'El cuidado del cuerpo es la base fisiológica de la regulación emocional y la gestión del estrés.',
    },
  ],
  feedback: {
    low: {
      level: 'Área de mejora',
      text: 'Tu gestión del estrés necesita estructura, y el cuerpo te lo está diciendo. No es debilidad — es una señal de que estás operando con un sistema sin frenos. Empieza por lo básico y no negociable: una rutina de sueño, una pausa real al día, y una técnica de respiración que puedas aplicar en cualquier momento. La base fisiológica antes que cualquier estrategia mental.',
    },
    mid: {
      level: 'En desarrollo',
      text: 'Tienes algunas herramientas de gestión del estrés que ya funcionan, pero todavía hay situaciones que te desbordan. El siguiente nivel es preventivo: identifica los patrones que te llevan al límite y diseña sistemas para evitarlos antes de que ocurran. La mejor gestión del estrés es la que no necesitas activar porque el estrés nunca llegó a tu zona crítica.',
    },
    high: {
      level: 'Fortaleza',
      text: 'Gestionas el estrés con madurez: reconoces tus límites, tienes herramientas, y cuidas tu base fisiológica. Tu reto ahora es asegurarte de que tu calma no es una forma sutil de evitación — preguntarte cada cierto tiempo si la serenidad que sientes es elegida o defensiva. La gestión maestra del estrés también incluye saber cuándo dejarse afectar.',
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TEST 7 — IE EN EL TRABAJO (slot 7)
// ────────────────────────────────────────────────────────────────────────────
const TRABAJO: TestBank = {
  questions: [
    {
      question: 'Cuando tu jefe te hace una crítica, ¿cómo la recibes?',
      options: [
        'Me lo tomo como un ataque personal',
        'Lo acepto pero me afecta mucho',
        'Lo proceso como feedback útil para mejorar',
        'Lo ignoro si no lo comparto',
      ],
      correctIndex: 2,
      explanation:
        'Recibir el feedback profesional sin defensividad es IE aplicada al entorno laboral.',
    },
    {
      question: '¿Cómo gestionas las tensiones con compañeros de trabajo?',
      options: [
        'Las evito',
        'Espero que se resuelvan solas',
        'Las abordo directamente y con respeto',
        'Me quejo con otros en lugar de hablar con la persona',
      ],
      correctIndex: 2,
      explanation:
        'Gestionar conflictos laborales de forma directa y respetuosa es una competencia de IE profesional esencial.',
    },
    {
      question: '¿Puedes trabajar eficazmente con personas muy diferentes a ti?',
      options: [
        'Me resulta muy difícil',
        'Lo intento pero me cuesta',
        'Sí, valoro la diversidad como un activo',
        'Solo si compartimos objetivos',
      ],
      correctIndex: 2,
      explanation:
        'La capacidad de colaborar con perfiles distintos amplifica la efectividad profesional.',
    },
    {
      question: 'Cuando el ambiente laboral es tenso, ¿cómo te afecta?',
      options: [
        'Me contagio y pierdo productividad',
        'Lo ignoro pero noto que me desgasta',
        'Lo reconozco y busco mantener mi equilibrio',
        'No me afecta el ambiente',
      ],
      correctIndex: 2,
      explanation:
        'Mantener el equilibrio emocional propio en entornos tensos es IE profesional avanzada.',
    },
    {
      question: '¿Comunicas tus necesidades y límites en el trabajo de forma clara?',
      options: [
        'No, prefiero no crear conflictos',
        'Solo cuando ya no aguanto más',
        'Sí, de forma asertiva y oportuna',
        'Depende de con quién',
      ],
      correctIndex: 2,
      explanation:
        'La asertividad laboral es una habilidad de IE que protege el bienestar y la productividad.',
    },
    {
      question: 'Cuando un proyecto fracasa, ¿cómo reaccionas en equipo?',
      options: [
        'Busco responsables',
        'Me desanimo y pierdo motivación',
        'Analizo qué falló y propongo aprendizajes',
        'Lo minimizo para que no afecte al grupo',
      ],
      correctIndex: 2,
      explanation:
        'Convertir el fracaso en aprendizaje colectivo es liderazgo emocional en acción.',
    },
    {
      question: '¿Con qué facilidad te adaptas a los cambios en el entorno laboral?',
      options: [
        'Con mucha dificultad',
        'Me cuesta pero lo consigo',
        'Con relativa agilidad, veo el cambio como una oportunidad',
        'Solo si los cambios me benefician directamente',
      ],
      correctIndex: 2,
      explanation:
        'La adaptabilidad emocional ante el cambio es una de las competencias más valoradas en entornos profesionales actuales.',
    },
    {
      question: '¿Reconoces el trabajo y el esfuerzo de tus compañeros?',
      options: [
        'Solo cuando es extraordinario',
        'Raramente',
        'Habitualmente, creo que es importante para el clima del equipo',
        'No suelo hacerlo de forma explícita',
      ],
      correctIndex: 2,
      explanation:
        'El reconocimiento activo fortalece el capital emocional del equipo.',
    },
    {
      question: 'Cuando tienes que tomar decisiones difíciles en el trabajo, ¿cómo lo haces?',
      options: [
        'Impulsivamente',
        'Analizando solo los datos',
        'Integrando datos y estado emocional propio y ajeno',
        'Esperando a que alguien decida por mí',
      ],
      correctIndex: 2,
      explanation:
        'Integrar la dimensión emocional en la toma de decisiones profesionales es IE en su máxima expresión.',
    },
    {
      question: '¿Cómo te relacionas con tu propio éxito profesional?',
      options: [
        'Nunca es suficiente',
        'Lo minimizo',
        'Lo celebro y lo uso como impulso para seguir creciendo',
        'Depende de si otros lo reconocen',
      ],
      correctIndex: 2,
      explanation:
        'Una relación sana con el propio éxito es un indicador de autoestima emocional profesional.',
    },
  ],
  feedback: {
    low: {
      level: 'Área de mejora',
      text: 'Tu IE en el contexto laboral todavía está madurando, y eso suele ocurrir cuando trabajas en entornos donde la dimensión humana no se valora suficientemente. Empieza por dos prácticas: pedir feedback explícito al menos una vez al mes y comunicar un límite que llevas tiempo callándote. La IE laboral se construye con conversaciones concretas, no con buenas intenciones.',
    },
    mid: {
      level: 'En desarrollo',
      text: 'Manejas la dimensión emocional del trabajo con cierta competencia, pero hay situaciones que aún te activan más de la cuenta. Identifica los dos o tres patrones que más te desgastan profesionalmente y diseña una respuesta más madura para cada uno. La IE en el trabajo es básicamente la suma de respuestas mejores a situaciones que se repiten.',
    },
    high: {
      level: 'Fortaleza',
      text: 'Eres una persona profesionalmente madura en lo emocional: recibes feedback, gestionas conflictos, te adaptas al cambio. Tu reto ahora es proteger esa madurez del agotamiento y empezar a multiplicarla en otros. Convertirte en un referente — formal o informal — para tu equipo es el siguiente nivel de tu IE profesional.',
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TEST 8 — RESILIENCIA EMOCIONAL (slot 8)
// ────────────────────────────────────────────────────────────────────────────
const RESILIENCIA: TestBank = {
  questions: [
    {
      question: 'Cuando algo sale muy mal, ¿cuánto tiempo necesitas para recuperarte?',
      options: [
        'Mucho, me quedo bloqueado',
        'Bastante, me cuesta soltarlo',
        'Relativamente poco, tengo recursos internos',
        'Casi nada, lo ignoro y sigo',
      ],
      correctIndex: 2,
      explanation:
        'La velocidad de recuperación emocional tras la adversidad es el indicador central de la resiliencia.',
    },
    {
      question: 'Ante una situación que no puedes cambiar, ¿qué haces?',
      options: [
        'Me obsesiono con ella',
        'La acepto pero me genera mucho malestar',
        'La acepto y focalizo mi energía en lo que sí puedo hacer',
        'La evito para no sufrirla',
      ],
      correctIndex: 2,
      explanation:
        'La aceptación activa, seguida de acción sobre lo controlable, es la esencia de la resiliencia.',
    },
    {
      question: '¿Has superado situaciones difíciles que te han hecho más fuerte?',
      options: [
        'No, me han debilitado',
        'Algunas',
        'Sí, veo la adversidad como una escuela',
        'Prefiero no haberlas vivido',
      ],
      correctIndex: 2,
      explanation:
        'El crecimiento post-traumático, la capacidad de encontrar aprendizaje en la dificultad, es el núcleo de la resiliencia.',
    },
    {
      question: 'Cuando alguien importante para ti te falla, ¿cómo lo gestionas?',
      options: [
        'Dejo de confiar en esa persona para siempre',
        'Me afecta mucho durante mucho tiempo',
        'Lo proceso, lo hablo si es necesario y sigo adelante',
        'Lo ignoro para no sufrir',
      ],
      correctIndex: 2,
      explanation:
        'Procesar la decepción interpersonal sin cerrar la puerta a la confianza es resiliencia relacional.',
    },
    {
      question: '¿Tienes personas o recursos a los que acudir cuando las cosas se ponen difíciles?',
      options: [
        'No, prefiero resolverlo solo',
        'Tengo pocas opciones',
        'Sí, tengo una red de apoyo que cuido',
        'No me siento cómodo pidiendo ayuda',
      ],
      correctIndex: 2,
      explanation:
        'La red de apoyo social es uno de los factores protectores más potentes de la resiliencia.',
    },
    {
      question: 'Cuando fracasas en algo importante, ¿qué narrativa te cuentas?',
      options: [
        'Que no soy capaz',
        'Que tengo mala suerte',
        'Que es una oportunidad de aprender y replantear',
        'Que no debí haberlo intentado',
      ],
      correctIndex: 2,
      explanation:
        'La narrativa que construimos sobre el fracaso determina en gran medida nuestra capacidad de resiliencia.',
    },
    {
      question: '¿Mantienes una perspectiva de largo plazo cuando estás en un momento difícil?',
      options: [
        'No, solo veo el problema actual',
        'A veces',
        'Habitualmente, sé que los momentos difíciles pasan',
        'Me cuesta pero lo intento',
      ],
      correctIndex: 2,
      explanation:
        'La perspectiva temporal larga es un recurso cognitivo esencial de la resiliencia emocional.',
    },
    {
      question: '¿Cómo afectan las críticas negativas a tu autoconcepto?',
      options: [
        'Mucho, las interiorizo como verdades absolutas',
        'Me afectan bastante',
        'Las considero pero no definen cómo me veo',
        'No me afectan en absoluto',
      ],
      correctIndex: 2,
      explanation:
        'Mantener un autoconcepto estable ante las críticas es un signo de resiliencia emocional madura.',
    },
    {
      question: 'Cuando todo parece ir mal a la vez, ¿qué haces?',
      options: [
        'Me derrumbo',
        'Me paralizo',
        'Priorizo, busco apoyo y voy paso a paso',
        'Lo dejo pasar esperando que mejore solo',
      ],
      correctIndex: 2,
      explanation:
        'La acción estratégica en momentos de máxima adversidad es la resiliencia en su forma más pura.',
    },
    {
      question: '¿Qué frase describe mejor tu relación con la adversidad?',
      options: [
        'La adversidad me destruye',
        'La adversidad me asusta',
        'La adversidad me forja',
        'La adversidad me es indiferente',
      ],
      correctIndex: 2,
      explanation:
        'Ver la adversidad como un forjador de carácter refleja una mentalidad resiliente consolidada.',
    },
  ],
  feedback: {
    low: {
      level: 'Área de mejora',
      text: 'Tu resiliencia está atravesando un momento difícil — quizás llevas tiempo soportando más de lo que cualquier persona debería soportar sola. Eso no es debilidad, es realidad. Empieza por dos cosas concretas: identifica a una persona a la que puedas acudir cuando las cosas se compliquen, y trabaja una narrativa diferente sobre tus fracasos pasados. La resiliencia se construye en relación, no en soledad.',
    },
    mid: {
      level: 'En desarrollo',
      text: 'Tu resiliencia funciona, pero te cuesta en ciertos golpes — especialmente los emocionales o los que tocan tu identidad. El siguiente nivel está en aprender a recuperarte más rápido y con más limpieza: menos rumiación, más acción. Identifica las dos narrativas que más se activan cuando algo sale mal y cuestiónalas con curiosidad en lugar de aceptarlas como verdades.',
    },
    high: {
      level: 'Fortaleza',
      text: 'Tienes una resiliencia consolidada: te recuperas, aprendes y sigues. Esa es una de las cualidades más raras y valiosas. Tu reto ahora es asegurarte de que tu resiliencia no se convierta en una excusa para no descansar, no pedir ayuda o no llorar cuando toca. La resiliencia maestra incluye permitirte ser frágil en los momentos que lo necesitan.',
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TEST 9 — COMUNICACIÓN EMPÁTICA (slot 9)
// ────────────────────────────────────────────────────────────────────────────
const COMUNICACION: TestBank = {
  questions: [
    {
      question: 'Cuando alguien te habla, ¿qué porcentaje del tiempo estás pensando en tu respuesta?',
      options: [
        'Casi siempre',
        'Con frecuencia',
        'Raramente, me esfuerzo en escuchar de verdad',
        'Depende del tema',
      ],
      correctIndex: 2,
      explanation:
        'La escucha activa real requiere vaciar la mente de respuestas preparadas para estar presente.',
    },
    {
      question: '¿Validas las emociones de los demás aunque no las compartas?',
      options: [
        'No, si no las comparto no las entiendo',
        'Solo si la persona me importa mucho',
        'Habitualmente, entiendo que son válidas aunque yo reaccione diferente',
        'A veces, según el contexto',
      ],
      correctIndex: 2,
      explanation:
        'La validación emocional no requiere acuerdo — solo reconocimiento de la experiencia del otro.',
    },
    {
      question: 'Cuando alguien está emocionado al hablar, ¿qué haces?',
      options: [
        'Le pido que sea más objetivo',
        'Espero que se calme para seguir',
        'Reconozco su emoción antes de abordar el contenido',
        'Me incomoda y cambio de tema',
      ],
      correctIndex: 2,
      explanation:
        'Reconocer la emoción antes que el contenido es el primer paso de la comunicación empática.',
    },
    {
      question: '¿Usas preguntas abiertas para entender mejor a los demás?',
      options: [
        'Raramente',
        'A veces',
        'Habitualmente, me ayudan a profundizar',
        'Prefiero afirmaciones directas',
      ],
      correctIndex: 2,
      explanation:
        'Las preguntas abiertas invitan a la exploración y demuestran interés genuino.',
    },
    {
      question: 'Cuando das feedback a alguien, ¿cómo lo haces?',
      options: [
        'Directo y sin rodeos',
        'Lo suavizo tanto que no llega el mensaje',
        'Claro, específico y con cuidado emocional',
        'Prefiero no darlo para no generar conflicto',
      ],
      correctIndex: 2,
      explanation:
        'El feedback asertivo y empático combina claridad con cuidado de la relación.',
    },
    {
      question: '¿Adaptas tu lenguaje y tono según el estado emocional de tu interlocutor?',
      options: [
        'No, me comunico siempre igual',
        'Solo en situaciones muy evidentes',
        'Habitualmente, leo el estado emocional y adapto',
        'Me cuesta identificar el estado emocional ajeno',
      ],
      correctIndex: 2,
      explanation:
        'La comunicación adaptativa basada en la lectura emocional es el núcleo de la comunicación empática.',
    },
    {
      question: 'Cuando hay un malentendido, ¿qué haces?',
      options: [
        'Me defiendo de inmediato',
        'Cedo aunque no esté de acuerdo',
        'Busco entender qué falló en la comunicación',
        'Lo dejo pasar para evitar conflicto',
      ],
      correctIndex: 2,
      explanation:
        'Analizar el malentendido desde la curiosidad en lugar de la defensa es comunicación empática avanzada.',
    },
    {
      question: '¿Expresas tus necesidades de forma clara sin atacar a los demás?',
      options: [
        'Raramente, prefiero callarme',
        'A veces, pero me salgo de la asertividad',
        'Habitualmente, con mensajes en primera persona',
        'Lo expreso pero de forma agresiva',
      ],
      correctIndex: 2,
      explanation:
        'La asertividad empática, expresar necesidades sin atacar, es la forma más efectiva de comunicación.',
    },
    {
      question: '¿Haces contacto visual y prestas atención no verbal cuando alguien te habla?',
      options: [
        'Raramente',
        'Cuando el tema me interesa',
        'Habitualmente, es parte de mi presencia activa',
        'Me distraigo fácilmente con el entorno',
      ],
      correctIndex: 2,
      explanation:
        'La presencia física y el lenguaje no verbal son componentes esenciales de la escucha activa.',
    },
    {
      question: 'Cuando alguien te da una opinión muy diferente a la tuya, ¿cómo respondes?',
      options: [
        'La descarto',
        'La tolero pero no la considero',
        'La escucho con genuina curiosidad',
        'Me pongo a la defensiva',
      ],
      correctIndex: 2,
      explanation:
        'La curiosidad ante la diferencia es la base de la comunicación empática intercultural e interpersonal.',
    },
  ],
  feedback: {
    low: {
      level: 'Área de mejora',
      text: 'Tu comunicación empática está pidiendo una revisión, y la buena noticia es que se entrena con muy poco. Empieza por un experimento de una semana: en cada conversación que mantengas, antes de responder, repite mentalmente lo que la otra persona acaba de decir. Solo eso. Vas a notar cómo tu escucha y tu respuesta cambian de calidad muy rápido.',
    },
    mid: {
      level: 'En desarrollo',
      text: 'Comunicas con bastante empatía la mayor parte del tiempo, pero hay situaciones donde caes en patrones más automáticos: malentendidos, conversaciones difíciles, momentos de cansancio. Identifica cuándo te desconectas habitualmente y trabaja ahí. La comunicación empática madura no es ser empático cuando es fácil, es serlo cuando casi no te sale.',
    },
    high: {
      level: 'Fortaleza',
      text: 'Tu comunicación empática es genuinamente buena: escuchas, validas, adaptas y expresas con claridad. Esa habilidad construye relaciones y carreras. Tu reto ahora es asegurarte de que tu empatía verbal no se queda en la superficie — que conduce a las conversaciones difíciles que a veces se evitan precisamente porque sabes hacerlas demasiado suaves.',
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// TEST 10 — LIDERAZGO EMOCIONAL (slot 10)
// ────────────────────────────────────────────────────────────────────────────
const LIDERAZGO: TestBank = {
  questions: [
    {
      question: 'Cuando tu equipo está desmotivado, ¿qué haces?',
      options: [
        'Presiono para que cumplan los objetivos',
        'Ignoro el estado emocional y me centro en los resultados',
        'Entiendo qué hay detrás de la desmotivación y actúo desde ahí',
        'Delego el problema en RRHH',
      ],
      correctIndex: 2,
      explanation:
        'El liderazgo emocional parte de entender el estado del equipo antes de exigir resultados.',
    },
    {
      question: '¿Eres consciente del impacto que tu estado de ánimo tiene en tu equipo?',
      options: [
        'No, mi estado de ánimo es personal',
        'A veces lo pienso',
        'Sí, lo gestiono conscientemente',
        'No creo que mi estado les afecte',
      ],
      correctIndex: 2,
      explanation:
        'El líder emocionalmente inteligente sabe que su estado emocional es contagioso y lo gestiona como una responsabilidad.',
    },
    {
      question: '¿Cómo comunicas las decisiones difíciles a tu equipo?',
      options: [
        'Las comunico sin rodeos',
        'Las suavizo tanto que pierden claridad',
        'Con claridad, contexto y cuidado emocional',
        'Prefiero que las descubran por sí solos',
      ],
      correctIndex: 2,
      explanation:
        'Comunicar decisiones difíciles con transparencia y sensibilidad emocional es liderazgo maduro.',
    },
    {
      question: '¿Das espacio a tu equipo para expresar sus emociones y preocupaciones?',
      options: [
        'No, en el trabajo hay que ser profesional',
        'Solo en situaciones de crisis',
        'Sí, creo que es parte del liderazgo saludable',
        'Solo si me lo piden explícitamente',
      ],
      correctIndex: 2,
      explanation:
        'Crear espacio para la expresión emocional segura aumenta la confianza y el rendimiento del equipo.',
    },
    {
      question: 'Cuando un miembro de tu equipo comete un error, ¿cómo lo gestionas?',
      options: [
        'Lo señalo delante de todos',
        'Lo ignoro para no desmotivarle',
        'Lo abordo en privado con foco en el aprendizaje',
        'Lo escalo a su responsable',
      ],
      correctIndex: 2,
      explanation:
        'La gestión del error en privado, con foco en el crecimiento, es una práctica de liderazgo emocional esencial.',
    },
    {
      question: '¿Reconoces el trabajo bien hecho de forma específica y genuina?',
      options: [
        'Raramente, asumo que ya saben que lo hacen bien',
        'Solo cuando es extraordinario',
        'Habitualmente y con especificidad',
        'No me parece necesario si ya cobran por ello',
      ],
      correctIndex: 2,
      explanation:
        'El reconocimiento específico y genuino es uno de los motivadores más potentes del liderazgo emocional.',
    },
    {
      question: 'Cuando hay conflicto en tu equipo, ¿qué papel adoptas?',
      options: [
        'Me mantengo al margen',
        'Tomo partido por quien creo que tiene razón',
        'Facilito el diálogo buscando soluciones que respeten a todos',
        'Impongo una solución para que el conflicto acabe',
      ],
      correctIndex: 2,
      explanation:
        'La facilitación empática del conflicto es una de las habilidades más exigentes del liderazgo emocional.',
    },
    {
      question: '¿Adaptas tu estilo de liderazgo según las necesidades de cada persona?',
      options: [
        'No, trato a todos igual',
        'Lo intento pero me cuesta',
        'Sí, cada persona necesita un tipo de apoyo diferente',
        'Solo si la persona me lo pide',
      ],
      correctIndex: 2,
      explanation:
        'El liderazgo situacional basado en las necesidades emocionales individuales es la forma más avanzada de liderazgo.',
    },
    {
      question: '¿Compartes tus propias vulnerabilidades con tu equipo cuando es apropiado?',
      options: [
        'Nunca, el líder no puede mostrarse vulnerable',
        'Raramente',
        'Sí, creo que la vulnerabilidad auténtica genera confianza',
        'Solo con mi círculo más cercano',
      ],
      correctIndex: 2,
      explanation:
        'La vulnerabilidad auténtica del líder, usada con criterio, es uno de los actos más poderosos de liderazgo emocional.',
    },
    {
      question: '¿Cómo de alineado está tu estilo de liderazgo con tus valores personales?',
      options: [
        'Poco alineado',
        'Algo alineado',
        'Muy alineado, es algo que trabajo conscientemente',
        'No lo he reflexionado',
      ],
      correctIndex: 2,
      explanation:
        'El liderazgo desde los valores propios es el liderazgo más auténtico y sostenible.',
    },
  ],
  feedback: {
    low: {
      level: 'Área de mejora',
      text: 'Tu liderazgo emocional está en una fase temprana, y eso es completamente común — la mayoría de las personas con responsabilidad sobre otros no han recibido formación en esto. Empieza por dos prácticas con tu equipo o personas a tu cargo: pregunta cómo están de verdad al menos una vez a la semana, y reconoce algo específico que cada uno haga bien. Esos dos hábitos cambian el clima rápidamente.',
    },
    mid: {
      level: 'En desarrollo',
      text: 'Lideras con bastante sensibilidad emocional, pero hay áreas donde aún operas más por instinto que por intención. Identifica los momentos donde tu liderazgo se vuelve menos consciente — quizás bajo presión de resultados, quizás con personas que te cuesta — y trabaja específicamente esa situación. El liderazgo emocional maduro es deliberado donde antes era reactivo.',
    },
    high: {
      level: 'Fortaleza',
      text: 'Tu liderazgo emocional es maduro: ves a las personas, gestionas el clima, comunicas con cuidado y exiges resultados desde un lugar humano. Tu reto ahora es escalar ese impacto — formar a otros líderes, escribir lo que sabes, dejar huella en cómo se entiende el liderazgo en tu entorno. Tienes algo valioso que enseñar.',
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ────────────────────────────────────────────────────────────────────────────
export const TEST_BANK: Record<string, TestBank> = {
  autorregulacion: AUTORREGULACION,
  autoconciencia: AUTOCONCIENCIA,
  motivacion: MOTIVACION,
  empatia: EMPATIA,
  habilidades: HABILIDADES,
  estres: ESTRES,
  trabajo: TRABAJO,
  resiliencia: RESILIENCIA,
  comunicacion: COMUNICACION,
  liderazgo: LIDERAZGO,
};

export const SLOT_TO_TEST_ID: Record<number, string> = {
  1: 'autorregulacion',
  2: 'autoconciencia',
  3: 'motivacion',
  4: 'empatia',
  5: 'habilidades',
  6: 'estres',
  7: 'trabajo',
  8: 'resiliencia',
  9: 'comunicacion',
  10: 'liderazgo',
};

export const TEST_ID_TO_SLOT: Record<string, number> = Object.fromEntries(
  Object.entries(SLOT_TO_TEST_ID).map(([slot, id]) => [id, Number(slot)]),
);

export function bracketFromScore(score: number): ScoreBracket {
  if (score <= 4) return 'low';
  if (score <= 7) return 'mid';
  return 'high';
}
