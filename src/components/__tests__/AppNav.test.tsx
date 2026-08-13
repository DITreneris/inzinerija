import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { AppNav, type NavPage } from '../AppNav';

function renderNav(
  overrides: {
    currentPage?: NavPage;
    overallProgress?: number;
    isMobileMenuOpen?: boolean;
  } = {}
) {
  return renderWithProviders(
    <AppNav
      currentPage={overrides.currentPage ?? 'home'}
      onNavigate={vi.fn()}
      onToggleDark={vi.fn()}
      overallProgress={overrides.overallProgress ?? 25}
      isMobileMenuOpen={overrides.isMobileMenuOpen ?? false}
      setIsMobileMenuOpen={vi.fn()}
    />
  );
}

describe('AppNav', () => {
  it('shows the course progress meter when overallProgress > 0 and not in a module', () => {
    renderNav({ currentPage: 'home', overallProgress: 25 });
    expect(
      screen.getByRole('img', {
        name: 'Bendras pažangos procentas: 25 procentų',
      })
    ).toBeInTheDocument();
  });

  it('hides the course progress meter when overallProgress is 0', () => {
    renderNav({ overallProgress: 0 });
    expect(
      screen.queryByRole('img', { name: /pažangos procentas/i })
    ).not.toBeInTheDocument();
  });

  it('hides the course progress meter inside a module', () => {
    renderNav({ currentPage: 'module', overallProgress: 40 });
    expect(
      screen.queryByRole('img', { name: /pažangos procentas/i })
    ).not.toBeInTheDocument();
  });

  it('renders five destination controls without a fixed min-width lock', () => {
    renderNav();
    const dest = [
      screen.getByRole('button', { name: 'Pagrindinis puslapis' }),
      screen.getByRole('button', { name: 'Moduliai' }),
      screen.getByRole('button', { name: 'Žodynėlis' }),
      screen.getByRole('button', { name: 'Įrankiai' }),
      screen.getByRole('button', { name: 'Branduolio pasitikrinimas' }),
    ];
    expect(dest).toHaveLength(5);
    for (const button of dest) {
      expect(button.className).not.toContain('min-w-[8.5rem]');
    }
  });
});
