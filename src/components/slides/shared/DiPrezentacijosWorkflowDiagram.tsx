/**
 * DI prezentacijos workflow diagrama – 5 žingsnių tiesinė schema.
 * Tekstai iš getDiPrezentacijosSteps / getDiPrezentacijosDiagramContent(locale).
 */
import { useId } from 'react';
import type { Locale } from './diPrezentacijosWorkflowConfig';
import { getDiPrezentacijosDiagramContent, getDiPrezentacijosSteps } from './diPrezentacijosWorkflowConfig';

const VIEWBOX = '0 0 560 520';
const STEP_ACTIVE_OPACITY = 1;
const STEP_INACTIVE_OPACITY = 0.5;

const BOX_H = 56;
const GAP = 28;
const COLS_X = 140;
const COLS_W = 280;
const CX = 280;

const STEP_BOXES: [number, number, number, number][] = [
  [COLS_X, 72, COLS_W, BOX_H],
  [COLS_X, 72 + (BOX_H + GAP) * 1, COLS_W, BOX_H],
  [COLS_X, 72 + (BOX_H + GAP) * 2, COLS_W, BOX_H],
  [COLS_X, 72 + (BOX_H + GAP) * 3, COLS_W, BOX_H],
  [COLS_X, 72 + (BOX_H + GAP) * 4, COLS_W, BOX_H],
];

interface DiPrezentacijosWorkflowDiagramProps {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  locale?: Locale;
  className?: string;
}

export default function DiPrezentacijosWorkflowDiagram({
  currentStep = 0,
  onStepClick,
  locale = 'lt',
  className = '',
}: DiPrezentacijosWorkflowDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const isInteractive = typeof onStepClick === 'function';
  const steps = getDiPrezentacijosSteps(locale);
  const content = getDiPrezentacijosDiagramContent(locale);

  return (
    <svg
      viewBox={VIEWBOX}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={`${content.ariaLabel}${isInteractive ? content.interactiveHint : ''}`}
    >
      <defs>
        <linearGradient id={`di-prez-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f4f8" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <marker id={`di-prez-arrow-${uid}`} markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#334e68" stroke="#334e68" strokeWidth="0.5" />
        </marker>
        <linearGradient id={`di-prez-step-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#486581" />
          <stop offset="100%" stopColor="#334e68" />
        </linearGradient>
      </defs>

      <rect width="560" height="520" fill={`url(#di-prez-bg-${uid})`} rx="12" />
      <rect width="560" height="520" fill="none" stroke="#bcccdc" strokeWidth="1" rx="12" />

      <text x={CX} y="36" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="20" fontWeight="800" fill="#102a43">
        {content.title}
      </text>
      <text x={CX} y="56" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="13" fontWeight="500" fill="#334e68">
        {content.subtitle}
      </text>

      {STEP_BOXES.map((box, i) => {
        const isActive = currentStep === i;
        const opacity = isActive ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY;
        return (
          <g key={i}>
            <g opacity={opacity} style={{ transition: 'opacity 0.2s ease' }} aria-hidden>
              <rect
                x={box[0]}
                y={box[1]}
                width={box[2]}
                height={box[3]}
                rx="12"
                fill={`url(#di-prez-step-${uid})`}
                stroke={isActive ? '#102a43' : '#334e68'}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <text x={CX} y={box[1] + 24} textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="14" fontWeight="700" fill="white">
                {i + 1} · {steps[i].label}
              </text>
              <text x={CX} y={box[1] + 44} textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="rgba(255,255,255,0.9)">
                {steps[i].desc}
              </text>
            </g>
            {isInteractive && (
              <rect
                x={box[0]}
                y={box[1]}
                width={box[2]}
                height={box[3]}
                rx="12"
                fill="transparent"
                cursor="pointer"
                onClick={() => onStepClick(i)}
                aria-label={content.stepAria(i, steps[i].label)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onStepClick(i);
                  }
                }}
              />
            )}
            {i < STEP_BOXES.length - 1 && (
              <line
                x1={CX}
                y1={box[1] + box[3]}
                x2={CX}
                y2={STEP_BOXES[i + 1][1] - ARROW_MARKER_LEN}
                stroke="#334e68"
                strokeWidth="2"
                markerEnd={`url(#di-prez-arrow-${uid})`}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
