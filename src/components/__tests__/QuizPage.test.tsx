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
        title: 'Baigiamasis Testas',
        description: 'Galutinis žinių patikrinimas',
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

    expect(screen.getByText(/Apklausos klausimų nėra|No quiz questions available/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Grįžti atgal|Back to home|Go back/i })).toBeInTheDocument();
    expect(onQuizComplete).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: /Grįžti atgal|Back to home|Go back/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
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

    expect(screen.getByText(/Test question/)).toBeInTheDocument();
    const optionButtons = screen.getAllByRole('button', { name: /Pasirink atsakymą:|Select answer:/i });
    await act(async () => {
      await userEvent.click(optionButtons[0]);
    });
    const submitButton = screen.getByRole('button', { name: /Baigti apklausą|Finish quiz/i });
    await act(async () => {
      await userEvent.click(submitButton);
    });

    expect(onQuizComplete).toHaveBeenCalledTimes(1);
    const score = onQuizComplete.mock.calls[0][0];
    expect(Number.isFinite(score)).toBe(true);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('shows pass state (Puikiai) when score ≥ 70%', async () => {
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
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /Correct/ }));
    });
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /Baigti apklausą|Finish quiz/i }));
    });
    expect(screen.getByText(/Puikiai|Well done/i)).toBeInTheDocument();
  });

  it('shows fail state (Bandykite dar kartą) when score < 70%', async () => {
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
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /Wrong/ }));
    });
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /Baigti apklausą|Finish quiz/i }));
    });
    expect(screen.getByRole('heading', { name: /Bandykite dar kartą|Try again/i })).toBeInTheDocument();
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
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /Pasirink atsakymą: A|Select answer: A/i }));
    });
    expect(screen.getByText(/Because A is correct/)).toBeInTheDocument();
  });

  it('shows CEO hidden-treasure link on results screen', async () => {
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
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /Pasirink atsakymą: A|Select answer: A/i }));
    });
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /Baigti apklausą|Finish quiz/i }));
    });
    const ceoLink = screen.getByRole('link', { name: /DI Operacinį centrą|AI Operations Centre|Operations Centre/i });
    expect(ceoLink).toBeInTheDocument();
    expect(ceoLink).toHaveAttribute('href', 'https://ditreneris.github.io/ceo/');
    expect(ceoLink).toHaveAttribute('target', '_blank');
    expect(ceoLink).toHaveAttribute('rel', expect.stringMatching(/noopener/));
  });
});
