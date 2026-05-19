'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateScores, getDimensionLabel } from '@/lib/scoring';
import type { QuizAnswer, QuizResult } from '@/types';
import Header from '../components/Header';

type Session = { email: string; answers: QuizAnswer[] };

const DIMENSION_COLORS: Record<string, string> = {
  'self-awareness': '#1d4ed8',
  'self-regulation': '#1d4ed8',
  motivation: '#0f172a',
  empathy: '#dc2626',
  'social-skills': '#0f172a',
};

const RING_RADIUS = 90;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type Notice = { flag: string; name: string; archetype: string };

const NOTICES: Notice[] = [
  { flag: '🇪🇸', name: 'María', archetype: 'El Líder' },
  { flag: '🇪🇸', name: 'Carlos', archetype: 'El Empático' },
  { flag: '🇲🇽', name: 'Ana', archetype: 'El Visionario' },
  { flag: '🇦🇷', name: 'Pablo', archetype: 'El Guardián' },
  { flag: '🇪🇸', name: 'Laura', archetype: 'El Ancla' },
];

const HERO_BENEFITS = [
  {
    title: 'Descubre tu perfil emocional exacto',
    body: 'Conoce en profundidad cómo procesas y gestionas tus emociones en cada área de tu vida.',
  },
  {
    title: 'Identifica tus fortalezas y áreas de mejora',
    body: 'Entiende con claridad en qué dimensiones destacas y dónde puedes crecer.',
  },
  {
    title: 'Mejora tus relaciones personales y profesionales',
    body: 'Aprende a conectar de forma más profunda y eficaz con las personas que te rodean.',
  },
];

const WHAT_YOU_GET = [
  { emoji: '📋', text: 'Informe de IE personalizado de 15 páginas' },
  { emoji: '🧠', text: 'Análisis de tus 5 dimensiones emocionales (Goleman)' },
  { emoji: '📈', text: 'Plan de desarrollo personal de 90 días' },
  { emoji: '💼', text: 'Estrategias de IE aplicadas al trabajo y relaciones' },
  { emoji: '🏅', text: 'Acciones diarias personalizadas a tu arquetipo' },
];

const ENDORSEMENTS = [
  'Universidad Complutense',
  'Daniel Goleman',
  'Psychology Today',
  'Muy Interesante',
];

const TESTIMONIALS = [
  {
    text: 'Jamás pensé que un test pudiera describirme tan bien. El informe me ayudó a entender por qué reacciono así en situaciones de estrés.',
    author: 'Marta R., Madrid',
  },
  {
    text: 'Era escéptico al principio, pero la precisión me sorprendió. He mejorado mucho cómo gestiono los conflictos en el trabajo.',
    author: 'Alejandro V., Barcelona',
  },
  {
    text: 'Lo compartí con toda mi familia. Descubrir mi arquetipo emocional fue un antes y un después.',
    author: 'Lucía M., Valencia',
  },
];

const REPORT_COUNT_START = 47800;
const REPORT_COUNT_END = 47832;
const REPORT_COUNT_DURATION_MS = 1500;
const NOTIFICATION_INTERVAL_MS = 4000;
const NOTIFICATION_FADE_MS = 400;

export default function ResultPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [animated, setAnimated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifIndex, setNotifIndex] = useState(0);
  const [notifVisible, setNotifVisible] = useState(true);
  const [reportCount, setReportCount] = useState(REPORT_COUNT_START);
  const [showSticky, setShowSticky] = useState(false);
  const [socialIndex, setSocialIndex] = useState(0);
  const priceRef = useRef<HTMLElement | null>(null);
  const priceRefSecond = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('innerscore_session');
    if (!raw) {
      router.replace('/quiz');
      return;
    }
    try {
      const parsed: Session = JSON.parse(raw);
      if (!parsed?.answers?.length) {
        router.replace('/quiz');
        return;
      }
      setSession(parsed);
      setResult(calculateScores(parsed.answers));
      setLoading(false);
      requestAnimationFrame(() => setAnimated(true));
    } catch {
      router.replace('/quiz');
    }
  }, [router]);

  useEffect(() => {
    if (loading) return;
    const tick = setInterval(() => {
      setNotifVisible(false);
      setTimeout(() => {
        setNotifIndex((i) => (i + 1) % NOTICES.length);
        setNotifVisible(true);
      }, NOTIFICATION_FADE_MS);
    }, NOTIFICATION_INTERVAL_MS);
    return () => clearInterval(tick);
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const tick = setInterval(() => {
      setSocialIndex((i) => (i + 1) % NOTICES.length);
    }, NOTIFICATION_INTERVAL_MS);
    return () => clearInterval(tick);
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    let raf = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / REPORT_COUNT_DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(
        REPORT_COUNT_START + (REPORT_COUNT_END - REPORT_COUNT_START) * eased,
      );
      setReportCount(value);
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const first = priceRef.current;
    const second = priceRefSecond.current;
    if (!first) return;

    const visibility = { first: false, second: false, pastFirst: false };

    const update = () => {
      const shouldShow = visibility.pastFirst && !visibility.first && !visibility.second;
      setShowSticky(shouldShow);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === first) {
            visibility.first = entry.isIntersecting;
            if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) {
              visibility.pastFirst = true;
            }
          } else if (entry.target === second) {
            visibility.second = entry.isIntersecting;
          }
        }
        update();
      },
      { threshold: 0 },
    );
    observer.observe(first);
    if (second) observer.observe(second);
    return () => observer.disconnect();
  }, [loading]);

  const handleCheckout = () => {
    if (!session || !result) return;
    router.push('/checkout');
  };

  if (loading || !result) {
    return <main className="min-h-dvh bg-[#fdf6f0]" />;
  }

  const ringOffset = animated
    ? RING_CIRCUMFERENCE * (1 - result.totalScore / 100)
    : RING_CIRCUMFERENCE;

  const currentNotice = NOTICES[notifIndex];
  const visibleSocial = [
    NOTICES[socialIndex % NOTICES.length],
    NOTICES[(socialIndex + 1) % NOTICES.length],
    NOTICES[(socialIndex + 2) % NOTICES.length],
  ];

  return (
    <>
      <Header />

      {/* 2. ROTATING TOP BAR — sticky below the header */}
      <div
        className="sticky top-0 z-40"
        style={{ backgroundColor: '#0f172a' }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-center gap-2 px-6 py-2 text-xs text-white md:text-sm">
          <span className="relative flex h-2 w-2 shrink-0">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
              style={{ backgroundColor: '#22c55e' }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: '#22c55e' }}
            />
          </span>
          <span
            className="truncate text-center"
            style={{
              opacity: notifVisible ? 1 : 0,
              transition: `opacity ${NOTIFICATION_FADE_MS}ms ease-in-out`,
            }}
          >
            <span className="mr-1.5" aria-hidden>{currentNotice.flag}</span>
            {currentNotice.name} acaba de obtener su informe. Arquetipo:{' '}
            <span className="font-semibold">{currentNotice.archetype}</span>
          </span>
        </div>
      </div>

      <main className="bg-[#fdf6f0]">
        {/* 3. HERO */}
        <section className="bg-[#fdf6f0]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2 md:items-center md:gap-16 md:py-20">
            <div>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  border: '1px solid #fed7aa',
                  color: '#ea580c',
                }}
              >
                Tu informe está listo
              </span>
              <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-[#0f172a] md:text-5xl">
                ¡Tu informe de Inteligencia Emocional está listo!
              </h1>

              <ul className="mt-8 flex flex-col gap-4">
                {HERO_BENEFITS.map((b) => (
                  <li key={b.title} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: '#22c55e' }}
                      aria-hidden
                    >
                      <CheckIcon />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0f172a] md:text-base">
                        {b.title}
                      </p>
                      <p className="mt-1 text-sm text-[#64748b]">{b.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div
                className="mt-8 flex gap-3 rounded-2xl p-4"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e8d5c8',
                }}
              >
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: '#1d4ed8' }}
                  aria-hidden
                >
                  <InfoIcon />
                </span>
                <div className="text-sm leading-relaxed text-[#0f172a]">
                  <p>
                    Para acceder a tu informe completo de Inteligencia Emocional
                    es necesario completar una evaluación personalizada.
                  </p>
                  <p className="mt-2 text-[#64748b]">
                    El análisis detallado de tus 5 dimensiones requiere un
                    procesamiento adicional sujeto a esta tarifa de acceso.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: blurred score visualization */}
            <div
              className="relative rounded-3xl bg-white p-6 md:p-8"
              style={{
                border: '1px solid #e8d5c8',
                boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
              }}
            >
              <p className="text-center text-[11px] font-medium uppercase tracking-widest text-[#1d4ed8]">
                Vista previa de tu perfil
              </p>

              <div className="mt-6 flex flex-col items-center">
                <div className="relative h-48 w-48">
                  <svg
                    viewBox="0 0 200 200"
                    className="h-full w-full -rotate-90"
                    aria-hidden
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r={RING_RADIUS}
                      stroke="#e2e8f0"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r={RING_RADIUS}
                      stroke="#1d4ed8"
                      strokeWidth="10"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={RING_CIRCUMFERENCE}
                      strokeDashoffset={ringOffset}
                      style={{
                        transition:
                          'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="font-display text-5xl font-bold text-[#0f172a] select-none"
                      style={{ filter: 'blur(8px)' }}
                      aria-hidden
                    >
                      {result.totalScore}
                    </span>
                    <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-[#64748b]">
                      Puntuación global de IE
                    </span>
                  </div>
                </div>

                <p
                  className="font-display mt-5 text-2xl font-bold italic text-[#0f172a] select-none"
                  style={{ filter: 'blur(6px)' }}
                  aria-hidden
                >
                  {result.archetype}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {result.dimensions.map((d) => {
                  const pct = d.max === 0 ? 0 : (d.score / d.max) * 100;
                  const color = DIMENSION_COLORS[d.name] ?? '#1d4ed8';
                  return (
                    <div key={d.name}>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="font-medium text-[#0f172a]">
                          {getDimensionLabel(d.name)}
                        </span>
                        <span
                          className="tabular-nums text-[#64748b] select-none"
                          style={{ filter: 'blur(4px)' }}
                          aria-hidden
                        >
                          {d.score} / {d.max}
                        </span>
                      </div>
                      <div
                        className="mt-1.5 w-full overflow-hidden rounded-full"
                        style={{ height: '7px', backgroundColor: '#e2e8f0' }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: animated ? `${pct}%` : '0%',
                            backgroundColor: color,
                            filter: 'blur(2px)',
                            transition:
                              'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="pointer-events-none absolute inset-x-6 bottom-6 flex items-center justify-center"
              >
                <div
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2"
                  style={{
                    border: '1px solid #e8d5c8',
                    boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
                  }}
                >
                  <LockIcon />
                  <span className="text-xs font-medium text-[#0f172a]">
                    Datos bloqueados
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FIRST PURCHASE BLOCK */}
        <PurchaseBlock
          refProp={priceRef}
          reportCount={reportCount}
          onCheckout={handleCheckout}
        />

        {/* 5. WHAT YOU'LL RECEIVE */}
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <h2 className="font-display text-center text-3xl font-bold text-[#0f172a] md:text-4xl">
              Lo que recibirás
            </h2>
            <p className="mt-3 text-center text-[#64748b]">
              Todo lo necesario para entender y desarrollar tu inteligencia emocional.
            </p>

            <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {WHAT_YOU_GET.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-4 rounded-2xl p-5"
                  style={{
                    backgroundColor: '#fdf6f0',
                    border: '1px solid #e8d5c8',
                  }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e8d5c8',
                    }}
                    aria-hidden
                  >
                    {item.emoji}
                  </span>
                  <span className="pt-1.5 text-sm font-medium text-[#0f172a]">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. ENDORSED BY */}
        <section className="bg-[#fdf6f0]">
          <div className="mx-auto max-w-5xl px-6 py-12 text-center md:py-16">
            <p className="text-sm text-[#64748b]">
              Basado en investigación científica avalada por:
            </p>
            <p className="font-display mt-3 text-lg font-bold text-[#0f172a] md:text-xl">
              {ENDORSEMENTS.join('  ·  ')}
            </p>
          </div>
        </section>

        {/* 7. TESTIMONIALS */}
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
                Valorado con 4,8/5 por nuestros usuarios
              </h2>
              <div className="mt-3 flex items-center justify-center gap-1 text-[#ea580c]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.author}
                  className="flex flex-col rounded-2xl p-6"
                  style={{
                    backgroundColor: '#fdf6f0',
                    border: '1px solid #e8d5c8',
                  }}
                >
                  <div className="flex gap-0.5 text-[#ea580c]" aria-label="5 estrellas">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#0f172a]">
                    {`“${t.text}”`}
                  </p>
                  <p className="mt-5 text-xs font-medium text-[#64748b]">
                    — {t.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. SOCIAL PROOF MASIVO */}
        <section className="bg-[#fdf6f0]">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
                Más de 50.000 personas en España ya conocen su IE
              </h2>
              <p className="mt-3 text-sm text-[#64748b]">
                Últimos informes generados
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {visibleSocial.map((s, i) => (
                <div
                  key={`${s.name}-${socialIndex}-${i}`}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5"
                  style={{
                    border: '1px solid #e8d5c8',
                    animation: 'innerscoreFadeIn 600ms ease-out',
                  }}
                >
                  <span className="text-3xl" aria-hidden>
                    {s.flag}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0f172a]">
                      {s.name}
                    </p>
                    <p className="text-xs text-[#64748b]">
                      Arquetipo:{' '}
                      <span className="font-display font-bold italic text-[#0f172a]">
                        {s.archetype}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <style jsx>{`
              @keyframes innerscoreFadeIn {
                from {
                  opacity: 0;
                  transform: translateY(8px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </div>
        </section>

        {/* 9. SECOND PURCHASE BLOCK */}
        <PurchaseBlock
          refProp={priceRefSecond}
          reportCount={reportCount}
          onCheckout={handleCheckout}
        />
      </main>

      {/* 10. STICKY BOTTOM BANNER */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 bg-white"
        style={{
          borderTop: '1px solid #e8d5c8',
          transform: showSticky ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 300ms ease',
          boxShadow: '0 -8px 20px rgba(15,23,42,0.08)',
        }}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 md:gap-6 md:px-6">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#0f172a]">
              Tu informe está listo
            </p>
            <p className="hidden text-xs text-[#64748b] md:block">
              3,00 € · 7 días de acceso completo
            </p>
            <p className="text-xs text-[#64748b] md:hidden">
              3,00 € · 7 días
            </p>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            className="shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
            style={{
              backgroundColor: '#ea580c',
              boxShadow: '0 8px 20px rgba(234,88,12,0.35)',
            }}
          >
            Obtener ahora
          </button>
        </div>
      </div>
    </>
  );
}

function PurchaseBlock({
  refProp,
  reportCount,
  onCheckout,
}: {
  refProp: React.MutableRefObject<HTMLElement | null>;
  reportCount: number;
  onCheckout: () => void;
}) {
  return (
    <section
      ref={refProp}
      className="bg-[#fdf6f0]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
              Desbloquea tu Inteligencia Emocional
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#64748b] md:text-base">
              Accede al informe completo, descubre tu arquetipo emocional y empieza
              tu plan de desarrollo personal de 90 días.
            </p>

            <div
              className="mt-8 inline-flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e8d5c8',
              }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: '#22c55e' }}
                aria-hidden
              >
                <PulseIcon />
              </span>
              <div>
                <p className="font-display text-2xl font-bold tabular-nums text-[#0f172a]">
                  {reportCount.toLocaleString('es-ES')}
                </p>
                <p className="text-xs text-[#64748b]">informes generados hoy</p>
              </div>
            </div>
          </div>

          {/* Offer card */}
          <div
            className="relative overflow-hidden rounded-3xl bg-white p-7 md:p-8"
            style={{
              border: '1px solid #e8d5c8',
              boxShadow: '0 20px 40px rgba(15,23,42,0.08)',
            }}
          >
            <span
              className="absolute right-5 top-5 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
              style={{
                backgroundColor: 'rgba(34,197,94,0.12)',
                color: '#15803d',
              }}
            >
              Oferta de hoy
            </span>

            <h3 className="font-display pr-24 text-xl font-bold text-[#0f172a] md:text-2xl">
              Informe IE completo + Plan de desarrollo 90 días
            </h3>
            <p className="mt-2 text-sm text-[#64748b]">
              Acceso completo durante 7 días
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span
                className="font-display text-5xl font-bold md:text-6xl"
                style={{ color: '#15803d' }}
              >
                3,00 €
              </span>
              <span className="text-sm text-[#94a3b8] line-through tabular-nums">
                39,99 €
              </span>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="mt-7 w-full rounded-xl px-6 py-5 text-base font-semibold text-white transition-transform hover:scale-[1.01] md:text-lg"
              style={{
                backgroundColor: '#ea580c',
                boxShadow: '0 12px 28px rgba(234,88,12,0.4)',
              }}
            >
              Obtener mi informe ahora
            </button>

            <ul className="mt-5 flex flex-col gap-2 text-sm text-[#0f172a]">
              <li className="flex items-center gap-2">
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: '#22c55e' }}
                  aria-hidden
                >
                  <CheckIcon small />
                </span>
                <span>Garantía de satisfacción de 30 días</span>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden>🔒</span>
                <span>100% seguro · Cancela cuando quieras</span>
              </li>
            </ul>

            <p className="mt-5 text-center text-xs text-[#94a3b8]">
              Tras los 7 días, 39,99€/mes. Cancela en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ small = false }: { small?: boolean }) {
  const size = small ? 12 : 14;
  return (
    <svg
      width={size}
      height={size}
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

function LockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1d4ed8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
