import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import ModulesPage from '../ModulesPage';
import type { Module } from '../../types/modules';
import type { Progress } from '../../utils/progress';
import { getMaxAccessibleModuleId } from '../../utils/accessTier';

vi.mock('../ModuleView', () => ({ default: () => null }));
vi.mock('../SlideContent', () => ({ default: () => null }));

vi.mock('../../utils/accessTier', () => ({
  getMaxAccessibleModuleId: vi.fn(() => 6),
}));

vi.mock('../../utils/analytics', () => ({
  track: vi.fn(),
}));

const modules = Array.from({ length: 6 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `Modulis ${id}`,
    subtitle: `Subtitle ${id}`,
    description: `Description ${id}`,
    level: id % 3 === 1 ? 'learn' : id % 3 === 2 ? 'test' : 'practice',
    slides: [{ id: id * 10, type: 'content-block', title: 'Slide' }],
  } as Module;
});

vi.mock('../../data/modulesLoader', () => ({
  getModulesSync: vi.fn(() => modules),
}));

function progress(overrides: Partial<Progress> = {}): Progress {
  return {
    completedModules: [1],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: {},
    ...overrides,
  };
}

describe('ModulesPage catalog-first UX', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('prompt-anatomy-locale', 'lt');
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(6);
  });

  it('shows one next-step strip before the catalog and removes duplicate overall progress', () => {
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={progress()} />
    );

    const nextStep = screen.getByText('Kitas tavo žingsnis');
    const baseTrack = screen.getByRole('heading', {
      level: 2,
      name: 'Bazė: promptų sistema (M1–M6)',
    });

    expect(
      nextStep.compareDocumentPosition(baseTrack) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    const cta = screen.getByRole('button', {
      name: /Atidaryti Modulį 2: Modulis 2/i,
    });
    const progressLabel = screen.getByText('Tavo pažanga:');
    expect(progressLabel).toBeInTheDocument();
    expect(screen.getByText('1 iš 6 · 17 %')).toBeInTheDocument();
    expect(
      cta.compareDocumentPosition(progressLabel) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(screen.queryByText('Bendra pažanga')).not.toBeInTheDocument();
    expect(screen.getAllByText('Kitas žingsnis')).toHaveLength(1);
    expect(
      screen.queryByRole('heading', {
        level: 2,
        name: 'Ar 6 blokų sistema tvirta?',
      })
    ).not.toBeInTheDocument();
  });

  it('keeps due recall secondary inside the next-step strip', () => {
    renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        onStartRetrieval={() => {}}
        progress={progress({
          retrievalSchedule: {
            items: [
              {
                id: 'warmup-bank:1',
                kind: 'warmup-bank',
                moduleId: 1,
                completedAt: '2026-01-01T00:00:00.000Z',
                intervalDays: 1,
                nextDueAt: '2026-01-01T00:00:00.000Z',
              },
            ],
          },
        })}
      />
    );

    expect(screen.getByText('Turi 5 min.? Pakartok M1')).toBeInTheDocument();
    expect(screen.queryByTestId('retrieval-due-card')).not.toBeInTheDocument();
  });

  it('places evaluator practice and chapter starts after the catalog', () => {
    renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        onOpenEvalHabit={() => {}}
        progress={progress()}
      />
    );

    const m6 = screen.getByRole('heading', { level: 3, name: 'Modulis 6' });
    const evaluator = screen.getByRole('heading', {
      level: 2,
      name: /Patikrink savo promptą/,
    });
    const chapterStarts = screen.getByText('Pradėk nuo skyriaus');

    expect(
      m6.compareDocumentPosition(evaluator) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      evaluator.compareDocumentPosition(chapterStarts) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('places the M3→M4 ready-check strip before the cycle-2 subsection', () => {
    renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        onGoToQuiz={() => {}}
        progress={progress({ completedModules: [1, 2, 3] })}
      />
    );

    const m3 = screen.getByRole('heading', { level: 3, name: 'Modulis 3' });
    const readyCheck = screen.getByRole('heading', {
      level: 2,
      name: 'Ar 6 blokų sistema tvirta?',
    });
    const cycle2 = screen.getByRole('heading', {
      level: 2,
      name: 'Kontekstas ir projektas (M4–M6)',
    });

    expect(screen.getByText('Kitas tavo žingsnis')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /Atidaryti branduolio pasitikrinimą prieš Modulį 4/i,
      })
    ).toBeInTheDocument();
    expect(
      m3.compareDocumentPosition(readyCheck) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      readyCheck.compareDocumentPosition(cycle2) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('hides the ready-check strip after M4 is completed', () => {
    renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        onGoToQuiz={() => {}}
        progress={progress({ completedModules: [1, 2, 3, 4] })}
      />
    );

    expect(
      screen.queryByRole('heading', {
        level: 2,
        name: 'Ar 6 blokų sistema tvirta?',
      })
    ).not.toBeInTheDocument();
  });

  it('hides the ready-check strip when the quiz is already completed', () => {
    renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        onGoToQuiz={() => {}}
        progress={progress({
          completedModules: [1, 2, 3],
          quizCompleted: true,
        })}
      />
    );

    expect(
      screen.queryByRole('heading', {
        level: 2,
        name: 'Ar 6 blokų sistema tvirta?',
      })
    ).not.toBeInTheDocument();
  });

  it('hides the ready-check strip without a quiz handler', () => {
    renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        progress={progress({ completedModules: [1, 2, 3] })}
      />
    );

    expect(
      screen.queryByRole('heading', {
        level: 2,
        name: 'Ar 6 blokų sistema tvirta?',
      })
    ).not.toBeInTheDocument();
  });
});
