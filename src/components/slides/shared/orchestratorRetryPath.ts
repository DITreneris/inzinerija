/**
 * M10 orchestrator retry-path geometry (W7 / v06).
 * Left U: evaluator → gutter (between tools & eval) → orchestrator.
 * Not cycle feedbackUPath.
 */
import { DIAGRAM_TOKENS } from './diagramTokens';

export interface OrchestratorBoxLike {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrchestratorPoint {
  x: number;
  y: number;
}

/** LMS process tip – DIAGRAM_TOKENS.arrow.processTipLen (not legacy markerLen). */
export const ORCHESTRATOR_ARROW_TIP_LEN = DIAGRAM_TOKENS.arrow.processTipLen;

/** Fallback desktop gutter (prefer getOrchestratorRetryRouteXDesktop). */
export const ORCHESTRATOR_RETRY_ROUTE_X_DESKTOP = 14;
export const ORCHESTRATOR_RETRY_ROUTE_X_COMPACT = 28;
export const ORCHESTRATOR_RETRY_LABEL_X_PAD = 8;
export const ORCHESTRATOR_RETRY_TOOLS_GUTTER = 12;

function leftAnchor(box: OrchestratorBoxLike): OrchestratorPoint {
  return { x: box.x, y: box.y + box.h / 2 };
}

/** Shorten line end so tip (refX=0) meets the target edge from outside. */
export function shortenToTip(
  from: OrchestratorPoint,
  to: OrchestratorPoint,
  tipLen: number = ORCHESTRATOR_ARROW_TIP_LEN
): OrchestratorPoint {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x: to.x - ux * tipLen,
    y: to.y - uy * tipLen,
  };
}

function retryPath(
  from: OrchestratorBoxLike,
  to: OrchestratorBoxLike,
  leftX: number,
  tipLen: number
): string {
  const start = leftAnchor(from);
  const end = leftAnchor(to);
  const endAdj = shortenToTip({ x: leftX, y: end.y }, end, tipLen);
  return `M ${start.x} ${start.y} L ${leftX} ${start.y} L ${leftX} ${endAdj.y} L ${endAdj.x} ${endAdj.y}`;
}

/**
 * Desktop retry shaft X: between Įrankiai right edge and Vertintojas
 * (does not wrap the far-left / tools column).
 */
export function getOrchestratorRetryRouteXDesktop(
  tools: OrchestratorBoxLike,
  evaluator: OrchestratorBoxLike
): number {
  const afterTools = tools.x + tools.w + ORCHESTRATOR_RETRY_TOOLS_GUTTER;
  const beforeEval = evaluator.x - ORCHESTRATOR_RETRY_TOOLS_GUTTER;
  if (afterTools < beforeEval) return afterTools;
  return Math.max(
    ORCHESTRATOR_RETRY_ROUTE_X_DESKTOP,
    (tools.x + tools.w + evaluator.x) / 2
  );
}

/** Desktop: evaluator left → tools/eval gutter → orchestrator left. */
export function getOrchestratorRetryPathDesktop(
  from: OrchestratorBoxLike,
  to: OrchestratorBoxLike,
  leftX: number = ORCHESTRATOR_RETRY_ROUTE_X_DESKTOP,
  tipLen: number = ORCHESTRATOR_ARROW_TIP_LEN
): string {
  return retryPath(from, to, leftX, tipLen);
}

/** Compact: same left U with wider gutter. */
export function getOrchestratorRetryPathCompact(
  from: OrchestratorBoxLike,
  to: OrchestratorBoxLike,
  leftX: number = ORCHESTRATOR_RETRY_ROUTE_X_COMPACT,
  tipLen: number = ORCHESTRATOR_ARROW_TIP_LEN
): string {
  return retryPath(from, to, leftX, tipLen);
}

/** Label just right of the vertical retry shaft. */
export function getOrchestratorRetryLabelPoint(
  from: OrchestratorBoxLike,
  to: OrchestratorBoxLike,
  leftX: number,
  labelXPad: number = ORCHESTRATOR_RETRY_LABEL_X_PAD
): OrchestratorPoint {
  const start = leftAnchor(from);
  const end = leftAnchor(to);
  return {
    x: leftX + labelXPad,
    y: (start.y + end.y) / 2,
  };
}

/** Tip end sits left of hub left edge (outside the box). */
export function retryTipOutsideHub(
  _from: OrchestratorBoxLike,
  to: OrchestratorBoxLike,
  leftX: number,
  tipLen: number = ORCHESTRATOR_ARROW_TIP_LEN
): boolean {
  const end = leftAnchor(to);
  const endAdj = shortenToTip({ x: leftX, y: end.y }, end, tipLen);
  return endAdj.x < to.x && leftX < to.x;
}
