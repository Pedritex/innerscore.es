'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { QUESTIONS } from '@/lib/questions';
import { getDimensionLabel } from '@/lib/scoring';
import type { QuizAnswer } from '@/types';

const SCALE = [
  { num: 1, label: 'Nunca' },
  { num: 2, label: 'Rara vez' },
  { num: 3, label: 'A veces' },
  { num: 4, label: 'A menudo' },
  { num: 5, label: 'Siempre' },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [email, setEmail] = useState('');
  const [phase, setPhase] = useState<'quiz' | 'email'>('quiz');

  const total = QUESTIONS.length;
  const completed = phase === 'email' ? total : currentIndex;
  const progressPct = (completed / total) * 100;

  const handleAnswer = (value: number) => {
    const question = QUESTIONS[currentIndex];
    const next: QuizAnswer[] = [
      ...answers.filter((a) => a.questionId !== question.id),
      { questionId: question.id, value },
    ];
    setAnswers(next);
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase('email');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    localStorage.setItem(
      'innerscore_session',
      JSON.stringify({ email, answers }),
    );
    router.push('/result');
  };

  const currentQuestion = QUESTIONS[currentIndex];

  return (
    <main className="min-h-dvh bg-white">
      <div className="mx-auto max-w-2xl px-6 pt-10">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-[#1d4ed8]">
            {phase === 'email'
              ? 'Último paso'
              : `Pregunta ${String(currentIndex + 1).padStart(2, '0')} de ${String(total).padStart(2, '0')}`}
          </span>
          <span className="font-medium text-[#94a3b8] tabular-nums">
            {Math.round(progressPct)}%
          </span>
        </div>
        <div
          className="mt-3 w-full overflow-hidden rounded-full"
          style={{ height: '5px', backgroundColor: '#e2e8f0' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #ea580c 0%, #f59e0b 100%)',
              transition: 'width 400ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-16">
        {phase === 'quiz' ? (
          <>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#1d4ed8]"
              style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
              }}
            >
              {getDimensionLabel(currentQuestion.dimension)}
            </span>

            <h2 className="font-display mt-6 max-w-2xl text-center text-3xl font-bold italic leading-snug text-[#0f172a] md:text-4xl">
              {currentQuestion.text}
            </h2>

            <div className="mt-12 flex w-full flex-col gap-3">
              {SCALE.map((s) => (
                <AnswerButton
                  key={s.num}
                  num={s.num}
                  label={s.label}
                  onClick={() => handleAnswer(s.num)}
                />
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <h2 className="font-display text-center text-4xl font-bold italic text-[#0f172a] md:text-5xl">
              Ya casi estás.
            </h2>
            <p className="mt-3 text-center text-base text-[#64748b]">
              ¿A dónde te enviamos tu resultado personalizado?
            </p>
            <input
              type="email"
              required
              autoFocus
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-8 w-full rounded-lg bg-white px-4 py-3 text-base text-[#0f172a] outline-none placeholder:text-[#94a3b8] transition-colors"
              style={{ border: '1px solid #dde8ff' }}
              onFocus={(e) =>
                (e.currentTarget.style.border = '1px solid #1d4ed8')
              }
              onBlur={(e) =>
                (e.currentTarget.style.border = '1px solid #dde8ff')
              }
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-xl px-6 py-3 text-base font-semibold text-white transition-transform hover:scale-[1.01]"
              style={{
                backgroundColor: '#1d4ed8',
                boxShadow: '0 8px 24px rgba(29,78,216,0.35)',
              }}
            >
              Ver mis resultados
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

function AnswerButton({
  num,
  label,
  onClick,
}: {
  num: number;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left text-base font-medium text-[#0f172a] transition-all"
      style={{
        backgroundColor: '#f8faff',
        border: '1px solid #dde8ff',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = '1px solid #1d4ed8';
        e.currentTarget.style.backgroundColor = '#eff6ff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '1px solid #dde8ff';
        e.currentTarget.style.backgroundColor = '#f8faff';
      }}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-[#1d4ed8]"
        style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
        }}
      >
        {num}
      </span>
      <span>{label}</span>
    </button>
  );
}
