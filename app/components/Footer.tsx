import Link from 'next/link';

const LINKS = [
  { href: '/legal/legal-notice', label: 'Aviso Legal' },
  { href: '/legal/privacy-policy', label: 'Política de Privacidad' },
  { href: '/legal/cookies', label: 'Cookies' },
  { href: '/legal/terms-of-service', label: 'Condiciones del Servicio' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-auto bg-white"
      style={{ borderTop: '1px solid #e8d5c8' }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-[#64748b] md:flex-row">
        <p>
          © {year}{' '}
          <span className="font-display font-bold italic text-[#0f172a]">
            Inner
          </span>
          <span className="font-semibold text-[#1d4ed8]">Score</span>
          <span className="ml-2 text-[#94a3b8]">by FastwaySolutions</span>
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#64748b] transition-colors hover:text-[#1d4ed8]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
