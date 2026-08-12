import { useCallback, useSyncExternalStore } from 'react';

export interface LabInteraction {
  choices?: Record<string, string>;
  checks?: Record<string, boolean>;
  flags?: Record<string, boolean>;
  fields?: Record<string, string>;
  stepIndex?: number;
  updatedAt: string;
}

export type LabInteractions = Record<string, LabInteraction>;
export type LabInteractionPatch = Omit<Partial<LabInteraction>, 'updatedAt'>;

const listeners = new Set<() => void>();
let interactions: LabInteractions = {};

function emit() {
  for (const listener of listeners) listener();
}

function cloneInteractions(
  value: LabInteractions | undefined
): LabInteractions {
  return value ? { ...value } : {};
}

export function subscribeLabInteractions(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getLabInteractionsSnapshot(): LabInteractions {
  return interactions;
}

export function hydrateLabInteractions(
  next: LabInteractions | undefined
): void {
  const normalized = cloneInteractions(next);
  if (JSON.stringify(normalized) === JSON.stringify(interactions)) return;
  interactions = normalized;
  emit();
}

export function setLabInteraction(
  labId: string,
  patch: LabInteractionPatch
): void {
  const current = interactions[labId] ?? {
    updatedAt: new Date().toISOString(),
  };
  const next: LabInteraction = {
    ...current,
    ...patch,
    choices: patch.choices !== undefined ? patch.choices : current.choices,
    checks: patch.checks !== undefined ? patch.checks : current.checks,
    flags: patch.flags !== undefined ? patch.flags : current.flags,
    fields: patch.fields !== undefined ? patch.fields : current.fields,
    stepIndex:
      patch.stepIndex !== undefined ? patch.stepIndex : current.stepIndex,
    updatedAt: new Date().toISOString(),
  };

  interactions = {
    ...interactions,
    [labId]: next,
  };
  emit();
}

export function resetLabInteractions(): void {
  interactions = {};
  emit();
}

export function useLabState(labId: string) {
  const snapshot = useSyncExternalStore(
    subscribeLabInteractions,
    getLabInteractionsSnapshot,
    getLabInteractionsSnapshot
  );
  const patch = useCallback(
    (next: LabInteractionPatch) => setLabInteraction(labId, next),
    [labId]
  );

  return [snapshot[labId], patch] as const;
}
