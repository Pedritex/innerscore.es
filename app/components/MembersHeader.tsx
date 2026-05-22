import Link from 'next/link';
import SignOutButton from './SignOutButton';

const NAV_ITEMS = [
  { href: '/members', label: 'Inicio' },
  { href: '/members/profile', label: 'Perfil' },
  { href: '/members/tests', label: 'Tests' },
  { href: '/members/courses', label: 'Cursos' },
];

export default function MembersHeader({ email }: { email: string }) {
  return (
    <header
      className="sticky top-0 z-30 bg-white"
      style={{ borderBottom: '1px solid #e8d5c8' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/members" className="text-xl">
          <span className="font-display font-bold italic text-[#0f172a]">
            Inner
          </span>
          <span className="font-semibold text-[#1d4ed8]">Score</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#64748b] transition-colors hover:text-[#0f172a]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden truncate text-xs text-[#64748b] md:inline-block md:max-w-[200px]">
            {email}
          </span>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
