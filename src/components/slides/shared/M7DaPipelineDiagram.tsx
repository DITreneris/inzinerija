/**
 * Modulio 7 – 6 žingsnių duomenų analizės pipeline (interaktyvu).
 * LMS 1A+ Type Etalon W2: flat fills, inactive soft ≠ frame, local tip≥10 / refX=0.
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM7DaPipelineSteps, type M7Locale } from './m7DiagramContent';
import { DIAGRAM_TOKENS, DIAGRAM_TONE_COLORS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import {
  getVerticalFlowConnector,
  resolveVerticalFlowGeometry,
  VERTICAL_FLOW_MIN_GAP,
} from './verticalFlowGeometry';
import { buildVerticalColumnOrigin } from './diagramLayoutMath';

/** Geometry SOT – tests assert center / shaft / tip floors. */
export const M7_DA_PIPELINE_GEOMETRY = {
  /** Industrial analysis path: numbered station rail + full-width stage cards. */
  metaphor: 'station-rail',
  stepCount: 6,
  boxH: 58,
  gap: VERTICAL_FLOW_MIN_GAP,
  /** LMS process tip – processTipLen (not legacy markerLen). */
  arrowTip: DIAGRAM_TOKENS.arrow.processTipLen,
  startY: 44,
  viewBoxH: 520,
  desktop: { viewBoxW: 600, colW: 440, railX: 36 },
  compact: { viewBoxW: 340, colW: 280, railX: 18 },
  railRadius: 11,
  stepLabel: { desktop: 15, compact: 13 },
  stepSub: { desktop: 12, compact: 11 },
  labelBaseline: 24,
  subBaseline: 44,
} as const;

const STEP_COUNT = M7_DA_PIPELINE_GEOMETRY.stepCount;
const BOX_H = M7_DA_PIPELINE_GEOMETRY.boxH;
const GAP = M7_DA_PIPELINE_GEOMETRY.gap;
const ARROW_TIP = M7_DA_PIPELINE_GEOMETRY.arrowTip;
const DESKTOP_W = M7_DA_PIPELINE_GEOMETRY.desktop.viewBoxW;
const DESKTOP_COL_W = M7_DA_PIPELINE_GEOMETRY.desktop.colW;
const DESKTOP_COL = buildVerticalColumnOrigin({
  viewBoxW: DESKTOP_W,
  colW: DESKTOP_COL_W,
});
const COMPACT_W = M7_DA_PIPELINE_GEOMETRY.compact.viewBoxW;
const COMPACT_COL_W = M7_DA_PIPELINE_GEOMETRY.compact.colW;
const COMPACT_COL = buildVerticalColumnOrigin({
  viewBoxW: COMPACT_W,
  colW: COMPACT_COL_W,
});

/** Linear vertical etalon geometry uses diagramLayoutMath center + shaft floors. */
const FLOW_GEOMETRY = {
  stepCount: STEP_COUNT,
  boxHeight: BOX_H,
  gap: GAP,
  startY: M7_DA_PIPELINE_GEOMETRY.startY,
  desktop: {
    viewBoxWidth: DESKTOP_W,
    viewBoxHeight: M7_DA_PIPELINE_GEOMETRY.viewBoxH,
    colsX: DESKTOP_COL.colsX,
    colsW: DESKTOP_COL_W,
    cx: DESKTOP_COL.cx,
  },
  compact: {
    viewBoxWidth: COMPACT_W,
    viewBoxHeight: M7_DA_PIPELINE_GEOMETRY.viewBoxH,
    colsX: COMPACT_COL.colsX,
    colsW: COMPACT_COL_W,
    cx: COMPACT_COL.cx,
  },
};

export default function M7DaPipelineDiagram({
  currentStep = 0,
  onStepClick,
  locale = 'lt',
  className = '',
}: {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  locale?: M7Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const isDarkPalette = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const inactiveSoft = isDarkPalette
    ? DIAGRAM_TOKENS.colors.inactiveSoftDark
    : DIAGRAM_TONE_COLORS.brand.soft;
  const isInteractive = typeof onStepClick === 'function';
  const steps = getM7DaPipelineSteps(locale);
  const { viewBoxWidth, viewBoxHeight, cx, stepBoxes } =
    resolveVerticalFlowGeometry(FLOW_GEOMETRY, isCompactDiagram);
  const typography = DIAGRAM_TOKENS.typography;
  const tipH = ARROW_TIP * 0.9;

  const title = locale === 'en' ? 'Analysis path' : 'Analizės eiga';
  const ariaIntro =
    locale === 'en'
      ? 'Data analysis pipeline, six steps: collection, preparation, EDA, modeling, visualization, publishing.'
      : 'Duomenų analizės pipeline, šeši žingsniai: rinkimas, paruošimas, EDA, modeliavimas, vizualizavimas, publikavimas.';
  const clickAria =
    locale === 'en'
      ? 'Click a step for explanation below.'
      : 'Paspausk žingsnį – paaiškinimas apačioje.';
  const railX = isCompactDiagram
    ? M7_DA_PIPELINE_GEOMETRY.compact.railX
    : M7_DA_PIPELINE_GEOMETRY.desktop.railX;
  const railR = M7_DA_PIPELINE_GEOMETRY.railRadius;
  const firstMidY = stepBoxes[0][1] + stepBoxes[0][3] / 2;
  const lastMidY =
    stepBoxes[stepBoxes.length - 1][1] + stepBoxes[stepBoxes.length - 1][3] / 2;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      data-metaphor={M7_DA_PIPELINE_GEOMETRY.metaphor}
      aria-label={`${ariaIntro}${isInteractive ? ` ${clickAria}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`m7-da-pipeline-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m7-da-pipeline-arrow-${uid}`}
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
        fill={`url(#m7-da-pipeline-bg-${uid})`}
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
        y="28"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={
          isCompactDiagram ? typography.title.compact : typography.title.desktop
        }
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
      >
        {title}
      </text>

      {/* Station rail – primary metaphor (readable without step text). */}
      <g aria-hidden data-rail="station">
        <line
          x1={railX}
          y1={firstMidY}
          x2={railX}
          y2={lastMidY}
          stroke={palette.brand}
          strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
        />
        {stepBoxes.map((box, i) => {
          const midY = box[1] + box[3] / 2;
          const isActive = currentStep === i;
          return (
            <g key={`rail-${i}`} data-station={i}>
              <circle
                cx={railX}
                cy={midY}
                r={railR}
                fill={isActive ? palette.brand : inactiveSoft}
                stroke={isActive ? palette.brandDark : palette.brand}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={railX}
                y={midY + 4}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={isCompactDiagram ? 11 : 12}
                fontWeight="700"
                fill={isActive ? palette.whiteText : palette.brandDark}
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </g>

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
                y={y + M7_DA_PIPELINE_GEOMETRY.labelBaseline}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? M7_DA_PIPELINE_GEOMETRY.stepLabel.compact
                    : M7_DA_PIPELINE_GEOMETRY.stepLabel.desktop
                }
                fontWeight="700"
                fill={labelFill}
              >
                {step.label}
              </text>
              <text
                x={cx}
                y={y + M7_DA_PIPELINE_GEOMETRY.subBaseline}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? M7_DA_PIPELINE_GEOMETRY.stepSub.compact
                    : M7_DA_PIPELINE_GEOMETRY.stepSub.desktop
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
                    strokeWidth={DIAGRAM_TOKENS.stroke.flow}
                    strokeDasharray="4 3"
                    markerEnd={`url(#m7-da-pipeline-arrow-${uid})`}
                    aria-hidden
                    opacity={0.55}
                  />
                );
              })()}
          </g>
        );
      })}
    </svg>
  );
}
