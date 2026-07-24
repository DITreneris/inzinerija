/**
 * M10 – incident response playbook as a 5-step chain.
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import {
  DIAGRAM_TOKENS,
  getDiagramActiveStroke,
  getDiagramToneColors,
} from './diagramTokens';
import {
  getM10IncidentPlaybookLabels,
  type M10Locale,
} from './m10DiagramContent';
import { M10_INCIDENT_PLAYBOOK_LAYOUT } from './m10IncidentPlaybookLayout';
import { DiagramStepHitArea } from './diagramKit';

const {
  width: W,
  height: H,
  boxW: BOX_W,
  boxH: BOX_H,
  gap: GAP,
  rowY: ROW_Y,
} = M10_INCIDENT_PLAYBOOK_LAYOUT;
const MARKER = DIAGRAM_TOKENS.arrow.markerLen;

export default function M10IncidentPlaybookDiagram({
  locale = 'lt',
  className = '',
  currentStep = -1,
  onStepClick,
}: {
  locale?: M10Locale;
  className?: string;
  currentStep?: number;
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const isDarkPalette = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const tones = getDiagramToneColors(isDarkPalette);
  const amber = tones.amber;
  const L = getM10IncidentPlaybookLabels(locale);
  const totalW = L.steps.length * BOX_W + (L.steps.length - 1) * GAP;
  const startX = (W - totalW) / 2;
  const interactive = typeof onStepClick === 'function';

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-4xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <linearGradient id={`m10-ip-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m10-ip-arrow-${uid}`}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={MARKER}
          refY="3"
          orient="auto"
        >
          <path d={DIAGRAM_TOKENS.arrow.markerPath} fill={palette.flow} />
        </marker>
      </defs>
      <rect
        x="0"
        y="0"
        width={W}
        height={H}
        rx="12"
        fill={`url(#m10-ip-bg-${uid})`}
      />
      <text
        x={W / 2}
        y={26}
        textAnchor="middle"
        fontSize="14"
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
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
            x2={nextX - MARKER}
            y2={ROW_Y + BOX_H / 2}
            stroke={palette.flow}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            markerEnd={`url(#m10-ip-arrow-${uid})`}
          />
        );
      })}
      {L.steps.map((label, index) => {
        const x = startX + index * (BOX_W + GAP);
        const cx = x + BOX_W / 2;
        const active = currentStep === index;
        const dimmed = currentStep >= 0 && !active;
        return (
          <g key={label} opacity={dimmed ? DIAGRAM_TOKENS.opacity.inactive : 1}>
            <rect
              x={x}
              y={ROW_Y}
              width={BOX_W}
              height={BOX_H}
              rx="9"
              fill={amber.soft}
              stroke={active ? getDiagramActiveStroke() : amber.stroke}
              strokeWidth={
                active
                  ? DIAGRAM_TOKENS.stroke.active
                  : DIAGRAM_TOKENS.stroke.inactive
              }
            />
            <text
              x={cx}
              y={ROW_Y + 28}
              textAnchor="middle"
              fill={amber.stroke}
              fontSize="11"
              fontWeight="800"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {index + 1}. {label}
            </text>
            {interactive ? (
              <DiagramStepHitArea
                x={x}
                y={ROW_Y}
                width={BOX_W}
                height={BOX_H}
                radius={9}
                onActivate={() => onStepClick(index)}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
