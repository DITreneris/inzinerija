/**
 * Agentų ciklo diagrama (M10.2) – horizontali schema:
 * Agentas → Planavimas → Įrankiai → Aplinka → Rezultatas + grįžtamasis ryšys.
 * SCHEME_AGENT: viena geometrijos tiesa (§3.1), rodyklės kraštas į kraštą (§3.2), proporcingos (§3.3), feedback path nekerta blokų (§3.4).
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import {
  getAgentWorkflowLabels,
  type AgentWorkflowLocale,
  type AgentWorkflowStep,
} from './agentWorkflowContent';
import { DiagramStepHitArea } from './diagramKit';
import { DIAGRAM_ROLE_COLORS, DIAGRAM_TOKENS } from './diagramTokens';

const DESKTOP_VIEWBOX_W = 860;
const DESKTOP_VIEWBOX_H = 330;
const DESKTOP_BOX_W = 140;
const DESKTOP_BOX_H = 72;
const DESKTOP_GAP = 24;
const DESKTOP_START_X = 24;
const DESKTOP_ROW_Y = 82;
const DESKTOP_FEEDBACK_Y = DESKTOP_ROW_Y + DESKTOP_BOX_H + 56;

const COMPACT_VIEWBOX_W = 360;
const COMPACT_VIEWBOX_H = 566;
const COMPACT_BOX_W = 224;
const COMPACT_BOX_H = 62;
const COMPACT_START_X = 68;
const COMPACT_ROW_Y = 64;
const COMPACT_GAP = 28;
const COMPACT_FEEDBACK_X = 34;

const ARROW_GAP_FWD = 5;
const ARROW_GAP_FB = 12;
const ARROW_MARKER_LEN = DIAGRAM_TOKENS.arrow.markerLen;
const FB_TIP_H = 12;
const FB_TIP_W = 8;
const FB_CORNER_R = 14;

const BRAND = DIAGRAM_ROLE_COLORS.brand;
const BRAND_LIGHT = DIAGRAM_ROLE_COLORS.brandTop;
const ACCENT = DIAGRAM_ROLE_COLORS.amber;
const ACCENT_DARK = DIAGRAM_ROLE_COLORS.accentDark;
const GREY_FORWARD = DIAGRAM_ROLE_COLORS.greyForward;

function buildSteps(
  stepLabels: AgentWorkflowStep[],
  startX: number,
  rowY: number,
  boxW: number,
  boxH: number,
  gap: number
) {
  return stepLabels.map((step, index) => ({
    ...step,
    x: startX + (boxW + gap) * index,
    y: rowY,
    w: boxW,
    h: boxH,
  }));
}

function buildVerticalSteps(
  stepLabels: AgentWorkflowStep[],
  startX: number,
  rowY: number,
  boxW: number,
  boxH: number,
  gap: number
) {
  return stepLabels.map((step, index) => ({
    ...step,
    x: startX,
    y: rowY + (boxH + gap) * index,
    w: boxW,
    h: boxH,
  }));
}

export default function AgentWorkflowDiagram({
  className = '',
  locale = 'lt',
  currentStep = 0,
  onStepClick,
}: {
  className?: string;
  locale?: AgentWorkflowLocale;
  /** Pasirinktas žingsnis (0–4). Naudojama interaktyviame režime. */
  currentStep?: number;
  /** Callback paspaudus žingsnį. Kai nurodyta – blokai clickable. */
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const labels = getAgentWorkflowLabels(locale);
  const isInteractive = typeof onStepClick === 'function';
  const steps = isCompactDiagram
    ? buildVerticalSteps(
        labels.steps,
        COMPACT_START_X,
        COMPACT_ROW_Y,
        COMPACT_BOX_W,
        COMPACT_BOX_H,
        COMPACT_GAP
      )
    : buildSteps(
        labels.steps,
        DESKTOP_START_X,
        DESKTOP_ROW_Y,
        DESKTOP_BOX_W,
        DESKTOP_BOX_H,
        DESKTOP_GAP
      );
  const first = steps[0];
  const last = steps[steps.length - 1];
  const firstCx = first.x + first.w / 2;
  const lastCx = last.x + last.w / 2;
  const firstBottom = first.y + first.h;
  const lastBottom = last.y + last.h;
  const feedbackBase = isCompactDiagram
    ? COMPACT_FEEDBACK_X
    : DESKTOP_FEEDBACK_Y;
  const fbTriBase = firstBottom + FB_TIP_H;
  const R = FB_CORNER_R;
  const fbStartY = lastBottom + ARROW_GAP_FB;
  const feedbackPath = isCompactDiagram
    ? `M ${lastCx} ${fbStartY}
       L ${lastCx} ${feedbackBase + R}
       Q ${lastCx} ${feedbackBase}, ${lastCx - R} ${feedbackBase}
       L ${COMPACT_FEEDBACK_X + R} ${feedbackBase}
       Q ${COMPACT_FEEDBACK_X} ${feedbackBase}, ${COMPACT_FEEDBACK_X} ${feedbackBase + R}
       L ${COMPACT_FEEDBACK_X} ${fbTriBase - R}
       Q ${COMPACT_FEEDBACK_X} ${fbTriBase}, ${COMPACT_FEEDBACK_X + R} ${fbTriBase}
       L ${firstCx} ${fbTriBase}`
    : `M ${lastCx} ${fbStartY}
       L ${lastCx} ${feedbackBase - R}
       Q ${lastCx} ${feedbackBase}, ${lastCx - R} ${feedbackBase}
       L ${firstCx + R} ${feedbackBase}
       Q ${firstCx} ${feedbackBase}, ${firstCx} ${feedbackBase - R}
       L ${firstCx} ${fbTriBase}`;
  const viewBoxWidth = isCompactDiagram ? COMPACT_VIEWBOX_W : DESKTOP_VIEWBOX_W;
  const viewBoxHeight = isCompactDiagram
    ? COMPACT_VIEWBOX_H
    : DESKTOP_VIEWBOX_H;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={labels.ariaLabel}
    >
      <defs>
        <linearGradient id={`aw-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`aw-arrow-${uid}`}
          markerWidth={ARROW_MARKER_LEN + 2}
          markerHeight={8}
          refX={ARROW_MARKER_LEN}
          refY="4"
          orient="auto"
        >
          <path
            d={`M0 0 L${ARROW_MARKER_LEN} 4 L0 8 Z`}
            fill={GREY_FORWARD}
            stroke={GREY_FORWARD}
            strokeWidth="0.5"
          />
        </marker>
        <linearGradient id={`aw-step-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BRAND_LIGHT} />
          <stop offset="100%" stopColor={BRAND} />
        </linearGradient>
      </defs>

      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill={`url(#aw-bg-${uid})`}
        rx="12"
      />
      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill="none"
        stroke={palette.border}
        strokeWidth="1"
        rx="12"
      />

      <text
        x={viewBoxWidth / 2}
        y="28"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="18"
        fontWeight="800"
        fill={palette.brandDark}
      >
        {labels.diagramTitle}
      </text>

      {steps.map((step, i) => {
        const rightEdge = step.x + step.w;
        const centerX = step.x + step.w / 2;
        const centerY = step.y + step.h / 2;
        const next = steps[i + 1];
        const gapCenterX = rightEdge + (isCompactDiagram ? 0 : DESKTOP_GAP / 2);
        const lblY = step.y - 8;
        const toX = next ? next.x - ARROW_MARKER_LEN : 0;
        const fromX = rightEdge + ARROW_GAP_FWD;
        const fromY = step.y + step.h + ARROW_GAP_FWD;
        const toY = next ? next.y - ARROW_MARKER_LEN : 0;
        const isActive = currentStep === i;
        const dimOpacity = isInteractive && !isActive ? 0.55 : 1;

        return (
          <g key={i}>
            <g
              opacity={dimOpacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden={isInteractive ? true : undefined}
            >
              <rect
                x={step.x}
                y={step.y}
                width={step.w}
                height={step.h}
                rx="10"
                fill={`url(#aw-step-${uid})`}
                stroke={isInteractive && isActive ? palette.brandDark : BRAND}
                strokeWidth={isInteractive && isActive ? 2.5 : 1.5}
              />
              <text
                x={centerX}
                y={step.y + 27}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize="13"
                fontWeight="700"
                fill="white"
              >
                {step.title}
              </text>
              <text
                x={centerX}
                y={step.y + 46}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize="11"
                fontWeight="500"
                fill="rgba(255,255,255,0.95)"
              >
                {step.desc}
              </text>
            </g>

            {isInteractive && (
              <DiagramStepHitArea
                x={step.x}
                y={step.y}
                width={step.w}
                height={step.h}
                radius={10}
                onActivate={() => onStepClick?.(i)}
              />
            )}

            {next && (
              <g
                aria-label={`${step.title} → ${next.title}: ${labels.forwardLabels[i]}`}
              >
                {isCompactDiagram ? (
                  <>
                    <line
                      x1={centerX}
                      y1={fromY}
                      x2={centerX}
                      y2={toY}
                      stroke={GREY_FORWARD}
                      strokeWidth="3"
                      markerEnd={`url(#aw-arrow-${uid})`}
                    />
                    <text
                      x={centerX}
                      y={step.y + step.h + 18}
                      textAnchor="middle"
                      fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                      fontSize="10"
                      fontWeight="700"
                      fill={palette.brandDark}
                    >
                      {labels.forwardLabels[i]}
                    </text>
                  </>
                ) : (
                  <>
                    <line
                      x1={fromX}
                      y1={centerY}
                      x2={toX}
                      y2={centerY}
                      stroke={GREY_FORWARD}
                      strokeWidth="3"
                      markerEnd={`url(#aw-arrow-${uid})`}
                    />
                    <text
                      x={gapCenterX}
                      y={lblY}
                      textAnchor="middle"
                      fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                      fontSize="10"
                      fontWeight="700"
                      fill={palette.brandDark}
                    >
                      {labels.forwardLabels[i]}
                    </text>
                  </>
                )}
              </g>
            )}
          </g>
        );
      })}

      <circle
        cx={lastCx}
        cy={fbStartY}
        r={5}
        fill={ACCENT}
        stroke={ACCENT_DARK}
        strokeWidth="0.8"
      />
      <path
        d={feedbackPath}
        stroke={ACCENT}
        strokeWidth="2.5"
        strokeDasharray="8 4"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <title>{labels.feedbackTitle}</title>
      </path>
      <polygon
        points={
          isCompactDiagram
            ? `${firstCx - FB_TIP_W},${fbTriBase} ${firstCx},${firstBottom} ${firstCx + FB_TIP_W},${fbTriBase}`
            : `${firstCx - FB_TIP_W},${fbTriBase} ${firstCx},${firstBottom} ${firstCx + FB_TIP_W},${fbTriBase}`
        }
        fill={ACCENT}
        stroke={ACCENT_DARK}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <text
        x={isCompactDiagram ? COMPACT_FEEDBACK_X + 44 : (lastCx + firstCx) / 2}
        y={isCompactDiagram ? firstBottom + 26 : feedbackBase + 16}
        textAnchor={isCompactDiagram ? 'start' : 'middle'}
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        fill={ACCENT_DARK}
      >
        {labels.feedbackLabel}
      </text>
    </svg>
  );
}
