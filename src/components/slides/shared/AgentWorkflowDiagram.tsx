/**
 * Agentų ciklo diagrama (M10.2) – horizontali schema:
 * Agentas → Planavimas → Įrankiai → Aplinka → Rezultatas + grįžtamasis ryšys.
 * I3b: matomi forward kotai, vienakryptis storesnis feedback (RlProcess parity).
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import {
  getAgentWorkflowLabels,
  type AgentWorkflowLocale,
} from './agentWorkflowContent';
import {
  AGENT_WORKFLOW_ARROW,
  AGENT_WORKFLOW_FEEDBACK,
  AGENT_WORKFLOW_GAP,
  AGENT_WORKFLOW_OPACITY,
  AGENT_WORKFLOW_TYPE,
  AGENT_WORKFLOW_VIEWBOX,
  buildAgentWorkflowCompactBoxes,
  buildAgentWorkflowDesktopBoxes,
} from './agentWorkflowLayout';
import { feedbackUPath } from './cycleFeedbackGeometry';
import { DiagramStepHitArea } from './diagramKit';
import { DIAGRAM_ROLE_COLORS, DIAGRAM_TOKENS } from './diagramTokens';

const BRAND = DIAGRAM_ROLE_COLORS.brand;
const BRAND_LIGHT = DIAGRAM_ROLE_COLORS.brandTop;
const ACCENT = DIAGRAM_ROLE_COLORS.amber;
const ACCENT_DARK = DIAGRAM_ROLE_COLORS.accentDark;
const GREY_FORWARD = DIAGRAM_ROLE_COLORS.greyForward;

export default function AgentWorkflowDiagram({
  className = '',
  locale = 'lt',
  currentStep = 0,
  onStepClick,
}: {
  className?: string;
  locale?: AgentWorkflowLocale;
  currentStep?: number;
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const labels = getAgentWorkflowLabels(locale);
  const isInteractive = typeof onStepClick === 'function';
  const boxes = isCompactDiagram
    ? buildAgentWorkflowCompactBoxes()
    : buildAgentWorkflowDesktopBoxes();
  const gap = isCompactDiagram
    ? AGENT_WORKFLOW_GAP.compact
    : AGENT_WORKFLOW_GAP.desktop;
  const first = boxes[0];
  const last = boxes[boxes.length - 1];
  const firstCx = first.x + first.w / 2;
  const lastCx = last.x + last.w / 2;
  const firstBottom = first.y + first.h;
  const lastBottom = last.y + last.h;
  const {
    tipH: FB_TIP_H,
    tipW: FB_TIP_W,
    cornerR: R,
    gapAboveBlock,
    arrowGapFb,
    pathStroke,
    compactX,
    startRadius,
    labelSize: feedbackLabelSize,
  } = AGENT_WORKFLOW_FEEDBACK;
  const feedbackBase = isCompactDiagram
    ? compactX
    : AGENT_WORKFLOW_FEEDBACK.desktopY();
  const fbTipY = firstBottom + gapAboveBlock;
  const fbTriBase = fbTipY + FB_TIP_H;
  const fbStartY = lastBottom + arrowGapFb;
  const { markerLen, forwardStroke, gapFwd, gapFwdCompact } =
    AGENT_WORKFLOW_ARROW;
  const titleY = isCompactDiagram
    ? AGENT_WORKFLOW_TYPE.diagramTitleY.compact
    : AGENT_WORKFLOW_TYPE.diagramTitleY.desktop;
  /** Desktop: tip at Agent bottom; path ends at tip (unidirectional U). */
  const feedbackPath = isCompactDiagram
    ? `M ${lastCx} ${fbStartY}
       L ${lastCx} ${feedbackBase + R}
       Q ${lastCx} ${feedbackBase}, ${lastCx - R} ${feedbackBase}
       L ${compactX + R} ${feedbackBase}
       Q ${compactX} ${feedbackBase}, ${compactX} ${feedbackBase + R}
       L ${compactX} ${fbTriBase - R}
       Q ${compactX} ${fbTriBase}, ${compactX + R} ${fbTriBase}
       L ${firstCx} ${fbTipY}`
    : feedbackUPath({
        firstCx,
        lastCx,
        startY: fbStartY,
        troughY: feedbackBase,
        tipY: fbTipY,
        cornerR: R,
      });
  const viewBoxWidth = isCompactDiagram
    ? AGENT_WORKFLOW_VIEWBOX.compact.width
    : AGENT_WORKFLOW_VIEWBOX.desktop.width;
  const viewBoxHeight = isCompactDiagram
    ? AGENT_WORKFLOW_VIEWBOX.compact.height
    : AGENT_WORKFLOW_VIEWBOX.desktop.height;
  const titleSize = isCompactDiagram
    ? AGENT_WORKFLOW_TYPE.diagramTitle.compact
    : AGENT_WORKFLOW_TYPE.diagramTitle.desktop;
  const nodeTitleSize = isCompactDiagram
    ? AGENT_WORKFLOW_TYPE.nodeTitle.compact
    : AGENT_WORKFLOW_TYPE.nodeTitle.desktop;
  const nodeDescSize = isCompactDiagram
    ? AGENT_WORKFLOW_TYPE.nodeDesc.compact
    : AGENT_WORKFLOW_TYPE.nodeDesc.desktop;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full max-w-5xl mx-auto block ${className}`}
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
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={markerLen + 2}
          markerHeight={8}
          refX={markerLen}
          refY="4"
          orient="auto"
        >
          <path
            d={`M0 0 L${markerLen} 4 L0 8 Z`}
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
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill="none"
        stroke={palette.border}
        strokeWidth="1"
        rx={DIAGRAM_TOKENS.radius.frame}
      />

      <text
        x={viewBoxWidth / 2}
        y={titleY}
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={titleSize}
        fontWeight={AGENT_WORKFLOW_TYPE.diagramTitleWeight}
        fill={palette.brandDark}
      >
        {labels.diagramTitle}
      </text>

      {boxes.map((box, i) => {
        const step = labels.steps[i];
        const rightEdge = box.x + box.w;
        const centerX = box.x + box.w / 2;
        const centerY = box.y + box.h / 2;
        const next = boxes[i + 1];
        const gapCenterX = rightEdge + (isCompactDiagram ? 0 : gap / 2);
        const lblY = box.y - 6;
        const toX = next ? next.x - markerLen : 0;
        const fromX = rightEdge + gapFwd;
        const compactGap = gapFwdCompact;
        const fromY = box.y + box.h + compactGap;
        const toY = next ? next.y - markerLen : 0;
        const isActive = currentStep === i;
        const dimOpacity =
          isInteractive && !isActive
            ? AGENT_WORKFLOW_OPACITY.inactive
            : AGENT_WORKFLOW_OPACITY.active;

        return (
          <g key={i}>
            <g
              opacity={dimOpacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden={isInteractive ? true : undefined}
            >
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={`url(#aw-step-${uid})`}
                stroke={isInteractive && isActive ? palette.brandDark : BRAND}
                strokeWidth={
                  isInteractive && isActive ? 3 : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={centerX}
                y={box.y + Math.round(box.h * 0.38)}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={nodeTitleSize}
                fontWeight={AGENT_WORKFLOW_TYPE.nodeTitleWeight}
                fill="white"
              >
                {step.title}
              </text>
              <text
                x={centerX}
                y={box.y + Math.round(box.h * 0.62)}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={nodeDescSize}
                fontWeight={AGENT_WORKFLOW_TYPE.nodeDescWeight}
                fill="rgba(255,255,255,0.95)"
              >
                {step.desc}
              </text>
            </g>

            {isInteractive && (
              <DiagramStepHitArea
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                radius={DIAGRAM_TOKENS.radius.box}
                onActivate={() => onStepClick?.(i)}
              />
            )}

            {next && (
              <g
                aria-label={`${step.title} → ${labels.steps[i + 1].title}: ${labels.forwardLabels[i]}`}
              >
                {isCompactDiagram ? (
                  <>
                    <line
                      x1={centerX}
                      y1={fromY}
                      x2={centerX}
                      y2={toY}
                      stroke={GREY_FORWARD}
                      strokeWidth={forwardStroke}
                      strokeLinecap="round"
                      markerEnd={`url(#aw-arrow-${uid})`}
                    />
                    <text
                      x={centerX}
                      y={box.y + box.h + 18}
                      textAnchor="middle"
                      fontFamily={DIAGRAM_TOKENS.font}
                      fontSize={AGENT_WORKFLOW_TYPE.edgeLabel}
                      fontWeight={AGENT_WORKFLOW_TYPE.edgeLabelWeight}
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
                      strokeWidth={forwardStroke}
                      strokeLinecap="round"
                      markerEnd={`url(#aw-arrow-${uid})`}
                    />
                    <line
                      x1={gapCenterX}
                      y1={lblY + 2}
                      x2={gapCenterX}
                      y2={centerY - 2}
                      stroke={GREY_FORWARD}
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.5"
                    />
                    <text
                      x={gapCenterX}
                      y={lblY}
                      textAnchor="middle"
                      fontFamily={DIAGRAM_TOKENS.font}
                      fontSize={AGENT_WORKFLOW_TYPE.edgeLabel}
                      fontWeight={AGENT_WORKFLOW_TYPE.edgeLabelWeight}
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

      {/* Start indicator – only under Result (not a second arrowhead) */}
      <circle
        cx={lastCx}
        cy={fbStartY}
        r={startRadius}
        fill={ACCENT}
        stroke={ACCENT_DARK}
        strokeWidth="1.5"
      />
      <path
        d={feedbackPath}
        stroke={ACCENT_DARK}
        strokeWidth={pathStroke}
        strokeDasharray="8 4"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <title>{labels.feedbackTitle}</title>
      </path>
      <polygon
        points={`${firstCx - FB_TIP_W},${fbTriBase} ${firstCx},${fbTipY} ${firstCx + FB_TIP_W},${fbTriBase}`}
        fill={ACCENT_DARK}
      />
      <text
        x={isCompactDiagram ? compactX + 44 : (lastCx + firstCx) / 2}
        y={
          isCompactDiagram
            ? firstBottom + 28
            : feedbackBase + AGENT_WORKFLOW_FEEDBACK.labelOffsetY
        }
        textAnchor={isCompactDiagram ? 'start' : 'middle'}
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={feedbackLabelSize}
        fontWeight="700"
        fill={ACCENT_DARK}
      >
        {labels.feedbackLabel}
      </text>
    </svg>
  );
}
