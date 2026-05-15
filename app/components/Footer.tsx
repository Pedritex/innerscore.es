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
      <div className="mx-auto max-w-6xl px-6 pb-8 text-[11px] leading-relaxed text-[#94a3b8]">
        <p>
          La web no ofrece consejos u opiniones profesionales o de una
          exactitud absoluta sobre productos o servicios. La información y las
          opiniones proporcionadas tienen únicamente fines de entretenimiento y
          educativos y no deben utilizarse con fines de asesoramiento
          profesional. Por lo tanto, antes de tomar cualquier decisión basada
          en tus puntuaciones, te recomendamos que consultes con los
          profesionales oportunos. No proporcionamos ningún asesoramiento
          profesional o de exactitud absoluta sobre productos o servicios.
          CUALQUIER USO O CREDIBILIDAD QUE SE OTORGUE A LA INFORMACIÓN
          ENCONTRADA EN LA WEB ES POR TU CUENTA Y RIESGO.
        </p>
      </div>
    </footer>
  );
}
