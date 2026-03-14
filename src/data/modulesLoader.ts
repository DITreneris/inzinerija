import type { ModulesData } from '../types/modules';
import { getMaxAccessibleModuleId } from '../utils/accessTier';
import {
  getBrowserEnglishContentVariant,
  type EnglishContentVariant,
} from '../i18n';

export type ModulesLocale = 'lt' | 'en';
export type ModulesEnglishVariant = EnglishContentVariant;

type CacheKey = 'lt' | ModulesEnglishVariant;

const modulesCache = new Map<CacheKey, ModulesData>();
const modulesPromises = new Map<CacheKey, Promise<ModulesData>>();
let modulesLoadError: Error | null = null;

function resolveEnglishVariant(locale: ModulesLocale, englishVariant?: ModulesEnglishVariant): ModulesEnglishVariant {
  if (locale !== 'en') return 'en-lt';
  return englishVariant ?? getBrowserEnglishContentVariant();
}

function getCacheKey(locale: ModulesLocale, englishVariant?: ModulesEnglishVariant): CacheKey {
  return locale === 'lt' ? 'lt' : resolveEnglishVariant(locale, englishVariant);
}

function getCache(locale: ModulesLocale, englishVariant?: ModulesEnglishVariant): ModulesData | null {
  return modulesCache.get(getCacheKey(locale, englishVariant)) ?? null;
}

function setCache(locale: ModulesLocale, englishVariant: ModulesEnglishVariant | undefined, data: ModulesData | null): void {
  const key = getCacheKey(locale, englishVariant);
  if (data) modulesCache.set(key, data);
  else modulesCache.delete(key);
}

function getPromise(locale: ModulesLocale, englishVariant?: ModulesEnglishVariant): Promise<ModulesData> | null {
  return modulesPromises.get(getCacheKey(locale, englishVariant)) ?? null;
}

function setPromise(locale: ModulesLocale, englishVariant: ModulesEnglishVariant | undefined, p: Promise<ModulesData> | null): void {
  const key = getCacheKey(locale, englishVariant);
  if (p) modulesPromises.set(key, p);
  else modulesPromises.delete(key);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasMergeableId(value: unknown): value is { id: string | number } {
  return isPlainObject(value) && (typeof value.id === 'string' || typeof value.id === 'number');
}

function mergeArraysById(base: unknown[], override: unknown[]): unknown[] {
  const merged = [...base];
  const baseIndexById = new Map<string | number, number>();

  base.forEach((item, index) => {
    if (hasMergeableId(item)) baseIndexById.set(item.id, index);
  });

  override.forEach((item) => {
    if (!hasMergeableId(item)) return;
    const index = baseIndexById.get(item.id);
    if (index === undefined) {
      merged.push(item);
      return;
    }
    merged[index] = deepMerge(base[index], item);
  });

  return merged;
}

function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined) return base;

  if (Array.isArray(base) && Array.isArray(override)) {
    const shouldMergeById =
      base.every((item) => hasMergeableId(item)) && override.every((item) => hasMergeableId(item));
    return (shouldMergeById ? mergeArraysById(base, override) : override) as T;
  }

  if (isPlainObject(base) && isPlainObject(override)) {
    const result: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(override)) {
      const baseValue = result[key];
      result[key] =
        baseValue === undefined
          ? value
          : deepMerge(baseValue, value);
    }
    return result as T;
  }

  return override as T;
}

function mergeModulesData(base: ModulesData, override: Partial<ModulesData>): ModulesData {
  return deepMerge(base, override);
}

/**
 * Load modules data (cached per locale).
 * For locale === 'en', merges EN base and optional EN-US override.
 */
export const loadModules = async (
  locale: ModulesLocale = 'lt',
  englishVariant?: ModulesEnglishVariant
): Promise<ModulesData> => {
  const cached = getCache(locale, englishVariant);
  if (cached) return cached;

  let promise = getPromise(locale, englishVariant);
  if (!promise) {
    modulesLoadError = null;
    const resolvedVariant = resolveEnglishVariant(locale, englishVariant);
    promise = (async () => {
      const m = await import('@modules-data');
      const raw = m.default as unknown;
      if (!raw || typeof raw !== 'object' || !Array.isArray((raw as ModulesData).modules)) {
        const empty: ModulesData = {
          modules: [],
          quiz: { title: 'Apklausa', description: '', passingScore: 70, questions: [] },
        };
        setCache(locale, resolvedVariant, empty);
        return empty;
      }
      let data = raw as ModulesData;

      if (locale === 'en') {
        try {
          const enModule = await import('./modules-en.json');
          const enData = enModule.default as Partial<ModulesData>;
          if (Array.isArray(enData.modules) && enData.modules.length > 0) {
            data = mergeModulesData(data, enData);
          }
        } catch {
          // Fallback: keep LT content for modules 1–3 if EN file missing
        }
        try {
          const quizEn = await import('./quiz-en.json');
          const q = (quizEn.default as ModulesData['quiz'] | undefined);
          if (q && Array.isArray(q.questions) && q.title) {
            data = { ...data, quiz: q };
          }
        } catch {
          // Fallback: keep LT quiz for EN if quiz-en.json missing
        }
        try {
          const enM46 = await import('./modules-en-m4-m6.json');
          const m46 = enM46.default as Partial<ModulesData>;
          if (Array.isArray(m46.modules) && m46.modules.length > 0) {
            data = mergeModulesData(data, m46);
          }
        } catch {
          // Fallback: keep LT content for modules 4–6 if EN M4–M6 file missing
        }

        if (resolvedVariant === 'en-us') {
          try {
            const usOverride = await import('./modules-en-us-overrides.json');
            data = mergeModulesData(data, usOverride.default as unknown as Partial<ModulesData>);
          } catch {
            // Fallback: keep base EN content if EN-US overrides are missing
          }
        }
      }

      if (!data.quiz || !Array.isArray(data.quiz.questions)) {
        data = {
          ...data,
          quiz: {
            title: data.quiz?.title ?? 'Apklausa',
            description: data.quiz?.description ?? '',
            passingScore: data.quiz?.passingScore ?? 70,
            questions: [],
          },
        };
      }
      setCache(locale, resolvedVariant, data);
      return data;
    })();
    promise.catch((err: unknown) => {
      modulesLoadError = err instanceof Error ? err : new Error(String(err));
      setPromise(locale, resolvedVariant, null);
    });
    setPromise(locale, resolvedVariant, promise);
  }
  return promise;
};

/**
 * Get specific module by ID (async).
 */
export const getModule = async (
  id: number,
  locale: ModulesLocale = 'lt',
  englishVariant?: ModulesEnglishVariant
) => {
  if (id > getMaxAccessibleModuleId()) return null;
  const modules = await loadModules(locale, englishVariant);
  return modules.modules.find(m => m.id === id) ?? null;
};

/**
 * Get all modules synchronously for the given locale (if already loaded).
 */
export const getModulesSync = (
  locale: ModulesLocale = 'lt',
  englishVariant?: ModulesEnglishVariant
): ModulesData['modules'] | null => {
  const data = getCache(locale, englishVariant);
  return data?.modules ?? null;
};

/**
 * Get modules data synchronously for the given locale (if already loaded).
 */
export const getModulesDataSync = (
  locale: ModulesLocale = 'lt',
  englishVariant?: ModulesEnglishVariant
): ModulesData | null => {
  return getCache(locale, englishVariant);
};

/**
 * Preload modules for a locale in background.
 */
export const preloadModules = (locale: ModulesLocale = 'lt', englishVariant?: ModulesEnglishVariant): void => {
  if (!getCache(locale, englishVariant) && !getPromise(locale, englishVariant)) {
    void loadModules(locale, englishVariant);
  }
};

/**
 * Invalidate cache for a locale (e.g. when switching language so next load fetches fresh).
 */
export const invalidateModulesCache = (locale?: ModulesLocale, englishVariant?: ModulesEnglishVariant): void => {
  if (locale === 'lt') {
    modulesCache.delete('lt');
    modulesPromises.delete('lt');
  } else if (locale === 'en' && englishVariant) {
    modulesCache.delete(englishVariant);
    modulesPromises.delete(englishVariant);
  } else if (locale === 'en') {
    modulesCache.delete('en-lt');
    modulesCache.delete('en-us');
    modulesPromises.delete('en-lt');
    modulesPromises.delete('en-us');
  } else {
    modulesCache.clear();
    modulesPromises.clear();
  }
};

export const getModulesLoadError = (): Error | null => modulesLoadError;

/**
 * Clear load error and reset state for retry.
 */
export const clearModulesLoadError = (): void => {
  modulesLoadError = null;
  modulesPromises.clear();
};

/**
 * Clear cache for testing (access tier tests need fresh load).
 */
export const __clearCacheForTesting = (): void => {
  modulesCache.clear();
  modulesPromises.clear();
  modulesLoadError = null;
};
