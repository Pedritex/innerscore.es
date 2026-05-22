import Link from 'next/link';

type Item = {
  href: string;
  label: string;
  icon: 'home' | 'user' | 'beaker' | 'book';
};

const ITEMS: Item[] = [
  { href: '/members', label: 'Inicio', icon: 'home' },
  { href: '/members/profile', label: 'Perfil', icon: 'user' },
  { href: '/members/tests', label: 'Tests', icon: 'beaker' },
  { href: '/members/courses', label: 'Cursos', icon: 'book' },
];

export default function MembersMobileNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 bg-white md:hidden"
      style={{ borderTop: '1px solid #e8d5c8' }}
    >
      <ul className="mx-auto flex max-w-6xl items-center justify-between px-2 py-1">
        {ITEMS.map((item) => (
          <li key={item.href} className="flex-1">
            <Link
              href={item.href}
              className="flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium text-[#64748b] transition-colors hover:text-[#0f172a]"
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Icon({ name }: { name: Item['icon'] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (name === 'home') {
    return (
      <svg {...common}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
  if (name === 'user') {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      </svg>
    );
  }
  if (name === 'beaker') {
    return (
      <svg {...common}>
        <path d="M9 3h6v4l5 11a2 2 0 0 1-1.84 2.78H5.84A2 2 0 0 1 4 18l5-11z" />
        <line x1="7" y1="14" x2="17" y2="14" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
