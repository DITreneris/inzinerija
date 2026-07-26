import { describe, it, expect, beforeEach } from 'vitest';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import GlossaryPage from '../GlossaryPage';
import { getGlossary } from '../../data/glossaryLoader';

const storageKey = 'prompt-anatomy-locale';

describe('GlossaryPage', () => {
  beforeEach(() => {
    localStorage.setItem(storageKey, 'lt');
  });

  it('renders glossary heading', () => {
    renderWithProviders(<GlossaryPage />);
    expect(
      screen.getByRole('heading', { name: /Žodynėlis/ })
    ).toBeInTheDocument();
  });

  it('shows definitions even when progress does not unlock path-step terms', () => {
    const locked = getGlossary('lt').find((t) => t.unlockedBy);
    expect(locked).toBeTruthy();
    renderWithProviders(
      <GlossaryPage
        progress={{
          completedModules: [],
          completedTasks: {},
          quizCompleted: false,
          quizScore: null,
        }}
      />
    );
    expect(screen.getByText(locked!.term)).toBeInTheDocument();
    expect(screen.getByText(locked!.definition)).toBeInTheDocument();
    expect(screen.queryByText(/Atrakink per/)).not.toBeInTheDocument();
  });

  it('filters by search query on term or definition', async () => {
    renderWithProviders(<GlossaryPage />);
    const input = screen.getByRole('searchbox', { name: /Ieškoti termino/ });
    await act(async () => {
      await userEvent.type(input, 'Promptas');
    });
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBeGreaterThan(0);
    for (const article of articles) {
      expect(article.textContent?.toLowerCase()).toMatch(/promptas/);
    }
  });

  it('shows search empty state when query matches nothing', async () => {
    renderWithProviders(<GlossaryPage />);
    const input = screen.getByRole('searchbox', { name: /Ieškoti termino/ });
    await act(async () => {
      await userEvent.type(input, 'zzzz-no-such-term-xyz');
    });
    expect(screen.getByText(/Pagal paiešką nieko nerasta/)).toBeInTheDocument();
  });
});
