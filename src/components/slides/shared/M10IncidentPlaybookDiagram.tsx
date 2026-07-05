/**
 * M10 – incident response playbook as a 5-step chain.
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS } from './diagramTokens';
import {
  getM10IncidentPlaybookLabels,
  type M10Locale,
} from './m10DiagramContent';

const W = 720;
const H = 150;
const BOX_W = 118;
const BOX_H = 44;
const GAP = 18;
const ROW_Y = 72;
const ARROW = 7;

export default function M10IncidentPlaybookDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const L = getM10IncidentPlaybookLabels(locale);
  const totalW = L.steps.length * BOX_W + (L.steps.length - 1) * GAP;
  const startX = (W - totalW) / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-4xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={`m10-ip-arrow-${uid}`}
          markerWidth={ARROW + 1}
          markerHeight="6"
          refX={ARROW}
          refY="3"
          orient="auto"
        >
          <path d={`M0 0 L${ARROW} 3 L0 6 Z`} fill={palette.flow} />
        </marker>
      </defs>
      <text
        x={W / 2}
        y={26}
        textAnchor="middle"
        fontSize="14"
        fontWeight="800"
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>
      {L.steps.slice(0, -1).map((label, index) => {
        const x = startX + index * (BOX_W + GAP);
        const nextX = x + BOX_W + GAP;
        return (
          <line
            key={`${label}-arrow`}
            x1={x + BOX_W}
            y1={ROW_Y + BOX_H / 2}
            x2={nextX}
            y2={ROW_Y + BOX_H / 2}
            stroke={palette.flow}
            strokeWidth="2"
            markerEnd={`url(#m10-ip-arrow-${uid})`}
          />
        );
      })}
      {L.steps.map((label, index) => {
        const x = startX + index * (BOX_W + GAP);
        const cx = x + BOX_W / 2;
        return (
          <g key={label}>
            <rect
              x={x}
              y={ROW_Y}
              width={BOX_W}
              height={BOX_H}
              rx="9"
              fill="#fef3c7"
              stroke="#b8860b"
              strokeWidth="1.2"
            />
            <text
              x={cx}
              y={ROW_Y + 28}
              textAnchor="middle"
              fill="#713f12"
              fontSize="11"
              fontWeight="800"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {index + 1}. {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
