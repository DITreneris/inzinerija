/**
 * M13 13.35 – still-image workflow as desk stations (S4-INDIV).
 * Not a vertical pipeline (13.12) and not a timeline rail (13.52).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import {
  getM13StillWorkflowChrome,
  getM13StillWorkflowSteps,
} from './m13StillWorkflowContent';
import type { M10Locale } from './m10DiagramContent';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import { getContentTrackColors } from './contentTrackTokens';
import { M13_STILL_WORKFLOW_TONES } from './contentTrackDiagramTones';
import { DiagramStepHitArea } from './diagramKit';

const STEP_COUNT = 5;

export const M13_STILL_WORKFLOW_GEOMETRY = {
  metaphor: 'desk-stations' as const,
  stepCount: STEP_COUNT,
  desktop: { viewBoxW: 640, viewBoxH: 260, padX: 28, cardW: 96, cardH: 118 },
  compact: { viewBoxW: 360, viewBoxH: 240, padX: 12, cardW: 56, cardH: 100 },
} as const;

function stationBoxes(
  viewBoxW: number,
  padX: number,
  cardW: number,
  cardH: number,
  deskY: number
): Array<[number, number, number, number]> {
  const inner = viewBoxW - padX * 2;
  const gap = (inner - cardW * STEP_COUNT) / (STEP_COUNT - 1);
  return Array.from({ length: STEP_COUNT }, (_, i) => {
    const x = padX + i * (cardW + gap);
    const y = deskY - cardH;
    return [x, y, cardW, cardH] as [number, number, number, number];
  });
}

export default function M13StillWorkflowDiagram({
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
  const chrome = getM13StillWorkflowChrome(locale);
  const steps = getM13StillWorkflowSteps(locale);
  const geom = isCompactDiagram
    ? M13_STILL_WORKFLOW_GEOMETRY.compact
    : M13_STILL_WORKFLOW_GEOMETRY.desktop;
  const { viewBoxW, viewBoxH, padX, cardW, cardH } = geom;
  const deskY = viewBoxH - 36;
  const stepBoxes = stationBoxes(viewBoxW, padX, cardW, cardH, deskY);
  const isInteractive = typeof onStepClick === 'function';
  const typography = DIAGRAM_TOKENS.typography;
  const uniqueTones = [...new Set(M13_STILL_WORKFLOW_TONES)];
  const cx = viewBoxW / 2;

  return (
    <svg
      viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
      className={`w-full max-w-4xl mx-auto block ${className}`}
      role="img"
      aria-label={`${chrome.aria}${isInteractive ? ` ${chrome.hint}` : ''}`}
      data-metaphor={M13_STILL_WORKFLOW_GEOMETRY.metaphor}
    >
      <defs>
        <linearGradient
          id={`m13-sw-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={track.softRose} />
        </linearGradient>
        {uniqueTones.map((tone) => {
          const colors = toneColors[tone];
          return (
            <linearGradient
              key={tone}
              id={`m13-sw-tone-${uid}-${tone}`}
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
        fill={`url(#m13-sw-bg-${uid})`}
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
        y="26"
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
        y="44"
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
      <rect
        data-desk-plank="true"
        x={padX - 8}
        y={deskY}
        width={viewBoxW - (padX - 8) * 2}
        height={22}
        rx={6}
        fill={isDark ? '#3f3a36' : '#d6cfc7'}
        stroke={palette.border}
        strokeWidth={1}
      />
      {stepBoxes.map((box, i) => {
        const [x, y, w, h] = box;
        const tone = M13_STILL_WORKFLOW_TONES[i];
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const step = steps[i];
        const boxCx = x + w / 2;
        return (
          <g key={i} data-desk-station={i}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={x + 4}
                y={y + 6}
                width={w}
                height={h}
                rx={8}
                fill={palette.border}
                opacity={0.25}
              />
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={8}
                fill={`url(#m13-sw-tone-${uid}-${tone})`}
                stroke={isActive ? palette.brandDark : palette.border}
                strokeWidth={isActive ? 2 : 1}
              />
              <circle cx={boxCx} cy={y + 16} r={9} fill={palette.brandDark} />
              <text
                x={boxCx}
                y={y + 20}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={11}
                fontWeight="700"
                fill={palette.whiteText}
              >
                {i + 1}
              </text>
              <text
                x={boxCx}
                y={y + 48}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? typography.stepLabel.compact
                    : typography.stepLabel.desktop
                }
                fontWeight="700"
                fill={palette.whiteText}
              >
                {step.label}
              </text>
              <text
                x={boxCx}
                y={y + 68}
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
          </g>
        );
      })}
    </svg>
  );
}
