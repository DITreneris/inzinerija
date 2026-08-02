/**
 * M16/M18 user cycle – horizontal spine + return U (S4-INDIV cycle metaphor).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import type { DiagramTone } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import { feedbackUPath, horizontalRowBoxes } from './cycleFeedbackGeometry';
import {
  getM16UserCycleChrome,
  getM16UserCycleSteps,
  type M16Locale,
} from './m16M18DiagramContent';

const W = 640;
const H = 220;
const BOX_W = 100;
const BOX_H = 52;
const GAP = 16;
const ROW_Y = 70;
const STEP_COUNT = 5;
const PROCESS_ARROW = getProcessArrowMarkerGeom();
const TONES: DiagramTone[] = ['brand', 'slate', 'amber', 'emerald', 'brand'];

const BOXES = horizontalRowBoxes({
  count: STEP_COUNT,
  boxW: BOX_W,
  boxH: BOX_H,
  gap: GAP,
  viewBoxW: W,
  rowY: ROW_Y,
});

export const M16_USER_CYCLE_GEOMETRY = {
  metaphor: 'cycle-return' as const,
  stepCount: STEP_COUNT,
} as const;

export default function M16UserCycleDiagram({
  locale = 'lt',
  className = '',
  currentStep = 0,
  onStepClick,
}: {
  locale?: M16Locale;
  className?: string;
  currentStep?: number;
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const isDark = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const toneColors = getDiagramToneColors(isDark);
  const steps = getM16UserCycleSteps(locale);
  const chrome = getM16UserCycleChrome(locale);
  const isInteractive = typeof onStepClick === 'function';
  const typography = DIAGRAM_TOKENS.typography;
  const first = BOXES[0];
  const last = BOXES[BOXES.length - 1];
  const loopD = feedbackUPath({
    firstCx: first.x + first.w / 2,
    lastCx: last.x + last.w / 2,
    startY: last.y + last.h + 4,
    troughY: H - 28,
    tipY: first.y + first.h + 2,
    cornerR: 12,
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`${chrome.aria}${isInteractive ? ` ${chrome.hint}` : ''}`}
      data-metaphor={M16_USER_CYCLE_GEOMETRY.metaphor}
    >
      <defs>
        <linearGradient
          id={`m16-cycle-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m16-cycle-arrow-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path d={PROCESS_ARROW.pathD} fill={palette.flow} />
        </marker>
        <marker
          id={`m16-cycle-return-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path d={PROCESS_ARROW.pathD} fill={toneColors.amber.stroke} />
        </marker>
        {TONES.map((tone) => {
          const colors = toneColors[tone];
          return (
            <linearGradient
              key={tone}
              id={`m16-cycle-tone-${uid}-${tone}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={colors.top} />
              <stop offset="100%" stopColor={colors.bottom} />
            </linearGradient>
          );
        })}
      </defs>
      <rect
        width={W}
        height={H}
        fill={`url(#m16-cycle-bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <rect
        width={W}
        height={H}
        fill="none"
        stroke={palette.border}
        strokeWidth={DIAGRAM_TOKENS.stroke.border}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <text
        x={W / 2}
        y="28"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={typography.title.desktop}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
      >
        {chrome.title}
      </text>
      <text
        x={W / 2}
        y="46"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={typography.subtitle.desktop}
        fontWeight="500"
        fill={palette.muted}
      >
        {isInteractive ? chrome.hint : ''}
      </text>

      <path
        d={loopD}
        fill="none"
        stroke={toneColors.amber.stroke}
        strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
        markerEnd={`url(#m16-cycle-return-${uid})`}
        aria-hidden
      />

      {BOXES.map((box, i) => {
        const tone = TONES[i];
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const step = steps[i];
        const cx = box.x + box.w / 2;
        return (
          <g key={i}>
            {i < BOXES.length - 1 && (
              <line
                x1={box.x + box.w + 2}
                y1={box.y + box.h / 2}
                x2={BOXES[i + 1].x - PROCESS_ARROW.tipLen}
                y2={box.y + box.h / 2}
                stroke={palette.flow}
                strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
                markerEnd={`url(#m16-cycle-arrow-${uid})`}
                aria-hidden
              />
            )}
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#m16-cycle-tone-${uid}-${tone})`}
                stroke={isActive ? palette.brandDark : toneColors[tone].stroke}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={box.y + 22}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={typography.stepLabel.compact}
                fontWeight="700"
                fill="white"
              >
                {step.label}
              </text>
              <text
                x={cx}
                y={box.y + 40}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={typography.stepSub.compact}
                fontWeight="500"
                fill={palette.whiteText}
              >
                {step.desc}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                radius={DIAGRAM_TOKENS.radius.box}
                onActivate={() => onStepClick?.(i)}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
