import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import { TestResultsSlide } from '../TestPracticeSlides';
import type { Progress } from '../../../../utils/progress';

vi.mock('../../../../utils/analytics', () => ({
  trackSpinoffClick: vi.fn(),
  track: vi.fn(),
}));

function progressWithScore(moduleId: number, score: number): Progress {
  return {
    completedModules: [],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: { [moduleId]: score },
  };
}

describe('TestResultsSlide ecosystem deepen (M8, M11)', () => {
  beforeEach(() => {
    localStorage.setItem('prompt-anatomy-locale', 'lt');
  });

  it('M8 fail shows RAG in production blog deep link', () => {
    renderWithProviders(
      <TestResultsSlide moduleId={8} progress={progressWithScore(8, 50)} />
    );
    const link = screen.getByRole('link', {
      name: /RAG in production promptanatomy\.blog/i,
    });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('/articles/rag-in-production/')
    );
    expect(link.getAttribute('href')).toMatch(/utm_campaign=m8_test_fail/);
  });

  it('M8 pass does not show deepen blog link', () => {
    renderWithProviders(
      <TestResultsSlide moduleId={8} progress={progressWithScore(8, 80)} />
    );
    expect(
      screen.queryByRole('link', {
        name: /RAG in production promptanatomy\.blog/i,
      })
    ).not.toBeInTheDocument();
  });

  it('M11 fail shows evaluating-agents-with-clear blog deep link', () => {
    renderWithProviders(
      <TestResultsSlide moduleId={11} progress={progressWithScore(11, 40)} />
    );
    const link = screen.getByRole('link', {
      name: /Evaluating agents with CLEAR promptanatomy\.blog/i,
    });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('/articles/evaluating-agents-with-clear/')
    );
    expect(link.getAttribute('href')).toMatch(/utm_campaign=m11_test_fail/);
  });
});
