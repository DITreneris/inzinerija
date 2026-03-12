/**
 * Progress integration tests (not App component).
 * These tests verify that progress functions work together correctly
 * without requiring full React component rendering.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getProgress, saveProgress, resetProgress, flushProgressSave } from '../../utils/progress';

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

describe('Progress Integration Tests', () => {
  beforeEach(() => {
    setupLocalStorage();
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    // Mock console methods
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    resetProgress();
    vi.restoreAllMocks();
  });

  it('should load and save progress correctly', () => {
    // Set up initial progress
    const initialProgress = {
      completedModules: [1],
      completedTasks: { 1: [1] },
      quizCompleted: false,
      quizScore: null,
    };
    
    saveProgress(initialProgress);
    flushProgressSave();
    
    // Load and verify
    const loaded = getProgress();
    expect(loaded.completedModules).toEqual([1]);
    expect(loaded.completedTasks).toEqual({ 1: [1] });
    expect(loaded.quizCompleted).toBe(false);
    expect(loaded.quizScore).toBe(null);
  });

  it('should handle corrupted localStorage gracefully', () => {
    // Set corrupted data
    localStorage.setItem('prompt-anatomy-progress', 'invalid json{');

    // Should not throw, should return default
    const progress = getProgress();
    expect(progress.completedModules).toEqual([]);
    expect(progress.completedTasks).toEqual({});
    expect(progress.quizCompleted).toBe(false);
    expect(progress.quizScore).toBe(null);
  });

  it('should handle v1 format progress migration', () => {
    // Set v1 format (without version)
    const v1Progress = {
      completedModules: [1, 2],
      completedTasks: { 1: [1, 2] },
      quizCompleted: true,
      quizScore: 85,
    };
    localStorage.setItem('prompt-anatomy-progress', JSON.stringify(v1Progress));

    // Get progress should migrate automatically
    const progress = getProgress();
    expect(progress.completedModules).toEqual([1, 2]);
    expect(progress.quizCompleted).toBe(true);
    expect(progress.quizScore).toBe(85);

    // Should be saved as v2 format
    const stored = localStorage.getItem('prompt-anatomy-progress');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.version).toBe(2);
    expect(parsed.createdAt).toBeDefined();
    expect(parsed.updatedAt).toBeDefined();
  });

  it('should persist progress changes across multiple saves', () => {
    // Initial save
    const progress1 = {
      completedModules: [1],
      completedTasks: { 1: [1] },
      quizCompleted: false,
      quizScore: null,
    };
    saveProgress(progress1);
    flushProgressSave();

    // Update progress
    const progress2 = {
      completedModules: [1, 2],
      completedTasks: { 1: [1, 2], 2: [1] },
      quizCompleted: true,
      quizScore: 90,
    };
    saveProgress(progress2);
    flushProgressSave();

    // Verify latest progress
    const saved = getProgress();
    expect(saved.completedModules).toEqual([1, 2]);
    expect(saved.completedTasks).toEqual({ 1: [1, 2], 2: [1] });
    expect(saved.quizCompleted).toBe(true);
    expect(saved.quizScore).toBe(90);
  });

  it('should preserve createdAt across multiple saves', () => {
    // First save
    const progress1 = {
      completedModules: [1],
      completedTasks: {},
      quizCompleted: false,
      quizScore: null,
    };
    saveProgress(progress1);
    flushProgressSave();
    
    const firstSave = JSON.parse(localStorage.getItem('prompt-anatomy-progress')!);
    const createdAt = firstSave.createdAt;

    // Small delay to ensure different timestamp
    const startTime = Date.now();
    while (Date.now() - startTime < 10) {
      // Wait 10ms
    }

    // Second save
    const progress2 = {
      completedModules: [1, 2],
      completedTasks: {},
      quizCompleted: false,
      quizScore: null,
    };
    saveProgress(progress2);
    flushProgressSave();

    const secondSave = JSON.parse(localStorage.getItem('prompt-anatomy-progress')!);
    
    // createdAt should be preserved
    expect(secondSave.createdAt).toBe(createdAt);
    // Both timestamps should be defined
    expect(secondSave.createdAt).toBeDefined();
    expect(secondSave.updatedAt).toBeDefined();
  });

  it('should reset progress correctly', () => {
    // Set some progress
    const progress = {
      completedModules: [1, 2],
      completedTasks: { 1: [1] },
      quizCompleted: true,
      quizScore: 85,
    };
    saveProgress(progress);
    flushProgressSave();

    // Reset
    resetProgress();

    // Should return default
    const afterReset = getProgress();
    expect(afterReset.completedModules).toEqual([]);
    expect(afterReset.completedTasks).toEqual({});
    expect(afterReset.quizCompleted).toBe(false);
    expect(afterReset.quizScore).toBe(null);
    
    // localStorage should be empty
    expect(localStorage.getItem('prompt-anatomy-progress')).toBeNull();
  });
});
