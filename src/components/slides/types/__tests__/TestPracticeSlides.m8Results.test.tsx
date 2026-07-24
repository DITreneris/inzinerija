import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import { TestResultsSlide } from '../TestPracticeSlides';
import type { Progress } from '../../../../utils/progress';

function baseProgress(score: number): Progress {
  return {
    completedModules: [7, 8],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: { 8: score },
  };
}

describe('M8 test-results CTAs', () => {
  it('fail retry deep-links to M8 test-section and theory CTA keeps remediation source', () => {
    const onGoToModule = vi.fn();
    const onNextSlide = vi.fn();

    renderWithProviders(
      <TestResultsSlide
        moduleId={8}
        progress={baseProgress(55)}
        onGoToModule={onGoToModule}
        onNextSlide={onNextSlide}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Bandyti testą dar kartą/i })
    );
    expect(onGoToModule).toHaveBeenCalledWith(8, expect.any(Number));
    expect(onNextSlide).not.toHaveBeenCalled();

    onGoToModule.mockClear();
    fireEvent.click(
      screen.getByRole('button', { name: /Peržiūrėti Modulį 7/i })
    );
    expect(onGoToModule).toHaveBeenCalledWith(7, undefined, 8);
  });

  it('pass shows bonuses CTA and Module 9 shortcut', () => {
    const onGoToModule = vi.fn();
    const onNextSlide = vi.fn();

    renderWithProviders(
      <TestResultsSlide
        moduleId={8}
        progress={baseProgress(80)}
        onGoToModule={onGoToModule}
        onNextSlide={onNextSlide}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Tęsti – bonusai \(nebūtina\)/i })
    );
    expect(onNextSlide).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /Į Modulį 9/i }));
    expect(onGoToModule).toHaveBeenCalledWith(9);
  });
});
