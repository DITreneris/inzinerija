import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import {
  DIAGRAM_TOKENS,
  getDiagramToneColors,
  type DiagramTone,
} from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import { getM12ThreeLabsLabels } from './m12ThreeLabsContent';
import type { M10Locale } from './m10DiagramContent';
import { M12_THREE_LABS_LAYOUT as L } from './m12ThreeLabsLayout';

const PROCESS_ARROW = getProcessArrowMarkerGeom();

function chipWidth(label: string): number {
  const estimated = 14 + label.length * 6.2;
  return Math.min(L.chipMaxW, Math.max(L.chipMinW, estimated));
}

export default function M12ThreeLabsDiagram({
  locale = 'lt',
  className = '',
  currentStep = 0,
  onStepClick,
}: {
  locale?: M10Locale;
  className?: string;
  currentStep?: number;
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const isDarkPalette = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const tones = getDiagramToneColors(isDarkPalette);
  const labels = getM12ThreeLabsLabels(locale);
  const tip = PROCESS_ARROW.tipLen;
  const rowSurface = isDarkPalette
    ? 'rgba(30,41,59,0.55)'
    : 'rgba(255,255,255,0.72)';
  const chipSoftFill = isDarkPalette ? 'rgba(15,23,42,0.65)' : palette.bgEnd;
  const noteMuted = isDarkPalette ? palette.flow : palette.muted;
  const isInteractive = typeof onStepClick === 'function';

  return (
    <svg
      viewBox={`0 0 ${L.width} ${L.height}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`${labels.aria}${isInteractive ? ` ${labels.hint}` : ''}`}
    >
      <defs>
        <linearGradient id={`m12tl-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m12tl-conn-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path d={PROCESS_ARROW.pathD} fill={palette.flow} />
        </marker>
      </defs>
      <rect
        x="0"
        y="0"
        width={L.width}
        height={L.height}
        rx={DIAGRAM_TOKENS.radius.frame}
        fill={`url(#m12tl-bg-${uid})`}
      />
      <text
        x={L.width / 2}
        y={L.titleY}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {labels.title}
      </text>
      {labels.rows.map((row, rowIndex) => {
        const tone = tones[row.tone as DiagramTone];
        const yy = L.rowY0 + rowIndex * (L.rowH + L.gap);
        const chipY = yy + 10;
        const noteY = yy + L.rowH - 10;
        const isSelected = isInteractive && currentStep === rowIndex;
        const rowOpacity = isInteractive
          ? isSelected
            ? DIAGRAM_TOKENS.opacity.active
            : DIAGRAM_TOKENS.opacity.inactive
          : 1;
        let x = L.padX + L.accentBarW + 10 + L.labelW;

        return (
          <g key={row.label}>
            <g
              opacity={rowOpacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={L.padX}
                y={yy}
                width={L.width - L.padX * 2}
                height={L.rowH}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={rowSurface}
                stroke={isSelected ? palette.brandDark : palette.border}
                strokeWidth={
                  isSelected
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.border
                }
              />
              <rect
                x={L.padX}
                y={yy}
                width={L.accentBarW}
                height={L.rowH}
                rx={2}
                fill={tone.stroke}
              />
              <text
                x={L.padX + L.accentBarW + 10}
                y={yy + L.rowH / 2 + 4}
                fill={palette.brandDark}
                fontSize={DIAGRAM_TOKENS.typography.stepLabel.compact}
                fontWeight={700}
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {row.label}
              </text>
              {row.steps.map((step, stepIndex) => {
                const w = chipWidth(step);
                const isHuman = row.humanStepIndex === stepIndex;
                const chipX = x;
                x +=
                  w +
                  L.chipGap +
                  (stepIndex < row.steps.length - 1 ? tip + 2 : 0);
                const fill = isHuman ? tone.bottom : chipSoftFill;
                const stroke = isHuman ? tone.stroke : palette.border;
                const textFill = isHuman ? tone.text : palette.brandDark;
                const strokeW = isHuman
                  ? DIAGRAM_TOKENS.stroke.active
                  : DIAGRAM_TOKENS.stroke.border;
                return (
                  <g key={`${row.label}-${step}`}>
                    {stepIndex > 0 && (
                      <line
                        x1={chipX - L.chipGap - tip}
                        y1={chipY + L.chipH / 2}
                        x2={chipX - tip}
                        y2={chipY + L.chipH / 2}
                        stroke={palette.flow}
                        strokeWidth={DIAGRAM_TOKENS.stroke.flow}
                        markerEnd={`url(#m12tl-conn-${uid})`}
                      />
                    )}
                    <rect
                      x={chipX}
                      y={chipY}
                      width={w}
                      height={L.chipH}
                      rx={8}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={strokeW}
                    />
                    <text
                      x={chipX + w / 2}
                      y={chipY + L.chipH / 2 + 4}
                      textAnchor="middle"
                      fill={textFill}
                      fontSize={DIAGRAM_TOKENS.typography.stepLabel.compact}
                      fontWeight={isHuman ? 700 : 600}
                      fontFamily={DIAGRAM_TOKENS.font}
                    >
                      {step}
                    </text>
                  </g>
                );
              })}
              <text
                x={L.width - L.padX - 8}
                y={noteY}
                textAnchor="end"
                fill={row.humanStepIndex === null ? noteMuted : tone.stroke}
                fontSize={DIAGRAM_TOKENS.typography.stepSub.compact}
                fontWeight={row.humanStepIndex === null ? 500 : 700}
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {row.humanNote}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={L.padX}
                y={yy}
                width={L.width - L.padX * 2}
                height={L.rowH}
                radius={DIAGRAM_TOKENS.radius.box}
                onActivate={() => onStepClick?.(rowIndex)}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
