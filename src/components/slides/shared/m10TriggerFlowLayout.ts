/** M10 trigger flow geometry (hero). Shell steps = 3 (T/C/A). */
import type { LayoutRect } from './diagramLayoutMath';
import { DIAGRAM_TOKENS } from './diagramTokens';

export const M10_TRIGGER_FLOW_LAYOUT = {
  width: 720,
  height: 292,
  boxW: 148,
  boxH: 58,
  gap: 40,
  yMain: 24,
  x0: 168,
  /** Trigger-type chip strip — sub-block off the ↑ shaft */
  typeChipW: 108,
  typeChipH: 42,
  typeChipGap: 10,
  typeRowY: 210,
  typesLabelY: 232,
  /** Label ends this many px left of the vertical shaft. */
  typesLabelGap: 14,
  typesLabelW: 130,
  typesLabelH: 14,
  /** Chips start this many px right of the shaft. */
  typesChipOffsetX: 16,
} as const;

export const M10_TRIGGER_FLOW_STEP_COUNT = 3 as const;

export function m10TriggerShaftX(): number {
  const L = M10_TRIGGER_FLOW_LAYOUT;
  return L.x0 + L.boxW / 2;
}

/** Header “Paleidiklio tipai” — left of the ↑ connector, not on-stroke. */
export function getM10TriggerTypesLabelRect(): LayoutRect {
  const L = M10_TRIGGER_FLOW_LAYOUT;
  const shaftX = m10TriggerShaftX();
  return {
    x: shaftX - L.typesLabelGap - L.typesLabelW,
    y: L.typesLabelY - L.typesLabelH / 2,
    w: L.typesLabelW,
    h: L.typesLabelH,
  };
}

export function getM10TriggerUpStroke() {
  const L = M10_TRIGGER_FLOW_LAYOUT;
  const shaftX = m10TriggerShaftX();
  return {
    x1: shaftX,
    y1: L.typeRowY,
    x2: shaftX,
    y2: L.yMain + L.boxH,
    strokeWidth: DIAGRAM_TOKENS.stroke.flow,
  };
}
