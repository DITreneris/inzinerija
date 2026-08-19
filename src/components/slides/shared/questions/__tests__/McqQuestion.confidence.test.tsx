/**
 * MCQ: atsakymų variantai aktyvūs be pasirinkto pasitikėjimo (F3-1 regresijos fix).
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';
import { McqQuestion } from '../McqQuestion';
import type { ConfidenceLevel } from '../ConfidenceSelector';
import { LocaleProvider } from '../../../../../contexts/LocaleContext';

const baseQuestion = {
  id: 'q1',
  question: 'Kuris blokas apibrėžia rolę?',
  options: ['Meta', 'Input', 'Output'],
  correct: 0,
  explanation: 'Meta blokas.',
};

function renderMcq(confidence?: ConfidenceLevel, stemVisual?: ReactNode) {
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
        stemVisual={stemVisual}
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

  it('renders an optional stem visual before answer options', () => {
    renderMcq(undefined, <div data-testid="scheme-stem">Schema</div>);
    expect(screen.getByTestId('scheme-stem')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Pasirinkimas: Meta/i })
    ).toBeInTheDocument();
  });

  it('renders confidence after the first answer option', () => {
    renderMcq(undefined);
    const option = screen.getByRole('button', { name: /Pasirinkimas: Meta/i });
    const confidence = screen.getByRole('group', { name: /Kiek esi tikras/i });
    expect(
      option.compareDocumentPosition(confidence) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});
