/**
 * MCQ: atsakymų variantai aktyvūs be pasirinkto pasitikėjimo (F3-1 regresijos fix).
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { McqQuestion } from '../McqQuestion';
import { LocaleProvider } from '../../../../../contexts/LocaleContext';

const baseQuestion = {
  id: 'q1',
  question: 'Kuris blokas apibrėžia rolę?',
  options: ['Meta', 'Input', 'Output'],
  correct: 0,
  explanation: 'Meta blokas.',
};

function renderMcq(confidence?: 1 | 2 | 3) {
  const onAnswer = vi.fn();
  render(
    <LocaleProvider>
      <McqQuestion
        question={baseQuestion}
        questionIndex={0}
        userAnswer={undefined}
        showResults={false}
        showHint={false}
        confidence={confidence}
        onConfidence={vi.fn()}
        onAnswer={onAnswer}
        onRequestHint={vi.fn()}
      />
    </LocaleProvider>
  );
  return { onAnswer };
}

describe('McqQuestion confidence gate', () => {
  it('answer options are enabled when confidence is undefined', () => {
    renderMcq(undefined);
    const option = screen.getByRole('button', { name: /Pasirinkimas: Meta/i });
    expect(option).not.toBeDisabled();
  });

  it('calls onAnswer when option clicked without confidence', () => {
    const { onAnswer } = renderMcq(undefined);
    fireEvent.click(
      screen.getByRole('button', { name: /Pasirinkimas: Meta/i })
    );
    expect(onAnswer).toHaveBeenCalledWith('q1', 0);
  });
});
