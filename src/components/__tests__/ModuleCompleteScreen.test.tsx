import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { ModuleCompleteScreen } from '../ModuleCompleteScreen';
import type { Module } from '../../types/modules';
import type { Progress } from '../../utils/progress';

vi.mock('../../utils/m6HandoutPdf', () => ({
  downloadM6HandoutPdf: vi.fn().mockResolvedValue(undefined),
}));

const storageKey = 'prompt-anatomy-locale';

vi.mock('../../utils/analytics', () => ({
  track: vi.fn(),
}));

function makeModule(id: number): Module {
  return {
    id,
    title: `Modulis ${id}`,
    subtitle: `Aprašymas ${id}`,
    slides: [{ id: id * 10, type: 'content-block', title: 'Slide', content: {} }],
  } as Module;
}

const allModules = [1, 2, 3, 4, 5, 6].map(makeModule);

function defaultProgress(overrides: Partial<Progress> = {}): Progress {
  return {
    completedModules: [],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: {},
    ...overrides,
  };
}

describe('ModuleCompleteScreen', () => {
  const onBack = vi.fn();
  const onContinueToNext = vi.fn();
  const onRequestCertificate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem(storageKey, 'lt');
  });

  it('shows "Tęsti į kitą modulį" for a regular module', () => {
    renderWithProviders(
      <ModuleCompleteScreen
        module={allModules[0]}
        moduleIndex={0}
        totalModules={6}
        modules={allModules}
        progress={defaultProgress({ completedModules: [1] })}
        onBack={onBack}
        onContinueToNext={onContinueToNext}
        isLastModule={false}
        onRequestCertificate={onRequestCertificate}
      />
    );
    expect(screen.getByText(/Tęsti į kitą modulį/)).toBeInTheDocument();
    expect(screen.queryByText(/Parsisiųsti sertifikatą/)).not.toBeInTheDocument();
  });

  it('shows tier 1 certificate button after completing modules 1-2-3', () => {
    renderWithProviders(
      <ModuleCompleteScreen
        module={allModules[2]}
        moduleIndex={2}
        totalModules={6}
        modules={allModules}
        progress={defaultProgress({ completedModules: [1, 2, 3] })}
        onBack={onBack}
        onContinueToNext={onContinueToNext}
        isLastModule={false}
        onRequestCertificate={onRequestCertificate}
      />
    );
    expect(screen.getByRole('button', { name: /sertifikatą.*1 dalis/i })).toBeInTheDocument();
  });

  it('does NOT show tier 1 certificate if module 2 is missing', () => {
    renderWithProviders(
      <ModuleCompleteScreen
        module={allModules[2]}
        moduleIndex={2}
        totalModules={6}
        modules={allModules}
        progress={defaultProgress({ completedModules: [1, 3] })}
        onBack={onBack}
        onContinueToNext={onContinueToNext}
        isLastModule={false}
        onRequestCertificate={onRequestCertificate}
      />
    );
    expect(screen.queryByText(/Parsisiųsti sertifikatą/)).not.toBeInTheDocument();
  });

  it('shows tier 2 certificate and handout PDF for module 6 with quiz >= 70%', () => {
    renderWithProviders(
      <ModuleCompleteScreen
        module={allModules[5]}
        moduleIndex={5}
        totalModules={6}
        modules={allModules}
        progress={defaultProgress({
          completedModules: [1, 2, 3, 4, 5, 6],
          quizCompleted: true,
          quizScore: 85,
        })}
        onBack={onBack}
        onContinueToNext={onContinueToNext}
        isLastModule={true}
        onRequestCertificate={onRequestCertificate}
      />
    );
    expect(screen.getByRole('button', { name: /sertifikatą.*kurso baigimas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /atmintinę/i })).toBeInTheDocument();
  });

  it('does NOT show tier 2 certificate when quiz score < 70%', () => {
    renderWithProviders(
      <ModuleCompleteScreen
        module={allModules[5]}
        moduleIndex={5}
        totalModules={6}
        modules={allModules}
        progress={defaultProgress({
          completedModules: [1, 2, 3, 4, 5, 6],
          quizCompleted: true,
          quizScore: 60,
        })}
        onBack={onBack}
        onContinueToNext={onContinueToNext}
        isLastModule={true}
        onRequestCertificate={onRequestCertificate}
      />
    );
    expect(screen.queryByRole('button', { name: /sertifikatą.*kurso baigimas/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /atmintinę/i })).toBeInTheDocument();
  });

  it('shows "Pradėti apklausą" when isLastModule is true', () => {
    renderWithProviders(
      <ModuleCompleteScreen
        module={allModules[5]}
        moduleIndex={5}
        totalModules={6}
        modules={allModules}
        progress={defaultProgress({ completedModules: [1, 2, 3, 4, 5, 6] })}
        onBack={onBack}
        onContinueToNext={onContinueToNext}
        isLastModule={true}
        onRequestCertificate={onRequestCertificate}
      />
    );
    expect(screen.getByText(/Pradėti apklausą/)).toBeInTheDocument();
    expect(screen.queryByText(/Tęsti į kitą modulį/)).not.toBeInTheDocument();
  });
});
