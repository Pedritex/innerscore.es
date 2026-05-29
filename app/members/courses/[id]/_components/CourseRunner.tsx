'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { CourseLesson } from '@/lib/members-content';

type Props = {
  id: string;
  title: string;
  description: string;
  gradient: [string, string];
  lessons: CourseLesson[];
};

const storageKey = (id: string) => `innerscore_course_${id}_progress`;

export default function CourseRunner({
  id,
  title,
  description,
  gradient,
  lessons,
}: Props) {
  const total = lessons.length;
  const [hydrated, setHydrated] = useState(false);
  const [current, setCurrent] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(id));
      const saved = raw ? Number(raw) : 0;
      const clamped = Number.isFinite(saved)
        ? Math.max(0, Math.min(total, saved))
        : 0;
      setCompletedCount(clamped);
      if (clamped >= total) {
        setShowResults(true);
        setCurrent(total - 1);
      } else {
        setCurrent(clamped);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [id, total]);

  const persist = (count: number) => {
    try {
      localStorage.setItem(storageKey(id), String(count));
    } catch {
      // ignore
    }
  };

  const handleNext = () => {
    const reached = Math.max(completedCount, current + 1);
    if (current >= total - 1) {
      const finished = total;
      setCompletedCount(finished);
      persist(finished);
      setShowResults(true);
      return;
    }
    setCompletedCount(reached);
    persist(reached);
    setCurrent((c) => c + 1);
  };

  const handlePrev = () => {
    if (current === 0) return;
    setCurrent((c) => c - 1);
  };

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <div
          className="h-64 animate-pulse rounded-3xl bg-white"
          style={{ border: '1px solid #e8d5c8' }}
        />
      </div>
    );
  }

  if (showResults) {
    return (
      <ResultsView
        id={id}
        title={title}
        description={description}
        gradient={gradient}
        total={total}
        onReview={() => {
          setShowResults(false);
          setCurrent(0);
        }}
      />
    );
  }

  const lesson = lessons[current];
  const progressPct = ((current + 1) / total) * 100;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link
          href="/members/courses"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#64748b] hover:text-[#0f172a]"
        >
          ← Volver a cursos
        </Link>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#64748b]">
          Lección {current + 1} / {total}
        </span>
      </div>

      <div
        className="overflow-hidden rounded-3xl bg-white"
        style={{
          border: '1px solid #e8d5c8',
          boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
        }}
      >
        <div
          className="px-7 py-8 text-white md:px-10 md:py-10"
          style={{
            background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest opacity-80">
            {title}
          </p>
          <h1 className="font-display mt-3 text-2xl font-bold md:text-3xl">
            {lesson.title}
          </h1>

          <div className="mt-6">
            <div
              className="h-1.5 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
              aria-hidden
            >
              <div
                className="h-full rounded-full transition-[width] duration-300"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: '#ffffff',
                }}
              />
            </div>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-widest opacity-80">
              Progreso · {Math.round(progressPct)}%
            </p>
          </div>
        </div>

        <div className="px-7 py-8 md:px-10 md:py-10">
          <p className="text-base leading-relaxed text-[#0f172a] md:text-lg">
            {lesson.content}
          </p>

          <div className="mt-8 flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={current === 0}
              className="inline-flex items-center justify-center rounded-xl border px-5 py-2.5 text-sm font-semibold text-[#0f172a] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                borderColor: '#e8d5c8',
                backgroundColor: '#fdf6f0',
              }}
            >
              ← Lección anterior
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
              style={{
                background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
                boxShadow: '0 10px 24px rgba(15,23,42,0.18)',
              }}
            >
              {current >= total - 1 ? 'Finalizar curso' : 'Siguiente lección →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsView({
  id,
  title,
  description,
  gradient,
  total,
  onReview,
}: {
  id: string;
  title: string;
  description: string;
  gradient: [string, string];
  total: number;
  onReview: () => void;
}) {
  const [showCertificate, setShowCertificate] = useState(false);

  const issuedDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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
            background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest opacity-80">
            Curso completado
          </p>
          <p className="mt-6 text-6xl md:text-7xl" aria-hidden>
            🏆
          </p>
          <h1 className="font-display mt-5 text-2xl font-bold md:text-3xl">
            ¡Has completado {title}!
          </h1>
          <p className="mt-3 text-sm opacity-90 md:text-base">
            {total} lecciones · 100% completado
          </p>
        </div>

        <div className="px-7 py-8 md:px-10 md:py-10">
          <p className="text-sm leading-relaxed text-[#0f172a] md:text-base">
            {description}
          </p>

          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <button
              type="button"
              onClick={() => setShowCertificate(true)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
              style={{
                background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
                boxShadow: '0 10px 24px rgba(15,23,42,0.18)',
              }}
            >
              🏅 Ver certificado
            </button>
            <Link
              href="/members/courses"
              className="inline-flex flex-1 items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-[#0f172a] transition-colors"
              style={{
                borderColor: '#e8d5c8',
                backgroundColor: '#fdf6f0',
              }}
            >
              Volver a cursos
            </Link>
          </div>

          <button
            type="button"
            onClick={onReview}
            className="mt-5 inline-flex w-full items-center justify-center text-xs font-semibold text-[#64748b] hover:text-[#0f172a]"
          >
            Repasar lecciones desde el inicio
          </button>
        </div>
      </div>

      {showCertificate ? (
        <CertificateModal
          id={id}
          title={title}
          gradient={gradient}
          issuedDate={issuedDate}
          onClose={() => setShowCertificate(false)}
        />
      ) : null}
    </div>
  );
}

function CertificateModal({
  id,
  title,
  gradient,
  issuedDate,
  onClose,
}: {
  id: string;
  title: string;
  gradient: [string, string];
  issuedDate: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 print:static print:p-0"
      style={{ backgroundColor: 'rgba(15,23,42,0.55)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white print:max-w-none print:rounded-none print:shadow-none"
        style={{
          border: '1px solid #e8d5c8',
          boxShadow: '0 30px 60px rgba(15,23,42,0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-[#64748b] transition-colors hover:bg-[#f1ebe5] hover:text-[#0f172a] print:hidden"
        >
          ✕
        </button>

        <div
          id={`certificate-${id}`}
          className="px-8 py-12 text-center md:px-16 md:py-16"
          style={{
            background:
              'linear-gradient(180deg, #fdf6f0 0%, #ffffff 60%, #fdf6f0 100%)',
          }}
        >
          <div
            className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full text-3xl text-white"
            style={{
              background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
            }}
            aria-hidden
          >
            🏅
          </div>
          <p
            className="mt-5 text-[11px] font-semibold uppercase tracking-[0.35em]"
            style={{ color: gradient[0] }}
          >
            Certificado de finalización
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold text-[#0f172a] md:text-4xl">
            Innerscore
          </h2>
          <p className="mt-8 text-sm text-[#64748b] md:text-base">
            Otorgado por completar con éxito el curso
          </p>
          <p className="font-display mt-3 text-2xl font-bold text-[#0f172a] md:text-3xl">
            {title}
          </p>

          <div
            className="mx-auto mt-10 h-px w-32"
            style={{ backgroundColor: '#e8d5c8' }}
          />
          <p className="mt-4 text-xs uppercase tracking-widest text-[#64748b]">
            Emitido el {issuedDate}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t bg-white px-6 py-4 print:hidden" style={{ borderColor: '#e8d5c8' }}>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm font-semibold text-[#0f172a]"
            style={{
              borderColor: '#e8d5c8',
              backgroundColor: '#fdf6f0',
            }}
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
            }}
          >
            Imprimir / Guardar PDF
          </button>
        </div>
      </div>
    </div>
  );
}
