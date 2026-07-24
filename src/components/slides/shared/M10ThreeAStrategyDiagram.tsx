/**
 * M10 – 3A strategija: horizontal 100% stacked bar (80 / 15 / 5)
 * + vertical legend (dot + TITLE pct + sub).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import { getM10ThreeALabels, type M10Locale } from './m10DiagramContent';
import {
  getThreeAHitRects,
  getThreeALegendItems,
  getThreeASegmentRects,
  M10_THREE_A_LAYOUT,
} from './m10ThreeAStrategyLayout';

const INNER_PCT_MIN_W = 72;

export default function M10ThreeAStrategyDiagram({
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
  const isDarkPalette = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const tones = getDiagramToneColors(isDarkPalette);
  const L = getM10ThreeALabels(locale);
  const isInteractive = typeof onStepClick === 'function';
  const { viewBoxW: W, viewBoxH: H } = M10_THREE_A_LAYOUT;
  const segments = getThreeASegmentRects();
  const legend = getThreeALegendItems();
  const hits = getThreeAHitRects();

  const toneFills = [
    tones.brand.bottom,
    tones.emerald.bottom,
    tones.amber.bottom,
  ];

  const rows = [
    {
      title: L.auto,
      pct: L.autoPct,
      sub: L.autoSub,
      fill: `url(#m10-3a-a-${uid})`,
    },
    {
      title: L.aug,
      pct: L.augPct,
      sub: L.augSub,
      fill: `url(#m10-3a-b-${uid})`,
    },
    {
      title: L.auton,
      pct: L.autonPct,
      sub: L.autonSub,
      fill: `url(#m10-3a-c-${uid})`,
    },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`${L.aria}${isInteractive ? ` ${L.hint}` : ''}`}
    >
      <defs>
        <linearGradient id={`m10-3a-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <linearGradient id={`m10-3a-a-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={tones.brand.top} />
          <stop offset="100%" stopColor={tones.brand.bottom} />
        </linearGradient>
        <linearGradient id={`m10-3a-b-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={tones.emerald.top} />
          <stop offset="100%" stopColor={tones.emerald.bottom} />
        </linearGradient>
        <linearGradient id={`m10-3a-c-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={tones.amber.top} />
          <stop offset="100%" stopColor={tones.amber.bottom} />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width={W}
        height={H}
        rx={DIAGRAM_TOKENS.radius.frame}
        fill={`url(#m10-3a-bg-${uid})`}
      />
      <rect
        x="0"
        y="0"
        width={W}
        height={H}
        rx={DIAGRAM_TOKENS.radius.frame}
        fill="none"
        stroke={palette.border}
        strokeWidth={DIAGRAM_TOKENS.stroke.border}
      />
      {rows.map((r, i) => {
        const seg = segments[i];
        const hit = hits[i];
        const isActive = currentStep === i;
        const opacity = isInteractive
          ? isActive
            ? DIAGRAM_TOKENS.opacity.active
            : DIAGRAM_TOKENS.opacity.inactive
          : 1;
        const cx = seg.x + seg.w / 2;
        const showInnerPct = seg.w >= INNER_PCT_MIN_W;
        return (
          <g key={`seg-${i}`}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={seg.x}
                y={seg.y}
                width={seg.w}
                height={seg.h}
                rx={i === 0 ? DIAGRAM_TOKENS.radius.box : 4}
                fill={r.fill}
                stroke={isActive ? palette.brandDark : palette.brand}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              {showInnerPct && (
                <text
                  x={cx}
                  y={seg.y + seg.h / 2 + 4}
                  textAnchor="middle"
                  fill={palette.whiteText}
                  fontSize={DIAGRAM_TOKENS.typography.stepLabel.desktop}
                  fontWeight="700"
                  fontFamily={DIAGRAM_TOKENS.font}
                >
                  {r.pct}
                </text>
              )}
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={hit.x}
                y={hit.y}
                width={hit.w}
                height={hit.h}
                radius={DIAGRAM_TOKENS.radius.box}
                onActivate={() => onStepClick?.(i)}
              />
            )}
          </g>
        );
      })}
      {legend.map((item, i) => {
        const r = rows[i];
        const isActive = currentStep === i;
        const dot = toneFills[item.toneIndex];
        const titleFill = isActive ? palette.brandDark : palette.muted;
        const subFill = palette.muted;
        const rowOpacity = isInteractive
          ? isActive
            ? DIAGRAM_TOKENS.opacity.active
            : DIAGRAM_TOKENS.opacity.inactive
          : 1;
        const titleX = item.x + 14;
        const subX = item.x + 168;
        return (
          <g key={`leg-${i}`} opacity={rowOpacity} aria-hidden>
            <circle cx={item.x + 4} cy={item.y - 3} r={4} fill={dot} />
            <text
              x={titleX}
              y={item.y}
              textAnchor="start"
              fill={titleFill}
              fontSize={DIAGRAM_TOKENS.typography.stepLabel.desktop}
              fontWeight={isActive ? 700 : 600}
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {r.title} {r.pct}
            </text>
            <text
              x={subX}
              y={item.y}
              textAnchor="start"
              fill={subFill}
              fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop}
              fontWeight={500}
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {r.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
