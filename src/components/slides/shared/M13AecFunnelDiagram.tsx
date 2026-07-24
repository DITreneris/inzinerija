import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { getM13AecLabels } from './m13DiagramContent';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import type { M10Locale } from './m10DiagramContent';
import { funnelStageRects, funnelStageWidths } from './funnelStackGeometry';

const W = 360;
const H = 300;
const BOX_H = 58;
const START_Y = 44;
const GAP_Y = 16;
const STAGE_COUNT = 3;
const TOP_W = 300;
const BOTTOM_W = 140;

const STAGE_WIDTHS = funnelStageWidths({
  count: STAGE_COUNT,
  topW: TOP_W,
  bottomW: BOTTOM_W,
});
const STAGE_RECTS = funnelStageRects({
  viewBoxW: W,
  widths: STAGE_WIDTHS,
  boxH: BOX_H,
  startY: START_Y,
  gapY: GAP_Y,
});

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
  const labels = [
    { t: L.awareness, s: L.awarenessSub },
    { t: L.engagement, s: L.engagementSub },
    { t: L.conversion, s: L.conversionSub },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-sm mx-auto block ${className}`}
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
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <linearGradient id={`aec-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.brandTop} />
          <stop offset="100%" stopColor={palette.brand} />
        </linearGradient>
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
      {STAGE_RECTS.map((row, i) => {
        const isActive = currentStep === i;
        const opacity = isInteractive
          ? isActive
            ? DIAGRAM_TOKENS.opacity.active
            : DIAGRAM_TOKENS.opacity.inactive
          : 1 - i * 0.08;
        const label = labels[i];
        return (
          <g key={i}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={row.x}
                y={row.y}
                width={row.w}
                height={row.h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#aec-${uid})`}
                stroke={isActive ? palette.brandDark : palette.brand}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={row.y + 24}
                textAnchor="middle"
                fill="white"
                fontSize={DIAGRAM_TOKENS.typography.stepLabel.desktop}
                fontWeight="700"
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {label.t}
              </text>
              <text
                x={cx}
                y={row.y + 42}
                textAnchor="middle"
                fill={palette.whiteText}
                fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop}
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {label.s}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={row.x}
                y={row.y}
                width={row.w}
                height={row.h}
                radius={DIAGRAM_TOKENS.radius.box}
                onActivate={() => onStepClick?.(i)}
              />
            )}
          </g>
        );
      })}
      <text
        x={cx}
        y={H - 14}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.subtitle.desktop}
        fill={palette.muted}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {isInteractive ? L.hint : L.hint}
      </text>
    </svg>
  );
}
