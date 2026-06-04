import MembersHeader from '@/app/components/MembersHeader';
import { loadMemberOrRedirect } from '@/lib/members-data';
import CancelForm from './_components/CancelForm';

export const dynamic = 'force-dynamic';

export default async function CancelPage() {
  const { email } = await loadMemberOrRedirect();

  return (
    <main className="min-h-dvh bg-[#fdf6f0]">
      <MembersHeader email={email} />

      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <CancelForm />
      </div>
    </main>
  );
}
