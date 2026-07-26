import type { M9KitChecklistState } from './m9KitChecklist';

export type QuestStepRef = {
  id: string;
  label: string;
  slideId: number;
};

export type QuestStepStatus = 'current' | 'done' | 'upcoming';

/** Map step state from progress + kit checklist (M9 quest desk). */
export function resolveQuestStepStatus(
  step: QuestStepRef,
  questSteps: QuestStepRef[],
  currentSlideId: number,
  completedTaskIds: number[],
  kit: Pick<M9KitChecklistState, 'catalog' | 'csv' | 'summary'>
): QuestStepStatus {
  if (step.slideId === currentSlideId) return 'current';

  const tasks = new Set(completedTaskIds);
  const practiceDone = (s: QuestStepRef): boolean => {
    if (s.id === 'catalog') return tasks.has(93.1) || kit.catalog;
    if (s.id === 'csv') return tasks.has(93.2) || kit.csv;
    if (s.id === 'cycle') return tasks.has(93) || kit.summary;
    if (s.id === 'kit') return tasks.has(92) || kit.summary;
    return tasks.has(s.slideId);
  };

  if (step.id === 'start') {
    const laterDone = questSteps.some(
      (q) => q.id !== 'start' && practiceDone(q)
    );
    return laterDone ? 'done' : 'upcoming';
  }

  if (practiceDone(step)) return 'done';

  const order = questSteps.map((q) => q.slideId);
  const currentIdx = order.indexOf(currentSlideId);
  const stepIdx = order.indexOf(step.slideId);
  if (currentIdx > -1 && stepIdx > -1 && currentIdx > stepIdx) return 'done';

  return 'upcoming';
}
