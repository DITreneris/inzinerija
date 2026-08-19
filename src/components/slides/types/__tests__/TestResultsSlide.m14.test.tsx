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
    moduleTestScores: { 14: score },
  };
}

describe('TestResultsSlide M14 0% fallback', () => {
  beforeEach(() => {
    localStorage.setItem('prompt-anatomy-locale', 'lt');
  });

  it('shows Module 13 fail copy at 0%, not Module 1', () => {
    renderWithProviders(
      <TestResultsSlide moduleId={14} progress={progressWithScore(0)} />
    );

    expect(screen.getByText(/Modulio 13 skaidres/i)).toBeInTheDocument();
    expect(screen.queryByText(/Modulį 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Meta–Advanced/i)).not.toBeInTheDocument();
  });
});
