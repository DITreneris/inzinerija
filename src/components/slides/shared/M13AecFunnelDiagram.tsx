import { useId } from 'react';
import { getM13AecLabels } from './m13DiagramContent';
import type { M10Locale } from './m10DiagramContent';

const W = 360;
const H = 300;

export default function M13AecFunnelDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const L = getM13AecLabels(locale);
  const cx = W / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-sm mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <linearGradient id={`aec-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#486581" />
          <stop offset="100%" stopColor="#334e68" />
        </linearGradient>
      </defs>
      <text
        x={cx}
        y={22}
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill="#102a43"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.title}
      </text>
      {[
        { y: 40, w: 280, h: 56, t: L.awareness, s: L.awarenessSub },
        { y: 108, w: 200, h: 56, t: L.engagement, s: L.engagementSub },
        { y: 176, w: 120, h: 56, t: L.conversion, s: L.conversionSub },
      ].map((row, i) => {
        const x = cx - row.w / 2;
        return (
          <g key={i}>
            <rect
              x={x}
              y={row.y}
              width={row.w}
              height={row.h}
              rx="10"
              fill={`url(#aec-${uid})`}
              opacity={1 - i * 0.08}
              stroke="#102a43"
              strokeWidth="1.2"
            />
            <text
              x={cx}
              y={row.y + 24}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="700"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
            >
              {row.t}
            </text>
            <text
              x={cx}
              y={row.y + 42}
              textAnchor="middle"
              fill="rgba(255,255,255,0.9)"
              fontSize="9"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
            >
              {row.s}
            </text>
          </g>
        );
      })}
      <text
        x={cx}
        y={H - 10}
        textAnchor="middle"
        fontSize="9"
        fill="#64748b"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.hint}
      </text>
    </svg>
  );
}
