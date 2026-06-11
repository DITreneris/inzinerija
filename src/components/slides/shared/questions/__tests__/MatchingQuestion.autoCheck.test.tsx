/**
 * Matching: auto-check kviečia onComplete kai visos poros susietos.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MatchingQuestion } from '../MatchingQuestion';
import { LocaleProvider } from '../../../../../contexts/LocaleContext';

const matchingQuestion = {
  id: 'm1',
  type: 'matching' as const,
  question: 'Sujunk blokus su apibrėžimais',
  matchPairs: [
    { left: 'Meta', right: 'Rolė' },
    { left: 'Input', right: 'Duomenys' },
  ],
  explanation: 'Paaiškinimas.',
};

describe('MatchingQuestion auto-check', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  it('calls onComplete when all pairs are matched without clicking Check', async () => {
    const onComplete = vi.fn();
    render(
      <LocaleProvider>
        <MatchingQuestion
          question={matchingQuestion}
          questionIndex={0}
          showResults={false}
          showHint={false}
          onComplete={onComplete}
          onRequestHint={vi.fn()}
        />
      </LocaleProvider>
    );

    const leftButtons = screen.getAllByRole('button', { name: /Kairė pusė/i });
    const rightButtons = screen.getAllByRole('button', {
      name: /Dešinė pusė/i,
    });

    fireEvent.click(leftButtons[0]);
    fireEvent.click(rightButtons[0]);
    fireEvent.click(leftButtons[1]);
    fireEvent.click(rightButtons[1]);

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith('m1', expect.any(Number));
    });
  });
});
