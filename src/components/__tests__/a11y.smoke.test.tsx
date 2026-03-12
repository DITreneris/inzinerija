/**
 * A-S2: axe-core smoke – pagrindiniai puslapiai/komponentai.
 * Tikrina, kad nėra kritinių a11y pažeidimų (serious/critical).
 */
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '../../test/test-utils';
import axe from 'axe-core';
import HomePage from '../HomePage';
import ModulesPage from '../ModulesPage';
import QuizPage from '../QuizPage';
import ToolsPage from '../ToolsPage';
import { CertificateScreen } from '../CertificateScreen';
import type { Progress } from '../../utils/progress';
import type { ModulesData } from '../../types/modules';

vi.mock('../../data/modulesLoader', () => ({
  getModulesSync: vi.fn(() => []),
  getModulesDataSync: vi.fn(() => null),
}));
vi.mock('../../utils/accessTier', () => ({ getMaxAccessibleModuleId: vi.fn(() => 6) }));
vi.mock('canvas-confetti', () => ({ default: vi.fn() }));
vi.mock('../../utils/introPiePdf', () => ({ ensurePdfFont: vi.fn().mockResolvedValue(undefined) }));
vi.mock('../../utils/certificatePdf', () => ({ downloadCertificatePdf: vi.fn().mockResolvedValue(undefined) }));
vi.mock('../../utils/certificateStorage', () => ({ getCertificateName: vi.fn(() => ''), setCertificateName: vi.fn() }));
vi.mock('../../utils/analytics', () => ({ track: vi.fn() }));

interface AxeResults {
  violations: Array<{ id: string; impact?: string; description: string }>;
}

function runAxe(container: HTMLElement): Promise<AxeResults> {
  return new Promise((resolve, reject) => {
    axe.run(container, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } }, (err, results) => {
      if (err) reject(err);
      else resolve(results as AxeResults);
    });
  });
}

const defaultProgress: Progress = {
  completedModules: [],
  completedTasks: {},
  quizCompleted: false,
  quizScore: null,
};

describe('A11y smoke (axe-core)', () => {
  it('HomePage has no serious/critical axe violations', async () => {
    const { container } = renderWithProviders(
      <HomePage onStart={() => {}} progress={defaultProgress} />
    );
    const results = await runAxe(container);
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(serious).toHaveLength(0);
  });

  it('ModulesPage has no serious/critical axe violations', async () => {
    const { container } = renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        progress={defaultProgress}
      />
    );
    const results = await runAxe(container);
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(serious).toHaveLength(0);
  });

  it('QuizPage (with one question) has no serious/critical axe violations', async () => {
    const { getModulesDataSync } = await import('../../data/modulesLoader');
    vi.mocked(getModulesDataSync).mockReturnValue({
      modules: [],
      quiz: {
        title: 'Apklausa',
        description: '',
        passingScore: 70,
        questions: [
          {
            id: 1,
            question: 'A11y test question?',
            options: ['A', 'B'],
            correct: 0,
            explanation: 'A',
          },
        ],
      },
    } as ModulesData);
    const { container } = renderWithProviders(
      <QuizPage
        onBack={() => {}}
        progress={defaultProgress}
        onQuizComplete={() => {}}
      />
    );
    const results = await runAxe(container);
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(serious).toHaveLength(0);
  });

  it('ToolsPage has no serious/critical axe violations', async () => {
    const { container } = renderWithProviders(<ToolsPage />);
    const results = await runAxe(container);
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(serious).toHaveLength(0);
  });

  it('CertificateScreen has no serious/critical axe violations', async () => {
    const { container } = renderWithProviders(
      <CertificateScreen tier={1} onBack={() => {}} />
    );
    const results = await runAxe(container);
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(serious).toHaveLength(0);
  });
});
