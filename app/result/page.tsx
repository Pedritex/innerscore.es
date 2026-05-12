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
  '15-page personalized PDF report',
  'Deep analysis of all 5 EQ dimensions',
  'Your emotional archetype profile',
  'Impact on relationships, work & decision-making',
  'Personalized 90-day growth plan',
];

export default function ResultPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [animated, setAnimated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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

  const handleCheckout = async () => {
    if (!session || !result || checkoutLoading) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.email,
          answers: session.answers,
          result,
        }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setCheckoutLoading(false);
      }
    } catch {
      setCheckoutLoading(false);
    }
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
              <div className="p-6" style={{ filter: 'blur(6px)' }}>
                <div className="h-3 w-1/3 rounded bg-[#cbd5e1]" />
                <div className="mt-4 h-3 w-full rounded bg-[#e2e8f0]" />
                <div className="mt-3 h-3 w-5/6 rounded bg-[#e2e8f0]" />
                <div className="mt-3 h-3 w-2/3 rounded bg-[#e2e8f0]" />
                <div className="mt-8 h-3 w-1/4 rounded bg-[#cbd5e1]" />
                <div className="mt-4 h-3 w-full rounded bg-[#e2e8f0]" />
                <div className="mt-3 h-3 w-11/12 rounded bg-[#e2e8f0]" />
                <div className="mt-3 h-3 w-3/4 rounded bg-[#e2e8f0]" />
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 rounded-b-xl"
              style={{
                background:
                  'linear-gradient(180deg, rgba(253,246,240,0) 0%, rgba(253,246,240,0.9) 60%, #fdf6f0 100%)',
              }}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                className="rounded-full bg-white p-3"
                style={{
                  border: '1px solid #e8d5c8',
                  boxShadow: '0 4px 12px rgba(15,23,42,0.06)',
                }}
              >
                <LockIcon />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm leading-relaxed text-[#64748b]">
            Your full 15-page report includes detailed analysis, your emotional
            archetype profile, impact on relationships &amp; work, and a
            personalized 90-day growth plan.
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
          <h2 className="font-display text-center text-3xl font-bold text-[#0f172a] md:text-4xl">
            Unlock Your Full Report
          </h2>

          <p className="mt-3 text-center text-sm text-[#64748b]">
            Tailored for{' '}
            <span className="font-display font-bold italic text-[#0f172a]">
              {result.archetype}
            </span>
          </p>

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
            disabled={checkoutLoading}
            className="mt-8 w-full rounded-xl px-6 py-4 text-base font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              backgroundColor: '#ea580c',
              boxShadow: '0 8px 24px rgba(234,88,12,0.35)',
            }}
          >
            {checkoutLoading ? 'Redirecting…' : 'Get My Full Report'}
          </button>

          <p className="mt-4 text-center text-xs text-[#94a3b8]">
            Delivered instantly to your email · One-time payment · No
            subscription
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
