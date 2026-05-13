'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateScores, getDimensionLabel } from '@/lib/scoring';
import type { QuizAnswer, QuizResult } from '@/types';

type Session = { email: string; answers: QuizAnswer[] };

const DIMENSION_COLORS: Record<string, string> = {
  'self-awareness': '#1d4ed8',
  'self-regulation': '#1d4ed8',
  motivation: '#0f172a',
  empathy: '#dc2626',
  'social-skills': '#0f172a',
};

const RING_RADIUS = 90;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const BULLETS = [
  'Emotional Archetype deep dive',
  '90-day growth roadmap',
  'Relationship patterns analysis',
  'Workplace EQ strategies',
  'Personalized action steps',
];

export default function ResultPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [animated, setAnimated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem('innerscore_session');
    if (!raw) {
      router.replace('/quiz');
      return;
    }
    try {
      const parsed: Session = JSON.parse(raw);
      if (!parsed?.answers?.length) {
        router.replace('/quiz');
        return;
      }
      setSession(parsed);
      setResult(calculateScores(parsed.answers));
      setLoading(false);
      requestAnimationFrame(() => setAnimated(true));
    } catch {
      router.replace('/quiz');
    }
  }, [router]);

  const handleCheckout = () => {
    if (!session || !result) return;
    router.push('/checkout');
  };

  if (loading || !result) {
    return <main className="min-h-dvh bg-[#fdf6f0]" />;
  }

  const ringOffset = animated
    ? RING_CIRCUMFERENCE * (1 - result.totalScore / 100)
    : RING_CIRCUMFERENCE;

  return (
    <main className="min-h-dvh bg-[#fdf6f0]">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <section>
          <h1 className="font-display text-center text-4xl font-bold text-[#0f172a] md:text-5xl">
            Your EQ Profile
          </h1>
          <p className="mt-2 text-center text-sm text-[#64748b]">
            Based on Goleman&apos;s 5-dimension EQ model
          </p>

          <div className="mt-14 flex flex-col items-center">
            <div className="relative h-56 w-56">
              <svg
                viewBox="0 0 200 200"
                className="h-full w-full -rotate-90"
                aria-hidden
              >
                <circle
                  cx="100"
                  cy="100"
                  r={RING_RADIUS}
                  stroke="#e2e8f0"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={RING_RADIUS}
                  stroke="#1d4ed8"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={ringOffset}
                  style={{
                    transition:
                      'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-6xl font-bold text-[#0f172a]">
                  {result.totalScore}
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-[#64748b]">
                  Overall EQ Score
                </span>
              </div>
            </div>

            <p className="font-display mt-8 text-3xl font-bold italic text-[#0f172a] md:text-4xl">
              {result.archetype}
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-5">
            {result.dimensions.map((d) => {
              const pct = d.max === 0 ? 0 : (d.score / d.max) * 100;
              const color = DIMENSION_COLORS[d.name] ?? '#1d4ed8';
              return (
                <div key={d.name}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium text-[#0f172a]">
                      {getDimensionLabel(d.name)}
                    </span>
                    <span className="tabular-nums text-[#64748b]">
                      {d.score} / {d.max}
                    </span>
                  </div>
                  <div
                    className="mt-2 w-full overflow-hidden rounded-full"
                    style={{ height: '8px', backgroundColor: '#e2e8f0' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: animated ? `${pct}%` : '0%',
                        backgroundColor: color,
                        transition:
                          'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative mt-16">
            <div
              className="select-none overflow-hidden rounded-xl bg-white"
              style={{ border: '1px solid #e8d5c8' }}
              aria-hidden
            >
              <div className="px-7 pb-20 pt-7">
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#1d4ed8]">
                  Section 3 of 8 — Preview
                </p>
                <h3 className="font-display mt-3 text-2xl font-bold text-[#0f172a]">
                  Your Emotional Archetype:{' '}
                  <span className="italic">{result.archetype}</span>
                </h3>

                <div style={{ filter: 'blur(4px)' }}>
                  <p className="mt-5 text-sm leading-relaxed text-[#0f172a]">
                    People who score like you tend to navigate close
                    relationships with a quiet, steady presence — anchoring the
                    people around them in moments of tension. But this same
                    instinct can quietly cost you when…
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#0f172a]">
                    At work, this pattern shows up as an unusual ability to
                    absorb pressure before it spreads to the team. The data
                    points to three specific scenarios where this serves you,
                    and two where it…
                  </p>

                  <div
                    className="mt-6 h-px w-full"
                    style={{ backgroundColor: '#e8d5c8' }}
                  />

                  <p className="mt-5 text-[10px] font-medium uppercase tracking-widest text-[#dc2626]">
                    Relationship Impact
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#0f172a]">
                    Your closest partners likely describe you as the person who
                    holds the centre when things shake. The hidden trade-off…
                  </p>
                </div>
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 rounded-b-xl"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(253,246,240,0.92) 55%, #fdf6f0 100%)',
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-5 flex items-center justify-center">
              <div
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2"
                style={{
                  border: '1px solid #e8d5c8',
                  boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
                }}
              >
                <LockIcon />
                <span className="text-xs font-medium text-[#0f172a]">
                  12 more pages locked
                </span>
              </div>
            </div>
          </div>

          <p className="font-display mx-auto mt-10 max-w-xl text-center text-3xl font-bold leading-tight text-[#0f172a] md:text-4xl">
            You&apos;re one step away from understanding yourself{' '}
            <span className="italic">completely.</span>
          </p>
        </section>

        <div
          className="my-16 h-px w-full"
          style={{ backgroundColor: '#e8d5c8' }}
        />

        <section
          className="rounded-2xl bg-white p-8"
          style={{ border: '1px solid #e8d5c8' }}
        >
          <div
            className="mx-auto flex w-fit items-center gap-2 rounded-full px-3 py-1.5"
            style={{ backgroundColor: 'rgba(29,78,216,0.08)' }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ backgroundColor: '#1d4ed8' }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: '#1d4ed8' }}
              />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-widest text-[#1d4ed8]">
              Your personalized report is ready to generate
            </span>
          </div>

          <h2 className="font-display mt-5 text-center text-3xl font-bold text-[#0f172a] md:text-4xl">
            Unlock Your Full Report
          </h2>

          <p className="mt-3 text-center text-sm text-[#64748b]">
            Tailored for{' '}
            <span className="font-display font-bold italic text-[#0f172a]">
              {result.archetype}
            </span>
          </p>

          <div className="mx-auto mt-7 max-w-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#0f172a]">Report</span>
              <span className="font-medium tabular-nums text-[#1d4ed8]">
                50% complete
              </span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: '#e2e8f0' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: animated ? '50%' : '0%',
                  backgroundColor: '#1d4ed8',
                  transition:
                    'width 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            </div>
            <p className="mt-2 text-center text-[11px] text-[#64748b]">
              Unlock to complete the remaining 50%
            </p>
          </div>

          <div className="mt-8 flex items-baseline justify-center gap-3">
            <span className="font-display text-6xl font-bold text-[#0f172a]">
              £9.99
            </span>
            <span className="text-lg text-[#94a3b8] line-through">£24.99</span>
          </div>

          <ul className="mx-auto mt-8 flex max-w-md flex-col gap-3">
            {BULLETS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-[#0f172a]"
              >
                <span className="mt-0.5 shrink-0 text-[#1d4ed8]">
                  <CheckIcon />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleCheckout}
            className="mt-10 w-full rounded-xl px-6 py-5 text-lg font-semibold text-white transition-transform hover:scale-[1.01] md:text-xl"
            style={{
              backgroundColor: '#ea580c',
              boxShadow: '0 12px 28px rgba(234,88,12,0.4)',
            }}
          >
            Get My Full Report — £9.99
          </button>

          <p className="mt-4 text-center text-xs text-[#94a3b8]">
            Instant delivery · PDF to your inbox · One-time payment
          </p>
        </section>
      </div>
    </main>
  );
}

function LockIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1d4ed8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
