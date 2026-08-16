/**
 * Belongs-to / config drop — not a process arrow.
 * Horizontal + tip = what happens next.
 * Vertical shaft + T-shelf, no marker = belongs-to (children under parent).
 */
import { DIAGRAM_TOKENS } from './diagramTokens';

export interface HierarchyDropStrokeInput {
  parentCx: number;
  parentBottomY: number;
  headerTopY: number;
  endGap?: number;
  strokeWidth?: number;
}

export interface HierarchyDropStroke {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeWidth: number;
}

export interface HierarchyShelfStrokeInput {
  parentCx: number;
  shelfY: number;
  shelfX1: number;
  shelfX2: number;
  strokeWidth?: number;
}

export function getHierarchyDropStroke({
  parentCx,
  parentBottomY,
  headerTopY,
  endGap = 6,
  strokeWidth = DIAGRAM_TOKENS.stroke.inactive,
}: HierarchyDropStrokeInput): HierarchyDropStroke {
  return {
    x1: parentCx,
    y1: parentBottomY,
    x2: parentCx,
    y2: headerTopY - endGap,
    strokeWidth,
  };
}

/** Horizontal T-shelf over child chips — belongs-to, never a process tip. */
export function getHierarchyShelfStroke({
  parentCx,
  shelfY,
  shelfX1,
  shelfX2,
  strokeWidth = DIAGRAM_TOKENS.stroke.inactive,
}: HierarchyShelfStrokeInput): HierarchyDropStroke {
  void parentCx;
  return {
    x1: shelfX1,
    y1: shelfY,
    x2: shelfX2,
    y2: shelfY,
    strokeWidth,
  };
}
