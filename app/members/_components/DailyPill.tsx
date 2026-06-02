'use client';

import { useState } from 'react';
import Modal from './Modal';
import type { DailyPill as DailyPillType } from '@/lib/members-content';

export default function DailyPill({ pill }: { pill: DailyPillType }) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);

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
          backgroundColor: 'rgba(29,78,216,0.08)',
          color: '#1d4ed8',
        }}
      >
        ¿Lo sabías? · {pill.category}
      </span>
      <h2 className="font-display mt-4 text-2xl font-bold leading-tight text-[#0f172a] md:text-3xl">
        {pill.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#64748b] md:text-base">
        {pill.preview}
      </p>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1d4ed8] hover:underline"
      >
        Seguir leyendo →
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={pill.title}
        footer={
          <>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#64748b] transition-colors hover:bg-[#f1ebe5] hover:text-[#0f172a]"
              style={{ border: '1px solid #e8d5c8' }}
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={() => {
                setRead(true);
                setOpen(false);
              }}
              disabled={read}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
              style={{ backgroundColor: '#1d4ed8' }}
            >
              {read ? 'Marcado como leído' : 'Marcar como leído'}
            </button>
          </>
        }
      >
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
          style={{
            backgroundColor: 'rgba(29,78,216,0.08)',
            color: '#1d4ed8',
          }}
        >
          {pill.category}
        </span>
        <p className="mt-4">{pill.body}</p>
      </Modal>
    </div>
  );
}
