/**
 * M18 BUILD PACKET stack – file layers with tab motifs (S4-INDIV).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import type { DiagramTone } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import {
  FUNNEL_STACK_ETALON_GAP,
  stackColumnRects,
} from './funnelStackGeometry';
import {
  getM18PacketStackChrome,
  getM18PacketStackSteps,
  type M16Locale,
} from './m16M18DiagramContent';

const W = 340;
const H = 380;
const BOX_H = 52;
const GAP = FUNNEL_STACK_ETALON_GAP;
const START_Y = 52;
const BOX_W = 260;
const STEP_COUNT = 5;
const TONES: DiagramTone[] = ['slate', 'brand', 'amber', 'brand', 'emerald'];

const STAGE_RECTS = stackColumnRects({
  viewBoxW: W,
  boxW: BOX_W,
  boxH: BOX_H,
  count: STEP_COUNT,
  startY: START_Y,
  gap: GAP,
});

export const M18_PACKET_STACK_GEOMETRY = {
  metaphor: 'packet-stack' as const,
  stepCount: STEP_COUNT,
} as const;

export default function M18PacketStackDiagram({
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
  const steps = getM18PacketStackSteps(locale);
  const chrome = getM18PacketStackChrome(locale);
  const isInteractive = typeof onStepClick === 'function';
  const typography = DIAGRAM_TOKENS.typography;
  const cx = W / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-sm mx-auto block ${className}`}
      role="img"
      aria-label={`${chrome.aria}${isInteractive ? ` ${chrome.hint}` : ''}`}
      data-metaphor={M18_PACKET_STACK_GEOMETRY.metaphor}
    >
      <defs>
        <linearGradient
          id={`m18-pkt-bg-${uid}`}
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
              id={`m18-pkt-tone-${uid}-${tone}`}
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
        fill={`url(#m18-pkt-bg-${uid})`}
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

      {STAGE_RECTS.map((r, i) => {
        const tone = TONES[i];
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const step = steps[i];
        const tabW = 36;
        const tabH = 10;
        return (
          <g key={i}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              {/* File tab motif */}
              <rect
                x={r.x + 12}
                y={r.y - tabH + 2}
                width={tabW}
                height={tabH}
                rx={3}
                fill={toneColors[tone].top}
                stroke={toneColors[tone].stroke}
                strokeWidth={1}
              />
              <rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#m18-pkt-tone-${uid}-${tone})`}
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
                fontSize={typography.stepLabel.compact}
                fontWeight="700"
                fill="white"
              >
                {step.label}
              </text>
              <text
                x={cx}
                y={r.y + 40}
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
                x={r.x}
                y={r.y - tabH}
                width={r.w}
                height={r.h + tabH}
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
