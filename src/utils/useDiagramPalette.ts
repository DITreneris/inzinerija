import { useEffect, useMemo, useState } from 'react';
import {
  getDiagramPalette,
  type DiagramPalette,
} from '../components/slides/shared/diagramTokens';
import { getInitialThemeIsDark, THEME_STORAGE_KEY } from './themeInit';

function readIsDark(): boolean {
  if (typeof document !== 'undefined') {
    if (document.documentElement.classList.contains('dark')) return true;
  }
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored === 'dark';
  }
  return getInitialThemeIsDark();
}

export function useDiagramPalette(): DiagramPalette {
  const [isDark, setIsDark] = useState(readIsDark);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => setIsDark(readIsDark());
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) update();
    };

    window.addEventListener('storage', onStorage);
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return useMemo(() => getDiagramPalette(isDark), [isDark]);
}
