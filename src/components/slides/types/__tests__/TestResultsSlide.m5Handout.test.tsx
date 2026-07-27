import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import { TestResultsSlide } from '../TestPracticeSlides';
import type { Progress } from '../../../../utils/progress';

vi.mock('../../../../utils/downloadHandout', () => ({
  downloadHandout: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../../../utils/analytics', () => ({
  trackSpinoffClick: vi.fn(),
  track: vi.fn(),
}));

function progressWithScore(score: number): Progress {
  return {
    completedModules: [5],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: { 5: score },
  };
}

describe('TestResultsSlide M5 handout CTA', () => {
  beforeEach(() => {
    localStorage.setItem('prompt-anatomy-locale', 'lt');
    vi.clearAllMocks();
  });

  it('shows Modulio 5 handout download when score is 0', () => {
    renderWithProviders(
      <TestResultsSlide moduleId={5} progress={progressWithScore(0)} />
    );
    expect(
      screen.getByRole('button', {
        name: /Parsisiųsti Modulio 5 atmintinę/i,
      })
    ).toBeInTheDocument();
  });

  it('shows Modulio 5 handout download when score is 85 (passed)', () => {
    renderWithProviders(
      <TestResultsSlide moduleId={5} progress={progressWithScore(85)} />
    );
    expect(
      screen.getByRole('button', {
        name: /Parsisiųsti Modulio 5 atmintinę/i,
      })
    ).toBeInTheDocument();
  });
});
