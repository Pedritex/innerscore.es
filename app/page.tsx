import Link from 'next/link';
import Header from './components/Header';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#fdf6f0]">
      <Header />
      <Hero />
      <HowItWorks />
      <ImpactStat />
      <Features />
      <WhatYouGet />
      <PDFPreview />
      <Testimonials />
      <FAQ />
    </div>
  );
}

const FAQ_ITEMS = [
  {
    q: '¿Cuánto dura el test?',
    a: 'Aproximadamente 5 minutos. Son 30 afirmaciones a las que respondes según tu opinión personal.',
  },
  {
    q: '¿Qué recibo al completar el pago?',
    a: 'Un informe personalizado de 15 páginas con tu arquetipo emocional, puntuación en las 5 dimensiones de IE, fortalezas, áreas de mejora y un plan de acción de 90 días. Lo recibirás en tu correo en 5-10 minutos.',
  },
  {
    q: '¿Cuándo se me cobra el precio mensual?',
    a: 'El séptimo día después de tu primer pago de 1,95 €. Puedes cancelar antes desde tu área de miembros y no se te cobrará nada más.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí, sin permanencia ni penalización. Cancela desde tu área de miembros o escribiendo a support@innerscore.es.',
  },
  {
    q: '¿El informe lo genera una inteligencia artificial?',
    a: 'Sí, el informe es generado por IA (Claude de Anthropic) basándose en tus respuestas. Es un documento orientativo con fines educativos, no un diagnóstico profesional.',
  },
  {
    q: '¿Están seguros mis datos?',
    a: 'Sí. Los pagos se procesan con Stripe (certificado PCI DSS) y los datos se almacenan de forma segura. Nunca compartimos ni vendemos tus datos.',
  },
];

function FAQ() {
  return (
    <section className="bg-[#fdf6f0] py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-[#64748b]">
            Resolvemos las dudas más habituales antes de empezar.
          </p>
        </div>

        <ul className="mt-10 flex flex-col gap-3">
          {FAQ_ITEMS.map((item) => (
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

        <p className="mt-10 text-center text-sm text-[#64748b]">
          ¿No encuentras lo que buscas?{' '}
          <Link
            href="/preguntas-frecuentes"
            className="font-semibold text-[#1d4ed8] hover:underline"
          >
            Ver todas las preguntas
          </Link>
        </p>
      </div>
    </section>
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

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background glows */}
      <div
        className="pointer-events-none absolute"
        style={{ top: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,146,60,0.22) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute"
        style={{ top: '-40px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{ bottom: '-50px', width: '320px', height: '180px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(234,88,12,0.14) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-5 pb-2 md:py-24">
        <div className="grid items-center gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,360px)] md:gap-14">
          <div className="text-center md:max-w-xl md:text-left">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                border: '1px solid #fed7aa',
                color: '#ea580c',
              }}
            >
              Test de Inteligencia Emocional
            </span>

            <h1 className="font-display mt-3 text-3xl font-bold leading-[1.1] text-[#0f172a] text-justify md:mt-7 md:text-6xl md:leading-[1.08] md:text-center">
              <span className="text-[#0f172a]">Descubre </span>
              <span className="text-[#f97316]">cómo gestionas tus emociones </span>
              <span className="text-[#0f172a]">
                con este test de inteligencia emocional
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm text-[#1e293b] text-justify md:mx-0 md:mt-7 md:text-lg md:text-center">
              Con este test, descubrirás tu tipo y capacidad de inteligencia
              emocional exacto.
            </p>

            <Link
              href="/quiz"
              className="mt-4 flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] md:mt-8 md:inline-flex md:w-auto md:px-8 md:py-4 md:text-lg"
              style={{
                backgroundColor: '#1d4ed8',
                boxShadow: '0 8px 24px rgba(29,78,216,0.35)',
              }}
            >
              Hacer el test gratuito
            </Link>

            <p className="mt-2 text-xs text-[#94a3b8] text-justify md:mt-4 md:text-center">
              Al utilizar esta web, aceptas los{' '}
              <Link
                href="/legal/terms-of-service"
                className="underline transition-colors hover:text-[#1e293b]"
              >
                Términos y condiciones
              </Link>
              .
            </p>
          </div>

          {/* Phone mockup: visible on all breakpoints — right side on desktop, centered below CTA on mobile */}
          <div className="flex max-h-[280px] justify-center overflow-hidden md:max-h-[450px] md:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  const ANSWERS = [
    { num: 1, label: 'Nunca' },
    { num: 2, label: 'Rara vez' },
    { num: 3, label: 'A veces' },
    { num: 4, label: 'A menudo' },
    { num: 5, label: 'Siempre' },
  ];
  const SELECTED = 4;

  return (
    <div
      className="relative shrink-0"
      style={{ width: '280px', filter: 'drop-shadow(0 30px 50px rgba(15,23,42,0.28))' }}
      aria-hidden
    >
      {/* Outer phone frame */}
      <div
        className="relative"
        style={{
          backgroundColor: '#0f172a',
          borderRadius: '46px',
          padding: '12px',
          aspectRatio: '9 / 19.5',
        }}
      >
        {/* Side buttons */}
        <span
          className="absolute"
          style={{
            left: '-2px',
            top: '110px',
            width: '3px',
            height: '34px',
            borderRadius: '2px 0 0 2px',
            backgroundColor: '#1e293b',
          }}
        />
        <span
          className="absolute"
          style={{
            right: '-2px',
            top: '130px',
            width: '3px',
            height: '60px',
            borderRadius: '0 2px 2px 0',
            backgroundColor: '#1e293b',
          }}
        />

        {/* Screen */}
        <div
          className="relative h-full w-full overflow-hidden bg-white"
          style={{ borderRadius: '34px' }}
        >
          {/* Dynamic Island / notch */}
          <div
            className="absolute left-1/2 top-2 -translate-x-1/2"
            style={{
              width: '88px',
              height: '24px',
              borderRadius: '999px',
              backgroundColor: '#0f172a',
            }}
          />

          {/* Status bar dots */}
          <div className="absolute right-5 top-3.5 flex items-center gap-1">
            <span
              className="block h-1 w-1 rounded-full"
              style={{ backgroundColor: '#0f172a' }}
            />
            <span
              className="block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: '#0f172a' }}
            />
            <span
              className="block h-2 w-2 rounded-full"
              style={{ backgroundColor: '#0f172a' }}
            />
          </div>

          {/* Content */}
          <div className="flex h-full flex-col px-5 pt-12 pb-5">
            {/* Progress header */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[#1d4ed8]">
                Pregunta 03 de 30
              </span>
              <span className="text-[10px] font-medium tabular-nums text-[#94a3b8]">
                10%
              </span>
            </div>
            <div
              className="mt-2 w-full overflow-hidden rounded-full"
              style={{ height: '4px', backgroundColor: '#e2e8f0' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: '10%',
                  background:
                    'linear-gradient(90deg, #ea580c 0%, #f59e0b 100%)',
                }}
              />
            </div>

            {/* Dimension badge */}
            <div className="mt-5 flex justify-center">
              <span
                className="rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest"
                style={{
                  backgroundColor: 'rgba(234,88,12,0.10)',
                  border: '1px solid #fed7aa',
                  color: '#c2410c',
                }}
              >
                Autorregulación
              </span>
            </div>

            {/* Question */}
            <p className="font-display mt-4 text-center text-[12px] font-bold italic leading-snug text-[#0f172a]">
              Cuando algo me molesta, soy capaz de mantener la calma antes de
              responder.
            </p>

            {/* Answers */}
            <div className="mt-4 flex flex-1 flex-col gap-2">
              {ANSWERS.map((a) => {
                const selected = a.num === SELECTED;
                return (
                  <div
                    key={a.num}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2"
                    style={{
                      backgroundColor: selected
                        ? 'rgba(234,88,12,0.10)'
                        : '#f8faff',
                      border: selected
                        ? '1px solid #ea580c'
                        : '1px solid #dde8ff',
                    }}
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold"
                      style={{
                        backgroundColor: selected ? '#ea580c' : '#eff6ff',
                        color: selected ? '#ffffff' : '#1d4ed8',
                        border: selected ? 'none' : '1px solid #bfdbfe',
                      }}
                    >
                      {a.num}
                    </span>
                    <span
                      className="text-[11px] font-medium"
                      style={{ color: selected ? '#c2410c' : '#0f172a' }}
                    >
                      {a.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Home indicator */}
            <div className="mt-4 flex justify-center">
              <span
                className="block rounded-full"
                style={{
                  width: '90px',
                  height: '4px',
                  backgroundColor: '#0f172a',
                  opacity: 0.85,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#1d4ed8]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Features() {
  return (
    <section className="mx-auto grid w-full max-w-5xl gap-4 px-6 py-6 md:grid-cols-3 md:py-20">
      <FeatureCard
        accent="#1d4ed8"
        title="Basado en ciencia"
        body="Construido sobre el modelo de IE de 5 dimensiones de Goleman"
      />
      <FeatureCard
        accent="#1d4ed8"
        title="Totalmente personalizado"
        body="Tus resultados se generan de forma única a partir de tus respuestas"
      />
      <FeatureCard
        accent="#dc2626"
        title="Acceso inmediato"
        body="Recibe tus resultados al instante en tu correo electrónico"
      />
    </section>
  );
}

function FeatureCard({
  accent,
  title,
  body,
}: {
  accent: string;
  title: string;
  body: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        backgroundColor: '#fdf6f0',
        border: '1px solid #e8d5c8',
      }}
    >
      <div style={{ height: '3px', backgroundColor: accent }} />
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-[#0f172a]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[#64748b]">{body}</p>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: 1,
      title: 'Prepárate',
      body: 'Busca un momento tranquilo y responde con sinceridad. No hay respuestas correctas ni incorrectas.',
    },
    {
      n: 2,
      title: 'Haz el test',
      body: 'Responde 30 afirmaciones diseñadas para revelar tu perfil de Inteligencia Emocional.',
    },
    {
      n: 3,
      title: 'Descubre tus resultados',
      body: 'Accede a tu perfil emocional completo con tu arquetipo, las 5 dimensiones y un plan de acción de 90 días.',
    },
  ];

  return (
    <section className="bg-[#fdf6f0]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: 'rgba(234,88,12,0.10)',
              color: '#c2410c',
            }}
          >
            Cómo funciona
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold text-[#0f172a] md:text-4xl">
            Tres pasos para descubrir tu perfil
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#64748b]">
            Diseñado para que en menos de 10 minutos tengas claridad sobre cómo
            gestionas tus emociones.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl bg-white p-6 md:p-7"
              style={{
                border: '1px solid #e8d5c8',
                boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
              }}
            >
              <span
                className="font-display flex h-11 w-11 items-center justify-center rounded-full text-base font-bold text-white"
                style={{
                  backgroundColor: '#ea580c',
                  boxShadow: '0 8px 18px rgba(234,88,12,0.30)',
                }}
                aria-hidden
              >
                {s.n}
              </span>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                Paso {s.n}
              </p>
              <h3 className="font-display mt-2 text-xl font-bold text-[#0f172a]">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#64748b] md:text-[15px]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-base font-bold text-white transition-transform hover:scale-[1.02] md:text-lg"
            style={{
              backgroundColor: '#ea580c',
              boxShadow: '0 8px 24px rgba(234,88,12,0.35)',
            }}
          >
            Iniciar test gratuito
          </Link>
        </div>
      </div>
    </section>
  );
}

function ImpactStat() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div
          className="overflow-hidden rounded-3xl p-8 md:p-12"
          style={{
            background:
              'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            boxShadow: '0 20px 40px rgba(15,23,42,0.15)',
          }}
        >
          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-display text-4xl font-bold text-white md:text-5xl">
                <span style={{ color: '#fb923c' }}>El 89%</span> de los
                usuarios afirma haber mejorado su gestión emocional tras
                descubrir su perfil emocional con InnerScore.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <StatBlock value="30" caption="preguntas" />
              <StatBlock value="5" caption="dimensiones analizadas" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({ value, caption }: { value: string; caption: string }) {
  return (
    <div
      className="rounded-2xl p-5 md:p-6"
      style={{
        backgroundColor: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <p className="font-display text-4xl font-bold tabular-nums text-white md:text-5xl">
        {value}
      </p>
      <p className="mt-1 text-sm uppercase tracking-widest text-white/70">
        {caption}
      </p>
    </div>
  );
}

function WhatYouGet() {
  const items = [
    {
      title: 'Informe de IE',
      body: 'Un análisis detallado de 15 páginas con tu arquetipo emocional, puntuaciones y fortalezas.',
      icon: <IconChart />,
    },
    {
      title: 'Plan de 90 días',
      body: 'Un plan de acción personalizado para desarrollar tu Inteligencia Emocional paso a paso.',
      icon: <IconMap />,
    },
    {
      title: 'Tests adicionales',
      body: 'Accede a 10 tests de las 5 dimensiones de Goleman para profundizar en tu perfil.',
      icon: <IconEye />,
    },
    {
      title: 'Cursos de IE',
      body: 'Cursos completos sobre inteligencia emocional, comunicación, liderazgo y más.',
      icon: <IconHeart />,
    },
    {
      title: 'Certificados',
      body: 'Al completar los cursos recibirás un certificado descargable de InnerScore.',
      icon: <IconShield />,
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            Qué recibirás
          </h2>
          <p className="mt-3 text-[#64748b]">
            Todo lo que necesitas para entender y desarrollar tu inteligencia
            emocional.
          </p>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl bg-white p-6"
              style={{
                border: '1px solid #e8d5c8',
                boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
              }}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full text-white"
                style={{
                  backgroundColor: '#ea580c',
                  boxShadow: '0 8px 18px rgba(234,88,12,0.25)',
                }}
                aria-hidden
              >
                {item.icon}
              </span>
              <h3 className="font-display mt-5 text-lg font-bold text-[#0f172a]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-xl px-8 py-3 text-base font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: '#1d4ed8',
              boxShadow: '0 8px 24px rgba(29,78,216,0.35)',
            }}
          >
            Hacer el test gratuito
          </Link>
        </div>
      </div>
    </section>
  );
}

function PDFPreview() {
  const pages = [
    {
      label: 'Página 1',
      title: 'Puntuación de Autoconciencia',
      score: 78,
      color: '#1d4ed8',
      bars: [
        { label: 'Identificación emocional', value: 82 },
        { label: 'Autorreflexión', value: 74 },
        { label: 'Autoevaluación precisa', value: 79 },
      ],
    },
    {
      label: 'Página 2',
      title: 'Análisis de Empatía',
      score: 65,
      color: '#ea580c',
      bars: [
        { label: 'Empatía cognitiva', value: 70 },
        { label: 'Resonancia emocional', value: 61 },
        { label: 'Sintonía social', value: 64 },
      ],
    },
    {
      label: 'Página 3',
      title: 'Perfil de Autorregulación Emocional',
      score: 71,
      color: '#059669',
      bars: [
        { label: 'Control de impulsos', value: 68 },
        { label: 'Tolerancia al estrés', value: 75 },
        { label: 'Adaptabilidad', value: 70 },
      ],
    },
  ];

  return (
    <section
      className="py-20"
      style={{ backgroundColor: '#fdf6f0' }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            Lo que contienen tus resultados
          </h2>
          <p className="mt-3 text-[#64748b]">
            Un desglose detallado y basado en ciencia de tu inteligencia emocional.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pages.map((page) => (
            <ReportPageMockup key={page.title} {...page} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportPageMockup({
  label,
  title,
  score,
  color,
  bars,
}: {
  label: string;
  title: string;
  score: number;
  color: string;
  bars: { label: string; value: number }[];
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl shadow-md"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e8d5c8',
      }}
    >
      {/* PDF page header strip */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ backgroundColor: color }}
      >
        <span className="text-xs font-semibold text-white opacity-80">
          Informe InnerScore
        </span>
        <span className="text-xs font-medium text-white opacity-70">
          {label}
        </span>
      </div>

      <div className="p-5">
        {/* Section title */}
        <h3
          className="font-display text-base font-bold"
          style={{ color: '#0f172a' }}
        >
          {title}
        </h3>

        {/* Score ring placeholder */}
        <div className="my-4 flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {score}
          </div>
          <div>
            <p className="text-xs text-[#64748b]">Tu puntuación</p>
            <p className="text-sm font-semibold text-[#0f172a]">
              {score >= 75 ? 'Por encima de la media' : score >= 55 ? 'En la media' : 'Por debajo de la media'}
            </p>
          </div>
        </div>

        {/* Sub-dimension bars */}
        <div className="space-y-2">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="mb-1 flex justify-between text-xs text-[#64748b]">
                <span>{bar.label}</span>
                <span>{bar.value}</span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full"
                style={{ backgroundColor: '#e8d5c8' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${bar.value}%`, backgroundColor: color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder text lines */}
        <div className="mt-4 space-y-1.5">
          {[90, 75, 60].map((w) => (
            <div
              key={w}
              className="h-2 rounded-full"
              style={{ width: `${w}%`, backgroundColor: '#f1ebe5' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: 'Sara M.',
      age: 31,
      result: 'Puntuación IE: 84',
      quote:
        'Siempre me ha costado explicar por qué me bloqueo tanto en los conflictos. Mis resultados me mostraron que mi puntuación en Autorregulación era de 58, más baja de lo que esperaba. El plan de acción era lo bastante concreto como para usarlo en el trabajo esa misma semana.',
    },
    {
      name: 'Daniel R.',
      age: 27,
      result: 'Puntuación IE: 71',
      quote:
        'Lo hice con escepticismo, la verdad. Pero mi puntuación de Empatía salió en 63 y el desglose explicaba exactamente por qué a veces no percibo lo que sienten los demás. Me ha hecho replantear cómo escucho en las conversaciones.',
    },
    {
      name: 'Camila T.',
      age: 38,
      result: 'Puntuación IE: 91',
      quote:
        'En general saqué buena puntuación, pero mi dimensión de Autoconciencia se quedó en 69. El análisis identificaba un patrón que yo no había nombrado antes. Se lo enseñé a mi terapeuta y me dijo que era una de las autoevaluaciones más útiles que había visto traer a una consulta.',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            Resultados reales, personas reales
          </h2>
          <p className="mt-3 text-[#64748b]">
            Esto es lo que otras personas descubrieron sobre sí mismas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  age,
  result,
  quote,
}: {
  name: string;
  age: number;
  result: string;
  quote: string;
}) {
  return (
    <div
      className="flex flex-col rounded-2xl p-6"
      style={{
        backgroundColor: '#fdf6f0',
        border: '1px solid #e8d5c8',
      }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 text-[#ea580c]" aria-label="5 estrellas">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar key={i} />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[#374151]">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#0f172a]">{name}, {age}</p>
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium text-[#1d4ed8]"
          style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}
        >
          {result}
        </span>
      </div>
    </div>
  );
}

function IconStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ── What You'll Get icons ──────────────────────────────────────────────────────

function IconChart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

function IconInbox() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

// ── Hero icons (kept from original) ───────────────────────────────────────────

function IconUsers() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg
      width="18"
      height="18"
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
