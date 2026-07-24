/**
 * LlmArch return-path geometry helper (B3).
 * Pure function – unit-testable without DOM; runtime still feeds getBoundingClientRect().
 */

export interface LlmArchRectLike {
  left: number;
  top: number;
  width: number;
  height: number;
  right: number;
}

export interface LlmArchPoint {
  x: number;
  y: number;
}

/** Route offset past the right edge of tool/DB (px). */
export const LLM_ARCH_RETURN_ROUTE_PAD = 48;

/** Label sits just outside the vertical return shaft. */
export const LLM_ARCH_RETURN_LABEL_X_PAD = 10;

function routeGeometry(
  container: LlmArchRectLike,
  diRect: LlmArchRectLike,
  fromRect: LlmArchRectLike,
  routePad: number
) {
  const startX = fromRect.right - container.left;
  const startY = fromRect.top + fromRect.height / 2 - container.top;
  const endX = diRect.right - container.left;
  const endY = diRect.top + diRect.height / 2 - container.top;
  const routeX = Math.max(startX, endX) + routePad;
  return { startX, startY, endX, endY, routeX };
}

/**
 * Build SVG path from Tool/DB right edge → around → into LLM right edge (return).
 * Coordinates are relative to the container origin.
 */
export function computeReturnPath(
  container: LlmArchRectLike,
  diRect: LlmArchRectLike,
  fromRect: LlmArchRectLike,
  routePad: number = LLM_ARCH_RETURN_ROUTE_PAD
): string {
  const { startX, startY, endX, endY, routeX } = routeGeometry(
    container,
    diRect,
    fromRect,
    routePad
  );
  return `M ${startX} ${startY} L ${routeX} ${startY} L ${routeX} ${endY} L ${endX} ${endY}`;
}

/**
 * Label at midpoint of the vertical return segment, just outside the shaft.
 */
export function getReturnPathLabelPoint(
  container: LlmArchRectLike,
  diRect: LlmArchRectLike,
  fromRect: LlmArchRectLike,
  routePad: number = LLM_ARCH_RETURN_ROUTE_PAD,
  labelXPad: number = LLM_ARCH_RETURN_LABEL_X_PAD
): LlmArchPoint {
  const { startY, endY, routeX } = routeGeometry(
    container,
    diRect,
    fromRect,
    routePad
  );
  return {
    x: routeX + labelXPad,
    y: (startY + endY) / 2,
  };
}

/** True when the horizontal route clears both node right edges (no leftward shortcut). */
export function returnPathRoutesOutside(
  container: LlmArchRectLike,
  diRect: LlmArchRectLike,
  fromRect: LlmArchRectLike,
  routePad: number = LLM_ARCH_RETURN_ROUTE_PAD
): boolean {
  const { startX, endX, routeX } = routeGeometry(
    container,
    diRect,
    fromRect,
    routePad
  );
  return routeX > startX && routeX > endX;
}
