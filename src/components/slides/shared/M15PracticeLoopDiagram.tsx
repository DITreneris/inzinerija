import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import { DiagramStepHitArea } from './diagramKit';
import {
  getM15PracticeLoopLabels,
  type M15PracticePath,
} from './m15PracticeLoopContent';
import {
  getM15PracticeLoopHorizontalConnector,
  getM15PracticeLoopStepBoxes,
  M15_PRACTICE_LOOP_LAYOUT,
} from './m15PracticeLoopLayout';
import type { M10Locale } from './m10DiagramContent';

const {
  viewBoxWidth: W,
  viewBoxHeight: H,
  boxHeight: BOX_H,
  activeY: ACTIVE_Y,
  accentIndex: ACCENT_INDEX,
} = M15_PRACTICE_LOOP_LAYOUT;

const PROCESS_ARROW = getProcessArrowMarkerGeom();

export default function M15PracticeLoopDiagram({
  locale = 'lt',
  className = '',
  path = 'quick',
  currentStep = 0,
  onStepClick,
}: {
  locale?: M10Locale;
  className?: string;
  path?: M15PracticePath;
  currentStep?: number;
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const L = getM15PracticeLoopLabels(locale);
  const isInteractive = typeof onStepClick === 'function';
  const cx = W / 2;
  const labelsForPath =
    path === 'quick'
      ? [L.brief, L.pick, L.prompt, L.result, L.fix]
      : [L.img, L.vid, L.mus, L.qa, L.done];
  const steps = getM15PracticeLoopStepBoxes(path).map((box, i) => ({
    ...box,
    t: labelsForPath[i],
  }));
  const ghostLabel = path === 'quick' ? L.full : L.quick;
  const accentIndex = ACCENT_INDEX;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-xl mx-auto block ${className}`}
      role="img"
      aria-label={`${L.aria}${isInteractive ? ` ${L.hint}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`m15lp-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m15lp-${uid}`}
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
          id={`m15fb-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path d={PROCESS_ARROW.pathD} fill={DIAGRAM_TOKENS.colors.amber} />
        </marker>
      </defs>
      <rect
        width={W}
        height={H}
        fill={`url(#m15lp-bg-${uid})`}
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
        y={22}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>
      <text
        x={cx}
        y={44}
        textAnchor="middle"
        fontSize="10"
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
        fontWeight={700}
      >
        {path === 'quick' ? L.quick : L.full}
      </text>
      {steps.map((b, i) => {
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const fill =
          i === accentIndex
            ? DIAGRAM_TOKENS.colors.emerald
            : path === 'quick'
              ? palette.brandTop
              : palette.brand;
        return (
          <g key={`${path}-${i}`}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={b.x}
                y={ACTIVE_Y}
                width={b.w}
                height={BOX_H}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={fill}
                stroke={isActive ? palette.brandDark : palette.brand}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={b.x + b.w / 2}
                y={ACTIVE_Y + 25}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="700"
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {b.t}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={b.x}
                y={ACTIVE_Y}
                width={b.w}
                height={BOX_H}
                radius={DIAGRAM_TOKENS.radius.box}
                onActivate={() => onStepClick?.(i)}
              />
            )}
            {i < steps.length - 1 &&
              (() => {
                const conn = getM15PracticeLoopHorizontalConnector(
                  b,
                  steps[i + 1],
                  ACTIVE_Y + BOX_H / 2,
                  DIAGRAM_TOKENS.arrow.processTipLen
                );
                return (
                  <line
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    stroke={palette.flow}
                    strokeWidth={DIAGRAM_TOKENS.stroke.flow}
                    markerEnd={`url(#m15lp-${uid})`}
                    aria-hidden
                  />
                );
              })()}
          </g>
        );
      })}
      {path === 'quick' && (
        <>
          <path
            d="M 548 110 Q 584 146 470 146 Q 300 146 290 110"
            fill="none"
            stroke={DIAGRAM_TOKENS.colors.amber}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            strokeDasharray="5 4"
            markerEnd={`url(#m15fb-${uid})`}
            aria-hidden
          />
          <text
            x={cx}
            y={168}
            textAnchor="middle"
            fontSize="9"
            fill={DIAGRAM_TOKENS.colors.amber}
            fontFamily={DIAGRAM_TOKENS.font}
          >
            {L.repeat}
          </text>
        </>
      )}
      <text
        x={cx}
        y={H - 16}
        textAnchor="middle"
        fontSize="10"
        fill={palette.muted}
        fontFamily={DIAGRAM_TOKENS.font}
        fontWeight={500}
      >
        {ghostLabel}
      </text>
    </svg>
  );
}
