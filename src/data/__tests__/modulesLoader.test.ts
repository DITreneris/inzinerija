/**
 * modulesLoader: build-selected LT base, edge cases (malformed data, missing quiz.questions),
 * getModulesLoadError / clearModulesLoadError, preloadModules.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  loadModules,
  getModule,
  getModulesSync,
  getModulesDataSync,
  getModulesLoadError,
  clearModulesLoadError,
  preloadModules,
  __clearCacheForTesting,
} from '../modulesLoader';
import type { ModulesData, Module } from '../../types/modules';

function minimalModule(overrides: Partial<Module> & { id: number; title: string }): Module {
  return {
    subtitle: '',
    description: '',
    icon: 'Target',
    level: 'learn',
    duration: '',
    slides: [],
    businessExamples: [],
    ...overrides,
    id: overrides.id,
    title: overrides.title,
  };
}

const fakeModulesData: ModulesData = {
  modules: [
    minimalModule({ id: 1, title: 'M1' }),
    minimalModule({ id: 2, title: 'M2' }),
    minimalModule({ id: 4, title: 'M4' }),
  ],
  quiz: {
    title: 'Apklausa',
    description: '',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Q?',
        options: ['A', 'B'],
        correct: 0,
        explanation: 'Because A',
      },
    ],
  },
};

/** Base with 6 modules so loadModules("en") can merge modules-en.json and modules-en-m4-m6.json */
const fakeModulesDataWith6: ModulesData = {
  modules: [
    minimalModule({ id: 1, title: 'M1' }),
    minimalModule({ id: 2, title: 'M2' }),
    minimalModule({ id: 3, title: 'M3' }),
    minimalModule({ id: 4, title: 'M4' }),
    minimalModule({ id: 5, title: 'M5' }),
    minimalModule({ id: 6, title: 'M6' }),
  ],
  quiz: fakeModulesData.quiz,
};

const mockDataHolder = vi.hoisted(() => ({
  data: null as ModulesData | null,
  throwOnAccess: false,
}));

vi.mock('../../utils/accessTier', () => ({
  getMaxAccessibleModuleId: vi.fn(() => 6),
}));

vi.mock('@modules-data', () => ({
  get default() {
    if (mockDataHolder.throwOnAccess) {
      throw new Error('Load failed');
    }
    return mockDataHolder.data;
  },
}));

describe('modulesLoader (tier 6 and edge cases)', () => {
  beforeEach(() => {
    mockDataHolder.data = fakeModulesData;
    mockDataHolder.throwOnAccess = false;
    __clearCacheForTesting();
  });

  it('loadModules returns all modules from mock data', async () => {
    const data = await loadModules();
    expect(data.modules.length).toBe(3);
    expect(data.modules.map((m) => m.id)).toEqual([1, 2, 4]);
    expect(data.quiz.questions).toHaveLength(1);
  });

  it('getModule returns module 4 when tier allows', async () => {
    const mod = await getModule(4);
    expect(mod).not.toBeNull();
    expect(mod?.id).toBe(4);
  });

  it('getModulesSync returns all modules after load', async () => {
    await loadModules();
    const modules = getModulesSync();
    expect(modules?.length).toBe(3);
    expect(modules?.find((m) => m.id === 4)).toBeDefined();
  });

  it('getModulesDataSync returns full data after load', async () => {
    await loadModules();
    const data = getModulesDataSync();
    expect(data).not.toBeNull();
    expect(data?.modules.length).toBe(3);
    expect(data?.quiz.questions.length).toBe(1);
  });

  it('normalizes missing quiz.questions to empty array', async () => {
    mockDataHolder.data = {
      modules: [minimalModule({ id: 1, title: 'M' })],
      quiz: {
        title: 'Test',
        description: '',
        passingScore: 70,
        // questions missing
      } as unknown as ModulesData['quiz'],
    };
    const data = await loadModules();
    expect(Array.isArray(data.quiz.questions)).toBe(true);
    expect(data.quiz.questions).toHaveLength(0);
    expect(data.quiz.title).toBe('Test');
  });

  it('normalizes missing quiz to default quiz with empty questions', async () => {
    mockDataHolder.data = {
      modules: [minimalModule({ id: 1, title: 'M' })],
      quiz: undefined as unknown as ModulesData['quiz'],
    };
    const data = await loadModules();
    expect(data.quiz).toBeDefined();
    expect(data.quiz.title).toBe('Apklausa');
    expect(data.quiz.questions).toEqual([]);
  });

  it('returns fallback when raw is not object', async () => {
    mockDataHolder.data = null as unknown as ModulesData;
    const data = await loadModules();
    expect(data.modules).toEqual([]);
    expect(data.quiz.questions).toEqual([]);
    expect(data.quiz.title).toBe('Apklausa');
  });

  it('returns fallback when modules is not array', async () => {
    mockDataHolder.data = {
      modules: 'not-array' as unknown as ModulesData['modules'],
      quiz: { title: 'A', description: '', passingScore: 70, questions: [] },
    };
    const data = await loadModules();
    expect(data.modules).toEqual([]);
    expect(data.quiz.title).toBe('Apklausa');
  });

  it('getModulesLoadError returns error after load fails', async () => {
    mockDataHolder.throwOnAccess = true;
    mockDataHolder.data = null;
    await expect(loadModules()).rejects.toThrow('Load failed');
    const err = getModulesLoadError();
    expect(err).not.toBeNull();
    expect(err?.message).toBe('Load failed');
  });

  it('clearModulesLoadError clears error and allows retry', async () => {
    mockDataHolder.throwOnAccess = true;
    mockDataHolder.data = null;
    await expect(loadModules()).rejects.toThrow();
    expect(getModulesLoadError()).not.toBeNull();

    clearModulesLoadError();
    expect(getModulesLoadError()).toBeNull();

    mockDataHolder.throwOnAccess = false;
    mockDataHolder.data = fakeModulesData;
    const data = await loadModules();
    expect(data.modules.length).toBe(3);
  });

  it('preloadModules starts load when cache empty', async () => {
    preloadModules();
    await loadModules();
    expect(getModulesSync()).toHaveLength(3);
  });

  it('returns cached data on second loadModules call', async () => {
    const first = await loadModules();
    const second = await loadModules();
    expect(first).toBe(second);
  });

  it('loadModules("en") merges EN content for M1–M6', async () => {
    mockDataHolder.data = fakeModulesDataWith6;
    __clearCacheForTesting();
    const data = await loadModules('en');
    expect(data.modules).toHaveLength(6);
    expect(data.modules[0].title).toBe('6-Block System');
    expect(data.modules[3].title).toBe('Context engineering');
  }, 20000);

  it('loadModules("en", "en-lt") keeps LT(EN) base context', async () => {
    mockDataHolder.data = fakeModulesDataWith6;
    __clearCacheForTesting();
    const data = await loadModules('en', 'en-lt');
    const introSlide = data.modules[3]?.slides?.find((slide) => slide.id === 38);
    expect((introSlide?.content as { unstructuredPrompt?: string })?.unstructuredPrompt).toBe("Write me a report on Lithuania's GDP trends.");
  }, 20000);

  it('loadModules("en", "en-us") applies US overrides on top of base EN', async () => {
    mockDataHolder.data = fakeModulesDataWith6;
    __clearCacheForTesting();
    const data = await loadModules('en', 'en-us');
    const m1Intro = data.modules[0]?.slides?.find((slide) => slide.id === 1);
    const m4Intro = data.modules[3]?.slides?.find((slide) => slide.id === 38);
    const m1Content = m1Intro?.content as { structuredPrompt?: string };
    const m4Content = m4Intro?.content as { unstructuredPrompt?: string };
    expect(m1Content?.structuredPrompt).toContain('Budget 50k USD');
    expect(m1Content?.structuredPrompt).toContain('Target market: US');
    expect(m4Content?.unstructuredPrompt).toBe('Write me a report on US GDP trends.');
  }, 20000);

  it('US variant falls back to base EN where override is not provided', async () => {
    mockDataHolder.data = fakeModulesDataWith6;
    __clearCacheForTesting();
    const data = await loadModules('en', 'en-us');
    const deepResearchSlide = data.modules[3]?.slides?.find((slide) => slide.id === 65);
    expect(deepResearchSlide?.title).toBe('Practical tasks: prompt sequences');
  }, 20000);

  it('keeps separate cache entries for en-lt and en-us', async () => {
    mockDataHolder.data = fakeModulesDataWith6;
    __clearCacheForTesting();

    const enLt = await loadModules('en', 'en-lt');
    const enUs = await loadModules('en', 'en-us');

    expect(enLt).not.toBe(enUs);
    expect(getModulesDataSync('en', 'en-lt')).toBe(enLt);
    expect(getModulesDataSync('en', 'en-us')).toBe(enUs);
    expect((getModulesDataSync('en', 'en-lt')?.modules[3]?.slides?.find((slide) => slide.id === 38)?.content as { unstructuredPrompt?: string })?.unstructuredPrompt)
      .toBe("Write me a report on Lithuania's GDP trends.");
    expect((getModulesDataSync('en', 'en-us')?.modules[3]?.slides?.find((slide) => slide.id === 38)?.content as { unstructuredPrompt?: string })?.unstructuredPrompt)
      .toBe('Write me a report on US GDP trends.');
  }, 20000);
});
