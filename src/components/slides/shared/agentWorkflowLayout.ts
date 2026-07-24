/**
 * Agentų ciklo (M10.2) geometrijos SOT – cycle-feedback **type etalon**.
 * Semantika: agentWorkflowContent.ts
 * Shared math: cycleFeedbackGeometry.ts / diagramLayoutMath.ts
 * @see docs/development/LMS_DIAGRAM_POLISH_10_2.md
 */
import { DIAGRAM_TOKENS } from './diagramTokens';
import {
  horizontalRowBoxes,
  horizontalRowMarginsEqual,
} from './cycleFeedbackGeometry';
import { equalBoxRowWidth, visibleShaftLen } from './diagramLayoutMath';

export const AGENT_WORKFLOW_STEP_COUNT = 5;

export const AGENT_WORKFLOW_VIEWBOX = {
  /** W fits 5×188 + 4×32 + equal side margins; H I3c crop */
  desktop: { width: 1100, height: 248 },
  compact: { width: 360, height: 540 },
} as const;

export const AGENT_WORKFLOW_BOX = {
  desktop: { w: 188, h: 88 },
  compact: { w: 228, h: 70 },
} as const;

export const AGENT_WORKFLOW_GAP = {
  desktop: 32,
  compact: 30,
} as const;

/** Desktop row width (boxes + gaps, no side margins). */
export function agentWorkflowDesktopRowWidth(): number {
  return equalBoxRowWidth(
    AGENT_WORKFLOW_STEP_COUNT,
    AGENT_WORKFLOW_BOX.desktop.w,
    AGENT_WORKFLOW_GAP.desktop
  );
}

/** Etalon: equal left/right margin inside viewBox. */
export function agentWorkflowDesktopStartX(): number {
  const boxes = buildAgentWorkflowDesktopBoxes();
  return boxes[0]?.x ?? 0;
}

export const AGENT_WORKFLOW_START = {
  /** x derived via horizontalRowBoxes; y is layout SOT */
  desktop: { y: 40 },
  /** Compact column already centered: (360 − 228) / 2 = 66 */
  compact: { x: 66, y: 44 },
} as const;

/** Feedback loop Y (desktop) / X gutter (compact). */
export const AGENT_WORKFLOW_FEEDBACK = {
  /** I3c: tighter U under the row */
  desktopY: () =>
    AGENT_WORKFLOW_START.desktop.y + AGENT_WORKFLOW_BOX.desktop.h + 28,
  compactX: 34,
  tipH: 12,
  tipW: 8,
  cornerR: 16,
  gapAboveBlock: 2,
  arrowGapFb: 10,
  pathStroke: DIAGRAM_TOKENS.stroke.feedback,
  startRadius: 5,
  labelSize: 14,
  labelOffsetY: 14,
} as const;

export const AGENT_WORKFLOW_ARROW = {
  /** Desktop forward starts at box edge (RlProcess); compact still uses small gap. */
  gapFwd: 0,
  gapFwdCompact: 5,
  markerLen: DIAGRAM_TOKENS.arrow.markerLen,
  forwardStroke: DIAGRAM_TOKENS.stroke.flow,
} as const;

export const AGENT_WORKFLOW_TYPE = {
  /** Caption under slide H1 – readable, not competing (weight 700 in SVG). */
  diagramTitle: {
    desktop: DIAGRAM_TOKENS.typography.title.desktop,
    compact: DIAGRAM_TOKENS.typography.title.compact,
  },
  diagramTitleY: {
    desktop: 20,
    compact: 20,
  },
  diagramTitleWeight: DIAGRAM_TOKENS.typography.titleWeight,

  nodeTitle: {
    desktop: DIAGRAM_TOKENS.typography.rolesHub.label.desktop,
    compact: DIAGRAM_TOKENS.typography.rolesHub.label.compact,
  },
  nodeDesc: {
    desktop: DIAGRAM_TOKENS.typography.stepLabel.desktop,
    compact: DIAGRAM_TOKENS.typography.stepLabel.compact,
  },
  nodeTitleWeight: 700,
  nodeDescWeight: 500,
  edgeLabel: DIAGRAM_TOKENS.typography.edgeLabel.size,
  edgeLabelWeight: DIAGRAM_TOKENS.typography.edgeLabel.weight,
} as const;

export const AGENT_WORKFLOW_OPACITY = {
  active: DIAGRAM_TOKENS.opacity.active,
  inactive: DIAGRAM_TOKENS.opacity.inactive,
} as const;

export interface AgentWorkflowBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function buildAgentWorkflowDesktopBoxes(): AgentWorkflowBox[] {
  return horizontalRowBoxes({
    count: AGENT_WORKFLOW_STEP_COUNT,
    boxW: AGENT_WORKFLOW_BOX.desktop.w,
    boxH: AGENT_WORKFLOW_BOX.desktop.h,
    gap: AGENT_WORKFLOW_GAP.desktop,
    viewBoxW: AGENT_WORKFLOW_VIEWBOX.desktop.width,
    rowY: AGENT_WORKFLOW_START.desktop.y,
  });
}

export function buildAgentWorkflowCompactBoxes(): AgentWorkflowBox[] {
  const { w, h } = AGENT_WORKFLOW_BOX.compact;
  const gap = AGENT_WORKFLOW_GAP.compact;
  const { x, y: startY } = AGENT_WORKFLOW_START.compact;
  return Array.from({ length: AGENT_WORKFLOW_STEP_COUNT }, (_, i) => ({
    x,
    y: startY + (h + gap) * i,
    w,
    h,
  }));
}

/** Last box right edge must fit viewBox (desktop). */
export function agentWorkflowDesktopFitsViewBox(): boolean {
  const boxes = buildAgentWorkflowDesktopBoxes();
  const last = boxes[boxes.length - 1];
  return last.x + last.w <= AGENT_WORKFLOW_VIEWBOX.desktop.width;
}

/** Left/right margins equal (etalon centering). */
export function agentWorkflowDesktopMarginsEqual(tolerance = 1): boolean {
  return horizontalRowMarginsEqual(
    buildAgentWorkflowDesktopBoxes(),
    AGENT_WORKFLOW_VIEWBOX.desktop.width,
    tolerance
  );
}

/** Visible forward shaft length (gap minus marker). */
export function agentWorkflowForwardShaftLen(): number {
  return visibleShaftLen(
    AGENT_WORKFLOW_GAP.desktop,
    AGENT_WORKFLOW_ARROW.markerLen
  );
}
