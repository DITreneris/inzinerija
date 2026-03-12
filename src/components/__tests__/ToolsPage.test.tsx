import { describe, it, expect, vi } from 'vitest';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import ToolsPage from '../ToolsPage';
import { beforeEach } from 'vitest';

vi.mock('../../utils/accessTier', () => ({
  getMaxAccessibleModuleId: vi.fn(() => 6),
}));

const storageKey = 'prompt-anatomy-locale';

describe('ToolsPage', () => {
  beforeEach(() => {
    localStorage.setItem(storageKey, 'lt');
  });

  it('renders heading "Įrankiai"', () => {
    renderWithProviders(<ToolsPage />);
    expect(screen.getByRole('heading', { name: /Įrankiai/ })).toBeInTheDocument();
  });

  it('shows tool cards from tools.json', () => {
    renderWithProviders(<ToolsPage />);
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  it('filters by module when selecting a module filter', async () => {
    renderWithProviders(<ToolsPage />);
    const moduleSelect = screen.getByRole('combobox', { name: /Filtruoti pagal modulį/ });
    await act(async () => {
      await userEvent.selectOptions(moduleSelect, '4');
    });

    const badges = screen.getAllByText(/Modulis 4/);
    expect(badges.length).toBeGreaterThan(0);

    const otherModuleBadges = screen.queryAllByText(/Modulis [^4]/);
    const toolArticles = screen.getAllByRole('article');
    for (const article of toolArticles) {
      expect(article.textContent).toMatch(/Modulis 4/);
    }
    expect(otherModuleBadges.every(b => !b.closest('article'))).toBe(true);
  });

  it('shows empty state when initialFilter matches no tools', () => {
    renderWithProviders(<ToolsPage initialFilter={99} />);
    expect(screen.getByText(/Pagal pasirinktą filtrą įrankių nėra/)).toBeInTheDocument();
  });

  it('applies initialFilter prop', () => {
    renderWithProviders(<ToolsPage initialFilter={4} />);
    const moduleSelect = screen.getByRole('combobox', { name: /Filtruoti pagal modulį/ }) as HTMLSelectElement;
    expect(moduleSelect.value).toBe('4');
  });
});
