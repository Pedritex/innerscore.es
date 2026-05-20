'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createBrowserSupabase } from '@/lib/supabase-browser';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createBrowserSupabase();
    const baseUrl =
      typeof window !== 'undefined' ? window.location.origin : '';

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/update-password`,
    });

    if (error) {
      setError(
        'No se ha podido enviar el correo. Comprueba la dirección e inténtalo de nuevo.',
      );
      setSubmitting(false);
      return;
    }

    setSent(true);
    setSubmitting(false);
  };

  return (
    <main className="flex min-h-dvh flex-col bg-[#fdf6f0]">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12">
        <Link href="/" className="text-center text-2xl">
          <span className="font-display font-bold italic text-[#0f172a]">
            Inner
          </span>
          <span className="font-semibold text-[#1d4ed8]">Score</span>
        </Link>

        <div
          className="mt-10 rounded-3xl bg-white p-8 md:p-10"
          style={{
            border: '1px solid #e8d5c8',
            boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
          }}
        >
          <h1 className="font-display text-center text-2xl font-bold text-[#0f172a] md:text-3xl">
            Recupera tu contraseña
          </h1>
          <p className="mt-3 text-center text-sm text-[#64748b]">
            Te enviaremos un enlace para que puedas restablecerla.
          </p>

          {sent ? (
            <div className="mt-8 rounded-2xl p-5 text-center" style={{ backgroundColor: '#ecfdf5', border: '1px solid #bbf7d0' }}>
              <p className="text-sm font-medium text-[#0f172a]">
                Hemos enviado un enlace a <span className="font-semibold">{email}</span>.
              </p>
              <p className="mt-2 text-sm text-[#64748b]">
                Revisa tu bandeja de entrada (y la carpeta de spam por si acaso).
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-[#0f172a]">
                  Correo electrónico
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="tu@ejemplo.com"
                  className="w-full rounded-lg bg-white px-3 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/30"
                  style={{ border: '1px solid #e8d5c8' }}
                />
              </label>

              {error ? (
                <p className="text-sm text-[#dc2626]" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full rounded-xl px-6 py-4 text-base font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  backgroundColor: '#1d4ed8',
                  boxShadow: '0 10px 24px rgba(29,78,216,0.35)',
                }}
              >
                {submitting ? 'Enviando…' : 'Enviar enlace de recuperación'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-[#64748b] hover:text-[#0f172a]"
            >
              ← Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
