'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabase } from '@/lib/supabase-browser';

export default function SignOutButton() {
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
    <button
      type="button"
      onClick={handleSignOut}
      disabled={signingOut}
      className="rounded-lg px-4 py-2 text-sm font-medium text-[#0f172a] transition-colors hover:bg-[#f1ebe5] disabled:cursor-not-allowed disabled:opacity-60"
      style={{ border: '1px solid #e8d5c8' }}
    >
      {signingOut ? 'Cerrando…' : 'Cerrar sesión'}
    </button>
  );
}
