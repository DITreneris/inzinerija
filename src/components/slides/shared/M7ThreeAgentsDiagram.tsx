/**
 * Modulio 7 – 3 DI agentų tipai (horizontalus srautas).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM7AgentShortLabels, type M7Locale } from './m7DiagramContent';
import {
  DIAGRAM_TOKENS,
  DIAGRAM_TONE_COLORS,
  type DiagramTone,
} from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';

const BOX_H = 78;
const GAP = 28;
const ARROW_MARKER_LEN = DIAGRAM_TOKENS.arrow.markerLen;
const AGENT_TONES: DiagramTone[] = ['slate', 'brand', 'emerald'];

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
  const palette = useDiagramPalette();
  const isInteractive = typeof onStepClick === 'function';
  const labels = getM7AgentShortLabels(locale);
  const typography = DIAGRAM_TOKENS.typography;

  const n = 3;
  const viewW = isCompactDiagram ? 320 : 560;
  const viewH = isCompactDiagram ? 200 : 220;
  const boxW = isCompactDiagram ? 92 : 150;
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
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={ARROW_MARKER_LEN}
          refY="3"
          orient="auto"
        >
          <path
            d={DIAGRAM_TOKENS.arrow.markerPath}
            fill={palette.flow}
            stroke={palette.flow}
            strokeWidth="0.5"
          />
        </marker>
        <linearGradient
          id={`m7-ag-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        {AGENT_TONES.map((tone) => {
          const colors = DIAGRAM_TONE_COLORS[tone];
          return (
            <linearGradient
              key={tone}
              id={`m7-ag-box-${uid}-${tone}`}
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
        width={viewW}
        height={viewH}
        fill={`url(#m7-ag-bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <rect
        width={viewW}
        height={viewH}
        fill="none"
        stroke={palette.border}
        strokeWidth={DIAGRAM_TOKENS.stroke.border}
        rx={DIAGRAM_TOKENS.radius.frame}
      />

      <text
        x={viewW / 2}
        y="28"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={
          isCompactDiagram ? typography.title.compact : typography.title.desktop
        }
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
      >
        {title}
      </text>
      <text
        x={viewW / 2}
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
            stroke={palette.flow}
            strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
            markerEnd={`url(#m7-ag-arrow-${uid})`}
            aria-hidden
          />
        );
      })}

      {labels.map((lb, i) => {
        const x = startX + i * (boxW + gap);
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactive;
        const tone = AGENT_TONES[i];
        const colors = DIAGRAM_TONE_COLORS[tone];
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
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#m7-ag-box-${uid}-${tone})`}
                stroke={isActive ? palette.brandDark : colors.stroke}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cxMid(i)}
                y={y + 30}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? typography.stepLabel.compact
                    : typography.stepLabel.desktop
                }
                fontWeight="700"
                fill={colors.text}
              >
                {lb.title}
              </text>
              <text
                x={cxMid(i)}
                y={y + 48}
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
                {lb.sub}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={x}
                y={y}
                width={boxW}
                height={BOX_H}
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
