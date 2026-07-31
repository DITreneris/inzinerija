import { describe, expect, it } from 'vitest';
import {
  TEST_SCOPE_BUBBLES_M8,
  getTestKnowledgeBubbles,
} from '../testKnowledgeScopeContent';

describe('testKnowledgeScopeContent (M79-S2b)', () => {
  it('maps Valymas and Seka to distinct M7 slide ids (not both 891)', () => {
    const cleaning = TEST_SCOPE_BUBBLES_M8.find((b) => b.labelLt === 'Valymas');
    const workflow = TEST_SCOPE_BUBBLES_M8.find((b) => b.labelLt === 'Seka');
    expect(cleaning?.slideId).toBe(891);
    expect(workflow?.slideId).toBe(89);
    expect(cleaning?.slideId).not.toBe(workflow?.slideId);
  });

  it('keeps unique slideId targets within each module map', () => {
    for (const moduleId of [8, 11, 14] as const) {
      const bubbles = getTestKnowledgeBubbles(moduleId);
      const keys = bubbles.map((b) => `${b.targetModuleId}:${b.slideId}`);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });
});
