import { describe, it, expect } from 'vitest';
import { canRequestCertificateTier3 } from '../certificateEligibility';
import type { Progress } from '../progress';

function baseProgress(overrides: Partial<Progress> = {}): Progress {
  return {
    completedModules: [],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: {},
    ...overrides,
  };
}

describe('canRequestCertificateTier3', () => {
  it('returns true when modules 7,8,9 completed and module 8 test >= 70', () => {
    expect(
      canRequestCertificateTier3(
        baseProgress({
          completedModules: [7, 8, 9],
          moduleTestScores: { 8: 70 },
        })
      )
    ).toBe(true);
    expect(
      canRequestCertificateTier3(
        baseProgress({
          completedModules: [1, 7, 8, 9],
          moduleTestScores: { 8: 85 },
        })
      )
    ).toBe(true);
  });

  it('returns false when any of 7,8,9 is missing', () => {
    expect(
      canRequestCertificateTier3(
        baseProgress({
          completedModules: [7, 8],
          moduleTestScores: { 8: 100 },
        })
      )
    ).toBe(false);
  });

  it('returns false when module 8 test score < 70', () => {
    expect(
      canRequestCertificateTier3(
        baseProgress({
          completedModules: [7, 8, 9],
          moduleTestScores: { 8: 69 },
        })
      )
    ).toBe(false);
    expect(
      canRequestCertificateTier3(
        baseProgress({
          completedModules: [7, 8, 9],
          moduleTestScores: {},
        })
      )
    ).toBe(false);
  });
});
