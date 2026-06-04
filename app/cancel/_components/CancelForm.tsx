'use client';

import { useState } from 'react';
import Link from 'next/link';

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

const cardStyle = {
  border: '1px solid #e8d5c8',
  boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
};

const LOSE_ITEMS = [
  'Tests adicionales de las 5 dimensiones',
  'Cursos de IE con certificado',
  'Tu informe personalizado de 15 páginas',
  'Plan de desarrollo de 90 días',
];

const ALTERNATIVES: {
  label: string;
  href?: string;
  disabled?: boolean;
}[] = [
  { label: 'Contactar con soporte', href: '/contacto' },
  { label: 'Pausar tu suscripción (próximamente)', disabled: true },
  { label: 'Ver tu informe completo', href: '/members/profile' },
];

export default function CancelForm() {
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleCancel() {
    if (!confirmed || status.kind === 'loading') return;
    setStatus({ kind: 'loading' });
    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;
      if (!res.ok || !data?.ok) {
        setStatus({
          kind: 'error',
          message:
            data?.error ??
            'No hemos podido procesar tu solicitud. Inténtalo de nuevo en unos minutos.',
        });
        return;
      }
      setStatus({ kind: 'success' });
    } catch (err) {
      setStatus({
        kind: 'error',
        message:
          err instanceof Error
            ? err.message
            : 'Error inesperado. Inténtalo de nuevo.',
      });
    }
  }

  if (status.kind === 'success') {
    return (
      <div
        className="rounded-2xl bg-white p-6 md:p-8 text-center"
        style={cardStyle}
      >
        <h2 className="font-display text-xl font-bold text-[#0f172a] md:text-2xl">
          Tu suscripción está siendo cancelada
        </h2>
        <p className="mt-3 text-sm text-[#64748b]">
          Hemos registrado tu solicitud. Mantendrás el acceso a tu área de
          miembros hasta el final del período actual.
        </p>
        <Link
          href="/members"
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
          style={{ backgroundColor: '#ea580c' }}
        >
          Volver a mi área de miembros
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl bg-white p-6 md:p-8" style={cardStyle}>
        <h1 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
          ¿Quieres cancelar tu suscripción?
        </h1>
        <p className="mt-3 text-sm text-[#64748b] md:text-base">
          Lamentamos que te vayas. Si cancelas ahora perderás el acceso a tu
          área de miembros al final del período actual.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6" style={cardStyle}>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#dc2626]">
            Perderás acceso a:
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {LOSE_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-[#0f172a]"
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: 'rgba(220,38,38,0.12)',
                    color: '#dc2626',
                  }}
                >
                  ×
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6" style={cardStyle}>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0f172a]">
            Antes de irte, ¿has probado?:
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {ALTERNATIVES.map((alt) => {
              const content = (
                <span className="flex items-start gap-3 text-sm">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-base font-bold"
                    style={{ color: alt.disabled ? '#cbd5e1' : '#0f172a' }}
                  >
                    →
                  </span>
                  <span
                    style={{ color: alt.disabled ? '#94a3b8' : '#0f172a' }}
                    className={alt.disabled ? '' : 'hover:underline'}
                  >
                    {alt.label}
                  </span>
                </span>
              );
              return (
                <li key={alt.label}>
                  {alt.href ? (
                    <Link href={alt.href}>{content}</Link>
                  ) : (
                    <span aria-disabled>{content}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 md:p-8" style={cardStyle}>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 h-4 w-4 cursor-pointer accent-[#dc2626]"
          />
          <span className="text-sm text-[#0f172a]">
            Entiendo que perderé el acceso a mi área de miembros
          </span>
        </label>

        {status.kind === 'error' && (
          <p className="mt-4 rounded-xl bg-[rgba(220,38,38,0.08)] px-4 py-3 text-sm text-[#dc2626]">
            {status.message}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <Link
            href="/members"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
            style={{ backgroundColor: '#ea580c' }}
          >
            Mantener mi suscripción
          </Link>
          <button
            type="button"
            onClick={handleCancel}
            disabled={!confirmed || status.kind === 'loading'}
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: '#dc2626' }}
          >
            {status.kind === 'loading'
              ? 'Cancelando…'
              : 'Cancelar mi suscripción'}
          </button>
        </div>
      </div>
    </div>
  );
}
