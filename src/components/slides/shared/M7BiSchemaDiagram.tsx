/**
 * Modulio 7 – 4 žingsnių BI schema (interaktyvu).
 * LMS hybrid linear: flat brand fills (W2 tokens), horizontal desktop / vertical compact.
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { getM7BiSchemaSteps, type M7Locale } from './m7DiagramContent';
import { DIAGRAM_TOKENS, DIAGRAM_TONE_COLORS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import {
  getVerticalFlowConnector,
  type DiagramBox,
} from './verticalFlowGeometry';

const STEP_COUNT = 4;
const PROCESS_ARROW = getProcessArrowMarkerGeom();
const ARROW_MARKER_LEN = PROCESS_ARROW.tipLen;

const DESKTOP_VIEWBOX_W = 640;
/** S4: crop dead air below row (was 220 → ~32% empty). */
const DESKTOP_VIEWBOX_H = 168;
const DESKTOP_BOX_W = 126;
const DESKTOP_BOX_H = 78;
const DESKTOP_GAP = 22;
const DESKTOP_ROW_Y = 72;

const COMPACT_VIEWBOX_W = 320;
/** 64 + 4×54 + 3×22 = 346 → pad to 350 after hint row. */
const COMPACT_VIEWBOX_H = 350;
const COMPACT_BOX_W = 248;
const COMPACT_BOX_H = 54;
const COMPACT_GAP = 22;
const COMPACT_START_X = 36;
const COMPACT_START_Y = 64;

function getDesktopBoxes(): [number, number, number, number][] {
  const totalW = STEP_COUNT * DESKTOP_BOX_W + (STEP_COUNT - 1) * DESKTOP_GAP;
  const startX = (DESKTOP_VIEWBOX_W - totalW) / 2;
  return Array.from(
    { length: STEP_COUNT },
    (_, i) =>
      [
        startX + i * (DESKTOP_BOX_W + DESKTOP_GAP),
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
        COMPACT_START_Y + i * (COMPACT_BOX_H + COMPACT_GAP),
        COMPACT_BOX_W,
        COMPACT_BOX_H,
      ] as [number, number, number, number]
  );
}

export default function M7BiSchemaDiagram({
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
  const isDarkPalette = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const inactiveSoft = isDarkPalette
    ? DIAGRAM_TOKENS.colors.inactiveSoftDark
    : DIAGRAM_TONE_COLORS.brand.soft;
  const isInteractive = typeof onStepClick === 'function';
  const steps = getM7BiSchemaSteps(locale);
  const viewBoxWidth = isCompactDiagram ? COMPACT_VIEWBOX_W : DESKTOP_VIEWBOX_W;
  const viewBoxHeight = isCompactDiagram
    ? COMPACT_VIEWBOX_H
    : DESKTOP_VIEWBOX_H;
  const boxes = isCompactDiagram ? getCompactBoxes() : getDesktopBoxes();
  const cx = viewBoxWidth / 2;
  const typography = DIAGRAM_TOKENS.typography;

  const title = locale === 'en' ? 'BI flow' : 'BI schema';
  const hint =
    locale === 'en'
      ? 'Tap a step – explanation below'
      : 'Paspausk žingsnį – paaiškinimas apačioje';
  const ariaIntro =
    locale === 'en'
      ? 'Four BI steps: collect, analyze, report, forecast.'
      : 'Keturi BI žingsniai: surink, analizuok, ataskaita, prognozė.';

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`${ariaIntro}${isInteractive ? ` ${hint}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`m7-bi-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m7-bi-arrow-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path
            d={PROCESS_ARROW.pathD}
            fill={palette.flow}
            stroke={palette.flow}
            strokeWidth="0.5"
          />
        </marker>
      </defs>

      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill={`url(#m7-bi-bg-${uid})`}
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
      {isInteractive ? (
        <text
          x={cx}
          y="46"
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
          {hint}
        </text>
      ) : null}

      {boxes.map((box, i) => {
        const [x, y, w, h] = box;
        const isActive = currentStep === i;
        // Soft fill only for inactive (no double-dim with opacity.inactive).
        const step = steps[i];
        const fill = isActive ? palette.brand : inactiveSoft;
        const labelFill = isActive ? palette.whiteText : palette.brandDark;
        const subFill = isActive ? palette.whiteText : palette.muted;
        return (
          <g key={i}>
            <g aria-hidden>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={fill}
                stroke={isActive ? palette.brandDark : palette.border}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={x + w / 2}
                y={y + (isCompactDiagram ? 22 : 30)}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? typography.stepLabel.compact
                    : typography.stepLabel.desktop
                }
                fontWeight="800"
                fill={labelFill}
              >
                {i + 1}. {step.label}
              </text>
              <text
                x={x + w / 2}
                y={y + (isCompactDiagram ? 40 : 50)}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={
                  isCompactDiagram
                    ? typography.stepSub.compact
                    : typography.stepSub.desktop
                }
                fontWeight="500"
                fill={subFill}
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
                      strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
                      markerEnd={`url(#m7-bi-arrow-${uid})`}
                      aria-hidden
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
                  strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
                  markerEnd={`url(#m7-bi-arrow-${uid})`}
                  aria-hidden
                />
              ))}
          </g>
        );
      })}
    </svg>
  );
}
