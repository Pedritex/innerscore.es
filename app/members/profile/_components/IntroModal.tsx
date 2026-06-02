'use client';

import { useState } from 'react';
import Modal from '../../_components/Modal';
import type { ArchetypeContent } from '@/lib/members-content';

export default function IntroModal({
  archetype,
  displayName,
  isEvolved,
}: {
  archetype: ArchetypeContent;
  displayName: string;
  isEvolved: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
        style={{ color: archetype.color }}
      >
        Seguir leyendo →
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Tu arquetipo: ${displayName}`}
        footer={
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
            style={{ backgroundColor: archetype.color }}
          >
            Entendido
          </button>
        }
      >
        <div className="flex flex-col gap-4">
          {isEvolved ? (
            <span
              className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
              style={{
                backgroundColor: 'rgba(34,197,94,0.12)',
                color: '#15803d',
              }}
            >
              Versión evolucionada
            </span>
          ) : null}
          <p>{archetype.intro[0]}</p>
          <p>{archetype.intro[1]}</p>
          <p>{archetype.fullDescription}</p>
        </div>
      </Modal>
    </>
  );
}
