import Link from 'next/link';
import Header from '../components/Header';

export const metadata = {
  title: 'Preguntas frecuentes — InnerScore',
  description:
    'Resolvemos las dudas más habituales sobre InnerScore: el test, el informe, los precios, el área de miembros y la privacidad.',
};

type FAQItem = { q: string; a: string };
type FAQSection = { title: string; items: FAQItem[] };

const SECTIONS: FAQSection[] = [
  {
    title: 'El test',
    items: [
      {
        q: '¿Qué es el test de Inteligencia Emocional de InnerScore?',
        a: 'Es un test de 30 preguntas basado en el modelo de las 5 dimensiones de Daniel Goleman (Autoconciencia, Autorregulación, Motivación, Empatía y Habilidades Sociales). Al completarlo recibirás tu arquetipo emocional y un análisis detallado de tu perfil.',
      },
      {
        q: '¿Cuánto tiempo dura el test?',
        a: 'Aproximadamente 5 minutos. Son 30 afirmaciones a las que debes responder según tu opinión personal.',
      },
      {
        q: '¿Puedo repetir el test?',
        a: 'Sí, puedes hacer el test tantas veces como quieras desde tu área de miembros.',
      },
      {
        q: '¿El test es científicamente válido?',
        a: 'El test está basado en el modelo de Inteligencia Emocional de Daniel Goleman, uno de los marcos teóricos más reconocidos en psicología. No es un test clínico ni sustituye a una evaluación profesional.',
      },
    ],
  },
  {
    title: 'El informe',
    items: [
      {
        q: '¿Qué incluye el informe?',
        a: 'Un análisis de 15 páginas con tu puntuación en las 5 dimensiones de IE, tu arquetipo emocional, tus fortalezas y áreas de mejora, cómo te relacionas con los demás, cómo gestionas el estrés y un plan de acción de 90 días personalizado.',
      },
      {
        q: '¿Cuándo recibo el informe?',
        a: 'Lo recibirás en tu correo electrónico en los siguientes 5-10 minutos tras completar el pago.',
      },
      {
        q: '¿El informe lo genera una IA?',
        a: 'Sí, el informe es generado por inteligencia artificial (Claude de Anthropic) basándose en tus respuestas al test. Es un documento orientativo con fines educativos, no un diagnóstico profesional.',
      },
      {
        q: '¿En qué formato llega el informe?',
        a: 'En formato PDF, directamente a tu correo electrónico.',
      },
    ],
  },
  {
    title: 'Precios y suscripción',
    items: [
      {
        q: '¿Cuánto cuesta?',
        a: 'El acceso completo durante 7 días cuesta 1,95 €. Después del período de prueba, si no cancelas, se renueva automáticamente a 39,99 €/mes.',
      },
      {
        q: '¿Cuándo se me cobra el precio mensual?',
        a: 'El séptimo día después de tu primer pago, a menos que hayas cancelado antes.',
      },
      {
        q: '¿Puedo cancelar antes de que terminen los 7 días?',
        a: 'Sí, puedes cancelar en cualquier momento desde tu área de miembros o escribiendo a support@innerscore.es. Si cancelas antes del día 7, no se te cobrará el precio mensual.',
      },
      {
        q: '¿Cómo cancelo la suscripción?',
        a: 'Desde tu área de miembros en la sección "Mi cuenta", o enviando un email a support@innerscore.es con el asunto "Cancelar suscripción".',
      },
      {
        q: '¿Los productos adicionales generan cargos recurrentes?',
        a: 'No. Los productos adicionales (guías y materiales extra) son pagos únicos de 0,99 € cada uno y no generan ningún cargo recurrente.',
      },
      {
        q: '¿Ofrecéis reembolsos?',
        a: 'Sí. Si no estás satisfecho durante el período de prueba de 7 días, contáctanos en support@innerscore.es y tramitaremos el reembolso completo.',
      },
    ],
  },
  {
    title: 'Área de miembros',
    items: [
      {
        q: '¿Qué incluye el área de miembros?',
        a: 'Acceso a tu informe de IE, tests adicionales de las 5 dimensiones, cursos de inteligencia emocional con certificado, tu plan de desarrollo de 90 días y contenido educativo diario.',
      },
      {
        q: '¿Cómo accedo al área de miembros?',
        a: 'Recibirás tus credenciales de acceso en el email de bienvenida. También puedes acceder directamente desde innerscore.es/login.',
      },
      {
        q: '¿Puedo acceder desde cualquier dispositivo?',
        a: 'Sí, el área de miembros es completamente responsive y funciona en móvil, tablet y ordenador.',
      },
      {
        q: '¿Qué pasa si olvido mi contraseña?',
        a: 'Puedes recuperarla desde innerscore.es/login haciendo clic en "¿Olvidaste tu contraseña?".',
      },
    ],
  },
  {
    title: 'Privacidad y seguridad',
    items: [
      {
        q: '¿Están seguros mis datos?',
        a: 'Sí. Todos los datos se almacenan de forma segura con Supabase y los pagos se procesan a través de Stripe, certificado PCI DSS. No almacenamos datos de tarjetas de crédito.',
      },
      {
        q: '¿Compartís mis datos con terceros?',
        a: 'Solo con los proveedores necesarios para el funcionamiento del servicio (Stripe para pagos, Supabase para almacenamiento, Resend para emails, Anthropic para generación del informe). Nunca vendemos datos a terceros.',
      },
      {
        q: '¿Puedo solicitar la eliminación de mis datos?',
        a: 'Sí, tienes derecho al olvido. Escríbenos a support@innerscore.es y eliminaremos todos tus datos en un plazo máximo de 30 días.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#fdf6f0]">
      <Header />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 pt-12 pb-6 text-center md:pt-20 md:pb-10">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: 'rgba(29,78,216,0.08)',
              border: '1px solid #bfdbfe',
              color: '#1d4ed8',
            }}
          >
            Centro de ayuda
          </span>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-[#0f172a] md:text-5xl">
            Preguntas frecuentes
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#64748b] md:text-lg">
            Las respuestas a las dudas más habituales sobre InnerScore.
          </p>
        </div>
      </section>

      <section className="bg-[#fdf6f0] py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col gap-12">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-bold uppercase tracking-widest text-[#0f172a] md:text-2xl">
                  {section.title}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li key={item.q}>
                      <details
                        className="group overflow-hidden rounded-2xl bg-white"
                        style={{
                          border: '1px solid #e8d5c8',
                          boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
                        }}
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5">
                          <span className="font-display text-sm font-bold text-[#0f172a] md:text-base">
                            {item.q}
                          </span>
                          <span
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#1d4ed8] transition-transform group-open:rotate-180"
                            style={{
                              backgroundColor: '#eff6ff',
                              border: '1px solid #bfdbfe',
                            }}
                            aria-hidden
                          >
                            <ChevronDown />
                          </span>
                        </summary>
                        <div
                          className="px-5 pb-5 text-sm leading-relaxed text-[#64748b] md:px-6 md:pb-6 md:text-base"
                          style={{ borderTop: '1px solid #f1ebe5' }}
                        >
                          <p className="pt-4">{item.a}</p>
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="mt-3 text-[#64748b]">
            Escríbenos y te respondemos en menos de 24 horas en días
            laborables.
          </p>
          <Link
            href="/contacto"
            className="mt-7 inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white transition-transform hover:scale-[1.02] md:text-lg"
            style={{
              backgroundColor: '#1d4ed8',
              boxShadow: '0 8px 24px rgba(29,78,216,0.35)',
            }}
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </div>
  );
}

function ChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
