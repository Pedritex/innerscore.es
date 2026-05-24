'use client';

import { useEffect, useState } from 'react';

const TOTAL_TESTS = 10;

export default function ProgressWidget() {
  const [testsCompleted, setTestsCompleted] = useState(0);

  useEffect(() => {
    let count = 0;
    try {
      for (let i = 1; i <= TOTAL_TESTS; i++) {
        if (
          localStorage.getItem(`innerscore_test_${i}_completed`) === 'true'
        ) {
          count++;
        }
      }
    } catch {
      // ignore
    }
    setTestsCompleted(count);
  }, []);

  const items: { label: string; value: string }[] = [
    {
      label: 'Tests completados',
      value: `${testsCompleted} / ${TOTAL_TESTS}`,
    },
    { label: 'Cursos terminados', value: '0' },
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
