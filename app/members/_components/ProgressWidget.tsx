'use client';

import { useEffect, useState } from 'react';
import { CATALOG_COURSES, COURSE_CONTENT } from '@/lib/members-content';

const TOTAL_TESTS = 10;
const TOTAL_COURSES = CATALOG_COURSES.length;

export default function ProgressWidget() {
  const [testsCompleted, setTestsCompleted] = useState(0);
  const [coursesCompleted, setCoursesCompleted] = useState(0);

  useEffect(() => {
    try {
      let testCount = 0;
      for (let i = 1; i <= TOTAL_TESTS; i++) {
        if (
          localStorage.getItem(`innerscore_test_${i}_completed`) === 'true'
        ) {
          testCount++;
        }
      }
      setTestsCompleted(testCount);

      let courseCount = 0;
      for (const course of CATALOG_COURSES) {
        const totalLessons = COURSE_CONTENT[course.id]?.lessons.length ?? 0;
        if (totalLessons === 0) continue;
        const raw = localStorage.getItem(
          `innerscore_course_${course.id}_progress`,
        );
        if (raw && Number(raw) >= totalLessons) {
          courseCount++;
        }
      }
      setCoursesCompleted(courseCount);
    } catch {
      // ignore
    }
  }, []);

  const items: { label: string; value: string }[] = [
    {
      label: 'Tests completados',
      value: `${testsCompleted} / ${TOTAL_TESTS}`,
    },
    {
      label: 'Cursos terminados',
      value: `${coursesCompleted} / ${TOTAL_COURSES}`,
    },
    { label: 'Dimensiones exploradas', value: '0' },
  ];

  return (
    <div
      className="rounded-2xl bg-white p-6"
      style={{
        border: '1px solid #e8d5c8',
        boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
      }}
    >
      <p className="text-xs font-medium uppercase tracking-widest text-[#64748b]">
        Tu progreso
      </p>
      <ul className="mt-4 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.label} className="flex items-center justify-between">
            <span className="text-sm text-[#0f172a]">{item.label}</span>
            <span className="font-display text-lg font-bold tabular-nums text-[#0f172a]">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
