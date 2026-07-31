/**
 * Turinio inžinerijos workflow – 7 žingsniai as business cycle with loop-back (S4-INDIV).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import {
  getM13BusinessWorkflowDiagramLabels,
  type M13BusinessLocale,
} from './m13BusinessWorkflowContent';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import { getContentTrackColors } from './contentTrackTokens';
import { M13_TURINIO_WORKFLOW_TONES } from './contentTrackDiagramTones';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import { DiagramStepHitArea } from './diagramKit';
import {
  getVerticalFlowConnector,
  resolveVerticalFlowGeometry,
  VERTICAL_FLOW_MIN_GAP,
} from './verticalFlowGeometry';

const STEP_COUNT = 7;
const BOX_H = 48;
const PROCESS_ARROW = getProcessArrowMarkerGeom();
const ARROW_MARKER_LEN = PROCESS_ARROW.tipLen;

/** Geometry SOT – cycle with return path (≠ linear vertical twin). */
export const TURINIO_WORKFLOW_GEOMETRY = {
  metaphor: 'cycle' as const,
  stepCount: STEP_COUNT,
  boxHeight: BOX_H,
  gap: VERTICAL_FLOW_MIN_GAP,
  startY: 72,
  desktop: {
    viewBoxWidth: 560,
    viewBoxHeight: 640,
    colsX: 140,
    colsW: 360,
    cx: 140 + 180,
    loopX: 48,
  },
  compact: {
    viewBoxWidth: 320,
    viewBoxHeight: 640,
    colsX: 88,
    colsW: 210,
    cx: 88 + 105,
    loopX: 22,
  },
} as const;

const FLOW_GEOMETRY = {
  stepCount: STEP_COUNT,
  boxHeight: BOX_H,
  gap: VERTICAL_FLOW_MIN_GAP,
  startY: TURINIO_WORKFLOW_GEOMETRY.startY,
  desktop: {
    viewBoxWidth: TURINIO_WORKFLOW_GEOMETRY.desktop.viewBoxWidth,
    viewBoxHeight: TURINIO_WORKFLOW_GEOMETRY.desktop.viewBoxHeight,
    colsX: TURINIO_WORKFLOW_GEOMETRY.desktop.colsX,
    colsW: TURINIO_WORKFLOW_GEOMETRY.desktop.colsW,
    cx: TURINIO_WORKFLOW_GEOMETRY.desktop.cx,
  },
  compact: {
    viewBoxWidth: TURINIO_WORKFLOW_GEOMETRY.compact.viewBoxWidth,
    viewBoxHeight: TURINIO_WORKFLOW_GEOMETRY.compact.viewBoxHeight,
    colsX: TURINIO_WORKFLOW_GEOMETRY.compact.colsX,
    colsW: TURINIO_WORKFLOW_GEOMETRY.compact.colsW,
    cx: TURINIO_WORKFLOW_GEOMETRY.compact.cx,
  },
};

interface TurinioWorkflowDiagramProps {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  className?: string;
  locale?: M13BusinessLocale;
}

export default function TurinioWorkflowDiagram({
  currentStep = 0,
  onStepClick,
  className = '',
  locale = 'lt',
}: TurinioWorkflowDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const isDark = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const toneColors = getDiagramToneColors(isDark);
  const track = getContentTrackColors(isDark);
  const isInteractive = typeof onStepClick === 'function';
  const labels = getM13BusinessWorkflowDiagramLabels(locale);
  const STEPS = labels.steps;
  const { viewBoxWidth, viewBoxHeight, cx, stepBoxes } =
    resolveVerticalFlowGeometry(FLOW_GEOMETRY, isCompactDiagram);
  const loopX = isCompactDiagram
    ? TURINIO_WORKFLOW_GEOMETRY.compact.loopX
    : TURINIO_WORKFLOW_GEOMETRY.desktop.loopX;
  const typography = DIAGRAM_TOKENS.typography;
  const uniqueTones = [...new Set(M13_TURINIO_WORKFLOW_TONES)];
  const first = stepBoxes[0]!;
  const last = stepBoxes[stepBoxes.length - 1]!;
  const firstMidY = first[1] + first[3] / 2;
  const lastMidY = last[1] + last[3] / 2;
  const firstLeft = first[0];
  const lastLeft = last[0];

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={`${labels.ariaBase}${isInteractive ? ` ${labels.ariaInteractiveSuffix}` : ''}`}
      data-metaphor={TURINIO_WORKFLOW_GEOMETRY.metaphor}
    >
      <defs>
        <linearGradient
          id={`tur-wf-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={track.softRose} />
        </linearGradient>
        <marker
          id={`tur-wf-arrow-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path
            d={PROCESS_ARROW.pathD}
            fill={palette.flow}
            stroke={palette.flow}
            strokeWidth="0.5"
          />
        </marker>
        <marker
          id={`tur-wf-return-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path
            d={PROCESS_ARROW.pathD}
            fill={DIAGRAM_TOKENS.colors.amber}
            stroke={DIAGRAM_TOKENS.colors.amber}
            strokeWidth="0.5"
          />
        </marker>
        {uniqueTones.map((tone) => {
          const colors = toneColors[tone];
          return (
            <linearGradient
              key={tone}
              id={`tur-wf-tone-${uid}-${tone}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.top} />
              <stop offset="100%" stopColor={colors.bottom} />
            </linearGradient>
          );
        })}
      </defs>

      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill={`url(#tur-wf-bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill="none"
        stroke={palette.border}
        strokeWidth={DIAGRAM_TOKENS.stroke.border}
        rx={DIAGRAM_TOKENS.radius.frame}
      />

      <text
        x={viewBoxWidth / 2}
        y="36"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={
          isCompactDiagram ? typography.title.compact : typography.title.desktop
        }
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
      >
        {labels.title}
      </text>
      <text
        x={viewBoxWidth / 2}
        y="54"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={
          isCompactDiagram
            ? typography.subtitle.compact
            : typography.subtitle.desktop
        }
        fontWeight="500"
        fill={palette.muted}
      >
        {labels.metaphorCaption}
      </text>

      {/* Cycle return: Optimisation → Brief */}
      <g data-cycle-return="true" aria-hidden>
        <path
          d={`M ${lastLeft} ${lastMidY} L ${loopX} ${lastMidY} L ${loopX} ${firstMidY} L ${firstLeft - ARROW_MARKER_LEN} ${firstMidY}`}
          fill="none"
          stroke={DIAGRAM_TOKENS.colors.amber}
          strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
          strokeDasharray="6 4"
          markerEnd={`url(#tur-wf-return-${uid})`}
        />
        <text
          x={loopX + (isCompactDiagram ? 10 : 14)}
          y={(firstMidY + lastMidY) / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${loopX + (isCompactDiagram ? 10 : 14)} ${(firstMidY + lastMidY) / 2})`}
          fontFamily={DIAGRAM_TOKENS.font}
          fontSize={typography.stepSub.compact}
          fontWeight="700"
          fill={DIAGRAM_TOKENS.colors.amber}
        >
          {labels.cycleReturnLabel}
        </text>
      </g>

      {stepBoxes.map((box, i) => {
        const tone = M13_TURINIO_WORKFLOW_TONES[i];
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        return (
          <g key={i} data-cycle-step={i}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={box[0]}
                y={box[1]}
                width={box[2]}
                height={box[3]}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#tur-wf-tone-${uid}-${tone})`}
                stroke={isActive ? palette.brandDark : toneColors[tone].stroke}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={box[1] + 20}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? typography.stepLabel.compact
                    : typography.stepLabel.desktop
                }
                fontWeight="700"
                fill="white"
              >
                {i + 1} · {STEPS[i].label}
              </text>
              <text
                x={cx}
                y={box[1] + 38}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? typography.stepSub.compact
                    : typography.stepSub.desktop
                }
                fontWeight="500"
                fill={palette.whiteText}
              >
                {STEPS[i].desc}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={box[0]}
                y={box[1]}
                width={box[2]}
                height={box[3]}
                radius={DIAGRAM_TOKENS.radius.box}
                onActivate={() => onStepClick?.(i)}
              />
            )}
            {i < stepBoxes.length - 1 &&
              (() => {
                const conn = getVerticalFlowConnector(
                  box,
                  stepBoxes[i + 1],
                  cx,
                  ARROW_MARKER_LEN
                );
                return (
                  <line
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    stroke={palette.flow}
                    strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
                    markerEnd={`url(#tur-wf-arrow-${uid})`}
                    aria-hidden
                  />
                );
              })()}
          </g>
        );
      })}
    </svg>
  );
}
