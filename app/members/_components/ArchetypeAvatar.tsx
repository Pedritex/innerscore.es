import type { ArchetypeKey } from '@/lib/members-data';

type Props = {
  archetypeKey: ArchetypeKey;
  color: string;
  size?: number;
};

export default function ArchetypeAvatar({
  archetypeKey,
  color,
  size = 96,
}: Props) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: hexWithAlpha(color, 0.12),
        border: `2px solid ${hexWithAlpha(color, 0.35)}`,
      }}
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <ArchetypeGlyph archetypeKey={archetypeKey} />
      </svg>
    </div>
  );
}

function ArchetypeGlyph({ archetypeKey }: { archetypeKey: ArchetypeKey }) {
  switch (archetypeKey) {
    case 'observador':
      // eye in a circle
      return (
        <g>
          <circle cx="12" cy="12" r="9" />
          <path d="M5 12c1.6-3.2 4.2-5 7-5s5.4 1.8 7 5c-1.6 3.2-4.2 5-7 5s-5.4-1.8-7-5z" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </g>
      );
    case 'ancla':
      // anchor
      return (
        <g>
          <circle cx="12" cy="5" r="2" />
          <line x1="12" y1="7" x2="12" y2="20" />
          <line x1="9" y1="11" x2="15" y2="11" />
          <path d="M5 16a7 7 0 0 0 14 0" />
        </g>
      );
    case 'impulsor':
      // rocket/arrow up
      return (
        <g>
          <path d="M12 2 6 14h12L12 2z" />
          <path d="M10 14v6l2-2 2 2v-6" />
          <path d="M8 20h8" />
        </g>
      );
    case 'empatico':
      // heart with circle
      return (
        <g>
          <path d="M20.8 5.6a5 5 0 0 0-7 0L12 7l-1.8-1.4a5 5 0 1 0-7 7L12 22l8.8-9.4a5 5 0 0 0 0-7z" />
        </g>
      );
    case 'conector':
      // two connected circles
      return (
        <g>
          <circle cx="7" cy="12" r="3" />
          <circle cx="17" cy="12" r="3" />
          <line x1="10" y1="12" x2="14" y2="12" />
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="19" r="2" />
          <line x1="12" y1="7" x2="12" y2="9" />
          <line x1="12" y1="15" x2="12" y2="17" />
        </g>
      );
  }
}

export function hexWithAlpha(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
