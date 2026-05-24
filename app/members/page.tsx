import Link from 'next/link';
import MembersHeader from '@/app/components/MembersHeader';
import MembersMobileNav from '@/app/components/MembersMobileNav';
import { loadMemberOrRedirect } from '@/lib/members-data';
import {
  ARCHETYPE_CONTENT,
  CATALOG_COURSES,
  DAILY_PILLS,
  TRIVIA_QUESTIONS,
} from '@/lib/members-content';
import { getDimensionLabel } from '@/lib/scoring';
import DailyPill from './_components/DailyPill';
import DailyTrivia from './_components/DailyTrivia';
import StreakWidget from './_components/StreakWidget';
import ProgressWidget from './_components/ProgressWidget';

export const dynamic = 'force-dynamic';

const DIMENSION_COLORS: Record<string, string> = {
  'self-awareness': '#1d4ed8',
  'self-regulation': '#0891b2',
  motivation: '#ea580c',
  empathy: '#dc2626',
  'social-skills': '#7c3aed',
};

export default async function MembersDashboard() {
  const { email, result, archetypeKey } = await loadMemberOrRedirect();
  const archetype = ARCHETYPE_CONTENT[archetypeKey];

  const greetingName = email.split('@')[0];

  // Rotate by day-of-week (0 = Sunday, mapped to index 6 for Mon-Sun).
  const dow = new Date().getDay();
  const dayIdx = (dow + 6) % 7; // Mon = 0, Sun = 6
  const pill = DAILY_PILLS[dayIdx % DAILY_PILLS.length];
  const trivia = TRIVIA_QUESTIONS[dayIdx % TRIVIA_QUESTIONS.length];

  const recommendedCourses = CATALOG_COURSES.slice(0, 3);

  return (
    <main className="min-h-dvh bg-[#fdf6f0] pb-24 md:pb-0">
      <MembersHeader email={email} />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            <div>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
                style={{
                  backgroundColor: 'rgba(34,197,94,0.12)',
                  color: '#15803d',
                }}
              >
                Acceso activo
              </span>
              <h1 className="font-display mt-4 text-3xl font-bold text-[#0f172a] md:text-4xl">
                ¡Bienvenido, {greetingName}!
              </h1>
              <p className="mt-3 text-base text-[#64748b]">
                Tu espacio para profundizar en tu inteligencia emocional, día a día.
              </p>
            </div>

            <DailyPill pill={pill} />
            <DailyTrivia question={trivia} />

            {/* "Continúa explorando" */}
            <div
              className="rounded-3xl p-6 md:p-8"
              style={{
                background:
                  `linear-gradient(135deg, ${archetype.color} 0%, #0f172a 100%)`,
                color: '#ffffff',
              }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-widest opacity-80">
                Continúa explorando
              </span>
              <h3 className="font-display mt-3 text-2xl font-bold leading-tight md:text-3xl">
                Tu perfil de IE:{' '}
                <span className="italic">{archetype.displayName}</span>
              </h3>
              <p className="mt-3 text-sm opacity-90 md:text-base">
                Descubre tus motivaciones, fortalezas, áreas de crecimiento y la
                trayectoria que te llevará al siguiente nivel.
              </p>
              <Link
                href="/members/profile"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0f172a] transition-transform hover:scale-[1.01]"
              >
                Ver mi perfil completo →
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <aside className="flex flex-col gap-6">
            <StreakWidget />
            <ProgressWidget />
          </aside>
        </div>

        {/* DIMENSIONES */}
        <section className="mt-14">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
                Explora tus dimensiones
              </h2>
              <p className="mt-2 text-sm text-[#64748b]">
                Las 5 dimensiones de Goleman, con tu puntuación actual.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {result.dimensions.map((d) => {
              const pct = d.max === 0 ? 0 : Math.round((d.score / d.max) * 100);
              const color = DIMENSION_COLORS[d.name] ?? '#1d4ed8';
              return (
                <div
                  key={d.name}
                  className="rounded-2xl bg-white p-5"
                  style={{
                    border: '1px solid #e8d5c8',
                    boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display text-base font-bold text-[#0f172a]">
                      {getDimensionLabel(d.name)}
                    </p>
                    <span
                      className="font-display text-xl font-bold tabular-nums"
                      style={{ color }}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div
                    className="mt-3 h-2 w-full overflow-hidden rounded-full"
                    style={{ backgroundColor: '#e2e8f0' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                  <Link
                    href="/members/profile"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold"
                    style={{ color }}
                  >
                    Explorar →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* CURSOS RECOMENDADOS */}
        <section className="mt-14">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
                Cursos recomendados
              </h2>
              <p className="mt-2 text-sm text-[#64748b]">
                Para profundizar en tu inteligencia emocional.
              </p>
            </div>
            <Link
              href="/members/courses"
              className="hidden text-sm font-semibold text-[#1d4ed8] hover:underline md:inline-flex"
            >
              Ver todos →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {recommendedCourses.map((c) => (
              <article
                key={c.id}
                className="overflow-hidden rounded-2xl bg-white"
                style={{
                  border: '1px solid #e8d5c8',
                  boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
                }}
              >
                <div
                  className="flex h-32 items-end p-4"
                  style={{
                    background: `linear-gradient(135deg, ${c.gradient[0]} 0%, ${c.gradient[1]} 100%)`,
                  }}
                >
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white"
                    style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
                  >
                    {c.classes} clases · {c.weeks} semanas
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-[#0f172a]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#64748b]">
                    {c.description}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                    style={{
                      backgroundColor: '#fdf6f0',
                      border: '1px solid #e8d5c8',
                      color: '#64748b',
                    }}
                  >
                    Próximamente
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <MembersMobileNav />
    </main>
  );
}
