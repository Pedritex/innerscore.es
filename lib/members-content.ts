import type { ArchetypeKey } from './members-data';

export type TabKey =
  | 'caracteristicas'
  | 'motivaciones'
  | 'relaciones'
  | 'trabajo'
  | 'estres'
  | 'crecimiento';

export const TAB_LABELS: Record<TabKey, string> = {
  caracteristicas: 'Características principales',
  motivaciones: 'Motivaciones y temores',
  relaciones: 'Relaciones',
  trabajo: 'Trabajo',
  estres: 'Estrés y relajación',
  crecimiento: 'Crecimiento personal',
};

export type TabItem = { title: string; description: string };

export type ArchetypeContent = {
  displayName: string;
  color: string;
  intro: [string, string];
  fullDescription: string;
  tabs: Record<TabKey, TabItem[]>;
  subtypes: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  trajectory: { title: string; description: string }[];
};

// ────────────────────────────────────────────────────────────────────────────
// EL OBSERVADOR — autoconciencia dominante
// ────────────────────────────────────────────────────────────────────────────
const OBSERVADOR: ArchetypeContent = {
  displayName: 'El Observador',
  color: '#1d4ed8',
  intro: [
    'Tu mayor fortaleza está en mirar hacia adentro con honestidad. Tienes una capacidad poco común para identificar lo que sientes y comprender por qué reaccionas como reaccionas, mucho antes que la mayoría de las personas a tu alrededor.',
    'Esta consciencia te da una ventaja silenciosa: tomas decisiones desde un lugar más reflexivo, evitas dejarte arrastrar por impulsos y entiendes la lógica emocional que hay detrás de tus elecciones cotidianas.',
  ],
  fullDescription:
    'El Observador combina introspección con análisis. Donde otros sienten una emoción confusa, tú detectas matices: dónde nace, qué la dispara, cómo se enlaza con experiencias previas. Esa nitidez interna se traduce en madurez emocional, pero también puede convertirse en un peso si te quedas demasiado tiempo en la cabeza sin pasar a la acción. Tu camino de crecimiento pasa por aprender a confiar en lo que ya has comprendido y atreverte a mover desde ahí.',
  tabs: {
    caracteristicas: [
      { title: 'Introspección natural', description: 'Te das cuenta de tus emociones casi al instante, sin necesidad de que nadie te las señale.' },
      { title: 'Análisis emocional preciso', description: 'Distingues entre matices que para otras personas son simplemente "ansiedad" o "tristeza".' },
      { title: 'Memoria emocional fina', description: 'Recuerdas con claridad cómo te sentiste en situaciones pasadas y aprendes de ello.' },
      { title: 'Decisiones reflexivas', description: 'Necesitas tiempo para pensar antes de actuar; rara vez respondes en caliente.' },
      { title: 'Coherencia interna', description: 'Tus actos suelen alinearse con tus valores porque has dedicado tiempo a entenderlos.' },
      { title: 'Autenticidad serena', description: 'Te muestras tal como eres, sin necesidad de impresionar ni esconderte.' },
    ],
    motivaciones: [
      { title: 'Te mueve la comprensión', description: 'Buscas entenderte y entender el mundo emocional que te rodea.' },
      { title: 'Valoras la autenticidad', description: 'Te incomoda fingir o forzarte a ser alguien que no eres.' },
      { title: 'Buscas claridad interior', description: 'La confusión emocional te resulta más agotadora que la dificultad externa.' },
      { title: 'Temes perder tu identidad', description: 'Te asusta diluir quién eres por presión social o expectativas externas.' },
      { title: 'Te incomoda la superficialidad', description: 'Las conversaciones huecas o las relaciones de fachada te drenan rápido.' },
      { title: 'Evitas reaccionar sin entender', description: 'Prefieres pausar a actuar mal informado por una emoción que aún no has procesado.' },
    ],
    relaciones: [
      { title: 'Vínculos profundos y pocos', description: 'Eliges calidad sobre cantidad: prefieres dos amistades reales que veinte superficiales.' },
      { title: 'Escucha atenta', description: 'Cuando alguien te habla, te entregas a entender en lugar de esperar para responder.' },
      { title: 'Espacio para procesar', description: 'Necesitas pausas tras conversaciones intensas para integrar lo que sientes.' },
      { title: 'Comunicación reflexiva', description: 'Eliges tus palabras con cuidado; rara vez dices algo de lo que después te arrepientes.' },
      { title: 'Tendencia a aislarte', description: 'Cuando te sobrecargas, te retiras en lugar de pedir ayuda — un patrón que conviene revisar.' },
      { title: 'Lealtad silenciosa', description: 'No haces aspavientos, pero quienes te tienen cerca saben que pueden contar contigo.' },
    ],
    trabajo: [
      { title: 'Análisis sereno bajo presión', description: 'Donde otros entran en pánico, tú observas, evalúas y decides con cabeza fría.' },
      { title: 'Calidad sobre velocidad', description: 'Prefieres entregar algo bien pensado a algo rápido pero mediocre.' },
      { title: 'Trabajas mejor con autonomía', description: 'Los micromanagers y las interrupciones constantes te agotan y bajan tu rendimiento.' },
      { title: 'Aprendizaje continuo', description: 'Te atrae profundizar en un tema hasta dominarlo, más que pasar superficialmente por muchos.' },
      { title: 'Reuniones largas: tu kryptonita', description: 'El exceso de conversación sin propósito drena más tu energía que el trabajo real.' },
      { title: 'Mentor natural', description: 'Tu capacidad de leer matices te convierte en un buen guía cuando alguien atraviesa una decisión compleja.' },
    ],
    estres: [
      { title: 'Sobre-pensamiento', description: 'Tu principal fuente de estrés no es lo que ocurre, sino el rumiar después.' },
      { title: 'Necesidad de soledad', description: 'Te recargas en silencio, leyendo, caminando o estando contigo.' },
      { title: 'Sensibilidad al ruido', description: 'Los ambientes sobreestimulantes te dejan exhausto incluso si no haces nada.' },
      { title: 'Diario emocional', description: 'Escribir lo que sientes te ayuda a sacarlo de la cabeza y ponerlo en perspectiva.' },
      { title: 'Meditación natural', description: 'Las prácticas contemplativas encajan contigo casi sin esfuerzo.' },
      { title: 'Riesgo de parálisis', description: 'Pensar demasiado sobre algo que requiere acción puede dejarte estancado.' },
    ],
    crecimiento: [
      { title: 'Pasar del análisis a la acción', description: 'Tu reto no es entender más, sino confiar en lo que ya entiendes y moverte.' },
      { title: 'Compartir tu mundo interior', description: 'Aprender a verbalizar lo que sientes te conecta más profundo con los demás.' },
      { title: 'Aceptar la incertidumbre', description: 'No siempre podrás analizar antes de decidir. Aprender a actuar con información parcial es clave.' },
      { title: 'Reducir la auto-crítica', description: 'Tu análisis es valioso, pero a veces se vuelve contra ti. Practica la autocompasión.' },
      { title: 'Salir de tu cabeza', description: 'El movimiento físico (deporte, baile, caminar) te saca del bucle mental y reconecta con el cuerpo.' },
      { title: 'Buscar mentores externos', description: 'Otra perspectiva rompe los puntos ciegos de tu propio análisis.' },
    ],
  },
  subtypes: [
    { title: 'Observador analítico', description: 'La introspección como herramienta de comprensión racional del mundo.' },
    { title: 'Observador contemplativo', description: 'La introspección como vía de paz interior y presencia.' },
    { title: 'Observador creativo', description: 'La introspección que se vuelca en expresión artística o creativa.' },
  ],
  faq: [
    { question: '¿Por qué necesito tanto tiempo a solas?', answer: 'Tu sistema procesa estímulos con profundidad, no rapidez. La soledad no es aislamiento — es el espacio donde tu mente integra todo lo que ha captado durante el día.' },
    { question: '¿Cómo dejo de sobre-pensar las cosas?', answer: 'No se trata de pensar menos, sino de poner un límite. Date 30 minutos para analizar y después comprométete a una acción, aunque sea pequeña. La acción rompe el bucle.' },
    { question: '¿Soy demasiado serio o frío?', answer: 'Probablemente no eres ni una cosa ni la otra — eres reservado en público y profundamente cálido en privado. Lo que parece distancia es tu forma de proteger tu espacio interior.' },
  ],
  trajectory: [
    { title: 'Etapa 1: Honrar tu introspección', description: 'Acepta que tu forma de procesar el mundo es una fortaleza, no algo que arreglar. Cultiva los espacios donde puedes pensar.' },
    { title: 'Etapa 2: Traducir reflexión en acción', description: 'Diseña sistemas para que tu análisis se convierta en decisiones concretas. Limita el tiempo de deliberación.' },
    { title: 'Etapa 3: Compartir tu visión', description: 'Llega un punto en el que tu profundidad es valiosa para otros. Aprender a comunicarla — escribir, enseñar, mentorizar — multiplica tu impacto.' },
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// EL ANCLA — autorregulación dominante
// ────────────────────────────────────────────────────────────────────────────
const ANCLA: ArchetypeContent = {
  displayName: 'El Ancla',
  color: '#0891b2',
  intro: [
    'Tu superpoder es mantener la calma cuando todo a tu alrededor se mueve. Tienes una estabilidad emocional que actúa como punto de referencia para quienes te rodean — la gente se relaja cuando estás cerca, aunque no sepan exactamente por qué.',
    'Esa serenidad no es indiferencia. Sientes profundamente, pero has aprendido a no dejarte arrastrar. Eres el tipo de persona que sostiene el centro mientras la tormenta pasa.',
  ],
  fullDescription:
    'El Ancla regula sus emociones desde un lugar muy maduro: no las niega, no las reprime, pero tampoco les permite tomar el volante. Esta capacidad te convierte en alguien fiable, predecible en el mejor sentido, y reconfortante para los demás. El riesgo está en que esa misma estabilidad puede esconder lo que necesitas tú — los demás vienen a apoyarse y tú nunca te apoyas en nadie. Tu crecimiento pasa por reconocer que tu sistema también pide cuidado.',
  tabs: {
    caracteristicas: [
      { title: 'Estabilidad emocional', description: 'Tu línea base es serena. Las grandes subidas y bajadas no son tu estilo.' },
      { title: 'Capacidad de pausa', description: 'Entre el estímulo y tu respuesta siempre hay un espacio — aunque sea de un segundo.' },
      { title: 'Templanza bajo presión', description: 'En crisis, no entras en pánico. Otros te miran a ti para saber si la situación es grave.' },
      { title: 'Paciencia genuina', description: 'No esperas que el mundo se mueva a tu ritmo y eso te ahorra mucho desgaste.' },
      { title: 'Compromiso a largo plazo', description: 'Lo que empiezas, lo terminas. Tu palabra pesa porque no la das a la ligera.' },
      { title: 'Presencia tranquilizadora', description: 'Sin hablar mucho, tu sola presencia baja el nivel de tensión de una habitación.' },
    ],
    motivaciones: [
      { title: 'Te mueve la estabilidad', description: 'Construyes vidas, relaciones y carreras pensando en lo sostenible.' },
      { title: 'Buscas calma interior', description: 'Más que excitación, prefieres una sensación constante de bienestar.' },
      { title: 'Valoras la consistencia', description: 'No hay nada más atractivo para ti que una persona o un proyecto fiable.' },
      { title: 'Temes el caos prolongado', description: 'Puedes tolerar el desorden puntual, pero un caos sostenido te agota.' },
      { title: 'Te incomoda la teatralidad', description: 'El drama, las emociones exageradas y la urgencia falsa te resultan agotadoras.' },
      { title: 'Evitas decisiones impulsivas', description: 'Prefieres perderte una oportunidad a saltar a algo sin pensarlo.' },
    ],
    relaciones: [
      { title: 'Eres el ancla emocional del grupo', description: 'La gente acude a ti cuando atraviesa una crisis porque sabe que no se te va a contagiar.' },
      { title: 'Vínculos duraderos', description: 'Tus amistades y relaciones más significativas suelen contarse en décadas, no en meses.' },
      { title: 'Conflictos manejados con cabeza', description: 'No huyes del conflicto, pero tampoco lo escalas. Buscas la salida razonable.' },
      { title: 'Riesgo de ser el cuidador silencioso', description: 'Sostienes a otros sin pedir nada a cambio, hasta que un día te das cuenta de que estás vacío.' },
      { title: 'Aprecio por la rutina compartida', description: 'Los pequeños rituales con tu gente — el café del sábado, la llamada del domingo — son tu lenguaje del amor.' },
      { title: 'Dificultad para pedir ayuda', description: 'Como nunca dependes de nadie, te cuesta verbalizar que también necesitas apoyo.' },
    ],
    trabajo: [
      { title: 'Equipos en crisis', description: 'Tu mejor contexto profesional es un equipo bajo presión que necesita un punto de equilibrio.' },
      { title: 'Roles de continuidad', description: 'Brillas en posiciones que requieren memoria histórica, fiabilidad y consistencia.' },
      { title: 'Mediación natural', description: 'Te sale resolver conflictos entre compañeros sin tomar partido de forma reactiva.' },
      { title: 'Resistencia al burnout', description: 'Tu capacidad de regular emocionalmente te protege más que la media, pero no eres invencible.' },
      { title: 'Toma de decisiones lenta y firme', description: 'No improvisas, pero cuando decides, no te vuelves atrás sin causa.' },
      { title: 'Entornos volátiles te erosionan', description: 'Las startups en pivote constante o los equipos disfuncionales pueden gastarte con el tiempo.' },
    ],
    estres: [
      { title: 'Acumulas en silencio', description: 'Tu principal riesgo es no detectar que estás sobrecargado hasta que ya lo estás demasiado.' },
      { title: 'Te recargas en la rutina', description: 'Los rituales diarios — paseo, lectura, comida tranquila — son tu mejor herramienta de regulación.' },
      { title: 'Movimiento sostenido', description: 'Yoga, natación, senderismo: actividades de ritmo constante encajan con tu fisiología emocional.' },
      { title: 'Aversión a estímulos extremos', description: 'Música muy alta, fiestas largas o agendas saturadas te resetean por la fuerza, pero no descansan.' },
      { title: 'Permite emociones grandes', description: 'No todo se regula. A veces necesitas darte permiso para llorar, gritar o enfadarte en privado.' },
      { title: 'Cuidado con la auto-anestesia', description: 'Estar siempre estable puede convertirse en no sentir. Pregúntate cada cierto tiempo qué emoción estás suprimiendo.' },
    ],
    crecimiento: [
      { title: 'Reconocer tus propias necesidades', description: 'Tu reto principal: notar cuándo eres tú quien necesita apoyo, no la persona que lo da.' },
      { title: 'Permitirte vulnerabilidad', description: 'Mostrarte frágil con quienes te importan refuerza tus vínculos, no los daña.' },
      { title: 'Salir de tu zona de seguridad', description: 'A veces el crecimiento exige un movimiento que rompa la estabilidad. Aceptarlo es parte del camino.' },
      { title: 'Diferenciar paz de evitación', description: 'Pregúntate si esa calma es genuina o si estás evitando algo que necesita ser confrontado.' },
      { title: 'Buscar contraste deliberado', description: 'Experiencias intensas — viajar, retiros, retos físicos — sacuden la rutina y te recuerdan tu rango emocional.' },
      { title: 'Pedir lo que necesitas', description: 'La gente te quiere; no se sienten cargados por tus necesidades, solo lamentan no haberlas conocido antes.' },
    ],
  },
  subtypes: [
    { title: 'Ancla cuidadora', description: 'Tu estabilidad se vuelca en sostener emocionalmente a quienes te rodean.' },
    { title: 'Ancla pragmática', description: 'Tu calma se convierte en eficiencia y resolución serena de problemas.' },
    { title: 'Ancla reflexiva', description: 'Tu serenidad se acompaña de una práctica contemplativa profunda.' },
  ],
  faq: [
    { question: '¿Soy aburrido por ser tan tranquilo?', answer: 'No. Tu estabilidad es magnética para mucha gente — vives en un mundo saturado de drama, y tu serenidad es un descanso. Otra cosa es asegurarte de que esa calma sea elegida, no defensiva.' },
    { question: '¿Por qué me cuesta tanto pedir ayuda?', answer: 'Porque has construido tu identidad sobre ser quien la da. Pedirla puede sentirse como traicionar tu rol. Practica con cosas pequeñas: ayudar a otros a sostenerte también los acerca a ti.' },
    { question: '¿Estoy reprimiendo emociones?', answer: 'A veces sí. Hay diferencia entre regular y suprimir. Si llevas semanas sin enfadarte, llorar o sentir entusiasmo intenso, vale la pena preguntarte qué hay debajo de tanta calma.' },
  ],
  trajectory: [
    { title: 'Etapa 1: Confiar en tu estabilidad', description: 'Acepta que tu calma es un regalo, no algo que esconder en un mundo que celebra la intensidad.' },
    { title: 'Etapa 2: Habitar tu rango completo', description: 'Aprende a permitirte emociones grandes sin perder tu centro. La regulación madura no es ausencia, es presencia consciente.' },
    { title: 'Etapa 3: Dejar que te sostengan', description: 'El último nivel del Ancla es aprender a recibir el cuidado que tan bien das. Ahí se completa el círculo.' },
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// EL IMPULSOR — motivación dominante
// ────────────────────────────────────────────────────────────────────────────
const IMPULSOR: ArchetypeContent = {
  displayName: 'El Impulsor',
  color: '#ea580c',
  intro: [
    'Te mueves desde una motivación interior que muchos envidian. No necesitas que nadie te empuje — eres tú quien decide hacia dónde y a qué ritmo. Cuando te comprometes con algo, esa energía interna se vuelve casi imparable.',
    'Tu desafío no es encontrar fuerza, es elegir bien hacia dónde la diriges. Tu IE se nota en cómo conviertes la pasión en disciplina, y la disciplina en resultados concretos.',
  ],
  fullDescription:
    'El Impulsor combina deseo de logro con resiliencia emocional. Tienes una capacidad poco común para sostener el esfuerzo en proyectos largos sin perder la chispa inicial. Pero esa misma fuerza puede convertirse en exigencia hacia ti mismo y hacia los demás. Tu camino de crecimiento incluye aprender a celebrar lo conseguido en lugar de saltar al siguiente objetivo, y a entender que el descanso no es traición a tu ambición — es parte de ella.',
  tabs: {
    caracteristicas: [
      { title: 'Motivación intrínseca alta', description: 'La gasolina viene de dentro: no necesitas reconocimiento externo para sostener el esfuerzo.' },
      { title: 'Orientación a metas', description: 'Tu mente funciona mejor cuando tienes un horizonte claro hacia donde apuntar.' },
      { title: 'Resiliencia emocional', description: 'Te caes, te frustras, pero no te quedas mucho tiempo en el suelo.' },
      { title: 'Disciplina natural', description: 'Las rutinas y los sistemas te resultan más fáciles de mantener que a la mayoría.' },
      { title: 'Aprendizaje continuo', description: 'Cada proyecto se convierte en una oportunidad de mejora personal.' },
      { title: 'Energía contagiosa', description: 'Tu entusiasmo arrastra a los equipos cuando es genuino, aunque puede agotar cuando es excesivo.' },
    ],
    motivaciones: [
      { title: 'Te mueve el progreso', description: 'Más que llegar, te importa avanzar. Estar estancado es lo peor que te puede pasar.' },
      { title: 'Valoras el dominio', description: 'Llegar a ser muy bueno en algo te resulta profundamente satisfactorio.' },
      { title: 'Buscas significado', description: 'No vale cualquier objetivo: necesitas que lo que persigues tenga sentido para ti.' },
      { title: 'Temes la mediocridad', description: 'Te asusta más quedarte en lo medianamente bueno que fallar intentando algo grande.' },
      { title: 'Te frustra la pasividad', description: 'Tanto la tuya como la de los demás. Cuesta entender a quien no quiere ir a más.' },
      { title: 'Evitas la complacencia', description: 'Apenas alcanzas un objetivo, ya estás mirando el siguiente — a veces sin disfrutar el anterior.' },
    ],
    relaciones: [
      { title: 'Atraes personas ambiciosas', description: 'Tu energía se reconoce y conecta naturalmente con perfiles parecidos.' },
      { title: 'Compañía exigente', description: 'Esperas mucho de ti y, sin darte cuenta, esperas mucho de quienes te rodean.' },
      { title: 'Inspiras a tu entorno', description: 'Tu ejemplo empuja a los demás a moverse, aunque no se lo pidas.' },
      { title: 'Riesgo de instrumentalizar vínculos', description: 'A veces evalúas relaciones por lo que aportan a tu proyecto en lugar de por sí mismas.' },
      { title: 'Necesitas pares de confianza', description: 'Personas que no te admiren ni te teman, sino que te miren a los ojos y te digan la verdad.' },
      { title: 'Comunicación directa', description: 'Vas al grano y eso se valora mucho, pero a veces se vive como brusquedad.' },
    ],
    trabajo: [
      { title: 'Roles de impacto', description: 'Brillas donde tu esfuerzo se traduce en resultados visibles y medibles.' },
      { title: 'Entornos competitivos', description: 'No te asusta competir, pero compites más contra ti mismo que contra otros.' },
      { title: 'Emprendimiento y liderazgo', description: 'Tienes la mezcla de iniciativa y disciplina que estos roles exigen.' },
      { title: 'Mala tolerancia a la burocracia', description: 'Los entornos lentos, jerárquicos y reactivos te asfixian rápido.' },
      { title: 'Riesgo de burnout', description: 'Tu motor está siempre encendido. Si no estableces frenos, te lleva al límite sin avisar.' },
      { title: 'Necesitas reconocimiento estratégico', description: 'No buscas elogios, pero sí que tu impacto se mida y se valore por las personas adecuadas.' },
    ],
    estres: [
      { title: 'Te estresa el estancamiento', description: 'Estar parado te activa la ansiedad más que el exceso de carga.' },
      { title: 'Movimiento como descanso', description: 'Tu forma de bajar revoluciones suele ser deporte intenso, no inmovilidad.' },
      { title: 'Dificultad para apagar', description: 'Aunque estés "descansando" tu cabeza sigue planeando, optimizando, anticipando.' },
      { title: 'Rituales de cierre diario', description: 'Marcar un final claro al día de trabajo es crítico para que tu mente descanse.' },
      { title: 'Vacaciones activas', description: 'Te recargas más con un viaje con desafío que con una semana en una hamaca.' },
      { title: 'Cuidado con el ego', description: 'Cuando estás cansado, lo que cae primero es la humildad. Vigílate ahí.' },
    ],
    crecimiento: [
      { title: 'Aprender a celebrar', description: 'No salgas corriendo hacia el siguiente objetivo. Sentir lo logrado es parte de la motivación a largo plazo.' },
      { title: 'Diferenciar ambición de auto-exigencia', description: 'La ambición construye. La auto-exigencia desmedida erosiona.' },
      { title: 'Cultivar relaciones gratuitas', description: 'Vínculos que no tengan que aportar a tu proyecto, solo existir porque sí.' },
      { title: 'Aceptar tu vulnerabilidad', description: 'Mostrar que también te cuesta o que no sabes acerca, no debilita.' },
      { title: 'Descanso como inversión', description: 'No es perder el tiempo: es lo que permite que mañana sigas teniendo gasolina.' },
      { title: 'Redefinir el éxito periódicamente', description: 'Lo que querías hace cinco años puede no ser lo que necesitas hoy. Revisar tu definición evita perseguir metas obsoletas.' },
    ],
  },
  subtypes: [
    { title: 'Impulsor visionario', description: 'Tu motor está al servicio de una visión a largo plazo que ilusiona.' },
    { title: 'Impulsor ejecutor', description: 'Tu fuerza está en convertir ideas en realidades concretas y medibles.' },
    { title: 'Impulsor maestro', description: 'Tu ambición se dirige hacia el dominio profundo de un oficio o disciplina.' },
  ],
  faq: [
    { question: '¿Estoy persiguiendo lo que realmente quiero?', answer: 'Pregúntate cada seis meses si tu motor está alineado con tu propósito actual o si solo tira por inercia. La revisión periódica evita persecuciones de objetivos que ya no son tuyos.' },
    { question: '¿Por qué me cuesta tanto parar?', answer: 'Porque el movimiento es parte de tu identidad. Aprender a parar sin sentirte vacío es uno de los grandes retos del Impulsor — y se entrena, como cualquier otra cosa.' },
    { question: '¿Estoy siendo demasiado duro con la gente?', answer: 'Posiblemente. Recuerda que no todo el mundo procesa la presión como tú. Cuidar el cómo importa tanto como el qué.' },
  ],
  trajectory: [
    { title: 'Etapa 1: Canalizar la energía', description: 'Aprende a elegir bien dónde diriges tu fuerza. Lo que persigues importa tanto como cómo lo persigues.' },
    { title: 'Etapa 2: Equilibrar acción y reposo', description: 'Construye sistemas que protejan tu descanso, tus vínculos y tu humanidad de tu propia ambición.' },
    { title: 'Etapa 3: Liderar desde el ejemplo', description: 'Tu energía se vuelve generativa cuando inspira a otros sin exigirles, y cuando enseña a sostener el esfuerzo con sabiduría.' },
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// EL EMPÁTICO — empatía dominante
// ────────────────────────────────────────────────────────────────────────────
const EMPATICO: ArchetypeContent = {
  displayName: 'El Empático',
  color: '#dc2626',
  intro: [
    'Sientes lo que sienten los demás, a veces casi antes que ellos mismos. Tu capacidad de captar el estado emocional de las personas es tan natural como respirar — entras a una habitación y, sin querer, ya estás leyendo los matices.',
    'Esa sensibilidad es tu mayor regalo y tu mayor reto. Te conecta con el mundo de una forma profunda, pero también te expone más que a la mayoría. Tu IE consiste en aprender a usar esa antena sin que te agote.',
  ],
  fullDescription:
    'El Empático no solo entiende emociones ajenas — las absorbe. Esto te convierte en alguien al que la gente busca cuando necesita ser comprendida, y en el sostén emocional silencioso de muchas relaciones. El riesgo es claro: confundes lo que sienten los demás con lo que sientes tú, y acabas cargando emociones que no son tuyas. Tu crecimiento pasa por aprender a empatizar sin fusionarte, por poner límites sin sentirte culpable, y por usar tu sensibilidad como una herramienta consciente en lugar de un canal abierto sin filtro.',
  tabs: {
    caracteristicas: [
      { title: 'Empatía cognitiva y afectiva', description: 'Comprendes lo que piensa el otro y sientes lo que siente, casi al mismo tiempo.' },
      { title: 'Lectura no verbal aguda', description: 'Detectas el tono, la postura, el silencio incómodo que otros pasan por alto.' },
      { title: 'Memoria emocional de los demás', description: 'Recuerdas qué les preocupa, qué les ilusiona, qué les hirió la última vez.' },
      { title: 'Hipersensibilidad ambiental', description: 'Los ambientes tensos o tóxicos te afectan más físicamente que a la mayoría.' },
      { title: 'Generosidad afectiva natural', description: 'Dar consuelo y comprensión te sale espontáneamente, no es un esfuerzo.' },
      { title: 'Intuición social', description: 'Tienes "olfato" para identificar la honestidad o la incongruencia en las personas.' },
    ],
    motivaciones: [
      { title: 'Te mueve cuidar', description: 'Sentir que tu presencia hace bien a alguien te da un sentido profundo.' },
      { title: 'Buscas armonía', description: 'Te resulta difícil tolerar conflictos largos en tu entorno; trabajas activamente por suavizarlos.' },
      { title: 'Valoras la autenticidad emocional', description: 'Las relaciones de fachada o las conversaciones huecas te aburren rápido.' },
      { title: 'Temes el conflicto abierto', description: 'A veces lo evitas tanto que dejas pasar cosas que deberías confrontar.' },
      { title: 'Te agota la frialdad', description: 'Los entornos donde nadie se mira a los ojos o donde las emociones están prohibidas te ahogan.' },
      { title: 'Evitas hacer daño', description: 'Tu hipersensibilidad al sufrimiento ajeno te lleva a veces a callarte cosas necesarias para no herir.' },
    ],
    relaciones: [
      { title: 'Conexiones profundas rápidamente', description: 'Puedes intimar emocionalmente con alguien tras una sola conversación honesta.' },
      { title: 'Eres la persona-confesionario', description: 'La gente se abre contigo con una facilidad que a veces te sorprende a ti.' },
      { title: 'Vulnerabilidad ante manipuladores', description: 'Tu empatía es maravillosa con gente sana, peligrosa cerca de gente que la explota.' },
      { title: 'Difícil decir no', description: 'Empatizas tanto con la decepción del otro que te cuesta poner el límite que te protege.' },
      { title: 'Te cargas con emociones ajenas', description: 'Sales agotado de conversaciones intensas porque has absorbido el peso del otro.' },
      { title: 'Necesitas pares emocionales', description: 'Personas que también sepan cuidar, no solo recibir tu cuidado constante.' },
    ],
    trabajo: [
      { title: 'Profesiones de cuidado', description: 'Psicología, educación, salud, RRHH, hospitality — tu sensibilidad encaja naturalmente.' },
      { title: 'Mentor y mediador', description: 'En cualquier sector, terminas siendo a quien acuden cuando hay tensión humana.' },
      { title: 'Riesgo en entornos hostiles', description: 'Empresas con cultura agresiva o jefes tóxicos te erosionan más rápido que a otros.' },
      { title: 'Reuniones tensas: agotador', description: 'Las dinámicas pasivo-agresivas o las críticas duras te afectan aunque no vayan dirigidas a ti.' },
      { title: 'Liderazgo humano', description: 'Los equipos te siguen porque te importan de verdad — eso se nota y se valora.' },
      { title: 'Cuidado con dar feedback difícil', description: 'Tu deseo de no herir puede llevarte a suavizar tanto un mensaje crítico que se pierde.' },
    ],
    estres: [
      { title: 'Sobre-estimulación social', description: 'Demasiada gente, demasiado tiempo, te agota emocionalmente aunque parezca un buen plan.' },
      { title: 'Soledad reparadora', description: 'Necesitas dosis regulares de tiempo a solas para "vaciar" lo que has absorbido.' },
      { title: 'Contacto con la naturaleza', description: 'El silencio del campo, el agua, los animales — te recargan más que casi cualquier otra cosa.' },
      { title: 'Rituales de descarga', description: 'Escribir, llorar cuando hace falta, meditar — herramientas para procesar lo que cargas.' },
      { title: 'Higiene emocional', description: 'Aprender a "ducharte" emocionalmente tras conversaciones difíciles es una habilidad que se entrena.' },
      { title: 'Diferenciar tus emociones de las ajenas', description: 'Cuestionarte "¿Esto es mío o de otro?" antes de actuar te ahorra muchos malentendidos contigo mismo.' },
    ],
    crecimiento: [
      { title: 'Poner límites sin culpa', description: 'Aprender que decir "no" no es traicionar a nadie — es proteger tu capacidad de seguir cuidando.' },
      { title: 'Empatizar sin fusionarte', description: 'Puedes sentir con alguien sin convertirte en él. La distancia emocional sana es parte de la madurez empática.' },
      { title: 'Pedir lo que necesitas', description: 'Tu hábito de leer al otro hace que te olvides de comunicar lo que tú quieres. Practica nombrarlo.' },
      { title: 'Confrontar cuando hace falta', description: 'A veces el acto más empático es decir una verdad incómoda. Evítalo solo cuando proteges a otros, no cuando te proteges tú.' },
      { title: 'Construir filtros', description: 'No todos los entornos merecen tu acceso emocional pleno. Aprende a estar más en superficie cuando toca.' },
      { title: 'Recibir cuidado', description: 'Permite que te cuiden. Tu valor no depende solo de lo que das.' },
    ],
  },
  subtypes: [
    { title: 'Empático sanador', description: 'Tu sensibilidad se vuelca en acompañar procesos de dolor y transformación ajenos.' },
    { title: 'Empático comunicador', description: 'Tu lectura emocional se traduce en palabras que conectan con quien las escucha.' },
    { title: 'Empático mediador', description: 'Tu habilidad para ver todos los lados te hace eficaz en resolver conflictos humanos.' },
  ],
  faq: [
    { question: '¿Por qué me agoto tanto con la gente?', answer: 'Porque tu sistema procesa mucha más información emocional por encuentro que la mayoría. No es debilidad, es ancho de banda. Aprender a regular esa entrada es clave.' },
    { question: '¿Soy demasiado sensible?', answer: 'No. Tu sensibilidad es proporcional a tu capacidad de conexión. El reto no es endurecerse, es aprender a proteger esa sensibilidad sin desconectarla.' },
    { question: '¿Cómo distingo entre lo que siento yo y lo que está sintiendo otro?', answer: 'Pregúntate: "¿Qué sentía antes de entrar en esta conversación?" Si la emoción apareció de golpe al estar con alguien, probablemente la has absorbido, no es tuya.' },
  ],
  trajectory: [
    { title: 'Etapa 1: Honrar tu sensibilidad', description: 'Acepta que percibir más profundamente es una característica, no un defecto a corregir. Diseña una vida que respete eso.' },
    { title: 'Etapa 2: Construir tus filtros', description: 'Aprende a empatizar conscientemente: cuándo abrirte, cuándo proteger tu canal, cuándo decir no a una carga emocional ajena.' },
    { title: 'Etapa 3: Usar tu don con propósito', description: 'Tu empatía puede convertirse en una herramienta de impacto deliberado — mentoría, ayuda profesional, liderazgo cálido — en lugar de un drenaje constante.' },
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// EL CONECTOR — habilidades sociales dominantes
// ────────────────────────────────────────────────────────────────────────────
const CONECTOR: ArchetypeContent = {
  displayName: 'El Conector',
  color: '#7c3aed',
  intro: [
    'Tienes un don poco común: la gente se siente cómoda contigo casi al instante. Lees los códigos sociales sin esfuerzo, ajustas tu energía al contexto y construyes puentes entre personas que aparentemente no tenían nada en común.',
    'Tu inteligencia emocional se manifiesta en el plano relacional. Sabes negociar, sabes presentar, sabes leer un grupo. Esa fluidez social te abre puertas — el reto es asegurarte de no abrir tantas que dejas de saber cuál es tu casa.',
  ],
  fullDescription:
    'El Conector domina el lado social de la inteligencia emocional: comunicación, lectura de grupo, influencia, construcción de redes. Tienes una capacidad poco común para hacer que los demás se sientan vistos y cómodos, y eso se traduce en oportunidades, alianzas y relaciones. El riesgo está en confundir conexión amplia con conexión profunda. Tu crecimiento pasa por proteger los pocos vínculos que de verdad importan dentro del bullicio de relaciones que tu vida atrae, y por mantener la coherencia entre quién eres en privado y cómo te muestras en público.',
  tabs: {
    caracteristicas: [
      { title: 'Sociabilidad natural', description: 'Te resulta fácil iniciar conversaciones con desconocidos en cualquier contexto.' },
      { title: 'Lectura de grupo', description: 'Captas las dinámicas, jerarquías y tensiones de un grupo casi al entrar en la sala.' },
      { title: 'Comunicación adaptativa', description: 'Ajustas tu lenguaje y energía dependiendo de con quién hablas, sin perder autenticidad.' },
      { title: 'Influencia sin imposición', description: 'Convences más con narrativa y empatía que con argumentos racionales puros.' },
      { title: 'Memoria social fina', description: 'Recuerdas detalles personales — nombres, anécdotas, intereses — que a otros se les escapan.' },
      { title: 'Energía contagiosa en grupo', description: 'Tu presencia eleva el ánimo de la habitación incluso sin que digas mucho.' },
    ],
    motivaciones: [
      { title: 'Te mueve la conexión', description: 'Encontrar el clic con alguien — risa, comprensión, mirada cómplice — es de lo más satisfactorio para ti.' },
      { title: 'Buscas redes', description: 'Construyes ecosistemas humanos a tu alrededor, no relaciones sueltas.' },
      { title: 'Valoras la fluidez', description: 'Te incomoda más el silencio incómodo que la conversación difícil.' },
      { title: 'Temes el aislamiento', description: 'Estar mucho tiempo desconectado te erosiona la energía y la identidad.' },
      { title: 'Te aburre la rigidez', description: 'Las estructuras formales sin calor humano te resultan tediosas.' },
      { title: 'Evitas el conflicto frontal', description: 'Prefieres buscar la fórmula que reconcilie a chocar de frente — a veces a costa de la claridad.' },
    ],
    relaciones: [
      { title: 'Círculo social amplio', description: 'Conoces a mucha gente y mucha gente te conoce a ti.' },
      { title: 'Catalizador de encuentros', description: 'Eres quien presenta personas, organiza cenas, conecta intereses. Tu rol es generativo.' },
      { title: 'Riesgo de superficialidad', description: 'A veces sacrificas profundidad por amplitud. Tener mil contactos no es lo mismo que tener cinco amigos reales.' },
      { title: 'Necesitas pocos confidentes reales', description: 'Detrás del tablero social, hay un círculo muy pequeño de gente con quien eres tú del todo.' },
      { title: 'Vulnerable al juicio público', description: 'Cuando tu reputación social se ve afectada, te afecta más que a la media.' },
      { title: 'Generador de oportunidades para otros', description: 'Recomendar a alguien, abrirle una puerta — disfrutas haciéndolo y los demás se acuerdan de ello.' },
    ],
    trabajo: [
      { title: 'Roles comerciales y de relación', description: 'Ventas, partnerships, comunicación, eventos — terrenos donde tu fluidez se traduce en resultados.' },
      { title: 'Liderazgo carismático', description: 'Tu equipo te sigue porque te quiere, no solo porque te respeta.' },
      { title: 'Networking estratégico', description: 'Tu red profesional es uno de tus mayores activos. Mantenerla viva forma parte de tu trabajo, lo notes o no.' },
      { title: 'Riesgo de dispersión', description: 'Tantos contactos pueden traducirse en demasiados proyectos a la vez y poco foco.' },
      { title: 'Reuniones largas: tu hábitat', description: 'Donde otros se agotan, tú coges energía. Tu rendimiento no decae con la interacción.' },
      { title: 'Trabajo en solitario: tu kryptonita', description: 'Pasar muchas horas seguidas sin contacto humano te baja la energía y la productividad.' },
    ],
    estres: [
      { title: 'Aislamiento prolongado', description: 'Tu mayor fuente de malestar es la falta de contacto humano, no su exceso.' },
      { title: 'Sobrecarga de obligaciones sociales', description: 'Aunque te recargues con la gente, decir sí a todo te lleva al límite.' },
      { title: 'Conflictos no resueltos', description: 'Una conversación pendiente o una relación tensa te pesa en el cuerpo hasta que la abordas.' },
      { title: 'Tiempo a solas estructurado', description: 'No te recargas en cualquier soledad — necesitas que sea soledad con propósito, no improvisada.' },
      { title: 'Ejercicio social', description: 'Caminar con un amigo, deporte de equipo, baile: combinas descarga física con conexión.' },
      { title: 'Riesgo de máscara social', description: 'Si llevas demasiado tiempo siendo "el simpático", puedes desconectar de lo que sientes de verdad.' },
    ],
    crecimiento: [
      { title: 'Cultivar la profundidad', description: 'Tu reto no es tener más conexiones, es profundizar las que ya tienes.' },
      { title: 'Diferenciar simpatía de autenticidad', description: 'Ser agradable es una habilidad. Mostrarte real es un acto de coraje. Necesitas las dos.' },
      { title: 'Aprender a estar solo', description: 'No como castigo sino como práctica. Conocerte fuera del espejo social es liberador.' },
      { title: 'Decir verdades incómodas', description: 'A veces el acto más leal hacia un amigo es la conversación que llevas evitando.' },
      { title: 'Filtrar tu agenda social', description: 'No todo encuentro merece tu energía. Aprende a decir no sin sentirte mal.' },
      { title: 'Construir desde el silencio', description: 'Las grandes ideas y las grandes decisiones se cocinan mejor en pausa que en charla.' },
    ],
  },
  subtypes: [
    { title: 'Conector embajador', description: 'Tu rol natural es representar grupos, ideas o marcas hacia el exterior.' },
    { title: 'Conector facilitador', description: 'Tu fuerza está en hacer que un grupo funcione mejor, no en ser el centro.' },
    { title: 'Conector negociador', description: 'Tu habilidad social se vuelca en cerrar acuerdos y construir alianzas duraderas.' },
  ],
  faq: [
    { question: '¿Por qué tengo tantos conocidos y tan pocos amigos íntimos?', answer: 'Es una característica del Conector, no un defecto. Tu vida atrae conexiones; los amigos íntimos requieren tiempo deliberado. Decide explícitamente cuáles vas a regar y protégelos del ruido.' },
    { question: '¿Soy demasiado complaciente?', answer: 'A veces sí. La empatía social que te abre puertas también puede llevarte a evitar la fricción necesaria. Practica decir lo que piensas con cuidado, pero sin diluirlo.' },
    { question: '¿Cómo sé si estoy siendo yo o estoy en modo "social"?', answer: 'Tras un evento intenso, pregúntate: "¿Diría lo mismo si nadie me oyera?" Si la respuesta es no en muchas conversaciones seguidas, es señal de que estás operando demasiado en máscara.' },
  ],
  trajectory: [
    { title: 'Etapa 1: Convertir tu don en estrategia', description: 'Tu fluidez social es un superpoder. Aprende a usarla con propósito, no solo por inercia.' },
    { title: 'Etapa 2: Profundizar tu red interior', description: 'Identifica los cinco vínculos que realmente importan y trabájalos con la misma intencionalidad con la que cuidas tu vida pública.' },
    { title: 'Etapa 3: Liderar comunidades', description: 'Tu nivel maduro es convertirte en quien sostiene y nutre comunidades enteras, no solo en quien las atrae.' },
  ],
};

export const ARCHETYPE_CONTENT: Record<ArchetypeKey, ArchetypeContent> = {
  observador: OBSERVADOR,
  ancla: ANCLA,
  impulsor: IMPULSOR,
  empatico: EMPATICO,
  conector: CONECTOR,
};

// ────────────────────────────────────────────────────────────────────────────
// DIARIO: 7 píldoras educativas (rotan por día de la semana)
// ────────────────────────────────────────────────────────────────────────────
export type DailyPill = {
  category: string;
  title: string;
  preview: string;
  body: string;
};

export const DAILY_PILLS: DailyPill[] = [
  {
    category: 'Inteligencia Emocional',
    title: 'La autoconciencia no es introspección sin fin',
    preview:
      'Conocerse a uno mismo no es darle vueltas a todo lo que pasa por dentro, sino saber identificar qué emoción estás sintiendo en cada momento — y poder nombrarla.',
    body:
      'La autoconciencia, la primera de las cinco dimensiones de Goleman, se ejercita con un gesto simple: cuando notes un cambio emocional, pregúntate qué emoción concreta estás sintiendo. No "me siento mal" sino "me siento frustrado", "me siento abrumado", "me siento decepcionado". Ese ejercicio aparentemente trivial es lo que separa a quienes regulan sus emociones de quienes son arrastrados por ellas. Distinguir entre tristeza y agotamiento, entre rabia y miedo, te da el primer punto de apoyo para responder en lugar de reaccionar.',
  },
  {
    category: 'Inteligencia Emocional',
    title: 'La regla de los 90 segundos',
    preview:
      'Una emoción no dura más de un minuto y medio en tu cuerpo. Si dura más, eres tú alimentándola con pensamiento.',
    body:
      'La neurocientífica Jill Bolte Taylor describió este principio: la reacción química de una emoción dura unos 90 segundos. Después, lo que la mantiene viva es el pensamiento que la acompaña. Cuando algo te active emocionalmente, prueba esto: respira y cuenta hasta 90. Observa la emoción sin alimentarla con interpretaciones. Lo que persista después de ese minuto y medio es elección tuya. Esta es la base de la autorregulación emocional madura.',
  },
  {
    category: 'Inteligencia Emocional',
    title: 'La motivación intrínseca se entrena',
    preview:
      'No naces con más o menos motivación. Es una habilidad que se cultiva conectando lo que haces con lo que realmente te importa.',
    body:
      'La motivación intrínseca — el motor que viene de dentro — no es un rasgo fijo. Se entrena conectando deliberadamente lo que haces con tus valores profundos. Pregúntate cada mañana: "¿Qué hace que esto importe?" No "qué tengo que hacer", sino "por qué tiene sentido hacerlo hoy". Esta pequeña traducción transforma la inercia en propósito. Las personas con alta IE motivacional no tienen más fuerza de voluntad — tienen mejor narrativa sobre por qué hacen lo que hacen.',
  },
  {
    category: 'Inteligencia Emocional',
    title: 'Empatía no es estar de acuerdo',
    preview:
      'Comprender lo que siente el otro no significa darle la razón. Empatía es validar la experiencia emocional, no la conclusión.',
    body:
      'Una confusión frecuente: la gente cree que ser empático significa coincidir. No es así. Puedes comprender perfectamente por qué tu hijo está enfadado y aun así no permitirle lo que pide. Puedes ver con claridad la frustración de un compañero y aun así sostener tu posición. La empatía madura separa dos cosas: la validación del estado emocional ("entiendo que estés frustrado") y el contenido de la conversación ("y aun así, no voy a hacer X"). Esa distinción evita tanto la rigidez como la complacencia.',
  },
  {
    category: 'Inteligencia Emocional',
    title: 'Las habilidades sociales empiezan con escucha',
    preview:
      'La mayor herramienta social no es saber hablar bien, es saber escuchar de verdad. Y escuchar es no preparar la respuesta mientras el otro habla.',
    body:
      'Daniel Goleman insistía en que la quinta dimensión — las habilidades sociales — se sostiene sobre una práctica básica: escuchar para entender, no para responder. La diferencia es sutil pero profunda. Quien escucha para responder está pensando en su próxima frase. Quien escucha para entender suspende su agenda y se entrega a captar lo que el otro intenta decir. Esa actitud es rara y se nota. La gente que la practica construye relaciones más profundas porque las otras personas se sienten realmente vistas.',
  },
  {
    category: 'Inteligencia Emocional',
    title: 'El cuerpo habla antes que tú',
    preview:
      'La tensión en los hombros, la respiración corta o la mandíbula apretada te están dando información emocional antes de que la mente la procese.',
    body:
      'Buena parte de tu inteligencia emocional empieza por el cuerpo. Antes de que puedas nombrar una emoción, tu cuerpo ya la está expresando: respiración acelerada, mandíbula apretada, hombros subidos, mariposas en el estómago. Aprender a leer estas señales es entrenar lo que se llama "interocepción" — la consciencia del estado interno. Los próximos días, prueba esto: pausa tres veces al día, cierra los ojos diez segundos y escanea tu cuerpo de cabeza a pies. ¿Qué está tenso? ¿Qué pesa? Esa información es el primer dato de tu paisaje emocional.',
  },
  {
    category: 'Inteligencia Emocional',
    title: 'La autoestima no es siempre sentirse bien',
    preview:
      'Una autoestima sana no consiste en estar contento contigo mismo a todas horas. Consiste en mantenerte fiel a tus valores incluso cuando no te gustas.',
    body:
      'Confundimos autoestima con autocomplacencia. La autoestima emocional madura no depende de cómo te sientas en este momento — depende de la coherencia entre lo que valoras y cómo actúas. Hay días en los que no te vas a gustar mucho, y eso no significa que tu autoestima esté baja. Significa que estás siendo honesto. La autoestima estable se construye sobre una pregunta diaria: "¿Hoy he hecho algo coherente con lo que de verdad creo?" Si la respuesta es sí, la sensación de valía sigue ahí incluso cuando tu humor no acompaña.',
  },
];

// ────────────────────────────────────────────────────────────────────────────
// TRIVIAL: 7 preguntas (rotan por día de la semana)
// ────────────────────────────────────────────────────────────────────────────
export type TriviaQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    question: '¿Cuál de las 5 dimensiones de Goleman se refiere a la capacidad de identificar tus propias emociones en el momento en que ocurren?',
    options: ['Empatía', 'Autoconciencia', 'Motivación', 'Habilidades sociales'],
    correctIndex: 1,
    explanation: 'La autoconciencia es la primera dimensión y la base del resto: sin ella, no puedes regular, motivarte o empatizar conscientemente.',
  },
  {
    question: 'Según la "regla de los 90 segundos" de Jill Bolte Taylor, ¿cuánto dura la reacción química de una emoción en el cuerpo?',
    options: ['Unos 10 segundos', 'Unos 90 segundos', 'Unos 10 minutos', 'Hasta una hora'],
    correctIndex: 1,
    explanation: 'Pasados unos 90 segundos, lo que mantiene la emoción es el pensamiento que la acompaña, no la química inicial.',
  },
  {
    question: '¿Cuál de estos NO es uno de los componentes de la inteligencia emocional según Goleman?',
    options: ['Autorregulación', 'Empatía', 'Inteligencia lógico-matemática', 'Habilidades sociales'],
    correctIndex: 2,
    explanation: 'Las 5 dimensiones de Goleman son: autoconciencia, autorregulación, motivación, empatía y habilidades sociales. La inteligencia lógico-matemática pertenece a Howard Gardner.',
  },
  {
    question: 'La empatía cognitiva se diferencia de la empatía afectiva en que la cognitiva...',
    options: [
      'Te hace sentir lo mismo que la otra persona',
      'Te permite entender lo que piensa la otra persona sin necesariamente sentirlo',
      'Es involuntaria',
      'Solo aparece en relaciones cercanas',
    ],
    correctIndex: 1,
    explanation: 'La empatía cognitiva es comprensión racional del estado del otro. La afectiva es sentir con el otro. Una IE madura combina ambas.',
  },
  {
    question: '¿Qué hábito es más eficaz para fortalecer la autoconciencia emocional?',
    options: [
      'Leer libros sobre psicología',
      'Hablar mucho de tus emociones con amigos',
      'Llevar un diario emocional diario',
      'Hacer terapia una vez al mes',
    ],
    correctIndex: 2,
    explanation: 'El diario emocional diario te obliga a nombrar lo que sientes con precisión, lo que entrena directamente la primera dimensión de Goleman.',
  },
  {
    question: 'Cuando alguien dice "estoy bien" pero tiene los hombros encogidos y mira al suelo, una persona con alta IE...',
    options: [
      'Asume que está bien porque eso es lo que dijo',
      'Le insiste hasta que confiese qué le pasa',
      'Nota la incongruencia y le da espacio para hablar si quiere',
      'Le dice que es obvio que miente',
    ],
    correctIndex: 2,
    explanation: 'La lectura no verbal es parte clave de las habilidades sociales. Validar el espacio del otro sin forzar es la respuesta madura.',
  },
  {
    question: 'La motivación intrínseca se diferencia de la extrínseca porque la intrínseca proviene de...',
    options: [
      'Una recompensa externa (dinero, reconocimiento)',
      'El miedo al castigo',
      'Una satisfacción interna conectada a tus valores',
      'La presión social del entorno',
    ],
    correctIndex: 2,
    explanation: 'Esta es la motivación más sostenible: actuar porque conectas con un propósito interno, no porque alguien te recompense o castigue.',
  },
];

// ────────────────────────────────────────────────────────────────────────────
// TESTS y CURSOS — catálogos hardcodeados
// ────────────────────────────────────────────────────────────────────────────
export type CatalogTest = {
  id: string;
  slot: number;
  title: string;
  description: string;
  category: 'dimensiones' | 'personales';
  questions: number;
  duration: string;
  relatedDimension?: string;
  accent: string;
};

export const CATALOG_TESTS: CatalogTest[] = [
  {
    id: 'autoconciencia',
    slot: 2,
    title: 'Test de Autoconciencia Emocional',
    description: 'Mide con precisión tu capacidad para identificar y comprender tus propias emociones en tiempo real.',
    category: 'dimensiones',
    questions: 10,
    duration: '5 min',
    relatedDimension: 'self-awareness',
    accent: '#1d4ed8',
  },
  {
    id: 'autorregulacion',
    slot: 1,
    title: 'Test de Autorregulación',
    description: 'Descubre cómo gestionas tus impulsos emocionales y tu capacidad de respuesta ante situaciones desafiantes.',
    category: 'dimensiones',
    questions: 10,
    duration: '5 min',
    relatedDimension: 'self-regulation',
    accent: '#0891b2',
  },
  {
    id: 'motivacion',
    slot: 3,
    title: 'Test de Motivación Intrínseca',
    description: 'Evalúa qué te mueve por dentro y cómo de alineado está tu motor interno con tus objetivos.',
    category: 'dimensiones',
    questions: 10,
    duration: '5 min',
    relatedDimension: 'motivation',
    accent: '#ea580c',
  },
  {
    id: 'empatia',
    slot: 4,
    title: 'Test de Empatía Avanzada',
    description: 'Mide tu empatía cognitiva y afectiva en distintos contextos: trabajo, familia, conflictos.',
    category: 'dimensiones',
    questions: 10,
    duration: '5 min',
    relatedDimension: 'empathy',
    accent: '#dc2626',
  },
  {
    id: 'habilidades',
    slot: 5,
    title: 'Test de Habilidades Sociales',
    description: 'Evalúa tu capacidad para leer grupos, comunicar con eficacia y construir relaciones sólidas.',
    category: 'dimensiones',
    questions: 10,
    duration: '5 min',
    relatedDimension: 'social-skills',
    accent: '#7c3aed',
  },
  {
    id: 'estres',
    slot: 6,
    title: 'Test de Gestión del Estrés',
    description: 'Identifica tus patrones bajo presión y qué estrategias de regulación funcionan mejor para ti.',
    category: 'personales',
    questions: 10,
    duration: '5 min',
    accent: '#0f766e',
  },
  {
    id: 'trabajo',
    slot: 7,
    title: 'Test de Inteligencia Emocional en el Trabajo',
    description: 'Descubre cómo tu IE se manifiesta en el entorno laboral y dónde puedes desarrollarte más.',
    category: 'personales',
    questions: 10,
    duration: '5 min',
    accent: '#0f172a',
  },
  {
    id: 'resiliencia',
    slot: 8,
    title: 'Test de Resiliencia Emocional',
    description: 'Mide tu capacidad para recuperarte de los contratiempos y mantener el equilibrio en la adversidad.',
    category: 'personales',
    questions: 10,
    duration: '5 min',
    accent: '#b45309',
  },
  {
    id: 'comunicacion',
    slot: 9,
    title: 'Test de Comunicación Empática',
    description: 'Evalúa la calidad de tu escucha activa, asertividad y capacidad de validación emocional.',
    category: 'personales',
    questions: 10,
    duration: '5 min',
    accent: '#be185d',
  },
  {
    id: 'liderazgo',
    slot: 10,
    title: 'Test de Liderazgo Emocional',
    description: 'Descubre qué tipo de líder eres desde la perspectiva de la inteligencia emocional aplicada.',
    category: 'personales',
    questions: 10,
    duration: '5 min',
    accent: '#4f46e5',
  },
];

export type CatalogCourse = {
  id: string;
  title: string;
  description: string;
  classes: number;
  weeks: number;
  completed: number;
  gradient: [string, string];
  relatedArchetype?: ArchetypeKey;
};

export const CATALOG_COURSES: CatalogCourse[] = [
  {
    id: 'fundamentos',
    title: 'Fundamentos de la Inteligencia Emocional',
    description:
      'El punto de partida ideal: entiende las 5 dimensiones de Goleman y cómo aplicarlas a tu vida diaria.',
    classes: 10,
    weeks: 2,
    completed: 4823,
    gradient: ['#1d4ed8', '#7c3aed'],
  },
  {
    id: 'trabajo',
    title: 'Gestión Emocional en el Trabajo',
    description:
      'Aplica tu inteligencia emocional al entorno laboral: reuniones tensas, feedback difícil, liderazgo bajo presión.',
    classes: 10,
    weeks: 2,
    completed: 3651,
    gradient: ['#0f172a', '#0891b2'],
    relatedArchetype: 'impulsor',
  },
  {
    id: 'comunicacion',
    title: 'Comunicación con IE',
    description:
      'Aprende a escuchar de verdad, a poner límites con respeto y a tener conversaciones difíciles sin romper el vínculo.',
    classes: 10,
    weeks: 2,
    completed: 4127,
    gradient: ['#7c3aed', '#dc2626'],
    relatedArchetype: 'conector',
  },
  {
    id: 'liderazgo',
    title: 'Liderazgo Emocionalmente Inteligente',
    description:
      'Construye equipos que te sigan por convicción, no por jerarquía. Liderazgo basado en presencia y conexión real.',
    classes: 10,
    weeks: 2,
    completed: 2954,
    gradient: ['#ea580c', '#b45309'],
    relatedArchetype: 'impulsor',
  },
  {
    id: 'relaciones',
    title: 'IE en las Relaciones Personales',
    description:
      'Aplica las 5 dimensiones a tus relaciones más íntimas: pareja, familia, amistades profundas.',
    classes: 10,
    weeks: 2,
    completed: 3805,
    gradient: ['#dc2626', '#ea580c'],
    relatedArchetype: 'empatico',
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness y Regulación Emocional',
    description:
      'Integra prácticas contemplativas con técnicas de regulación emocional avaladas por la neurociencia.',
    classes: 10,
    weeks: 2,
    completed: 4498,
    gradient: ['#0891b2', '#1d4ed8'],
    relatedArchetype: 'ancla',
  },
  {
    id: 'resiliencia',
    title: 'Resiliencia y Gestión del Estrés',
    description:
      'Aprende a sostener el rendimiento en situaciones difíciles sin romper tu salud emocional.',
    classes: 10,
    weeks: 2,
    completed: 3267,
    gradient: ['#0f766e', '#0891b2'],
    relatedArchetype: 'ancla',
  },
  {
    id: 'crecimiento',
    title: 'IE para el Crecimiento Personal',
    description:
      'Un programa estructurado de 10 sesiones para profundizar en tu autoconciencia y diseñar tu evolución.',
    classes: 10,
    weeks: 2,
    completed: 2789,
    gradient: ['#1d4ed8', '#0891b2'],
    relatedArchetype: 'observador',
  },
  {
    id: 'empatia',
    title: 'Empatía y Habilidades Sociales',
    description:
      'Lleva tu capacidad de conexión al siguiente nivel: empatía estratégica, lectura de grupo y comunicación influyente.',
    classes: 10,
    weeks: 2,
    completed: 3914,
    gradient: ['#dc2626', '#7c3aed'],
    relatedArchetype: 'conector',
  },
  {
    id: 'avanzada',
    title: 'IE Avanzada: De la Teoría a la Práctica',
    description:
      'Para quien ya tiene base: aplica la inteligencia emocional a situaciones complejas y entornos exigentes.',
    classes: 10,
    weeks: 2,
    completed: 2543,
    gradient: ['#0f172a', '#4f46e5'],
  },
];

export type CourseLesson = {
  title: string;
  content: string;
};

export type CourseContent = {
  lessons: CourseLesson[];
};

export const COURSE_CONTENT: Record<string, CourseContent> = {
  fundamentos: {
    lessons: [
      {
        title: '¿Qué es la Inteligencia Emocional?',
        content:
          'La inteligencia emocional (IE) es la capacidad de reconocer, comprender y gestionar nuestras propias emociones y las de los demás. Daniel Goleman la popularizó en 1995 y demostró que el cociente emocional puede ser más determinante para el éxito en la vida que el cociente intelectual. La IE no es un rasgo fijo — es una habilidad que se desarrolla con práctica y consciencia. Las personas con alta IE toman mejores decisiones, tienen relaciones más satisfactorias y gestionan el estrés de forma más efectiva. En esta lección exploraremos por qué la IE importa y cómo puede transformar tu vida personal y profesional.',
      },
      {
        title: 'Las 5 dimensiones de Goleman',
        content:
          'El modelo de Goleman divide la inteligencia emocional en 5 dimensiones fundamentales. La Autoconciencia es la capacidad de reconocer tus propias emociones en tiempo real. La Autorregulación es la habilidad de gestionar esas emociones de forma constructiva. La Motivación intrínseca es el impulso interno que te mueve más allá de las recompensas externas. La Empatía es la capacidad de comprender y compartir las emociones de los demás. Las Habilidades Sociales son las competencias para gestionar relaciones de forma efectiva. Cada dimensión se construye sobre la anterior, creando un sistema integrado de inteligencia emocional.',
      },
      {
        title: 'Autoconciencia — La base de todo',
        content:
          'La autoconciencia emocional es el fundamento sobre el que se construyen todas las demás dimensiones. Sin ella, no podemos regular nuestras emociones, empatizar con otros ni relacionarnos eficazmente. Desarrollar la autoconciencia significa aprender a observar nuestros estados internos sin juzgarlos — como un testigo neutral de nuestra propia experiencia emocional. Las personas con alta autoconciencia conocen sus fortalezas y limitaciones, entienden cómo sus emociones afectan su comportamiento y saben qué situaciones las activan. Práctica clave: al final de cada día, identifica las 3 emociones más presentes y qué las provocó.',
      },
      {
        title: 'Autorregulación — Gestionar sin reprimir',
        content:
          'La autorregulación no significa suprimir las emociones — significa elegir cómo responder a ellas en lugar de reaccionar automáticamente. Entre el estímulo y la respuesta existe un espacio. En ese espacio reside nuestra libertad y nuestra capacidad de crecimiento. Las técnicas de autorregulación incluyen la respiración consciente, el reencuadre cognitivo, la pausa deliberada antes de responder y la práctica de la atención plena. Una persona con buena autorregulación puede sentir rabia intensa y aun así elegir responder con calma. No es que no sienta — es que decide cómo actuar a partir de lo que siente.',
      },
      {
        title: 'Motivación intrínseca',
        content:
          'La motivación intrínseca es el combustible emocional más sostenible que existe. A diferencia de la motivación extrínseca — basada en recompensas, reconocimiento o miedo — la motivación intrínseca surge del interior: de la curiosidad, el propósito y el disfrute del proceso en sí mismo. Las personas con alta motivación intrínseca persisten ante los obstáculos, se recuperan más rápido del fracaso y encuentran significado en lo que hacen. Goleman la describe como una pasión por el trabajo más allá del dinero o el estatus. Para cultivarla, necesitas conectar tus acciones diarias con tus valores más profundos y preguntarte regularmente: ¿por qué esto me importa realmente?',
      },
      {
        title: 'Empatía — Más allá de la simpatía',
        content:
          'La empatía es la capacidad de comprender la experiencia emocional de otra persona desde su perspectiva, no desde la tuya. Hay dos tipos: la empatía cognitiva (entender intelectualmente cómo se siente alguien) y la empatía afectiva (sentir resonancia emocional con lo que el otro experimenta). La empatía genuina no requiere estar de acuerdo ni compartir la misma emoción — requiere presencia, escucha activa y suspensión temporal del propio juicio. Las personas empáticas leen mejor las situaciones sociales, generan más confianza y construyen relaciones más profundas. La empatía también tiene un límite saludable: la compasión empática, que cuida sin absorberse.',
      },
      {
        title: 'Habilidades Sociales',
        content:
          'Las habilidades sociales son la expresión externa de todas las dimensiones anteriores. Incluyen la comunicación efectiva, la gestión de conflictos, el liderazgo, la colaboración y la influencia positiva. Una persona con altas habilidades sociales sabe cuándo hablar y cuándo escuchar, adapta su comunicación al interlocutor, crea ambientes de confianza y moviliza a otros hacia objetivos compartidos. Estas habilidades no son manipulación — son la aplicación consciente de la comprensión emocional al servicio de las relaciones. Se desarrollan con práctica deliberada, feedback honesto y una actitud de aprendizaje continuo.',
      },
      {
        title: 'IE y toma de decisiones',
        content:
          'Contrariamente a la creencia popular, las emociones no son el enemigo de las buenas decisiones — son información esencial para tomarlas. El neurocientífico Antonio Damasio demostró que las personas con daño en las áreas cerebrales emocionales toman peores decisiones, no mejores. Las emociones nos señalan qué nos importa, qué nos preocupa y qué nos motiva. La IE aplicada a la toma de decisiones significa aprender a leer esas señales emocionales sin dejarse secuestrar por ellas. Implica preguntarse: ¿qué me dice esta emoción? ¿Es información útil o es ruido del miedo o el ego? La mejor toma de decisiones integra datos racionales y señales emocionales.',
      },
      {
        title: 'IE en las relaciones',
        content:
          'Las relaciones son el campo de entrenamiento más exigente de la inteligencia emocional. En ellas ponemos en juego todas nuestras dimensiones: necesitamos autoconciencia para no proyectar, autorregulación para no reaccionar, motivación para invertir en la relación a largo plazo, empatía para comprender al otro y habilidades sociales para comunicar y resolver conflictos. Las relaciones de alta calidad — basadas en la confianza, la honestidad y el respeto mutuo — son uno de los predictores más robustos del bienestar y la longevidad. La IE no garantiza relaciones perfectas, pero sí relaciones más conscientes, más honestas y más resilientes.',
      },
      {
        title: 'Tu plan de desarrollo de IE',
        content:
          'El desarrollo de la inteligencia emocional es un viaje de por vida, no un destino. Esta última lección te invita a diseñar tu propio plan de crecimiento emocional basado en lo que has aprendido. Identifica tu dimensión más fuerte — esa es tu ancla de confianza. Identifica tu dimensión más débil — esa es tu mayor oportunidad de crecimiento. Elige una práctica diaria concreta para cada una. El cambio emocional real requiere repetición, paciencia y autocompasión. No te juzgues por donde estás — obsérvate con curiosidad. Cada emoción difícil que atraviesas conscientemente es un entrenamiento. Cada relación que cuidas es una práctica. Sigue creciendo.',
      },
    ],
  },
  trabajo: {
    lessons: [
      {
        title: 'Emociones en el entorno laboral — por qué importan',
        content:
          'Durante décadas, el mundo laboral ha promovido la idea de que las emociones no tienen lugar en el trabajo. Esta creencia ha generado entornos tóxicos, decisiones empobrecidas y burnout masivo. La realidad es que las emociones están siempre presentes en el trabajo — lo que varía es si las gestionamos conscientemente o las dejamos operar en modo automático. Las organizaciones con culturas emocionalmente inteligentes tienen menor rotación, mayor creatividad y mejores resultados. Tu IE laboral determina cómo te relacionas con tu jefe, tus compañeros, tus clientes y contigo mismo bajo presión.',
      },
      {
        title: 'Gestionar el estrés laboral',
        content:
          'El estrés laboral crónico es una de las principales causas de baja productividad, enfermedad y abandono profesional. La clave no es eliminar el estrés — es aprender a relacionarse con él de forma más inteligente. El estrés agudo y temporal puede mejorar el rendimiento. El estrés crónico lo destruye. Las estrategias más efectivas incluyen: identificar tus principales detonantes de estrés laboral, crear rituales de transición entre el trabajo y la vida personal, practicar la respiración consciente en momentos de alta presión y establecer límites claros con el tiempo y la energía.',
      },
      {
        title: 'Comunicación asertiva en el trabajo',
        content:
          'La asertividad es la capacidad de expresar tus necesidades, opiniones y límites de forma clara y respetuosa, sin agresividad ni pasividad. En el entorno laboral, la falta de asertividad genera acumulación de resentimiento, malentendidos y pérdida de respeto. La comunicación asertiva usa mensajes en primera persona: en lugar de "siempre llegas tarde", "cuando las reuniones empiezan tarde yo pierdo concentración". Practica el no asertivo: claro, sin justificaciones excesivas, sin agresividad. La asertividad no es egoísmo — es respeto por uno mismo y por los demás.',
      },
      {
        title: 'Gestionar conflictos laborales',
        content:
          'El conflicto laboral es inevitable — lo que varía es cómo lo gestionamos. Las personas con alta IE ven el conflicto como información: algo importante está en juego para alguien. Antes de entrar en un conflicto, regula tu estado emocional propio. Durante el conflicto, escucha para entender, no para responder. Separa la persona del problema. Busca intereses comunes más allá de las posiciones declaradas. Después del conflicto, revisa qué aprendiste sobre ti mismo y sobre la relación. El conflicto bien gestionado fortalece las relaciones — el evitado las corroe lentamente.',
      },
      {
        title: 'IE y productividad',
        content:
          'La inteligencia emocional y la productividad están profundamente conectadas. Las emociones no gestionadas — el miedo a fallar, la rabia ante la injusticia, la desmotivación — son las principales fuentes de procrastinación y dispersión. Gestionar tu estado emocional antes de trabajar es tan importante como gestionar tu tiempo. Técnicas de IE para la productividad: identifica en qué estado emocional rindes mejor y crea las condiciones para ese estado. Reconoce cuándo una emoción intensa está secuestrando tu atención y dale espacio antes de volver a la tarea.',
      },
      {
        title: 'Relaciones con el equipo',
        content:
          'La calidad de tus relaciones con tu equipo determina en gran medida tu experiencia laboral y tu rendimiento. Las relaciones de equipo de alta IE se caracterizan por la confianza psicológica: la sensación de que puedes expresar ideas, cometer errores y pedir ayuda sin miedo al juicio. Para construir esa confianza: muestra vulnerabilidad auténtica, cumple tus compromisos, reconoce el trabajo de otros de forma específica y genuina, y gestiona tus propias emociones para no contaminar el clima del equipo.',
      },
      {
        title: 'Relación con la autoridad y el liderazgo',
        content:
          'Nuestra relación con las figuras de autoridad está profundamente influenciada por nuestros patrones emocionales tempranos. Entender esto nos ayuda a relacionarnos con jefes y líderes desde un lugar más consciente y menos reactivo. Si tiendes a la sobre-dependencia de la aprobación de tu jefe, trabaja tu autoconfianza. Si tiendes a la rebeldía automática ante la autoridad, explora qué hay detrás. La relación ideal con un líder es colaborativa: respeto mutuo, feedback bidireccional y alineación en torno a un propósito compartido.',
      },
      {
        title: 'Inteligencia emocional en reuniones',
        content:
          'Las reuniones son uno de los contextos laborales donde más se manifiesta la IE — o su ausencia. En una reunión emocionalmente inteligente: todos se sienten escuchados, los conflictos se abordan con respeto, las decisiones integran perspectivas diversas y el tiempo de todos se respeta. Para mejorar tu IE en reuniones: llega regulado emocionalmente, practica la escucha activa incluso cuando no estás de acuerdo, observa la dinámica emocional del grupo y contribuye a crear un espacio seguro para las ideas.',
      },
      {
        title: 'Gestionar el feedback',
        content:
          'Recibir feedback es una de las situaciones laborales más emocionalmente activadoras. Cuando recibimos críticas, el cerebro puede interpretarlo como una amenaza personal y activar la respuesta de defensa. La IE nos permite recibir el feedback como información útil en lugar de como un ataque. Pasos para recibir feedback con IE: respira antes de responder, agradece la feedback aunque te incomode, pide clarificación si es necesario, evalúa qué parte es válida y qué parte refleja la perspectiva del otro, y decide qué quieres integrar.',
      },
      {
        title: 'Construir una carrera con IE',
        content:
          'Una carrera construida desde la inteligencia emocional es una carrera alineada con tus valores, fortalezas y propósito. No se trata solo de ascender — se trata de crecer. Las personas con alta IE laboral conocen sus fortalezas y las posicionan, gestionan su reputación emocional conscientemente, construyen redes de relaciones basadas en la autenticidad, se adaptan al cambio con agilidad y lideran desde el ejemplo. Tu IE es tu activo profesional más diferenciador en un mundo donde las habilidades técnicas se automatizan cada vez más rápido.',
      },
    ],
  },
  comunicacion: {
    lessons: [
      {
        title: 'La comunicación como acto emocional',
        content:
          'Toda comunicación es un acto emocional. Incluso cuando transmitimos información aparentemente neutra, estamos enviando señales emocionales a través del tono, el lenguaje corporal, la velocidad y el volumen. Mehrabian demostró que en la comunicación cara a cara, el 55% del mensaje lo transmite el lenguaje corporal, el 38% el tono de voz y solo el 7% las palabras. Desarrollar la IE comunicativa significa aprender a gestionar estos canales de forma consciente y a leer los mismos canales en los demás.',
      },
      {
        title: 'Escucha activa profunda',
        content:
          'La mayoría de las personas no escuchan para entender — escuchan para responder. La escucha activa profunda es una de las habilidades más transformadoras de la IE. Implica dar atención plena al interlocutor, suspender el juicio, tolerar el silencio, reflejar lo escuchado y hacer preguntas que invitan a profundizar. Los obstáculos más comunes de la escucha activa son: la mente que divaga, el juicio prematuro, la preparación de la respuesta mientras el otro habla y la distracción digital. Practica la escucha como si fuera la única cosa que importa en ese momento.',
      },
      {
        title: 'El poder del lenguaje emocional',
        content:
          'Las palabras que usamos para describir nuestras emociones tienen un impacto directo en cómo las procesamos y las comunicamos. Un vocabulario emocional rico nos permite comunicar con más precisión y profundidad. La diferencia entre decir "estoy mal" y "me siento decepcionado porque esperaba algo diferente" es enorme — la segunda versión comunica información útil y abre la posibilidad de una conversación real. Amplía tu vocabulario emocional: aprende a distinguir entre frustración, rabia, irritación y resentimiento; entre tristeza, melancolía, duelo y desilusión.',
      },
      {
        title: 'Comunicación no violenta',
        content:
          'La Comunicación No Violenta (CNV), desarrollada por Marshall Rosenberg, es un modelo de comunicación basado en la empatía y la honestidad radical. Su estructura tiene 4 componentes: Observación (qué ocurrió, sin juicio), Sentimiento (cómo me siento ante eso), Necesidad (qué necesidad mía está en juego) y Petición (qué pido concreto y realizable). En lugar de "siempre eres irresponsable", la CNV diría: "Cuando el informe llegó tarde (observación), me sentí frustrado (sentimiento) porque necesito poder planificar (necesidad). ¿Podríamos acordar una fecha de entrega? (petición)".',
      },
      {
        title: 'Comunicar en situaciones difíciles',
        content:
          'Las conversaciones difíciles — dar malas noticias, pedir algo incómodo, abordar un conflicto — requieren una preparación emocional específica. Antes de una conversación difícil: regula tu estado emocional, clarifica tu intención (¿quiero ganar o quiero resolver?), anticipa la reacción del otro con empatía. Durante la conversación: mantén la calma aunque el otro se active, valida sus emociones aunque no estés de acuerdo, separa los hechos de las interpretaciones. Las conversaciones difíciles bien llevadas fortalecen las relaciones más que cualquier conversación fácil.',
      },
      {
        title: 'Comunicación digital con IE',
        content:
          'La comunicación digital ha eliminado gran parte de los canales no verbales que usamos para transmitir y leer emociones. Un mensaje de texto puede ser interpretado de formas muy diferentes según el estado emocional del receptor. Para comunicarte con IE en el entorno digital: elige el canal adecuado para el mensaje (un conflicto importante no se resuelve por WhatsApp), lee antes de enviar preguntándote cómo podría interpretarse, usa la ironía con cuidado, responde desde la calma y no desde la activación emocional, y cuando haya duda, opta por una llamada o reunión.',
      },
      {
        title: 'Lenguaje corporal y IE',
        content:
          'El lenguaje corporal es el canal emocional más honesto — es mucho más difícil de falsificar que las palabras. Aprender a leer el lenguaje corporal ajeno mejora tu empatía y tu capacidad de respuesta. Señales de apertura: contacto visual mantenido, cuerpo orientado hacia ti, expresión facial relajada. Señales de cierre: brazos cruzados, mirada esquiva, cuerpo girado. Tu propio lenguaje corporal también comunica: la postura expansiva genera confianza, la contraída genera inseguridad. Practica la congruencia: que tu cuerpo diga lo mismo que tus palabras.',
      },
      {
        title: 'Dar y recibir feedback con IE',
        content:
          'El feedback es un regalo cuando se da con intención de ayudar y se recibe con apertura para crecer. Para dar feedback con IE: sé específico (no "haces mal las presentaciones" sino "en la última presentación el ritmo era demasiado rápido para seguir los datos"), habla desde tu experiencia, ofrece alternativas concretas y cuida el momento y el contexto. Para recibir feedback con IE: respira, escucha hasta el final sin interrumpir, agradece la intención, procesa antes de responder y decide conscientemente qué integras.',
      },
      {
        title: 'Comunicación en grupos y equipos',
        content:
          'La comunicación en grupo añade capas de complejidad emocional. Las dinámicas de poder, los roles implícitos, las alianzas y los miedos colectivos influyen en lo que se dice, lo que se calla y cómo se interpreta. Para comunicarte con IE en grupos: observa la dinámica emocional del grupo antes de intervenir, calibra tu nivel de activación antes de hablar, incluye a quien está siendo excluido, valida perspectivas diversas y usa el humor con cuidado — puede unir o dividir.',
      },
      {
        title: 'Tu estilo comunicativo y cómo evolucionarlo',
        content:
          'Cada persona tiene un estilo comunicativo predominante, moldeado por su historia emocional, su cultura y sus experiencias. Conocer tu estilo — si tiendes a la agresividad, la pasividad o la asertividad; si eres más verbal o no verbal; si prefieres la comunicación directa o indirecta — es el primer paso para evolucionarlo. La meta no es cambiar quién eres, sino ampliar tu repertorio comunicativo para poder adaptarte a más situaciones y conectar con más personas desde la autenticidad.',
      },
    ],
  },
  liderazgo: {
    lessons: [
      {
        title: 'Qué es el liderazgo emocional',
        content:
          'El liderazgo emocional es la capacidad de influir positivamente en el estado emocional de un equipo para movilizarlo hacia un objetivo compartido. Goleman identificó que el estado emocional del líder es el factor individual más determinante del clima del equipo, y que el clima del equipo explica hasta el 30% de los resultados del negocio. Un líder emocionalmente inteligente no es necesariamente el más carismático o el más duro — es el que crea el contexto emocional en el que su equipo puede dar lo mejor de sí mismo.',
      },
      {
        title: 'Los 6 estilos de liderazgo de Goleman',
        content:
          'Goleman identificó 6 estilos de liderazgo, cada uno con un impacto diferente en el clima del equipo. El estilo Visionario inspira con una visión clara del futuro. El Coaching desarrolla las capacidades individuales. El Afiliativo prioriza las relaciones y la armonía. El Democrático involucra al equipo en las decisiones. El Ejemplar lidera desde el ejemplo y exige excelencia. El Autoritario da órdenes directas en situaciones de crisis. Los líderes con alta IE dominan varios estilos y los alternan según la situación — esto se llama liderazgo fluido.',
      },
      {
        title: 'Autoconciencia del líder',
        content:
          'Un líder que no se conoce a sí mismo no puede liderar a otros de forma efectiva. La autoconciencia del líder incluye conocer sus fortalezas y limitaciones, reconocer cómo su estado emocional afecta al equipo, identificar sus detonantes emocionales y saber cuándo necesita apoyo externo. Los líderes con alta autoconciencia piden feedback con genuina apertura, admiten sus errores sin excusas y comunican sus intenciones con claridad. La autoconciencia del líder genera confianza — el equipo sabe con quién trata.',
      },
      {
        title: 'Gestionar tu estado emocional como líder',
        content:
          'El líder es el regulador emocional del equipo. Si el líder está ansioso, el equipo se vuelve ansioso. Si el líder está calmado bajo presión, el equipo encuentra su centro. Esta responsabilidad requiere que el líder gestione su estado emocional de forma proactiva — no suprimiendo las emociones, sino procesándolas antes de que contaminen el espacio del equipo. Herramientas para el líder: supervisión externa, práctica de mindfulness, espacios de reflexión personal y red de confianza donde poder ser vulnerable.',
      },
      {
        title: 'Crear seguridad psicológica',
        content:
          'Amy Edmondson demostró que el factor más determinante del rendimiento de los equipos de alto nivel es la seguridad psicológica: la creencia de que puedes expresar ideas, cometer errores y hacer preguntas sin miedo al ridículo o al castigo. El líder crea seguridad psicológica cuando responde a los errores con curiosidad en lugar de castigo, cuando modela la vulnerabilidad siendo el primero en admitir que no sabe, cuando escucha activamente las ideas de todos y cuando confronta los comportamientos que amenazan el ambiente seguro.',
      },
      {
        title: 'Motivar desde la IE',
        content:
          'La motivación sostenible no se impone — se cultiva. Los líderes emocionalmente inteligentes crean las condiciones para que la motivación intrínseca florezca: propósito claro, autonomía real, oportunidades de maestría y reconocimiento genuino. El reconocimiento específico — "la forma en que gestionaste esa conversación difícil fue muy profesional" — es mucho más motivador que el genérico "buen trabajo". La motivación también requiere que el líder conecte las tareas individuales con el impacto mayor: por qué lo que hace cada persona importa.',
      },
      {
        title: 'Gestionar conflictos en el equipo',
        content:
          'Los conflictos en el equipo son inevitables y necesarios — sin tensión creativa no hay innovación. El problema no es el conflicto sino cómo se gestiona. El líder emocionalmente inteligente interviene en los conflictos con una postura de mediador curioso, no de juez. Escucha a todas las partes, valida las emociones involucradas, busca los intereses subyacentes más allá de las posiciones declaradas y facilita acuerdos que respeten la dignidad de todos. Los conflictos no resueltos corroen la confianza del equipo silenciosamente.',
      },
      {
        title: 'Liderazgo en momentos de cambio e incertidumbre',
        content:
          'Los momentos de cambio e incertidumbre son el mayor test del liderazgo emocional. Cuando no hay respuestas claras, el equipo busca en el líder señales emocionales de seguridad. Un líder que transmite pánico o incertidumbre no gestionada amplifica el miedo del equipo. Un líder que transmite calma y presencia — aunque tampoco tenga todas las respuestas — crea el espacio para que el equipo pueda funcionar. Claves para liderar en la incertidumbre: comunicar con frecuencia y honestidad, admitir lo que no se sabe, mantener el foco en lo controlable y celebrar los pequeños avances.',
      },
      {
        title: 'Desarrollar IE en tu equipo',
        content:
          'El líder emocionalmente inteligente no solo gestiona su propia IE — también crea las condiciones para que su equipo la desarrolle. Esto incluye dar feedback orientado al crecimiento emocional, modelar los comportamientos que quiere ver, crear espacios de reflexión sobre cómo el equipo trabaja junto, celebrar no solo los resultados sino también los aprendizajes, y reconocer el esfuerzo de desarrollo personal como un activo del equipo.',
      },
      {
        title: 'Tu legado como líder emocional',
        content:
          'El legado de un líder no se mide en cifras de negocio — se mide en las personas que crecieron bajo su influencia. Los mejores líderes dejan equipos más capaces, más seguros y más humanos que cuando llegaron. ¿Qué tipo de líder quieres ser? ¿Cómo quieres que recuerden tu presencia las personas que han trabajado contigo? Construir ese legado empieza hoy, en cada conversación, en cada decisión, en cada momento en que eliges responder en lugar de reaccionar. El liderazgo emocional es un compromiso diario con lo mejor de uno mismo.',
      },
    ],
  },
  relaciones: {
    lessons: [
      {
        title: 'Las relaciones como espejo emocional',
        content:
          'Nuestras relaciones personales son el espejo más honesto de nuestra inteligencia emocional. En ellas se manifiestan nuestros patrones de apego, nuestras heridas no resueltas, nuestras fortalezas y nuestras áreas de crecimiento. Las relaciones de alta calidad no son las que no tienen conflicto — son las que tienen la capacidad emocional de atravesar el conflicto y salir fortalecidas. La IE en las relaciones comienza por reconocer que cada reacción intensa hacia otra persona contiene información valiosa sobre uno mismo.',
      },
      {
        title: 'Apego y IE',
        content:
          'El estilo de apego que desarrollamos en la infancia — seguro, ansioso, evitativo o desorganizado — influye profundamente en cómo nos relacionamos de adultos. Las personas con apego seguro se sienten cómodas con la intimidad y la independencia. Las de apego ansioso buscan constante validación. Las de apego evitativo mantienen distancia emocional. Reconocer tu estilo de apego no es una condena — es una puerta. Con IE podemos desarrollar un apego más seguro independientemente de nuestra historia, construyendo relaciones más conscientes y satisfactorias.',
      },
      {
        title: 'Comunicar emocionalmente en pareja',
        content:
          'La comunicación emocional en la pareja es el área donde más personas sienten que fallan. Los cuatro jinetes del apocalipsis relacional de Gottman — la crítica, el desprecio, la actitud defensiva y el amurallamiento — predicen el deterioro de la relación con alta precisión. Los antídotos son: la queja específica en lugar de la crítica global, la admiración y el respeto, la responsabilidad en lugar de la defensa y la regulación fisiológica en lugar del amurallamiento. La IE en pareja significa aprender a pedir lo que necesitas y escuchar lo que el otro necesita, aunque duela.',
      },
      {
        title: 'Gestionar conflictos en las relaciones personales',
        content:
          'El conflicto en las relaciones personales activa los circuitos emocionales más primitivos. Cuando estamos muy activados, el córtex prefrontal — responsable del pensamiento racional — literalmente se desconecta. Por eso en los conflictos más intensos decimos y hacemos cosas de las que luego nos arrepentimos. La clave es aprender a reconocer cuándo estás demasiado activado para continuar una conversación y establecer una pausa consciente — no un escape, sino un descanso de 20 minutos para que el sistema nervioso se regule.',
      },
      {
        title: 'Empatía en las relaciones cercanas',
        content:
          'En las relaciones cercanas, la empatía puede erosionarse con el tiempo — la familiaridad puede hacer que dejemos de ver realmente al otro. Renovar la empatía en las relaciones de larga data requiere esfuerzo consciente: hacer preguntas genuinas en lugar de asumir que ya sabemos lo que el otro siente, interesarse por la evolución del otro como persona, sorprendernos ante sus cambios en lugar de resistirlos. La empatía activa en las relaciones cercanas es una elección deliberada de seguir viendo al otro con ojos frescos.',
      },
      {
        title: 'Límites saludables',
        content:
          'Los límites saludables son una expresión de autorespeto y de respeto hacia el otro. Un límite no es un muro — es una clarificación de lo que necesitas para que la relación sea sostenible. Muchas personas confunden los límites con el egoísmo. La realidad es que sin límites las relaciones generan resentimiento, agotamiento y dependencia. Para establecer límites con IE: identifica qué te agota o incomoda de forma consistente en la relación, comunícalo desde la necesidad propia en lugar del ataque al otro, y mantén el límite con amabilidad y firmeza.',
      },
      {
        title: 'IE en las relaciones familiares',
        content:
          'Las relaciones familiares son las más complejas emocionalmente porque tienen más historia, más carga y más expectativas que ninguna otra. La IE familiar comienza por reconocer los patrones emocionales que se repiten en tu familia de origen y preguntarte cuáles quieres perpetuar y cuáles quieres cambiar. Cambiar los patrones familiares requiere valentía — implica hacer las cosas de forma diferente a como siempre se han hecho, lo que puede generar resistencia. Pero es posible, y tiene un impacto transgeneracional enorme.',
      },
      {
        title: 'Amistad y IE',
        content:
          'Las amistades profundas son uno de los factores más determinantes del bienestar emocional. Las personas con alta IE tienden a tener relaciones de amistad más profundas — menos pero más significativas. Invierten en las relaciones de forma proactiva, no solo cuando tienen tiempo o cuando las necesitan. La amistad con IE implica presencia genuina, reciprocidad emocional, honestidad cuidadosa y capacidad de estar con el otro en los momentos difíciles sin intentar arreglarlo todo.',
      },
      {
        title: 'Relaciones tóxicas y IE',
        content:
          'Las relaciones tóxicas son aquellas que de forma consistente drenan tu energía, erosionan tu autoestima o violan tus límites. Reconocerlas requiere autoconciencia — a veces nos quedamos en relaciones tóxicas porque nos generan familiaridad emocional, aunque esa familiaridad sea dolor. La IE no significa aguantar todo — significa reconocer cuándo una relación está causando daño sistemático y tomar una decisión consciente sobre ella. Salir de una relación tóxica puede ser el acto más emocionalmente inteligente que puedas hacer.',
      },
      {
        title: 'Cultivar relaciones que nutren',
        content:
          'Las relaciones que nutren son aquellas en las que eres más tú mismo, donde puedes ser vulnerable sin miedo, donde te sientes visto y aceptado. Cultivarlas requiere inversión activa: tiempo, presencia, honestidad y cuidado. También requiere elegir con quien inviertes tu energía relacional. No todas las relaciones merecen el mismo nivel de inversión — aprender a priorizar las relaciones que te nutren es una expresión de IE relacional avanzada. El círculo pequeño y profundo supera siempre al grande y superficial.',
      },
    ],
  },
  mindfulness: {
    lessons: [
      {
        title: 'Mindfulness y IE — la conexión',
        content:
          'El mindfulness — la práctica de la atención plena al momento presente sin juicio — es una de las herramientas más poderosas para desarrollar la inteligencia emocional. Cuando practicamos mindfulness, entrenamos el músculo de la observación interna: la capacidad de notar lo que sentimos sin ser arrastrados por ello. Esta capacidad es el fundamento de la autoconciencia y la autorregulación. La investigación neurológica muestra que la práctica regular de mindfulness aumenta el grosor del córtex prefrontal — la región cerebral responsable de la regulación emocional.',
      },
      {
        title: 'La anatomía de una emoción',
        content:
          'Comprender cómo funciona una emoción a nivel fisiológico nos ayuda a regularla mejor. Toda emoción tiene un detonante, una respuesta fisiológica (cambios en el ritmo cardíaco, la respiración, la tensión muscular), un pensamiento asociado y un impulso de acción. El punto de intervención más efectivo es justo antes del impulso de acción — ese espacio entre sentir y actuar. El mindfulness nos entrena para ampliar ese espacio, dándonos más opciones de respuesta.',
      },
      {
        title: 'Respiración consciente como regulador emocional',
        content:
          'La respiración es el único proceso fisiológico que es simultáneamente automático y voluntario. Esta dualidad la convierte en la herramienta de regulación emocional más accesible y poderosa que tenemos. La respiración diafragmática lenta activa el sistema nervioso parasimpático, reduciendo la frecuencia cardíaca y el cortisol. Técnica 4-7-8: inhala 4 segundos, retén 7, exhala 8. Practica esta técnica antes de situaciones de alta presión emocional — reuniones difíciles, conversaciones importantes, momentos de conflicto.',
      },
      {
        title: 'Meditación para la IE',
        content:
          'La meditación es el entrenamiento más sistemático de la atención y la regulación emocional. No requiere creer en nada ni adoptar ninguna postura religiosa o espiritual — es simplemente el ejercicio de dirigir la atención de forma deliberada. La meditación de atención al momento presente (seguir la respiración) entrena la autoconciencia. La meditación de bondad amorosa (metta) entrena la empatía y la compasión. Empezar con 10 minutos diarios durante 8 semanas produce cambios mesurables en la estructura cerebral relacionada con la regulación emocional.',
      },
      {
        title: 'El cuerpo como mapa emocional',
        content:
          'Las emociones se procesan primero en el cuerpo antes de llegar a la consciencia. Aprender a leer las señales corporales es una forma de acceder a tus emociones antes de que se conviertan en comportamientos automáticos. ¿Dónde sientes la ansiedad? ¿Y la rabia? ¿Y la tristeza? Cada persona tiene su mapa corporal emocional único. El escaneo corporal — la práctica de recorrer con atención todo el cuerpo de forma sistemática — es una herramienta poderosa para desarrollar esta conciencia somática.',
      },
      {
        title: 'Mindfulness en movimiento',
        content:
          'El mindfulness no se practica solo en el cojín de meditación — se puede integrar en cualquier actividad cotidiana. Caminar conscientemente, comer con plena atención, ducharse sin piloto automático — todas estas son oportunidades de práctica. El movimiento consciente — yoga, tai chi, chi kung — combina la conciencia corporal con la regulación del sistema nervioso. Incluso el ejercicio físico intenso puede ser una práctica de mindfulness si lo haces con atención plena a las sensaciones del cuerpo en lugar de con la mente en otra parte.',
      },
      {
        title: 'Gestionar los pensamientos automáticos',
        content:
          'Los pensamientos automáticos negativos — también llamados distorsiones cognitivas — son patrones de pensamiento que amplifican el malestar emocional. El catastrofismo (esto va a ser horrible), la generalización (siempre me pasa lo mismo), el pensamiento todo-o-nada (o es perfecto o es un fracaso) son algunos ejemplos. El mindfulness nos ayuda a observar estos pensamientos sin creerlos automáticamente. La pregunta clave: ¿es esto un hecho o es una interpretación? ¿Qué evidencia tengo a favor y en contra de este pensamiento?',
      },
      {
        title: 'Regulación emocional avanzada',
        content:
          'Más allá de las técnicas básicas de regulación, existen estrategias avanzadas para trabajar con emociones muy intensas. La técnica RAIN: Reconocer la emoción, Aceptarla sin luchar, Investigar con curiosidad dónde se siente en el cuerpo y qué la alimenta, y No identificarse con ella — recordar que eres el observador de la emoción, no la emoción misma. Esta técnica es especialmente útil para emociones muy intensas como la rabia, el miedo intenso o la vergüenza.',
      },
      {
        title: 'Mindfulness en las relaciones',
        content:
          'El mindfulness interpersonal es la práctica de estar plenamente presentes con otra persona — sin el teléfono, sin la mente en otro lugar, sin preparar ya la respuesta mientras el otro habla. Esta presencia plena es la forma más profunda de respeto que podemos ofrecer a alguien. En las relaciones, el mindfulness nos ayuda a notar cuándo estamos reaccionando desde viejos patrones emocionales, a hacer una pausa antes de responder desde el automatismo y a ver al otro con ojos frescos en lugar de a través del filtro de nuestras expectativas y juicios previos.',
      },
      {
        title: 'Integrando el mindfulness en la vida diaria',
        content:
          'La práctica formal de mindfulness — meditar sentado cada día — es el entrenamiento. La vida cotidiana es el campo de aplicación. El objetivo final no es meditar bien — es vivir con más consciencia, más presencia y más elección. Para integrar el mindfulness en tu vida diaria: establece momentos ancla (al despertar, antes de comer, al terminar el trabajo) donde haces una pausa consciente de 1-2 minutos. Estas micro-prácticas acumuladas tienen un impacto enorme en tu nivel general de consciencia emocional y en la calidad de tu presencia en las relaciones y el trabajo.',
      },
    ],
  },
  resiliencia: {
    lessons: [
      {
        title: '¿Qué es la resiliencia emocional?',
        content:
          'La resiliencia emocional es la capacidad de adaptarse positivamente ante la adversidad, el trauma, la tragedia, las amenazas o las fuentes significativas de estrés. No es la ausencia de dificultad ni de malestar emocional — es la capacidad de atravesar la dificultad y salir de ella fortalecido o al menos sin quedar permanentemente dañado. La resiliencia no es un rasgo fijo que tienes o no tienes — es un conjunto de habilidades que se desarrollan con práctica, apoyo y reflexión consciente.',
      },
      {
        title: 'Los pilares de la resiliencia',
        content:
          'La investigación identifica varios pilares comunes en las personas resilientes. La red de apoyo social: tener personas con quienes compartir la carga. La narrativa de sentido: poder encontrar significado en la adversidad. La autoeficacia: la creencia de que puedes influir en lo que te ocurre. La regulación emocional: la capacidad de gestionar estados emocionales intensos. La flexibilidad cognitiva: la capacidad de ver la situación desde múltiples perspectivas. Y la orientación al futuro: mantener la esperanza y la visión más allá del momento difícil.',
      },
      {
        title: 'El estrés — enemigo o aliado',
        content:
          'No todo el estrés es negativo. El estrés eustress — el estrés positivo asociado a los retos que nos motivan — mejora el rendimiento y el aprendizaje. El problema es el estrés crónico — la activación prolongada del sistema de respuesta al estrés sin período de recuperación. La clave no es eliminar el estrés sino aprender a relacionarse con él de forma más inteligente: reconocer cuándo estás en modo amenaza y cuándo en modo reto, y cultivar las condiciones para que el estrés sea más frecuentemente un aliado que un enemigo.',
      },
      {
        title: 'El sistema nervioso y la regulación',
        content:
          'El sistema nervioso autónomo tiene dos ramas: el simpático (acelerador — respuesta de lucha/huida) y el parasimpático (freno — descanso y digestión). La resiliencia emocional requiere flexibilidad en este sistema: poder activarse rápidamente ante una amenaza y desactivarse igual de rápidamente cuando la amenaza pasa. Las personas con alto estrés crónico tienen el simpático hiperactivo y el parasimpático infradesarrollado. Las prácticas que activan el parasimpático — respiración lenta, movimiento suave, conexión social segura — son el entrenamiento directo de la resiliencia fisiológica.',
      },
      {
        title: 'Crecimiento post-traumático',
        content:
          'El crecimiento post-traumático es el fenómeno por el cual algunas personas, después de atravesar experiencias muy difíciles, emergen con un sentido de vida más profundo, relaciones más significativas, mayor apreciación de lo cotidiano y una fortaleza interior que no tenían antes. No ocurre automáticamente — requiere procesamiento emocional, apoyo, tiempo y una narrativa que permita integrar la experiencia. El crecimiento post-traumático no significa que el dolor no fue real — significa que el ser humano tiene una capacidad extraordinaria de encontrar sentido incluso en las experiencias más duras.',
      },
      {
        title: 'Estrategias de gestión del estrés',
        content:
          'Las estrategias más efectivas de gestión del estrés actúan en tres niveles. A nivel fisiológico: ejercicio regular, sueño de calidad, respiración consciente y reducción de estimulantes. A nivel cognitivo: identificar y cuestionar los pensamientos catastróficos, mantener perspectiva temporal y distinguir entre lo controlable y lo no controlable. A nivel relacional: compartir la carga con personas de confianza, pedir ayuda cuando se necesita y crear límites claros con las fuentes de estrés externo.',
      },
      {
        title: 'Resiliencia en el trabajo',
        content:
          'El entorno laboral es una de las principales fuentes de estrés crónico en la vida moderna. La resiliencia laboral incluye: conocer tus señales de agotamiento antes de llegar al burnout, crear rituales de desconexión efectivos, mantener perspectiva sobre lo que realmente importa, construir relaciones de apoyo con compañeros y buscar sentido en tu trabajo más allá de las tareas cotidianas. El burnout no llega de repente — hay señales previas que la IE nos ayuda a detectar a tiempo.',
      },
      {
        title: 'Resiliencia en las relaciones',
        content:
          'Las relaciones pueden ser tanto una fuente de estrés como el principal recurso de resiliencia. Las relaciones de alta confianza — donde puedes ser vulnerable sin miedo — son el amortiguador emocional más poderoso ante la adversidad. Construir esas relaciones antes de necesitarlas es una inversión de resiliencia. Cuando atraviesas momentos difíciles, las relaciones de calidad te dan perspectiva, te recuerdan que no estás solo y te ayudan a procesar emocionalmente lo que estás viviendo.',
      },
      {
        title: 'La narrativa de la resiliencia',
        content:
          'La forma en que nos contamos las experiencias difíciles determina en gran medida cómo nos afectan. Una narrativa de víctima — esto me ha pasado porque soy así, siempre me ocurre lo mismo, no puedo hacer nada — genera impotencia y estancamiento. Una narrativa de resiliencia — esto ha sido muy duro, he aprendido algo de ello, voy a seguir adelante — genera agencia y crecimiento. Cambiar la narrativa no es negar el dolor — es elegir el marco desde el que interpretamos la experiencia.',
      },
      {
        title: 'Tu plan de resiliencia personal',
        content:
          'La resiliencia se cultiva de forma proactiva — no solo en los momentos de crisis sino en el día a día. Tu plan de resiliencia personal incluye: identificar tus principales recursos de resiliencia (personas, prácticas, creencias), reconocer tus señales de agotamiento temprano, establecer rituales diarios de recuperación, construir y mantener tu red de apoyo y practicar regularmente la perspectiva — recordarte qué es lo que realmente importa cuando estás perdido en los detalles del estrés cotidiano.',
      },
    ],
  },
  crecimiento: {
    lessons: [
      {
        title: 'IE y autoconocimiento profundo',
        content:
          'El crecimiento personal auténtico comienza por el autoconocimiento — y la inteligencia emocional es el mapa más preciso para ese viaje interior. Conocerte emocionalmente significa saber qué te mueve, qué te frena, qué te duele, qué te da vida. Significa reconocer tus patrones automáticos — los que te sirven y los que te limitan. El autoconocimiento emocional no es narcisismo — es la base desde la que puedes relacionarte con más autenticidad, tomar decisiones más alineadas y contribuir de forma más genuina al mundo.',
      },
      {
        title: 'Valores y emociones',
        content:
          'Nuestros valores son la brújula que guía nuestras elecciones emocionales. Cuando actuamos en coherencia con nuestros valores, experimentamos una sensación de integridad y satisfacción. Cuando los traicionamos — por miedo, por presión externa o por automatismo — sentimos culpa, vergüenza o vacío. Clarificar tus valores no es un ejercicio intelectual — es un proceso emocional. Pregúntate: ¿qué te genera más satisfacción profunda? ¿Qué te genera más resentimiento cuando lo haces? Las respuestas emocionales son la puerta a tus valores reales.',
      },
      {
        title: 'Creencias limitantes y IE',
        content:
          'Las creencias limitantes son narrativas sobre nosotros mismos y el mundo que restringen nuestras posibilidades. "No soy suficientemente inteligente", "no merezco el éxito", "si soy vulnerable me harán daño" — estas creencias operan de forma automática, generando emociones y comportamientos que confirman la creencia. La IE nos ayuda a identificar estas creencias detectando las emociones que las sostienen y cuestionando su validez con evidencia real. El cambio de una creencia limitante requiere tiempo, repetición y a menudo apoyo profesional.',
      },
      {
        title: 'El papel del miedo en el crecimiento',
        content:
          'El miedo es la emoción que más limita el crecimiento personal. El miedo al fracaso, al juicio, al rechazo, a la intimidad, al éxito — todos tienen en común que nos mantienen dentro de nuestra zona de confort. La IE no elimina el miedo — nos enseña a relacionarnos con él de forma diferente. En lugar de evitar el miedo, podemos aprender a reconocerlo como una señal de que algo importante está en juego, regularlo lo suficiente para poder actuar y usarlo como información sobre lo que más nos importa.',
      },
      {
        title: 'Autocompasión y crecimiento',
        content:
          'La autocompasión — tratarse a uno mismo con la misma amabilidad que trataríamos a un buen amigo en dificultades — es uno de los factores más determinantes del crecimiento personal sostenible. La autocrítica excesiva no nos hace mejorar — nos paraliza. La autocompasión no es autocomplacencia — es el reconocimiento honesto de que somos humanos, que cometemos errores y que merecemos apoyo incluso de nosotros mismos. Las personas con alta autocompasión paradójicamente asumen más responsabilidad por sus errores — porque no necesitan defenderse de ellos.',
      },
      {
        title: 'Propósito y IE',
        content:
          'El propósito — tener una razón de ser más grande que uno mismo — es uno de los factores más potentes del bienestar emocional y la motivación sostenible. Viktor Frankl, desde su experiencia en los campos de concentración, demostró que las personas pueden atravesar cualquier cómo si tienen un por qué suficientemente poderoso. La IE nos ayuda a conectar con nuestro propósito escuchando nuestras emociones: ¿qué nos genera satisfacción profunda? ¿Qué nos indigna? ¿A qué daríamos tiempo aunque no nos pagaran? Las respuestas emocionales señalan hacia el propósito.',
      },
      {
        title: 'Hábitos emocionales',
        content:
          'La mayor parte de nuestro comportamiento emocional es habitual — ocurre de forma automática, sin deliberación consciente. Cambiar los hábitos emocionales requiere el mismo proceso que cambiar cualquier hábito: identificar el detonante, la rutina automática y la recompensa que mantiene el hábito. Los hábitos emocionales negativos — reaccionar con rabia ante la frustración, huir de las conversaciones difíciles, buscar validación externa constantemente — pueden cambiarse con práctica deliberada y consciencia sostenida.',
      },
      {
        title: 'IE y toma de decisiones vitales',
        content:
          'Las grandes decisiones de la vida — de carrera, de relación, de valores — no se toman solo con la cabeza. Las emociones son información esencial en estos procesos. La IE aplicada a las decisiones vitales significa aprender a escuchar tanto al sistema racional como al emocional, sin dejarse secuestrar por ninguno de los dos. Una herramienta útil: después de tomar una decisión importante de forma racional, observa cómo te sientes con esa decisión durante varios días. Tu cuerpo y tus emociones te darán información adicional que la mente sola no puede procesar.',
      },
      {
        title: 'Relación con el cambio y la incertidumbre',
        content:
          'La incertidumbre es la condición natural de la vida — y una de las principales fuentes de malestar emocional para quienes la toleran mal. La IE nos ayuda a desarrollar una relación más saludable con la incertidumbre: reconociendo la emoción de ansiedad que genera, cuestionando los escenarios catastrofistas que construye la mente, focalizando la atención en lo que sí podemos controlar y desarrollando la tolerancia a no saber como una habilidad en sí misma.',
      },
      {
        title: 'El viaje continuo del crecimiento emocional',
        content:
          'El crecimiento emocional no tiene un punto de llegada — es un viaje de toda la vida. Cada experiencia difícil es una oportunidad de aprendizaje. Cada relación es un espejo. Cada emoción intensa es información. La IE no promete una vida sin dolor — promete una vida vivida con más consciencia, más autenticidad y más conexión. El compromiso con el crecimiento emocional es el compromiso más importante que puedes adquirir contigo mismo — porque determina la calidad de todo lo demás: tus relaciones, tu trabajo, tu bienestar y tu contribución al mundo.',
      },
    ],
  },
  empatia: {
    lessons: [
      {
        title: 'La neurociencia de la empatía',
        content:
          'Las neuronas espejo son células cerebrales que se activan tanto cuando realizamos una acción como cuando observamos a otro realizarla. Son la base neurológica de la empatía — literalmente nos permiten simular internamente la experiencia ajena. Esta capacidad de resonancia emocional es universal en los seres humanos, aunque varía en intensidad. La buena noticia es que la empatía, como músculo, se puede entrenar. Las prácticas de perspectiva-taking — ponerse conscientemente en el lugar del otro — activan y fortalecen estos circuitos neurales.',
      },
      {
        title: 'Tipos de empatía',
        content:
          'La empatía tiene múltiples dimensiones que es importante distinguir. La empatía cognitiva es la capacidad de entender intelectualmente la perspectiva del otro. La empatía afectiva es la resonancia emocional — sentir lo que el otro siente. La empatía compasiva va un paso más allá: sentir con el otro y querer ayudar. La empatía excesiva — absorber el malestar ajeno hasta el punto de perder el propio centro — puede llevar al agotamiento empático. El equilibrio saludable es la empatía compasiva: presencia plena sin fusión.',
      },
      {
        title: 'Escucha empática',
        content:
          'La escucha empática es escuchar para comprender la experiencia emocional del otro, no solo el contenido de sus palabras. Requiere presencia plena, suspensión del juicio, tolerancia al silencio y reflejar lo escuchado de forma que el otro se sienta verdaderamente comprendido. La diferencia entre la escucha normal y la escucha empática es que en la segunda el otro termina sintiéndose más claro sobre su propia experiencia — porque la presencia empática ayuda a procesar. Frase clave de la escucha empática: "Lo que escucho es que te sientes... ¿es así?".',
      },
      {
        title: 'Validación emocional',
        content:
          'La validación emocional es el reconocimiento de que las emociones del otro son comprensibles y legítimas dado su contexto y su historia, aunque no las compartamos o no estemos de acuerdo con el comportamiento que generan. La validación no es acuerdo — es reconocimiento. "Entiendo que estés frustrado" no significa "tienes razón en hacer lo que haces". La invalidación emocional — "no deberías sentirte así", "exageras", "no es para tanto" — es una de las experiencias relacionales más dañinas y una de las más comunes.',
      },
      {
        title: 'Desarrollar la red social con IE',
        content:
          'Las relaciones sociales de calidad son uno de los predictores más robustos del bienestar y la longevidad. Desarrollar una red social con IE significa invertir proactivamente en las relaciones, no solo reactivamente cuando las necesitas. Implica mostrar interés genuino por las personas, recordar detalles importantes de sus vidas, estar presente en los momentos difíciles y celebrar sus logros. También significa gestionar la red con criterio — reconocer qué relaciones te nutren y cuáles te drenan, y distribuir tu energía relacional de forma consciente.',
      },
      {
        title: 'Influencia positiva',
        content:
          'La influencia positiva es la capacidad de movilizar a otros hacia objetivos compartidos sin coerción ni manipulación. Se basa en la credibilidad emocional — la confianza que generas cuando eres auténtico, coherente y centrado en el bien del otro. Las personas con alta influencia positiva escuchan antes de hablar, entienden los valores e intereses del otro antes de proponer, conectan sus ideas con lo que el otro ya valora y crean contextos donde todos sienten que ganan. La influencia positiva es poder al servicio de todos, no solo de uno mismo.',
      },
      {
        title: 'Gestión de grupos y dinámicas colectivas',
        content:
          'Los grupos tienen una vida emocional propia que va más allá de la suma de sus individuos. Las dinámicas de poder, los roles implícitos, las alianzas y los miedos colectivos crean un campo emocional que influye en el comportamiento de todos. Leer las dinámicas de grupo con IE implica observar quién habla y quién se calla, qué temas generan tensión y cuáles alivio, dónde están las alianzas y los conflictos no declarados y cuál es el clima emocional predominante. Esta lectura grupal permite intervenir de forma más efectiva y consciente.',
      },
      {
        title: 'Negociación con IE',
        content:
          'La negociación emocionalmente inteligente parte de entender que todas las partes tienen intereses legítimos que van más allá de sus posiciones declaradas. El modelo de negociación basado en intereses — desarrollado en Harvard — es esencialmente un modelo de IE aplicada: escuchar profundamente, separar personas de problemas, generar opciones creativas y buscar criterios objetivos compartidos. La IE en la negociación también significa gestionar el propio estado emocional durante el proceso — no negociar desde el miedo, la rabia o la prisa.',
      },
      {
        title: 'IE intercultural',
        content:
          'La empatía y las habilidades sociales se expresan de forma diferente según las culturas. Lo que es una muestra de respeto en una cultura puede ser una ofensa en otra. Lo que es directness honesta en una cultura puede ser agresividad en otra. Desarrollar IE intercultural significa ampliar la conciencia de los propios supuestos culturales, cultivar curiosidad genuina ante la diferencia, suspender el juicio ante comportamientos que no entendemos y buscar el intent detrás del impacto antes de asumir mala voluntad.',
      },
      {
        title: 'Construir comunidad con IE',
        content:
          'La IE no termina en las relaciones individuales — se extiende a la capacidad de contribuir a comunidades más amplias. Construir comunidad con IE significa crear espacios donde las personas se sienten vistas, incluidas y valoradas. Significa liderar desde el servicio, facilitar la participación de los más callados, gestionar los conflictos antes de que se enquisten y celebrar lo que une más que lo que divide. La IE comunitaria es una de las formas más poderosas de impacto positivo que podemos tener más allá de nuestro círculo inmediato.',
      },
    ],
  },
  avanzada: {
    lessons: [
      {
        title: 'Integración de las 5 dimensiones',
        content:
          'En este curso avanzado exploraremos cómo las 5 dimensiones de la IE no operan de forma aislada sino como un sistema integrado. La autoconciencia alimenta la autorregulación. La autorregulación permite una motivación más sostenible. La motivación profunda activa la empatía genuina. La empatía potencia las habilidades sociales. Y las habilidades sociales bien ejercidas generan más autoconciencia a través del feedback de las relaciones. Comprender estas interdependencias nos permite trabajar la IE de forma más sistémica y efectiva.',
      },
      {
        title: 'IE bajo presión extrema',
        content:
          'El verdadero test de la inteligencia emocional es cómo nos comportamos bajo presión extrema — cuando estamos en modo supervivencia, cuando las apuestas son altas, cuando estamos agotados. En esos momentos, los circuitos emocionales primitivos tienden a dominar. La IE avanzada implica desarrollar la capacidad de mantener acceso al córtex prefrontal incluso en condiciones de alta activación. Esto requiere práctica sistemática en condiciones de estrés moderado — como un atleta que entrena en condiciones difíciles para poder rendir en la competición.',
      },
      {
        title: 'La sombra emocional',
        content:
          'La sombra emocional — concepto de Jung — son las partes de nosotros mismos que rechazamos, suprimimos o no reconocemos. Suelen ser emociones o rasgos que juzgamos negativos: la rabia, la envidia, el miedo, la necesidad de atención. Lo que suprimimos no desaparece — opera desde las sombras, manifestándose en proyecciones, comportamientos reactivos y patrones relacionales repetitivos. La IE avanzada implica el trabajo de sombra: reconocer y integrar estas partes rechazadas de forma que dejen de controlarnos inconscientemente.',
      },
      {
        title: 'IE y liderazgo sistémico',
        content:
          'El liderazgo sistémico aplica la IE a la comprensión de sistemas complejos — organizaciones, familias, comunidades. Ve más allá del individuo para comprender cómo las dinámicas emocionales colectivas moldean los comportamientos de todos. El líder sistémico emocionalmente inteligente reconoce los patrones que se repiten en el sistema, comprende su propia función en esos patrones, interviene en los puntos de mayor palanca y trabaja con la resistencia al cambio como información valiosa en lugar de como obstáculo a eliminar.',
      },
      {
        title: 'IE y creatividad',
        content:
          'La creatividad y la inteligencia emocional están profundamente interconectadas. Las emociones son una fuente esencial de información creativa — nos señalan qué nos importa, qué nos sorprende, qué nos incomoda suficientemente como para querer cambiarlo. La IE nos permite acceder a ese material emocional de forma consciente y canalizarlo de forma creativa. También nos ayuda a gestionar el miedo al juicio que inhibe la expresión creativa y a mantener la motivación intrínseca que sostiene los proyectos creativos a largo plazo.',
      },
      {
        title: 'IE y bienestar integral',
        content:
          'La inteligencia emocional es uno de los predictores más robustos del bienestar subjetivo — la sensación de vivir una vida satisfactoria y significativa. Las personas con alta IE tienden a tener relaciones más satisfactorias, carreras más alineadas con sus valores, mejor salud física (el estrés crónico no gestionado tiene consecuencias físicas documentadas) y mayor capacidad de encontrar sentido incluso en las experiencias difíciles. La IE no es el único factor del bienestar, pero es uno de los más modificables — y por eso invertir en ella es una de las decisiones más inteligentes que puedes tomar.',
      },
      {
        title: 'IE transgeneracional',
        content:
          'Los patrones emocionales se transmiten de generación en generación — a través de la crianza, el modelado y epigenéticamente. Reconocer los patrones emocionales de tu familia de origen y decidir conscientemente cuáles quieres perpetuar y cuáles quieres transformar es uno de los actos más importantes de IE transgeneracional. Cuando trabajas tu propia IE, no solo te beneficias tú — impactas en las personas de tu entorno y potencialmente en las generaciones que vienen. La IE es un legado emocional.',
      },
      {
        title: 'IE y espiritualidad',
        content:
          'Independientemente de las creencias religiosas o espirituales, la IE y la espiritualidad comparten un territorio común: la búsqueda de sentido, la práctica de la presencia, el cultivo de la compasión y la conexión con algo más grande que el ego individual. Las tradiciones contemplativas — desde el budismo hasta el estoicismo — han desarrollado durante siglos prácticas de regulación emocional, autoconciencia y empatía que la psicología moderna está redescubriendo y validando. La IE avanzada integra estos aprendizajes milenarios con el conocimiento científico contemporáneo.',
      },
      {
        title: 'El futuro de la IE',
        content:
          'En un mundo donde la automatización está transformando el trabajo, las habilidades que definen la IE — empatía, creatividad, juicio moral, conexión humana — son las que resultan más difícilmente automatizables y por tanto más valiosas. El World Economic Forum identifica la IE y las habilidades sociales como las competencias más demandadas del futuro laboral. Invertir en el desarrollo de la IE no es solo una inversión en bienestar personal — es una inversión en relevancia y contribución en un mundo que cambia aceleradamente.',
      },
      {
        title: 'Tu compromiso con la IE',
        content:
          'Este es el final del curso avanzado de IE — y el comienzo de tu práctica más comprometida. La IE no se "aprende" de una vez y se posee para siempre. Es una práctica continua que requiere renovación constante. Tu compromiso con la IE es un compromiso con la versión más consciente, más auténtica y más conectada de ti mismo. Es un compromiso con la calidad de tus relaciones, la profundidad de tu trabajo y la honestidad de tu camino. Gracias por este viaje. Ahora ve y practica.',
      },
    ],
  },
};

export function getCourseContent(id: string): CourseContent | undefined {
  return COURSE_CONTENT[id];
}
