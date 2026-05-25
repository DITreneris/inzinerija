import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { renderWithProviders } from '../../test/test-utils';
import App from '../../App';
import {
  loadModules,
  getModulesDataSync,
  getModulesSync,
  preloadModules,
} from '../../data/modulesLoader';
import type { ModulesData } from '../../types/modules';

const fixtureEmpty: ModulesData = {
  modules: [],
  quiz: {
    title: 'Test',
    description: '',
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

describe('App – SEO meta', () => {
  beforeEach(() => {
    vi.mocked(getModulesDataSync).mockReturnValue(fixtureEmpty);
    vi.mocked(loadModules).mockResolvedValue(fixtureEmpty);
    vi.mocked(getModulesSync).mockReturnValue([]);
    vi.mocked(preloadModules).mockImplementation(() => {});
    localStorage.clear();
    localStorage.setItem('prompt-anatomy-locale', 'lt');
    vi.stubEnv('VITE_PUBLIC_SITE_URL', 'https://www.promptanatomy.app');
    vi.stubEnv('BASE_URL', '/anatomy/');
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(matchMediaMock),
    });
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('renders noindex robots meta via Helmet', async () => {
    renderWithProviders(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    await waitFor(() => {
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots?.getAttribute('content')).toBe('noindex, nofollow');
    });
  });
});
