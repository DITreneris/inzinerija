/**
 * Modulio 7 – 4 analizės tipai (2×2, interaktyvu).
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM7AnalysisShortLabels, type M7Locale } from './m7DiagramContent';

const BOX_W = 200;
const BOX_H = 100;
const GAP = 24;

function boxesForGrid(compact: boolean): [number, number, number, number][] {
  const bw = compact ? 132 : BOX_W;
  const bh = compact ? 88 : BOX_H;
  const g = compact ? 14 : GAP;
  const x0 = compact ? 20 : 48;
  const y0 = compact ? 72 : 88;
  return [
    [x0, y0, bw, bh],
    [x0 + bw + g, y0, bw, bh],
    [x0, y0 + bh + g, bw, bh],
    [x0 + bw + g, y0 + bh + g, bw, bh],
  ];
}

export default function M7AnalysisTypesDiagram({
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
  const labels = getM7AnalysisShortLabels(locale);
  const stepBoxes = boxesForGrid(isCompactDiagram);
  const viewW = isCompactDiagram ? 320 : 520;
  const viewH = isCompactDiagram ? 340 : 380;
  const cx = viewW / 2;

  const title =
    locale === 'en' ? 'Four analysis types' : 'Keturi analizės tipai';
  const hint =
    locale === 'en'
      ? 'Tap a cell – explanation below'
      : 'Paspausk langelį – paaiškinimas apačioje';
  const ariaIntro =
    locale === 'en'
      ? 'Four business analysis types: descriptive, diagnostic, predictive, prescriptive.'
      : 'Keturi verslo analizės tipai: aprašomoji, diagnostinė, nuspėjamoji, nurodomoji.';

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={`${ariaIntro}${isInteractive ? ` ${hint}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`m7-an-box-${uid}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#486581" />
          <stop offset="100%" stopColor="#334e68" />
        </linearGradient>
      </defs>

      <rect width={viewW} height={viewH} fill="#f0f4f8" rx="12" />
      <rect
        width={viewW}
        height={viewH}
        fill="none"
        stroke="#bcccdc"
        strokeWidth="1"
        rx="12"
      />

      <text
        x={cx}
        y="32"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="16"
        fontWeight="800"
        fill="#102a43"
      >
        {title}
      </text>
      <text
        x={cx}
        y="50"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="10"
        fontWeight="500"
        fill="#334e68"
      >
        {isInteractive ? hint : ''}
      </text>

      {stepBoxes.map((box, i) => {
        const isActive = currentStep === i;
        const opacity = isActive ? 1 : 0.5;
        const lb = labels[i];
        const ariaStep =
          locale === 'en'
            ? `${lb.title}: ${lb.sub}. Press for explanation.`
            : `${lb.title}: ${lb.sub}. Paspausk paaiškinimui.`;

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
                fill={`url(#m7-an-box-${uid})`}
                stroke={isActive ? '#102a43' : '#334e68'}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <text
                x={box[0] + box[2] / 2}
                y={box[1] + 28}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize={isCompactDiagram ? 10 : 12}
                fontWeight="700"
                fill="white"
              >
                {lb.title}
              </text>
              <text
                x={box[0] + box[2] / 2}
                y={box[1] + 46}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize={isCompactDiagram ? 9 : 10}
                fontWeight="500"
                fill="rgba(255,255,255,0.92)"
              >
                {lb.sub}
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
          </g>
        );
      })}
    </svg>
  );
}
