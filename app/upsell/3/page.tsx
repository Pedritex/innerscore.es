import UpsellLayout from '../_components/UpsellLayout';
import Mockup from '../_components/Mockup';

export default function Upsell3Page() {
  return (
    <UpsellLayout
      slot={3}
      productTitle="Guía de autoestima emocional: ¡Crea un yo más fuerte!"
      shortDescription="Refuerza tu autoestima desde la inteligencia emocional. Estrategias, afirmaciones y prácticas para construir una versión de ti más sólida y serena."
      whyImportantHeading="Por qué es importante la autoestima emocional"
      whyImportantParagraph="La autoestima es el cimiento sobre el que se construye toda tu vida emocional. Sin una base sólida de autoconfianza y autoaceptación, incluso las personas con alta inteligencia emocional pueden verse limitadas por el miedo al juicio, la autocrítica destructiva o la dificultad para establecer límites saludables. Desarrollar una autoestima emocional genuina no significa pensar que eres perfecto — significa reconocer tu valor intrínseco y actuar desde ese lugar con confianza y autenticidad."
      benefits={[
        {
          title: 'Salud mental positiva',
          description:
            'Una autoestima emocional sólida actúa como escudo protector frente al estrés, la ansiedad y los pensamientos negativos. Desarrollarás una actitud más resiliente y optimista ante los desafíos de la vida, sin necesitar la validación externa para sentirte bien contigo mismo.',
        },
        {
          title: 'Estabilidad emocional profunda',
          description:
            'Las personas con una autoestima emocional saludable experimentan emociones más estables y tienen una mayor capacidad para regular sus respuestas ante situaciones difíciles. Dejarás de reaccionar desde el miedo o la inseguridad y empezarás a actuar desde la confianza.',
        },
        {
          title: 'Relaciones más auténticas y significativas',
          description:
            'Cuando te valoras a ti mismo, atraes y construyes relaciones basadas en el respeto mutuo y la autenticidad. Aprenderás a establecer límites saludables, a comunicarte de forma asertiva y a conectar con los demás desde un lugar de seguridad interior.',
        },
      ]}
      whatIsIncludedHeading="¿Qué incluye la Guía de autoestima emocional?"
      modules={[
        {
          icon: '📝',
          title: 'Cuaderno de ejercicios avanzados de autoestima',
          description:
            'Un cuaderno profundo y estructurado con ejercicios de autorreflexión diseñados para evaluar tu nivel actual de autoestima, identificar las creencias limitantes que te frenan y desarrollar un plan personalizado de mejora basado en tu perfil emocional único.',
        },
        {
          icon: '💪',
          title: 'Estrategias para superar la baja autoestima',
          description:
            'Técnicas prácticas y avaladas por la psicología cognitiva para hacer frente a los pensamientos negativos automáticos, desarrollar la autocompasión y fortalecer tu resiliencia emocional. Esta sección te ofrece pasos concretos para transformar tu diálogo interno y construir una imagen más positiva y realista de ti mismo.',
        },
        {
          icon: '🗣️',
          title: 'Kit de comunicación asertiva y límites saludables',
          description:
            'Aprende el arte de la comunicación asertiva: cómo expresar tus necesidades con claridad, defender tus derechos sin agresividad y establecer límites que protejan tu bienestar emocional sin dañar tus relaciones. Un kit completo con guiones, ejercicios y situaciones prácticas.',
        },
        {
          icon: '✨',
          title: 'Guías de afirmaciones emocionales diarias',
          description:
            'Un sistema completo de afirmaciones positivas diseñadas específicamente para reforzar la autoestima emocional e infundir confianza duradera. Aprenderás cómo y cuándo utilizarlas para maximizar su efectividad y cambiar gradualmente los patrones mentales que te limitan.',
        },
        {
          icon: '🧘',
          title: 'Prácticas de mindfulness y autocuidado emocional',
          description:
            'Técnicas de atención plena adaptadas al desarrollo de la autoestima emocional. Incluye meditaciones guiadas, ejercicios de presencia y estrategias de autocuidado para fomentar la autoaceptación, reducir la autocrítica y priorizar tu bienestar emocional como una práctica diaria.',
        },
      ]}
      testimonials={[
        {
          name: 'Marco T.',
          profession: 'Diseñador gráfico',
          quote:
            'Nunca pensé que trabajar mi autoestima emocional pudiera tener un impacto tan grande en mi vida profesional. He ganado en confianza, me comunico mejor con mis clientes y he dejado de sabotearme cuando las cosas van bien.',
        },
        {
          name: 'Laura K.',
          profession: 'Profesora de secundaria',
          quote:
            'Los ejercicios de autocompasión y la sección de límites saludables han cambiado completamente cómo me relaciono con mis alumnos y compañeros. Por fin sé decir no sin sentirme culpable. Mi autoestima está por las nubes.',
        },
        {
          name: 'Jaime L.',
          profession: 'Recién graduado',
          quote:
            'Las afirmaciones emocionales diarias y las prácticas de mindfulness han transformado la imagen que tenía de mí mismo. Empecé con mucho escepticismo y ahora lo recomiendo a todo el mundo. Es un antes y un después.',
        },
      ]}
      mockup={
        <Mockup
          illustration="/illustrations/overly-proud.svg"
          title="Autoestima emocional"
          subtitle="Crea un yo más fuerte"
          accent="#dc2626"
        />
      }
    />
  );
}
