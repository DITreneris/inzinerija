/**
 * Modulio 7 – 5 žingsnių duomenų paruošimo seka (interaktyvi).
 * Metaphor: prep funnel (narrowing stages + checklist ticks) — distinct from DA station-rail (73).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM7DataPrepSteps, type M7Locale } from './m7DiagramContent';
import {
  DIAGRAM_TOKENS,
  DIAGRAM_TONE_COLORS,
  getDiagramToneColors,
} from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import {
  getVerticalFlowConnector,
  VERTICAL_FLOW_MIN_GAP,
  type DiagramBox,
} from './verticalFlowGeometry';

/** Geometry SOT – tests assert center / shaft / tip floors. */
export const M7_DATA_PREP_GEOMETRY = {
  /** Cleaning funnel: narrowing stages + left checklist ticks. */
  metaphor: 'prep-funnel',
  stepCount: 5,
  boxH: 58,
  gap: VERTICAL_FLOW_MIN_GAP,
  /** LMS process tip – processTipLen (not legacy markerLen). */
  arrowTip: DIAGRAM_TOKENS.arrow.processTipLen,
  startY: 44,
  /** 44 + 5×58 + 4×24 + bottom pad ≈ 448 */
  viewBoxH: 448,
  /** Max stage width (step 0); later steps scale via funnelScales. */
  desktop: { viewBoxW: 600, colW: 440 },
  compact: { viewBoxW: 340, colW: 280 },
  /** Relative widths top→bottom (funnel silhouette without step text). */
  funnelScales: [1, 0.9, 0.8, 0.7, 0.6] as const,
  stepLabel: { desktop: 15, compact: 13 },
  stepSub: { desktop: 12, compact: 11 },
  labelBaseline: 24,
  subBaseline: 44,
} as const;

const STEP_COUNT = M7_DATA_PREP_GEOMETRY.stepCount;
const BOX_H = M7_DATA_PREP_GEOMETRY.boxH;
const GAP = M7_DATA_PREP_GEOMETRY.gap;
const ARROW_TIP = M7_DATA_PREP_GEOMETRY.arrowTip;

function buildFunnelBoxes(
  viewBoxW: number,
  maxColW: number
): { cx: number; stepBoxes: DiagramBox[] } {
  const scales = M7_DATA_PREP_GEOMETRY.funnelScales;
  const cx = viewBoxW / 2;
  const stepBoxes: DiagramBox[] = Array.from({ length: STEP_COUNT }, (_, i) => {
    const scale = scales[i] ?? scales[scales.length - 1];
    const w = Math.round(maxColW * scale);
    const x = Math.round((viewBoxW - w) / 2);
    const y = M7_DATA_PREP_GEOMETRY.startY + (BOX_H + GAP) * i;
    return [x, y, w, BOX_H];
  });
  return { cx, stepBoxes };
}

export default function M7DataPrepWorkflowDiagram({
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
  const tones = getDiagramToneColors(isDarkPalette);
  const inactiveSoft = isDarkPalette
    ? DIAGRAM_TOKENS.colors.inactiveSoftDark
    : DIAGRAM_TONE_COLORS.slate.soft;
  const stageStroke = tones.slate.stroke;
  const isInteractive = typeof onStepClick === 'function';
  const stepsMeta = getM7DataPrepSteps(locale);
  const viewBoxWidth = isCompactDiagram
    ? M7_DATA_PREP_GEOMETRY.compact.viewBoxW
    : M7_DATA_PREP_GEOMETRY.desktop.viewBoxW;
  const maxColW = isCompactDiagram
    ? M7_DATA_PREP_GEOMETRY.compact.colW
    : M7_DATA_PREP_GEOMETRY.desktop.colW;
  const viewBoxHeight = M7_DATA_PREP_GEOMETRY.viewBoxH;
  const { cx, stepBoxes } = buildFunnelBoxes(viewBoxWidth, maxColW);
  const typography = DIAGRAM_TOKENS.typography;
  const tipH = ARROW_TIP * 0.9;

  const title =
    locale === 'en'
      ? 'Five-step data prep'
      : 'Penki žingsniai duomenų paruošimui';
  const ariaIntro =
    locale === 'en'
      ? 'Five steps: sources, structure, collect, cleaning, export.'
      : 'Penki žingsniai: šaltiniai, struktūra, surinkimas, valymas, eksportas.';
  const clickAria =
    locale === 'en'
      ? 'Click a step for explanation below.'
      : 'Paspausk žingsnį – paaiškinimas apačioje.';

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      data-metaphor={M7_DATA_PREP_GEOMETRY.metaphor}
      aria-label={`${ariaIntro}${isInteractive ? ` ${clickAria}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`m7-prep-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m7-prep-arrow-${uid}`}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={ARROW_TIP}
          markerHeight={tipH}
          refX={0}
          refY={tipH / 2}
          orient="auto"
        >
          <path
            d={`M0 0 L${ARROW_TIP} ${tipH / 2} L0 ${tipH} Z`}
            fill={stageStroke}
            stroke={stageStroke}
            strokeWidth="0.5"
          />
        </marker>
      </defs>

      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill={`url(#m7-prep-bg-${uid})`}
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

      {stepBoxes.map((box, i) => {
        const [x, y, w, h] = box;
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const st = stepsMeta[i];
        const fill = isActive ? tones.slate.bottom : inactiveSoft;
        const labelFill = isActive ? tones.slate.text : palette.brandDark;
        const subFill = isActive ? tones.slate.text : palette.muted;
        const tickX = x - (isCompactDiagram ? 14 : 18);
        const tickCy = y + h / 2;
        return (
          <g key={i} data-funnel-step={i} data-funnel-w={w}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              {/* Checklist tick – funnel metaphor cue left of stage. */}
              <circle
                cx={tickX}
                cy={tickCy}
                r={isCompactDiagram ? 7 : 8}
                fill={isActive ? tones.emerald.bottom : inactiveSoft}
                stroke={isActive ? tones.emerald.stroke : stageStroke}
                strokeWidth={DIAGRAM_TOKENS.stroke.inactive}
                data-checklist-tick={i}
              />
              <path
                d={
                  isCompactDiagram
                    ? `M${tickX - 3} ${tickCy} L${tickX - 1} ${tickCy + 2.5} L${tickX + 3.5} ${tickCy - 2.5}`
                    : `M${tickX - 3.5} ${tickCy} L${tickX - 0.5} ${tickCy + 3} L${tickX + 4} ${tickCy - 3}`
                }
                fill="none"
                stroke={isActive ? '#ffffff' : stageStroke}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={fill}
                stroke={isActive ? tones.slate.stroke : stageStroke}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={y + M7_DATA_PREP_GEOMETRY.labelBaseline}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? M7_DATA_PREP_GEOMETRY.stepLabel.compact
                    : M7_DATA_PREP_GEOMETRY.stepLabel.desktop
                }
                fontWeight="700"
                fill={labelFill}
              >
                {st.label}
              </text>
              <text
                x={cx}
                y={y + M7_DATA_PREP_GEOMETRY.subBaseline}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? M7_DATA_PREP_GEOMETRY.stepSub.compact
                    : M7_DATA_PREP_GEOMETRY.stepSub.desktop
                }
                fontWeight="500"
                fill={subFill}
              >
                {st.desc}
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
                    stroke={stageStroke}
                    strokeWidth={DIAGRAM_TOKENS.stroke.flow}
                    strokeDasharray="5 4"
                    markerEnd={`url(#m7-prep-arrow-${uid})`}
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
