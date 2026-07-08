import { useId } from 'react';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { getM15PracticeLoopLabels } from './m15PracticeLoopContent';
import type { M10Locale } from './m10DiagramContent';

const W = 620;
const H = 320;

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
  const boxH = 38;
  const quickY = 62;
  const fullY = 190;
  const boxW = 82;
  const quickSteps = [
    { x: 76, w: 74, t: L.brief },
    { x: 172, w: 88, t: L.pick },
    { x: 282, w: 88, t: L.prompt },
    { x: 392, w: 88, t: L.result },
    { x: 502, w: 76, t: L.fix },
  ];
  const fullSteps = [
    { x: 110, w: boxW, t: L.img },
    { x: 225, w: boxW, t: L.vid },
    { x: 340, w: boxW, t: L.mus },
    { x: 455, w: 70, t: L.qa },
    { x: 545, w: 58, t: L.done },
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
          <path
            d={DIAGRAM_TOKENS.arrow.markerPath}
            fill={DIAGRAM_TOKENS.colors.brand}
          />
        </marker>
        <marker
          id={`m15fb-${uid}`}
          markerWidth="7"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path
            d={DIAGRAM_TOKENS.arrow.markerPath}
            fill={DIAGRAM_TOKENS.colors.amber}
          />
        </marker>
      </defs>
      <text
        x={cx}
        y={22}
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill={DIAGRAM_TOKENS.colors.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>
      <text
        x={cx}
        y={44}
        textAnchor="middle"
        fontSize="10"
        fill={DIAGRAM_TOKENS.colors.slate}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.quick}
      </text>
      {quickSteps.map((b, i) => (
        <g key={`q-${i}`}>
          <rect
            x={b.x}
            y={quickY}
            width={b.w}
            height={boxH}
            rx="8"
            fill={
              i === 3
                ? DIAGRAM_TOKENS.colors.emerald
                : DIAGRAM_TOKENS.colors.brandTop
            }
            stroke={DIAGRAM_TOKENS.colors.brandDark}
            strokeWidth="1"
          />
          <text
            x={b.x + b.w / 2}
            y={quickY + 25}
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="700"
            fontFamily={DIAGRAM_TOKENS.font}
          >
            {b.t}
          </text>
          {i < quickSteps.length - 1 && (
            <line
              x1={b.x + b.w}
              y1={quickY + boxH / 2}
              x2={quickSteps[i + 1].x - 6}
              y2={quickY + boxH / 2}
              stroke={DIAGRAM_TOKENS.colors.flow}
              strokeWidth="2"
              markerEnd={`url(#m15lp-${uid})`}
            />
          )}
        </g>
      ))}
      <path
        d="M 548 100 Q 584 136 470 136 Q 300 136 290 100"
        fill="none"
        stroke={DIAGRAM_TOKENS.colors.amber}
        strokeWidth="2"
        strokeDasharray="5 4"
        markerEnd={`url(#m15fb-${uid})`}
      />
      <text
        x={cx}
        y={156}
        textAnchor="middle"
        fontSize="9"
        fill={DIAGRAM_TOKENS.colors.amber}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.repeat}
      </text>
      <text
        x={cx}
        y={176}
        textAnchor="middle"
        fontSize="10"
        fill={DIAGRAM_TOKENS.colors.slate}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.full}
      </text>
      {fullSteps.map((b, i) => (
        <g key={`f-${i}`}>
          <rect
            x={b.x}
            y={fullY}
            width={b.w}
            height={boxH}
            rx="8"
            fill={
              i === 3
                ? DIAGRAM_TOKENS.colors.emerald
                : DIAGRAM_TOKENS.colors.brand
            }
            stroke={DIAGRAM_TOKENS.colors.brandDark}
            strokeWidth="1"
          />
          <text
            x={b.x + b.w / 2}
            y={fullY + 25}
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="700"
            fontFamily={DIAGRAM_TOKENS.font}
          >
            {b.t}
          </text>
          {i < fullSteps.length - 1 && (
            <line
              x1={b.x + b.w}
              y1={fullY + boxH / 2}
              x2={fullSteps[i + 1].x - 6}
              y2={fullY + boxH / 2}
              stroke={DIAGRAM_TOKENS.colors.flow}
              strokeWidth="2"
              markerEnd={`url(#m15lp-${uid})`}
            />
          )}
        </g>
      ))}
      <line
        x1={150}
        y1={quickY + boxH}
        x2={150}
        y2={fullY - 8}
        stroke={DIAGRAM_TOKENS.colors.amber}
        strokeWidth="2"
        strokeDasharray="5 4"
        markerEnd={`url(#m15fb-${uid})`}
      />
    </svg>
  );
}
