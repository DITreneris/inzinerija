/**
 * M16 delivery gates – checkpoint corridor (S4-INDIV: gate posts between steps).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import {
  getM16DeliveryGatesChrome,
  getM16DeliveryGatesSteps,
  type M16Locale,
} from './m16M18DiagramContent';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import { DiagramStepHitArea } from './diagramKit';
import {
  getVerticalFlowConnector,
  resolveVerticalFlowGeometry,
  VERTICAL_FLOW_MIN_GAP,
} from './verticalFlowGeometry';
import { buildVerticalColumnOrigin } from './diagramLayoutMath';
import type { DiagramTone } from './diagramTokens';

const STEP_COUNT = 6;
const BOX_H = 46;
const GAP = VERTICAL_FLOW_MIN_GAP;
const PROCESS_ARROW = getProcessArrowMarkerGeom();
const ARROW_MARKER_LEN = PROCESS_ARROW.tipLen;
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

export const M16_DELIVERY_GATES_GEOMETRY = {
  metaphor: 'gates-corridor' as const,
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
} as const;

const FLOW_GEOMETRY = {
  stepCount: STEP_COUNT,
  boxHeight: BOX_H,
  gap: GAP,
  startY: M16_DELIVERY_GATES_GEOMETRY.startY,
  desktop: M16_DELIVERY_GATES_GEOMETRY.desktop,
  compact: M16_DELIVERY_GATES_GEOMETRY.compact,
};

const TONES: DiagramTone[] = [
  'brand',
  'slate',
  'amber',
  'brand',
  'slate',
  'emerald',
];

export default function M16DeliveryGatesDiagram({
  currentStep = 0,
  onStepClick,
  locale = 'lt',
  className = '',
}: {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  locale?: M16Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const isDark = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const toneColors = getDiagramToneColors(isDark);
  const isInteractive = typeof onStepClick === 'function';
  const steps = getM16DeliveryGatesSteps(locale);
  const chrome = getM16DeliveryGatesChrome(locale);
  const { viewBoxWidth, viewBoxHeight, cx, stepBoxes } =
    resolveVerticalFlowGeometry(FLOW_GEOMETRY, isCompactDiagram);
  const typography = DIAGRAM_TOKENS.typography;
  const uniqueTones = [...new Set(TONES)];

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={`${chrome.aria}${isInteractive ? ` ${chrome.hint}` : ''}`}
      data-metaphor={M16_DELIVERY_GATES_GEOMETRY.metaphor}
    >
      <defs>
        <linearGradient
          id={`m16-gates-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m16-gates-arrow-${uid}`}
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
        {uniqueTones.map((tone) => {
          const colors = toneColors[tone];
          return (
            <linearGradient
              key={tone}
              id={`m16-gates-tone-${uid}-${tone}`}
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
        fill={`url(#m16-gates-bg-${uid})`}
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
        const tone = TONES[i];
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const step = steps[i];
        const postW = 6;
        const postH = 18;
        return (
          <g key={i}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              {/* Gate posts – corridor metaphor */}
              <rect
                x={x - 10}
                y={y + (h - postH) / 2}
                width={postW}
                height={postH}
                rx={2}
                fill={palette.brandDark}
              />
              <rect
                x={x + w + 4}
                y={y + (h - postH) / 2}
                width={postW}
                height={postH}
                rx={2}
                fill={palette.brandDark}
              />
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#m16-gates-tone-${uid}-${tone})`}
                stroke={isActive ? palette.brandDark : toneColors[tone].stroke}
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
                x={x - 12}
                y={y}
                width={w + 24}
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
                    markerEnd={`url(#m16-gates-arrow-${uid})`}
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
