/**
 * Ordering: current order is the answer — onComplete fires without "Check order".
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OrderingQuestion } from '../OrderingQuestion';
import { LocaleProvider } from '../../../../../contexts/LocaleContext';

const orderingQuestion = {
  id: 'ord-1',
  type: 'ordering' as const,
  question: 'Surikiuok blokus',
  correctOrder: ['Meta', 'Input', 'Output'],
  items: ['Input', 'Meta', 'Output'],
  explanation: 'Paaiškinimas.',
};

describe('OrderingQuestion auto-complete', () => {
  it('calls onComplete on mount without clicking Check order', async () => {
    const onComplete = vi.fn();
    render(
      <LocaleProvider>
        <OrderingQuestion
          question={orderingQuestion}
          questionIndex={0}
          showResults={false}
          showHint={false}
          onComplete={onComplete}
          onRequestHint={vi.fn()}
        />
      </LocaleProvider>
    );

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith('ord-1', expect.any(Number));
    });
    expect(
      screen.getByRole('button', { name: /Patikrinti tvarką/i })
    ).toBeInTheDocument();
  });

  it('updates onComplete score after an arrow move', async () => {
    const onComplete = vi.fn();
    render(
      <LocaleProvider>
        <OrderingQuestion
          question={orderingQuestion}
          questionIndex={0}
          showResults={false}
          showHint={false}
          onComplete={onComplete}
          onRequestHint={vi.fn()}
        />
      </LocaleProvider>
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Perkelti aukštyn: Meta/i })
    );

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith('ord-1', 1);
    });
  });

  it('keeps arrows enabled after Check order and updates score on move', async () => {
    const onComplete = vi.fn();
    render(
      <LocaleProvider>
        <OrderingQuestion
          question={orderingQuestion}
          questionIndex={0}
          showResults={false}
          showHint={false}
          onComplete={onComplete}
          onRequestHint={vi.fn()}
        />
      </LocaleProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Patikrinti tvarką/i }));
    const moveUp = screen.getByRole('button', {
      name: /Perkelti aukštyn: Meta/i,
    });
    expect(moveUp).not.toBeDisabled();
    fireEvent.click(moveUp);

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith('ord-1', 1);
    });
  });
});
