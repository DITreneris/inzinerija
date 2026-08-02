// Module + Quiz + ModulesData (split from modules.ts – P2 #3)
import type { Slide } from './slides';

/** Modulio 9 role-quest: veikėjo asmens kortelė (m9Characters.json) */
export interface M9Character {
  id: number;
  name: string;
  age: number;
  profession: string;
  experience: string;
  hobby: string;
  imagePath: string;
}

export interface BusinessExample {
  title: string;
  description: string;
}

export type ModuleLevel = 'learn' | 'test' | 'practice';

/**
 * Modulio identiteto accent.
 * M1–M6: spektras (DS v0.2 §1). M7–M18: per taką (DS v0.3) —
 * sky (Duomenų analizė), fuchsia (Agentai), rose (Turinys), cyan (Kodas).
 */
export type ModuleAccent =
  | 'brand'
  | 'slate'
  | 'emerald'
  | 'violet'
  | 'cyan'
  | 'accent'
  | 'sky'
  | 'fuchsia'
  | 'rose';

/** Lucide identity icon name for module eyebrow (DS v0.2 §1, plėtra DS v0.3 / M16 Code). */
export type ModuleIdentityIcon =
  | 'BookOpen'
  | 'ClipboardList'
  | 'Briefcase'
  | 'Brain'
  | 'ClipboardCheck'
  | 'Rocket'
  | 'BarChart3'
  | 'Cpu'
  | 'Image'
  | 'Code';

/** ModulesPage card icon — same Lucide set as identityIcon (DS v0.3.1). */
export type ModuleIcon = ModuleIdentityIcon;

/** Transfer Contract (GOLDEN §3.4f) – fallback kai nėra summary closer. */
export interface ModuleTransfer {
  abilityBefore: string;
  abilityAfter: string;
  firstAction24h: string;
  nextStepCTA?: string;
}

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: ModuleIcon;
  level: ModuleLevel;
  duration: string;
  slides: Slide[];
  businessExamples: BusinessExample[];
  /** Modulio ID, po kurio šis modulis atrakinamas (jei nurodyta – naudojama vietoj „ankstesnis modulis masyve“). */
  unlocksAfter?: number;
  /** Modulio identiteto accent (M1–M6 spektras; M7–M18 per taką). */
  accent?: ModuleAccent;
  /** Identity icon virš intro / ModulesPage eyebrow (M1–M18). */
  identityIcon?: ModuleIdentityIcon;
  /** Transfer fallback (M4, path-test moduliai be summary). */
  transfer?: ModuleTransfer;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface Quiz {
  title: string;
  description: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface ModulesData {
  modules: Module[];
  quiz: Quiz;
}
