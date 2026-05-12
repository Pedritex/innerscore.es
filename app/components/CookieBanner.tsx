'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'innerscore_cookies';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const respond = (choice: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl bg-white p-5 shadow-lg md:p-6"
      style={{ border: '1px solid #e8d5c8' }}
    >
      <p className="text-sm text-[#0f172a] leading-relaxed">
        InnerScore uses essential local storage to remember your test
        answers and your cookie choice. We don&apos;t use analytics or
        advertising cookies. Read our{' '}
        <Link
          href="/legal/cookies"
          className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
        >
          cookie policy
        </Link>{' '}
        for details.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => respond('accepted')}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          style={{
            backgroundColor: '#1d4ed8',
            boxShadow: '0 4px 12px rgba(29,78,216,0.25)',
          }}
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => respond('declined')}
          className="rounded-lg px-4 py-2 text-sm font-medium text-[#0f172a] transition-colors hover:bg-[#fdf6f0]"
          style={{ border: '1px solid #e8d5c8' }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
