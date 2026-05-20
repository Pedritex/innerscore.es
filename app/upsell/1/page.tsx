import UpsellLayout from '../_components/UpsellLayout';
import Mockup from '../_components/Mockup';

export default function Upsell1Page() {
  return (
    <UpsellLayout
      slot={1}
      productTitle="Guía de crecimiento emocional: ¡Encuentra tu mejor versión!"
      shortDescription="Un cuaderno guiado para profundizar en tu inteligencia emocional con ejercicios, herramientas y un sistema para construir hábitos que duren."
      benefits={[
        'Mayor autoconciencia emocional',
        'Mejores relaciones personales',
        'Resiliencia ante el estrés',
        'Sensación de plenitud y propósito',
      ]}
      modules={[
        'Cuaderno de ejercicios de IE',
        'Herramientas de regulación emocional',
        'Guía de objetivos emocionales',
        'Estrategias para crear hábitos saludables',
        'Diario de seguimiento emocional',
      ]}
      testimonials={[
        {
          text: 'Llevaba meses sintiéndome estancada. Los ejercicios de regulación emocional me ayudaron a salir de esa rueda en pocas semanas.',
          author: 'Elena S., Sevilla',
        },
        {
          text: 'El diario de seguimiento es lo que me ha marcado la diferencia. Por fin entiendo mis patrones emocionales.',
          author: 'Javier P., Madrid',
        },
        {
          text: 'Una guía clara, concreta y muy fácil de aplicar en el día a día. La recomiendo sin dudar.',
          author: 'Noelia G., Bilbao',
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
