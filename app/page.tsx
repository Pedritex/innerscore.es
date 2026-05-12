import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#fdf6f0]">
      <Header />
      <Hero />
      <Features />
    </div>
  );
}

function Header() {
  return (
    <header
      className="bg-white"
      style={{ borderBottom: '1px solid #e8d5c8' }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-6 py-4">
        <Link href="/" className="text-xl">
          <span className="font-display font-bold italic text-[#0f172a]">
            Inner
          </span>
          <span className="font-semibold text-[#1d4ed8]">Score</span>
        </Link>
        <div className="justify-self-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-[#1d4ed8]"
            style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#1d4ed8]" />
            EQ Assessment
          </span>
        </div>
        <div />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute"
        style={{
          top: '-60px',
          left: '-60px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(251,146,60,0.22) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute"
        style={{
          top: '-40px',
          right: '-40px',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '-50px',
          width: '320px',
          height: '180px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(234,88,12,0.14) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: 'rgba(255,255,255,0.8)',
            border: '1px solid #fed7aa',
            color: '#ea580c',
          }}
        >
          Emotional Intelligence Test
        </span>

        <h1 className="font-display mt-6 text-5xl font-bold leading-[1.08] text-[#0f172a] md:text-6xl">
          Discover how you really{' '}
          <em
            className="font-display font-bold italic"
            style={{ color: '#ea580c' }}
          >
            manage your emotions.
          </em>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base text-[#64748b] md:text-lg">
          14 questions. 5 dimensions. A 15-page personalized report delivered
          to your inbox.
        </p>

        <Link
          href="/quiz"
          className="mt-10 inline-flex items-center justify-center rounded-xl px-8 py-3 text-base font-semibold text-white transition-transform hover:scale-[1.02]"
          style={{
            backgroundColor: '#1d4ed8',
            boxShadow: '0 8px 24px rgba(29,78,216,0.35)',
          }}
        >
          Take the free test
        </Link>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#94a3b8]">
          <TrustItem icon={<IconUsers />} text="2,000+ tests taken" />
          <TrustItem icon={<IconBolt />} text="Instant delivery" />
          <TrustItem icon={<IconSparkles />} text="Backed by science" />
        </div>
      </div>
    </section>
  );
}

function TrustItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#1d4ed8]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Features() {
  return (
    <section className="mx-auto grid w-full max-w-5xl gap-4 px-6 py-20 md:grid-cols-3">
      <FeatureCard
        accent="#1d4ed8"
        title="Science-based"
        body="Built on Goleman's 5-dimension EQ model"
      />
      <FeatureCard
        accent="#1d4ed8"
        title="Fully personalized"
        body="Your report is generated uniquely from your answers"
      />
      <FeatureCard
        accent="#dc2626"
        title="Instant delivery"
        body="PDF sent to your email within minutes of purchase"
      />
    </section>
  );
}

function FeatureCard({
  accent,
  title,
  body,
}: {
  accent: string;
  title: string;
  body: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        backgroundColor: '#fdf6f0',
        border: '1px solid #e8d5c8',
      }}
    >
      <div style={{ height: '3px', backgroundColor: accent }} />
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-[#0f172a]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[#64748b]">{body}</p>
      </div>
    </div>
  );
}

function IconUsers() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z" />
    </svg>
  );
}
