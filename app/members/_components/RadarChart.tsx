import type { DimensionScore } from '@/types';
import { getDimensionLabel } from '@/lib/scoring';

const DIMENSION_COLORS: Record<string, string> = {
  'self-awareness': '#1d4ed8',
  'self-regulation': '#0891b2',
  motivation: '#ea580c',
  empathy: '#dc2626',
  'social-skills': '#7c3aed',
};

const VIEWBOX = 320;
const CENTER = VIEWBOX / 2;
const MAX_RADIUS = 110;
const LABEL_RADIUS = MAX_RADIUS + 28;

function vertex(i: number, radius: number) {
  const angle = -Math.PI / 2 + (2 * Math.PI * i) / 5;
  return {
    x: CENTER + Math.cos(angle) * radius,
    y: CENTER + Math.sin(angle) * radius,
  };
}

export default function RadarChart({
  dimensions,
}: {
  dimensions: DimensionScore[];
}) {
  // Background pentagons at 20/40/60/80/100% of max radius.
  const rings = [0.2, 0.4, 0.6, 0.8, 1].map((r) => {
    const radius = MAX_RADIUS * r;
    return Array.from({ length: 5 }, (_, i) => vertex(i, radius));
  });

  const dataPoints = dimensions.map((d, i) => {
    const ratio = d.max === 0 ? 0 : d.score / d.max;
    return { ...vertex(i, MAX_RADIUS * ratio), dim: d };
  });

  const polygonString = dataPoints
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  const labels = dimensions.map((d, i) => {
    const v = vertex(i, LABEL_RADIUS);
    return { ...v, label: getDimensionLabel(d.name) };
  });

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      className="h-full w-full"
      role="img"
      aria-label="Gráfico de dimensiones de IE"
    >
      {/* Background rings */}
      {rings.map((ring, idx) => (
        <polygon
          key={idx}
          points={ring.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#e8d5c8"
          strokeWidth={idx === rings.length - 1 ? 1.2 : 0.6}
        />
      ))}

      {/* Spokes */}
      {Array.from({ length: 5 }, (_, i) => {
        const outer = vertex(i, MAX_RADIUS);
        return (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={outer.x}
            y2={outer.y}
            stroke="#e8d5c8"
            strokeWidth={0.6}
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={polygonString}
        fill="rgba(29, 78, 216, 0.15)"
        stroke="#1d4ed8"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={5}
          fill={DIMENSION_COLORS[p.dim.name] ?? '#1d4ed8'}
          stroke="#ffffff"
          strokeWidth={1.5}
        />
      ))}

      {/* Labels */}
      {labels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fontWeight="600"
          fill="#0f172a"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        >
          {l.label}
        </text>
      ))}
    </svg>
  );
}
