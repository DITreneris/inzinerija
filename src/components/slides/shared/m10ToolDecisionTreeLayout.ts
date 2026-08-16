/**
 * M10 10.35 tool decision tree – geometry SOT (view stays dumb).
 * I0: longest LT “Office 365 kasdien” at 13px overlaps 144px leaf step
 * (0.62em); 12px edgeLabel fits. Center label must sit above the bus,
 * not on the shared trunk (Make cx === rootCx).
 */
import {
  centerAxisStart,
  equalBoxRowWidth,
  pillRectFromCenter,
  type LayoutRect,
} from './diagramLayoutMath';
import { DIAGRAM_TOKENS } from './diagramTokens';

export const M10_TOOL_TREE_VIEW = { w: 800, h: 340 } as const;

export const M10_TOOL_TREE_ROOT = {
  w: 220,
  h: 48,
  y: 20,
} as const;

export const M10_TOOL_TREE_LEAF = {
  w: 128,
  h: 48,
  y: 250,
} as const;

export const M10_TOOL_TREE_GAP = 16;
export const M10_TOOL_TREE_LEAF_COUNT = 5;

/** Decision-axis size – kit edgeLabel, not stepSub (10). */
export const M10_TOOL_TREE_CRITERION_SIZE =
  DIAGRAM_TOKENS.typography.edgeLabel.size;
export const M10_TOOL_TREE_CRITERION_WEIGHT =
  DIAGRAM_TOKENS.typography.edgeLabel.weight;
export const M10_TOOL_TREE_CRITERION_H = 16;
/** Text anchor (SVG baseline band center) – air under the root, above the bus. */
export const M10_TOOL_TREE_CRITERION_Y = 108;
export const M10_TOOL_TREE_CRITERION_BUS_GAP = 16;
export const M10_TOOL_TREE_STEM_END_GAP = 10;

export const M10_TOOL_TREE_CHAR_EM = 0.62;
export const M10_TOOL_TREE_CRITERION_PAD_X = 8;

/**
 * Local teaching dim for unselected *drops only*.
 * Criteria and leaf cards stay at opacity.active (I2 / I5).
 * Must stay below the LMS inactive floor (0.85) – do not rewrite the token.
 */
export const TREE_DIM_OPACITY = 0.72;

export function m10ToolTreeRootCx(): number {
  return M10_TOOL_TREE_VIEW.w / 2;
}

export function m10ToolTreeRootBottom(): number {
  return M10_TOOL_TREE_ROOT.y + M10_TOOL_TREE_ROOT.h;
}

export function getM10ToolTreeBusY(): number {
  return (
    M10_TOOL_TREE_CRITERION_Y +
    M10_TOOL_TREE_CRITERION_H / 2 +
    M10_TOOL_TREE_CRITERION_BUS_GAP
  );
}

export function getM10ToolTreeStemEndY(): number {
  return (
    M10_TOOL_TREE_CRITERION_Y -
    M10_TOOL_TREE_CRITERION_H / 2 -
    M10_TOOL_TREE_STEM_END_GAP
  );
}

export function getM10ToolTreeCriterionY(): number {
  return M10_TOOL_TREE_CRITERION_Y;
}

export type M10ToolTreeLeafBox = { x: number; cx: number; y: number };

export function buildM10ToolTreeLeaves(
  leafCount: number = M10_TOOL_TREE_LEAF_COUNT
): M10ToolTreeLeafBox[] {
  const rowW = equalBoxRowWidth(
    leafCount,
    M10_TOOL_TREE_LEAF.w,
    M10_TOOL_TREE_GAP
  );
  const startX = centerAxisStart(M10_TOOL_TREE_VIEW.w, rowW);
  return Array.from({ length: leafCount }, (_, i) => {
    const x = startX + i * (M10_TOOL_TREE_LEAF.w + M10_TOOL_TREE_GAP);
    return {
      x,
      cx: x + M10_TOOL_TREE_LEAF.w / 2,
      y: M10_TOOL_TREE_LEAF.y,
    };
  });
}

export function estimateM10ToolTreeCriterionWidth(text: string): number {
  return (
    Math.ceil(
      text.length * M10_TOOL_TREE_CRITERION_SIZE * M10_TOOL_TREE_CHAR_EM
    ) + M10_TOOL_TREE_CRITERION_PAD_X
  );
}

export function getM10ToolTreeCriterionRect(
  index: number,
  text: string,
  leafCount: number = M10_TOOL_TREE_LEAF_COUNT
): LayoutRect {
  const leaf = buildM10ToolTreeLeaves(leafCount)[index];
  if (!leaf) {
    return { x: 0, y: 0, w: 0, h: 0 };
  }
  return pillRectFromCenter(
    leaf.cx,
    M10_TOOL_TREE_CRITERION_Y,
    estimateM10ToolTreeCriterionWidth(text),
    M10_TOOL_TREE_CRITERION_H
  );
}

export function getM10ToolTreeTrunkStroke() {
  const x = m10ToolTreeRootCx();
  return {
    x1: x,
    y1: m10ToolTreeRootBottom(),
    x2: x,
    y2: getM10ToolTreeStemEndY(),
    strokeWidth: DIAGRAM_TOKENS.stroke.flow,
  };
}

export function getM10ToolTreeBusStroke(
  leafCount: number = M10_TOOL_TREE_LEAF_COUNT
) {
  const leaves = buildM10ToolTreeLeaves(leafCount);
  const first = leaves[0];
  const last = leaves[leaves.length - 1];
  const y = getM10ToolTreeBusY();
  return {
    x1: first?.cx ?? 0,
    y1: y,
    x2: last?.cx ?? 0,
    y2: y,
    strokeWidth: DIAGRAM_TOKENS.stroke.flow,
  };
}

export function getM10ToolTreeDropStroke(
  index: number,
  leafCount: number = M10_TOOL_TREE_LEAF_COUNT
) {
  const leaf = buildM10ToolTreeLeaves(leafCount)[index];
  const tip = DIAGRAM_TOKENS.arrow.processTipLen;
  const y1 = getM10ToolTreeBusY();
  const y2 = (leaf?.y ?? M10_TOOL_TREE_LEAF.y) - tip;
  return {
    x1: leaf?.cx ?? 0,
    y1,
    x2: leaf?.cx ?? 0,
    y2,
    strokeWidth: DIAGRAM_TOKENS.stroke.flow,
  };
}
