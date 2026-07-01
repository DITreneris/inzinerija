/**
 * Modulio 7 – 4 analizės tipai (2×2, interaktyvu).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM7AnalysisShortLabels, type M7Locale } from './m7DiagramContent';
import {
  DIAGRAM_TOKENS,
  getDiagramToneColors,
  type DiagramTone,
} from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';

const BOX_W = 214;
const BOX_H = 108;
const GAP = 26;
const ANALYSIS_TONES: DiagramTone[] = ['brand', 'slate', 'emerald', 'amber'];

function boxesForGrid(compact: boolean): [number, number, number, number][] {
  const bw = compact ? 138 : BOX_W;
  const bh = compact ? 92 : BOX_H;
  const g = compact ? 14 : GAP;
  const x0 = compact ? 18 : 54;
  const y0 = compact ? 72 : 86;
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
  const palette = useDiagramPalette();
  const isInteractive = typeof onStepClick === 'function';
  const labels = getM7AnalysisShortLabels(locale);
  const stepBoxes = boxesForGrid(isCompactDiagram);
  const viewW = isCompactDiagram ? 324 : 562;
  const viewH = isCompactDiagram ? 346 : 386;
  const cx = viewW / 2;
  const typography = DIAGRAM_TOKENS.typography.rolesHub;
  const isDarkPalette = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const toneColors = getDiagramToneColors(isDarkPalette);

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
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`${ariaIntro}${isInteractive ? ` ${hint}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`m7-an-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        {ANALYSIS_TONES.map((tone) => {
          const colors = toneColors[tone];
          return (
            <linearGradient
              key={tone}
              id={`m7-an-box-${uid}-${tone}`}
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
        <filter
          id={`m7-an-active-${uid}`}
          x="-16%"
          y="-16%"
          width="132%"
          height="132%"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor={palette.brand}
            floodOpacity={isDarkPalette ? '0.45' : '0.28'}
          />
        </filter>
      </defs>

      <rect
        width={viewW}
        height={viewH}
        fill={`url(#m7-an-bg-${uid})`}
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
        x={cx}
        y="32"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={
          isCompactDiagram ? typography.title.compact : typography.title.desktop
        }
        fontWeight="800"
        fill={palette.brandDark}
      >
        {title}
      </text>
      <text
        x={cx}
        y="50"
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

      {stepBoxes.map((box, i) => {
        const isActive = currentStep === i;
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.selectableInactive;
        const lb = labels[i];
        const tone = ANALYSIS_TONES[i];
        const colors = toneColors[tone];
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
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#m7-an-box-${uid}-${tone})`}
                stroke={isActive ? palette.brandDark : colors.stroke}
                strokeWidth={isActive ? 3 : DIAGRAM_TOKENS.stroke.inactive}
                filter={isActive ? `url(#m7-an-active-${uid})` : undefined}
              />
              <text
                x={box[0] + box[2] / 2}
                y={box[1] + (isCompactDiagram ? 31 : 34)}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? typography.label.compact
                    : typography.label.desktop
                }
                fontWeight="700"
                fill={colors.text}
              >
                {lb.title}
              </text>
              <text
                x={box[0] + box[2] / 2}
                y={box[1] + (isCompactDiagram ? 50 : 56)}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? typography.sub.compact
                    : typography.sub.desktop
                }
                fontWeight="600"
                fill={palette.whiteText}
              >
                {lb.sub}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={box[0]}
                y={box[1]}
                width={box[2]}
                height={box[3]}
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
