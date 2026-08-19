/**
 * Modulio 13 – post-production (4 žingsniai) as horizontal timeline (S4-INDIV).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import {
  getM13PostprodChrome,
  getM13PostprodSteps,
} from './m13PostprodContent';
import type { M10Locale } from './m10DiagramContent';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import { getContentTrackColors } from './contentTrackTokens';
import { M13_POSTPROD_TONES } from './contentTrackDiagramTones';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import { DiagramStepHitArea } from './diagramKit';

const STEP_COUNT = 4;
const PROCESS_ARROW = getProcessArrowMarkerGeom();

/** Geometry SOT – individuality tests assert metaphor ≠ vertical twin. */
export const M13_POSTPROD_GEOMETRY = {
  metaphor: 'timeline',
  stepCount: STEP_COUNT,
  desktop: { viewBoxW: 560, viewBoxH: 220, padX: 20, boxH: 72, railY: 168 },
  compact: { viewBoxW: 320, viewBoxH: 200, padX: 10, boxH: 64, railY: 152 },
} as const;

function timelineBoxes(
  viewBoxW: number,
  padX: number,
  boxH: number,
  startY: number
): Array<[number, number, number, number]> {
  const gap = 10;
  const inner = viewBoxW - padX * 2;
  const boxW = (inner - gap * (STEP_COUNT - 1)) / STEP_COUNT;
  return Array.from({ length: STEP_COUNT }, (_, i) => {
    const x = padX + i * (boxW + gap);
    return [x, startY, boxW, boxH] as [number, number, number, number];
  });
}

export default function M13PostprodDiagram({
  currentStep = 0,
  onStepClick,
  locale = 'lt',
  className = '',
}: {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const isDark = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const toneColors = getDiagramToneColors(isDark);
  const track = getContentTrackColors(isDark);
  const isInteractive = typeof onStepClick === 'function';
  const steps = getM13PostprodSteps(locale);
  const chrome = getM13PostprodChrome(locale);
  const layout = isCompactDiagram
    ? M13_POSTPROD_GEOMETRY.compact
    : M13_POSTPROD_GEOMETRY.desktop;
  const { viewBoxW, viewBoxH, padX, boxH, railY } = layout;
  const startY = 58;
  const stepBoxes = timelineBoxes(viewBoxW, padX, boxH, startY);
  const typography = DIAGRAM_TOKENS.typography;
  const uniqueTones = [...new Set(M13_POSTPROD_TONES)];
  const cx = viewBoxW / 2;

  return (
    <svg
      viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
      className={`w-full max-w-4xl mx-auto block ${className}`}
      role="img"
      aria-label={`${chrome.aria}${isInteractive ? ` ${chrome.hint}` : ''}`}
      data-metaphor={M13_POSTPROD_GEOMETRY.metaphor}
    >
      <defs>
        <linearGradient
          id={`m13-pp-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={track.softRose} />
        </linearGradient>
        <marker
          id={`m13-pp-arrow-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path
            d={PROCESS_ARROW.pathD}
            fill={palette.flow}
            stroke={palette.flow}
            strokeWidth="0.5"
          />
        </marker>
        {uniqueTones.map((tone) => {
          const colors = toneColors[tone];
          return (
            <linearGradient
              key={tone}
              id={`m13-pp-tone-${uid}-${tone}`}
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
      </defs>
      <rect
        width={viewBoxW}
        height={viewBoxH}
        fill={`url(#m13-pp-bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <rect
        width={viewBoxW}
        height={viewBoxH}
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
        fontSize={
          isCompactDiagram ? typography.title.compact : typography.title.desktop
        }
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
      >
        {chrome.title}
      </text>
      <text
        x={cx}
        y="46"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={
          isCompactDiagram
            ? typography.subtitle.compact
            : typography.subtitle.desktop
        }
        fontWeight="500"
        fill={palette.muted}
      >
        {chrome.metaphorCaption}
      </text>
      {/* Timeline rail under steps */}
      <line
        data-timeline-rail="true"
        x1={padX}
        y1={railY}
        x2={viewBoxW - padX}
        y2={railY}
        stroke={palette.flow}
        strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
        strokeLinecap="round"
        aria-hidden
      />
      {stepBoxes.map((box, i) => {
        const [x, y, w, h] = box;
        const tone = M13_POSTPROD_TONES[i];
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const step = steps[i];
        const boxCx = x + w / 2;
        return (
          <g key={i} data-timeline-step={i}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#m13-pp-tone-${uid}-${tone})`}
                stroke={isActive ? palette.brandDark : toneColors[tone].stroke}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={boxCx}
                y={y + (isCompactDiagram ? 22 : 26)}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? typography.stepLabel.compact
                    : typography.stepLabel.desktop
                }
                fontWeight="700"
                fill="white"
              >
                {i + 1} · {step.label}
              </text>
              <text
                x={boxCx}
                y={y + (isCompactDiagram ? 42 : 48)}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? typography.stepSub.compact
                    : typography.stepSub.desktop
                }
                fontWeight="500"
                fill={palette.whiteText}
              >
                {step.desc}
              </text>
              {/* Tick from box to rail */}
              <line
                x1={boxCx}
                y1={y + h}
                x2={boxCx}
                y2={railY}
                stroke={palette.flow}
                strokeWidth={1.5}
              />
              <circle
                cx={boxCx}
                cy={railY}
                r={4}
                fill={
                  isActive ? palette.brandDark : DIAGRAM_TOKENS.colors.amber
                }
              />
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={x}
                y={y}
                width={w}
                height={h}
                radius={DIAGRAM_TOKENS.radius.box}
                onActivate={() => onStepClick?.(i)}
              />
            )}
            {i < stepBoxes.length - 1 &&
              (() => {
                const next = stepBoxes[i + 1]!;
                const yMid = y + h / 2;
                const x1 = x + w + 2;
                const x2 = next[0] - PROCESS_ARROW.tipLen - 2;
                if (x2 <= x1) return null;
                return (
                  <line
                    x1={x1}
                    y1={yMid}
                    x2={x2}
                    y2={yMid}
                    stroke={palette.flow}
                    strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
                    markerEnd={`url(#m13-pp-arrow-${uid})`}
                    aria-hidden
                  />
                );
              })()}
          </g>
        );
      })}
    </svg>
  );
}
