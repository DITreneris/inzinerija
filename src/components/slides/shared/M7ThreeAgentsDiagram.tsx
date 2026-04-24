/**
 * Modulio 7 – 3 DI agentų tipai (horizontalus srautas).
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM7AgentShortLabels, type M7Locale } from './m7DiagramContent';

const BOX_H = 78;
const GAP = 28;
const ARROW_MARKER_LEN = 6;

export default function M7ThreeAgentsDiagram({
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
  const labels = getM7AgentShortLabels(locale);

  const n = 3;
  const viewW = isCompactDiagram ? 300 : 560;
  const viewH = isCompactDiagram ? 200 : 220;
  const boxW = isCompactDiagram ? 84 : 150;
  const gap = isCompactDiagram ? 12 : GAP;
  const totalW = n * boxW + (n - 1) * gap;
  const startX = (viewW - totalW) / 2;
  const y = isCompactDiagram ? 56 : 64;
  const cxMid = (i: number) => startX + boxW / 2 + i * (boxW + gap);

  const title = locale === 'en' ? 'Three agent roles' : 'Trys agentų rolės';
  const hint =
    locale === 'en'
      ? 'Tap a role – explanation below'
      : 'Paspausk rolę – paaiškinimas apačioje';
  const ariaIntro =
    locale === 'en'
      ? 'Three analysis agent types: Data Research, EDA, Insight.'
      : 'Trys analizės agentų tipai: Data Research, EDA, Insight.';

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={`${ariaIntro}${isInteractive ? ` ${hint}` : ''}`}
    >
      <defs>
        <marker
          id={`m7-ag-arrow-${uid}`}
          markerWidth="10"
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
          id={`m7-ag-box-${uid}`}
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
        x={viewW / 2}
        y="28"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="15"
        fontWeight="800"
        fill="#102a43"
      >
        {title}
      </text>
      <text
        x={viewW / 2}
        y="44"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="10"
        fontWeight="500"
        fill="#334e68"
      >
        {isInteractive ? hint : ''}
      </text>

      {Array.from({ length: n - 1 }, (_, i) => {
        const L = (idx: number) => startX + idx * (boxW + gap);
        const R = (idx: number) => L(idx) + boxW;
        const x1 = R(i) + 4;
        const x2 = L(i + 1) - ARROW_MARKER_LEN - 2;
        const ym = y + BOX_H / 2;
        return (
          <line
            key={i}
            x1={x1}
            y1={ym}
            x2={x2}
            y2={ym}
            stroke="#334e68"
            strokeWidth="2.5"
            markerEnd={`url(#m7-ag-arrow-${uid})`}
            aria-hidden
          />
        );
      })}

      {labels.map((lb, i) => {
        const x = startX + i * (boxW + gap);
        const isActive = currentStep === i;
        const opacity = isActive ? 1 : 0.48;
        const ariaStep =
          locale === 'en'
            ? `Role ${i + 1}: ${lb.title}. Press for explanation.`
            : `Rolė ${i + 1}: ${lb.title}. Paspausk paaiškinimui.`;

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
                width={boxW}
                height={BOX_H}
                rx="10"
                fill={`url(#m7-ag-box-${uid})`}
                stroke={isActive ? '#102a43' : '#334e68'}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <text
                x={cxMid(i)}
                y={y + 30}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize={isCompactDiagram ? 9 : 11}
                fontWeight="700"
                fill="white"
              >
                {lb.title}
              </text>
              <text
                x={cxMid(i)}
                y={y + 48}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize={isCompactDiagram ? 8 : 9}
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
              >
                {lb.sub}
              </text>
            </g>
            {isInteractive && (
              <rect
                x={x}
                y={y}
                width={boxW}
                height={BOX_H}
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
