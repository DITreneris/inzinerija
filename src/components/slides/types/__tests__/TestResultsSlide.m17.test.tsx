import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import { TestResultsSlide } from '../TestPracticeSlides';
import type { Progress } from '../../../../utils/progress';

vi.mock('../../../../utils/analytics', () => ({
  trackSpinoffClick: vi.fn(),
  track: vi.fn(),
}));

function progressWithScore(score: number): Progress {
  return {
    completedModules: [],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: { 17: score },
  };
}

describe('TestResultsSlide M17 0% fallback', () => {
  beforeEach(() => {
    localStorage.setItem('prompt-anatomy-locale', 'lt');
  });

  it('shows Module 16 fail copy at 0%, not Module 1', () => {
    renderWithProviders(
      <TestResultsSlide moduleId={17} progress={progressWithScore(0)} />
    );

    expect(screen.getByText(/Modulio 16/i)).toBeInTheDocument();
    expect(screen.queryByText(/Modulį 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Meta–Advanced/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/6 blokų/i)).not.toBeInTheDocument();
  });

  it('on pass does not send the learner to Module 3', () => {
    renderWithProviders(
      <TestResultsSlide moduleId={17} progress={progressWithScore(80)} />
    );

    expect(screen.getByText(/Modulio 18/i)).toBeInTheDocument();
    expect(screen.queryByText(/Modulį 3/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Pradėti Modulį 3/i)).not.toBeInTheDocument();
  });
});
