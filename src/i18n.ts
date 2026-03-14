/**
 * i18n setup for LT/EN (all modules).
 * UI strings from locales; module/quiz/glossary content from data loaders by locale.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import lt from './locales/lt.json';
import en from './locales/en.json';

const STORAGE_KEY = 'prompt-anatomy-locale';

export type Locale = 'lt' | 'en';
export type EnglishContentVariant = 'en-lt' | 'en-us';

/** Numatyti pagal naršyklės kalbą: LT jei lt/lt-*, kitaip EN. SSR – fallback LT. */
function getBrowserPreferredLocale(): Locale {
  if (typeof window === 'undefined') return 'lt';
  try {
    const lang = navigator.language?.toLowerCase() ?? '';
    return lang.startsWith('lt') ? 'lt' : 'en';
  } catch {
    return 'lt';
  }
}

/**
 * EN UI lieka vienas (`en`), bet mokymų turinys turi 2 variantus:
 * - en-lt: bazinis EN su Europos / LT kontekstu
 * - en-us: US override tik naršyklėms su en-US
 */
export function getBrowserEnglishContentVariant(): EnglishContentVariant {
  if (typeof window === 'undefined') return 'en-lt';
  try {
    const lang = navigator.language?.toLowerCase() ?? '';
    return lang === 'en-us' ? 'en-us' : 'en-lt';
  } catch {
    return 'en-lt';
  }
}

const defaultLocale: Locale = (() => {
  if (typeof window === 'undefined') return 'lt';
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === 'lt' || stored === 'en') return stored;
    const url = new URL(window.location.href);
    const lang = url.searchParams.get('lang');
    if (lang === 'en') return 'en';
    return getBrowserPreferredLocale();
  } catch {
    return 'lt';
  }
})();

i18n.use(initReactI18next).init({
  resources: {
    lt: lt as Record<string, object>,
    en: en as Record<string, object>,
  },
  lng: defaultLocale,
  fallbackLng: 'lt',
  defaultNS: 'common',
  ns: ['common', 'nav', 'home', 'module', 'quiz', 'glossary', 'modulesPage', 'certificate', 'stepper', 'testPractice', 'vaizdoGen', 'contentSlides', 'diagrams', 'toolsPage', 'promptLibrary', 'aiDetectors', 'footer'],
  interpolation: {
    escapeValue: false,
  },
});

export function getStoredLocale(): Locale {
  try {
    const s = localStorage.getItem(STORAGE_KEY) as Locale | null;
    return s === 'en' || s === 'lt' ? s : getBrowserPreferredLocale();
  } catch {
    return 'lt';
  }
}

export function setStoredLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // ignore
  }
}

/**
 * Lazy-loaded skaidrėse useTranslation() kontekstas kartais nepririša namespace,
 * todėl rodomi raktai vietoj vertimų. Šis helper naudoja globalų i18n su aiškia ns.
 * Komponente vis tiek kviesk useTranslation() (bet kokį), kad perpieštųsi kai keičiasi kalba.
 */
export function getT(ns: string) {
  return (key: string, options?: Record<string, unknown>) =>
    i18n.t(key as never, { ns, ...options } as Record<string, unknown>);
}

export default i18n;
