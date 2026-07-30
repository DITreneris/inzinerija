/**
 * P2 #2 T2 – kritiniai App/Quiz/progress srautai (ne full coverage).
 * T2.1 quiz → progress · T2.2 resume clamp · T2.3 locale mid-quiz
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import QuizPage from '../QuizPage';
import {
  flushProgressSave,
  getProgress,
  resetProgress,
  saveProgress,
} from '../../utils/progress';
import {
  clampSlideIndex,
  getSavedSlidePosition,
  saveSlidePosition,
} from '../../utils/useSlideNavigation';
import { getModulesDataSync } from '../../data/modulesLoader';
import type { ModulesData } from '../../types/modules';
import { useLocale } from '../../contexts/LocaleContext';

vi.mock('../../data/modulesLoader', () => ({
  getModulesDataSync: vi.fn(),
}));

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

const quizFixture: ModulesData = {
  modules: [],
  quiz: {
    title: 'Branduolio pasitikrinimas',
    description: 'T2 fixture',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'T2 LT klausimas / T2 EN question?',
        options: ['Teisinga / Correct', 'Neteisinga / Wrong'],
        correct: 0,
        explanation: 'T2 explanation',
      },
    ],
  },
};

const defaultProgress = {
  completedModules: [1, 2, 3] as number[],
  completedTasks: {} as Record<number, number[]>,
  quizCompleted: false,
  quizScore: null as number | null,
};

function LocaleToggleProbe() {
  const { locale, setLocale } = useLocale();
  return (
    <button
      type="button"
      onClick={() => setLocale(locale === 'lt' ? 'en' : 'lt')}
    >
      toggle-locale-{locale}
    </button>
  );
}

describe('P2 #2 T2 flows', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('prompt-anatomy-locale', 'lt');
    vi.mocked(getModulesDataSync).mockReturnValue(quizFixture);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    flushProgressSave();
    resetProgress();
    vi.restoreAllMocks();
  });

  it('T2.1: quiz pass (≥70) persists quizCompleted + quizScore via progress save path', async () => {
    const onQuizComplete = vi.fn((score: number) => {
      saveProgress({
        ...defaultProgress,
        quizCompleted: true,
        quizScore: score,
      });
      flushProgressSave();
    });

    renderWithProviders(
      <QuizPage
        onBack={vi.fn()}
        progress={defaultProgress}
        onQuizComplete={onQuizComplete}
      />
    );

    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', {
          name: /Pradėti branduolio pasitikrinimą|Start the core readiness check/i,
        })
      );
    });
    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', {
          name: /Pasirink atsakymą: Teisinga|Select answer: Teisinga/i,
        })
      );
    });
    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', {
          name: /Baigti pasitikrinimą|Finish readiness check/i,
        })
      );
    });

    expect(onQuizComplete).toHaveBeenCalledWith(100);
    const loaded = getProgress();
    expect(loaded.quizCompleted).toBe(true);
    expect(loaded.quizScore).toBeGreaterThanOrEqual(70);
  });

  it('T2.2: resume slide-pos over slideCount is clamped before use', () => {
    saveSlidePosition(1, 99);
    expect(getSavedSlidePosition(1)).toBe(99);
    const slideCount = 5;
    const resumeIndex = clampSlideIndex(getSavedSlidePosition(1), slideCount);
    expect(resumeIndex).toBe(4);
    expect(resumeIndex).toBeLessThan(slideCount);
  });

  it('T2.3: mid-quiz locale LT→EN keeps question visible and switches chrome', async () => {
    renderWithProviders(
      <>
        <LocaleToggleProbe />
        <QuizPage
          onBack={vi.fn()}
          progress={defaultProgress}
          onQuizComplete={vi.fn()}
        />
      </>
    );

    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', {
          name: /Pradėti branduolio pasitikrinimą|Start the core readiness check/i,
        })
      );
    });
    expect(screen.getByText(/T2 LT klausimas/i)).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', { name: /toggle-locale-lt/i })
      );
    });

    expect(screen.getByText(/T2 LT klausimas/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /Finish readiness check|Baigti pasitikrinimą/i,
      })
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: /toggle-locale-en/i })
    ).toBeInTheDocument();
  });
});
