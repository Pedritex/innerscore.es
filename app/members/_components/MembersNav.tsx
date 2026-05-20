'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserSupabase } from '@/lib/supabase-browser';

const NAV_ITEMS = [
  { href: '/members', label: 'Inicio' },
  { href: '/members/perfil', label: 'Perfil' },
  { href: '/members/tests', label: 'Tests' },
  { href: '/members/cursos', label: 'Cursos' },
];

export default function MembersNav({ email }: { email: string | null }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    const supabase = createBrowserSupabase();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="bg-white" style={{ borderBottom: '1px solid #e8d5c8' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:py-5">
        <div className="flex items-center justify-between gap-6">
          <Link href="/members" className="text-xl">
            <span className="font-display font-bold italic text-[#0f172a]">
              Inner
            </span>
            <span className="font-semibold text-[#1d4ed8]">Score</span>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-between gap-4">
          {email ? (
            <span className="hidden truncate text-xs text-[#64748b] md:inline-block md:max-w-[200px]">
              {email}
            </span>
          ) : null}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="rounded-lg px-4 py-2 text-sm font-medium text-[#0f172a] transition-colors hover:bg-[#f1ebe5] disabled:cursor-not-allowed disabled:opacity-60"
            style={{ border: '1px solid #e8d5c8' }}
          >
            {signingOut ? 'Cerrando…' : 'Cerrar sesión'}
          </button>
        </div>

        <nav className="flex items-center gap-4 overflow-x-auto md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
