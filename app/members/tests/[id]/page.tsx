import { notFound } from 'next/navigation';
import MembersHeader from '@/app/components/MembersHeader';
import MembersMobileNav from '@/app/components/MembersMobileNav';
import { loadMemberOrRedirect } from '@/lib/members-data';
import { CATALOG_TESTS } from '@/lib/members-content';
import { SLOT_TO_TEST_ID, TEST_BANK } from '@/lib/members-test-content';
import TestRunner from './_components/TestRunner';

export const dynamic = 'force-dynamic';

type Params = { id: string };

export default async function TestPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const slot = Number(id);

  if (!Number.isInteger(slot) || slot < 1 || slot > 10) {
    notFound();
  }

  const testId = SLOT_TO_TEST_ID[slot];
  const catalogEntry = CATALOG_TESTS.find((t) => t.slot === slot);
  const bank = TEST_BANK[testId];

  if (!catalogEntry || !bank) {
    notFound();
  }

  const { email } = await loadMemberOrRedirect();

  return (
    <main className="min-h-dvh bg-[#fdf6f0] pb-24 md:pb-12">
      <MembersHeader email={email} />

      <TestRunner
        slot={slot}
        title={catalogEntry.title}
        description={catalogEntry.description}
        accent={catalogEntry.accent}
        category={catalogEntry.category}
        questions={bank.questions}
        feedback={bank.feedback}
      />

      <MembersMobileNav />
    </main>
  );
}
