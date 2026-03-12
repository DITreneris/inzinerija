/**
 * Prompt library loader by locale (LT / EN).
 */
import type { ModulesLocale } from './modulesLoader';
import libraryLt from './promptLibrary.json';
import libraryEn from './promptLibrary-en.json';

export interface PromptLibraryItem {
  id: string;
  title: string;
  goal?: string;
  logika?: string;
  prompt: string;
}

export interface PromptLibrarySection {
  id: string;
  title: string;
  items: PromptLibraryItem[];
}

const ltData = libraryLt as { sections: PromptLibrarySection[] };
const enData = libraryEn as { sections: PromptLibrarySection[] };

export function getPromptLibrary(locale: ModulesLocale): PromptLibrarySection[] {
  return locale === 'en' ? enData.sections : ltData.sections;
}
