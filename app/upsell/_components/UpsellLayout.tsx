'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export type UpsellBenefit = { title: string; description: string };
export type UpsellModule = { icon: string; title: string; description: string };
export type UpsellTestimonial = {
  name: string;
  profession: string;
  quote: string;
};

export type UpsellContent = {
  slot: 1 | 2 | 3;
  productTitle: string;
  shortDescription: string;
  whyImportantHeading: string;
  whyImportantParagraph: string;
  benefits: UpsellBenefit[];
  whatIsIncludedHeading: string;
  modules: UpsellModule[];
  testimonials: UpsellTestimonial[];
  mockup: React.ReactNode;
};

const ORIGINAL_PRICE_LABEL = '9,99 €';
const SPECIAL_PRICE_LABEL = '0,99 €';

export default function UpsellLayout(props: UpsellContent) {
  return (
    <Suspense fallback={<main className="min-h-dvh bg-[#fdf6f0]" />}>
      <UpsellLayoutInner {...props} />
    </Suspense>
  );
}

function UpsellLayoutInner({
  slot,
  productTitle,
  shortDescription,
  whyImportantHeading,
  whyImportantParagraph,
  benefits,
  whatIsIncludedHeading,
  modules,
  testimonials,
  mockup,
}: UpsellContent) {
  const router = useRouter();
  const params = useSearchParams();
  const pi = params.get('pi');
  const email = params.get('email');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goNext = () => {
    const query = new URLSearchParams();
    if (pi) query.set('pi', pi);
    if (email) query.set('email', email);
    const qs = query.toString();
    const suffix = qs ? `?${qs}` : '';
    if (slot < 3) {
      router.push(`/upsell/${slot + 1}${suffix}`);
    } else {
      router.push(`/upsell/resumen${suffix}`);
    }
  };

  const handleAccept = async () => {
    if (!pi) {
      setError('Falta el identificador del pago. Vuelve a intentarlo.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/upsell/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pi, slot }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'No se pudo añadir el producto');
      }
      goNext();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'No se pudo añadir el producto';
      setError(message);
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (submitting) return;
    goNext();
  };

  return (
    <main className="min-h-dvh bg-[#fdf6f0]">
      {/* HEADER with logo + 3-step indicator */}
      <header
        className="bg-white"
        style={{ borderBottom: '1px solid #e8d5c8' }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:py-5">
          <Link href="/" className="text-xl">
            <span className="font-display font-bold italic text-[#0f172a]">
              Inner
            </span>
            <span className="font-semibold text-[#1d4ed8]">Score</span>
          </Link>
          <StepIndicator current={2} />
        </div>
      </header>

      {/* URGENCY BANNER */}
      <div style={{ backgroundColor: '#fee2e2' }}>
        <div className="mx-auto max-w-6xl px-6 py-3 text-center">
          <p className="text-sm font-bold text-[#991b1b] md:text-base">
            ¡Espera! ¡Tu pedido no está completo!
          </p>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-[#fdf6f0]">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
            <div>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
                style={{
                  backgroundColor: 'rgba(234,88,12,0.12)',
                  color: '#c2410c',
                }}
              >
                Oferta exclusiva post-pedido
              </span>
              <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-[#0f172a] md:text-4xl">
                {productTitle}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#64748b]">
                {shortDescription}
              </p>

              <PriceBlock />

              <CtaBlock
                submitting={submitting}
                onAccept={handleAccept}
                onSkip={handleSkip}
              />

              {error ? (
                <p className="mt-4 text-sm text-[#dc2626]" role="alert">
                  {error}
                </p>
              ) : null}
            </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                {mockup}
                <span
                  className="absolute -right-3 -top-3 inline-flex h-16 w-16 rotate-12 items-center justify-center rounded-full text-xs font-bold uppercase tracking-wider text-white"
                  style={{
                    backgroundColor: '#dc2626',
                    boxShadow: '0 8px 20px rgba(220,38,38,0.35)',
                  }}
                >
                  Oferta
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "POR QUÉ ES IMPORTANTE" */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <h2 className="font-display text-center text-3xl font-bold text-[#0f172a] md:text-4xl">
            {whyImportantHeading}
          </h2>
          <p className="mt-6 text-center text-base leading-relaxed text-[#64748b] md:text-lg">
            {whyImportantParagraph}
          </p>

          <ul className="mt-10 flex flex-col gap-4">
            {benefits.map((b) => (
              <li
                key={b.title}
                className="flex items-start gap-4 rounded-2xl p-5"
                style={{
                  backgroundColor: '#fdf6f0',
                  border: '1px solid #e8d5c8',
                }}
              >
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: '#22c55e' }}
                  aria-hidden
                >
                  <CheckIcon />
                </span>
                <p className="text-sm leading-relaxed text-[#0f172a] md:text-base">
                  <strong className="font-semibold">{b.title}:</strong>{' '}
                  <span className="text-[#64748b]">{b.description}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TWO-COLUMN: TESTIMONIOS (left) + MODULES (right) */}
      <section className="bg-[#fdf6f0]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* LEFT: Testimonials */}
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
                Lo que dicen quienes ya la usan
              </h2>
              <div className="mt-3 flex items-center gap-1 text-[#ea580c]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
                <span className="ml-2 text-sm font-medium text-[#64748b]">
                  Valorado con 5/5
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-5">
                {testimonials.map((t) => (
                  <article
                    key={t.name}
                    className="rounded-2xl bg-white p-6"
                    style={{ border: '1px solid #e8d5c8' }}
                  >
                    <div
                      className="flex gap-0.5 text-[#ea580c]"
                      aria-label="5 estrellas"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#0f172a]">
                      {`“${t.quote}”`}
                    </p>
                    <p className="mt-4 text-xs font-medium text-[#0f172a]">
                      {t.name}
                      <span className="font-normal text-[#64748b]">
                        {' '}
                        — {t.profession}
                      </span>
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* RIGHT: Modules */}
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
                {whatIsIncludedHeading}
              </h2>
              <p className="mt-3 text-sm text-[#64748b]">
                5 módulos diseñados para acompañarte paso a paso.
              </p>

              <ol className="mt-8 flex flex-col gap-4">
                {modules.map((m, i) => (
                  <li
                    key={m.title}
                    className="flex items-start gap-4 rounded-2xl bg-white p-5"
                    style={{ border: '1px solid #e8d5c8' }}
                  >
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
                      style={{
                        backgroundColor: '#fdf6f0',
                        border: '1px solid #e8d5c8',
                      }}
                      aria-hidden
                    >
                      {m.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0f172a] md:text-base">
                        <span className="font-display mr-1 italic text-[#1d4ed8]">
                          {i + 1}.
                        </span>
                        {m.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">
                        {m.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* REPEAT PRICE + CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              backgroundColor: '#fdf6f0',
              border: '1px solid #e8d5c8',
              boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
            }}
          >
            <h2 className="font-display text-center text-2xl font-bold text-[#0f172a] md:text-3xl">
              Añade esta guía a tu pedido
            </h2>
            <p className="mt-3 text-center text-sm text-[#64748b]">
              Sólo disponible ahora — antes de finalizar tu pedido.
            </p>

            <PriceBlock centered />

            <CtaBlock
              submitting={submitting}
              onAccept={handleAccept}
              onSkip={handleSkip}
            />

            {error ? (
              <p className="mt-4 text-center text-sm text-[#dc2626]" role="alert">
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function PriceBlock({ centered = false }: { centered?: boolean }) {
  return (
    <div
      className={`mt-7 flex flex-col gap-1 ${
        centered ? 'items-center text-center' : 'items-start'
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span className="text-base text-[#94a3b8] line-through">
          {ORIGINAL_PRICE_LABEL}
        </span>
        <span
          className="font-display text-5xl font-bold md:text-6xl"
          style={{ color: '#15803d' }}
        >
          {SPECIAL_PRICE_LABEL}
        </span>
      </div>
      <p className="text-xs font-medium uppercase tracking-widest text-[#64748b]">
        Pago único
      </p>
    </div>
  );
}

function CtaBlock({
  submitting,
  onAccept,
  onSkip,
}: {
  submitting: boolean;
  onAccept: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="mt-7 flex flex-col gap-3">
      <button
        type="button"
        onClick={onAccept}
        disabled={submitting}
        className="w-full rounded-xl px-6 py-5 text-base font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 md:text-lg"
        style={{
          backgroundColor: '#ea580c',
          boxShadow: '0 12px 28px rgba(234,88,12,0.4)',
        }}
      >
        {submitting ? 'Añadiendo…' : 'Añadir al pedido'}
      </button>
      <button
        type="button"
        onClick={onSkip}
        disabled={submitting}
        className="w-full rounded-xl px-6 py-4 text-sm font-medium text-[#64748b] transition-colors hover:bg-[#f1ebe5] hover:text-[#0f172a] disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #e8d5c8',
        }}
      >
        Saltar
      </button>
    </div>
  );
}

function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: 'Pedido realizado' },
    { n: 2, label: 'Oferta especial' },
    { n: 3, label: 'Resumen del pedido' },
  ] as const;

  return (
    <ol className="flex items-center gap-2 md:gap-3">
      {steps.map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <li key={s.n} className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-2">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={
                  done
                    ? { backgroundColor: '#22c55e', color: '#ffffff' }
                    : active
                      ? { backgroundColor: '#1d4ed8', color: '#ffffff' }
                      : {
                          backgroundColor: '#ffffff',
                          color: '#94a3b8',
                          border: '1px solid #e8d5c8',
                        }
                }
              >
                {done ? <CheckIcon small /> : s.n}
              </span>
              <span
                className={`hidden text-xs font-medium md:inline ${
                  done || active ? 'text-[#0f172a]' : 'text-[#94a3b8]'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 ? (
              <span
                className="hidden h-px w-6 md:inline-block"
                style={{ backgroundColor: '#e8d5c8' }}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function CheckIcon({ small = false }: { small?: boolean }) {
  const size = small ? 12 : 16;
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

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
