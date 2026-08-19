/**
 * Path Test submit: answers are enough; confidence is optional.
 */
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { TestSectionSlide } from '../TestPracticeSlides';
import { renderWithProviders } from '../../../../test/test-utils';
import type { TestQuestion } from '../../../../types/modules';

const mcq: TestQuestion = {
  id: 'q-mcq',
  type: 'mcq',
  question: 'Kuris blokas pirmas?',
  options: ['Meta', 'Input'],
  correct: 0,
  explanation: 'Meta eina pirma.',
};

describe('TestSectionSlide submit gate', () => {
  it('enables check answers after MCQ pick without confidence', () => {
    const onComplete = vi.fn();
    renderWithProviders(
      <TestSectionSlide
        questions={[mcq]}
        onComplete={onComplete}
        isCompleted={false}
      />
    );

    const submit = screen.getByRole('button', {
      name: /Patikrinti atsakymus/i,
    });
    expect(submit).toBeDisabled();

    fireEvent.click(
      screen.getByRole('button', { name: /Pasirinkimas: Meta/i })
    );
    expect(submit).not.toBeDisabled();

    fireEvent.click(submit);
    expect(onComplete).toHaveBeenCalled();
  });
});
