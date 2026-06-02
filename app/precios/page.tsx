import Link from 'next/link';
import Header from '../components/Header';

export const metadata = {
  title: 'Precios — InnerScore',
  description:
    'Acceso completo a InnerScore por 1,95 € los 7 primeros días. Después, 39,99 €/mes. Cancela cuando quieras.',
};

const INCLUDED_ITEMS = [
  {
    title: 'Informe IE completo en PDF',
    body: '15 páginas personalizadas con tu puntuación global, las 5 dimensiones de Goleman y tu arquetipo emocional.',
  },
  {
    title: 'Tests adicionales',
    body: '10 tests temáticos para profundizar en cada dimensión de tu inteligencia emocional.',
  },
  {
    title: 'Cursos',
    body: '10 cursos guiados con 10 lecciones cada uno, desde los fundamentos hasta las aplicaciones avanzadas.',
  },
  {
    title: 'Plan de desarrollo de 90 días',
    body: 'Una hoja de ruta semana a semana, calibrada según tu perfil, para integrar la IE en tu día a día.',
  },
  {
    title: 'Acceso completo al área de miembros',
    body: 'Píldoras diarias, trivia, seguimiento de progreso, racha y certificados al completar los cursos.',
  },
];

const UPSELLS = [
  {
    title: 'Guía de crecimiento emocional',
    price: '0,99 €',
  },
  {
    title: 'Orientación profesional con IE',
    price: '0,99 €',
  },
  {
    title: 'Guía de autoestima emocional',
    price: '0,99 €',
  },
];

const FAQ_ITEMS = [
  {
    q: '¿Cuándo se me cobra el precio completo?',
    a: 'El cargo de 39,99 €/mes se realiza después de los 7 días de prueba. Durante esos 7 primeros días solo pagas la oferta de entrada de 1,95 €.',
  },
  {
    q: '¿Puedo cancelar antes de los 7 días?',
    a: 'Sí, puedes cancelar en cualquier momento desde tu área de miembros. Si cancelas antes de que termine el periodo de prueba, no se realiza ningún cargo adicional.',
  },
  {
    q: '¿Los productos adicionales generan cargos recurrentes?',
    a: 'No. Cada producto adicional es un pago único de 0,99 €. Son completamente independientes de la suscripción mensual y no se renuevan automáticamente.',
  },
  {
    q: '¿Cómo cancelo?',
    a: 'Puedes cancelar tu suscripción desde la sección "Mi cuenta" del área de miembros, o escribiendo a support@innerscore.es. La cancelación detiene los futuros cargos de inmediato.',
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#fdf6f0]">
      <Header />

      <Hero />
      <PricingCard />
      <Included />
      <Upsells />
      <Cancellation />
      <FAQ />
      <FinalCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 pt-12 pb-6 text-center md:pt-20 md:pb-10">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: 'rgba(234,88,12,0.08)',
            border: '1px solid #fed7aa',
            color: '#ea580c',
          }}
        >
          Precios transparentes
        </span>
        <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-[#0f172a] md:text-5xl">
          Precios
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-[#64748b] md:text-lg">
          Empieza por 1,95 € durante 7 días. Después, 39,99 €/mes. Sin
          permanencia: cancela cuando quieras.
        </p>
      </div>
    </section>
  );
}

function PricingCard() {
  return (
    <section className="bg-white pb-16 md:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div
          className="overflow-hidden rounded-3xl bg-white"
          style={{
            border: '1px solid #e8d5c8',
            boxShadow: '0 20px 40px rgba(15,23,42,0.08)',
          }}
        >
          <div
            className="px-7 py-8 text-center text-white md:px-10 md:py-10"
            style={{
              background:
                'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)',
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest opacity-80">
              Oferta de entrada
            </p>
            <div className="mt-5 flex items-baseline justify-center gap-2">
              <span className="font-display text-6xl font-bold tabular-nums md:text-7xl">
                1,95 €
              </span>
            </div>
            <p className="mt-3 text-sm opacity-90 md:text-base">
              7 días de acceso completo a todo InnerScore
            </p>
          </div>

          <div className="px-7 py-8 md:px-10 md:py-10">
            <div
              className="rounded-2xl p-5 md:p-6"
              style={{
                backgroundColor: '#fdf6f0',
                border: '1px solid #e8d5c8',
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#64748b]">
                Después del periodo de prueba
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
                  39,99 €
                </span>
                <span className="text-sm text-[#64748b]">/ mes</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                Si no cancelas antes del día 7, la suscripción se renueva
                automáticamente cada mes hasta que decidas terminarla.
              </p>
            </div>

            <Link
              href="/quiz"
              className="mt-7 flex w-full items-center justify-center rounded-xl px-6 py-4 text-base font-bold text-white transition-transform hover:scale-[1.01] md:text-lg"
              style={{
                backgroundColor: '#1d4ed8',
                boxShadow: '0 8px 24px rgba(29,78,216,0.35)',
              }}
            >
              Comenzar por 1,95 €
            </Link>

            <p className="mt-4 text-center text-xs text-[#94a3b8]">
              Sin permanencia · Cancela cuando quieras · Pago seguro con Stripe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Included() {
  return (
    <section className="bg-[#fdf6f0] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            Qué incluye la suscripción
          </h2>
          <p className="mt-3 text-[#64748b]">
            Todo lo necesario para llevar tu inteligencia emocional a la
            práctica.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {INCLUDED_ITEMS.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl bg-white p-5"
              style={{
                border: '1px solid #e8d5c8',
                boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: '#22c55e' }}
                  aria-hidden
                >
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-[#0f172a]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">
                    {item.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Upsells() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            Productos adicionales opcionales
          </h2>
          <p className="mt-3 text-[#64748b]">
            Durante el proceso de compra puedes añadir, si quieres, alguna de
            estas guías. Son <strong>pagos únicos de 0,99 €</strong>,
            independientes de la suscripción y sin cargos recurrentes.
          </p>
        </div>

        <ul className="mt-10 flex flex-col gap-3">
          {UPSELLS.map((item) => (
            <li
              key={item.title}
              className="flex items-center justify-between rounded-2xl p-5"
              style={{
                backgroundColor: '#fdf6f0',
                border: '1px solid #e8d5c8',
              }}
            >
              <span className="text-sm font-semibold text-[#0f172a] md:text-base">
                {item.title}
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: 'rgba(234,88,12,0.10)',
                  color: '#c2410c',
                }}
              >
                {item.price} · pago único
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Cancellation() {
  return (
    <section className="bg-[#fdf6f0] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div
          className="rounded-3xl bg-white p-7 md:p-10"
          style={{
            border: '1px solid #e8d5c8',
            boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
          }}
        >
          <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
            Cómo cancelar
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#64748b] md:text-base">
            Puedes cancelar en cualquier momento, sin preguntas ni penalizaciones:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-[#0f172a] md:text-base">
            <li>
              Desde la sección{' '}
              <strong>&ldquo;Mi cuenta&rdquo;</strong> en tu{' '}
              <Link
                href="/members"
                className="text-[#1d4ed8] hover:underline"
              >
                área de miembros
              </Link>
              .
            </li>
            <li>
              Escribiéndonos a{' '}
              <a
                href="mailto:support@innerscore.es"
                className="text-[#1d4ed8] hover:underline"
              >
                support@innerscore.es
              </a>
              .
            </li>
          </ul>
          <p className="mt-4 text-sm text-[#64748b]">
            Para evitar el primer cargo mensual de 39,99 €, cancela{' '}
            <strong>antes del día 7</strong> contado desde la fecha de la
            compra inicial.
          </p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            Preguntas frecuentes
          </h2>
        </div>

        <ul className="mt-10 flex flex-col gap-3">
          {FAQ_ITEMS.map((item) => (
            <li
              key={item.q}
              className="rounded-2xl p-5 md:p-6"
              style={{
                backgroundColor: '#fdf6f0',
                border: '1px solid #e8d5c8',
              }}
            >
              <h3 className="font-display text-base font-bold text-[#0f172a] md:text-lg">
                {item.q}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b] md:text-base">
                {item.a}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-[#fdf6f0] pb-20 pt-4 md:pb-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
          Empieza por 1,95 €
        </h2>
        <p className="mt-3 text-[#64748b]">
          Acceso completo durante 7 días. Cancela cuando quieras.
        </p>
        <Link
          href="/quiz"
          className="mt-7 inline-flex w-full items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white transition-transform hover:scale-[1.02] md:w-auto md:text-lg"
          style={{
            backgroundColor: '#1d4ed8',
            boxShadow: '0 8px 24px rgba(29,78,216,0.35)',
          }}
        >
          Comenzar por 1,95 €
        </Link>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
