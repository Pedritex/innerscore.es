'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { CatalogTest } from '@/lib/members-content';

type Filter = 'todos' | 'dimensiones' | 'personales';

export default function TestsList({
  recommendedId,
  tests,
}: {
  recommendedId: string;
  tests: CatalogTest[];
}) {
  const [filter, setFilter] = useState<Filter>('todos');
  const [page, setPage] = useState(1);
  const [completed, setCompleted] = useState<Record<number, number | true>>({});

  useEffect(() => {
    const next: Record<number, number | true> = {};
    for (const t of tests) {
      try {
        const done = localStorage.getItem(
          `innerscore_test_${t.slot}_completed`,
        );
        if (done === 'true') {
          const rawScore = localStorage.getItem(
            `innerscore_test_${t.slot}_score`,
          );
          const score = rawScore ? Number(rawScore) : NaN;
          next[t.slot] = Number.isFinite(score) ? score : true;
        }
      } catch {
        // ignore
      }
    }
    setCompleted(next);
  }, [tests]);

  const recommended = useMemo(
    () => tests.find((t) => t.id === recommendedId) ?? tests[0],
    [recommendedId, tests],
  );

  const filteredOthers = useMemo(() => {
    const rest = tests.filter((t) => t.id !== recommended.id);
    if (filter === 'todos') return rest;
    return rest.filter((t) => t.category === filter);
  }, [tests, recommended, filter]);

  const visibleCount = page * 6;
  const visible = filteredOthers.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredOthers.length;

  return (
    <>
      {/* Filters */}
      <div
        className="flex gap-2 overflow-x-auto rounded-2xl bg-white p-2"
        style={{ border: '1px solid #e8d5c8' }}
      >
        {[
          { key: 'todos' as Filter, label: 'Todos' },
          { key: 'dimensiones' as Filter, label: 'Dimensiones IE' },
          { key: 'personales' as Filter, label: 'Competencias personales' },
        ].map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                setFilter(f.key);
                setPage(1);
              }}
              className="whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                backgroundColor: active ? '#1d4ed8' : 'transparent',
                color: active ? '#ffffff' : '#64748b',
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Recommended hero card */}
      <article
        className="mt-8 overflow-hidden rounded-3xl bg-white md:grid md:grid-cols-[1fr_240px]"
        style={{
          border: '1px solid #e8d5c8',
          boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
        }}
      >
        <div className="p-7 md:p-9">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: 'rgba(234,88,12,0.12)',
              color: '#c2410c',
            }}
          >
            Recomendado para ti
          </span>
          <h2 className="font-display mt-4 text-2xl font-bold text-[#0f172a] md:text-3xl">
            {recommended.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#64748b] md:text-base">
            {recommended.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
            <span
              className="rounded-full px-3 py-1 font-medium"
              style={{
                backgroundColor: '#fdf6f0',
                border: '1px solid #e8d5c8',
                color: '#64748b',
              }}
            >
              {recommended.category === 'dimensiones'
                ? 'Dimensión IE'
                : 'Competencia personal'}
            </span>
            <span className="text-[#64748b]">
              {recommended.questions} preguntas · {recommended.duration}
            </span>
            <CompletionBadge result={completed[recommended.slot]} />
          </div>
          <Link
            href={`/members/tests/${recommended.slot}`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] md:w-auto"
            style={{
              backgroundColor: recommended.accent,
              boxShadow: '0 10px 24px rgba(15,23,42,0.18)',
            }}
          >
            {completed[recommended.slot] !== undefined
              ? 'Repetir test'
              : 'Iniciar ahora'}
          </Link>
        </div>
        <div
          className="hidden h-full md:flex md:items-center md:justify-center"
          style={{
            background: `linear-gradient(135deg, ${recommended.accent} 0%, #0f172a 100%)`,
          }}
        >
          <TestSvgMockup accent={recommended.accent} />
        </div>
      </article>

      {/* Grid */}
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {visible.map((test) => (
          <article
            key={test.id}
            className="overflow-hidden rounded-2xl bg-white"
            style={{
              border: '1px solid #e8d5c8',
              boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
            }}
          >
            <div
              className="h-2"
              style={{ backgroundColor: test.accent }}
              aria-hidden
            />
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                  style={{
                    backgroundColor: '#fdf6f0',
                    border: '1px solid #e8d5c8',
                    color: '#64748b',
                  }}
                >
                  {test.category === 'dimensiones'
                    ? 'Dimensión IE'
                    : 'Competencia personal'}
                </span>
                <CompletionBadge result={completed[test.slot]} />
              </div>
              <h3 className="font-display mt-3 text-lg font-bold text-[#0f172a]">
                {test.title}
              </h3>
              <p className="mt-2 text-sm text-[#64748b]">{test.description}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs text-[#94a3b8]">
                  {test.questions} preguntas · {test.duration}
                </span>
                <Link
                  href={`/members/tests/${test.slot}`}
                  className="rounded-lg px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.01]"
                  style={{ backgroundColor: test.accent }}
                >
                  {completed[test.slot] !== undefined
                    ? 'Repetir test'
                    : 'Iniciar test'}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {canLoadMore ? (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl px-6 py-3 text-sm font-medium text-[#0f172a] transition-colors hover:bg-[#f1ebe5]"
            style={{ border: '1px solid #e8d5c8' }}
          >
            Cargar más tests
          </button>
        </div>
      ) : null}
    </>
  );
}

function CompletionBadge({ result }: { result: number | true | undefined }) {
  if (result === undefined) return null;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest"
      style={{
        backgroundColor: 'rgba(34,197,94,0.12)',
        color: '#15803d',
      }}
    >
      ✓ Completado
      {typeof result === 'number' ? (
        <span className="font-display ml-1 tabular-nums">{result}/10</span>
      ) : null}
    </span>
  );
}

function TestSvgMockup({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width="180"
      height="180"
      fill="none"
      aria-hidden
    >
      <rect
        x="30"
        y="30"
        width="140"
        height="140"
        rx="16"
        fill="#ffffff"
        opacity="0.95"
      />
      <rect x="50" y="60" width="100" height="6" rx="3" fill={accent} opacity="0.6" />
      <rect x="50" y="78" width="80" height="6" rx="3" fill={accent} opacity="0.4" />
      <rect x="50" y="100" width="100" height="10" rx="5" fill={accent} opacity="0.18" />
      <rect x="50" y="100" width="60" height="10" rx="5" fill={accent} />
      <rect x="50" y="118" width="100" height="10" rx="5" fill={accent} opacity="0.18" />
      <rect x="50" y="118" width="40" height="10" rx="5" fill={accent} />
      <rect x="50" y="136" width="100" height="10" rx="5" fill={accent} opacity="0.18" />
      <rect x="50" y="136" width="80" height="10" rx="5" fill={accent} />
    </svg>
  );
}
