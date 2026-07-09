import { describe, expect, it } from 'vitest';
import {
  getCertificateArtifacts,
  getEarnedCertificateTiers,
  getEarnedHandoutArtifacts,
  getEarnedHandoutModuleIds,
  getHandoutArtifacts,
  getHandoutForModuleComplete,
} from '../completionArtifactsLoader';
import { hasHandoutArtifactAction } from '../../utils/handoutArtifactActions';
import type { Progress } from '../../utils/progress';

function progress(overrides: Partial<Progress> = {}): Progress {
  return {
    completedModules: [],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: {},
    ...overrides,
  };
}

describe('completionArtifacts registry', () => {
  it('keeps every handout wired to a download action', () => {
    const artifacts = getHandoutArtifacts();
    expect(artifacts.map((artifact) => artifact.key)).toEqual([
      'm1',
      'm4',
      'm5',
      'm6',
      'm79',
    ]);
    for (const artifact of artifacts) {
      expect(hasHandoutArtifactAction(artifact.key), artifact.key).toBe(true);
    }
  });

  it('keeps earned handout modules aligned with current product behavior', () => {
    expect(getEarnedHandoutModuleIds([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
      1, 4, 5, 6, 9,
    ]);
    expect(getEarnedHandoutArtifacts([1, 2, 3, 4]).map((a) => a.key)).toEqual([
      'm1',
      'm4',
    ]);
  });

  it('keeps module completion handouts separate from the M5 test-results handout', () => {
    expect(getHandoutForModuleComplete(1)?.key).toBe('m1');
    expect(getHandoutForModuleComplete(4)?.key).toBe('m4');
    expect(getHandoutForModuleComplete(5)).toBeNull();
    expect(getHandoutForModuleComplete(6)?.key).toBe('m6');
    expect(getHandoutForModuleComplete(9)?.key).toBe('m79');
  });

  it('keeps certificate tiers and eligibility aligned with current rules', () => {
    expect(
      getCertificateArtifacts().map((certificate) => certificate.tier)
    ).toEqual([1, 2, 3]);
    expect(
      getEarnedCertificateTiers(progress({ completedModules: [1, 2, 3] }))
    ).toEqual([1]);
    expect(
      getEarnedCertificateTiers(
        progress({
          completedModules: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          quizCompleted: true,
          quizScore: 80,
          moduleTestScores: { 8: 75 },
        })
      )
    ).toEqual([1, 2, 3]);
  });
});
