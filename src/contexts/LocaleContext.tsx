/**
 * Locale state for LT/EN (all modules).
 * Persists to localStorage and syncs with i18next.
 */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getStoredLocale, setStoredLocale, type Locale } from '../i18n';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [locale, setLocaleState] = useState<Locale>(() => getStoredLocale());

  useEffect(() => {
    const stored = getStoredLocale();
    if (stored !== i18n.language) {
      i18n.changeLanguage(stored);
    }
    setLocaleState(stored);
  }, [i18n]);

  const setLocale = useCallback(
    (next: Locale) => {
      setStoredLocale(next);
      i18n.changeLanguage(next);
      setLocaleState(next);
    },
    [i18n]
  );

  const toggleLocale = useCallback(() => {
    const next: Locale = locale === 'lt' ? 'en' : 'lt';
    setLocale(next);
  }, [locale, setLocale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
