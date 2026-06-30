import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { ModuleCompleteScreen } from '../ModuleCompleteScreen';
import type { Module } from '../../types/modules';
import type { Progress } from '../../utils/progress';
import { downloadM1HandoutPdf } from '../../utils/m1HandoutPdf';
import { downloadM79HandoutPdf } from '../../utils/m79HandoutPdf';
import { logError } from '../../utils/logger';

vi.mock('../../utils/m1HandoutPdf', () => ({
  downloadM1HandoutPdf: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../utils/m6HandoutPdf', () => ({
  downloadM6HandoutPdf: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../utils/m79HandoutPdf', () => ({
  downloadM79HandoutPdf: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../utils/logger', () => ({
  logError: vi.fn(),
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
    slides: [
      { id: id * 10, type: 'content-block', title: 'Slide', content: {} },
    ],
  } as Module;
}

const allModules = [1, 2, 3, 4, 5, 6].map(makeModule);
const module9 = makeModule(9);
const modulesThrough9 = [...allModules, makeModule(7), makeModule(8), module9];

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
    expect(
      screen.queryByText(/Parsisiųsti sertifikatą/)
    ).not.toBeInTheDocument();
  });

  it('shows first-win handout button on module 1 completion', async () => {
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

    const handoutButton = screen.getByRole('button', {
      name: /Modulio 1 atmintinę/i,
    });
    fireEvent.click(handoutButton);

    await waitFor(() => {
      expect(downloadM1HandoutPdf).toHaveBeenCalledTimes(1);
    });
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
    expect(
      screen.getByRole('button', { name: /sertifikatą.*1 dalis/i })
    ).toBeInTheDocument();
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
    expect(
      screen.queryByText(/Parsisiųsti sertifikatą/)
    ).not.toBeInTheDocument();
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
    expect(
      screen.getByRole('button', { name: /sertifikatą.*kurso baigimas/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /atmintinę/i })
    ).toBeInTheDocument();
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
    expect(
      screen.queryByRole('button', { name: /sertifikatą.*kurso baigimas/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /atmintinę/i })
    ).toBeInTheDocument();
  });

  it('shows tier 3 certificate button on module 9 when path 7–9 done and M8 test >= 70%', () => {
    const idx = modulesThrough9.findIndex((m) => m.id === 9);
    renderWithProviders(
      <ModuleCompleteScreen
        module={module9}
        moduleIndex={idx}
        totalModules={modulesThrough9.length}
        modules={modulesThrough9}
        progress={defaultProgress({
          completedModules: [7, 8, 9],
          moduleTestScores: { 8: 72 },
        })}
        onBack={onBack}
        onContinueToNext={onContinueToNext}
        isLastModule={false}
        onRequestCertificate={onRequestCertificate}
      />
    );
    expect(
      screen.getByRole('button', {
        name: /sertifikatą.*Duomenų analizės kelias 7–9/i,
      })
    ).toBeInTheDocument();
  });

  it('does NOT show tier 3 certificate when M8 test < 70%', () => {
    const idx = modulesThrough9.findIndex((m) => m.id === 9);
    renderWithProviders(
      <ModuleCompleteScreen
        module={module9}
        moduleIndex={idx}
        totalModules={modulesThrough9.length}
        modules={modulesThrough9}
        progress={defaultProgress({
          completedModules: [7, 8, 9],
          moduleTestScores: { 8: 65 },
        })}
        onBack={onBack}
        onContinueToNext={onContinueToNext}
        isLastModule={false}
        onRequestCertificate={onRequestCertificate}
      />
    );
    expect(
      screen.queryByText(/Parsisiųsti sertifikatą/)
    ).not.toBeInTheDocument();
  });

  it('shows M7-9 handout button on module 9 independently from certificate eligibility', async () => {
    const idx = modulesThrough9.findIndex((m) => m.id === 9);
    renderWithProviders(
      <ModuleCompleteScreen
        module={module9}
        moduleIndex={idx}
        totalModules={modulesThrough9.length}
        modules={modulesThrough9}
        progress={defaultProgress({
          completedModules: [7, 8, 9],
          moduleTestScores: { 8: 65 },
        })}
        onBack={onBack}
        onContinueToNext={onContinueToNext}
        isLastModule={false}
        onRequestCertificate={onRequestCertificate}
      />
    );

    const handoutButton = screen.getByRole('button', {
      name: /DA kelio atmintinę/i,
    });
    fireEvent.click(handoutButton);

    await waitFor(() => {
      expect(downloadM79HandoutPdf).toHaveBeenCalledTimes(1);
    });
  });

  it('logs and shows retry message when M7-9 handout generation fails', async () => {
    vi.mocked(downloadM79HandoutPdf).mockRejectedValueOnce(
      new Error('PDF failed')
    );
    const idx = modulesThrough9.findIndex((m) => m.id === 9);
    renderWithProviders(
      <ModuleCompleteScreen
        module={module9}
        moduleIndex={idx}
        totalModules={modulesThrough9.length}
        modules={modulesThrough9}
        progress={defaultProgress({
          completedModules: [7, 8, 9],
          moduleTestScores: { 8: 65 },
        })}
        onBack={onBack}
        onContinueToNext={onContinueToNext}
        isLastModule={false}
        onRequestCertificate={onRequestCertificate}
      />
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: /DA kelio atmintinę/i,
      })
    );

    expect(
      await screen.findByText(/Nepavyko sukurti PDF\. Bandyk dar kartą\./i)
    ).toBeInTheDocument();
    expect(logError).toHaveBeenCalledWith(expect.any(Error), {
      feature: 'handout_pdf',
      moduleId: 9,
      locale: 'lt',
      surface: 'module_complete',
    });
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
