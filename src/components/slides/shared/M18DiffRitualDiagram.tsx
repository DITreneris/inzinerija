/**
 * M18 diff ritual – horizontal process with magnifier on Diff step (S4-INDIV).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import type { DiagramTone } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import { horizontalRowBoxes } from './cycleFeedbackGeometry';
import {
  getM18DiffRitualChrome,
  getM18DiffRitualSteps,
  type M16Locale,
} from './m16M18DiagramContent';

const W = 640;
const H = 200;
const BOX_W = 100;
const BOX_H = 56;
const GAP = 18;
const ROW_Y = 78;
const STEP_COUNT = 5;
const DIFF_INDEX = 1;
const PROCESS_ARROW = getProcessArrowMarkerGeom();
const TONES: DiagramTone[] = ['slate', 'amber', 'brand', 'emerald', 'slate'];

const BOXES = horizontalRowBoxes({
  count: STEP_COUNT,
  boxW: BOX_W,
  boxH: BOX_H,
  gap: GAP,
  viewBoxW: W,
  rowY: ROW_Y,
});

export const M18_DIFF_RITUAL_GEOMETRY = {
  metaphor: 'diff-magnifier' as const,
  stepCount: STEP_COUNT,
  emphasizedStep: DIFF_INDEX,
} as const;

export default function M18DiffRitualDiagram({
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
  const steps = getM18DiffRitualSteps(locale);
  const chrome = getM18DiffRitualChrome(locale);
  const isInteractive = typeof onStepClick === 'function';
  const typography = DIAGRAM_TOKENS.typography;
  const diffBox = BOXES[DIFF_INDEX];
  const magCx = diffBox.x + diffBox.w / 2;
  const magCy = diffBox.y - 18;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`${chrome.aria}${isInteractive ? ` ${chrome.hint}` : ''}`}
      data-metaphor={M18_DIFF_RITUAL_GEOMETRY.metaphor}
    >
      <defs>
        <linearGradient
          id={`m18-diff-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m18-diff-arrow-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path d={PROCESS_ARROW.pathD} fill={palette.flow} />
        </marker>
        {TONES.map((tone) => {
          const colors = toneColors[tone];
          return (
            <linearGradient
              key={tone}
              id={`m18-diff-tone-${uid}-${tone}`}
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
        fill={`url(#m18-diff-bg-${uid})`}
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

      {/* Magnifier emphasis on Diff */}
      <g aria-hidden>
        <circle
          cx={magCx}
          cy={magCy}
          r={14}
          fill="none"
          stroke={toneColors.amber.stroke}
          strokeWidth={2.5}
        />
        <line
          x1={magCx + 10}
          y1={magCy + 10}
          x2={magCx + 20}
          y2={magCy + 20}
          stroke={toneColors.amber.stroke}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </g>

      {BOXES.map((box, i) => {
        const tone = TONES[i];
        const isActive = currentStep === i;
        const isDiff = i === DIFF_INDEX;
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
                markerEnd={`url(#m18-diff-arrow-${uid})`}
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
                fill={`url(#m18-diff-tone-${uid}-${tone})`}
                stroke={
                  isDiff || isActive
                    ? palette.brandDark
                    : toneColors[tone].stroke
                }
                strokeWidth={
                  isDiff || isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={box.y + 24}
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
                y={box.y + 42}
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
