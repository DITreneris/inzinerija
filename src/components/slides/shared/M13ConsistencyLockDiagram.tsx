/**
 * Modulio 13 – character/product consistency (4 žingsniai) with lock-artifact (S4-INDIV).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import {
  getM13ConsistencyLockChrome,
  getM13ConsistencyLockSteps,
} from './m13ConsistencyLockContent';
import type { M10Locale } from './m10DiagramContent';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import { getContentTrackColors } from './contentTrackTokens';
import { M13_CONSISTENCY_LOCK_TONES } from './contentTrackDiagramTones';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import { DiagramStepHitArea } from './diagramKit';
import {
  getVerticalFlowConnector,
  resolveVerticalFlowGeometry,
  VERTICAL_FLOW_MIN_GAP,
} from './verticalFlowGeometry';

const STEP_COUNT = 4;
const BOX_H = 52;
const PROCESS_ARROW = getProcessArrowMarkerGeom();
const ARROW_MARKER_LEN = PROCESS_ARROW.tipLen;

/** Geometry SOT – frozen-ref pad + vertical spine (not bare vertical twin). */
export const M13_CONSISTENCY_LOCK_GEOMETRY = {
  metaphor: 'lock-artifact' as const,
  stepCount: STEP_COUNT,
  boxHeight: BOX_H,
  gap: VERTICAL_FLOW_MIN_GAP,
  startY: 74,
  desktop: {
    viewBoxWidth: 560,
    viewBoxHeight: 400,
    colsX: 168,
    colsW: 340,
    cx: 168 + 170,
    artifactX: 28,
    artifactW: 120,
  },
  compact: {
    viewBoxWidth: 320,
    viewBoxHeight: 400,
    colsX: 96,
    colsW: 200,
    cx: 96 + 100,
    artifactX: 12,
    artifactW: 72,
  },
} as const;

const FLOW_GEOMETRY = {
  stepCount: STEP_COUNT,
  boxHeight: BOX_H,
  gap: M13_CONSISTENCY_LOCK_GEOMETRY.gap,
  startY: M13_CONSISTENCY_LOCK_GEOMETRY.startY,
  desktop: {
    viewBoxWidth: M13_CONSISTENCY_LOCK_GEOMETRY.desktop.viewBoxWidth,
    viewBoxHeight: M13_CONSISTENCY_LOCK_GEOMETRY.desktop.viewBoxHeight,
    colsX: M13_CONSISTENCY_LOCK_GEOMETRY.desktop.colsX,
    colsW: M13_CONSISTENCY_LOCK_GEOMETRY.desktop.colsW,
    cx: M13_CONSISTENCY_LOCK_GEOMETRY.desktop.cx,
  },
  compact: {
    viewBoxWidth: M13_CONSISTENCY_LOCK_GEOMETRY.compact.viewBoxWidth,
    viewBoxHeight: M13_CONSISTENCY_LOCK_GEOMETRY.compact.viewBoxHeight,
    colsX: M13_CONSISTENCY_LOCK_GEOMETRY.compact.colsX,
    colsW: M13_CONSISTENCY_LOCK_GEOMETRY.compact.colsW,
    cx: M13_CONSISTENCY_LOCK_GEOMETRY.compact.cx,
  },
};

export default function M13ConsistencyLockDiagram({
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
  const steps = getM13ConsistencyLockSteps(locale);
  const chrome = getM13ConsistencyLockChrome(locale);
  const { viewBoxWidth, viewBoxHeight, cx, stepBoxes } =
    resolveVerticalFlowGeometry(FLOW_GEOMETRY, isCompactDiagram);
  const artifact = isCompactDiagram
    ? M13_CONSISTENCY_LOCK_GEOMETRY.compact
    : M13_CONSISTENCY_LOCK_GEOMETRY.desktop;
  const typography = DIAGRAM_TOKENS.typography;
  const uniqueTones = [...new Set(M13_CONSISTENCY_LOCK_TONES)];
  const firstBox = stepBoxes[0]!;
  const lastBox = stepBoxes[stepBoxes.length - 1]!;
  const artifactY = firstBox[1];
  const artifactH = lastBox[1] + lastBox[3] - firstBox[1];

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-4xl mx-auto block ${className}`}
      role="img"
      aria-label={`${chrome.aria}${isInteractive ? ` ${chrome.hint}` : ''}`}
      data-metaphor={M13_CONSISTENCY_LOCK_GEOMETRY.metaphor}
    >
      <defs>
        <linearGradient
          id={`m13-cons-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={track.softRose} />
        </linearGradient>
        <marker
          id={`m13-cons-arrow-${uid}`}
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
              id={`m13-cons-tone-${uid}-${tone}`}
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
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill={`url(#m13-cons-bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill="none"
        stroke={palette.border}
        strokeWidth={DIAGRAM_TOKENS.stroke.border}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <text
        x={viewBoxWidth / 2}
        y="34"
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
        x={viewBoxWidth / 2}
        y="52"
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

      {/* Frozen-ref artifact pad (lock metaphor) */}
      <g data-lock-artifact="true" aria-hidden>
        <rect
          x={artifact.artifactX}
          y={artifactY}
          width={artifact.artifactW}
          height={artifactH}
          rx={DIAGRAM_TOKENS.radius.box}
          fill={toneColors.amber.soft}
          stroke={toneColors.amber.stroke}
          strokeWidth={DIAGRAM_TOKENS.stroke.inactive}
          strokeDasharray="5 3"
        />
        {/* Stacked ref cards */}
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            data-ref-card={i}
            x={artifact.artifactX + 12 + i * 4}
            y={artifactY + 28 + i * 10}
            width={artifact.artifactW - 32}
            height={isCompactDiagram ? 28 : 36}
            rx={4}
            fill={palette.bgEnd}
            stroke={palette.brand}
            strokeWidth={1}
          />
        ))}
        {/* Padlock badge */}
        <g
          transform={`translate(${artifact.artifactX + artifact.artifactW / 2} ${
            artifactY + artifactH - (isCompactDiagram ? 28 : 36)
          })`}
        >
          <circle
            r={isCompactDiagram ? 12 : 14}
            fill={DIAGRAM_TOKENS.colors.amber}
            stroke={palette.brandDark}
            strokeWidth={1.5}
          />
          <path
            d="M -5 -2 v -4 a 5 5 0 0 1 10 0 v 4"
            fill="none"
            stroke={palette.brandDark}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect
            x={-6}
            y={-2}
            width={12}
            height={10}
            rx={2}
            fill={palette.brandDark}
          />
        </g>
        {!isCompactDiagram && (
          <text
            x={artifact.artifactX + artifact.artifactW / 2}
            y={artifactY + 18}
            textAnchor="middle"
            fontFamily={DIAGRAM_TOKENS.font}
            fontSize={typography.stepSub.desktop}
            fontWeight="700"
            fill={palette.brandDark}
          >
            {locale === 'en' ? 'Frozen refs' : 'Užrakinti refs'}
          </text>
        )}
      </g>

      {stepBoxes.map((box, i) => {
        const [x, y, w, h] = box;
        const tone = M13_CONSISTENCY_LOCK_TONES[i];
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
                x={x}
                y={y}
                width={w}
                height={h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#m13-cons-tone-${uid}-${tone})`}
                stroke={isActive ? palette.brandDark : toneColors[tone].stroke}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={y + 19}
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
                x={cx}
                y={y + 36}
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
                const conn = getVerticalFlowConnector(
                  box,
                  stepBoxes[i + 1],
                  cx,
                  ARROW_MARKER_LEN
                );
                return (
                  <line
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    stroke={palette.flow}
                    strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
                    markerEnd={`url(#m13-cons-arrow-${uid})`}
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
