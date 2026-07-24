/**
 * DI prezentacijos workflow – 5 žingsnių tiesinė schema.
 * LMS 1A W2: flat fills, palette, local tip≥10 / refX=0, column helpers.
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import type { Locale } from './diPrezentacijosWorkflowConfig';
import {
  getDiPrezentacijosDiagramContent,
  getDiPrezentacijosSteps,
} from './diPrezentacijosWorkflowConfig';
import { DIAGRAM_TOKENS, DIAGRAM_TONE_COLORS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import {
  getVerticalFlowConnector,
  resolveVerticalFlowGeometry,
  VERTICAL_FLOW_MIN_GAP,
} from './verticalFlowGeometry';
import { buildVerticalColumnOrigin } from './diagramLayoutMath';

/** Dark inactive soft – between frame bgStart and brand (tone.soft equals bg). */
const INACTIVE_SOFT_DARK = '#334155';

/** Geometry SOT – tests assert center / shaft / tip floors. Own sizes (not da_pipeline copy). */
export const DI_PREZENTACIJOS_GEOMETRY = {
  stepCount: 5,
  boxH: 58,
  gap: VERTICAL_FLOW_MIN_GAP,
  /** Local tip ≥~2× stroke.flow 3.5; do not change DIAGRAM_TOKENS.arrow.markerLen. */
  arrowTip: 10,
  startY: 44,
  viewBoxH: 460,
  desktop: { viewBoxW: 560, colW: 360 },
  compact: { viewBoxW: 340, colW: 280 },
  stepLabel: { desktop: 15, compact: 13 },
  stepSub: { desktop: 12, compact: 11 },
  labelBaseline: 24,
  subBaseline: 44,
} as const;

const STEP_COUNT = DI_PREZENTACIJOS_GEOMETRY.stepCount;
const BOX_H = DI_PREZENTACIJOS_GEOMETRY.boxH;
const GAP = DI_PREZENTACIJOS_GEOMETRY.gap;
const ARROW_TIP = DI_PREZENTACIJOS_GEOMETRY.arrowTip;
const DESKTOP_W = DI_PREZENTACIJOS_GEOMETRY.desktop.viewBoxW;
const DESKTOP_COL_W = DI_PREZENTACIJOS_GEOMETRY.desktop.colW;
const DESKTOP_COL = buildVerticalColumnOrigin({
  viewBoxW: DESKTOP_W,
  colW: DESKTOP_COL_W,
});
const COMPACT_W = DI_PREZENTACIJOS_GEOMETRY.compact.viewBoxW;
const COMPACT_COL_W = DI_PREZENTACIJOS_GEOMETRY.compact.colW;
const COMPACT_COL = buildVerticalColumnOrigin({
  viewBoxW: COMPACT_W,
  colW: COMPACT_COL_W,
});

const FLOW_GEOMETRY = {
  stepCount: STEP_COUNT,
  boxHeight: BOX_H,
  gap: GAP,
  startY: DI_PREZENTACIJOS_GEOMETRY.startY,
  desktop: {
    viewBoxWidth: DESKTOP_W,
    viewBoxHeight: DI_PREZENTACIJOS_GEOMETRY.viewBoxH,
    colsX: DESKTOP_COL.colsX,
    colsW: DESKTOP_COL_W,
    cx: DESKTOP_COL.cx,
  },
  compact: {
    viewBoxWidth: COMPACT_W,
    viewBoxHeight: DI_PREZENTACIJOS_GEOMETRY.viewBoxH,
    colsX: COMPACT_COL.colsX,
    colsW: COMPACT_COL_W,
    cx: COMPACT_COL.cx,
  },
};

interface DiPrezentacijosWorkflowDiagramProps {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  locale?: Locale;
  className?: string;
}

export default function DiPrezentacijosWorkflowDiagram({
  currentStep = 0,
  onStepClick,
  locale = 'lt',
  className = '',
}: DiPrezentacijosWorkflowDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const isDarkPalette = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const inactiveSoft = isDarkPalette
    ? INACTIVE_SOFT_DARK
    : DIAGRAM_TONE_COLORS.brand.soft;
  const isInteractive = typeof onStepClick === 'function';
  const steps = getDiPrezentacijosSteps(locale);
  const content = getDiPrezentacijosDiagramContent(locale);
  const { viewBoxWidth, viewBoxHeight, cx, stepBoxes } =
    resolveVerticalFlowGeometry(FLOW_GEOMETRY, isCompactDiagram);
  const typography = DIAGRAM_TOKENS.typography;
  const tipH = ARROW_TIP * 0.9;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`${content.ariaLabel}${isInteractive ? content.interactiveHint : ''}`}
    >
      <defs>
        <linearGradient
          id={`di-prez-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`di-prez-arrow-${uid}`}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={ARROW_TIP}
          markerHeight={tipH}
          refX={0}
          refY={tipH / 2}
          orient="auto"
        >
          <path
            d={`M0 0 L${ARROW_TIP} ${tipH / 2} L0 ${tipH} Z`}
            fill={palette.flow}
            stroke={palette.flow}
            strokeWidth="0.5"
          />
        </marker>
      </defs>

      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill={`url(#di-prez-bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />

      <text
        x={cx}
        y="28"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={
          isCompactDiagram ? typography.title.compact : typography.title.desktop
        }
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
      >
        {content.title}
      </text>

      {stepBoxes.map((box, i) => {
        const [x, y, w, h] = box;
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const step = steps[i];
        const fill = isActive ? palette.brand : inactiveSoft;
        const labelFill = isActive ? palette.whiteText : palette.brandDark;
        const subFill = isActive ? palette.whiteText : palette.muted;
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
                fill={fill}
                stroke={isActive ? palette.brandDark : palette.brand}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={y + DI_PREZENTACIJOS_GEOMETRY.labelBaseline}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? DI_PREZENTACIJOS_GEOMETRY.stepLabel.compact
                    : DI_PREZENTACIJOS_GEOMETRY.stepLabel.desktop
                }
                fontWeight="700"
                fill={labelFill}
              >
                {i + 1} · {step.label}
              </text>
              <text
                x={cx}
                y={y + DI_PREZENTACIJOS_GEOMETRY.subBaseline}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? DI_PREZENTACIJOS_GEOMETRY.stepSub.compact
                    : DI_PREZENTACIJOS_GEOMETRY.stepSub.desktop
                }
                fontWeight="500"
                fill={subFill}
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
                  ARROW_TIP
                );
                return (
                  <line
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    stroke={palette.flow}
                    strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
                    markerEnd={`url(#di-prez-arrow-${uid})`}
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
