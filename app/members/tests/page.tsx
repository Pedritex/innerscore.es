import MembersHeader from '@/app/components/MembersHeader';
import MembersMobileNav from '@/app/components/MembersMobileNav';
import { loadMemberOrRedirect } from '@/lib/members-data';
import { CATALOG_TESTS } from '@/lib/members-content';
import TestsList from './_components/TestsList';

export const dynamic = 'force-dynamic';

export default async function TestsPage() {
  const { email, result } = await loadMemberOrRedirect();

  // Pick the dimension with the LOWEST score to recommend.
  let weakest = result.dimensions[0];
  let weakestRatio = Infinity;
  for (const d of result.dimensions) {
    const r = d.max === 0 ? 0 : d.score / d.max;
    if (r < weakestRatio) {
      weakestRatio = r;
      weakest = d;
    }
  }

  // Map weakest dimension to a test id; fallback to first test.
  const dimensionToTestId: Record<string, string> = {
    'self-awareness': 'autoconciencia',
    'self-regulation': 'autorregulacion',
    motivation: 'motivacion',
    empathy: 'empatia',
    'social-skills': 'habilidades',
  };
  const recommendedId =
    dimensionToTestId[weakest.name] ?? CATALOG_TESTS[0].id;

  return (
    <main className="min-h-dvh bg-[#fdf6f0] pb-24 md:pb-12">
      <MembersHeader email={email} />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-8">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#64748b]">
            Tests de inteligencia emocional
          </span>
          <h1 className="font-display mt-2 text-3xl font-bold text-[#0f172a] md:text-4xl">
            Profundiza en tu IE
          </h1>
          <p className="mt-3 text-sm text-[#64748b] md:text-base">
            10 tests específicos para conocerte mejor — cada uno enfocado en una
            dimensión o competencia clave.
          </p>
        </div>

        <TestsList recommendedId={recommendedId} tests={CATALOG_TESTS} />
      </div>

      <MembersMobileNav />
    </main>
  );
}
