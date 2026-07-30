import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import ModulesPage from '../ModulesPage';
import type { Module } from '../../types/modules';
import type { Progress } from '../../utils/progress';
import { getMaxAccessibleModuleId } from '../../utils/accessTier';
import { CHAPTER_RECOVERY_DISMISSED_KEY } from '../../utils/chapterStarts';

vi.mock('../ModuleView', () => ({ default: () => null }));
vi.mock('../SlideContent', () => ({ default: () => null }));

vi.mock('../../utils/accessTier', () => ({
  getMaxAccessibleModuleId: vi.fn(() => 9),
}));

vi.mock('../../utils/analytics', () => ({
  track: vi.fn(),
}));

const modules = Array.from({ length: 12 }, (_, index) => {
  const id = index + 1;
  const unlocksAfter = id === 7 || id === 10 ? 6 : id > 1 ? id - 1 : undefined;
  return {
    id,
    title: `Modulis ${id}`,
    subtitle: `Subtitle ${id}`,
    description: `Description ${id}`,
    level: 'learn',
    unlocksAfter,
    slides: [{ id: id * 10, type: 'content-block', title: 'Slide' }],
  } as Module;
});

vi.mock('../../data/modulesLoader', () => ({
  getModulesSync: vi.fn(() => modules),
}));

function emptyProgress(): Progress {
  return {
    completedModules: [],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: {},
  };
}

describe('ModulesPage chapter starts / recovery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('prompt-anatomy-locale', 'lt');
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(9);
  });

  it('shows recovery card and chapter strip when progress empty and tier ≥ 6', () => {
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={emptyProgress()} />
    );

    expect(screen.getByText('Kur nori tęsti?')).toBeInTheDocument();
    expect(screen.getByText('Skyrių startai')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: /Pradėti nuo modulio 7/i }).length
    ).toBeGreaterThan(0);
  });

  it('dismisses recovery card but keeps chapter strip', () => {
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={emptyProgress()} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Uždaryti' }));
    expect(screen.queryByText('Kur nori tęsti?')).not.toBeInTheDocument();
    expect(screen.getByText('Skyrių startai')).toBeInTheDocument();
    expect(localStorage.getItem(CHAPTER_RECOVERY_DISMISSED_KEY)).toBe('1');
  });

  it('does not show recovery when progress is non-empty', () => {
    renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        progress={{ ...emptyProgress(), completedModules: [1] }}
      />
    );

    expect(screen.queryByText('Kur nori tęsti?')).not.toBeInTheDocument();
    expect(screen.getByText('Skyrių startai')).toBeInTheDocument();
  });

  it('hides chapter strip when tier < 6', () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(3);
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={emptyProgress()} />
    );

    expect(screen.queryByText('Skyrių startai')).not.toBeInTheDocument();
    expect(screen.queryByText('Kur nori tęsti?')).not.toBeInTheDocument();
  });

  it('tier 12 strip includes module 10 chip', () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(12);
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={emptyProgress()} />
    );

    expect(
      screen.getAllByRole('button', { name: /Pradėti nuo modulio 10/i }).length
    ).toBeGreaterThan(0);
  });
});
