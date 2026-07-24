import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import { getM13PromptStackLabels } from './m13DiagramContent';
import type { M10Locale } from './m10DiagramContent';
import {
  FUNNEL_STACK_ETALON_GAP,
  stackColumnRects,
} from './funnelStackGeometry';

const W = 320;
const H = 300;
const BOX_H = 60;
const GAP = FUNNEL_STACK_ETALON_GAP;
const START_Y = 44;
const BOX_W = 260;
const STEP_COUNT = 3;

const STAGE_RECTS = stackColumnRects({
  viewBoxW: W,
  boxW: BOX_W,
  boxH: BOX_H,
  count: STEP_COUNT,
  startY: START_Y,
  gap: GAP,
});

export default function M13PromptStackDiagram({
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
  const L = getM13PromptStackLabels(locale);
  const isInteractive = typeof onStepClick === 'function';
  const cx = W / 2;

  const rows = [
    { title: L.obj, sub: L.objSub },
    { title: L.ctx, sub: L.ctxSub },
    { title: L.est, sub: L.estSub },
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
          id={`pst-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <linearGradient id={`pst-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.brandTop} />
          <stop offset="100%" stopColor={palette.brand} />
        </linearGradient>
      </defs>
      <rect
        width={W}
        height={H}
        fill={`url(#pst-bg-${uid})`}
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
        y={28}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>
      {rows.map((r, i) => {
        const box = STAGE_RECTS[i];
        const isActive = currentStep === i;
        const opacity = isInteractive
          ? isActive
            ? DIAGRAM_TOKENS.opacity.active
            : DIAGRAM_TOKENS.opacity.inactive
          : 1 - i * 0.06;
        return (
          <g key={i}>
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
                fill={`url(#pst-${uid})`}
                stroke={isActive ? palette.brandDark : palette.brand}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={box.y + 24}
                textAnchor="middle"
                fill="white"
                fontSize={DIAGRAM_TOKENS.typography.stepLabel.desktop}
                fontWeight="700"
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {r.title}
              </text>
              <text
                x={cx}
                y={box.y + 44}
                textAnchor="middle"
                fill={palette.whiteText}
                fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop}
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {r.sub}
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
