import { describe, expect, it } from 'vitest';
import {
  computeReturnPath,
  getReturnPathLabelPoint,
  LLM_ARCH_RETURN_LABEL_X_PAD,
  LLM_ARCH_RETURN_ROUTE_PAD,
  LLM_ARCH_RETURN_ROUTE_PAD_COMPACT,
  resolveReturnRoutePad,
  returnPathRoutesOutside,
  type LlmArchRectLike,
} from '../llmArchReturnPath';

function rect(
  left: number,
  top: number,
  width: number,
  height: number
): LlmArchRectLike {
  return { left, top, width, height, right: left + width };
}

describe('llmArchReturnPath', () => {
  const container = rect(0, 0, 560, 420);
  const di = rect(180, 40, 200, 120);
  const tool = rect(200, 200, 160, 100);
  const db = rect(200, 320, 160, 90);

  it('routes outside both node right edges (DB → LLM)', () => {
    expect(returnPathRoutesOutside(container, di, db)).toBe(true);
    const d = computeReturnPath(container, di, db);
    const routeX = Math.max(db.right, di.right) + LLM_ARCH_RETURN_ROUTE_PAD;
    expect(d).toContain(`L ${routeX}`);
    expect(d.startsWith(`M ${db.right}`)).toBe(true);
    expect(d.endsWith(`L ${di.right} ${di.top + di.height / 2}`)).toBe(true);
  });

  it('routes outside for tool → LLM return', () => {
    expect(returnPathRoutesOutside(container, di, tool)).toBe(true);
    const d = computeReturnPath(container, di, tool);
    expect(d).toMatch(/^M \d+/);
    expect(d.split(' L ').length).toBe(4);
  });

  it('keeps horizontal midpoints at node vertical centers', () => {
    const d = computeReturnPath(container, di, db);
    const startY = db.top + db.height / 2;
    const endY = di.top + di.height / 2;
    expect(d).toContain(` ${startY} L `);
    expect(d.endsWith(` ${endY}`)).toBe(true);
  });

  it('anchors return label outside vertical shaft (X > node rights)', () => {
    const label = getReturnPathLabelPoint(container, di, db);
    const routeX = Math.max(db.right, di.right) + LLM_ARCH_RETURN_ROUTE_PAD;
    expect(label.x).toBe(routeX + LLM_ARCH_RETURN_LABEL_X_PAD);
    expect(label.x).toBeGreaterThan(Math.max(di.right, db.right));
    const startY = db.top + db.height / 2;
    const endY = di.top + di.height / 2;
    expect(label.y).toBe((startY + endY) / 2);
  });

  it('uses compact routePad for narrow containers', () => {
    expect(resolveReturnRoutePad(375)).toBe(LLM_ARCH_RETURN_ROUTE_PAD_COMPACT);
    expect(resolveReturnRoutePad(639)).toBe(LLM_ARCH_RETURN_ROUTE_PAD_COMPACT);
    expect(resolveReturnRoutePad(640)).toBe(LLM_ARCH_RETURN_ROUTE_PAD);
    expect(resolveReturnRoutePad(1024)).toBe(LLM_ARCH_RETURN_ROUTE_PAD);

    const narrow = rect(0, 0, 375, 640);
    const diStack = rect(80, 80, 200, 120);
    const dbStack = rect(90, 400, 180, 90);
    const pad = resolveReturnRoutePad(narrow.width);
    const d = computeReturnPath(narrow, diStack, dbStack, pad);
    const routeX =
      Math.max(dbStack.right, diStack.right) +
      LLM_ARCH_RETURN_ROUTE_PAD_COMPACT;
    expect(d).toContain(`L ${routeX}`);
    expect(returnPathRoutesOutside(narrow, diStack, dbStack, pad)).toBe(true);
  });
});
