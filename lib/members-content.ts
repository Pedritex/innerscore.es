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
