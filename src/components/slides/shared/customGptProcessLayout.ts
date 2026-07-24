/**
 * Custom GPT process – geometry SOT (desktop branch 7|8 + compact linear).
 * Diagram view reads only; do not invent coordinates in the SVG component.
 * Micro polish: after SVG subtitle removal, spine Y shifted up ~10px (gaps stay 28).
 */
import { DIAGRAM_TOKENS } from './diagramTokens';

/** Forward tip – LMS processTipLen; refX=0 → tipas už koto. */
export const CUSTOM_GPT_ARROW_TIP_LEN = DIAGRAM_TOKENS.arrow.processTipLen;
/** Feedback tip – RlProcess FB_TIP_*; oras iki bloko ~3 (ne 8 – floating). */
export const CUSTOM_GPT_FB_TIP_H = 12;
export const CUSTOM_GPT_FB_TIP_W = 8;
export const CUSTOM_GPT_FB_GAP = 3;

export type CustomGptStepBox = [number, number, number, number];

export interface CustomGptDiagramLayout {
  viewBox: string;
  width: number;
  height: number;
  centerX: number;
  stepBoxes: CustomGptStepBox[];
  compact: boolean;
  /** Desktop branch trough Y (between step 6 and 7/8). */
  branchY?: number;
  /** Feedback outer rail X (right of step 8). */
  feedbackRailX?: number;
}

/** Desktop: startY 68 (was 78); spine gap 28; branch/leaves −10. */
export const DESKTOP_LAYOUT: CustomGptDiagramLayout = {
  viewBox: '0 0 560 690',
  width: 560,
  height: 690,
  centerX: 280,
  stepBoxes: [
    [140, 68, 280, 56],
    [140, 152, 280, 56],
    [140, 236, 280, 56],
    [140, 320, 280, 56],
    [140, 404, 280, 56],
    [140, 488, 280, 56],
    [80, 602, 160, 52],
    [320, 602, 160, 52],
  ],
  compact: false,
  branchY: 578,
  feedbackRailX: 500,
};

/** Compact: startY 60 (was 70); spine gap 22/74; all −10. */
export const COMPACT_LAYOUT: CustomGptDiagramLayout = {
  viewBox: '0 0 360 770',
  width: 360,
  height: 770,
  centerX: 180,
  stepBoxes: [
    [30, 60, 300, 52],
    [30, 134, 300, 52],
    [30, 208, 300, 52],
    [30, 282, 300, 52],
    [30, 356, 300, 52],
    [30, 430, 300, 52],
    [30, 542, 300, 52],
    [30, 616, 300, 52],
  ],
  compact: true,
};

/** Vertical gap between consecutive spine boxes (desktop / compact). */
export function customGptSpineGap(
  layout: CustomGptDiagramLayout,
  fromIndex: number
): number {
  const a = layout.stepBoxes[fromIndex];
  const b = layout.stepBoxes[fromIndex + 1];
  return b[1] - (a[1] + a[3]);
}

/** Visible forward shaft length (gap − tip) – must stay ≥ minStem. */
export function customGptForwardStem(
  layout: CustomGptDiagramLayout,
  fromIndex: number
): number {
  return customGptSpineGap(layout, fromIndex) - CUSTOM_GPT_ARROW_TIP_LEN;
}
