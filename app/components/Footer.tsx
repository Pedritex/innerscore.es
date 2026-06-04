'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/precios', label: 'Precios' },
  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/login', label: 'Iniciar sesión' },
  { href: '/cancel', label: 'Cancelar suscripción' },
];

const LEGAL_LINKS = [
  { href: '/legal/privacy-policy', label: 'Política de privacidad' },
  { href: '/legal/terms-of-service', label: 'Condiciones del servicio' },
  { href: '/legal/legal-notice', label: 'Aviso legal' },
  { href: '/legal/cookies', label: 'Cookies' },
];

const DISCLAIMER_FIRST =
  'La web no ofrece consejos u opiniones profesionales o de una exactitud absoluta sobre productos o servicios.';

const DISCLAIMER_REST =
  ' La información y las opiniones proporcionadas tienen únicamente fines de entretenimiento y educativos y no deben utilizarse con fines de asesoramiento profesional. Por lo tanto, antes de tomar cualquier decisión basada en tus puntuaciones, te recomendamos que consultes con los profesionales oportunos. No proporcionamos ningún asesoramiento profesional o de exactitud absoluta sobre productos o servicios. CUALQUIER USO O CREDIBILIDAD QUE SE OTORGUE A LA INFORMACIÓN ENCONTRADA EN LA WEB ES POR TU CUENTA Y RIESGO.';

export default function Footer() {
  const year = new Date().getFullYear();
  const [expanded, setExpanded] = useState(false);

  return (
    <footer
      className="mt-auto bg-white"
      style={{ borderTop: '1px solid #e8d5c8' }}
    >
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-[#64748b]">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <p className="shrink-0">
            © {year}{' '}
            <span className="font-display font-bold italic text-[#0f172a]">
              Inner
            </span>
            <span className="font-semibold text-[#1d4ed8]">Score</span>
            <span className="ml-2 text-[#94a3b8]">by FastwaySolutions</span>
          </p>

          <div className="flex flex-col gap-4 md:items-end">
            <nav
              className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end"
              aria-label="Enlaces principales"
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[#64748b] transition-colors hover:text-[#1d4ed8]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <nav
              className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:justify-end"
              aria-label="Enlaces legales"
            >
              {LEGAL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[#94a3b8] transition-colors hover:text-[#1d4ed8]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-8 text-sm leading-relaxed text-[#94a3b8]">
        <p>
          <span className="font-semibold">Descargo de responsabilidad:</span>{' '}
          {DISCLAIMER_FIRST}
          {expanded ? DISCLAIMER_REST : null}{' '}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="font-medium text-[#1d4ed8] underline transition-colors hover:text-[#1e40af]"
            aria-expanded={expanded}
          >
            {expanded ? 'Leer menos' : 'Leer más'}
          </button>
        </p>
      </div>
    </footer>
  );
}
