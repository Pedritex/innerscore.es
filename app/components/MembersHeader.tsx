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
      <div className="mx-auto grid max-w-6xl items-center gap-4 px-6 py-5 md:grid-cols-[1fr_auto_1fr]">
        <Link href="/members" className="justify-self-start text-xl">
          <span className="font-display font-bold italic text-[#0f172a]">
            Inner
          </span>
          <span className="font-semibold text-[#1d4ed8]">Score</span>
        </Link>

        <nav className="hidden items-center justify-center gap-10 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-semibold text-[#0f172a] transition-colors hover:text-[#1d4ed8]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <span className="hidden truncate text-xs text-[#64748b] md:inline-block md:max-w-[180px]">
            {email}
          </span>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
