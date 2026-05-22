'use client';

import { useState } from 'react';

type Item = { question: string; answer: string };

export default function Accordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <li
            key={item.question}
            className="overflow-hidden rounded-2xl bg-white"
            style={{ border: '1px solid #e8d5c8' }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
            >
              <span className="text-sm font-semibold text-[#0f172a] md:text-base">
                {item.question}
              </span>
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#1d4ed8] transition-transform"
                style={{
                  backgroundColor: 'rgba(29,78,216,0.08)',
                  transform: open ? 'rotate(45deg)' : 'none',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
            {open ? (
              <div
                className="px-5 pb-5 text-sm leading-relaxed text-[#64748b] md:text-base"
                style={{ borderTop: '1px solid #f1ebe5' }}
              >
                <p className="pt-4">{item.answer}</p>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
