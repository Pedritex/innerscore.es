'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadStripe, type Stripe as StripeClient } from '@stripe/stripe-js';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import type { QuizAnswer, QuizResult } from '@/types';
import { calculateScores } from '@/lib/scoring';

type Session = { email: string; answers: QuizAnswer[] };

const stripePromise: Promise<StripeClient | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: '15px',
      color: '#0f172a',
      '::placeholder': { color: '#94a3b8' },
    },
    invalid: { color: '#dc2626', iconColor: '#dc2626' },
  },
};

export default function CheckoutPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

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
    } catch {
      router.replace('/quiz');
    }
  }, [router]);

  if (loading || !session || !result) {
    return <main className="min-h-dvh bg-[#fdf6f0]" />;
  }

  return (
    <main className="min-h-dvh bg-[#fdf6f0]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/result"
            className="text-sm font-medium text-[#64748b] hover:text-[#0f172a]"
          >
            ← Volver a resultados
          </Link>
          <span className="font-display text-lg font-bold text-[#0f172a]">
            InnerScore
          </span>
        </div>

        <div className="mx-auto max-w-xl">
          <div
            className="rounded-2xl bg-white p-8"
            style={{ border: '1px solid #e8d5c8' }}
          >
            <Elements stripe={stripePromise}>
              <CheckoutForm session={session} result={result} />
            </Elements>
          </div>
        </div>
      </div>
    </main>
  );
}


function CheckoutForm({
  session,
  result,
}: {
  session: Session;
  result: QuizResult;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [email, setEmail] = useState(session.email);
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => Boolean(stripe && elements && email && !submitting),
    [stripe, elements, email, submitting],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    try {
      const intentRes = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, answers: session.answers, result }),
      });
      const intentData = await intentRes.json();
      if (!intentRes.ok || !intentData.clientSecret) {
        throw new Error(intentData.error ?? 'No se pudo iniciar el pago');
      }

      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) {
        throw new Error('Faltan los datos de la tarjeta');
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(intentData.clientSecret, {
          payment_method: {
            card: cardNumber,
            billing_details: { email, name: name || undefined },
          },
        });

      if (confirmError) {
        throw new Error(confirmError.message ?? 'El pago no se ha podido completar');
      }

      if (paymentIntent?.status === 'succeeded') {
        router.push(
          `/upsell/1?pi=${encodeURIComponent(paymentIntent.id)}&email=${encodeURIComponent(email)}`,
        );
        return;
      }

      throw new Error('El pago no se completó');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'El pago no se ha podido completar';
      setError(message);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl font-bold text-[#0f172a]">
          Datos de pago
        </h2>
        <p className="mt-1 text-sm text-[#64748b]">
          Tu informe se enviará a este correo.
        </p>
      </div>

      <Field label="Correo electrónico">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@ejemplo.com"
          className="w-full rounded-lg bg-white px-3 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/30"
          style={{ border: '1px solid #e8d5c8' }}
        />
      </Field>

      <Field label="Nombre en la tarjeta">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Juan Pérez"
          className="w-full rounded-lg bg-white px-3 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/30"
          style={{ border: '1px solid #e8d5c8' }}
        />
      </Field>

      <Field label="Número de tarjeta">
        <ElementBox>
          <CardNumberElement
            options={{
              ...ELEMENT_OPTIONS,
              showIcon: true,
              placeholder: '1234 1234 1234 1234',
            }}
          />
        </ElementBox>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Caducidad">
          <ElementBox>
            <CardExpiryElement options={ELEMENT_OPTIONS} />
          </ElementBox>
        </Field>
        <Field label="CVC">
          <ElementBox>
            <CardCvcElement options={ELEMENT_OPTIONS} />
          </ElementBox>
        </Field>
      </div>

      {error ? (
        <p className="text-sm text-[#dc2626]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-2 w-full rounded-xl px-6 py-4 text-base font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          backgroundColor: '#ea580c',
          boxShadow: '0 10px 24px rgba(234,88,12,0.35)',
        }}
      >
        {submitting ? 'Procesando…' : 'Pagar 3,00 € de forma segura'}
      </button>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-[#94a3b8]">
        Al continuar con el pago, aceptas que se te cobre la cantidad de 3,00 €
        ahora, aceptas nuestras{' '}
        <Link
          href="/legal/terms-of-service"
          className="underline transition-colors hover:text-[#64748b]"
        >
          Condiciones del servicio
        </Link>{' '}
        y reconoces que has leído nuestra{' '}
        <Link
          href="/legal/privacy-policy"
          className="underline transition-colors hover:text-[#64748b]"
        >
          Política de privacidad
        </Link>
        . Tu pago aparecerá como &ldquo;innerscore.es&rdquo; en tu extracto
        bancario. Después de 7 días, se te cobrará 39,99 € al mes hasta que
        canceles tu suscripción. Puedes cancelar en cualquier momento desde tu
        área de miembros. Para cualquier consulta, contáctanos en{' '}
        <a
          href="mailto:support@innerscore.es"
          className="underline transition-colors hover:text-[#64748b]"
        >
          support@innerscore.es
        </a>
        .
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <TrustBlock
          title="Devolución del dinero"
          body="Si no quedas completamente satisfecho durante el periodo de prueba de 7 días, contáctanos y estaremos encantados de tramitar un reembolso completo."
        />
        <TrustBlock
          title="Cancela en cualquier momento"
          body="Puedes cancelar en cualquier momento desde tu área de miembros o contactándonos en support@innerscore.es."
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-[#64748b]">
          <LockIcon />
          Tecnología de Stripe
        </span>
        <span className="flex items-center gap-2">
          <VisaLogo />
          <MastercardLogo />
        </span>
      </div>
    </form>
  );
}

function TrustBlock({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: '#fdf6f0',
        border: '1px solid #e8d5c8',
      }}
    >
      <p className="text-xs font-semibold text-[#0f172a]">{title}</p>
      <p className="mt-1.5 text-[11px] leading-relaxed text-[#64748b]">
        {body}
      </p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-[#0f172a]">{label}</span>
      {children}
    </label>
  );
}

function ElementBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg bg-white px-3 py-3"
      style={{ border: '1px solid #e8d5c8' }}
    >
      {children}
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#64748b"
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

function VisaLogo() {
  return (
    <span
      className="inline-flex h-6 w-10 items-center justify-center rounded text-[10px] font-bold tracking-wider text-white"
      style={{ backgroundColor: '#1a1f71' }}
      aria-label="Visa"
    >
      VISA
    </span>
  );
}

function MastercardLogo() {
  return (
    <span
      className="inline-flex h-6 w-10 items-center justify-center rounded bg-white"
      style={{ border: '1px solid #e8d5c8' }}
      aria-label="Mastercard"
    >
      <span className="relative flex">
        <span
          className="block h-3 w-3 rounded-full"
          style={{ backgroundColor: '#eb001b' }}
        />
        <span
          className="-ml-1 block h-3 w-3 rounded-full"
          style={{ backgroundColor: '#f79e1b', mixBlendMode: 'multiply' }}
        />
      </span>
    </span>
  );
}
