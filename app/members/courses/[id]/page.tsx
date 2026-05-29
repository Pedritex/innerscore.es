import { notFound } from 'next/navigation';
import MembersHeader from '@/app/components/MembersHeader';
import MembersMobileNav from '@/app/components/MembersMobileNav';
import { loadMemberOrRedirect } from '@/lib/members-data';
import { CATALOG_COURSES, getCourseContent } from '@/lib/members-content';
import CourseRunner from './_components/CourseRunner';

export const dynamic = 'force-dynamic';

type Params = { id: string };

export default async function CoursePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const catalogEntry = CATALOG_COURSES.find((c) => c.id === id);
  const content = getCourseContent(id);

  if (!catalogEntry || !content) {
    notFound();
  }

  const { email } = await loadMemberOrRedirect();

  return (
    <main className="min-h-dvh bg-[#fdf6f0] pb-24 md:pb-12">
      <MembersHeader email={email} />

      <CourseRunner
        id={catalogEntry.id}
        title={catalogEntry.title}
        description={catalogEntry.description}
        gradient={catalogEntry.gradient}
        lessons={content.lessons}
      />

      <MembersMobileNav />
    </main>
  );
}
