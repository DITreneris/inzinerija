import { getM13ThirdsLabels } from './m13DiagramContent';
import { DIAGRAM_TOKENS } from './diagramTokens';
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
        fill="currentColor"
        className="text-brand-950 dark:text-slate-100"
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>
      <rect
        x={M}
        y={M + 28}
        width={FW}
        height={FH}
        rx="8"
        fill="currentColor"
        stroke="currentColor"
        className="text-slate-50 dark:text-slate-900 stroke-brand-700 dark:stroke-slate-300"
        strokeWidth="2"
      />
      <line
        x1={x1}
        y1={M + 28}
        x2={x1}
        y2={M + 28 + FH}
        stroke="currentColor"
        className="text-slate-400 dark:text-slate-500"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1={x2}
        y1={M + 28}
        x2={x2}
        y2={M + 28 + FH}
        stroke="currentColor"
        className="text-slate-400 dark:text-slate-500"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1={M}
        y1={y1}
        x2={M + FW}
        y2={y1}
        stroke="currentColor"
        className="text-slate-400 dark:text-slate-500"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1={M}
        y1={y2}
        x2={M + FW}
        y2={y2}
        stroke="currentColor"
        className="text-slate-400 dark:text-slate-500"
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
          fill="currentColor"
          stroke="currentColor"
          className="text-accent-600 dark:text-accent-300 stroke-amber-900 dark:stroke-accent-300"
          strokeWidth="1"
        />
      ))}
      <text
        x={W / 2}
        y={H - 6}
        textAnchor="middle"
        fontSize="9"
        fill="currentColor"
        className="text-slate-500 dark:text-slate-300"
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.sub}
      </text>
    </svg>
  );
}
