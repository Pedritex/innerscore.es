import UpsellLayout from '../_components/UpsellLayout';
import Mockup from '../_components/Mockup';

export default function Upsell2Page() {
  return (
    <UpsellLayout
      slot={2}
      productTitle="Orientación y crecimiento profesional con IE"
      shortDescription="Aplica la inteligencia emocional a tu carrera con un plan claro: descubre tus fortalezas, define objetivos SMART y prosperas en entornos exigentes."
      benefits={[
        'Identifica tus fortalezas emocionales en el trabajo',
        'Alinea tu IE con tu carrera',
        'Define objetivos SMART con IE',
        'Adáptate a entornos laborales exigentes',
      ]}
      modules={[
        'Cuaderno de autodescubrimiento profesional',
        'Evaluación de IE aplicada al trabajo',
        'Guía de planificación de carrera con IE',
        'Modelo para fijar objetivos',
        'Estrategias de aprendizaje continuo',
      ]}
      testimonials={[
        {
          text: 'Me ha dado un marco para hablar con mi manager sobre mi desarrollo. Es de lo más útil que he leído sobre carrera profesional.',
          author: 'Marcos D., Valencia',
        },
        {
          text: 'La evaluación de IE en el trabajo me hizo ver dónde estaba perdiendo energía. Cambié de equipo a los tres meses.',
          author: 'Patricia L., Madrid',
        },
        {
          text: 'Práctica, directa y con ejercicios accionables. Justo lo que necesitaba para mi cambio de etapa profesional.',
          author: 'Andrés M., Málaga',
        },
      ]}
      mockup={
        <Mockup
          emoji="💼"
          title="Crecimiento profesional"
          subtitle="Carrera y liderazgo con IE"
          gradient={['#0f172a', '#1d4ed8']}
        />
      }
    />
  );
}
