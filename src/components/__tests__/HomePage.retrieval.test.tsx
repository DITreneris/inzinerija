import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderWithProviders } from '../../test/test-utils';
import HomePage from '../HomePage';
import type { Progress, RetrievalScheduleItem } from '../../utils/progress';

vi.mock('../../data/modulesLoader', () => ({
  getModulesSync: vi.fn(() =>
    Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      title: `Modulis ${index + 1}`,
      slides: [],
    }))
  ),
}));

function progress(items: RetrievalScheduleItem[] = []): Progress {
  return {
    completedModules: [1],
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
    id: 'warmup-bank:1',
    kind: 'warmup-bank',
    moduleId: 1,
    completedAt: '2026-01-01T00:00:00.000Z',
    intervalDays: 1,
    nextDueAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('HomePage retrieval (secondary)', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('prompt-anatomy-locale', 'lt');
  });

  it('does not render RetrievalDueCard; shows secondary recall link in hero CTA group', () => {
    const onStartRetrieval = vi.fn();
    const due = item();
    renderWithProviders(
      <HomePage
        onStart={() => {}}
        progress={progress([due])}
        onStartRetrieval={onStartRetrieval}
      />
    );

    expect(screen.queryByTestId('retrieval-due-card')).not.toBeInTheDocument();
    const recall = screen.getByTestId('home-recall-link');
    expect(recall).toHaveTextContent(/Pakartoti M1 · 5 min/i);
    expect(recall).toHaveAttribute(
      'aria-label',
      'Pakartoti Modulį 1: Modulis 1'
    );
    const group = screen.getByTestId('home-hero-cta-group');
    expect(group).toContainElement(recall);
    expect(group).toContainElement(
      screen.getByRole('button', { name: 'Pradėti mokymą' })
    );
    expect(screen.getByText('1 iš 6 modulių baigta')).toBeInTheDocument();
    fireEvent.click(recall);
    expect(onStartRetrieval).toHaveBeenCalledWith(due);
  });

  it('hides recall link when nothing is due', () => {
    renderWithProviders(
      <HomePage
        onStart={() => {}}
        progress={progress()}
        onStartRetrieval={() => {}}
      />
    );

    expect(screen.queryByTestId('home-recall-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('retrieval-due-card')).not.toBeInTheDocument();
    expect(screen.getByTestId('home-hero-cta-group')).toBeInTheDocument();
    expect(screen.getByText('1 iš 6 modulių baigta')).toBeInTheDocument();
  });

  it('hides progress and recall on first visit with nothing due', () => {
    renderWithProviders(
      <HomePage
        onStart={() => {}}
        progress={{
          completedModules: [],
          completedTasks: {},
          quizCompleted: false,
          quizScore: null,
        }}
        onStartRetrieval={() => {}}
      />
    );

    expect(screen.queryByText(/modulių baigta/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('home-recall-link')).not.toBeInTheDocument();
    expect(screen.getByTestId('home-hero-cta-group')).toBeInTheDocument();
  });
});
