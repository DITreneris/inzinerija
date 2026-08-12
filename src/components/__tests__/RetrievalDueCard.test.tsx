import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../test/test-utils';
import { RetrievalDueCard } from '../RetrievalDueCard';
import type { Progress, RetrievalScheduleItem } from '../../utils/progress';

function progress(items: RetrievalScheduleItem[] = []): Progress {
  return {
    completedModules: [],
    completedTasks: {},
    quizCompleted: false,
    quizScore: null,
    retrievalSchedule: { items },
  };
}

function item(
  overrides: Partial<RetrievalScheduleItem> = {}
): RetrievalScheduleItem {
  return {
    id: 'branduolys',
    kind: 'quiz',
    moduleId: 1,
    completedAt: '2026-01-01T00:00:00.000Z',
    intervalDays: 1,
    nextDueAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('RetrievalDueCard', () => {
  it('renders nothing when there is no due recall item', () => {
    const { container } = renderWithProviders(
      <RetrievalDueCard progress={progress()} onStartRetrieval={() => {}} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('shows due recall and starts it from the CTA', () => {
    const onStartRetrieval = vi.fn();
    const due = item();
    renderWithProviders(
      <RetrievalDueCard
        progress={progress([due])}
        onStartRetrieval={onStartRetrieval}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /pradėti trumpą kartojimą/i })
    );

    expect(screen.getByText('Laikas pasikartoti')).toBeInTheDocument();
    expect(onStartRetrieval).toHaveBeenCalledWith(due);
  });

  it('ignores eval-only items so evaluator does not persist globally', () => {
    const { container } = renderWithProviders(
      <RetrievalDueCard
        progress={progress([item({ id: 'eval-m1', kind: 'eval' })])}
        onStartRetrieval={() => {}}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
