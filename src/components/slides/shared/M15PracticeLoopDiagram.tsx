import { useId } from 'react';
import { getM15PracticeLoopLabels } from './m15PracticeLoopContent';
import type { M10Locale } from './m10DiagramContent';

const W = 520;
const H = 260;

export default function M15PracticeLoopDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const L = getM15PracticeLoopLabels(locale);
  const cx = W / 2;
  const yTop = 44;
  const boxW = 100;
  const boxH = 40;
  const row2Y = 118;
  const loopY = 190;

  const branches = [
    { x: cx - 160, label: L.img },
    { x: cx - 50, label: L.vid },
    { x: cx + 60, label: L.mus },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={`m15lp-${uid}`}
          markerWidth="7"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6 Z" fill="#334e68" />
        </marker>
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
      <text
        x={cx}
        y={yTop - 6}
        textAnchor="middle"
        fontSize="10"
        fill="#64748b"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.pick}
      </text>
      {branches.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={yTop}
            width={boxW}
            height={boxH}
            rx="8"
            fill="#486581"
            stroke="#102a43"
            strokeWidth="1"
          />
          <text
            x={b.x + boxW / 2}
            y={yTop + 26}
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="700"
            fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
          >
            {b.label}
          </text>
          <line
            x1={b.x + boxW / 2}
            y1={yTop + boxH}
            x2={cx}
            y2={row2Y - 4}
            stroke="#7B8794"
            strokeWidth="2"
          />
        </g>
      ))}
      {[
        { x: cx - 130, w: 100, t: L.prompt },
        { x: cx - 50, w: 100, t: L.result },
        { x: cx + 30, w: 100, t: L.fix },
      ].map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={row2Y}
            width={b.w}
            height={boxH}
            rx="8"
            fill={i === 1 ? '#0d9488' : '#334e68'}
            stroke="#102a43"
            strokeWidth="1"
          />
          <text
            x={b.x + b.w / 2}
            y={row2Y + 26}
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="700"
            fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
          >
            {b.t}
          </text>
        </g>
      ))}
      <path
        d={`M ${cx + 80} ${row2Y + boxH / 2} Q ${cx + 120} ${loopY} ${cx} ${loopY} Q ${cx - 120} ${loopY} ${cx - 130} ${row2Y + boxH / 2}`}
        fill="none"
        stroke="#b8860b"
        strokeWidth="2"
        strokeDasharray="5 4"
        markerEnd={`url(#m15lp-${uid})`}
      />
      <text
        x={cx}
        y={loopY + 28}
        textAnchor="middle"
        fontSize="9"
        fill="#7a5807"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {locale === 'en' ? 'Repeat until good enough' : 'Kartok, kol tinka'}
      </text>
    </svg>
  );
}
