/**
 * Turinio inžinerijos workflow diagrama – 7 žingsnių nuo brief iki optimizacijos.
 * Interaktyvus: currentStep, onStepClick – paspaudus žingsnį, rodomas paaiškinimas apačioje.
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import {
  getM13BusinessWorkflowDiagramLabels,
  type M13BusinessLocale,
} from './m13BusinessWorkflowContent';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import {
  getVerticalFlowConnector,
  resolveVerticalFlowGeometry,
  VERTICAL_FLOW_MIN_GAP,
} from './verticalFlowGeometry';
import { buildVerticalColumnOrigin } from './diagramLayoutMath';

const STEP_COUNT = 7;
const BOX_H = 48;
const ARROW_MARKER_LEN = DIAGRAM_TOKENS.arrow.markerLen;
const DESKTOP_W = 560;
const DESKTOP_COL_W = 400;
const DESKTOP_COL = buildVerticalColumnOrigin({
  viewBoxW: DESKTOP_W,
  colW: DESKTOP_COL_W,
});
const COMPACT_W = 320;
const COMPACT_COL_W = 264;
const COMPACT_COL = buildVerticalColumnOrigin({
  viewBoxW: COMPACT_W,
  colW: COMPACT_COL_W,
});

const FLOW_GEOMETRY = {
  stepCount: STEP_COUNT,
  boxHeight: BOX_H,
  gap: VERTICAL_FLOW_MIN_GAP,
  startY: 72,
  desktop: {
    viewBoxWidth: DESKTOP_W,
    viewBoxHeight: 620,
    colsX: DESKTOP_COL.colsX,
    colsW: DESKTOP_COL_W,
    cx: DESKTOP_COL.cx,
  },
  compact: {
    viewBoxWidth: COMPACT_W,
    viewBoxHeight: 620,
    colsX: COMPACT_COL.colsX,
    colsW: COMPACT_COL_W,
    cx: COMPACT_COL.cx,
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
  const isInteractive = typeof onStepClick === 'function';
  const labels = getM13BusinessWorkflowDiagramLabels(locale);
  const STEPS = labels.steps;
  const STEP_ACTIVE_OPACITY = 1;
  const STEP_INACTIVE_OPACITY = 0.5;
  const { viewBoxWidth, viewBoxHeight, cx, stepBoxes } =
    resolveVerticalFlowGeometry(FLOW_GEOMETRY, isCompactDiagram);
  const typography = DIAGRAM_TOKENS.typography;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={`${labels.ariaBase}${isInteractive ? ` ${labels.ariaInteractiveSuffix}` : ''}`}
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
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`tur-wf-arrow-${uid}`}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={ARROW_MARKER_LEN}
          refY="3"
          orient="auto"
        >
          <path
            d={DIAGRAM_TOKENS.arrow.markerPath}
            fill={palette.flow}
            stroke={palette.flow}
            strokeWidth="0.5"
          />
        </marker>
        <linearGradient
          id={`tur-wf-step-${uid}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.brandTop} />
          <stop offset="100%" stopColor={palette.brand} />
        </linearGradient>
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
        x={cx}
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
        x={cx}
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
        {isInteractive ? labels.hint : ''}
      </text>

      {stepBoxes.map((box, i) => {
        const isActive = currentStep === i;
        const opacity = isActive ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY;
        return (
          <g key={i}>
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
                fill={`url(#tur-wf-step-${uid})`}
                stroke={isActive ? palette.brandDark : palette.brand}
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
