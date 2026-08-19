import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { getM13ThirdsLabels } from './m13DiagramContent';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { getContentTrackColors } from './contentTrackTokens';
import type { M10Locale } from './m10DiagramContent';

const W = 360;
const H = 260;
const M = 24;
const FW = W - 2 * M;
const FH = H - 2 * M - 40;

/** S5-THIRDS: primary subject at upper-right thirds intersection. */
export const M13_THIRDS_METAPHOR = 'subject-focus-right' as const;

export default function M13RuleOfThirdsDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const isDark = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const track = getContentTrackColors(isDark);
  const L = getM13ThirdsLabels(locale);
  const frameY = M + 28;
  const x1 = M + FW / 3;
  const x2 = M + (2 * FW) / 3;
  const y1 = frameY + FH / 3;
  const y2 = frameY + (2 * FH) / 3;
  const cx = M + FW / 2;
  const cy = frameY + FH / 2;
  /** Upper-right intersection = primary subject placement. */
  const focusX = x2;
  const focusY = y1;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-lg mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
      data-metaphor={M13_THIRDS_METAPHOR}
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
          <stop offset="100%" stopColor={track.softRose} />
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
      {/* Muted center — competing mid-frame mark stays low contrast */}
      <ellipse
        data-muted-center="true"
        cx={cx}
        cy={cy}
        rx={FW * 0.14}
        ry={FH * 0.14}
        fill={palette.muted}
        opacity={0.12}
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
      {/* Secondary intersections — small guide dots */}
      {(
        [
          [x1, y1],
          [x1, y2],
          [x2, y2],
        ] as const
      ).map(([px, py], i) => (
        <circle
          key={i}
          data-focal-secondary="true"
          cx={px}
          cy={py}
          r="4"
          fill={DIAGRAM_TOKENS.colors.amber}
          stroke={palette.brandDark}
          strokeWidth="1"
          opacity={0.55}
        />
      ))}
      {/* Primary subject motif at upper-right intersection */}
      <g
        data-subject-focus="right"
        transform={`translate(${focusX} ${focusY})`}
      >
        <circle
          r="18"
          fill={DIAGRAM_TOKENS.colors.amber}
          fillOpacity={0.22}
          stroke={DIAGRAM_TOKENS.colors.amber}
          strokeWidth="1.5"
        />
        {/* Simple person/product silhouette — readable at compact size */}
        <circle cy={-4} r="5" fill={palette.brandDark} />
        <path
          d="M -7 3 Q 0 14 7 3"
          fill="none"
          stroke={palette.brandDark}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
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
