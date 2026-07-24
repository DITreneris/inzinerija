/**
 * Modulio 7 – duomenų istorijos ciklas (interaktyvu).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM7DataStoryCycleSteps, type M7Locale } from './m7DiagramContent';
import { DIAGRAM_TOKENS, DIAGRAM_ROLE_COLORS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import { feedbackUPath, horizontalRowBoxes } from './cycleFeedbackGeometry';
import {
  getVerticalFlowConnector,
  type DiagramBox,
} from './verticalFlowGeometry';

const STEP_COUNT = 5;
const ARROW_MARKER_LEN = DIAGRAM_TOKENS.arrow.markerLen;

const DESKTOP_VIEWBOX_W = 640;
/** I3c-style crop – keep 5×108 story boxes (not AgentWorkflow 188). */
const DESKTOP_VIEWBOX_H = 268;
const DESKTOP_BOX_W = 108;
const DESKTOP_BOX_H = 72;
const DESKTOP_GAP = 20;
const DESKTOP_ROW_Y = 48;
const DESKTOP_FEEDBACK_OFFSET = 40;

const COMPACT_VIEWBOX_W = 320;
const COMPACT_VIEWBOX_H = 430;
const COMPACT_BOX_W = 240;
const COMPACT_BOX_H = 54;
const COMPACT_GAP = 22;
const COMPACT_START_X = 40;
const COMPACT_START_Y = 74;

function getDesktopBoxes(): [number, number, number, number][] {
  return horizontalRowBoxes({
    count: STEP_COUNT,
    boxW: DESKTOP_BOX_W,
    boxH: DESKTOP_BOX_H,
    gap: DESKTOP_GAP,
    viewBoxW: DESKTOP_VIEWBOX_W,
    rowY: DESKTOP_ROW_Y,
  }).map((b) => [b.x, b.y, b.w, b.h] as [number, number, number, number]);
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
  const feedbackY = DESKTOP_ROW_Y + DESKTOP_BOX_H + DESKTOP_FEEDBACK_OFFSET;
  const feedbackR = 16;
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
  const feedbackStroke = DIAGRAM_ROLE_COLORS.accentDark;
  const feedbackSoft = DIAGRAM_ROLE_COLORS.amberSoft;
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
        <marker
          id={`m7-story-feedback-${uid}`}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={ARROW_MARKER_LEN}
          refY="3"
          orient="auto"
        >
          <path
            d={DIAGRAM_TOKENS.arrow.markerPath}
            fill={DIAGRAM_ROLE_COLORS.accentDark}
            stroke={DIAGRAM_ROLE_COLORS.accentDark}
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
        y="22"
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={
          isCompactDiagram ? 15 : DIAGRAM_TOKENS.typography.title.desktop
        }
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
      >
        {title}
      </text>
      <text
        x={cx}
        y="40"
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
            fill={feedbackStroke}
            opacity="0.9"
          />
          <path
            d={feedbackUPath({
              firstCx,
              lastCx,
              startY: lastBottom + 10,
              troughY: feedbackY,
              tipY: firstBottom + 2,
              cornerR: feedbackR,
            })}
            fill="none"
            stroke={feedbackStroke}
            strokeWidth={DIAGRAM_TOKENS.stroke.feedback}
            strokeDasharray="7 5"
            markerEnd={`url(#m7-story-feedback-${uid})`}
            opacity="0.92"
          />
          <rect
            x={cx - 104}
            y={feedbackY + 9}
            width="208"
            height="22"
            rx="11"
            fill={feedbackSoft}
            opacity="0.92"
          />
          <text
            x={cx}
            y={feedbackY + 24}
            textAnchor="middle"
            fontFamily={DIAGRAM_TOKENS.font}
            fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
            fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
            fill={feedbackStroke}
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
          : DIAGRAM_TOKENS.opacity.inactive;

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
                (() => {
                  const conn = getVerticalFlowConnector(
                    box as DiagramBox,
                    boxes[i + 1],
                    x + w / 2,
                    ARROW_MARKER_LEN
                  );
                  return (
                    <line
                      x1={conn.x1}
                      y1={conn.y1}
                      x2={conn.x2}
                      y2={conn.y2}
                      stroke={palette.flow}
                      strokeWidth={DIAGRAM_TOKENS.stroke.flow}
                      markerEnd={`url(#m7-story-arrow-${uid})`}
                    />
                  );
                })()
              ) : (
                <line
                  x1={x + w}
                  y1={y + h / 2}
                  x2={boxes[i + 1][0] - ARROW_MARKER_LEN}
                  y2={y + h / 2}
                  stroke={palette.flow}
                  strokeWidth={DIAGRAM_TOKENS.stroke.flow}
                  markerEnd={`url(#m7-story-arrow-${uid})`}
                />
              ))}
          </g>
        );
      })}
    </svg>
  );
}
