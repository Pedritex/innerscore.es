'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type {
  TestFeedback,
  TestQuestion,
} from '@/lib/members-test-content';
import { bracketFromScore } from '@/lib/members-test-content';

type Props = {
  slot: number;
  title: string;
  description: string;
  accent: string;
  category: 'dimensiones' | 'personales';
  questions: TestQuestion[];
  feedback: TestFeedback;
};

const AUTO_ADVANCE_MS = 380;

export default function TestRunner({
  slot,
  title,
  description,
  accent,
  category,
  questions,
  feedback,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    () => Array.from({ length: questions.length }, () => -1),
  );
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (optionIdx: number) => {
    if (showResults) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionIdx;
      return next;
    });
    setTimeout(() => {
      if (current >= questions.length - 1) {
        setShowResults(true);
      } else {
        setCurrent((c) => c + 1);
      }
    }, AUTO_ADVANCE_MS);
  };

  const handlePrev = () => {
    if (current === 0) return;
    setCurrent((c) => c - 1);
  };

  if (showResults) {
    const score = answers.reduce(
      (sum, ans, i) => sum + (ans === questions[i].correctIndex ? 1 : 0),
      0,
    );
    return (
      <ResultsView
        slot={slot}
        title={title}
        accent={accent}
        score={score}
        total={questions.length}
        answers={answers}
        questions={questions}
        feedback={feedback}
      />
    );
  }

  const q = questions[current];
  const progress = ((current + (answers[current] >= 0 ? 1 : 0)) / questions.length) * 100;
  const selected = answers[current];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <Link
        href="/members/tests"
        className="inline-flex items-center gap-1 text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"
      >
        ← Volver a tests
      </Link>

      <header className="mt-6">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
          style={{
            backgroundColor: 'rgba(15,23,42,0.05)',
            color: '#64748b',
          }}
        >
          {category === 'dimensiones' ? 'Dimensión IE' : 'Competencia personal'}
        </span>
        <h1 className="font-display mt-3 text-2xl font-bold text-[#0f172a] md:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-[#64748b] md:text-base">{description}</p>
      </header>

      {/* Progress */}
      <div className="mt-8">
        <div className="flex items-center justify-between text-xs text-[#64748b]">
          <span>
            Pregunta <strong className="text-[#0f172a]">{current + 1}</strong>{' '}
            de {questions.length}
          </span>
          <span className="tabular-nums">{Math.round(progress)}%</span>
        </div>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: '#e8d5c8' }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              backgroundColor: accent,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div
        className="mt-8 rounded-3xl bg-white p-6 md:p-8"
        style={{
          border: '1px solid #e8d5c8',
          boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
        }}
      >
        <p className="font-display text-xl font-bold leading-snug text-[#0f172a] md:text-2xl">
          {q.question}
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => handleSelect(i)}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left text-sm transition-all md:text-base"
                  style={{
                    backgroundColor: isSelected
                      ? `${accent}1a`
                      : '#ffffff',
                    border: `1.5px solid ${isSelected ? accent : '#e8d5c8'}`,
                  }}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: isSelected ? accent : '#ffffff',
                      color: isSelected ? '#ffffff' : '#64748b',
                      border: `1.5px solid ${isSelected ? accent : '#e8d5c8'}`,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-[#0f172a]">{opt}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          disabled={current === 0}
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:bg-[#f1ebe5] disabled:cursor-not-allowed disabled:opacity-50"
          style={{ border: '1px solid #e8d5c8' }}
        >
          ← Anterior
        </button>
        <p className="text-xs text-[#94a3b8]">
          Selecciona una opción para continuar
        </p>
      </div>
    </div>
  );
}

function ResultsView({
  slot,
  title,
  accent,
  score,
  total,
  answers,
  questions,
  feedback,
}: {
  slot: number;
  title: string;
  accent: string;
  score: number;
  total: number;
  answers: number[];
  questions: TestQuestion[];
  feedback: TestFeedback;
}) {
  const [expanded, setExpanded] = useState(false);
  const bracket = bracketFromScore(score);
  const fb = feedback[bracket];

  useEffect(() => {
    try {
      localStorage.setItem(`innerscore_test_${slot}_completed`, 'true');
      localStorage.setItem(
        `innerscore_test_${slot}_score`,
        String(score),
      );
    } catch {
      // ignore
    }
  }, [slot, score]);

  const bracketColor =
    bracket === 'high' ? '#15803d' : bracket === 'mid' ? '#1d4ed8' : '#c2410c';
  const bracketBg =
    bracket === 'high'
      ? 'rgba(34,197,94,0.12)'
      : bracket === 'mid'
        ? 'rgba(29,78,216,0.10)'
        : 'rgba(234,88,12,0.12)';

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <div
        className="overflow-hidden rounded-3xl bg-white"
        style={{
          border: '1px solid #e8d5c8',
          boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
        }}
      >
        <div
          className="px-7 py-10 text-center text-white md:px-10 md:py-14"
          style={{
            background: `linear-gradient(135deg, ${accent} 0%, #0f172a 100%)`,
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest opacity-80">
            Resultado de tu test
          </p>
          <h1 className="font-display mt-3 text-2xl font-bold md:text-3xl">
            {title}
          </h1>
          <p className="font-display mt-6 text-6xl font-bold tabular-nums md:text-7xl">
            {score}
            <span className="text-3xl font-semibold opacity-70 md:text-4xl">
              {' '}
              / {total}
            </span>
          </p>
          <span
            className="mt-5 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white"
            style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
          >
            {fb.level}
          </span>
        </div>

        <div className="px-7 py-8 md:px-10 md:py-10">
          <div
            className="rounded-2xl p-5 md:p-6"
            style={{
              backgroundColor: bracketBg,
              border: `1px solid ${bracketColor}33`,
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: bracketColor }}
            >
              Tu nivel: {fb.level}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#0f172a] md:text-base">
              {fb.text}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1d4ed8] hover:underline"
            aria-expanded={expanded}
          >
            {expanded ? 'Ocultar explicaciones' : 'Ver explicación de cada pregunta'}
            <span aria-hidden>{expanded ? '↑' : '↓'}</span>
          </button>

          {expanded ? (
            <ol className="mt-5 flex flex-col gap-4">
              {questions.map((q, i) => {
                const userAns = answers[i];
                const ok = userAns === q.correctIndex;
                return (
                  <li
                    key={i}
                    className="rounded-2xl p-5"
                    style={{
                      backgroundColor: '#fdf6f0',
                      border: '1px solid #e8d5c8',
                    }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                      Pregunta {i + 1} —{' '}
                      <span
                        style={{ color: ok ? '#15803d' : '#dc2626' }}
                      >
                        {ok ? '✓ correcto' : '✗ incorrecto'}
                      </span>
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#0f172a]">
                      {q.question}
                    </p>
                    {!ok && userAns >= 0 ? (
                      <p className="mt-2 text-xs text-[#64748b]">
                        Tu respuesta:{' '}
                        <span className="text-[#0f172a]">
                          {String.fromCharCode(65 + userAns)}) {q.options[userAns]}
                        </span>
                      </p>
                    ) : null}
                    <p className="mt-1 text-xs text-[#64748b]">
                      Respuesta más alineada con IE:{' '}
                      <span className="text-[#0f172a]">
                        {String.fromCharCode(65 + q.correctIndex)}){' '}
                        {q.options[q.correctIndex]}
                      </span>
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#0f172a]">
                      {q.explanation}
                    </p>
                  </li>
                );
              })}
            </ol>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <Link
              href="/members/tests"
              className="flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] md:w-auto"
              style={{
                backgroundColor: accent,
                boxShadow: '0 10px 24px rgba(15,23,42,0.18)',
              }}
            >
              Volver a tests
            </Link>
            <Link
              href="/members"
              className="flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-[#0f172a] transition-colors hover:bg-[#f1ebe5] md:w-auto"
              style={{ border: '1px solid #e8d5c8' }}
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
