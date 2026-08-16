/** M10 trigger flow geometry (hero). Shell steps = 3 (T/C/A). */
import type { LayoutRect } from './diagramLayoutMath';
import {
  getHierarchyDropStroke,
  getHierarchyShelfStroke,
} from './hierarchyDropGeometry';

/** Between inactive (1.5) and process flow (3.5) — belongs-to, not a stream. */
const HIERARCHY_STROKE = 2.5;
const LABEL_SHAFT_GAP = 8;
const SHELF_ABOVE_CHIPS = 8;

export const M10_TRIGGER_FLOW_LAYOUT = {
  width: 720,
  height: 214,
  boxW: 148,
  boxH: 58,
  gap: 40,
  yMain: 24,
  x0: 168,
  /** Trigger-type chips — config strip under Paleidiklis, not a process row */
  typeChipW: 108,
  typeChipH: 42,
  typeChipGap: 12,
  typeRowY: 140,
  /** Header left of the shaft, beside the stem (not on-axis). */
  typesLabelY: 107,
  typesLabelW: 150,
  typesLabelH: 16,
  /** Hierarchy drop (belongs-to), not a process arrow. */
  hierarchyStroke: HIERARCHY_STROKE,
  hierarchyEndGap: 0,
  labelShaftGap: LABEL_SHAFT_GAP,
  shelfAboveChips: SHELF_ABOVE_CHIPS,
} as const;

export const M10_TRIGGER_FLOW_STEP_COUNT = 3 as const;

export function m10TriggerShaftX(): number {
  const L = M10_TRIGGER_FLOW_LAYOUT;
  return L.x0 + L.boxW / 2;
}

export function m10TriggerTypeRowWidth(): number {
  const L = M10_TRIGGER_FLOW_LAYOUT;
  return 3 * L.typeChipW + 2 * L.typeChipGap;
}

/** Chip strip centered on Paleidiklis, not shifted off-shaft. */
export function m10TriggerTypeChipsX(): number {
  return m10TriggerShaftX() - m10TriggerTypeRowWidth() / 2;
}

export function getM10TriggerHierarchyShelfY(): number {
  return (
    M10_TRIGGER_FLOW_LAYOUT.typeRowY - M10_TRIGGER_FLOW_LAYOUT.shelfAboveChips
  );
}

/** Header “Paleidiklio tipas” — left of the shaft, clear of stem and shelf. */
export function getM10TriggerTypesLabelRect(): LayoutRect {
  const L = M10_TRIGGER_FLOW_LAYOUT;
  const shaftX = m10TriggerShaftX();
  return {
    x: shaftX - L.labelShaftGap - L.typesLabelW,
    y: L.typesLabelY - L.typesLabelH / 2,
    w: L.typesLabelW,
    h: L.typesLabelH,
  };
}

/** Local teaching dim for the config strip — do not lower global inactive. */
export const M10_TRIGGER_TYPES_ORPHAN_OPACITY = 0.4;

/** Downward belongs-to shaft: Paleidiklis bottom → T-shelf. */
export function getM10TriggerHierarchyStroke() {
  const L = M10_TRIGGER_FLOW_LAYOUT;
  return getHierarchyDropStroke({
    parentCx: m10TriggerShaftX(),
    parentBottomY: L.yMain + L.boxH,
    headerTopY: getM10TriggerHierarchyShelfY(),
    endGap: L.hierarchyEndGap,
    strokeWidth: L.hierarchyStroke,
  });
}

/** T-shelf over the three type chips — belongs-to, no process tip. */
export function getM10TriggerHierarchyShelf() {
  const L = M10_TRIGGER_FLOW_LAYOUT;
  const chipsX = m10TriggerTypeChipsX();
  return getHierarchyShelfStroke({
    parentCx: m10TriggerShaftX(),
    shelfY: getM10TriggerHierarchyShelfY(),
    shelfX1: chipsX,
    shelfX2: chipsX + m10TriggerTypeRowWidth(),
    strokeWidth: L.hierarchyStroke,
  });
}
