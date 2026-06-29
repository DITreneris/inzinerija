import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import {
  loadModules,
  getModule,
  __clearCacheForTesting,
} from '../../data/modulesLoader';
import ModulesPage from '../ModulesPage';
import type { Progress } from '../../utils/progress';

// CONV-2 / CONV-3: when no tier is purchased (maxAccessible === 0) the same
// AccessGateScreen guards the modules list and the quiz route in App.tsx.
vi.mock('../../utils/accessTier', () => ({
  getMaxAccessibleModuleId: vi.fn(() => 0),
}));

const { getMaxAccessibleModuleId } = await import('../../utils/accessTier');

const storageKey = 'prompt-anatomy-locale';

function emptyProgress(): Progress {
  return {
    completedModules: [],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: {},
  };
}

describe('Access gate smoke (CONV-2 / CONV-3)', () => {
  beforeEach(async () => {
    localStorage.clear();
    localStorage.setItem(storageKey, 'lt');
    __clearCacheForTesting();
    await loadModules('lt');
  });

  it('renders AccessGateScreen when maxAccessible === 0 (tier 0)', () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(0);
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={emptyProgress()} />
    );
    expect(screen.getByText('Prieiga ribota')).toBeInTheDocument();
    // Module cards must NOT be shown to an unpaid visitor.
    expect(screen.queryByRole('heading', { name: /Modulis 1/ })).toBeNull();
  });

  it('does NOT gate the modules list once a tier is purchased (tier 3)', () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(3);
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={emptyProgress()} />
    );
    expect(screen.queryByText('Prieiga ribota')).toBeNull();
  });

  it('getModule(4) returns null when tier is 3 (locked beyond purchase)', async () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(3);
    await loadModules('lt');
    const mod = await getModule(4);
    expect(mod).toBeNull();
  });

  it('getModule(7) returns module when tier is 9 (Duomenų analizės kelias)', async () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(9);
    await loadModules('lt');
    const mod = await getModule(7);
    expect(mod).not.toBeNull();
    expect(mod?.id).toBe(7);
  });

  it('getModule(10) returns null when tier is 9 (M10+ locked)', async () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(9);
    await loadModules('lt');
    const mod = await getModule(10);
    expect(mod).toBeNull();
  });
});
