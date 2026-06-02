'use client';

import { useState } from 'react';
import type { TriviaQuestion } from '@/lib/members-content';

export default function DailyTrivia({ question }: { question: TriviaQuestion }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === question.correctIndex;

  return (
    <div
      className="rounded-3xl bg-white p-6 md:p-8"
      style={{
        border: '1px solid #e8d5c8',
        boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
      }}
    >
      <span
        className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
        style={{
          backgroundColor: 'rgba(234,88,12,0.12)',
          color: '#c2410c',
        }}
      >
        Trivial diario · IE
      </span>
      <h2 className="font-display mt-4 text-xl font-bold leading-snug text-[#0f172a] md:text-2xl">
        {question.question}
      </h2>

      <ul className="mt-5 flex flex-col gap-2">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const showCorrect = submitted && i === question.correctIndex;
          const showWrong = submitted && isSelected && !isCorrect;
          const bg = showCorrect
            ? '#ecfdf5'
            : showWrong
              ? '#fef2f2'
              : isSelected
                ? 'rgba(29,78,216,0.06)'
                : '#ffffff';
          const border = showCorrect
            ? '#22c55e'
            : showWrong
              ? '#dc2626'
              : isSelected
                ? '#1d4ed8'
                : '#e8d5c8';
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => !submitted && setSelected(i)}
                disabled={submitted}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors disabled:cursor-default"
                style={{
                  backgroundColor: bg,
                  border: `1px solid ${border}`,
                }}
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{
                    backgroundColor: isSelected || showCorrect ? border : '#ffffff',
                    color: isSelected || showCorrect ? '#ffffff' : '#64748b',
                    border: `1px solid ${border}`,
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span
                  className={`flex-1 ${
                    showCorrect
                      ? 'text-[#0f172a] font-medium'
                      : showWrong
                        ? 'text-[#0f172a]'
                        : 'text-[#0f172a]'
                  }`}
                >
                  {opt}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {submitted ? (
        <div
          className="mt-5 rounded-2xl p-4"
          style={{
            backgroundColor: isCorrect ? '#ecfdf5' : '#fef2f2',
            border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
          }}
        >
          <p className="text-sm font-semibold text-[#0f172a]">
            {isCorrect ? '✓ ¡Correcto!' : '✗ No exactamente'}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#0f172a]">
            {question.explanation}
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={selected === null}
          className="mt-6 w-full rounded-xl px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          style={{
            backgroundColor: '#1d4ed8',
            boxShadow: '0 8px 20px rgba(29,78,216,0.35)',
          }}
        >
          Responder y ver resultado
        </button>
      )}
    </div>
  );
}
