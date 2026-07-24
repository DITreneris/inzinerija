import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import {
  COMPACT_LAYOUT,
  CUSTOM_GPT_ARROW_TIP_LEN,
  CUSTOM_GPT_FB_GAP,
  CUSTOM_GPT_FB_TIP_H,
  DESKTOP_LAYOUT,
  customGptForwardStem,
  customGptSpineGap,
} from '../customGptProcessLayout';

const diagramSrc = readFileSync(
  join(
    dirname(fileURLToPath(import.meta.url)),
    '../CustomGptProcessDiagram.tsx'
  ),
  'utf8'
);

describe('CustomGptProcessDiagram arrow geometry', () => {
  it('desktop spine gaps leave visible shaft after tip (≥ minStem)', () => {
    for (let i = 0; i < 5; i += 1) {
      const gap = customGptSpineGap(DESKTOP_LAYOUT, i);
      const stem = customGptForwardStem(DESKTOP_LAYOUT, i);
      expect(gap).toBe(28);
      expect(stem).toBeGreaterThanOrEqual(DIAGRAM_TOKENS.verticalFlow.minStem);
      expect(CUSTOM_GPT_ARROW_TIP_LEN).toBeGreaterThanOrEqual(10);
    }
  });

  it('compact spine gaps leave visible shaft after tip (≥ minStem)', () => {
    for (let i = 0; i < 5; i += 1) {
      const stem = customGptForwardStem(COMPACT_LAYOUT, i);
      expect(stem).toBeGreaterThanOrEqual(DIAGRAM_TOKENS.verticalFlow.minStem);
    }
    expect(customGptForwardStem(COMPACT_LAYOUT, 5)).toBeGreaterThanOrEqual(
      DIAGRAM_TOKENS.verticalFlow.minStem
    );
    expect(customGptForwardStem(COMPACT_LAYOUT, 6)).toBeGreaterThanOrEqual(
      DIAGRAM_TOKENS.verticalFlow.minStem
    );
  });

  it('desktop branch stems to 7/8 keep tip outside the box', () => {
    const branchY = DESKTOP_LAYOUT.branchY!;
    const tipReserve = CUSTOM_GPT_ARROW_TIP_LEN;
    for (const box of [
      DESKTOP_LAYOUT.stepBoxes[6],
      DESKTOP_LAYOUT.stepBoxes[7],
    ]) {
      const stem = box[1] - tipReserve - branchY;
      expect(stem).toBeGreaterThanOrEqual(DIAGRAM_TOKENS.verticalFlow.minStem);
    }
  });

  it('feedback tip sits just outside Konfigūracija (gap ~3, not floating 8+)', () => {
    const config = DESKTOP_LAYOUT.stepBoxes[3];
    const configRight = config[0] + config[2];
    const tipX = configRight + CUSTOM_GPT_FB_GAP;
    const tipBaseX = tipX + CUSTOM_GPT_FB_TIP_H;
    expect(CUSTOM_GPT_FB_GAP).toBeLessThanOrEqual(4);
    expect(tipX).toBeGreaterThan(configRight);
    expect(tipBaseX - tipX).toBe(CUSTOM_GPT_FB_TIP_H);
    expect(tipBaseX).toBeLessThan(DESKTOP_LAYOUT.feedbackRailX!);
  });

  it('LMS 1A stop-list: source has no glow / feDropShadow filter', () => {
    expect(diagramSrc).not.toMatch(/feDropShadow/);
    expect(diagramSrc).not.toMatch(/id=\{`glow-/);
    expect(CUSTOM_GPT_ARROW_TIP_LEN).toBeGreaterThanOrEqual(10);
  });
});
