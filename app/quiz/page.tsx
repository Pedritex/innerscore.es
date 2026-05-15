'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

const GENDER_OPTIONS = [
  { value: 'hombre', label: 'Hombre' },
  { value: 'mujer', label: 'Mujer' },
  { value: 'prefiero-no-decirlo', label: 'Prefiero no decirlo' },
];

const INTRO_MESSAGES = [
  'Responda a cada afirmación basándose en su opinión personal.',
  'No puedes saltarte las preguntas, pero puedes volver a ellas más tarde.',
  'Responde con sinceridad, no hay respuestas correctas.',
];

const INTRO_CIRCLE_MS = 6000;
const INTRO_MESSAGE_MS = 2000;
const INTRO_CHECK_FADE_MS = 500;
const INTRO_HOLD_MS = 500;

type Phase = 'gender' | 'intro' | 'quiz' | 'done';

export default function QuizPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('gender');
  const [gender, setGender] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [introStep, setIntroStep] = useState(0);
  const [introCheckVisible, setIntroCheckVisible] = useState(false);

  const total = QUESTIONS.length;
  const completed = phase === 'done' ? total : currentIndex;
  const progressPct = (completed / total) * 100;

  useEffect(() => {
    if (phase !== 'intro') return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < INTRO_MESSAGES.length; i++) {
      timers.push(setTimeout(() => setIntroStep(i), i * INTRO_MESSAGE_MS));
    }
    timers.push(setTimeout(() => setIntroCheckVisible(true), INTRO_CIRCLE_MS));
    timers.push(
      setTimeout(
        () => setPhase('quiz'),
        INTRO_CIRCLE_MS + INTRO_CHECK_FADE_MS + INTRO_HOLD_MS,
      ),
    );
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [phase]);

  const persistSession = (allAnswers: QuizAnswer[]) => {
    localStorage.setItem(
      'innerscore_session',
      JSON.stringify({ email: '', gender, answers: allAnswers }),
    );
  };

  const handleGenderSelect = (value: string) => {
    setGender(value);
    setIntroStep(0);
    setIntroCheckVisible(false);
    setPhase('intro');
  };

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
      persistSession(next);
      setPhase('done');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleEditAnswers = () => {
    setCurrentIndex(total - 1);
    setPhase('quiz');
  };

  const handleGoToCheckout = () => {
    persistSession(answers);
    router.push('/checkout');
  };

  if (phase === 'gender') {
    return (
      <main className="min-h-dvh bg-white">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pt-10 pb-10">
          <h2 className="font-display text-center text-3xl font-bold italic leading-snug text-[#0f172a] md:text-4xl">
            ¿Con qué género te identificas?
          </h2>
          <div className="mt-10 flex w-full flex-col gap-3">
            {GENDER_OPTIONS.map((opt) => (
              <GenderButton
                key={opt.value}
                label={opt.label}
                onClick={() => handleGenderSelect(opt.value)}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (phase === 'intro') {
    return (
      <main className="min-h-dvh bg-white">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pt-16 pb-10 text-center">
          <ProgressCircle
            durationMs={INTRO_CIRCLE_MS}
            checkVisible={introCheckVisible}
            checkFadeMs={INTRO_CHECK_FADE_MS}
          />
          <div
            className="mt-10 w-full max-w-md"
            style={{ position: 'relative', height: '4rem' }}
          >
            {INTRO_MESSAGES.map((msg, i) => (
              <p
                key={i}
                className="text-base text-[#64748b] md:text-lg"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  opacity: introStep === i ? 1 : 0,
                  transition: 'opacity 500ms ease-in-out',
                }}
              >
                {msg}
              </p>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (phase === 'done') {
    return (
      <main className="min-h-dvh bg-white">
        <div className="mx-auto flex max-w-md flex-col items-center px-6 pt-20 pb-10 text-center">
          <DocumentCheckIcon />
          <h2 className="font-display mt-8 text-4xl font-bold italic text-[#0f172a] md:text-5xl">
            ¡Enhorabuena!
          </h2>
          <p className="mt-4 text-base text-[#64748b]">
            Has completado el test de inteligencia emocional.
          </p>
          <button
            type="button"
            onClick={handleGoToCheckout}
            className="mt-10 w-full rounded-xl px-6 py-3 text-base font-semibold text-white transition-transform hover:scale-[1.01]"
            style={{
              backgroundColor: '#1d4ed8',
              boxShadow: '0 8px 24px rgba(29,78,216,0.35)',
            }}
          >
            Obtener mis resultados
          </button>
          <button
            type="button"
            onClick={handleEditAnswers}
            className="mt-5 text-sm font-medium text-[#64748b] transition-colors hover:text-[#1d4ed8]"
          >
            Editar respuestas
          </button>
        </div>
      </main>
    );
  }

  const currentQuestion = QUESTIONS[currentIndex];
  const selectedValue = answers.find(
    (a) => a.questionId === currentQuestion?.id,
  )?.value;

  return (
    <main className="min-h-dvh bg-white">
      <div className="mx-auto max-w-2xl px-6 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-[#1d4ed8]">
            {`Pregunta ${String(currentIndex + 1).padStart(2, '0')} de ${String(total).padStart(2, '0')}`}
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

      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pt-6 pb-10">
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

        <div className="mt-10 flex w-full flex-col gap-3">
          {SCALE.map((s) => (
            <AnswerButton
              key={s.num}
              num={s.num}
              label={s.label}
              selected={selectedValue === s.num}
              onClick={() => handleAnswer(s.num)}
            />
          ))}
        </div>

        {currentIndex > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#64748b] transition-colors hover:text-[#1d4ed8]"
          >
            <span aria-hidden>←</span>
            Anterior
          </button>
        )}
      </div>
    </main>
  );
}

function AnswerButton({
  num,
  label,
  selected,
  onClick,
}: {
  num: number;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left text-base font-medium text-[#0f172a] transition-all"
      style={{
        backgroundColor: selected ? '#eff6ff' : '#f8faff',
        border: selected ? '1px solid #1d4ed8' : '1px solid #dde8ff',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = '1px solid #1d4ed8';
        e.currentTarget.style.backgroundColor = '#eff6ff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = selected
          ? '1px solid #1d4ed8'
          : '1px solid #dde8ff';
        e.currentTarget.style.backgroundColor = selected
          ? '#eff6ff'
          : '#f8faff';
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

function GenderButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-xl px-5 py-4 text-base font-medium text-[#0f172a] transition-all"
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
      {label}
    </button>
  );
}

function ProgressCircle({
  durationMs,
  checkVisible,
  checkFadeMs,
}: {
  durationMs: number;
  checkVisible: boolean;
  checkFadeMs: number;
}) {
  const size = 120;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <div
      style={{ position: 'relative', width: size, height: size }}
      aria-hidden
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1d4ed8"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            animation: `innerscore-circle-draw ${durationMs}ms cubic-bezier(0.65, 0, 0.35, 1) forwards`,
          }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: checkVisible ? 1 : 0,
          transition: `opacity ${checkFadeMs}ms ease-in-out`,
        }}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1d4ed8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <style>{`
        @keyframes innerscore-circle-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

function DocumentCheckIcon() {
  return (
    <span
      className="flex h-20 w-20 items-center justify-center rounded-full"
      style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}
      aria-hidden
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1d4ed8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <polyline points="9 14 11 16 15 12" />
      </svg>
    </span>
  );
}
