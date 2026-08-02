import { describe, expect, it } from 'vitest';
import type { Progress } from '../progress';
import {
  advanceRetrievalAfterAttempt,
  getDueRetrieval,
  scheduleAfterLearnModuleComplete,
  scheduleAfterQuizComplete,
} from '../retrievalSchedule';

function baseProgress(partial: Partial<Progress> = {}): Progress {
  return {
    completedModules: [],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    ...partial,
  };
}

describe('retrievalSchedule', () => {
  it('enqueues branduolys due immediately after quiz', () => {
    const now = new Date('2026-07-31T12:00:00.000Z');
    const next = scheduleAfterQuizComplete(baseProgress(), 80, now);
    const due = getDueRetrieval(next, now);
    expect(due).toHaveLength(1);
    expect(due[0].id).toBe('branduolys');
    expect(due[0].kind).toBe('quiz');
  });

  it('schedules warmup-bank after learn module complete', () => {
    const now = new Date('2026-07-31T12:00:00.000Z');
    const next = scheduleAfterLearnModuleComplete(
      baseProgress({ completedModules: [1] }),
      1,
      now
    );
    expect(getDueRetrieval(next, now)[0]?.id).toBe('warmup-bank:1');
  });

  it('advances interval 1→7 on strong attempt', () => {
    const now = new Date('2026-07-31T12:00:00.000Z');
    let p = scheduleAfterQuizComplete(baseProgress(), 80, now);
    p = advanceRetrievalAfterAttempt(p, 'branduolys', 90, now);
    const item = p.retrievalSchedule?.items.find((i) => i.id === 'branduolys');
    expect(item?.intervalDays).toBe(7);
    expect(getDueRetrieval(p, now)).toHaveLength(0);
  });

  it('reschedules +1 day on weak attempt', () => {
    const now = new Date('2026-07-31T12:00:00.000Z');
    let p = scheduleAfterQuizComplete(baseProgress(), 80, now);
    p = advanceRetrievalAfterAttempt(p, 'branduolys', 40, now);
    const item = p.retrievalSchedule?.items.find((i) => i.id === 'branduolys');
    expect(item?.intervalDays).toBe(1);
    expect(getDueRetrieval(p, now)).toHaveLength(0);
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000 + 1);
    expect(getDueRetrieval(p, tomorrow)).toHaveLength(1);
  });
});
