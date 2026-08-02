import type { ModulesData } from '../types/modules';
import type { QuizQuestion } from '../types/modules/module';
import type { TestQuestion } from '../types/modules/questions';
import type { RetrievalScheduleItem } from './progress';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function mcqFromTestQuestion(
  q: TestQuestion,
  numericId: number
): QuizQuestion | null {
  if (q.type !== 'mcq' && q.type !== 'true-false') return null;
  if (!q.options?.length || typeof q.correct !== 'number') return null;
  return {
    id: numericId,
    question: q.question,
    options: q.options,
    correct: q.correct,
    explanation: q.explanation,
  };
}

function collectWarmupMcq(
  modulesData: ModulesData,
  moduleId: number
): QuizQuestion[] {
  const mod = modulesData.modules.find((m) => m.id === moduleId);
  if (!mod) return [];
  const out: QuizQuestion[] = [];
  let n = 1;
  for (const slide of mod.slides) {
    if (slide.type !== 'warm-up-quiz') continue;
    const questions = (
      slide.content as { questions?: TestQuestion[] } | undefined
    )?.questions;
    if (!questions) continue;
    for (const q of questions) {
      const mapped = mcqFromTestQuestion(q, n);
      if (mapped) {
        out.push(mapped);
        n += 1;
      }
    }
  }
  return out;
}

/**
 * Build 5–8 formative MCQs for a due retrieval item.
 */
export function buildRetrievalQuestions(
  modulesData: ModulesData,
  item: RetrievalScheduleItem,
  limit = 6
): QuizQuestion[] {
  let pool: QuizQuestion[] = [];

  if (item.kind === 'quiz' || item.kind === 'eval') {
    pool = [...(modulesData.quiz?.questions ?? [])];
  } else if (
    (item.kind === 'warmup-bank' || item.kind === 'module-test') &&
    item.moduleId != null
  ) {
    pool = collectWarmupMcq(modulesData, item.moduleId);
    if (pool.length < 3) {
      pool = [...pool, ...(modulesData.quiz?.questions ?? [])];
    }
  } else {
    pool = [...(modulesData.quiz?.questions ?? [])];
  }

  const unique = new Map<string, QuizQuestion>();
  for (const q of pool) {
    const key = q.question.slice(0, 80);
    if (!unique.has(key)) unique.set(key, q);
  }
  const shuffled = shuffleArray([...unique.values()]);
  const slice = shuffled.slice(0, Math.min(limit, Math.max(5, limit)));
  // Re-id sequentially for QuizPage
  return slice.map((q, i) => ({ ...q, id: i + 1 }));
}
