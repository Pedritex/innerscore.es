import Link from 'next/link';
import Header from '../components/Header';

export const metadata = {
  title: 'Precios — InnerScore',
  description:
    'Acceso completo a InnerScore por 1,95 € los 7 primeros días. Después, 39,99 €/mes. Cancela cuando quieras.',
};

const PLAN_FEATURES = [
  'Test completo de Inteligencia Emocional (30 preguntas)',
  'Informe personalizado de 15 páginas',
  'Tu arquetipo emocional y perfil de IE',
  'Acceso al área de miembros completa',
  'Tests adicionales de las 5 dimensiones',
  'Cursos de IE con certificado',
  'Plan de desarrollo personal de 90 días',
  'Contenido educativo diario',
];

const DIFFERENTIATORS = [
  {
    title: 'Transparencia total',
    body:
      'Precios claros desde el primer momento. Sin cargos ocultos ni sorpresas.',
  },
  {
    title: 'Pruébalo sin riesgo',
    body:
      '7 días para descubrir todo lo que InnerScore puede hacer por ti. Si no te convence, cancela y punto.',
  },
  {
    title: 'Soporte real',
    body:
      'Nuestro equipo responde en menos de 24 horas. Estamos aquí para ayudarte en cada paso.',
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
      <Plans />
      <Differentiators />
      <Motivational />
      <FAQ />
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
          Descubre tu Inteligencia Emocional y transforma tu vida
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-[#64748b] md:text-lg">
          Elige el plan que mejor se adapte a tu momento. Sin permanencia, sin
          sorpresas.
        </p>
      </div>
    </section>
  );
}

function Plans() {
  return (
    <section className="bg-white pb-16 md:pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
          <PlanCard
            badge="Más popular"
            title="Acceso de 7 días"
            price="1,95 €"
            priceCaption=""
            subtitle="Después 39,99 €/mes · Cancela cuando quieras"
            ctaLabel="Empezar hoy por 1,95 €"
            ctaHref="/quiz"
            ctaColor="#ea580c"
            ctaShadow="0 10px 24px rgba(234,88,12,0.35)"
            footnote="Acceso inmediato. Cancela antes del día 7 y no se te cobra nada más."
            highlighted
          />
          <PlanCard
            title="Acceso Mensual"
            price="39,99 €"
            priceCaption="/ mes"
            subtitle="Sin período de prueba, acceso inmediato"
            ctaLabel="Adquirir plan mensual"
            ctaHref="/quiz"
            ctaColor="#1d4ed8"
            ctaShadow="0 8px 24px rgba(29,78,216,0.35)"
            footnote="Cancela en cualquier momento desde tu área de miembros."
          />
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  badge,
  title,
  price,
  priceCaption,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaColor,
  ctaShadow,
  footnote,
  highlighted = false,
}: {
  badge?: string;
  title: string;
  price: string;
  priceCaption: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  ctaColor: string;
  ctaShadow: string;
  footnote: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-3xl bg-white"
      style={{
        border: highlighted ? '2px solid #ea580c' : '1px solid #e8d5c8',
        boxShadow: highlighted
          ? '0 24px 50px rgba(234,88,12,0.18)'
          : '0 12px 28px rgba(15,23,42,0.06)',
      }}
    >
      {badge ? (
        <div className="flex justify-center pt-5">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white"
            style={{
              backgroundColor: '#ea580c',
              boxShadow: '0 8px 20px rgba(234,88,12,0.30)',
            }}
          >
            {badge}
          </span>
        </div>
      ) : (
        <div className="pt-5">
          <div className="h-[26px]" aria-hidden />
        </div>
      )}

      <div className="px-7 pt-6 pb-2 text-center md:px-9">
        <h2 className="font-display text-lg font-bold uppercase tracking-widest text-[#0f172a]">
          {title}
        </h2>
        <div className="mt-5 flex items-baseline justify-center gap-2">
          <span className="font-display text-5xl font-bold tabular-nums text-[#0f172a] md:text-6xl">
            {price}
          </span>
          {priceCaption ? (
            <span className="text-base text-[#64748b]">{priceCaption}</span>
          ) : null}
        </div>
        <p className="mt-3 text-sm text-[#64748b]">{subtitle}</p>
      </div>

      <div className="flex flex-1 flex-col px-7 pt-6 pb-7 md:px-9 md:pb-9">
        <ul className="flex flex-col gap-3">
          {PLAN_FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: '#22c55e' }}
                aria-hidden
              >
                <CheckIcon />
              </span>
              <span className="text-sm leading-relaxed text-[#0f172a] md:text-[15px]">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <Link
            href={ctaHref}
            className="flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-base font-bold text-white transition-transform hover:scale-[1.01] md:text-lg"
            style={{
              backgroundColor: ctaColor,
              boxShadow: ctaShadow,
            }}
          >
            {ctaLabel}
          </Link>
          <p className="mt-4 text-center text-xs leading-relaxed text-[#94a3b8]">
            {footnote}
          </p>
        </div>
      </div>
    </div>
  );
}

function Differentiators() {
  return (
    <section className="bg-[#fdf6f0] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <li
              key={item.title}
              className="flex flex-col items-center rounded-2xl bg-white p-6 text-center"
              style={{
                border: '1px solid #e8d5c8',
                boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
              }}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full text-white"
                style={{
                  backgroundColor: '#0f172a',
                  boxShadow: '0 8px 18px rgba(15,23,42,0.25)',
                }}
                aria-hidden
              >
                {i === 0 ? <ShieldIcon /> : i === 1 ? <SparkIcon /> : <ChatIcon />}
              </span>
              <h3 className="font-display mt-5 text-lg font-bold text-[#0f172a]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#64748b]">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Motivational() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
          Empieza hoy mismo
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#64748b] md:text-lg">
          Elige tu plan y descubre en minutos cómo gestionas realmente tus
          emociones. Miles de personas ya han transformado su vida con
          InnerScore.
        </p>

        <div
          className="mt-10 rounded-3xl p-7 text-left md:p-10"
          style={{
            background:
              'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            boxShadow: '0 20px 40px rgba(15,23,42,0.15)',
          }}
        >
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{
                background: 'rgba(234,88,12,0.18)',
                color: '#fed7aa',
              }}
              aria-hidden
            >
              <FlagIcon />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                Libertad total
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80 md:text-base">
                Permanece porque te aporta valor, no porque tengas que hacerlo.
                Cancela cuando quieras, sin preguntas.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/quiz"
          className="mt-10 inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white transition-transform hover:scale-[1.02] md:text-lg"
          style={{
            backgroundColor: '#ea580c',
            boxShadow: '0 8px 24px rgba(234,88,12,0.35)',
          }}
        >
          Comenzar por 1,95 €
        </Link>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="bg-[#fdf6f0] py-16 md:py-20">
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
              className="rounded-2xl bg-white p-5 md:p-6"
              style={{
                border: '1px solid #e8d5c8',
                boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
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

function CheckIcon() {
  return (
    <svg
      width="11"
      height="11"
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

function ShieldIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}
