/**
 * Question Pool Selector – isrenka 15 atsitiktiniu klausimu is pool,
 * palaikydamas balansa tarp kategoriju ir klausimu tipu.
 *
 * Algoritmas:
 * 1. Grupuoja klausimus pagal kategorija
 * 2. Is kiekvienos kategorijos parenka proporcingai
 * 3. Uzpildo iki 15 atsitiktiniais is likusiuju
 * 4. Maiso tvarka kad butut ivairu
 */
import type { TestQuestion } from '../types/modules';
import { QUESTION_POOL, POOL_CATEGORIES } from '../data/questionPool';
import { QUESTION_POOL_EN } from '../data/questionPool.en';

export type QuestionPoolLocale = 'lt' | 'en';

function getPool(locale: QuestionPoolLocale): TestQuestion[] {
  return locale === 'en' ? QUESTION_POOL_EN : QUESTION_POOL;
}

const TARGET_TOTAL = 15;

/** Fisher-Yates shuffle */
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Category quotas – kiek klausimu is kiekvienos kategorijos norime */
const CATEGORY_QUOTAS: Record<string, number> = {
  meta: 2,
  input: 2,
  output: 2,
  reasoning: 2,
  quality: 1,
  advanced: 1,
  bendra: 2,
  workflow: 1,
  technikos: 1,
  // scenario questions are marked with their subject category, 
  // they get picked up naturally
};

/**
 * Select a balanced random set of questions from the pool.
 * Use locale to pick LT or EN pool when not passing pool explicitly.
 */
export function selectQuestions(poolOrLocale?: TestQuestion[] | QuestionPoolLocale): TestQuestion[] {
  const pool = Array.isArray(poolOrLocale) ? poolOrLocale : getPool((poolOrLocale as QuestionPoolLocale) ?? 'lt');
  // Group by category
  const byCategory: Record<string, TestQuestion[]> = {};
  for (const cat of POOL_CATEGORIES) {
    byCategory[cat] = [];
  }
  for (const q of pool) {
    const cat = q.category || 'bendra';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(q);
  }

  // Shuffle each category
  for (const cat of Object.keys(byCategory)) {
    byCategory[cat] = shuffleArray(byCategory[cat]);
  }

  const selected: TestQuestion[] = [];
  const usedIds = new Set<string>();

  // Phase 1: Pick quota from each category
  for (const [cat, quota] of Object.entries(CATEGORY_QUOTAS)) {
    const available = (byCategory[cat] || []).filter((q) => !usedIds.has(q.id));
    const pick = available.slice(0, quota);
    for (const q of pick) {
      selected.push(q);
      usedIds.add(q.id);
    }
  }

  // Phase 2: Ensure type diversity – at least 1 matching, 1 ordering, 1 scenario, 1 true-false
  const requiredTypes = ['matching', 'ordering', 'scenario', 'true-false'] as const;
  for (const reqType of requiredTypes) {
    const hasType = selected.some((q) => (q.type || 'mcq') === reqType);
    if (!hasType) {
      const candidate = pool.find((q) => (q.type || 'mcq') === reqType && !usedIds.has(q.id));
      if (candidate) {
        // Replace a random MCQ from the same category, or add if under limit
        if (selected.length >= TARGET_TOTAL) {
          const mcqIdx = selected.findIndex(
            (q) => (q.type || 'mcq') === 'mcq' && q.category === candidate.category
          );
          if (mcqIdx >= 0) {
            usedIds.delete(selected[mcqIdx].id);
            selected[mcqIdx] = candidate;
            usedIds.add(candidate.id);
          }
        } else {
          selected.push(candidate);
          usedIds.add(candidate.id);
        }
      }
    }
  }

  // Phase 3: Fill remaining slots to reach TARGET_TOTAL
  if (selected.length < TARGET_TOTAL) {
    const remaining = shuffleArray(pool.filter((q) => !usedIds.has(q.id)));
    for (const q of remaining) {
      if (selected.length >= TARGET_TOTAL) break;
      selected.push(q);
      usedIds.add(q.id);
    }
  }

  // If we somehow have more than TARGET_TOTAL, trim
  const finalSet = selected.slice(0, TARGET_TOTAL);

  // Shuffle final order but keep matching/ordering/scenario at the end for better UX flow
  const mcqTf = shuffleArray(finalSet.filter((q) => {
    const t = q.type || 'mcq';
    return t === 'mcq' || t === 'true-false';
  }));
  const interactive = shuffleArray(finalSet.filter((q) => {
    const t = q.type || 'mcq';
    return t === 'matching' || t === 'ordering';
  }));
  const scenarios = shuffleArray(finalSet.filter((q) => {
    const t = q.type || 'mcq';
    return t === 'scenario';
  }));

  return [...mcqTf, ...interactive, ...scenarios];
}

/**
 * A-M3: Select N random questions from a single category (for remediation "pakartok").
 */
export function selectQuestionsByCategory(
  category: string,
  n: number,
  poolOrLocale?: TestQuestion[] | QuestionPoolLocale
): TestQuestion[] {
  const pool = Array.isArray(poolOrLocale) ? poolOrLocale : getPool((poolOrLocale as QuestionPoolLocale) ?? 'lt');
  const filtered = pool.filter((q) => (q.category || 'bendra') === category);
  return shuffleArray(filtered).slice(0, Math.min(n, filtered.length));
}

/**
 * Assign selected questions to slide groups (for Module 2 test-section slides).
 * Returns an array of question groups, each representing one test-section slide.
 */
export interface SlideQuestionGroup {
  slideTitle: string;
  slideSubtitle: string;
  questions: TestQuestion[];
}

export function assignToSlides(questions: TestQuestion[]): SlideQuestionGroup[] {
  const mcqTf = questions.filter((q) => {
    const t = q.type || 'mcq';
    return t === 'mcq' || t === 'true-false';
  });
  const matching = questions.filter((q) => q.type === 'matching');
  const ordering = questions.filter((q) => q.type === 'ordering');
  const scenarios = questions.filter((q) => q.type === 'scenario');

  const groups: SlideQuestionGroup[] = [];

  // Split MCQ/TF into groups of ~4
  const chunk1 = mcqTf.slice(0, 4);
  const chunk2 = mcqTf.slice(4, 8);
  const chunk3 = mcqTf.slice(8);

  if (chunk1.length > 0) {
    groups.push({
      slideTitle: 'Zinios ir supratimai',
      slideSubtitle: 'Pasirinkimo ir tiesa/netiesa klausimai',
      questions: chunk1,
    });
  }
  if (chunk2.length > 0) {
    groups.push({
      slideTitle: 'Bloku sistema - Testas',
      slideSubtitle: 'Gilesni klausimai apie blokus',
      questions: chunk2,
    });
  }
  if (chunk3.length > 0) {
    groups.push({
      slideTitle: 'Technikos ir workflow',
      slideSubtitle: 'Klausimai apie technikas ir darbo seka',
      questions: chunk3,
    });
  }

  // Matching slide
  if (matching.length > 0) {
    groups.push({
      slideTitle: '6 Blokų sistema – Sujunk poras',
      slideSubtitle: 'Sujunkite bloka su jo funkcija',
      questions: matching,
    });
  }

  // Ordering slide
  if (ordering.length > 0) {
    groups.push({
      slideTitle: 'Prioritetu Rikiavimas',
      slideSubtitle: 'Surikiuokite blokus pagal prioritetą',
      questions: ordering,
    });
  }

  // Scenario slide
  if (scenarios.length > 0) {
    groups.push({
      slideTitle: 'Verslo scenarijai',
      slideSubtitle: 'Pritaikykite zinias realiame scenarijuje',
      questions: scenarios,
    });
  }

  return groups;
}
