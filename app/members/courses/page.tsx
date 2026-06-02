import MembersHeader from '@/app/components/MembersHeader';
import MembersMobileNav from '@/app/components/MembersMobileNav';
import { loadMemberOrRedirect } from '@/lib/members-data';
import { CATALOG_COURSES } from '@/lib/members-content';
import CoursesList from './_components/CoursesList';

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const { email, archetypeKey } = await loadMemberOrRedirect();

  // Find a course tagged to the user's archetype; fall back to the first one.
  const recommended =
    CATALOG_COURSES.find((c) => c.relatedArchetype === archetypeKey) ??
    CATALOG_COURSES[0];
  const others = CATALOG_COURSES.filter((c) => c.id !== recommended.id);

  return (
    <main className="min-h-dvh bg-[#fdf6f0] pb-24 md:pb-12">
      <MembersHeader email={email} />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-8">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#64748b]">
            Cursos de inteligencia emocional
          </span>
          <h1 className="font-display mt-2 text-3xl font-bold text-[#0f172a] md:text-4xl">
            Aprende, paso a paso
          </h1>
          <p className="mt-3 text-sm text-[#64748b] md:text-base">
            10 cursos diseñados para llevar tu IE a la práctica — desde los
            fundamentos hasta aplicaciones avanzadas.
          </p>
        </div>

        <CoursesList recommended={recommended} others={others} />
      </div>

      <MembersMobileNav />
    </main>
  );
}
