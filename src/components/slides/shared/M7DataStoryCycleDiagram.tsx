/**
 * Modulio 7 – duomenų istorijos ciklas (interaktyvu).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM7DataStoryCycleSteps, type M7Locale } from './m7DiagramContent';
import { DIAGRAM_TOKENS, DIAGRAM_TONE_COLORS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';

const STEP_COUNT = 5;
const ARROW_MARKER_LEN = DIAGRAM_TOKENS.arrow.markerLen;

const DESKTOP_VIEWBOX_W = 640;
const DESKTOP_VIEWBOX_H = 330;
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
  const palette = useDiagramPalette();
  const isInteractive = typeof onStepClick === 'function';
  const steps = getM7DataStoryCycleSteps(locale);
  const viewBoxWidth = isCompactDiagram ? COMPACT_VIEWBOX_W : DESKTOP_VIEWBOX_W;
  const viewBoxHeight = isCompactDiagram
    ? COMPACT_VIEWBOX_H
    : DESKTOP_VIEWBOX_H;
  const boxes = isCompactDiagram ? getCompactBoxes() : getDesktopBoxes();
  const cx = viewBoxWidth / 2;
  const firstBox = boxes[0];
  const lastBox = boxes[boxes.length - 1];
  const feedbackY = DESKTOP_ROW_Y + DESKTOP_BOX_H + 76;
  const feedbackR = 18;
  const firstCx = firstBox[0] + firstBox[2] / 2;
  const lastCx = lastBox[0] + lastBox[2] / 2;
  const firstBottom = firstBox[1] + firstBox[3];
  const lastBottom = lastBox[1] + lastBox[3];

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
  const feedbackLabel =
    locale === 'en'
      ? 'Story informs the next cycle'
      : 'Istorija pradeda kitą ciklą';
  const feedbackColors = DIAGRAM_TONE_COLORS.amber;
  const typography = DIAGRAM_TOKENS.typography;

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
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <linearGradient
          id={`m7-story-box-${uid}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.brandTop} />
          <stop offset="100%" stopColor={palette.brand} />
        </linearGradient>
        <marker
          id={`m7-story-arrow-${uid}`}
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
        <marker
          id={`m7-story-feedback-${uid}`}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={ARROW_MARKER_LEN}
          refY="3"
          orient="auto"
        >
          <path
            d={DIAGRAM_TOKENS.arrow.markerPath}
            fill={DIAGRAM_TOKENS.colors.amber}
            stroke={DIAGRAM_TOKENS.colors.amber}
            strokeWidth="0.5"
          />
        </marker>
      </defs>

      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill={`url(#m7-story-bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill="none"
        stroke={palette.border}
        strokeWidth={DIAGRAM_TOKENS.stroke.border}
        rx={DIAGRAM_TOKENS.radius.frame}
      />

      <text
        x={cx}
        y="34"
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
        y="54"
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

      {!isCompactDiagram && (
        <g aria-hidden>
          <circle
            cx={lastCx}
            cy={lastBottom + 10}
            r="4.5"
            fill={feedbackColors.stroke}
            opacity="0.9"
          />
          <path
            d={`M ${lastCx} ${lastBottom + 10}
              L ${lastCx} ${feedbackY - feedbackR}
              Q ${lastCx} ${feedbackY}, ${lastCx - feedbackR} ${feedbackY}
              L ${firstCx + feedbackR} ${feedbackY}
              Q ${firstCx} ${feedbackY}, ${firstCx} ${feedbackY - feedbackR}
              L ${firstCx} ${firstBottom + 2}`}
            fill="none"
            stroke={feedbackColors.stroke}
            strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
            strokeDasharray="7 5"
            markerEnd={`url(#m7-story-feedback-${uid})`}
            opacity="0.88"
          />
          <rect
            x={cx - 104}
            y={feedbackY + 9}
            width="208"
            height="22"
            rx="11"
            fill={feedbackColors.soft}
            opacity="0.92"
          />
          <text
            x={cx}
            y={feedbackY + 24}
            textAnchor="middle"
            fontFamily={DIAGRAM_TOKENS.font}
            fontSize={typography.subtitle.desktop}
            fontWeight="700"
            fill={feedbackColors.stroke}
          >
            {feedbackLabel}
          </text>
        </g>
      )}

      {boxes.map((box, i) => {
        const [x, y, w, h] = box;
        const isActive = currentStep === i;
        const step = steps[i];
        const opacity = isActive
          ? DIAGRAM_TOKENS.opacity.active
          : DIAGRAM_TOKENS.opacity.inactiveSoft;

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
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#m7-story-box-${uid})`}
                stroke={isActive ? palette.brandDark : palette.brand}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={x + w / 2}
                y={y + (isCompactDiagram ? 22 : 26)}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? typography.stepLabel.compact
                    : typography.stepLabel.desktop
                }
                fontWeight="800"
                fill="white"
              >
                {i + 1}. {step.label}
              </text>
              <text
                x={x + w / 2}
                y={y + (isCompactDiagram ? 40 : 48)}
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

            {i < boxes.length - 1 &&
              (isCompactDiagram ? (
                <line
                  x1={x + w / 2}
                  y1={y + h}
                  x2={x + w / 2}
                  y2={boxes[i + 1][1] - ARROW_MARKER_LEN}
                  stroke={palette.flow}
                  strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
                  markerEnd={`url(#m7-story-arrow-${uid})`}
                />
              ) : (
                <line
                  x1={x + w}
                  y1={y + h / 2}
                  x2={boxes[i + 1][0] - ARROW_MARKER_LEN}
                  y2={y + h / 2}
                  stroke={palette.flow}
                  strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
                  markerEnd={`url(#m7-story-arrow-${uid})`}
                />
              ))}
          </g>
        );
      })}
    </svg>
  );
}
