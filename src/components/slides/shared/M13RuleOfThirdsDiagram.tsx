import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { getM13ThirdsLabels } from './m13DiagramContent';
import { DIAGRAM_TOKENS } from './diagramTokens';
import type { M10Locale } from './m10DiagramContent';

const W = 360;
const H = 260;
const M = 24;
const FW = W - 2 * M;
const FH = H - 2 * M - 40;

export default function M13RuleOfThirdsDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const L = getM13ThirdsLabels(locale);
  const frameY = M + 28;
  const x1 = M + FW / 3;
  const x2 = M + (2 * FW) / 3;
  const y1 = frameY + FH / 3;
  const y2 = frameY + (2 * FH) / 3;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-md mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <linearGradient
          id={`thirds-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
      </defs>
      <rect
        width={W}
        height={H}
        fill={`url(#thirds-bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <rect
        width={W}
        height={H}
        fill="none"
        stroke={palette.border}
        strokeWidth={DIAGRAM_TOKENS.stroke.border}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <text
        x={W / 2}
        y={22}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>
      <rect
        x={M}
        y={frameY}
        width={FW}
        height={FH}
        rx={DIAGRAM_TOKENS.radius.box}
        fill={palette.bgEnd}
        stroke={palette.brand}
        strokeWidth={DIAGRAM_TOKENS.stroke.flow}
      />
      <line
        x1={x1}
        y1={frameY}
        x2={x1}
        y2={frameY + FH}
        stroke={palette.flow}
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1={x2}
        y1={frameY}
        x2={x2}
        y2={frameY + FH}
        stroke={palette.flow}
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1={M}
        y1={y1}
        x2={M + FW}
        y2={y1}
        stroke={palette.flow}
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1={M}
        y1={y2}
        x2={M + FW}
        y2={y2}
        stroke={palette.flow}
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
          fill={DIAGRAM_TOKENS.colors.amber}
          stroke={palette.brandDark}
          strokeWidth="1"
        />
      ))}
      <text
        x={W / 2}
        y={H - 10}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.subtitle.desktop}
        fill={palette.muted}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.sub}
      </text>
    </svg>
  );
}
