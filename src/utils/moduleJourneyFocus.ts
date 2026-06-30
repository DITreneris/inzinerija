/**
 * Module 7 action-intro-journey: stable choice ids (locale-independent progress).
 */
import type { JourneyChoice } from '../types/modules';

/** Slide 70 journey choice ids – must match modules.json journeyChoices[].id */
export const M7_JOURNEY_CHOICE_IDS = [
  'pardavimai',
  'rinkodara',
  'it-inzinerija',
  'personalas',
  'vadyba',
  'kita',
] as const;

export type M7JourneyChoiceId = (typeof M7_JOURNEY_CHOICE_IDS)[number];

/** Legacy LT display labels → stable ids (migration from pre-id progress). */
export const M7_JOURNEY_LABEL_TO_ID: Record<string, M7JourneyChoiceId> = {
  Pardavimai: 'pardavimai',
  Rinkodara: 'rinkodara',
  'IT ir inžinerija': 'it-inzinerija',
  Personalas: 'personalas',
  'Vadovai ir specialistai': 'vadyba',
  'Kita sritis': 'kita',
};

export function isM7JourneyChoiceId(value: string): value is M7JourneyChoiceId {
  return (M7_JOURNEY_CHOICE_IDS as readonly string[]).includes(value);
}

/** Normalize stored progress value (legacy label or id) to choice id. */
export function normalizeModuleJourneyFocusId(stored: string): string {
  if (isM7JourneyChoiceId(stored)) return stored;
  return M7_JOURNEY_LABEL_TO_ID[stored] ?? stored;
}

export function findJourneyChoiceByStored(
  choices: JourneyChoice[],
  stored: string | null | undefined
): JourneyChoice | undefined {
  if (!stored) return undefined;
  const id = normalizeModuleJourneyFocusId(stored);
  return (
    choices.find((c) => c.id === id) ?? choices.find((c) => c.label === stored)
  );
}

export function migrateModuleJourneyFocusLabelsToIds(
  focus: Record<number, string> | undefined
): Record<number, string> | undefined {
  if (!focus || Object.keys(focus).length === 0) return focus;
  let changed = false;
  const out: Record<number, string> = {};
  for (const [moduleIdStr, value] of Object.entries(focus)) {
    const moduleId = Number(moduleIdStr);
    const normalized = normalizeModuleJourneyFocusId(value);
    out[moduleId] = normalized;
    if (normalized !== value) changed = true;
  }
  return changed ? out : focus;
}
