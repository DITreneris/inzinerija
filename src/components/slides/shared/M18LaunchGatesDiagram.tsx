/**
 * M18 launch gates – horizontal tollgate barriers (S4-INDIV).
 * ≠ m16_delivery_gates (vertical corridor) · ≠ m18_diff_ritual (magnifier).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import type { DiagramTone } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import { horizontalRowBoxes } from './cycleFeedbackGeometry';
import {
  getM18LaunchGatesChrome,
  getM18LaunchGatesSteps,
  type M16Locale,
} from './m16M18DiagramContent';

const W = 680;
const H = 220;
const BOX_W = 108;
const BOX_H = 58;
const GAP = 22;
const ROW_Y = 88;
const STEP_COUNT = 5;
/** PROTECTED – toll barrier emphasis */
const PROTECTED_INDEX = 2;
const TONES: DiagramTone[] = ['slate', 'brand', 'amber', 'emerald', 'slate'];

const BOXES = horizontalRowBoxes({
  count: STEP_COUNT,
  boxW: BOX_W,
  boxH: BOX_H,
  gap: GAP,
  viewBoxW: W,
  rowY: ROW_Y,
});

export const M18_LAUNCH_GATES_GEOMETRY = {
  metaphor: 'tollgate-barriers' as const,
  stepCount: STEP_COUNT,
  emphasizedStep: PROTECTED_INDEX,
} as const;

function TollBarrier({
  x,
  y,
  stroke,
  accent,
}: {
  x: number;
  y: number;
  stroke: string;
  accent: string;
}) {
  return (
    <g aria-hidden>
      {/* Post */}
      <rect x={x - 3} y={y} width={6} height={36} rx={1.5} fill={stroke} />
      {/* Boom arm */}
      <rect
        x={x + 2}
        y={y + 4}
        width={14}
        height={5}
        rx={1.5}
        fill={accent}
        transform={`rotate(-18 ${x + 2} ${y + 6})`}
      />
    </g>
  );
}

export default function M18LaunchGatesDiagram({
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
  const steps = getM18LaunchGatesSteps(locale);
  const chrome = getM18LaunchGatesChrome(locale);
  const isInteractive = typeof onStepClick === 'function';
  const typography = DIAGRAM_TOKENS.typography;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`${chrome.aria}${isInteractive ? ` ${chrome.hint}` : ''}`}
      data-metaphor={M18_LAUNCH_GATES_GEOMETRY.metaphor}
    >
      <defs>
        <linearGradient
          id={`m18-launch-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        {TONES.map((tone) => {
          const colors = toneColors[tone];
          return (
            <linearGradient
              key={tone}
              id={`m18-launch-tone-${uid}-${tone}`}
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
        fill={`url(#m18-launch-bg-${uid})`}
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

      {/* Road strip under booths */}
      <rect
        x={36}
        y={ROW_Y + BOX_H + 10}
        width={W - 72}
        height={8}
        rx={4}
        fill={palette.border}
        opacity={0.45}
        aria-hidden
      />

      {BOXES.map((box, i) => {
        const tone = TONES[i];
        const isActive = currentStep === i;
        const isProtected = i === PROTECTED_INDEX;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const step = steps[i];
        const cx = box.x + box.w / 2;
        const barrierX = box.x + box.w + GAP / 2;

        return (
          <g key={i}>
            {i < BOXES.length - 1 && (
              <TollBarrier
                x={barrierX}
                y={box.y + 10}
                stroke={palette.flow}
                accent={
                  i + 1 === PROTECTED_INDEX
                    ? toneColors.amber.stroke
                    : palette.brandDark
                }
              />
            )}
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              {/* Booth roof notch – tollgate silhouette */}
              <rect
                x={box.x + 10}
                y={box.y - 10}
                width={box.w - 20}
                height={10}
                rx={2}
                fill={
                  isProtected || isActive
                    ? palette.brandDark
                    : toneColors[tone].stroke
                }
              />
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#m18-launch-tone-${uid}-${tone})`}
                stroke={
                  isProtected || isActive
                    ? palette.brandDark
                    : toneColors[tone].stroke
                }
                strokeWidth={
                  isProtected || isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              {isProtected && (
                <g transform={`translate(${cx - 5}, ${box.y + 6})`} aria-hidden>
                  <rect
                    x={1}
                    y={4}
                    width={8}
                    height={7}
                    rx={1}
                    fill="none"
                    stroke={palette.whiteText}
                    strokeWidth={1.4}
                  />
                  <path
                    d="M2.5 4 V2.8 a2.5 2.5 0 0 1 5 0 V4"
                    fill="none"
                    stroke={palette.whiteText}
                    strokeWidth={1.4}
                  />
                </g>
              )}
              <text
                x={cx}
                y={box.y + (isProtected ? 32 : 24)}
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
                y={box.y + (isProtected ? 48 : 42)}
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
                y={box.y - 10}
                width={box.w}
                height={box.h + 10}
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
