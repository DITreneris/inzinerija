import { describe, expect, it } from 'vitest';
import { resolveQuestStepStatus } from '../resolveM9QuestStepStatus';

const questSteps = [
  { id: 'start', label: 'Startas', slideId: 90 },
  { id: 'catalog', label: 'Katalogas', slideId: 93.1 },
  { id: 'csv', label: 'CSV', slideId: 93.2 },
  { id: 'cycle', label: '8 žingsniai', slideId: 93 },
  { id: 'kit', label: 'Rinkinys', slideId: 92 },
];

const emptyKit = {
  catalog: false,
  csv: false,
  summary: false,
  reliability: false,
};

describe('resolveQuestStepStatus', () => {
  it('marks start as current on slide 90', () => {
    expect(
      resolveQuestStepStatus(questSteps[0], questSteps, 90, [], emptyKit)
    ).toBe('current');
  });

  it('marks catalog done from completedTasks', () => {
    expect(
      resolveQuestStepStatus(questSteps[1], questSteps, 90, [93.1], emptyKit)
    ).toBe('done');
  });

  it('marks start done when a later step is done and not on 90', () => {
    expect(
      resolveQuestStepStatus(questSteps[0], questSteps, 92, [93.1], emptyKit)
    ).toBe('done');
  });
});
