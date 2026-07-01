import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getInitialThemeIsDark, THEME_STORAGE_KEY } from '../themeInit';

function setPrefersDark(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as typeof window.matchMedia;
}

describe('getInitialThemeIsDark', () => {
  beforeEach(() => {
    localStorage.clear();
    setPrefersDark(false);
  });

  it('uses stored dark theme before media preference', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    setPrefersDark(false);

    expect(getInitialThemeIsDark()).toBe(true);
  });

  it('uses stored light theme before media preference', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    setPrefersDark(true);

    expect(getInitialThemeIsDark()).toBe(false);
  });

  it('falls back to prefers-color-scheme when no theme is stored', () => {
    setPrefersDark(true);

    expect(getInitialThemeIsDark()).toBe(true);
  });

  it('falls back to light when storage or media lookup fails', () => {
    window.matchMedia = vi.fn(() => {
      throw new Error('matchMedia unavailable');
    }) as typeof window.matchMedia;

    expect(getInitialThemeIsDark()).toBe(false);
  });
});
