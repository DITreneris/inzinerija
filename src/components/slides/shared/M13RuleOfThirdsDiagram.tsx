import { getM13ThirdsLabels } from './m13DiagramContent';
import type { M10Locale } from './m10DiagramContent';

const W = 360;
const H = 240;
const M = 24;
const FW = W - 2 * M;
const FH = H - 2 * M - 28;

export default function M13RuleOfThirdsDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const L = getM13ThirdsLabels(locale);
  const x1 = M + FW / 3;
  const x2 = M + (2 * FW) / 3;
  const y1 = M + 28 + FH / 3;
  const y2 = M + 28 + (2 * FH) / 3;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-md mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <text
        x={W / 2}
        y={20}
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill="#102a43"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.title}
      </text>
      <rect
        x={M}
        y={M + 28}
        width={FW}
        height={FH}
        rx="8"
        fill="#f8fafc"
        stroke="#334e68"
        strokeWidth="2"
      />
      <line
        x1={x1}
        y1={M + 28}
        x2={x1}
        y2={M + 28 + FH}
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1={x2}
        y1={M + 28}
        x2={x2}
        y2={M + 28 + FH}
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1={M}
        y1={y1}
        x2={M + FW}
        y2={y1}
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1={M}
        y1={y2}
        x2={M + FW}
        y2={y2}
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      {[
        [x1, y1],
        [x2, y1],
        [x1, y2],
        [x2, y2],
      ].map(([px, py], i) => (
        <circle
          key={i}
          cx={px}
          cy={py}
          r="5"
          fill="#b8860b"
          stroke="#713f12"
          strokeWidth="1"
        />
      ))}
      <text
        x={W / 2}
        y={H - 6}
        textAnchor="middle"
        fontSize="9"
        fill="#64748b"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.sub}
      </text>
    </svg>
  );
}
