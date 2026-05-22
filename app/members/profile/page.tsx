import Link from 'next/link';
import MembersHeader from '@/app/components/MembersHeader';
import MembersMobileNav from '@/app/components/MembersMobileNav';
import { loadMemberOrRedirect } from '@/lib/members-data';
import { ARCHETYPE_CONTENT } from '@/lib/members-content';
import { getDimensionLabel } from '@/lib/scoring';
import ArchetypeAvatar from '../_components/ArchetypeAvatar';
import RadarChart from '../_components/RadarChart';
import ProfileTabs from './_components/ProfileTabs';
import Accordion from './_components/Accordion';
import IntroModal from './_components/IntroModal';

export const dynamic = 'force-dynamic';

const DIMENSION_COLORS: Record<string, string> = {
  'self-awareness': '#1d4ed8',
  'self-regulation': '#0891b2',
  motivation: '#ea580c',
  empathy: '#dc2626',
  'social-skills': '#7c3aed',
};

export default async function ProfilePage() {
  const { email, result, archetype: archetypeName, archetypeKey, isEvolved } =
    await loadMemberOrRedirect();
  const archetype = ARCHETYPE_CONTENT[archetypeKey];
  const displayName = isEvolved
    ? `${archetype.displayName} Evolucionad${archetype.displayName.endsWith('a') ? 'a' : 'o'}`
    : archetype.displayName;

  return (
    <main className="min-h-dvh bg-[#fdf6f0] pb-24 md:pb-12">
      <MembersHeader email={email} />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {/* ZONA 1 — CONÓCETE EN DETALLE */}
        <section
          className="rounded-3xl bg-white p-8 md:p-10"
          style={{
            border: '1px solid #e8d5c8',
            boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
          }}
        >
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
            <ArchetypeAvatar
              archetypeKey={archetypeKey}
              color={archetype.color}
              size={120}
            />
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#64748b]">
                Conócete en detalle
              </span>
              <p className="mt-1 text-sm text-[#64748b]">Tu arquetipo:</p>
              <h1
                className="font-display mt-1 text-3xl font-bold leading-tight md:text-4xl"
                style={{ color: archetype.color }}
              >
                {archetypeName}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#0f172a] md:text-base">
                {archetype.intro[0]}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#64748b] md:text-base">
                {archetype.intro[1]}
              </p>
              <IntroModal
                archetype={archetype}
                displayName={displayName}
                isEvolved={isEvolved}
              />
            </div>
          </div>
        </section>

        {/* ZONA 2 — TU PUNTUACIÓN DE IE */}
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
            Tu puntuación de IE
          </h2>
          <p className="mt-2 text-sm text-[#64748b]">
            Las 5 dimensiones de Goleman, calibradas a partir de tus respuestas.
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            {/* Left: bars */}
            <div
              className="rounded-2xl bg-white p-6 md:p-8"
              style={{
                border: '1px solid #e8d5c8',
                boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
              }}
            >
              <ul className="flex flex-col gap-5">
                {result.dimensions.map((d) => {
                  const pct = d.max === 0 ? 0 : Math.round((d.score / d.max) * 100);
                  const color = DIMENSION_COLORS[d.name] ?? '#1d4ed8';
                  return (
                    <li key={d.name}>
                      <div className="flex items-baseline justify-between">
                        <span className="font-display text-base font-bold text-[#0f172a]">
                          {getDimensionLabel(d.name)}
                        </span>
                        <span
                          className="font-display text-lg font-bold tabular-nums"
                          style={{ color }}
                        >
                          {pct}%
                        </span>
                      </div>
                      <div
                        className="mt-2 h-2.5 w-full overflow-hidden rounded-full"
                        style={{ backgroundColor: '#e2e8f0' }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: color }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: radar */}
            <div
              className="rounded-2xl bg-white p-6 md:p-8"
              style={{
                border: '1px solid #e8d5c8',
                boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
              }}
            >
              <div className="aspect-square w-full">
                <RadarChart dimensions={result.dimensions} />
              </div>
            </div>
          </div>
        </section>

        {/* ZONA 3 — TABS */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
            Lo que define a {displayName}
          </h2>
          <p className="mt-2 text-sm text-[#64748b]">
            Explora los rasgos, motivaciones y áreas de crecimiento de tu arquetipo.
          </p>
          <div className="mt-6">
            <ProfileTabs archetype={archetype} />
          </div>
        </section>

        {/* ZONA 4 — SUBTIPOS */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
            Subtipos de {archetype.displayName}
          </h2>
          <p className="mt-2 text-sm text-[#64748b]">
            Tres variantes dentro de tu arquetipo. ¿Con cuál te identificas más?
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {archetype.subtypes.map((sub) => (
              <article
                key={sub.title}
                className="flex flex-col rounded-2xl bg-white p-6"
                style={{ border: '1px solid #e8d5c8' }}
              >
                <p
                  className="font-display text-lg font-bold"
                  style={{ color: archetype.color }}
                >
                  {sub.title}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#64748b]">
                  {sub.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/members/tests"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
              style={{ backgroundColor: archetype.color }}
            >
              Hacer un test para profundizar →
            </Link>
          </div>
        </section>

        {/* ZONA 5 — FAQ */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
            Preguntas frecuentes sobre tu arquetipo
          </h2>
          <p className="mt-2 text-sm text-[#64748b]">
            Lo que la gente con tu perfil suele preguntarse.
          </p>
          <div className="mt-6">
            <Accordion items={archetype.faq} />
          </div>
        </section>

        {/* ZONA 6 — TRAYECTORIA */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
            Tu trayectoria de crecimiento
          </h2>
          <p className="mt-2 text-sm text-[#64748b]">
            Tres etapas para llevar tu inteligencia emocional al siguiente nivel.
          </p>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {archetype.trajectory.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col rounded-2xl bg-white p-6"
                style={{ border: '1px solid #e8d5c8' }}
              >
                <span
                  className="font-display flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white"
                  style={{ backgroundColor: archetype.color }}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <p className="font-display mt-4 text-lg font-bold text-[#0f172a]">
                  {step.title}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748b]">
                  {step.description}
                </p>
                <div className="mt-5 flex gap-2">
                  <Link
                    href="/members/courses"
                    className="flex-1 rounded-lg px-3 py-2 text-center text-xs font-semibold text-white transition-transform hover:scale-[1.01]"
                    style={{ backgroundColor: archetype.color }}
                  >
                    Ver cursos
                  </Link>
                  <Link
                    href="/members/tests"
                    className="flex-1 rounded-lg px-3 py-2 text-center text-xs font-semibold text-[#0f172a] transition-colors hover:bg-[#f1ebe5]"
                    style={{ border: '1px solid #e8d5c8' }}
                  >
                    Ver tests
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <MembersMobileNav />
    </main>
  );
}
