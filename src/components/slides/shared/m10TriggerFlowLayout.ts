/** M10 trigger flow geometry constants (thin layout SOT). Shell steps = 3 (T/C/A). */
export const M10_TRIGGER_FLOW_LAYOUT = {
  width: 640,
  height: 236,
  boxW: 118,
  boxH: 52,
  gap: 28,
  yMain: 48,
  x0: 52,
  /** Trigger-type chip strip under Trigger */
  typeChipW: 72,
  typeChipH: 28,
  typeChipGap: 8,
  typeRowY: 160,
  typesLabelY: 144,
} as const;

export const M10_TRIGGER_FLOW_STEP_COUNT = 3 as const;
