/**
 * Modulio 9 – 8 žingsnių duomenų valdymo ciklas (interaktyvi diagrama).
 * Geometrija: vertikalus srautas; rodyklės kraštas į kraštą (SCHEME_AGENT §3.2).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM9DataWorkflowSteps } from './m9DataWorkflowContent';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import { resolveVerticalFlowGeometry } from './verticalFlowGeometry';

const BOX_H = 46;
const GAP = 14;
const ARROW_MARKER_LEN = DIAGRAM_TOKENS.arrow.markerLen;
const STEP_COUNT = 8;

const FLOW_GEOMETRY = {
  stepCount: STEP_COUNT,
  boxHeight: BOX_H,
  gap: GAP,
  startY: 72,
  desktop: {
    viewBoxWidth: 560,
    viewBoxHeight: 640,
    colsX: 80,
    colsW: 400,
    cx: 280,
  },
  compact: {
    viewBoxWidth: 320,
    viewBoxHeight: 640,
    colsX: 28,
    colsW: 264,
    cx: 160,
  },
};

interface M9DataWorkflowDiagramProps {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  locale?: 'lt' | 'en';
  /** Modulio 7 MASTER skaidrė – kita antraštė, tie patys 8 žingsniai */
  diagramContext?: 'm9' | 'm7_master';
  className?: string;
}

export default function M9DataWorkflowDiagram({
  currentStep = 0,
  onStepClick,
  locale = 'lt',
  diagramContext = 'm9',
  className = '',
}: M9DataWorkflowDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const isInteractive = typeof onStepClick === 'function';
  const stepsMeta = getM9DataWorkflowSteps(locale);
  const { viewBoxWidth, viewBoxHeight, cx, stepBoxes } =
    resolveVerticalFlowGeometry(FLOW_GEOMETRY, isCompactDiagram);
  const typography = DIAGRAM_TOKENS.typography;

  const title =
    diagramContext === 'm7_master'
      ? locale === 'en'
        ? 'MASTER: 8 analysis steps'
        : 'MASTER: 8 analizės žingsniai'
      : locale === 'en'
        ? '8-step data workflow'
        : '8 žingsnių duomenų ciklas';
  const hint =
    locale === 'en'
      ? 'Tap a step – explanation below'
      : 'Paspausk žingsnį – paaiškinimas apačioje';

  const ariaIntro =
    diagramContext === 'm7_master'
      ? locale === 'en'
        ? 'MASTER prompt: eight steps from sources to recommendations.'
        : 'MASTER promptas: aštuoni žingsniai nuo šaltinių iki rekomendacijų.'
      : locale === 'en'
        ? 'Module 9 workflow: eight steps from collection to HTML dashboard.'
        : 'Modulio 9 workflow: aštuoni žingsniai nuo surinkimo iki .html dashboard.';

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={`${ariaIntro}${isInteractive ? ` ${hint}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`m9-wf-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m9-wf-arrow-${uid}`}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={ARROW_MARKER_LEN}
          refY="3"
          orient="auto"
        >
          <path
            d={DIAGRAM_TOKENS.arrow.markerPath}
            fill={palette.brand}
            stroke={palette.brand}
            strokeWidth="0.5"
          />
        </marker>
        <linearGradient
          id={`m9-wf-step-${uid}`}
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
        fill={`url(#m9-wf-bg-${uid})`}
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
        fontWeight="800"
        fill={palette.brandDark}
      >
        {title}
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
        {isInteractive ? hint : ''}
      </text>

      {stepBoxes.map((box, i) => {
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const st = stepsMeta[i];
        const stepLabel = `${i + 1} · ${st.label}`;
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
                fill={`url(#m9-wf-step-${uid})`}
                stroke={isActive ? palette.brandDark : palette.brand}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={box[1] + 19}
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
                {stepLabel}
              </text>
              <text
                x={cx}
                y={box[1] + 36}
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
                {st.desc}
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
            {i < stepBoxes.length - 1 && (
              <line
                x1={cx}
                y1={box[1] + box[3]}
                x2={cx}
                y2={stepBoxes[i + 1][1] - ARROW_MARKER_LEN}
                stroke={palette.brand}
                strokeWidth={DIAGRAM_TOKENS.stroke.flow}
                markerEnd={`url(#m9-wf-arrow-${uid})`}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
