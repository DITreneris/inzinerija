import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import {
  loadModules,
  getModule,
  __clearCacheForTesting,
} from '../../data/modulesLoader';
import ModulesPage from '../ModulesPage';
import AccessGateScreen from '../AccessGateScreen';
import type { Progress } from '../../utils/progress';

// CONV-2 / CONV-3: when no tier is purchased (maxAccessible === 0) the same
// AccessGateScreen guards the modules list and the quiz route in App.tsx.
vi.mock('../../utils/accessTier', () => ({
  getMaxAccessibleModuleId: vi.fn(() => 0),
}));

// MON-4: spy on the analytics track call without touching the real dedupe logic.
vi.mock('../../utils/analytics', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../utils/analytics')>();
  return { ...actual, track: vi.fn(), trackSpinoffClick: vi.fn() };
});

// MON-5 / MON-8: the dev/test alias loads the full authoring catalog (M1–15).
// Production `build:production` bundles only M1–9, so ModulesPage must see an
// M1–9 list for the tier-9 "coming soon" cards to be exercised like in prod.
vi.mock('../../data/modulesLoader', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../data/modulesLoader')>();
  return {
    ...actual,
    getModulesSync: (
      ...args: Parameters<typeof actual.getModulesSync>
    ): ReturnType<typeof actual.getModulesSync> => {
      const modules = actual.getModulesSync(...args);
      return modules ? modules.filter((m) => m.id <= 9) : modules;
    },
  };
});

const { getMaxAccessibleModuleId } = await import('../../utils/accessTier');
const { track } = await import('../../utils/analytics');

const storageKey = 'prompt-anatomy-locale';

function emptyProgress(): Progress {
  return {
    completedModules: [],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    moduleTestScores: {},
  };
}

describe('Access gate smoke (CONV-2 / CONV-3)', () => {
  beforeEach(async () => {
    localStorage.clear();
    localStorage.setItem(storageKey, 'lt');
    __clearCacheForTesting();
    await loadModules('lt');
  });

  it('renders AccessGateScreen when maxAccessible === 0 (tier 0)', () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(0);
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={emptyProgress()} />
    );
    expect(screen.getByText('Prieiga ribota')).toBeInTheDocument();
    // Module cards must NOT be shown to an unpaid visitor.
    expect(screen.queryByRole('heading', { name: /Modulis 1/ })).toBeNull();
  });

  it('does NOT gate the modules list once a tier is purchased (tier 3)', () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(3);
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={emptyProgress()} />
    );
    expect(screen.queryByText('Prieiga ribota')).toBeNull();
  });

  it('getModule(4) returns null when tier is 3 (locked beyond purchase)', async () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(3);
    await loadModules('lt');
    const mod = await getModule(4);
    expect(mod).toBeNull();
  });

  it('getModule(7) returns module when tier is 9 (Duomenų analizės kelias)', async () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(9);
    await loadModules('lt');
    const mod = await getModule(7);
    expect(mod).not.toBeNull();
    expect(mod?.id).toBe(7);
  });

  it('getModule(10) returns null when tier is 9 (M10+ locked)', async () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(9);
    await loadModules('lt');
    const mod = await getModule(10);
    expect(mod).toBeNull();
  });

  // MON-3: tier 6 magic link → M1–6 open, M7–9 locked.
  it('tier 6: getModule(6) returns module, getModule(7) returns null', async () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(6);
    await loadModules('lt');
    expect((await getModule(6))?.id).toBe(6);
    expect(await getModule(7)).toBeNull();
  });

  // MON-8: tier 9 production bundle shows M7 and non-interactive M10–15 previews.
  it('tier 9: renders M7 and "Ruošiama" coming-soon cards without any link/button inside', () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(9);
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={emptyProgress()} />
    );
    expect(
      screen.getByRole('heading', {
        name: /Agentų inžinerijos kelias ruošiamas/,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Turinio inžinerijos kelias ruošiamas/,
      })
    ).toBeInTheDocument();
    const comingSoonCards = screen.getAllByRole('article', {
      name: /Ruošiamas modulis/,
    });
    expect(comingSoonCards).toHaveLength(6);
    for (const card of comingSoonCards) {
      expect(card.querySelector('a, button')).toBeNull();
    }
  });

  it('tier 3: coming-soon section is NOT rendered (maxAccessible < 9)', () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(3);
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={emptyProgress()} />
    );
    expect(
      screen.queryByRole('article', { name: /Ruošiamas modulis/ })
    ).toBeNull();
  });

  // MON-5: the gate must hold in the EN locale too, not only for LT strings.
  it('renders AccessGateScreen in EN locale when tier is 0', async () => {
    vi.mocked(getMaxAccessibleModuleId).mockReturnValue(0);
    localStorage.setItem(storageKey, 'en');
    await loadModules('en');
    renderWithProviders(
      <ModulesPage onModuleSelect={() => {}} progress={emptyProgress()} />
    );
    expect(screen.getByText('Access restricted')).toBeInTheDocument();
  });

  // MON-4: gate pricing CTA must emit pricing_click with the taxonomy cta_id.
  it('gate pricing CTA fires pricing_click with cta_id access_gate_pricing', () => {
    vi.mocked(track).mockClear();
    renderWithProviders(<AccessGateScreen />);
    fireEvent.click(screen.getByRole('link', { name: /Įsigyti prieigą/ }));
    expect(track).toHaveBeenCalledWith(
      'pricing_click',
      expect.objectContaining({
        module_id: 0,
        cta_id: 'access_gate_pricing',
        destination: 'external',
      })
    );
  });
});
