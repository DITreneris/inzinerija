import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import QuizPage from '../QuizPage';
import { getModulesDataSync } from '../../data/modulesLoader';
import type { ModulesData } from '../../types/modules';

vi.mock('../../data/modulesLoader', () => ({
  getModulesDataSync: vi.fn(),
}));

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

const defaultProgress = {
  completedModules: [],
  completedTasks: {},
  quizCompleted: false,
  quizScore: null,
};

const startReadyCheck = async () => {
  await act(async () => {
    await userEvent.click(
      screen.getByRole('button', {
        name: /Pradėti branduolio pasitikrinimą|Start the core readiness check/i,
      })
    );
  });
};

const finishReadyCheck = /Baigti pasitikrinimą|Finish readiness check/i;

describe('QuizPage', () => {
  const onBack = vi.fn();
  const onQuizComplete = vi.fn();

  beforeEach(() => {
    vi.mocked(getModulesDataSync).mockReturnValue(null);
    onBack.mockClear();
    onQuizComplete.mockClear();
  });

  it('shows loading when modules data is not loaded', () => {
    vi.mocked(getModulesDataSync).mockReturnValue(null);
    renderWithProviders(
      <QuizPage
        onBack={onBack}
        progress={defaultProgress}
        onQuizComplete={onQuizComplete}
      />
    );
    expect(screen.getByText(/Kraunama|Loading/i)).toBeInTheDocument();
    expect(onQuizComplete).not.toHaveBeenCalled();
  });

  it('shows empty-state message and back button when quiz.questions is empty', async () => {
    const dataWithEmptyQuiz: ModulesData = {
      modules: [],
      quiz: {
        title: 'Branduolio pasitikrinimas',
        description: 'Trumpas patikrinimas',
        passingScore: 70,
        questions: [],
      },
    };
    vi.mocked(getModulesDataSync).mockReturnValue(dataWithEmptyQuiz);

    renderWithProviders(
      <QuizPage
        onBack={onBack}
        progress={defaultProgress}
        onQuizComplete={onQuizComplete}
      />
    );

    expect(
      screen.getByText(
        /Pasitikrinimo klausimų nėra|No readiness-check questions available/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Grįžti atgal|Back to home|Go back/i })
    ).toBeInTheDocument();
    expect(onQuizComplete).not.toHaveBeenCalled();

    await userEvent.click(
      screen.getByRole('button', { name: /Grįžti atgal|Back to home|Go back/i })
    );
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('shows readiness intro before questions', async () => {
    const dataWithOneQuestion: ModulesData = {
      modules: [],
      quiz: {
        title: 'Testas',
        description: '',
        passingScore: 70,
        questions: [
          {
            id: 1,
            question: 'Test question?',
            options: ['A', 'B'],
            correct: 0,
            explanation: 'Because A',
          },
        ],
      },
    };
    vi.mocked(getModulesDataSync).mockReturnValue(dataWithOneQuestion);
    renderWithProviders(
      <QuizPage
        onBack={onBack}
        progress={{ ...defaultProgress, completedModules: [3] }}
        onQuizComplete={onQuizComplete}
      />
    );
    expect(
      screen.getByRole('heading', {
        name: /Branduolio pasitikrinimas|Core readiness check/i,
      })
    ).toBeInTheDocument();
    expect(screen.queryByText(/Test question/)).not.toBeInTheDocument();
    expect(
      screen.getByText(/Paruošta dabar|You are ready now/i)
    ).toBeInTheDocument();
    await startReadyCheck();
    expect(screen.getByText(/Test question/)).toBeInTheDocument();
  });

  it('calls onQuizComplete with a valid number (not NaN) when submitting with one question', async () => {
    const dataWithOneQuestion: ModulesData = {
      modules: [],
      quiz: {
        title: 'Testas',
        description: '',
        passingScore: 70,
        questions: [
          {
            id: 1,
            question: 'Test question?',
            options: ['A', 'B', 'C'],
            correct: 0,
            explanation: 'Because A',
          },
        ],
      },
    };
    vi.mocked(getModulesDataSync).mockReturnValue(dataWithOneQuestion);

    renderWithProviders(
      <QuizPage
        onBack={onBack}
        progress={defaultProgress}
        onQuizComplete={onQuizComplete}
      />
    );

    await startReadyCheck();
    expect(screen.getByText(/Test question/)).toBeInTheDocument();
    const optionButtons = screen.getAllByRole('button', {
      name: /Pasirink atsakymą:|Select answer:/i,
    });
    await act(async () => {
      await userEvent.click(optionButtons[0]);
    });
    const submitButton = screen.getByRole('button', {
      name: finishReadyCheck,
    });
    await act(async () => {
      await userEvent.click(submitButton);
    });

    expect(onQuizComplete).toHaveBeenCalledTimes(1);
    const score = onQuizComplete.mock.calls[0][0];
    expect(Number.isFinite(score)).toBe(true);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('shows pass state when score ≥ 70%', async () => {
    const dataWithOneQuestion: ModulesData = {
      modules: [],
      quiz: {
        title: 'Testas',
        description: '',
        passingScore: 70,
        questions: [
          {
            id: 1,
            question: 'Pass question?',
            options: ['Correct', 'Wrong'],
            correct: 0,
            explanation: 'Correct is right',
          },
        ],
      },
    };
    vi.mocked(getModulesDataSync).mockReturnValue(dataWithOneQuestion);
    renderWithProviders(
      <QuizPage
        onBack={onBack}
        progress={defaultProgress}
        onQuizComplete={onQuizComplete}
      />
    );
    await startReadyCheck();
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /Correct/ }));
    });
    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', { name: finishReadyCheck })
      );
    });
    expect(
      screen.getByRole('heading', {
        name: /Tinka eiti toliau|Ready to go further/i,
      })
    ).toBeInTheDocument();
  });

  it('shows fail state when score < 70%', async () => {
    const dataWithOneQuestion: ModulesData = {
      modules: [],
      quiz: {
        title: 'Testas',
        description: '',
        passingScore: 70,
        questions: [
          {
            id: 1,
            question: 'Fail question?',
            options: ['Wrong', 'Correct'],
            correct: 1,
            explanation: 'Second is correct',
          },
        ],
      },
    };
    vi.mocked(getModulesDataSync).mockReturnValue(dataWithOneQuestion);
    renderWithProviders(
      <QuizPage
        onBack={onBack}
        progress={defaultProgress}
        onQuizComplete={onQuizComplete}
      />
    );
    await startReadyCheck();
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /Wrong/ }));
    });
    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', { name: finishReadyCheck })
      );
    });
    expect(
      screen.getByRole('heading', {
        name: /Dar pasitikrink branduolį|Strengthen the core first/i,
      })
    ).toBeInTheDocument();
  });

  it('shows explanation after answering a question', async () => {
    const dataWithOneQuestion: ModulesData = {
      modules: [],
      quiz: {
        title: 'Testas',
        description: '',
        passingScore: 70,
        questions: [
          {
            id: 1,
            question: 'Test question?',
            options: ['A', 'B'],
            correct: 0,
            explanation: 'Because A is correct',
          },
        ],
      },
    };
    vi.mocked(getModulesDataSync).mockReturnValue(dataWithOneQuestion);
    renderWithProviders(
      <QuizPage
        onBack={onBack}
        progress={defaultProgress}
        onQuizComplete={onQuizComplete}
      />
    );
    await startReadyCheck();
    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', {
          name: /Pasirink atsakymą: A|Select answer: A/i,
        })
      );
    });
    expect(screen.getByText(/Because A is correct/)).toBeInTheDocument();
  });

  it('shows Deepen spin-off on results when score below 70%', async () => {
    const dataWithOneQuestion: ModulesData = {
      modules: [],
      quiz: {
        title: 'Testas',
        description: '',
        passingScore: 70,
        questions: [
          {
            id: 1,
            question: 'Q?',
            options: ['A', 'B'],
            correct: 0,
            explanation: 'Because A is correct',
          },
        ],
      },
    };
    vi.mocked(getModulesDataSync).mockReturnValue(dataWithOneQuestion);
    renderWithProviders(
      <QuizPage
        onBack={onBack}
        progress={defaultProgress}
        onQuizComplete={onQuizComplete}
      />
    );
    await startReadyCheck();
    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', {
          name: /Pasirink atsakymą: B|Select answer: B/i,
        })
      );
    });
    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', { name: finishReadyCheck })
      );
    });
    const deepenLink = screen.getByRole('link', {
      name: /Prompt Anatomy blog|promptanatomy\.blog/i,
    });
    expect(deepenLink).toBeInTheDocument();
    expect(deepenLink).toHaveAttribute(
      'href',
      'https://www.promptanatomy.blog/?utm_source=training&utm_medium=spinoff&utm_campaign=m2_quiz_fail'
    );
    expect(
      screen.queryByRole('link', {
        name: /DI Operacinį centrą|AI Operations Centre|Operations Centre/i,
      })
    ).not.toBeInTheDocument();
  });

  it('does not show ecosystem spin-off when quiz passed', async () => {
    const dataWithOneQuestion: ModulesData = {
      modules: [],
      quiz: {
        title: 'Testas',
        description: '',
        passingScore: 70,
        questions: [
          {
            id: 1,
            question: 'Q?',
            options: ['A', 'B'],
            correct: 0,
            explanation: '',
          },
        ],
      },
    };
    vi.mocked(getModulesDataSync).mockReturnValue(dataWithOneQuestion);
    renderWithProviders(
      <QuizPage
        onBack={onBack}
        progress={defaultProgress}
        onQuizComplete={onQuizComplete}
      />
    );
    await startReadyCheck();
    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', {
          name: /Pasirink atsakymą: A|Select answer: A/i,
        })
      );
    });
    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', { name: finishReadyCheck })
      );
    });
    expect(
      screen.queryByRole('link', {
        name: /Gilesni skaitiniai|Deep reads|DI Operacinį|Operations Centre/i,
      })
    ).not.toBeInTheDocument();
  });
});
