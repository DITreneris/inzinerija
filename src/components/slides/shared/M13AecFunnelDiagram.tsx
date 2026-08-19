import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { getM13AecLabels } from './m13DiagramContent';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import { getContentTrackColors } from './contentTrackTokens';
import { M13_AEC_TONES } from './contentTrackDiagramTones';
import { DiagramStepHitArea } from './diagramKit';
import type { M10Locale } from './m10DiagramContent';
import {
  funnelHairlineYs,
  funnelOuterOutlinePath,
  funnelStageTrapezoids,
  funnelStageWidths,
} from './funnelStackGeometry';
import {
  AEC_MOTIF_SIZE,
  AEC_MOTIFS,
  aecLabelCluster,
} from './m13AecFunnelMotifs';

const W = 360;
const H = 280;
const BOX_H = 62;
const START_Y = 44;
/** Continuous silhouette (P3) — shared edges + hairlines */
const GAP_Y = 0;
const STAGE_COUNT = 3;
const TOP_W = 300;
const BOTTOM_W = 140;
const HAIRLINE = 1.5;

const STAGE_WIDTHS = funnelStageWidths({
  count: STAGE_COUNT,
  topW: TOP_W,
  bottomW: BOTTOM_W,
});
const STAGE_TRAPEZOIDS = funnelStageTrapezoids({
  viewBoxW: W,
  widths: STAGE_WIDTHS,
  boxH: BOX_H,
  startY: START_Y,
  gapY: GAP_Y,
});
const HAIRLINE_YS = funnelHairlineYs({
  count: STAGE_COUNT,
  boxH: BOX_H,
  startY: START_Y,
  gapY: GAP_Y,
});
const OUTER_OUTLINE = funnelOuterOutlinePath(STAGE_TRAPEZOIDS);

export default function M13AecFunnelDiagram({
  locale = 'lt',
  className = '',
  currentStep = 0,
  onStepClick,
}: {
  locale?: M10Locale;
  className?: string;
  currentStep?: number;
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const L = getM13AecLabels(locale);
  const isInteractive = typeof onStepClick === 'function';
  const cx = W / 2;
  const labels = [L.awareness, L.engagement, L.conversion];
  const isDark = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const toneColors = getDiagramToneColors(isDark);
  const track = getContentTrackColors(isDark);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-lg mx-auto block ${className}`}
      role="img"
      aria-label={`${L.aria}${isInteractive ? ` ${L.hint}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`aec-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={track.softRose} />
        </linearGradient>
        {M13_AEC_TONES.map((tone) => {
          const colors = toneColors[tone];
          return (
            <linearGradient
              key={tone}
              id={`aec-tone-${uid}-${tone}`}
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
        <style>{`
          .aec-funnel-stage-${uid} {
            transition: opacity 0.2s ease, stroke-width 0.2s ease;
          }
          .aec-funnel-ring-${uid} {
            transition: opacity 0.2s ease;
          }
          @media (prefers-reduced-motion: reduce) {
            .aec-funnel-stage-${uid},
            .aec-funnel-ring-${uid} {
              transition: none;
            }
          }
        `}</style>
      </defs>
      <rect
        width={W}
        height={H}
        fill={`url(#aec-bg-${uid})`}
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
        y={26}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>
      {STAGE_TRAPEZOIDS.map((stage, i) => {
        const tone = M13_AEC_TONES[i];
        const isActive = currentStep === i;
        const opacity = isInteractive
          ? isActive
            ? DIAGRAM_TOKENS.opacity.active
            : DIAGRAM_TOKENS.opacity.inactive
          : 1 - i * 0.08;
        const cluster = aecLabelCluster({ cx, label: labels[i] });
        const motif = AEC_MOTIFS[i];
        const iconScale = AEC_MOTIF_SIZE / 16;
        return (
          <g key={i}>
            <g
              className={`aec-funnel-stage-${uid}`}
              opacity={opacity}
              aria-hidden
            >
              <path
                d={stage.d}
                fill={`url(#aec-tone-${uid}-${tone})`}
                stroke={isActive ? palette.brandDark : toneColors[tone].stroke}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              {isActive && stage.ringD && (
                <path
                  className={`aec-funnel-ring-${uid}`}
                  d={stage.ringD}
                  fill="none"
                  stroke={palette.whiteText}
                  strokeWidth={DIAGRAM_TOKENS.stroke.active}
                  opacity={0.95}
                />
              )}
              <path
                d={motif}
                fill="white"
                fillRule="evenodd"
                transform={`translate(${cluster.iconX}, ${stage.labelY - AEC_MOTIF_SIZE / 2}) scale(${iconScale})`}
              />
              <text
                x={cluster.textX}
                y={stage.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={DIAGRAM_TOKENS.typography.stepLabel.desktop}
                fontWeight="700"
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {labels[i]}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={stage.hit.x}
                y={stage.hit.y}
                width={stage.hit.w}
                height={stage.hit.h}
                radius={DIAGRAM_TOKENS.radius.box}
                onActivate={() => onStepClick?.(i)}
              />
            )}
          </g>
        );
      })}
      {HAIRLINE_YS.map((y, i) => {
        const w = STAGE_WIDTHS[i + 1] ?? STAGE_WIDTHS[i];
        const x = (W - w) / 2;
        return (
          <line
            key={`hl-${i}`}
            x1={x}
            y1={y}
            x2={x + w}
            y2={y}
            stroke={palette.bgStart}
            strokeWidth={HAIRLINE}
            opacity={0.9}
            aria-hidden
          />
        );
      })}
      {OUTER_OUTLINE && (
        <path
          d={OUTER_OUTLINE}
          fill="none"
          stroke={palette.border}
          strokeWidth={DIAGRAM_TOKENS.stroke.border}
          aria-hidden
        />
      )}
      <text
        x={cx}
        y={H - 14}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.subtitle.desktop}
        fill={palette.muted}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.hint}
      </text>
    </svg>
  );
}
