/**
 * Modulio 7 – duomenų istorijos ciklas (interaktyvu).
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM7DataStoryCycleSteps, type M7Locale } from './m7DiagramContent';

const STEP_COUNT = 5;
const ARROW_MARKER_LEN = 8;

const DESKTOP_VIEWBOX_W = 640;
const DESKTOP_VIEWBOX_H = 280;
const DESKTOP_BOX_W = 108;
const DESKTOP_BOX_H = 72;
const DESKTOP_GAP = 16;
const DESKTOP_START_X =
  (DESKTOP_VIEWBOX_W - (DESKTOP_BOX_W * STEP_COUNT + DESKTOP_GAP * 4)) / 2;
const DESKTOP_ROW_Y = 112;

const COMPACT_VIEWBOX_W = 320;
const COMPACT_VIEWBOX_H = 430;
const COMPACT_BOX_W = 240;
const COMPACT_BOX_H = 54;
const COMPACT_GAP = 14;
const COMPACT_START_X = 40;
const COMPACT_START_Y = 74;

function getDesktopBoxes(): [number, number, number, number][] {
  return Array.from(
    { length: STEP_COUNT },
    (_, i) =>
      [
        DESKTOP_START_X + (DESKTOP_BOX_W + DESKTOP_GAP) * i,
        DESKTOP_ROW_Y,
        DESKTOP_BOX_W,
        DESKTOP_BOX_H,
      ] as [number, number, number, number]
  );
}

function getCompactBoxes(): [number, number, number, number][] {
  return Array.from(
    { length: STEP_COUNT },
    (_, i) =>
      [
        COMPACT_START_X,
        COMPACT_START_Y + (COMPACT_BOX_H + COMPACT_GAP) * i,
        COMPACT_BOX_W,
        COMPACT_BOX_H,
      ] as [number, number, number, number]
  );
}

export default function M7DataStoryCycleDiagram({
  currentStep = 0,
  onStepClick,
  locale = 'lt',
  className = '',
}: {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  locale?: M7Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const isInteractive = typeof onStepClick === 'function';
  const steps = getM7DataStoryCycleSteps(locale);
  const viewBoxWidth = isCompactDiagram ? COMPACT_VIEWBOX_W : DESKTOP_VIEWBOX_W;
  const viewBoxHeight = isCompactDiagram
    ? COMPACT_VIEWBOX_H
    : DESKTOP_VIEWBOX_H;
  const boxes = isCompactDiagram ? getCompactBoxes() : getDesktopBoxes();
  const cx = viewBoxWidth / 2;

  const title =
    locale === 'en' ? 'Data story cycle' : 'Duomenų istorijos ciklas';
  const hint =
    locale === 'en'
      ? 'Tap a step – explanation below'
      : 'Paspausk žingsnį – paaiškinimas apačioje';
  const ariaIntro =
    locale === 'en'
      ? 'Five-step data story cycle: collection, preparation, visualization, analysis, story.'
      : 'Penkių žingsnių duomenų istorijos ciklas: surinkimas, paruošimas, vizualizacija, analizė, istorija.';

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`${ariaIntro}${isInteractive ? ` ${hint}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`m7-story-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#f0f4f8" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
        <linearGradient
          id={`m7-story-box-${uid}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#486581" />
          <stop offset="100%" stopColor="#334e68" />
        </linearGradient>
        <marker
          id={`m7-story-arrow-${uid}`}
          markerWidth="10"
          markerHeight="8"
          refX="8"
          refY="4"
          orient="auto"
        >
          <path
            d="M0 0 L8 4 L0 8 Z"
            fill="#627d98"
            stroke="#627d98"
            strokeWidth="0.5"
          />
        </marker>
      </defs>

      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill={`url(#m7-story-bg-${uid})`}
        rx="14"
      />
      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill="none"
        stroke="#bcccdc"
        strokeWidth="1"
        rx="14"
      />

      <text
        x={cx}
        y="34"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="18"
        fontWeight="800"
        fill="#102a43"
      >
        {title}
      </text>
      <text
        x={cx}
        y="54"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="11"
        fontWeight="500"
        fill="#334e68"
      >
        {isInteractive ? hint : ''}
      </text>

      {boxes.map((box, i) => {
        const [x, y, w, h] = box;
        const isActive = currentStep === i;
        const step = steps[i];
        const ariaStep =
          locale === 'en'
            ? `Step ${i + 1}: ${step.label}. Press for explanation.`
            : `Žingsnis ${i + 1}: ${step.label}. Paspausk paaiškinimui.`;
        const opacity = isActive ? 1 : 0.5;

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
                rx="12"
                fill={`url(#m7-story-box-${uid})`}
                stroke={isActive ? '#102a43' : '#334e68'}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <text
                x={x + w / 2}
                y={y + (isCompactDiagram ? 22 : 26)}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize={isCompactDiagram ? 11 : 12}
                fontWeight="800"
                fill="white"
              >
                {i + 1}. {step.label}
              </text>
              <text
                x={x + w / 2}
                y={y + (isCompactDiagram ? 40 : 48)}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize={isCompactDiagram ? 9 : 10}
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
              >
                {step.desc}
              </text>
            </g>

            {isInteractive && (
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx="12"
                fill="transparent"
                cursor="pointer"
                onClick={() => onStepClick?.(i)}
                aria-label={ariaStep}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onStepClick?.(i);
                  }
                }}
              />
            )}

            {i < boxes.length - 1 &&
              (isCompactDiagram ? (
                <line
                  x1={x + w / 2}
                  y1={y + h}
                  x2={x + w / 2}
                  y2={boxes[i + 1][1] - ARROW_MARKER_LEN}
                  stroke="#627d98"
                  strokeWidth="2.5"
                  markerEnd={`url(#m7-story-arrow-${uid})`}
                />
              ) : (
                <line
                  x1={x + w}
                  y1={y + h / 2}
                  x2={boxes[i + 1][0] - ARROW_MARKER_LEN}
                  y2={y + h / 2}
                  stroke="#627d98"
                  strokeWidth="2.5"
                  markerEnd={`url(#m7-story-arrow-${uid})`}
                />
              ))}
          </g>
        );
      })}
    </svg>
  );
}
