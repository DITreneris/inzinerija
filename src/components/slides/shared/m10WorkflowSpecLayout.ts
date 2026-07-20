/** M10 workflow spec snake geometry constants (thin layout SOT). */
export const M10_WORKFLOW_SPEC_LAYOUT = {
  width: 720,
  height: 182,
  boxW: 110,
  boxH: 46,
  gap: 24,
  row1Y: 54,
  row2Y: 118,
} as const;

export const M10_WORKFLOW_SPEC_START_X =
  (M10_WORKFLOW_SPEC_LAYOUT.width -
    (4 * M10_WORKFLOW_SPEC_LAYOUT.boxW + 3 * M10_WORKFLOW_SPEC_LAYOUT.gap)) /
  2;
