import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { renderWithProviders } from '../../test/test-utils';
import App from '../../App';
import { flushProgressSave, getProgress, resetProgress } from '../../utils/progress';
import { loadModules, getModulesDataSync, getModulesSync, preloadModules } from '../../data/modulesLoader';
import type { ModulesData } from '../../types/modules';

const fixtureEmptyQuiz: ModulesData = {
  modules: [],
  quiz: {
    title: 'Baigiamasis Testas',
    description: 'Galutinis žinių patikrinimas',
    passingScore: 70,
    questions: [],
  },
};

vi.mock('../../data/modulesLoader', () => ({
  loadModules: vi.fn(),
  getModulesDataSync: vi.fn(),
  getModulesSync: vi.fn(),
  preloadModules: vi.fn(),
}));

const matchMediaMock = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

function getQuizNavButton() {
  const nav = screen.getByRole('navigation', { name: /Pagrindinė navigacija|Main navigation/i });
  return within(nav).getByRole('button', { name: /Apklausa|Quiz/i });
}

describe('App – Quiz integracinis srautas', () => {
  const storageKey = 'prompt-anatomy-locale';

  beforeEach(() => {
    vi.mocked(getModulesDataSync).mockReturnValue(fixtureEmptyQuiz);
    vi.mocked(loadModules).mockResolvedValue(fixtureEmptyQuiz);
    vi.mocked(getModulesSync).mockReturnValue([]);
    vi.mocked(preloadModules).mockImplementation(() => {});
    localStorage.clear();
    localStorage.setItem(storageKey, 'lt');
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(matchMediaMock),
    });
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    flushProgressSave();
    resetProgress();
    vi.restoreAllMocks();
  });

  it('naviguoja į Apklausą ir rodo empty-state kai quiz.questions tuščias', async () => {
    renderWithProviders(<HelmetProvider><App /></HelmetProvider>);

    await userEvent.click(getQuizNavButton());

    // Laukiame stabilesnio signalo, kad QuizPage empty-state jau tikrai užsikrovė.
    await screen.findByRole('button', { name: /Grįžti atgal|Back to home|Go back/i }, { timeout: 10000 });

    expect(
      screen.getByText((content) =>
        /Apklausos klausimų nėra|No quiz questions available/i.test(content)
      )
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Grįžti atgal|Back to home|Go back/i })).toBeInTheDocument();
  }, 15000);

  it('mygtukas „Grįžti atgal“ Apklausoje grąžina atgal', async () => {
    renderWithProviders(<HelmetProvider><App /></HelmetProvider>);

    await userEvent.click(getQuizNavButton());

    await screen.findByText(/Apklausos klausimų nėra|No quiz questions available/i, { timeout: 10000 });

    const backButton = await screen.findByRole('button', { name: /Grįžti atgal|Back to home|Go back/i, timeout: 5000 });
    await userEvent.click(backButton);

    // Po navigacijos į Home Quiz turinys (empty state) turi išnykti
    await waitFor(
      () => {
        expect(screen.queryByText(/Apklausos klausimų nėra|No quiz questions available/i)).not.toBeInTheDocument();
      },
      { timeout: 10000 }
    );
    expect(getQuizNavButton()).toBeInTheDocument();
  }, 20000);

  it('progress išlieka po navigacijos į Apklausą ir atgal', async () => {
    const progressWithModule = {
      ...getProgress(),
      completedModules: [1],
      completedTasks: { 1: [1] },
    };
    vi.mocked(getModulesDataSync).mockReturnValue(fixtureEmptyQuiz);
    localStorage.setItem(
      'prompt-anatomy-progress',
      JSON.stringify({
        version: 2,
        ...progressWithModule,
        quizCompleted: false,
        quizScore: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );

    renderWithProviders(<HelmetProvider><App /></HelmetProvider>);

    await userEvent.click(getQuizNavButton());

    await screen.findByText(/Apklausos klausimų nėra|No quiz questions available/i, { timeout: 10000 });

    await userEvent.click(screen.getByRole('button', { name: /Grįžti atgal|Back to home|Go back/i }));

    const progressAfter = getProgress();
    expect(progressAfter.completedModules).toContain(1);
    expect(progressAfter.completedTasks[1]).toContain(1);
  }, 15000);

  it('rodo retry fallback quiz puslapyje, kai modulių užkrovimas nepavyksta', async () => {
    vi.mocked(getModulesDataSync).mockReturnValue(null);
    vi.mocked(loadModules).mockRejectedValueOnce(new Error('load failed'));

    renderWithProviders(<HelmetProvider><App /></HelmetProvider>);

    await userEvent.click(getQuizNavButton());

    await screen.findByText(
      /Nepavyko įkelti mokymo medžiagos|Failed to load training material/i,
      { timeout: 10000 }
    );
    expect(screen.getByRole('button', { name: /Bandyti dar kartą|Try again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Atgal|Back/i })).toBeInTheDocument();
  }, 15000);
});

describe('App – EN locale smoke', () => {
  const storageKey = 'prompt-anatomy-locale';

  beforeEach(() => {
    vi.mocked(getModulesDataSync).mockReturnValue(fixtureEmptyQuiz);
    vi.mocked(loadModules).mockResolvedValue(fixtureEmptyQuiz);
    vi.mocked(getModulesSync).mockReturnValue([]);
    vi.mocked(preloadModules).mockImplementation(() => {});
    localStorage.setItem(storageKey, 'en');
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    flushProgressSave();
    localStorage.removeItem(storageKey);
    vi.restoreAllMocks();
  });

  it('shows EN nav strings when locale is en', async () => {
    renderWithProviders(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByText('Modules')).toBeInTheDocument();
  });
});
