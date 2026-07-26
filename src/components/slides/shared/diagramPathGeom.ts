/**
 * Shared SVG path tip inset for LMS process markers (refX=0).
 * Prefer this over local shortenToTip / getLineEnd copies in M10/M12 layouts.
 */
import { DIAGRAM_TOKENS } from './diagramTokens';

export interface DiagramPoint {
  x: number;
  y: number;
}

/** LMS process tip – DIAGRAM_TOKENS.arrow.processTipLen (not legacy markerLen). */
export const DIAGRAM_PROCESS_TIP_LEN = DIAGRAM_TOKENS.arrow.processTipLen;

/**
 * Shorten line end so tip (refX=0) meets the target edge from outside.
 */
export function shortenToTip(
  from: DiagramPoint,
  to: DiagramPoint,
  tipLen: number = DIAGRAM_PROCESS_TIP_LEN
): DiagramPoint {
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
