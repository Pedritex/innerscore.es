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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:py-4">
        <Link href="/" className="text-xl">
          <span className="font-display font-bold italic text-[#0f172a]">Inner</span>
          <span className="font-semibold text-[#1d4ed8]">Score</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
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
          className="border-t bg-white px-6 pb-4 md:hidden"
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
        </nav>
      )}
    </header>
  );
}
