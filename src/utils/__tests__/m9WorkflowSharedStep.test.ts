import { describe, expect, it, beforeEach } from 'vitest';
import {
  getM9SharedWorkflowStep,
  resetM9SharedWorkflowStep,
  setM9SharedWorkflowStep,
  subscribeM9SharedWorkflowStep,
} from '../m9WorkflowSharedStep';

describe('m9WorkflowSharedStep', () => {
  beforeEach(() => {
    resetM9SharedWorkflowStep();
  });

  it('notifies subscribers when step changes', () => {
    let ticks = 0;
    const unsub = subscribeM9SharedWorkflowStep(() => {
      ticks += 1;
    });
    setM9SharedWorkflowStep(3);
    expect(getM9SharedWorkflowStep()).toBe(3);
    expect(ticks).toBe(1);
    setM9SharedWorkflowStep(3);
    expect(ticks).toBe(1);
    unsub();
  });
});
