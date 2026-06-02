import UpsellLayout from '../_components/UpsellLayout';
import Mockup from '../_components/Mockup';

export default function Upsell2Page() {
  return (
    <UpsellLayout
      slot={2}
      productTitle="Orientación y crecimiento profesional con IE"
      shortDescription="Aplica la inteligencia emocional a tu carrera con un plan claro: descubre tus fortalezas, define objetivos SMART y prosperas en entornos exigentes."
      whyImportantHeading="Por qué es importante el crecimiento profesional con IE"
      whyImportantParagraph="La inteligencia emocional es hoy en día el factor diferenciador más importante en el mundo profesional. Las empresas más innovadoras del mundo buscan activamente personas que no solo dominen sus habilidades técnicas, sino que también sepan gestionarse a sí mismas y a los demás con madurez emocional. Desarrollar tu IE aplicada al trabajo no es un lujo — es una necesidad estratégica para avanzar en tu carrera con claridad, confianza y propósito."
      benefits={[
        {
          title: 'Identifica tus fortalezas emocionales en el trabajo',
          description:
            'Descubre qué dimensiones de tu inteligencia emocional son tus mayores activos profesionales y aprende a potenciarlas conscientemente en tu entorno laboral para destacar de forma auténtica.',
        },
        {
          title: 'Alinea tu IE con tu carrera profesional',
          description:
            'Comprende cómo tu perfil emocional influye en el tipo de trabajo en el que puedes brillar. Encuentra la intersección entre quién eres emocionalmente y lo que el mercado laboral valora.',
        },
        {
          title: 'Define objetivos profesionales con SMART e IE',
          description:
            'Aprende a establecer metas profesionales que no solo sean inteligentes y medibles, sino también emocionalmente sostenibles. Objetivos que te motiven de verdad y que puedas mantener a largo plazo.',
        },
        {
          title: 'Adáptate a entornos laborales exigentes',
          description:
            'Desarrolla la resiliencia emocional necesaria para prosperar en entornos de alta presión, gestionar conflictos con madurez y liderar con empatía incluso en situaciones de incertidumbre.',
        },
      ]}
      whatIsIncludedHeading="¿Qué incluye el paquete de orientación profesional?"
      modules={[
        {
          icon: '🔍',
          title: 'Cuaderno de autodescubrimiento profesional',
          description:
            'Un cuaderno completo con ejercicios y evaluaciones diseñadas para ayudarte a descubrir tus fortalezas emocionales en el contexto laboral, identificar tus intereses más profundos y definir los valores que deben guiar tus decisiones de carrera. El punto de partida para construir una trayectoria profesional auténtica.',
        },
        {
          icon: '📊',
          title: 'Evaluación de IE aplicada al trabajo',
          description:
            'Un análisis detallado de cómo tus resultados del test de inteligencia emocional se traducen en el entorno profesional. Descubre en qué tipos de roles, sectores y dinámicas de equipo tus características emocionales te dan una ventaja real y dónde puedes seguir desarrollándote.',
        },
        {
          icon: '🗺️',
          title: 'Guía completa de planificación de carrera con IE',
          description:
            'Estrategias probadas para tomar decisiones profesionales con criterio emocional, gestionar transiciones laborales con seguridad y construir una hoja de ruta hacia el éxito que tenga en cuenta tanto tus objetivos externos como tu bienestar interno.',
        },
        {
          icon: '🎯',
          title: 'Modelo para fijar objetivos profesionales',
          description:
            'La metodología SMART aplicada específicamente al desarrollo profesional desde la perspectiva de la IE. Incluye plantillas para definir objetivos específicos, medibles y emocionalmente alineados con tu visión de carrera a corto, medio y largo plazo.',
        },
        {
          icon: '📚',
          title: 'Estrategias de aprendizaje continuo con IE',
          description:
            'Aprende a desarrollar nuevas competencias de forma eficiente aprovechando tu perfil emocional. Descubre qué tipo de aprendizaje encaja mejor con tu arquetipo, cómo mantenerte motivado durante el proceso y qué certificaciones y recursos pueden impulsar tu carrera.',
        },
      ]}
      testimonials={[
        {
          name: 'Sara M.',
          profession: 'Especialista en marketing',
          quote:
            'Esta guía me ayudó a entender por qué me sentía perdida en mi carrera a pesar de tener buenos resultados. Conectar mi IE con mi trayectoria profesional fue revelador. Ahora tomo decisiones con mucha más claridad.',
        },
        {
          name: 'David L.',
          profession: 'Recién licenciado',
          quote:
            'Empecé a usarla sin saber muy bien qué quería hacer profesionalmente. Los ejercicios de autodescubrimiento y la evaluación de IE me dieron una dirección clara. En tres meses encontré trabajo en un sector que me apasiona.',
        },
        {
          name: 'Jessica H.',
          profession: 'Gestora de proyectos',
          quote:
            'El modelo de objetivos SMART adaptado a la IE es exactamente lo que necesitaba. Por fin tengo metas profesionales que me motivan de verdad y un sistema para seguirlas sin agotarme emocionalmente.',
        },
      ]}
      mockup={
        <Mockup
          illustration="/illustrations/goals.svg"
          title="Crecimiento profesional"
          subtitle="Carrera y liderazgo con IE"
          accent="#1d4ed8"
        />
      }
    />
  );
}
