import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadModules, getModule, getModulesSync, __clearCacheForTesting } from '../../data/modulesLoader';

vi.mock('../../utils/accessTier', () => ({
  getMaxAccessibleModuleId: vi.fn(() => 3),
}));

const { getMaxAccessibleModuleId } = await import('../../utils/accessTier');

describe('Access tier 3 (modules 1–3 accessible)', () => {
  beforeEach(() => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(3);
    __clearCacheForTesting();
    localStorage.clear();
  });

  it('loadModules returns all modules from data (no tier filter)', async () => {
    const data = await loadModules();
    expect(data.modules.length).toBeGreaterThanOrEqual(3);
    expect(data.modules.map((m) => m.id).slice(0, 3)).toEqual([1, 2, 3]);
  });

  it('getModule(4) returns null when tier is 3', async () => {
    await loadModules();
    const mod = await getModule(4);
    expect(mod).toBeNull();
  });

  it('getModule(1) returns module when tier is 3', async () => {
    const mod = await getModule(1);
    expect(mod).not.toBeNull();
    expect(mod?.id).toBe(1);
  });

  it('getModulesSync returns all loaded modules', async () => {
    await loadModules();
    const modules = getModulesSync();
    expect(modules).not.toBeNull();
    expect(modules!.length).toBeGreaterThanOrEqual(3);
    expect(modules!.some((m) => m.id === 4)).toBe(true);
  });
});

describe('Access tier 6 / MVP (M1–M6 accessible, 7+ locked)', () => {
  beforeEach(() => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(6);
    __clearCacheForTesting();
    localStorage.clear();
  });

  it('loadModules returns modules including 4, 5, 6', async () => {
    const data = await loadModules();
    const ids = data.modules.map((m) => m.id);
    expect(ids).toContain(4);
    expect(ids).toContain(5);
    expect(ids).toContain(6);
  });

  it('getModule(5) returns non-null when tier is 6', async () => {
    const mod = await getModule(5);
    expect(mod).not.toBeNull();
    expect(mod?.id).toBe(5);
  });

  it('getModule(6) returns non-null when tier is 6', async () => {
    const mod = await getModule(6);
    expect(mod).not.toBeNull();
    expect(mod?.id).toBe(6);
  });
});
