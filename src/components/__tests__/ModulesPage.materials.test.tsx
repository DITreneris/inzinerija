import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import ModulesPage from '../ModulesPage';
import type { Module } from '../../types/modules';
import type { Progress } from '../../utils/progress';
import { getMaxAccessibleModuleId } from '../../utils/accessTier';
import { downloadM4HandoutPdf } from '../../utils/m4HandoutPdf';
import { downloadM1012HandoutPdf } from '../../utils/m1012HandoutPdf';
import { downloadM1315HandoutPdf } from '../../utils/m1315HandoutPdf';

vi.mock('../ModuleView', () => ({ default: () => null }));
vi.mock('../SlideContent', () => ({ default: () => null }));

vi.mock('../../utils/accessTier', () => ({
  getMaxAccessibleModuleId: vi.fn(() => 15),
}));

vi.mock('../../utils/analytics', () => ({
  track: vi.fn(),
}));

vi.mock('../../utils/m4HandoutPdf', () => ({
  downloadM4HandoutPdf: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../utils/m1012HandoutPdf', () => ({
  downloadM1012HandoutPdf: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../utils/m1315HandoutPdf', () => ({
  downloadM1315HandoutPdf: vi.fn().mockResolvedValue(undefined),
}));

const modules = Array.from({ length: 15 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `Modulis ${id}`,
    subtitle: `Subtitle ${id}`,
    description: `Description ${id}`,
    level: id % 3 === 1 ? 'learn' : id % 3 === 2 ? 'test' : 'practice',
    slides: [{ id: id * 10, type: 'content-block', title: 'Slide' }],
  } as Module;
});

vi.mock('../../data/modulesLoader', () => ({
  getModulesSync: vi.fn(() => modules),
}));

const storageKey = 'prompt-anatomy-locale';

function progress(overrides: Partial<Progress> = {}): Progress {
  return {
    completedModules: [],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: {},
    ...overrides,
  };
}

describe('ModulesPage materials section', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(12);
    localStorage.setItem(storageKey, 'lt');
  });

  it('does not show materials section when no artefacts are earned', () => {
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={progress()} />
    );

    expect(screen.queryByText('Mano medžiaga')).not.toBeInTheDocument();
  });

  it('places materials after last accessible module when tier is 6', () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(6);
    renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        progress={progress({ completedModules: [1, 2, 3, 4] })}
      />
    );

    const materials = screen.getByRole('heading', {
      level: 2,
      name: 'Mano medžiaga',
    });
    const m6 = screen.getByRole('heading', { level: 3, name: 'Modulis 6' });
    const dataTrack = screen.getByRole('heading', {
      level: 2,
      name: 'Duomenų analizės kelias (M7–M9)',
    });

    expect(
      m6.compareDocumentPosition(materials) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      materials.compareDocumentPosition(dataTrack) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('shows earned Module 4 handout and downloads it', async () => {
    renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        progress={progress({ completedModules: [1, 2, 3, 4] })}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Modulio 4 atmintinę/i })
    );

    await waitFor(() => {
      expect(downloadM4HandoutPdf).toHaveBeenCalledTimes(1);
    });
  });

  it('opens earned tier 1 certificate from materials section', () => {
    const onRequestCertificate = vi.fn();
    renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        onRequestCertificate={onRequestCertificate}
        progress={progress({ completedModules: [1, 2, 3] })}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /1 dalies sertifikatą/i })
    );

    expect(onRequestCertificate).toHaveBeenCalledWith(1);
  });

  it('shows earned M10-12 and M13-15 handouts and downloads them', async () => {
    renderWithProviders(
      <ModulesPage
        onModuleSelect={() => {}}
        progress={progress({
          completedModules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        })}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Agentų kelio atmintinę/i })
    );
    fireEvent.click(
      screen.getByRole('button', { name: /Turinio kelio atmintinę/i })
    );

    await waitFor(() => {
      expect(downloadM1012HandoutPdf).toHaveBeenCalledTimes(1);
      expect(downloadM1315HandoutPdf).toHaveBeenCalledTimes(1);
    });
  });
});

describe('ModulesPage base track subsection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(12);
    localStorage.setItem(storageKey, 'lt');
  });

  it('renders cycle-2 subsection between M3 and M4 cards', () => {
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={progress()} />
    );

    const subsectionHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Kontekstas ir projektas (M4–M6)',
    });
    const m3 = screen.getByRole('heading', { level: 3, name: 'Modulis 3' });
    const m4 = screen.getByRole('heading', { level: 3, name: 'Modulis 4' });

    expect(
      m3.compareDocumentPosition(subsectionHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      subsectionHeading.compareDocumentPosition(m4) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      screen.getByText(
        'Konteksto inžinerija, prezentacijos sprintas ir baigiamasis projektas.'
      )
    ).toBeInTheDocument();
  });
});
