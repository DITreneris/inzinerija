/**
 * M10 – one-page workflow specification as an 8-block snake flow.
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import {
  DIAGRAM_TOKENS,
  getDiagramActiveStroke,
  getDiagramToneColors,
} from './diagramTokens';
import { getM10WorkflowSpecLabels, type M10Locale } from './m10DiagramContent';
import {
  M10_WORKFLOW_SPEC_LAYOUT,
  M10_WORKFLOW_SPEC_START_X,
} from './m10WorkflowSpecLayout';
import { DiagramStepHitArea } from './diagramKit';

const {
  width: W,
  height: H,
  boxW: BOX_W,
  boxH: BOX_H,
  gap: GAP,
  row1Y: ROW_1_Y,
  row2Y: ROW_2_Y,
} = M10_WORKFLOW_SPEC_LAYOUT;
const START_X = M10_WORKFLOW_SPEC_START_X;
const MARKER = DIAGRAM_TOKENS.arrow.markerLen;

function textLines(label: string) {
  if (label.length <= 10) return [label];
  if (label === 'Condition') return ['Condi-', 'tion'];
  return [label];
}

export default function M10WorkflowSpecDiagram({
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
  const L = getM10WorkflowSpecLabels(locale);
  const interactive = typeof onStepClick === 'function';
  const boxes = L.blocks.map((label, index) => {
    const isFirstRow = index < 4;
    const col = isFirstRow ? index : 7 - index;
    return {
      label,
      index,
      x: START_X + col * (BOX_W + GAP),
      y: isFirstRow ? ROW_1_Y : ROW_2_Y,
      fill: isFirstRow ? tones.brand.bottom : tones.brand.top,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-4xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <linearGradient id={`m10-ws-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m10-ws-arrow-${uid}`}
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
        fill={`url(#m10-ws-bg-${uid})`}
      />
      <text
        x={W / 2}
        y={24}
        textAnchor="middle"
        fontSize="14"
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>

      {boxes.slice(0, -1).map((box, index) => {
        const next = boxes[index + 1];
        const isVertical = box.x === next.x;
        const goingRight = box.x < next.x;
        const x1 = isVertical
          ? box.x + BOX_W / 2
          : box.x + (goingRight ? BOX_W : 0);
        const y1 = isVertical ? box.y + BOX_H : box.y + BOX_H / 2;
        const x2Raw = isVertical
          ? next.x + BOX_W / 2
          : next.x + (goingRight ? 0 : BOX_W);
        const y2Raw = isVertical ? next.y : next.y + BOX_H / 2;
        const dx = x2Raw - x1;
        const dy = y2Raw - y1;
        const len = Math.hypot(dx, dy) || 1;
        const x2 = x2Raw - (dx / len) * MARKER;
        const y2 = y2Raw - (dy / len) * MARKER;
        return (
          <line
            key={`${box.label}-${next.label}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={palette.flow}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            markerEnd={`url(#m10-ws-arrow-${uid})`}
          />
        );
      })}

      {boxes.map((box) => {
        const lines = textLines(box.label);
        const active = currentStep === box.index;
        const dimmed = currentStep >= 0 && !active;
        return (
          <g
            key={box.label}
            opacity={dimmed ? DIAGRAM_TOKENS.opacity.inactive : 1}
          >
            <rect
              x={box.x}
              y={box.y}
              width={BOX_W}
              height={BOX_H}
              rx="9"
              fill={box.fill}
              stroke={active ? getDiagramActiveStroke() : palette.brandDark}
              strokeWidth={
                active
                  ? DIAGRAM_TOKENS.stroke.active
                  : DIAGRAM_TOKENS.stroke.inactive
              }
            />
            <text
              x={box.x + 12}
              y={box.y + 19}
              fill="rgba(255,255,255,0.9)"
              fontSize="9"
              fontWeight="700"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {box.index + 1}
            </text>
            <text
              x={box.x + BOX_W / 2}
              y={box.y + (lines.length === 1 ? 29 : 22)}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="800"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {lines.map((line, lineIndex) => (
                <tspan
                  key={line}
                  x={box.x + BOX_W / 2}
                  dy={lineIndex === 0 ? 0 : 13}
                >
                  {line}
                </tspan>
              ))}
            </text>
            {interactive ? (
              <DiagramStepHitArea
                x={box.x}
                y={box.y}
                width={BOX_W}
                height={BOX_H}
                radius={9}
                onActivate={() => onStepClick(box.index)}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
