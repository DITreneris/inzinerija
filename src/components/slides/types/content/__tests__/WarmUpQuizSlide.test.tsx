import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n from '../../../../../i18n';
import { WarmUpQuizSlide } from '../WarmUpQuizSlide';
import type { WarmUpQuizContent } from '../../../../../types/modules';

const threeQuestions: WarmUpQuizContent = {
  questions: [
    {
      id: 'w1',
      question: 'Q1',
      options: ['A1', 'B1'],
      correct: 0,
      explanation: 'E1',
    },
    {
      id: 'w2',
      question: 'Q2',
      options: ['A2', 'B2'],
      correct: 0,
      explanation: 'E2',
    },
    {
      id: 'w3',
      question: 'Q3',
      options: ['A3', 'B3'],
      correct: 0,
      explanation: 'E3',
    },
  ],
};

async function answerAndAdvance(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /A\d/ }));
}

describe('WarmUpQuizSlide chrome', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('lt');
  });

  afterEach(async () => {
    await i18n.changeLanguage('lt');
  });

  it('LT: mid CTA is Pirmyn; last CTA is Baigti, not the raw finish key', async () => {
    const user = userEvent.setup();
    render(<WarmUpQuizSlide content={threeQuestions} />);

    await answerAndAdvance(user);
    expect(screen.getByRole('button', { name: 'Pirmyn' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^finish$/i })).toBeNull();

    await user.click(screen.getByRole('button', { name: 'Pirmyn' }));
    await answerAndAdvance(user);
    await user.click(screen.getByRole('button', { name: 'Pirmyn' }));
    await answerAndAdvance(user);

    const finishCta = screen.getByRole('button', { name: 'Baigti' });
    expect(finishCta).toBeInTheDocument();
    expect(finishCta).not.toHaveTextContent(/^finish$/i);
  });

  it('LT: after Baigti, done copy does not say the graded test is ungraded', async () => {
    const user = userEvent.setup();
    render(<WarmUpQuizSlide content={threeQuestions} />);

    for (let i = 0; i < 3; i += 1) {
      await answerAndAdvance(user);
      await user.click(screen.getByRole('button', { name: /Pirmyn|Baigti/ }));
    }

    expect(screen.getByText('Savitikra baigta')).toBeInTheDocument();
    expect(
      screen.getByText('Toliau – įskaitiniai klausimai.')
    ).toBeInTheDocument();
    expect(screen.queryByText(/įskaita neįskaitoma/i)).toBeNull();
    expect(screen.queryByText(/not graded/i)).toBeNull();
  });

  it('EN: last CTA is Finish, not the raw key', async () => {
    await i18n.changeLanguage('en');
    const user = userEvent.setup();
    render(<WarmUpQuizSlide content={threeQuestions} />);

    for (let i = 0; i < 2; i += 1) {
      await answerAndAdvance(user);
      await user.click(screen.getByRole('button', { name: 'Next' }));
    }
    await answerAndAdvance(user);

    expect(screen.getByRole('button', { name: 'Finish' })).toBeInTheDocument();
  });
});
