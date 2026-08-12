import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import { resetLabInteractions } from '../../../../utils/labInteractions';
import M16DirectionPickerLabBlock from '../M16DirectionPickerLabBlock';

const storageKey = 'prompt-anatomy-locale';

function setLocale(locale: 'lt' | 'en') {
  localStorage.setItem(storageKey, locale);
}

describe('M16DirectionPickerLabBlock', () => {
  beforeEach(() => {
    resetLabInteractions();
    setLocale('lt');
  });

  it('waits for copy until a direction is chosen', () => {
    renderWithProviders(<M16DirectionPickerLabBlock />);
    expect(
      screen.getByRole('region', { name: /Krypties pasirinkimo lab/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(
      screen.getByText(/Pirmiausia pasirink A, B arba C/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Kopijuoti kodėl/i })
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('m16-direction-score-mirror')).toHaveAttribute(
      'aria-live',
      'polite'
    );
  });

  it('reveals score strip and artifact after pick', () => {
    renderWithProviders(<M16DirectionPickerLabBlock />);
    fireEvent.click(screen.getByRole('radio', { name: /^A\b/i }));
    expect(
      screen.getByRole('button', { name: /Kopijuoti kodėl/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Pasirinkta: A/i)).toBeInTheDocument();
    expect(screen.getByText(/Nugalėtoja kryptis: A/i)).toBeInTheDocument();
    expect(screen.getByText(/suma 11/i)).toBeInTheDocument();
  });

  it('restores the picked direction after remount', () => {
    const { unmount } = renderWithProviders(<M16DirectionPickerLabBlock />);
    fireEvent.click(screen.getByRole('radio', { name: /^B\b/i }));
    expect(screen.getByText(/Pasirinkta: B/i)).toBeInTheDocument();

    unmount();
    renderWithProviders(<M16DirectionPickerLabBlock />);

    expect(screen.getByText(/Pasirinkta: B/i)).toBeInTheDocument();
    expect(screen.getByText(/Nugalėtoja kryptis: B/i)).toBeInTheDocument();
  });

  it('uses brand-only shell (not rose Content-track)', () => {
    renderWithProviders(<M16DirectionPickerLabBlock />);
    const region = screen.getByRole('region', {
      name: /Krypties pasirinkimo lab/i,
    });
    expect(region.className).toMatch(/border-brand-200/);
    expect(region.className).not.toMatch(/border-rose-200/);
  });

  it('renders EN labels', () => {
    setLocale('en');
    renderWithProviders(<M16DirectionPickerLabBlock />);
    expect(screen.getByText('Which direction wins?')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /^A\b/i })).toBeInTheDocument();
    expect(screen.getByText(/No direction yet/i)).toBeInTheDocument();
  });
});
