'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/precios', label: 'Precios' },
  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white" style={{ borderBottom: '1px solid #e8d5c8' }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 md:py-4">
        <Link href="/" className="text-xl">
          <span className="font-display font-bold italic text-[#0f172a]">Inner</span>
          <span className="font-semibold text-[#1d4ed8]">Score</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-[#0f172a] transition-colors hover:bg-[#fdf6f0]"
            style={{ border: '1px solid #0f172a' }}
          >
            Iniciar sesión
          </Link>
          <Link
            href="/quiz"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: '#ea580c',
              boxShadow: '0 8px 18px rgba(234,88,12,0.30)',
            }}
          >
            Hacer el test
          </Link>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#64748b] transition-colors hover:bg-[#f1ebe5] hover:text-[#0f172a] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          className="border-t bg-white px-6 pb-5 pt-2 md:hidden"
          style={{ borderColor: '#e8d5c8' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-[#0f172a]"
              style={{ border: '1px solid #0f172a' }}
            >
              Iniciar sesión
            </Link>
            <Link
              href="/quiz"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white"
              style={{
                backgroundColor: '#ea580c',
                boxShadow: '0 8px 18px rgba(234,88,12,0.30)',
              }}
            >
              Hacer el test
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
