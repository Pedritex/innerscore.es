export default function SuccessPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-white px-6 py-16">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl font-bold text-[#0f172a] md:text-5xl">
          Your report is on its way.
        </h1>
        <p className="mt-6 text-base text-[#64748b]">
          Check your inbox — your personalized 15-page EQ report will arrive
          within a few minutes.
        </p>
        <p className="mt-6 text-sm text-[#94a3b8]">
          Didn&apos;t receive it? Check your spam folder.
        </p>
      </div>
    </main>
  );
}
