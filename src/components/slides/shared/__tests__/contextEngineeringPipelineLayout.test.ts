import { describe, expect, it } from 'vitest';
import {
  ANNOTATION_LANE_X,
  ANNOTATION_RIGHT_PAD,
  BOX_W,
  BOX_X,
  COLORS,
  MAX_BOX_TO_VB_RATIO,
  MIN_ANNOTATION_RIGHT_ROOM,
  NODE_GAP,
  PLACEHOLDER_DASH,
  PLACEHOLDER_STROKE_WIDTH,
  ROUTE_X_RIGHT,
  VB_WIDTH,
  approxLabelWidthPx,
  getAnnotationRightRoom,
  getDiagramUiLabels,
  getPipelineNodes,
  getPromptToLlmPath,
} from '../contextEngineeringPipelineConfig';
import { VERTICAL_FLOW_MIN_GAP } from '../verticalFlowGeometry';

function relativeLuminance(hex: string): number {
  const raw = hex.replace('#', '');
  const n = parseInt(
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw,
    16
  );
  const channels = [16, 8, 0].map((shift) => {
    const c = ((n >> shift) & 255) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(fg: string, bg: string): number {
  const L1 = relativeLuminance(fg);
  const L2 = relativeLuminance(bg);
  const hi = Math.max(L1, L2);
  const lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

describe('contextEngineeringPipelineLayout (B+1)', () => {
  it('keeps BOX_W / VB_WIDTH at or below the hard floor', () => {
    expect(BOX_W / VB_WIDTH).toBeLessThanOrEqual(MAX_BOX_TO_VB_RATIO);
  });

  it('centers the column with equal left/right margins', () => {
    const left = BOX_X;
    const right = VB_WIDTH - BOX_X - BOX_W;
    expect(Math.abs(left - right)).toBeLessThan(1);
  });

  it('reserves annotation right room >= 140px', () => {
    const room = getAnnotationRightRoom();
    expect(room).toBeGreaterThanOrEqual(MIN_ANNOTATION_RIGHT_ROOM);
    expect(VB_WIDTH - ANNOTATION_LANE_X).toBe(room);
  });

  it('places L-path route left of annotation lane (no shared X)', () => {
    expect(ROUTE_X_RIGHT).toBeLessThan(ANNOTATION_LANE_X);
    expect(ROUTE_X_RIGHT).toBeGreaterThan(BOX_X + BOX_W);
  });

  it('fits LT/EN annotation lines inside the lane (+ pad)', () => {
    const edgeSize = 12;
    for (const locale of ['lt', 'en'] as const) {
      const labels = getDiagramUiLabels(locale);
      const lines = [...labels.inputPromptContextLines, labels.llmToolsLabel];
      for (const line of lines) {
        const w = approxLabelWidthPx(line, edgeSize);
        expect(ANNOTATION_LANE_X + w).toBeLessThanOrEqual(
          VB_WIDTH - ANNOTATION_RIGHT_PAD
        );
      }
    }
  });

  it('keeps vertical gap at SCHEME minimum', () => {
    expect(NODE_GAP).toBeGreaterThanOrEqual(VERTICAL_FLOW_MIN_GAP);
  });

  it('routes Prompt→LLM path through ROUTE_X_RIGHT', () => {
    const d = getPromptToLlmPath();
    expect(d).toContain(`H ${ROUTE_X_RIGHT}`);
    expect(d).not.toContain(`H ${ANNOTATION_LANE_X}`);
  });

  it('uses token emerald (not pastel) with AA white text on gradient stops', () => {
    expect(COLORS.emerald.toLowerCase()).toBe('#0f766e');
    expect(contrastRatio('#ffffff', COLORS.emerald)).toBeGreaterThanOrEqual(
      4.5
    );
    expect(
      contrastRatio('#ffffff', COLORS.emeraldLight)
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('badge pill text on light fill meets AA', () => {
    expect(
      contrastRatio(COLORS.badgePillText, COLORS.badgePillBg)
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('defines placeholder stroke constants for prompt-mode slots', () => {
    expect(PLACEHOLDER_STROKE_WIDTH).toBe(1.8);
    expect(PLACEHOLDER_DASH).toBe('5 4');
  });

  it('context node badge strings fit as slot labels inside BOX_W', () => {
    for (const locale of ['lt', 'en'] as const) {
      const nodes = getPipelineNodes(locale);
      const context = nodes.find((n) => n.id === 'context');
      const tools = nodes.find((n) => n.id === 'tools');
      expect(context?.badgeContext).toBeTruthy();
      expect(tools?.badgeTools).toBeTruthy();
      for (const label of [context!.badgeContext!, tools!.badgeTools!]) {
        expect(approxLabelWidthPx(label, 12)).toBeLessThanOrEqual(BOX_W - 16);
      }
    }
  });
});
