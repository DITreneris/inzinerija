import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { renderWithProviders } from '../../test/test-utils';
import App from '../../App';
import {
  flushProgressSave,
  getProgress,
  resetProgress,
} from '../../utils/progress';
import {
  loadModules,
  getModulesDataSync,
  getModulesSync,
  preloadModules,
} from '../../data/modulesLoader';
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
  const nav = screen.getByRole('navigation', {
    name: /Pagrindinė navigacija|Main navigation/i,
  });
  return within(nav).getByRole('button', { name: /Apklausa|Quiz/i });
}

const emptyQuizMessage = /Apklausos klausimų nėra|No quiz questions available/i;
const modulesHeading =
  /Paversk DI savo darbo sistema|Turn AI into your work system/i;

describe('App – Quiz integracinis srautas', () => {
  const storageKey = 'prompt-anatomy-locale';

  beforeEach(() => {
    vi.mocked(getModulesDataSync).mockReturnValue(fixtureEmptyQuiz);
    vi.mocked(loadModules).mockResolvedValue(fixtureEmptyQuiz);
    vi.mocked(getModulesSync).mockReturnValue([]);
    vi.mocked(preloadModules).mockImplementation(() => {});
    localStorage.clear();
    localStorage.setItem(storageKey, 'lt');
    // CONV-2: quiz route is gated when maxAccessible === 0; this flow assumes a
    // user with purchased access, so set a verified tier (modules 1–6).
    localStorage.setItem('verified_access_tier', '6');
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
    vi.clearAllMocks();
    vi.mocked(getModulesDataSync).mockReturnValue(fixtureEmptyQuiz);
    vi.mocked(loadModules).mockResolvedValue(fixtureEmptyQuiz);
    vi.mocked(getModulesSync).mockReturnValue([]);
    vi.mocked(preloadModules).mockImplementation(() => {});
  });

  it('naviguoja į Apklausą ir rodo empty-state kai quiz.questions tuščias', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    await user.click(getQuizNavButton());

    // Laukiame stabilesnio signalo, kad QuizPage empty-state jau tikrai užsikrovė.
    await screen.findByRole(
      'button',
      { name: /Grįžti atgal|Back to home|Go back/i },
      { timeout: 10000 }
    );

    expect(
      screen.getByText((content) => emptyQuizMessage.test(content))
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Grįžti atgal|Back to home|Go back/i })
    ).toBeInTheDocument();
  }, 15000);

  it('mygtukas „Grįžti atgal“ Apklausoje grąžina atgal', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    await user.click(getQuizNavButton());

    await screen.findByText(emptyQuizMessage, {}, { timeout: 10000 });

    const backButton = await screen.findByRole(
      'button',
      { name: /Grįžti atgal|Back to home|Go back/i },
      { timeout: 5000 }
    );
    await user.click(backButton);

    await waitForElementToBeRemoved(
      () => screen.queryByText(emptyQuizMessage),
      {
        timeout: 15000,
      }
    );

    await screen.findByRole(
      'heading',
      { name: modulesHeading },
      { timeout: 15000 }
    );
    expect(getQuizNavButton()).toBeInTheDocument();
  }, 30000);

  it('progress išlieka po navigacijos į Apklausą ir atgal', async () => {
    const user = userEvent.setup();
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

    renderWithProviders(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    await user.click(getQuizNavButton());

    await screen.findByText(emptyQuizMessage, {}, { timeout: 10000 });

    await user.click(
      screen.getByRole('button', { name: /Grįžti atgal|Back to home|Go back/i })
    );

    await screen.findByRole(
      'heading',
      { name: modulesHeading },
      { timeout: 15000 }
    );

    const progressAfter = getProgress();
    expect(progressAfter.completedModules).toContain(1);
    expect(progressAfter.completedTasks[1]).toContain(1);
  }, 15000);

  it('rodo retry fallback quiz puslapyje, kai modulių užkrovimas nepavyksta', async () => {
    const user = userEvent.setup();

    vi.mocked(getModulesDataSync).mockReturnValue(null);
    vi.mocked(loadModules).mockRejectedValueOnce(new Error('load failed'));

    renderWithProviders(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    await user.click(getQuizNavButton());

    await screen.findByText(
      /Nepavyko įkelti mokymo medžiagos|Failed to load training material/i,
      {},
      { timeout: 10000 }
    );
    expect(
      screen.getByRole('button', { name: /Bandyti dar kartą|Try again/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Atgal|Back/i })
    ).toBeInTheDocument();
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
    vi.clearAllMocks();
    vi.mocked(getModulesDataSync).mockReturnValue(fixtureEmptyQuiz);
    vi.mocked(loadModules).mockResolvedValue(fixtureEmptyQuiz);
    vi.mocked(getModulesSync).mockReturnValue([]);
    vi.mocked(preloadModules).mockImplementation(() => {});
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
