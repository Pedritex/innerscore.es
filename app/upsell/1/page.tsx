import UpsellLayout from '../_components/UpsellLayout';
import Mockup from '../_components/Mockup';

export default function Upsell1Page() {
  return (
    <UpsellLayout
      slot={1}
      productTitle="Guía de crecimiento emocional: ¡Encuentra tu mejor versión!"
      shortDescription="Un cuaderno guiado para profundizar en tu inteligencia emocional con ejercicios, herramientas y un sistema para construir hábitos que duren."
      whyImportantHeading="Por qué es importante el crecimiento emocional"
      whyImportantParagraph="Invertir en tu inteligencia emocional es mucho más que aprender a gestionar tus sentimientos. Es un proceso profundo de autoconocimiento que transforma la forma en que te relacionas contigo mismo y con los demás. Cuando desarrollas tu crecimiento emocional, desbloqueas un potencial que influye en todas las áreas de tu vida: desde cómo tomas decisiones bajo presión hasta cómo construyes relaciones significativas y duraderas."
      benefits={[
        {
          title: 'Mayor autoconciencia emocional',
          description:
            'Aprende a identificar con precisión qué emociones experimentas en cada momento y por qué. Esta claridad te permite actuar desde la consciencia en lugar de reaccionar impulsivamente ante las situaciones.',
        },
        {
          title: 'Mejores relaciones personales y profesionales',
          description:
            'Desarrolla una comunicación más empática y auténtica. Comprende las emociones de los demás con mayor profundidad y construye vínculos basados en la confianza y el respeto mutuo.',
        },
        {
          title: 'Resiliencia ante el estrés y los retos',
          description:
            'Cultiva una mentalidad que te permita afrontar los contratiempos con entereza. Aprende técnicas para recuperarte más rápido de las adversidades y mantener el equilibrio emocional en momentos difíciles.',
        },
        {
          title: 'Sensación de plenitud y propósito',
          description:
            'Alinea tus acciones con tus valores más profundos. Cuando vives desde la autenticidad emocional, experimentas una mayor satisfacción con tu vida y un sentido claro de hacia dónde vas.',
        },
      ]}
      whatIsIncludedHeading="¿Qué incluye la Guía de crecimiento emocional?"
      modules={[
        {
          icon: '📓',
          title: 'Cuaderno de ejercicios avanzados de IE',
          description:
            'Un completo cuaderno con ejercicios de autorreflexión diseñados específicamente para explorar y expandir tu inteligencia emocional. Cada ejercicio te guía paso a paso para identificar patrones emocionales, comprender tus reacciones y desarrollar un plan personalizado de crecimiento basado en tus respuestas del test.',
        },
        {
          icon: '🧘',
          title: 'Herramientas de regulación emocional',
          description:
            'Aprende técnicas avaladas por la psicología para gestionar tus emociones en tiempo real. Incluye estrategias de regulación cognitiva, técnicas de distanciamiento emocional, ejercicios de respiración consciente y métodos para transformar emociones difíciles en impulsos de crecimiento.',
        },
        {
          icon: '🎯',
          title: 'Guía de objetivos emocionales',
          description:
            'Un sistema estructurado para definir metas de desarrollo emocional claras y alcanzables. Aprenderás a aplicar la metodología SMART adaptada a la inteligencia emocional, con plantillas para planificar tu evolución en cada una de las 5 dimensiones de Goleman.',
        },
        {
          icon: '🔄',
          title: 'Estrategias para crear hábitos emocionales saludables',
          description:
            'Descubre cómo incorporar pequeños cambios diarios que transformen tu forma de relacionarte con tus emociones de manera sostenible. Incluye un sistema de seguimiento semanal para medir tu progreso y mantener la motivación a lo largo del tiempo.',
        },
        {
          icon: '📔',
          title: 'Diario de seguimiento emocional',
          description:
            'Un diario estructurado para documentar tus reflexiones, avances y aprendizajes durante el proceso de crecimiento. Te ayudará a responsabilizarte de tus compromisos, celebrar cada logro y ajustar tu camino cuando sea necesario para seguir evolucionando.',
        },
      ]}
      testimonials={[
        {
          name: 'Marta G.',
          profession: 'Psicóloga clínica',
          quote:
            'Este cuaderno ha transformado completamente mi manera de entender mis propias emociones. Los ejercicios son profundos y muy bien estructurados. Lo recomiendo a cualquier persona que quiera crecer de verdad.',
        },
        {
          name: 'Alejandro R.',
          profession: 'Director de equipos',
          quote:
            'Llevaba años intentando mejorar mi gestión emocional sin resultados. Esta guía me dio las herramientas concretas que necesitaba. En pocas semanas noté cambios reales en cómo reacciono bajo presión.',
        },
        {
          name: 'Carmen L.',
          profession: 'Profesora',
          quote:
            'Las estrategias para crear hábitos emocionales han sido un antes y un después en mi vida. Por fin tengo un sistema que funciona y que puedo mantener en el tiempo sin esfuerzo.',
        },
      ]}
      mockup={
        <Mockup
          emoji="🌱"
          title="Crecimiento emocional"
          subtitle="Encuentra tu mejor versión"
          gradient={['#1d4ed8', '#22c55e']}
        />
      }
    />
  );
}
