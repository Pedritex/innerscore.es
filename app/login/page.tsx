'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createBrowserSupabase } from '@/lib/supabase-browser';

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-dvh bg-[#fdf6f0]" />}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') ?? '/members';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(translateAuthError(error.message));
      setSubmitting(false);
      return;
    }

    router.push(next);
    router.refresh();
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
            Accede a tu área de miembros
          </h1>
          <p className="mt-3 text-center text-sm text-[#64748b]">
            Introduce tus credenciales para continuar.
          </p>

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

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[#0f172a]">
                Contraseña
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
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
              {submitting ? 'Entrando…' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/reset-password"
              className="text-sm font-medium text-[#1d4ed8] hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[#94a3b8]">
          ¿Aún no eres miembro? Compra tu informe de IE en{' '}
          <Link href="/" className="font-medium text-[#0f172a] hover:underline">
            innerscore.es
          </Link>
        </p>
      </div>
    </main>
  );
}

function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials')) {
    return 'Correo o contraseña incorrectos. Revisa tus datos e inténtalo de nuevo.';
  }
  if (m.includes('email not confirmed')) {
    return 'Tu cuenta aún no está confirmada. Revisa tu bandeja de entrada.';
  }
  if (m.includes('too many')) {
    return 'Demasiados intentos. Espera unos minutos antes de volver a intentarlo.';
  }
  return 'No se ha podido iniciar sesión. Inténtalo de nuevo en unos momentos.';
}
