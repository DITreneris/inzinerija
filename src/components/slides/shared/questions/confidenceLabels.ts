/**
 * Pasitikėjimo lygio etiketės (naudojamos ConfidenceSelector ir rezultatų rodyme).
 */
export type ConfidenceLevel = 'sure' | 'guess' | 'unsure';

const LABELS_LT: Record<ConfidenceLevel, string> = {
  sure: 'Tikras',
  guess: 'Spėju',
  unsure: 'Nežinau',
};

const LABELS_EN: Record<ConfidenceLevel, string> = {
  sure: 'Sure',
  guess: 'Guessing',
  unsure: "Don't know",
};

export function getConfidenceLabels(locale: string): Record<ConfidenceLevel, string> {
  return locale === 'en' ? LABELS_EN : LABELS_LT;
}

export function confidenceLabel(level: ConfidenceLevel, locale = 'lt'): string {
  return getConfidenceLabels(locale)[level];
}

/** @deprecated Use getConfidenceLabels(locale) instead */
export const CONFIDENCE_LABELS = LABELS_LT;
