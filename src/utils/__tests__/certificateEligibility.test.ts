import { describe, it, expect } from 'vitest';
import {
  canRequestCertificateTier3,
  canRequestCertificateTier4,
  canRequestCertificateTier5,
} from '../certificateEligibility';
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

describe('canRequestCertificateTier4', () => {
  it('returns true when modules 10,11,12 completed and module 11 test >= 70', () => {
    expect(
      canRequestCertificateTier4(
        baseProgress({
          completedModules: [10, 11, 12],
          moduleTestScores: { 11: 70 },
        })
      )
    ).toBe(true);
  });

  it('returns false when path modules or module 11 test gate are missing', () => {
    expect(
      canRequestCertificateTier4(
        baseProgress({
          completedModules: [10, 11],
          moduleTestScores: { 11: 90 },
        })
      )
    ).toBe(false);
    expect(
      canRequestCertificateTier4(
        baseProgress({
          completedModules: [10, 11, 12],
          moduleTestScores: { 11: 69 },
        })
      )
    ).toBe(false);
  });
});

describe('canRequestCertificateTier5', () => {
  it('returns true when modules 13,14,15 completed and module 14 test >= 70', () => {
    expect(
      canRequestCertificateTier5(
        baseProgress({
          completedModules: [13, 14, 15],
          moduleTestScores: { 14: 70 },
        })
      )
    ).toBe(true);
  });

  it('returns false when path modules or module 14 test gate are missing', () => {
    expect(
      canRequestCertificateTier5(
        baseProgress({
          completedModules: [13, 14],
          moduleTestScores: { 14: 90 },
        })
      )
    ).toBe(false);
    expect(
      canRequestCertificateTier5(
        baseProgress({
          completedModules: [13, 14, 15],
          moduleTestScores: { 14: 69 },
        })
      )
    ).toBe(false);
  });
});
