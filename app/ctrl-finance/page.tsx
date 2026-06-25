import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ctrl.finance — Toma el control de tus gastos',
  description:
    'Visualiza todos tus gastos, detecta suscripciones que ya no usas y cancélalas en segundos. Ahorra una media de 47 € al mes.',
};

export default function CtrlFinancePage() {
  return (
    <div className="min-h-dvh bg-[#FAFBFC] text-[#1a1a2e]">
      <Nav />
      <Hero />
      <Pain />
      <Benefits />
      <HowItWorks />
      <SocialProof />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5 md:px-10">
      <div className="text-[1.4rem] font-extrabold tracking-[-0.5px] text-[#1a1a2e]">
        ctrl<span className="text-[#0ea575]">.</span>finance
      </div>
      <a
        href="#cta"
        className="rounded-full bg-[#0ea575] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#0c8f64]"
      >
        Empezar ahora
      </a>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { number: '47€', label: 'ahorro medio al mes' },
  { number: '3 min', label: 'para empezar' },
  { number: '12.4k', label: 'suscripciones canceladas' },
];

function Hero() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-16 pt-16 text-center md:px-10 md:pb-[60px] md:pt-20">
      <span className="mb-7 inline-block rounded-full bg-[#e8f5ef] px-5 py-2 text-[0.85rem] font-semibold text-[#0ea575]">
        💡 Más de 2.000 personas ya tienen el control
      </span>

      <h1 className="mx-auto mb-5 text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.12] tracking-[-1.5px] text-[#1a1a2e]">
        Toma el control total
        <br />
        de{' '}
        <span className="bg-gradient-to-br from-[#0ea575] to-[#0bbf8a] bg-clip-text text-transparent">
          tus gastos
        </span>
      </h1>

      <p className="mx-auto mb-9 max-w-[560px] text-[1.2rem] leading-[1.7] text-[#5a5a7a]">
        Deja de adivinar a dónde va cada euro. Visualiza todos tus gastos,
        detecta suscripciones que ya no usas y cancélalas sin perder ni un
        minuto.
      </p>

      <a
        href="#cta"
        className="inline-block rounded-full bg-[#0ea575] px-10 py-4 text-[1.05rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0c8f64]"
        style={{ boxShadow: '0 4px 20px rgba(14,165,117,0.3)' }}
      >
        Quiero tomar el control →
      </a>
      <p className="mt-3.5 text-[0.85rem] text-[#8a8aaa]">
        Sin permanencia · Cancela cuando quieras
      </p>

      <div className="mx-auto mt-10 flex max-w-[900px] flex-wrap justify-center gap-x-[60px] gap-y-8 px-5 py-10">
        {HERO_STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-[2.2rem] font-extrabold text-[#0ea575]">
              {stat.number}
            </div>
            <div className="mt-1 text-[0.85rem] text-[#8a8aaa]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section heading helpers ───────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 text-center text-[0.85rem] font-semibold uppercase tracking-[2px] text-[#0ea575]">
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-[50px] text-center text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold tracking-[-1px] text-[#1a1a2e]">
      {children}
    </h2>
  );
}

// ── Pain ──────────────────────────────────────────────────────────────────────

const PAINS = [
  {
    icon: '😤',
    iconBg: '#fef2f2',
    title: 'Cobros que no reconoces',
    body: 'Cada mes aparecen cargos en tu cuenta que no recuerdas haber contratado. Al final, los ignoras y sigues pagando.',
  },
  {
    icon: '⏰',
    iconBg: '#fff7ed',
    title: 'Cancelar es un infierno',
    body: 'Quieres darte de baja pero te obligan a llamar, buscar un formulario escondido o enviar un email que nadie contesta.',
  },
  {
    icon: '🫣',
    iconBg: '#fefce8',
    title: 'No sabes cuánto gastas realmente',
    body: 'Tienes una idea aproximada, pero nunca un número exacto. Y cuando lo calculas, el susto es considerable.',
  },
];

function Pain() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20 md:px-10">
      <SectionLabel>Problemas</SectionLabel>
      <SectionTitle>¿Te suena alguno de estos?</SectionTitle>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {PAINS.map((pain) => (
          <div
            key={pain.title}
            className="rounded-2xl bg-white px-7 py-9 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
            style={{ border: '1px solid #eef0f4' }}
          >
            <div
              className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] text-[1.5rem]"
              style={{ backgroundColor: pain.iconBg }}
            >
              {pain.icon}
            </div>
            <h3 className="mb-2.5 text-[1.15rem] font-bold text-[#1a1a2e]">
              {pain.title}
            </h3>
            <p className="text-[0.95rem] leading-[1.6] text-[#6b6b8a]">
              {pain.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Benefits ──────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    title: 'Ve a dónde va cada euro',
    body: 'Todos tus gastos y suscripciones en un solo lugar, organizados y claros. Sin sorpresas a final de mes.',
  },
  {
    title: 'Detecta lo que ya no necesitas',
    body: 'Identifica al instante las suscripciones que llevas meses sin usar y que siguen cobrándote en silencio.',
  },
  {
    title: 'Cancela sin llamadas ni formularios',
    body: 'Genera y envía tu carta de cancelación en segundos. Nosotros nos encargamos del proceso, tú del ahorro.',
  },
  {
    title: 'Alertas antes de cada cobro',
    body: 'Recibe un aviso antes de que se renueve cualquier servicio. Tú decides si continúas o lo cortas a tiempo.',
  },
  {
    title: 'Tu dinero, tus reglas',
    body: 'Establece presupuestos, marca objetivos y mira cómo retomas el control mes a mes. Sin complicaciones.',
  },
  {
    title: '100% privado y seguro',
    body: 'Tus datos financieros están cifrados y nunca se comparten con terceros. Tu privacidad es innegociable.',
  },
];

function Benefits() {
  return (
    <section className="bg-white px-5 py-20 md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <SectionLabel>Soluciones</SectionLabel>
        <SectionTitle>Recupera la tranquilidad con tus finanzas</SectionTitle>
        <div className="mt-[50px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-5">
              <div className="mt-0.5 flex h-9 w-9 min-w-9 items-center justify-center rounded-[10px] bg-[#e8f5ef] text-[1.1rem] font-bold text-[#0ea575]">
                ✓
              </div>
              <div>
                <h4 className="mb-1.5 text-[1.05rem] font-bold text-[#1a1a2e]">
                  {benefit.title}
                </h4>
                <p className="text-[0.9rem] leading-[1.6] text-[#6b6b8a]">
                  {benefit.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How it works ──────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: 1,
    title: 'Regístrate',
    body: 'Crea tu cuenta en menos de un minuto. Solo necesitas un email.',
  },
  {
    n: 2,
    title: 'Descubre',
    body: 'Añade tus gastos y suscripciones. Verás el panorama completo al instante.',
  },
  {
    n: 3,
    title: 'Actúa',
    body: 'Cancela lo que no necesitas, ajusta tus gastos y empieza a ahorrar desde hoy.',
  },
];

function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20 md:px-10">
      <SectionLabel>Así de fácil</SectionLabel>
      <SectionTitle>Tres pasos y listo</SectionTitle>
      <div className="mt-[50px] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
        {STEPS.map((step) => (
          <div key={step.n} className="px-6 py-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0ea575] to-[#0bbf8a] text-[1.3rem] font-extrabold text-white">
              {step.n}
            </div>
            <h3 className="mb-2 text-[1.1rem] font-bold text-[#1a1a2e]">
              {step.title}
            </h3>
            <p className="text-[0.9rem] leading-[1.6] text-[#6b6b8a]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Social proof ──────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      'Descubrí que pagaba 3 servicios de streaming que ni recordaba. En 5 minutos los cancelé y ahorro 35€ al mes.',
    author: 'Laura M.',
    city: 'Madrid',
  },
  {
    quote:
      'Por fin sé exactamente cuánto gasto al mes. La tranquilidad de tener todo controlado no tiene precio.',
    author: 'Carlos R.',
    city: 'Barcelona',
  },
  {
    quote:
      'Lo mejor es la carta de cancelación automática. Antes perdía horas intentando darme de baja de servicios.',
    author: 'Marta S.',
    city: 'Valencia',
  },
];

function SocialProof() {
  return (
    <section className="bg-[#f0faf5] px-5 py-20 md:px-10">
      <div className="mx-auto max-w-[1000px]">
        <SectionLabel>Opiniones reales</SectionLabel>
        <SectionTitle>Lo que dicen quienes ya tienen el control</SectionTitle>
        <div className="mt-[50px] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="rounded-2xl bg-white p-8"
              style={{ border: '1px solid #e0efe8' }}
            >
              <div
                className="mb-3.5 text-[1rem] text-[#f59e0b]"
                style={{ letterSpacing: '2px' }}
                aria-label="5 estrellas"
              >
                ★★★★★
              </div>
              <p className="mb-4 text-[0.95rem] italic leading-[1.7] text-[#4a4a6a]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="text-[0.85rem] font-semibold text-[#1a1a2e]">
                {t.author} <span className="font-normal text-[#8a8aaa]">· {t.city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section id="cta" className="mx-auto max-w-[1200px] px-5 py-20 text-center md:px-10">
      <div className="rounded-[24px] bg-gradient-to-br from-[#0ea575] to-[#0bbf8a] px-6 py-[60px] text-white md:px-10">
        <h2 className="mb-3.5 text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.5px]">
          Empieza hoy a controlar tu dinero
        </h2>
        <p className="mx-auto mb-[30px] max-w-[480px] text-[1.05rem] leading-[1.6] opacity-90">
          Deja de regalar tu dinero a suscripciones que no usas. Toma una
          decisión que tu yo del futuro agradecerá.
        </p>
        <div className="text-[2.8rem] font-extrabold">
          4,99€
          <span className="text-[1rem] font-medium opacity-80">/mes</span>
        </div>
        <div className="mb-7 text-[0.9rem] opacity-80">
          Menos de lo que cuesta el café que te tomas sin pensar
        </div>
        <a
          href="#"
          className="inline-block rounded-full bg-white px-11 py-4 text-[1.05rem] font-bold text-[#0ea575] transition-all hover:-translate-y-0.5"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
        >
          Quiero el control →
        </a>
        <div className="mt-4 text-[0.85rem] opacity-80">
          🔒 14 días de garantía de devolución · Sin permanencia
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function SiteFooter() {
  return (
    <footer
      className="p-10 text-center text-[0.82rem] text-[#8a8aaa]"
      style={{ borderTop: '1px solid #eef0f4' }}
    >
      © 2026 ctrl.finance — Todos los derechos reservados ·{' '}
      <a href="#" className="text-[#8a8aaa] hover:underline">
        Política de privacidad
      </a>{' '}
      ·{' '}
      <a href="#" className="text-[#8a8aaa] hover:underline">
        Términos
      </a>
    </footer>
  );
}
