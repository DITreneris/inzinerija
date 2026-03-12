import { useState, useCallback } from 'react';

export interface StepExplanation {
  title: string;
  body: string;
}

/**
 * Shared state for step-based diagram blocks (RL, Turinio, Schema3, etc.).
 * Returns current step index, setter, current step data, and total count.
 */
export function useStepDiagram(steps: StepExplanation[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep] ?? steps[0];
  const totalSteps = steps.length;
  const setStep = useCallback((index: number) => {
    setCurrentStep((prev) => (index >= 0 && index < steps.length ? index : prev));
  }, [steps.length]);
  return { currentStep, setCurrentStep: setStep, step, totalSteps };
}
