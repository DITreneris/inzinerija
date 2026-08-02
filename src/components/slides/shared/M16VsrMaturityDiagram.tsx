/**
 * M16 VSR maturity ladder – ascending rungs (S4-INDIV: not a flat stack twin).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import type { DiagramTone } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import {
  getM16VsrMaturityChrome,
  getM16VsrMaturitySteps,
  type M16Locale,
} from './m16M18DiagramContent';

const W = 340;
const H = 320;
const STEP_COUNT = 3;
const TONES: DiagramTone[] = ['slate', 'brand', 'emerald'];

/** Ladder: bottom rung widest (Vibe), top narrowest (Refinement). */
function ladderRects() {
  const widths = [280, 220, 160];
  const boxH = 56;
  const gap = 18;
  const startY = 52;
  return widths.map((boxW, i) => {
    const x = (W - boxW) / 2;
    const y = startY + (STEP_COUNT - 1 - i) * (boxH + gap);
    return { x, y, w: boxW, h: boxH, rung: i };
  });
}

const RECTS = ladderRects();

export const M16_VSR_MATURITY_GEOMETRY = {
  metaphor: 'maturity-ladder' as const,
  stepCount: STEP_COUNT,
} as const;

export default function M16VsrMaturityDiagram({
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
  const steps = getM16VsrMaturitySteps(locale);
  const chrome = getM16VsrMaturityChrome(locale);
  const isInteractive = typeof onStepClick === 'function';
  const typography = DIAGRAM_TOKENS.typography;
  const cx = W / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-sm mx-auto block ${className}`}
      role="img"
      aria-label={`${chrome.aria}${isInteractive ? ` ${chrome.hint}` : ''}`}
      data-metaphor={M16_VSR_MATURITY_GEOMETRY.metaphor}
    >
      <defs>
        <linearGradient
          id={`m16-vsr-bg-${uid}`}
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
              id={`m16-vsr-tone-${uid}-${tone}`}
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
        fill={`url(#m16-vsr-bg-${uid})`}
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
        x={cx}
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
        x={cx}
        y="44"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={typography.subtitle.desktop}
        fontWeight="500"
        fill={palette.muted}
      >
        {isInteractive ? chrome.hint : ''}
      </text>

      {/* Ladder rails */}
      <line
        x1={48}
        y1={RECTS[0].y + RECTS[0].h}
        x2={48}
        y2={RECTS[2].y}
        stroke={palette.flow}
        strokeWidth={DIAGRAM_TOKENS.stroke.flow}
        aria-hidden
      />
      <line
        x1={W - 48}
        y1={RECTS[0].y + RECTS[0].h}
        x2={W - 48}
        y2={RECTS[2].y}
        stroke={palette.flow}
        strokeWidth={DIAGRAM_TOKENS.stroke.flow}
        aria-hidden
      />

      {RECTS.map((r) => {
        const i = r.rung;
        const tone = TONES[i];
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
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#m16-vsr-tone-${uid}-${tone})`}
                stroke={isActive ? palette.brandDark : toneColors[tone].stroke}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={r.y + 22}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={typography.stepLabel.desktop}
                fontWeight="700"
                fill="white"
              >
                {i + 1} · {step.label}
              </text>
              <text
                x={cx}
                y={r.y + 40}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={typography.stepSub.desktop}
                fontWeight="500"
                fill={palette.whiteText}
              >
                {step.desc}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
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
