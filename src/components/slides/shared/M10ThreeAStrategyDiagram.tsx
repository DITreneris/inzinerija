/**
 * M10 – 3A strategija: vizualiai proporcingos juostos (80 / 15 / 5).
 */
import { useId } from 'react';
import { getM10ThreeALabels, type M10Locale } from './m10DiagramContent';

const W = 400;
const H = 280;
const BAR_X = 48;
const BAR_W = 304;
const H80 = 120;
const H15 = 36;
const H5 = 18;
const GAP = 10;

export default function M10ThreeAStrategyDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const L = getM10ThreeALabels(locale);
  let y = 40;

  const rows: {
    h: number;
    title: string;
    pct: string;
    sub: string;
    fill: string;
  }[] = [
    {
      h: H80,
      title: L.auto,
      pct: L.autoPct,
      sub: L.autoSub,
      fill: `url(#m10-3a-a-${uid})`,
    },
    {
      h: H15,
      title: L.aug,
      pct: L.augPct,
      sub: L.augSub,
      fill: `url(#m10-3a-b-${uid})`,
    },
    {
      h: H5,
      title: L.auton,
      pct: L.autonPct,
      sub: L.autonSub,
      fill: `url(#m10-3a-c-${uid})`,
    },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-md mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <linearGradient id={`m10-3a-a-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#334e68" />
          <stop offset="100%" stopColor="#486581" />
        </linearGradient>
        <linearGradient id={`m10-3a-b-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id={`m10-3a-c-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#d4a017" />
        </linearGradient>
      </defs>
      <text
        x={W / 2}
        y={24}
        textAnchor="middle"
        fontSize="14"
        fontWeight="800"
        fill="#102a43"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.title}
      </text>
      {rows.map((r, i) => {
        const rowY = y;
        y += r.h + GAP;
        const ty = rowY + Math.min(r.h / 2 + 5, r.h - 4);
        return (
          <g key={i}>
            <rect
              x={BAR_X}
              y={rowY}
              width={BAR_W}
              height={r.h}
              rx="8"
              fill={r.fill}
              stroke="#102a43"
              strokeWidth="1"
            />
            <text
              x={BAR_X + 14}
              y={ty}
              fill="white"
              fontSize={r.h < 28 ? 9 : 12}
              fontWeight="700"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
            >
              {r.title} {r.pct}
            </text>
            {r.h >= 36 && (
              <text
                x={BAR_X + 14}
                y={rowY + r.h - 10}
                fill="rgba(255,255,255,0.88)"
                fontSize="10"
                fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
              >
                {r.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
