'use client';

import { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Modal({ open, onClose, title, children, footer }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15,23,42,0.55)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-xl overflow-hidden rounded-3xl bg-white"
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
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#64748b] transition-colors hover:bg-[#f1ebe5] hover:text-[#0f172a]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {title ? (
          <div className="px-7 pt-7 pb-3">
            <h2 className="font-display pr-8 text-xl font-bold text-[#0f172a] md:text-2xl">
              {title}
            </h2>
          </div>
        ) : null}

        <div className="max-h-[60vh] overflow-y-auto px-7 py-3 text-sm leading-relaxed text-[#0f172a] md:text-base">
          {children}
        </div>

        {footer ? (
          <div
            className="flex justify-end gap-3 px-7 py-4"
            style={{ borderTop: '1px solid #f1ebe5' }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
