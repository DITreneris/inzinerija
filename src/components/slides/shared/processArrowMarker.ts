/**
 * LMS process forward arrow tip geometry (SCHEME §3.2).
 * Contract: tipLen ≥10, refX=0, line end = target edge − tipLen.
 * Do not change DIAGRAM_TOKENS.arrow.markerLen (legacy 6).
 */
import { DIAGRAM_TOKENS } from './diagramTokens';

export function processArrowTipLen(
  tipLen: number = DIAGRAM_TOKENS.arrow.processTipLen
): number {
  return tipLen;
}

export function processArrowTipH(
  tipLen: number = DIAGRAM_TOKENS.arrow.processTipLen
): number {
  return tipLen * 0.9;
}

export interface ProcessArrowMarkerGeom {
  tipLen: number;
  tipH: number;
  markerUnits: typeof DIAGRAM_TOKENS.arrow.markerUnits;
  markerWidth: number;
  markerHeight: number;
  /** Always 0 – tip sits past the path endpoint. */
  refX: 0;
  refY: number;
  pathD: string;
}

/**
 * SVG `<marker>` geometry for process forward arrows.
 * Caller supplies fill/stroke on the path; pass unique `id` in the diagram.
 */
export function getProcessArrowMarkerGeom(
  tipLen: number = DIAGRAM_TOKENS.arrow.processTipLen
): ProcessArrowMarkerGeom {
  const tipH = processArrowTipH(tipLen);
  return {
    tipLen,
    tipH,
    markerUnits: DIAGRAM_TOKENS.arrow.markerUnits,
    markerWidth: tipLen,
    markerHeight: tipH,
    refX: 0,
    refY: tipH / 2,
    pathD: `M0 0 L${tipLen} ${tipH / 2} L0 ${tipH} Z`,
  };
}

/** Path/line endpoint inset so apex touches the target edge when refX=0. */
export function processArrowEndInset(
  tipLen: number = DIAGRAM_TOKENS.arrow.processTipLen
): number {
  return tipLen;
}
