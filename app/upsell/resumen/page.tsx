'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const UPSELL_NAMES: Record<number, string> = {
  1: 'Guía de crecimiento emocional',
  2: 'Orientación y crecimiento profesional con IE',
  3: 'Guía de autoestima emocional',
};

type SummaryUpsell = {
  upsell_slot: number;
  amount_cents: number;
  currency: string;
  stripe_payment_intent_id: string;
};

type SummaryResponse = {
  main: { amountCents: number; currency: string; email: string | null };
  upsells: SummaryUpsell[];
};

export default function ResumenPage() {
  return (
    <Suspense fallback={<main className="min-h-dvh bg-[#fdf6f0]" />}>
      <ResumenInner />
    </Suspense>
  );
}

function ResumenInner() {
  const params = useSearchParams();
  const pi = params.get('pi');
  const emailFromUrl = params.get('email');

  const [data, setData] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pi) {
      setError('Falta el identificador del pago');
      return;
    }
    fetch(`/api/upsell/summary?pi=${encodeURIComponent(pi)}`)
      .then((r) => r.json())
      .then((body) => {
        if (body.error) throw new Error(body.error);
        setData(body as SummaryResponse);
      })
      .catch((err) => setError(err.message ?? 'Error al cargar el resumen'));
  }, [pi]);

  useEffect(() => {
    if (!pi) return;
    // Fire-and-forget. Idempotency is enforced server-side via the
    // report_sent flag, so refreshes/double-mounts won't resend.
    fetch('/api/dispatch-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pi }),
    }).catch((err) => {
      console.error('[resumen] dispatch-report failed', err);
    });
  }, [pi]);

  const upsells = data?.upsells ?? [];
  const mainCents = data?.main.amountCents ?? 300;
  const currency = (data?.main.currency ?? 'eur').toUpperCase();
  const email = data?.main.email ?? emailFromUrl ?? null;

  const totalCents =
    mainCents + upsells.reduce((sum, u) => sum + u.amount_cents, 0);

  return (
    <main className="min-h-dvh bg-[#fdf6f0]">
      {/* HEADER with 3 completed steps */}
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
          <StepIndicator />
        </div>
      </header>

      <section className="bg-[#fdf6f0]">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <div className="text-center">
            <img
              src="/illustrations/completed.svg"
              alt=""
              aria-hidden
              className="mx-auto w-40 md:w-48"
            />
            <span
              className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full text-white"
              style={{
                backgroundColor: '#22c55e',
                boxShadow: '0 10px 25px rgba(34,197,94,0.35)',
              }}
              aria-hidden
            >
              <BigCheckIcon />
            </span>
            <h1 className="font-display mt-6 text-3xl font-bold text-[#0f172a] md:text-4xl">
              ¡Pedido completado!
            </h1>
            <p className="mt-3 text-base text-[#64748b]">
              Gracias por tu compra. Aquí tienes el resumen.
            </p>
          </div>

          <div
            className="mt-10 overflow-hidden rounded-3xl bg-white"
            style={{
              border: '1px solid #e8d5c8',
              boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
            }}
          >
            <div
              className="px-6 py-5"
              style={{ borderBottom: '1px solid #f1ebe5' }}
            >
              <h2 className="font-display text-lg font-bold text-[#0f172a]">
                Resumen del pedido
              </h2>
            </div>

            <ul className="divide-y divide-[#f1ebe5]">
              <LineItem
                title="Acceso 7 días InnerScore"
                subtitle="Informe completo de IE"
                amountCents={mainCents}
                currency={currency}
              />
              {upsells.map((u) => (
                <LineItem
                  key={u.upsell_slot}
                  title={UPSELL_NAMES[u.upsell_slot] ?? `Upsell ${u.upsell_slot}`}
                  subtitle="Producto adicional"
                  amountCents={u.amount_cents}
                  currency={u.currency.toUpperCase()}
                />
              ))}
            </ul>

            <div
              className="flex items-baseline justify-between px-6 py-5"
              style={{ borderTop: '1px solid #f1ebe5', backgroundColor: '#fdf6f0' }}
            >
              <span className="text-sm font-medium text-[#0f172a]">
                Total pagado
              </span>
              <span className="font-display text-2xl font-bold text-[#0f172a]">
                {formatAmount(totalCents, currency)}
              </span>
            </div>
          </div>

          <div
            className="mt-8 flex items-start gap-3 rounded-2xl p-5"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e8d5c8' }}
          >
            <span aria-hidden className="text-2xl">📬</span>
            <p className="text-sm leading-relaxed text-[#0f172a]">
              Recibirás tu informe de IE en los próximos 5-10 minutos en tu
              correo electrónico
              {email ? (
                <>
                  {' '}
                  <span className="font-semibold">{email}</span>
                </>
              ) : null}
              .
            </p>
          </div>

          <Link
            href="/members"
            className="mt-8 flex w-full items-center justify-center rounded-xl px-6 py-5 text-base font-semibold text-white transition-transform hover:scale-[1.01] md:text-lg"
            style={{
              backgroundColor: '#1d4ed8',
              boxShadow: '0 12px 28px rgba(29,78,216,0.35)',
            }}
          >
            Acceder a mi área de miembros
          </Link>

          {error ? (
            <p className="mt-4 text-center text-sm text-[#dc2626]" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function LineItem({
  title,
  subtitle,
  amountCents,
  currency,
}: {
  title: string;
  subtitle: string;
  amountCents: number;
  currency: string;
}) {
  return (
    <li className="flex items-center justify-between gap-4 px-6 py-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[#0f172a]">{title}</p>
        <p className="truncate text-xs text-[#64748b]">{subtitle}</p>
      </div>
      <span className="font-display shrink-0 text-base font-bold text-[#0f172a]">
        {formatAmount(amountCents, currency)}
      </span>
    </li>
  );
}

function formatAmount(cents: number, currency: string) {
  try {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency,
    }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency}`;
  }
}

function StepIndicator() {
  const steps = [
    { n: 1, label: 'Pedido realizado' },
    { n: 2, label: 'Oferta especial' },
    { n: 3, label: 'Resumen del pedido' },
  ];
  return (
    <ol className="flex items-center gap-2 md:gap-3">
      {steps.map((s, i) => (
        <li key={s.n} className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-2">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: '#22c55e' }}
            >
              <SmallCheckIcon />
            </span>
            <span className="hidden text-xs font-medium text-[#0f172a] md:inline">
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 ? (
            <span
              className="hidden h-px w-6 md:inline-block"
              style={{ backgroundColor: '#22c55e' }}
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function BigCheckIcon() {
  return (
    <svg
      width="28"
      height="28"
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

function SmallCheckIcon() {
  return (
    <svg
      width="12"
      height="12"
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
