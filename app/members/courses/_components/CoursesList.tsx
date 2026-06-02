'use client';

import Link from 'next/link';
import type { CatalogCourse } from '@/lib/members-content';

export default function CoursesList({
  recommended,
  others,
}: {
  recommended: CatalogCourse;
  others: CatalogCourse[];
}) {
  return (
    <>
      {/* Hero recommended course */}
      <article
        className="overflow-hidden rounded-3xl bg-white md:grid md:grid-cols-[1fr_280px]"
        style={{
          border: '1px solid #e8d5c8',
          boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
        }}
      >
        <div className="p-7 md:p-9">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: 'rgba(29,78,216,0.10)',
              color: '#1d4ed8',
            }}
          >
            Curso recomendado para ti
          </span>
          <h2 className="font-display mt-4 text-2xl font-bold text-[#0f172a] md:text-3xl">
            {recommended.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#64748b] md:text-base">
            {recommended.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[#64748b]">
            <span>📚 {recommended.classes} clases</span>
            <span>🗓 {recommended.weeks} semanas</span>
            <span>🏅 Con certificado</span>
            <span>
              👥 {recommended.completed.toLocaleString('es-ES')} personas lo han
              completado
            </span>
          </div>

          <Link
            href={`/members/courses/${recommended.id}`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] md:w-auto"
            style={{
              background: `linear-gradient(135deg, ${recommended.gradient[0]} 0%, ${recommended.gradient[1]} 100%)`,
              boxShadow: '0 10px 24px rgba(15,23,42,0.18)',
            }}
          >
            Iniciar curso
          </Link>
        </div>
        <div
          className="hidden h-full md:flex md:items-center md:justify-center"
          style={{
            background: `linear-gradient(135deg, ${recommended.gradient[0]} 0%, ${recommended.gradient[1]} 100%)`,
          }}
        >
          <span className="text-7xl drop-shadow-md" aria-hidden>
            🎓
          </span>
        </div>
      </article>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {others.map((course) => (
          <article
            key={course.id}
            className="overflow-hidden rounded-2xl bg-white"
            style={{
              border: '1px solid #e8d5c8',
              boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
            }}
          >
            <div
              className="flex h-32 items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${course.gradient[0]} 0%, ${course.gradient[1]} 100%)`,
              }}
              aria-hidden
            >
              <span className="text-5xl drop-shadow-md">📘</span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-base font-bold text-[#0f172a]">
                {course.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-[#64748b]">
                {course.description}
              </p>
              <p className="mt-3 text-xs text-[#94a3b8]">
                {course.classes} clases · {course.weeks} semanas · Certificado
              </p>

              <div className="mt-4 flex items-center gap-3">
                <AvatarStack />
                <span className="text-xs text-[#64748b]">
                  <strong className="text-[#0f172a]">
                    {course.completed.toLocaleString('es-ES')}
                  </strong>{' '}
                  lo han completado
                </span>
              </div>

              <Link
                href={`/members/courses/${course.id}`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
                style={{
                  background: `linear-gradient(135deg, ${course.gradient[0]} 0%, ${course.gradient[1]} 100%)`,
                }}
              >
                Iniciar curso
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function AvatarStack() {
  const colors = ['#1d4ed8', '#ea580c', '#7c3aed', '#22c55e'];
  return (
    <div className="flex -space-x-2" aria-hidden>
      {colors.map((c, i) => (
        <span
          key={i}
          className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{
            backgroundColor: c,
            border: '2px solid #ffffff',
          }}
        >
          {String.fromCharCode(65 + i)}
        </span>
      ))}
    </div>
  );
}
