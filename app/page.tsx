import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#fdf6f0]">
      <Header />
      <Hero />
      <Features />
      <WhatYouGet />
      <PDFPreview />
      <Testimonials />
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
          <TrustItem icon={<IconUsers />} text="Join thousands discovering their EQ" />
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

function WhatYouGet() {
  const items = [
    { icon: <IconChart />, text: 'Your overall EQ score across 5 dimensions' },
    { icon: <IconEye />, text: 'Self-Awareness deep dive' },
    { icon: <IconHeart />, text: 'Empathy & social skills analysis' },
    { icon: <IconShield />, text: 'Emotional regulation strategies' },
    { icon: <IconMap />, text: 'Personalized action plan' },
    { icon: <IconInbox />, text: '15-page PDF delivered instantly to your inbox' },
  ];

  return (
    <section className="bg-white">
      <div
        className="mx-auto max-w-3xl px-6 py-20"
      >
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            What you&apos;ll get
          </h2>
          <p className="mt-3 text-[#64748b]">
            Everything you need to understand and grow your emotional intelligence.
          </p>
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.text}
              className="flex items-start gap-4 rounded-xl p-4"
              style={{
                backgroundColor: '#fdf6f0',
                border: '1px solid #e8d5c8',
              }}
            >
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: '#1d4ed8' }}
              >
                {item.icon}
              </span>
              <span className="text-sm font-medium text-[#0f172a]">
                {item.text}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-xl px-8 py-3 text-base font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: '#1d4ed8',
              boxShadow: '0 8px 24px rgba(29,78,216,0.35)',
            }}
          >
            Take the free test
          </Link>
        </div>
      </div>
    </section>
  );
}

function PDFPreview() {
  const pages = [
    {
      label: 'Page 1',
      title: 'Self-Awareness Score',
      score: 78,
      color: '#1d4ed8',
      bars: [
        { label: 'Emotional Identification', value: 82 },
        { label: 'Self-Reflection', value: 74 },
        { label: 'Accurate Self-Assessment', value: 79 },
      ],
    },
    {
      label: 'Page 2',
      title: 'Empathy Analysis',
      score: 65,
      color: '#ea580c',
      bars: [
        { label: 'Cognitive Empathy', value: 70 },
        { label: 'Emotional Resonance', value: 61 },
        { label: 'Social Attunement', value: 64 },
      ],
    },
    {
      label: 'Page 3',
      title: 'Emotional Regulation Profile',
      score: 71,
      color: '#059669',
      bars: [
        { label: 'Impulse Control', value: 68 },
        { label: 'Stress Tolerance', value: 75 },
        { label: 'Adaptability', value: 70 },
      ],
    },
  ];

  return (
    <section
      className="py-20"
      style={{ backgroundColor: '#fdf6f0' }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            What&apos;s inside your report
          </h2>
          <p className="mt-3 text-[#64748b]">
            A detailed, science-backed breakdown of your emotional intelligence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pages.map((page) => (
            <ReportPageMockup key={page.title} {...page} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportPageMockup({
  label,
  title,
  score,
  color,
  bars,
}: {
  label: string;
  title: string;
  score: number;
  color: string;
  bars: { label: string; value: number }[];
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl shadow-md"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e8d5c8',
      }}
    >
      {/* PDF page header strip */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ backgroundColor: color }}
      >
        <span className="text-xs font-semibold text-white opacity-80">
          InnerScore Report
        </span>
        <span className="text-xs font-medium text-white opacity-70">
          {label}
        </span>
      </div>

      <div className="p-5">
        {/* Section title */}
        <h3
          className="font-display text-base font-bold"
          style={{ color: '#0f172a' }}
        >
          {title}
        </h3>

        {/* Score ring placeholder */}
        <div className="my-4 flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {score}
          </div>
          <div>
            <p className="text-xs text-[#64748b]">Your score</p>
            <p className="text-sm font-semibold text-[#0f172a]">
              {score >= 75 ? 'Above average' : score >= 55 ? 'Average' : 'Below average'}
            </p>
          </div>
        </div>

        {/* Sub-dimension bars */}
        <div className="space-y-2">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="mb-1 flex justify-between text-xs text-[#64748b]">
                <span>{bar.label}</span>
                <span>{bar.value}</span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full"
                style={{ backgroundColor: '#e8d5c8' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${bar.value}%`, backgroundColor: color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder text lines */}
        <div className="mt-4 space-y-1.5">
          {[90, 75, 60].map((w) => (
            <div
              key={w}
              className="h-2 rounded-full"
              style={{ width: `${w}%`, backgroundColor: '#f1ebe5' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: 'Sara M.',
      age: 31,
      result: 'EQ Score: 84',
      quote:
        "I've always struggled to explain why I get so overwhelmed in conflicts. My report showed my Emotional Regulation score was 58 — lower than I expected. The action plan was concrete enough that I actually used it at work that same week.",
    },
    {
      name: 'Daniel R.',
      age: 27,
      result: 'EQ Score: 71',
      quote:
        "I took it skeptically, honestly. But my Empathy score came out at 63 and the breakdown explained exactly why I sometimes miss what people are feeling. Made me rethink how I listen in conversations.",
    },
    {
      name: 'Camille T.',
      age: 38,
      result: 'EQ Score: 91',
      quote:
        "I scored well overall but my Self-Awareness dimension was a 69. The report called out a pattern I hadn't named before. Sent it to my therapist — she said it was one of the most useful self-assessments she'd seen a client bring in.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            Real results, real people
          </h2>
          <p className="mt-3 text-[#64748b]">
            Here&apos;s what others discovered about themselves.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  age,
  result,
  quote,
}: {
  name: string;
  age: number;
  result: string;
  quote: string;
}) {
  return (
    <div
      className="flex flex-col rounded-2xl p-6"
      style={{
        backgroundColor: '#fdf6f0',
        border: '1px solid #e8d5c8',
      }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 text-[#ea580c]" aria-label="5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar key={i} />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[#374151]">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#0f172a]">{name}, {age}</p>
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium text-[#1d4ed8]"
          style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}
        >
          {result}
        </span>
      </div>
    </div>
  );
}

function IconStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ── What You'll Get icons ──────────────────────────────────────────────────────

function IconChart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

function IconInbox() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

// ── Hero icons (kept from original) ───────────────────────────────────────────

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
