/**
 * RadarChart – SVG spider/radar chart for per-category score visualization.
 * 8 axes (one per prompt block category), grid lines, data polygon.
 * Supports dark mode via Tailwind classes.
 */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface RadarDataPoint {
  label: string;
  value: number; // 0-100
}

interface RadarChartProps {
  data: RadarDataPoint[];
  /** SVG viewport size (square) */
  size?: number;
}

export default function RadarChart({ data, size = 280 }: RadarChartProps) {
  const { t } = useTranslation('testPractice');
  const center = size / 2;
  const radius = size * 0.34;
  const labelRadius = size * 0.44;
  const n = data.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2; // Start from top

  const getPoint = (index: number, r: number) => {
    const angle = startAngle + index * angleStep;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const gridPolygons = useMemo(
    () =>
      gridLevels.map((level) => {
        const pts = Array.from({ length: n }, (_, i) => {
          const p = getPoint(i, radius * level);
          return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
        });
        return pts.join(' ');
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, radius, center]
  );

  const axisLines = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => {
        const p = getPoint(i, radius);
        return { x1: center, y1: center, x2: p.x, y2: p.y };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, radius, center]
  );

  const dataPolygon = useMemo(() => {
    return data
      .map((d, i) => {
        const v = Math.max(0, Math.min(100, d.value));
        const p = getPoint(i, (v / 100) * radius);
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(' ');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, radius, center, n]);

  const dataCircles = useMemo(() => {
    return data.map((d, i) => {
      const v = Math.max(0, Math.min(100, d.value));
      const p = getPoint(i, (v / 100) * radius);
      return { x: p.x, y: p.y, value: v };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, radius, center, n]);

  const labelPositions = useMemo(() => {
    return data.map((d, i) => {
      const p = getPoint(i, labelRadius);
      // Adjust text anchor based on position
      let anchor: 'start' | 'middle' | 'end' = 'middle';
      const normalizedX = (p.x - center) / labelRadius;
      if (normalizedX > 0.15) anchor = 'start';
      else if (normalizedX < -0.15) anchor = 'end';
      return { label: d.label, x: p.x, y: p.y, anchor };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, labelRadius, center, n]);

  if (n < 3) return null;

  const labelFontSize = size <= 260 ? 8 : 10;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[min(280px,100%)] mx-auto"
      role="img"
      aria-label={t('radarChartAria')}
    >
      {/* Grid polygons */}
      {gridPolygons.map((points, idx) => (
        <polygon
          key={`grid-${idx}`}
          points={points}
          fill="none"
          stroke="#d1d5db"
          strokeWidth={idx === gridLevels.length - 1 ? 1.5 : 0.5}
          strokeDasharray={idx < gridLevels.length - 1 ? '3,3' : 'none'}
          className="dark:stroke-gray-600"
        />
      ))}

      {/* Grid level labels (25%, 50%, 75%) */}
      {[25, 50, 75].map((pct, idx) => {
        const p = getPoint(0, radius * ((idx + 1) * 0.25));
        return (
          <text
            key={`pct-${pct}`}
            x={p.x + 4}
            y={p.y - 2}
            fontSize={8}
            fill="#9ca3af"
            className="dark:fill-gray-500"
          >
            {pct}%
          </text>
        );
      })}

      {/* Axis lines */}
      {axisLines.map((line, i) => (
        <line
          key={`axis-${i}`}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#d1d5db"
          strokeWidth={0.5}
          className="dark:stroke-gray-600"
        />
      ))}

      {/* Data polygon fill */}
      <polygon
        points={dataPolygon}
        fill="rgba(99, 102, 241, 0.15)"
        stroke="rgb(99, 102, 241)"
        strokeWidth={2}
        strokeLinejoin="round"
        className="dark:fill-indigo-500/20 dark:stroke-indigo-400"
      >
        <animate
          attributeName="opacity"
          from="0"
          to="1"
          dur="0.8s"
          fill="freeze"
        />
      </polygon>

      {/* Data points */}
      {dataCircles.map((pt, i) => (
        <circle
          key={`dot-${i}`}
          cx={pt.x}
          cy={pt.y}
          r={3.5}
          fill="rgb(99, 102, 241)"
          stroke="white"
          strokeWidth={1.5}
          className="dark:fill-indigo-400 dark:stroke-gray-800"
        >
          <animate
            attributeName="r"
            from="0"
            to="3.5"
            dur="0.6s"
            begin={`${0.3 + i * 0.05}s`}
            fill="freeze"
          />
        </circle>
      ))}

      {/* Category labels */}
      {labelPositions.map((lbl, i) => (
        <text
          key={`label-${i}`}
          x={lbl.x}
          y={lbl.y}
          textAnchor={lbl.anchor}
          dominantBaseline="central"
          fontSize={labelFontSize}
          fontWeight={600}
          fill="#374151"
          className="dark:fill-gray-300"
        >
          {lbl.label}
        </text>
      ))}

      {/* Value labels on data points */}
      {dataCircles.map((pt, i) => {
        if (pt.value === 0) return null;
        return (
          <text
            key={`val-${i}`}
            x={pt.x}
            y={pt.y - 10}
            textAnchor="middle"
            fontSize={9}
            fontWeight={700}
            fill="rgb(99, 102, 241)"
            className="dark:fill-indigo-400"
          >
            {pt.value}%
          </text>
        );
      })}
    </svg>
  );
}
