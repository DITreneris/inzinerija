import { describe, expect, it } from 'vitest';
import { pickModulesPageNextStep } from '../modulesPageNextStep';

const modules = Array.from({ length: 6 }, (_, index) => ({ id: index + 1 }));

function progress(entries: Array<[number, number]> = []) {
  return new Map<number, number>(entries);
}

describe('pickModulesPageNextStep', () => {
  it('prefers a started accessible module over recommendations', () => {
    const next = pickModulesPageNextStep({
      modules,
      completedModuleIds: [1],
      moduleProgressById: progress([[3, 40]]),
      lockedModuleIds: new Set<number>(),
      recommendedModuleIds: new Set([2]),
      maxAccessible: 6,
    });

    expect(next?.id).toBe(3);
  });

  it('uses the first recommended module in catalog order when none is started', () => {
    const next = pickModulesPageNextStep({
      modules,
      completedModuleIds: [],
      moduleProgressById: progress(),
      lockedModuleIds: new Set<number>(),
      recommendedModuleIds: new Set([4, 2]),
      maxAccessible: 6,
    });

    expect(next?.id).toBe(2);
  });

  it('skips tier-inaccessible and sequence-locked recommended modules', () => {
    const next = pickModulesPageNextStep({
      modules,
      completedModuleIds: [1],
      moduleProgressById: progress(),
      lockedModuleIds: new Set([2]),
      recommendedModuleIds: new Set([2, 5]),
      maxAccessible: 4,
    });

    expect(next?.id).toBe(3);
  });

  it('falls back to the first accessible incomplete module', () => {
    const next = pickModulesPageNextStep({
      modules,
      completedModuleIds: [1, 2],
      moduleProgressById: progress([
        [1, 100],
        [2, 100],
      ]),
      lockedModuleIds: new Set<number>(),
      recommendedModuleIds: new Set<number>(),
      maxAccessible: 6,
    });

    expect(next?.id).toBe(3);
  });

  it('returns null when all accessible modules are complete', () => {
    const next = pickModulesPageNextStep({
      modules,
      completedModuleIds: [1, 2, 3],
      moduleProgressById: progress([
        [1, 100],
        [2, 100],
        [3, 100],
      ]),
      lockedModuleIds: new Set<number>(),
      recommendedModuleIds: new Set([4]),
      maxAccessible: 3,
    });

    expect(next).toBeNull();
  });
});
