/**
 * Modulio 13 – generatyvinės medijos pipeline (6 žingsniai, interaktyvu).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import {
  getM13MediaPipelineChrome,
  getM13MediaPipelineSteps,
  type M13Locale,
} from './m13MediaPipelineContent';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import {
  getVerticalFlowConnector,
  resolveVerticalFlowGeometry,
  VERTICAL_FLOW_MIN_GAP,
} from './verticalFlowGeometry';
import { buildVerticalColumnOrigin } from './diagramLayoutMath';

const STEP_COUNT = 6;
const BOX_H = 46;
const GAP = VERTICAL_FLOW_MIN_GAP;
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
  gap: GAP,
  startY: 74,
  desktop: {
    viewBoxWidth: DESKTOP_W,
    viewBoxHeight: 520,
    colsX: DESKTOP_COL.colsX,
    colsW: DESKTOP_COL_W,
    cx: DESKTOP_COL.cx,
  },
  compact: {
    viewBoxWidth: COMPACT_W,
    viewBoxHeight: 520,
    colsX: COMPACT_COL.colsX,
    colsW: COMPACT_COL_W,
    cx: COMPACT_COL.cx,
  },
};

export default function M13MediaPipelineDiagram({
  currentStep = 0,
  onStepClick,
  locale = 'lt',
  className = '',
}: {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  locale?: M13Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const isInteractive = typeof onStepClick === 'function';
  const steps = getM13MediaPipelineSteps(locale);
  const chrome = getM13MediaPipelineChrome(locale);
  const { viewBoxWidth, viewBoxHeight, cx, stepBoxes } =
    resolveVerticalFlowGeometry(FLOW_GEOMETRY, isCompactDiagram);
  const typography = DIAGRAM_TOKENS.typography;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={`${chrome.aria}${isInteractive ? ` ${chrome.hint}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`m13-media-pipeline-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m13-media-pipeline-arrow-${uid}`}
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
          id={`m13-media-pipeline-step-${uid}`}
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
        fill={`url(#m13-media-pipeline-bg-${uid})`}
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
        y="34"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={
          isCompactDiagram ? typography.title.compact : typography.title.desktop
        }
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
      >
        {chrome.title}
      </text>
      <text
        x={cx}
        y="52"
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
        {isInteractive ? chrome.hint : ''}
      </text>

      {stepBoxes.map((box, i) => {
        const [x, y, w, h] = box;
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const step = steps[i];
        return (
          <g key={i}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#m13-media-pipeline-step-${uid})`}
                stroke={isActive ? palette.brandDark : palette.brand}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={y + 19}
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
                {i + 1} · {step.label}
              </text>
              <text
                x={cx}
                y={y + 36}
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
                {step.desc}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={x}
                y={y}
                width={w}
                height={h}
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
                    markerEnd={`url(#m13-media-pipeline-arrow-${uid})`}
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
