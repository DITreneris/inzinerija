import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getProgress,
  saveProgress,
  resetProgress,
  migrateV1ToV2,
  validateProgress,
  isProgressV1,
  isProgressV2,
  flushProgressSave,
  type Progress,
} from '../progress';

// Setup localStorage mock if not available
const setupLocalStorage = () => {
  if (typeof localStorage === 'undefined') {
    const store: Record<string, string> = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).localStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach(key => delete store[key]);
      },
      get length() {
        return Object.keys(store).length;
      },
      key: (index: number) => {
        const keys = Object.keys(store);
        return keys[index] || null;
      },
    };
  }
};

describe('progress.ts', () => {
  beforeEach(() => {
    setupLocalStorage();
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    // Mock console methods to avoid noise in tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  describe('getProgress', () => {
    it('should return default progress when localStorage is empty', () => {
      const progress = getProgress();
      
      expect(progress).toEqual({
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
        moduleTestScores: {},
      });
    });

    it('should return saved progress (v2 format)', () => {
      const v2Progress = {
        version: 2,
        completedModules: [1, 2],
        completedTasks: { 1: [1, 2] },
        quizCompleted: true,
        quizScore: 85,
        createdAt: '2026-02-02T00:00:00.000Z',
        updatedAt: '2026-02-02T00:00:00.000Z',
      };
      
      localStorage.setItem('prompt-anatomy-progress', JSON.stringify(v2Progress));
      
      const progress = getProgress();
      
      expect(progress).toEqual({
        completedModules: [1, 2],
        completedTasks: { 1: [1, 2] },
        quizCompleted: true,
        quizScore: 85,
      });
    });

    it('should migrate v1 format to v2 automatically', () => {
      const v1Progress = {
        completedModules: [1],
        completedTasks: { 1: [1] },
        quizCompleted: false,
        quizScore: null,
      };
      
      localStorage.setItem('prompt-anatomy-progress', JSON.stringify(v1Progress));
      
      const progress = getProgress();
      
      // Should return valid progress
      expect(progress).toEqual({
        completedModules: [1],
        completedTasks: { 1: [1] },
        quizCompleted: false,
        quizScore: null,
        moduleTestScores: {},
      });
      
      // Should save migrated version
      const stored = localStorage.getItem('prompt-anatomy-progress');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.version).toBe(2);
      expect(parsed.createdAt).toBeDefined();
      expect(parsed.updatedAt).toBeDefined();
    });

    it('should reset to default if validation fails', () => {
      const invalidProgress = {
        version: 2,
        completedModules: 'not an array', // Invalid
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
      };
      
      localStorage.setItem('prompt-anatomy-progress', JSON.stringify(invalidProgress));
      
      const progress = getProgress();
      
      expect(progress).toEqual({
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
        moduleTestScores: {},
      });
    });

    it('should handle corrupted JSON gracefully', () => {
      localStorage.setItem('prompt-anatomy-progress', 'invalid json{');
      
      const progress = getProgress();
      
      expect(progress).toEqual({
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
        moduleTestScores: {},
      });
    });

    it('should return default progress when localStorage access throws', () => {
      const getItemSpy = vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
        throw new Error('Storage disabled');
      });

      const progress = getProgress();

      expect(progress).toEqual({
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
        moduleTestScores: {},
      });

      getItemSpy.mockRestore();
    });
  });

  describe('saveProgress', () => {
    it('should save progress with v2 format', () => {
      const progress: Progress = {
        completedModules: [1, 2],
        completedTasks: { 1: [1, 2] },
        quizCompleted: true,
        quizScore: 90,
      };
      
      saveProgress(progress);
      // Flush debounced save to ensure it's written immediately
      flushProgressSave();
      
      const stored = localStorage.getItem('prompt-anatomy-progress');
      expect(stored).toBeTruthy();
      
      const parsed = JSON.parse(stored!);
      expect(parsed.version).toBe(2);
      expect(parsed.completedModules).toEqual([1, 2]);
      expect(parsed.completedTasks).toEqual({ 1: [1, 2] });
      expect(parsed.quizCompleted).toBe(true);
      expect(parsed.quizScore).toBe(90);
      expect(parsed.updatedAt).toBeDefined();
    });

    it('should preserve createdAt when saving', () => {
      const initialProgress: Progress = {
        completedModules: [1],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
      };
      
      saveProgress(initialProgress);
      flushProgressSave();
      const firstSave = JSON.parse(localStorage.getItem('prompt-anatomy-progress')!);
      const createdAt = firstSave.createdAt;
      
      // Small delay
      const startTime = Date.now();
      while (Date.now() - startTime < 10) {
        // Wait 10ms
      }
      
      // Save again
      saveProgress({ ...initialProgress, completedModules: [1, 2] });
      flushProgressSave();
      const secondSave = JSON.parse(localStorage.getItem('prompt-anatomy-progress')!);
      
      expect(secondSave.createdAt).toBe(createdAt);
      // Both should be defined
      expect(secondSave.createdAt).toBeDefined();
      expect(secondSave.updatedAt).toBeDefined();
    });
  });

  describe('resetProgress', () => {
    it('should clear localStorage', () => {
      const progress: Progress = {
        completedModules: [1],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
      };
      
      saveProgress(progress);
      flushProgressSave();
      expect(localStorage.getItem('prompt-anatomy-progress')).toBeTruthy();
      
      resetProgress();
      expect(localStorage.getItem('prompt-anatomy-progress')).toBeNull();
    });
  });

  describe('migrateV1ToV2', () => {
    it('should migrate v1 format to v2', () => {
      const v1 = {
        completedModules: [1, 2],
        completedTasks: { 1: [1] },
        quizCompleted: true,
        quizScore: 85,
      };
      
      const v2 = migrateV1ToV2(v1);
      
      expect(v2.version).toBe(2);
      expect(v2.completedModules).toEqual([1, 2]);
      expect(v2.completedTasks).toEqual({ 1: [1] });
      expect(v2.quizCompleted).toBe(true);
      expect(v2.quizScore).toBe(85);
      expect(v2.moduleTestScores).toEqual({});
      expect(v2.createdAt).toBeDefined();
      expect(v2.updatedAt).toBeDefined();
    });
  });

  describe('validateProgress', () => {
    it('should validate correct progress structure', () => {
      const valid: Progress = {
        completedModules: [1, 2],
        completedTasks: { 1: [1, 2], 2: [3] },
        quizCompleted: true,
        quizScore: 90,
      };
      
      expect(validateProgress(valid)).toBe(true);
    });

    it('should reject invalid completedModules', () => {
      expect(validateProgress({
        completedModules: 'not array',
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
      })).toBe(false);
    });

    it('should reject invalid completedTasks', () => {
      expect(validateProgress({
        completedModules: [],
        completedTasks: 'not object',
        quizCompleted: false,
        quizScore: null,
      })).toBe(false);
    });

    it('should reject invalid quizCompleted', () => {
      expect(validateProgress({
        completedModules: [],
        completedTasks: {},
        quizCompleted: 'not boolean',
        quizScore: null,
      })).toBe(false);
    });

    it('should reject invalid quizScore', () => {
      expect(validateProgress({
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: 'not number or null',
      })).toBe(false);
    });

    it('should accept null quizScore', () => {
      expect(validateProgress({
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
      })).toBe(true);
    });

    it('should reject non-number items in completedModules', () => {
      expect(validateProgress({
        completedModules: [1, 'not number', 2],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
      })).toBe(false);
    });

    it('should reject non-number items in completedTasks arrays', () => {
      expect(validateProgress({
        completedModules: [],
        completedTasks: { 1: [1, 'not number'] },
        quizCompleted: false,
        quizScore: null,
      })).toBe(false);
    });
  });

  describe('isProgressV1', () => {
    it('should identify v1 format', () => {
      expect(isProgressV1({
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
      })).toBe(true);
    });

    it('should reject v2 format', () => {
      expect(isProgressV1({
        version: 2,
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
      })).toBe(false);
    });
  });

  describe('moduleTestScores', () => {
    it('should save and load moduleTestScores correctly', () => {
      const progress: Progress = {
        completedModules: [1, 2, 3, 4, 5],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
        moduleTestScores: { 5: 85 },
      };

      saveProgress(progress);
      flushProgressSave();
      const loaded = getProgress();
      expect(loaded.moduleTestScores).toEqual({ 5: 85 });
    });

    it('should preserve moduleTestScores when updating other fields', () => {
      const progress: Progress = {
        completedModules: [1, 2],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
        moduleTestScores: { 2: 90, 5: 75 },
      };

      saveProgress(progress);
      flushProgressSave();

      saveProgress({ ...progress, quizCompleted: true, quizScore: 80 });
      flushProgressSave();

      const loaded = getProgress();
      expect(loaded.moduleTestScores).toEqual({ 2: 90, 5: 75 });
      expect(loaded.quizCompleted).toBe(true);
    });

    it('should reject moduleTestScores with non-number value', () => {
      expect(validateProgress({
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
        moduleTestScores: { 5: 'not a number' },
      })).toBe(false);
    });

    it('should accept valid moduleTestScores with multiple entries', () => {
      expect(validateProgress({
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
        moduleTestScores: { 2: 90, 5: 75, 8: 60 },
      })).toBe(true);
    });
  });

  describe('isProgressV2', () => {
    it('should identify v2 format', () => {
      expect(isProgressV2({
        version: 2,
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
      })).toBe(true);
    });

    it('should reject v1 format', () => {
      expect(isProgressV2({
        completedModules: [],
        completedTasks: {},
        quizCompleted: false,
        quizScore: null,
      })).toBe(false);
    });
  });
});
