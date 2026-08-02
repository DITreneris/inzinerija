import type {
  Progress,
  RetrievalInterval,
  RetrievalSchedule,
  RetrievalScheduleItem,
} from './progress';

export type { RetrievalInterval, RetrievalSchedule, RetrievalScheduleItem };

export const PATH_TEST_MODULE_IDS = [2, 5, 8, 11, 14] as const;
export const LEARN_WARMUP_MODULE_IDS = [1, 4, 7, 10, 13] as const;

/** Eval habit deep-links (GOLDEN §3.4g). */
export const EVAL_HABIT_SLIDES: ReadonlyArray<{
  moduleId: number;
  slideId: number;
  habitKey: string;
}> = [
  { moduleId: 1, slideId: 12.5, habitKey: 'eval-m1-prompt-qc' },
  { moduleId: 4, slideId: 45, habitKey: 'eval-m4-4pillars' },
  { moduleId: 7, slideId: 67, habitKey: 'eval-m7-manipulation' },
  { moduleId: 10, slideId: 10.66, habitKey: 'eval-m10-qc' },
  { moduleId: 13, slideId: 13.325, habitKey: 'eval-m13-consistency' },
];

const MS_DAY = 24 * 60 * 60 * 1000;

export function addDaysIso(fromIso: string, days: number): string {
  const d = new Date(fromIso);
  d.setTime(d.getTime() + days * MS_DAY);
  return d.toISOString();
}

export function nextInterval(current: RetrievalInterval): RetrievalInterval {
  if (current === 1) return 7;
  if (current === 7) return 30;
  return 30;
}

function upsertItem(
  items: RetrievalScheduleItem[],
  item: RetrievalScheduleItem
): RetrievalScheduleItem[] {
  const idx = items.findIndex((x) => x.id === item.id);
  if (idx === -1) return [...items, item];
  const next = items.slice();
  next[idx] = item;
  return next;
}

/** Enqueue D+1 after a learning event (idempotent reset to interval 1). */
export function enqueueRetrievalSeries(
  schedule: RetrievalSchedule | undefined,
  base: Omit<
    RetrievalScheduleItem,
    'intervalDays' | 'nextDueAt' | 'completedAt'
  > & { completedAt?: string },
  now: Date = new Date()
): RetrievalSchedule {
  const completedAt = base.completedAt ?? now.toISOString();
  const items = schedule?.items ? [...schedule.items] : [];
  const item: RetrievalScheduleItem = {
    id: base.id,
    kind: base.kind,
    moduleId: base.moduleId,
    slideId: base.slideId,
    lastScore: base.lastScore,
    completedAt,
    // First recall is due immediately; after a pass, advance 1→7→30 days.
    intervalDays: 1,
    nextDueAt: completedAt,
  };
  return { items: upsertItem(items, item) };
}

export function scheduleAfterQuizComplete(
  progress: Progress,
  score: number,
  now: Date = new Date()
): Progress {
  return {
    ...progress,
    retrievalSchedule: enqueueRetrievalSeries(
      progress.retrievalSchedule,
      { id: 'branduolys', kind: 'quiz', lastScore: score },
      now
    ),
  };
}

export function scheduleAfterModuleTest(
  progress: Progress,
  moduleId: number,
  score: number,
  now: Date = new Date()
): Progress {
  if (!(PATH_TEST_MODULE_IDS as readonly number[]).includes(moduleId)) {
    return progress;
  }
  return {
    ...progress,
    retrievalSchedule: enqueueRetrievalSeries(
      progress.retrievalSchedule,
      {
        id: `module-test:${moduleId}`,
        kind: 'module-test',
        moduleId,
        lastScore: score,
      },
      now
    ),
  };
}

export function scheduleAfterLearnModuleComplete(
  progress: Progress,
  moduleId: number,
  now: Date = new Date()
): Progress {
  if (!(LEARN_WARMUP_MODULE_IDS as readonly number[]).includes(moduleId)) {
    return progress;
  }
  return {
    ...progress,
    retrievalSchedule: enqueueRetrievalSeries(
      progress.retrievalSchedule,
      {
        id: `warmup-bank:${moduleId}`,
        kind: 'warmup-bank',
        moduleId,
      },
      now
    ),
  };
}

export function scheduleAfterEvalVisit(
  progress: Progress,
  moduleId: number,
  slideId: number,
  now: Date = new Date()
): Progress {
  const habit = EVAL_HABIT_SLIDES.find(
    (h) => h.moduleId === moduleId && h.slideId === slideId
  );
  if (!habit) return progress;
  return {
    ...progress,
    retrievalSchedule: enqueueRetrievalSeries(
      progress.retrievalSchedule,
      {
        id: habit.habitKey,
        kind: 'eval',
        moduleId,
        slideId,
      },
      now
    ),
  };
}

export function getDueRetrieval(
  progress: Progress,
  now: Date = new Date()
): RetrievalScheduleItem[] {
  const items = progress.retrievalSchedule?.items ?? [];
  const t = now.getTime();
  return items
    .filter((item) => new Date(item.nextDueAt).getTime() <= t)
    .sort(
      (a, b) =>
        new Date(a.nextDueAt).getTime() - new Date(b.nextDueAt).getTime()
    );
}

/** After a formative attempt: advance 1→7→30, or retry +1 day if weak. */
export function advanceRetrievalAfterAttempt(
  progress: Progress,
  itemId: string,
  scorePercent: number,
  now: Date = new Date()
): Progress {
  const items = progress.retrievalSchedule?.items ?? [];
  const idx = items.findIndex((x) => x.id === itemId);
  if (idx === -1) return progress;
  const current = items[idx];
  const weak = scorePercent < 70;
  const completedAt = now.toISOString();
  let next: RetrievalScheduleItem;
  if (weak) {
    next = {
      ...current,
      completedAt,
      lastScore: scorePercent,
      intervalDays: current.intervalDays,
      nextDueAt: addDaysIso(completedAt, 1),
    };
  } else {
    const interval = nextInterval(current.intervalDays);
    next = {
      ...current,
      completedAt,
      lastScore: scorePercent,
      intervalDays: interval,
      nextDueAt: addDaysIso(completedAt, interval),
    };
  }
  const nextItems = items.slice();
  nextItems[idx] = next;
  return { ...progress, retrievalSchedule: { items: nextItems } };
}

export function getPrimaryEvalHabit(
  progress: Progress
): (typeof EVAL_HABIT_SLIDES)[number] | null {
  const due = getDueRetrieval(progress).find((i) => i.kind === 'eval');
  if (due?.moduleId != null && due.slideId != null) {
    return (
      EVAL_HABIT_SLIDES.find(
        (h) => h.moduleId === due.moduleId && h.slideId === due.slideId
      ) ?? null
    );
  }
  for (const habit of EVAL_HABIT_SLIDES) {
    if (progress.completedModules.includes(habit.moduleId)) return habit;
  }
  return null;
}
