/**
 * M9 kit checklist + badge persistence (localStorage; soft artefact gate).
 */
import { logError } from './logger';

const STORAGE_KEY = 'm9_kit_checklist_v1';

export type M9KitChecklistState = {
  catalog: boolean;
  csv: boolean;
  summary: boolean;
  reliability: boolean;
};

const DEFAULT: M9KitChecklistState = {
  catalog: false,
  csv: false,
  summary: false,
  reliability: false,
};

export function loadM9KitChecklist(): M9KitChecklistState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT };
    const parsed = JSON.parse(raw) as Partial<M9KitChecklistState>;
    return {
      catalog: Boolean(parsed.catalog),
      csv: Boolean(parsed.csv),
      summary: Boolean(parsed.summary),
      reliability: Boolean(parsed.reliability),
    };
  } catch (e) {
    logError(e instanceof Error ? e : new Error(String(e)), {
      feature: 'm9_kit_checklist',
      op: 'load',
    });
    return { ...DEFAULT };
  }
}

export function saveM9KitChecklist(state: M9KitChecklistState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    logError(e instanceof Error ? e : new Error(String(e)), {
      feature: 'm9_kit_checklist',
      op: 'save',
    });
  }
}

export function isM9KitComplete(state: M9KitChecklistState): boolean {
  return state.catalog && state.csv && state.summary && state.reliability;
}

/** Badge «Duomenys paruošti» when practices 93.1 + 93.2 completed */
export function hasM9DataReadyBadge(
  completedTaskIds: number[] | undefined
): boolean {
  const set = new Set(completedTaskIds ?? []);
  return set.has(93.1) && set.has(93.2);
}
