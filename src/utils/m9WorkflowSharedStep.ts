/**
 * Shared step index for M9 sk. 93 – schema diagram + copy lab stay in sync.
 */
import { useCallback, useSyncExternalStore } from 'react';

let current = 0;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function getM9SharedWorkflowStep(): number {
  return current;
}

export function setM9SharedWorkflowStep(index: number): void {
  if (index === current) return;
  current = index;
  emit();
}

export function subscribeM9SharedWorkflowStep(
  listener: () => void
): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Test helper – reset between cases. */
export function resetM9SharedWorkflowStep(): void {
  current = 0;
  emit();
}

export function useM9SharedWorkflowStep(totalSteps: number) {
  const currentStep = useSyncExternalStore(
    subscribeM9SharedWorkflowStep,
    getM9SharedWorkflowStep,
    () => 0
  );
  const setCurrentStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSteps) setM9SharedWorkflowStep(index);
    },
    [totalSteps]
  );
  return { currentStep, setCurrentStep };
}
