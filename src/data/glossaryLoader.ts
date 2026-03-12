/**
 * Glossary loader by locale (LT full, EN modules 1–6).
 */
import type { ModulesLocale } from './modulesLoader';
import glossaryLt from '@glossary-data';
import glossaryEn from './glossary-en.json';

export interface GlossaryTermRaw {
  term: string;
  definition: string;
  moduleId: number;
  unlockedBy?: { moduleId: number; slideId: number };
}

const ltTerms = (glossaryLt as { terms: GlossaryTermRaw[] }).terms;
const enTerms = (glossaryEn as { terms: GlossaryTermRaw[] }).terms;

export function getGlossary(locale: ModulesLocale): GlossaryTermRaw[] {
  return locale === 'en' ? enTerms : ltTerms;
}
