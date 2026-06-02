'use client';

import { useState } from 'react';
import { TAB_LABELS, type ArchetypeContent, type TabKey } from '@/lib/members-content';

const TAB_ORDER: TabKey[] = [
  'caracteristicas',
  'motivaciones',
  'relaciones',
  'trabajo',
  'estres',
  'crecimiento',
];

export default function ProfileTabs({
  archetype,
}: {
  archetype: ArchetypeContent;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>('caracteristicas');
  const items = archetype.tabs[activeTab];

  return (
    <div>
      <div
        className="flex gap-2 overflow-x-auto rounded-2xl bg-white p-2"
        style={{ border: '1px solid #e8d5c8' }}
      >
        {TAB_ORDER.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                backgroundColor: active ? archetype.color : 'transparent',
                color: active ? '#ffffff' : '#64748b',
              }}
            >
              {TAB_LABELS[tab]}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl bg-white p-5"
            style={{
              border: '1px solid #e8d5c8',
              boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
            }}
          >
            <p className="font-display text-base font-bold text-[#0f172a]">
              {item.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
