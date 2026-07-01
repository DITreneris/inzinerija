import { useState, useEffect } from 'react';
import { getInitialThemeIsDark, THEME_STORAGE_KEY } from './themeInit';

/**
 * Tamsaus režimo būsena: inicializacija iš localStorage arba prefers-color-scheme,
 * sinchronizacija su document.documentElement ir localStorage.
 */
export function useTheme(): [boolean, (value: boolean) => void] {
  const [isDark, setIsDark] = useState(getInitialThemeIsDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [isDark]);

  return [isDark, setIsDark];
}
