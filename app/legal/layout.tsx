import Link from 'next/link';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[#fdf6f0]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#1d4ed8] hover:underline"
        >
          ← Back to InnerScore
        </Link>
        <article
          className="mt-8 rounded-2xl bg-white p-8 md:p-12 leading-relaxed text-[#0f172a]"
          style={{ border: '1px solid #e8d5c8' }}
        >
          {children}
        </article>
      </div>
    </div>
  );
}
