/**
 * Turinio inžinerijos workflow diagrama – 7 žingsnių nuo brief iki optimizacijos.
 * Interaktyvus: currentStep, onStepClick – paspaudus žingsnį, rodomas paaiškinimas apačioje.
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';

const BOX_H = 48;
const GAP = 20;
const ARROW_MARKER_LEN = 6;
const DESKTOP_VIEWBOX_W = 560;
const DESKTOP_VIEWBOX_H = 620;
const DESKTOP_COLS_X = 80;
const DESKTOP_COLS_W = 400;
const DESKTOP_CX = 280;

const COMPACT_VIEWBOX_W = 320;
const COMPACT_VIEWBOX_H = 620;
const COMPACT_COLS_X = 28;
const COMPACT_COLS_W = 264;
const COMPACT_CX = 160;

function getStepBoxes(
  colsX: number,
  colsW: number
): [number, number, number, number][] {
  return [
    [colsX, 72, colsW, BOX_H],
    [colsX, 72 + (BOX_H + GAP) * 1, colsW, BOX_H],
    [colsX, 72 + (BOX_H + GAP) * 2, colsW, BOX_H],
    [colsX, 72 + (BOX_H + GAP) * 3, colsW, BOX_H],
    [colsX, 72 + (BOX_H + GAP) * 4, colsW, BOX_H],
    [colsX, 72 + (BOX_H + GAP) * 5, colsW, BOX_H],
    [colsX, 72 + (BOX_H + GAP) * 6, colsW, BOX_H],
  ];
}

const STEPS: { label: string; desc: string }[] = [
  { label: 'Brief', desc: 'Kam, tikslas, auditorija' },
  { label: 'Prompt', desc: 'Brand consistency' },
  { label: 'Variantai', desc: '3–5 vaizdų' },
  { label: 'Iteracija', desc: 'Gerinimas pagal atsiliepimus' },
  { label: 'Adaptacija', desc: 'Platformos, formatai' },
  { label: 'Testavimas', desc: 'A/B, KPI' },
  { label: 'Optimizacija', desc: 'Rezultatai → ciklas' },
];

interface TurinioWorkflowDiagramProps {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export default function TurinioWorkflowDiagram({
  currentStep = 0,
  onStepClick,
  className = '',
}: TurinioWorkflowDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const isInteractive = typeof onStepClick === 'function';
  const STEP_ACTIVE_OPACITY = 1;
  const STEP_INACTIVE_OPACITY = 0.5;
  const viewBoxWidth = isCompactDiagram ? COMPACT_VIEWBOX_W : DESKTOP_VIEWBOX_W;
  const viewBoxHeight = isCompactDiagram
    ? COMPACT_VIEWBOX_H
    : DESKTOP_VIEWBOX_H;
  const cx = isCompactDiagram ? COMPACT_CX : DESKTOP_CX;
  const stepBoxes = isCompactDiagram
    ? getStepBoxes(COMPACT_COLS_X, COMPACT_COLS_W)
    : getStepBoxes(DESKTOP_COLS_X, DESKTOP_COLS_W);

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={`Turinio workflow: nuo brief iki optimizacijos.${isInteractive ? ' Paspausk žingsnį, kad pamatytum paaiškinimą.' : ''}`}
    >
      <defs>
        <linearGradient
          id={`tur-wf-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#f0f4f8" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <marker
          id={`tur-wf-arrow-${uid}`}
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
          id={`tur-wf-step-${uid}`}
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
        fill={`url(#tur-wf-bg-${uid})`}
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
        y="36"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="18"
        fontWeight="800"
        fill="#102a43"
      >
        Nuo brief iki publikacijos
      </text>
      <text
        x={cx}
        y="54"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="12"
        fontWeight="500"
        fill="#334e68"
      >
        {isInteractive ? 'Paspausk žingsnį – paaiškinimas apačioje' : ''}
      </text>

      {stepBoxes.map((box, i) => {
        const isActive = currentStep === i;
        const opacity = isActive ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY;
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
                fill={`url(#tur-wf-step-${uid})`}
                stroke={isActive ? '#102a43' : '#334e68'}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <text
                x={cx}
                y={box[1] + 20}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize="13"
                fontWeight="700"
                fill="white"
              >
                {i + 1} · {STEPS[i].label}
              </text>
              <text
                x={cx}
                y={box[1] + 38}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize="11"
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
              >
                {STEPS[i].desc}
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
                aria-label={`Žingsnis ${i + 1}: ${STEPS[i].label}. Paspausk paaiškinimui.`}
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
                markerEnd={`url(#tur-wf-arrow-${uid})`}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
