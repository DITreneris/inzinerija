/** Session-lived Path Test scores (not persisted) — shared by TestSection ↔ TestResults. */

export interface CategoryScore {
  correct: number;
  total: number;
  percentage: number;
}

let lastCategoryScores: Record<string, CategoryScore> = {};
let lastMaxStreak = 0;

export function getLastCategoryScores(): Record<string, CategoryScore> {
  return lastCategoryScores;
}

export function setLastCategoryScores(
  scores: Record<string, CategoryScore>
): void {
  lastCategoryScores = scores;
}

export function getLastMaxStreak(): number {
  return lastMaxStreak;
}

export function setLastMaxStreak(streak: number): void {
  lastMaxStreak = streak;
}
