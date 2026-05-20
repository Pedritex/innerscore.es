import UpsellLayout from '../_components/UpsellLayout';
import Mockup from '../_components/Mockup';

export default function Upsell3Page() {
  return (
    <UpsellLayout
      slot={3}
      productTitle="Guía de autoestima emocional: ¡Crea un yo más fuerte!"
      shortDescription="Refuerza tu autoestima desde la inteligencia emocional. Estrategias, afirmaciones y prácticas para construir una versión de ti más sólida y serena."
      benefits={[
        'Salud mental positiva',
        'Estabilidad emocional',
        'Relaciones más significativas',
      ]}
      modules={[
        'Cuaderno de ejercicios de autoestima',
        'Estrategias para superar la baja autoestima',
        'Kit de comunicación asertiva',
        'Guías de afirmaciones diarias',
        'Prácticas de mindfulness y autocuidado',
      ]}
      testimonials={[
        {
          text: 'Las afirmaciones diarias me sacaron del bucle de autocrítica. Algo tan sencillo me ha cambiado la mañana.',
          author: 'Carmen V., Granada',
        },
        {
          text: 'El kit de comunicación asertiva me ayudó a poner límites sanos por primera vez. No tiene precio.',
          author: 'Iván B., Zaragoza',
        },
        {
          text: 'No es un libro motivacional, es un sistema. Eso es lo que marca la diferencia.',
          author: 'Sara F., Madrid',
        },
      ]}
      mockup={
        <Mockup
          emoji="💪"
          title="Autoestima emocional"
          subtitle="Crea un yo más fuerte"
          gradient={['#dc2626', '#ea580c']}
        />
      }
    />
  );
}
