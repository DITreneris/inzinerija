/**
 * Modulio 7 – 5 žingsnių duomenų paruošimo seka (interaktyvi).
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM7DataPrepSteps, type M7Locale } from './m7DiagramContent';

const BOX_H = 46;
const GAP = 14;
const ARROW_MARKER_LEN = 6;
const STEP_COUNT = 5;

const DESKTOP_VIEWBOX_W = 520;
const DESKTOP_VIEWBOX_H = 430;
const DESKTOP_COLS_X = 60;
const DESKTOP_COLS_W = 400;
const DESKTOP_CX = 260;

const COMPACT_VIEWBOX_W = 300;
const COMPACT_VIEWBOX_H = 430;
const COMPACT_COLS_X = 22;
const COMPACT_COLS_W = 256;
const COMPACT_CX = 150;

function getStepBoxes(
  colsX: number,
  colsW: number,
  count: number
): [number, number, number, number][] {
  const startY = 72;
  return Array.from(
    { length: count },
    (_, i) =>
      [colsX, startY + (BOX_H + GAP) * i, colsW, BOX_H] as [
        number,
        number,
        number,
        number,
      ]
  );
}

export default function M7DataPrepWorkflowDiagram({
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
  const stepsMeta = getM7DataPrepSteps(locale);
  const viewBoxWidth = isCompactDiagram ? COMPACT_VIEWBOX_W : DESKTOP_VIEWBOX_W;
  const viewBoxHeight = isCompactDiagram
    ? COMPACT_VIEWBOX_H
    : DESKTOP_VIEWBOX_H;
  const cx = isCompactDiagram ? COMPACT_CX : DESKTOP_CX;
  const stepBoxes = isCompactDiagram
    ? getStepBoxes(COMPACT_COLS_X, COMPACT_COLS_W, STEP_COUNT)
    : getStepBoxes(DESKTOP_COLS_X, DESKTOP_COLS_W, STEP_COUNT);

  const title =
    locale === 'en'
      ? 'Five-step data prep'
      : 'Penki žingsniai duomenų paruošimui';
  const hint =
    locale === 'en'
      ? 'Tap a step – explanation below'
      : 'Paspausk žingsnį – paaiškinimas apačioje';
  const ariaIntro =
    locale === 'en'
      ? 'Five steps: sources, structure, collect, cleaning, export.'
      : 'Penki žingsniai: šaltiniai, struktūra, surinkimas, valymas, eksportas.';

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={`${ariaIntro}${isInteractive ? ` ${hint}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`m7-prep-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#f0f4f8" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <marker
          id={`m7-prep-arrow-${uid}`}
          markerWidth="8"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path
            d="M0 0 L6 3 L0 6 Z"
            fill="#334e68"
            stroke="#334e68"
            strokeWidth="0.5"
          />
        </marker>
        <linearGradient
          id={`m7-prep-step-${uid}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#486581" />
          <stop offset="100%" stopColor="#334e68" />
        </linearGradient>
      </defs>

      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill={`url(#m7-prep-bg-${uid})`}
        rx="12"
      />
      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill="none"
        stroke="#bcccdc"
        strokeWidth="1"
        rx="12"
      />

      <text
        x={cx}
        y="34"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="17"
        fontWeight="800"
        fill="#102a43"
      >
        {title}
      </text>
      <text
        x={cx}
        y="52"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="11"
        fontWeight="500"
        fill="#334e68"
      >
        {isInteractive ? hint : ''}
      </text>

      {stepBoxes.map((box, i) => {
        const isActive = currentStep === i;
        const opacity = isActive ? 1 : 0.48;
        const st = stepsMeta[i];
        const stepLabel = `${i + 1} · ${st.label}`;
        const ariaStep =
          locale === 'en'
            ? `Step ${i + 1}: ${st.label}. Press for explanation.`
            : `Žingsnis ${i + 1}: ${st.label}. Paspausk paaiškinimui.`;

        return (
          <g key={i}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={box[0]}
                y={box[1]}
                width={box[2]}
                height={box[3]}
                rx="10"
                fill={`url(#m7-prep-step-${uid})`}
                stroke={isActive ? '#102a43' : '#334e68'}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <text
                x={cx}
                y={box[1] + 19}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize="12"
                fontWeight="700"
                fill="white"
              >
                {stepLabel}
              </text>
              <text
                x={cx}
                y={box[1] + 36}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
              >
                {st.desc}
              </text>
            </g>
            {isInteractive && (
              <rect
                x={box[0]}
                y={box[1]}
                width={box[2]}
                height={box[3]}
                rx="10"
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
            {i < stepBoxes.length - 1 && (
              <line
                x1={cx}
                y1={box[1] + box[3]}
                x2={cx}
                y2={stepBoxes[i + 1][1] - ARROW_MARKER_LEN}
                stroke="#334e68"
                strokeWidth="2"
                markerEnd={`url(#m7-prep-arrow-${uid})`}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
