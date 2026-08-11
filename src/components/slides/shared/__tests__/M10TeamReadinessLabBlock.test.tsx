import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import M10TeamReadinessLabBlock from '../M10TeamReadinessLabBlock';

const storageKey = 'prompt-anatomy-locale';

function setLocale(locale: 'lt' | 'en') {
  localStorage.setItem(storageKey, locale);
}

describe('M10TeamReadinessLabBlock', () => {
  beforeEach(() => {
    setLocale('lt');
  });

  it('renders LT copy and waits for all three choices before profile copy', () => {
    renderWithProviders(<M10TeamReadinessLabBlock />);

    expect(
      screen.getByRole('region', { name: /Komandos pasirengimo nuotrauka/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Be balo/i)).toBeInTheDocument();
    expect(screen.getAllByText('Dar neužpildyta').length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /Kopijuoti/i })).toBeNull();
    expect(screen.getAllByRole('radiogroup')).toHaveLength(3);
  });

  it('reveals weakest-dimension guidance and copyable artifact', () => {
    renderWithProviders(<M10TeamReadinessLabBlock />);

    const groups = screen.getAllByRole('radiogroup');
    fireEvent.click(
      within(groups[0]).getByRole('radio', { name: /Sistemiškai/i })
    );
    fireEvent.click(
      within(groups[1]).getByRole('radio', { name: /Atsitiktinai/i })
    );
    fireEvent.click(
      within(groups[2]).getByRole('radio', { name: /Fragmentuotai/i })
    );

    expect(screen.getByText('Profilis paruoštas')).toBeInTheDocument();
    expect(
      screen.getAllByText(/Sukurk vieną prompto šabloną/i).length
    ).toBeGreaterThan(0);
    expect(screen.getByText(/Silpniausia dimensija/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Kopijuoti pasirengimo profilį/i })
    ).toBeInTheDocument();
  });

  it('handles tied weak dimensions without false precision', () => {
    renderWithProviders(<M10TeamReadinessLabBlock />);

    const groups = screen.getAllByRole('radiogroup');
    fireEvent.click(
      within(groups[0]).getByRole('radio', { name: /Atsitiktinai/i })
    );
    fireEvent.click(
      within(groups[1]).getByRole('radio', { name: /Atsitiktinai/i })
    );
    fireEvent.click(
      within(groups[2]).getByRole('radio', { name: /Sistemiškai/i })
    );

    expect(screen.getByText(/Pirma sutark bendrą bazę/i)).toBeInTheDocument();
    expect(
      screen.getByText(/vieno bendro naudojimo atvejo/i)
    ).toBeInTheDocument();
  });

  it('supports keyboard radiogroups', () => {
    renderWithProviders(<M10TeamReadinessLabBlock />);
    const firstGroup = screen.getAllByRole('radiogroup')[0];
    const radios = within(firstGroup).getAllByRole('radio');

    radios[0].focus();
    fireEvent.keyDown(radios[0], { key: 'ArrowRight' });

    expect(
      radios.some((radio) => radio.getAttribute('aria-checked') === 'true')
    ).toBe(true);
  });

  it('renders EN labels', () => {
    setLocale('en');
    renderWithProviders(<M10TeamReadinessLabBlock />);

    expect(
      screen.getByRole('region', { name: /Team readiness snapshot/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/No score/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Team use/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Prompt structure/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Learning rhythm/i).length).toBeGreaterThan(0);
  });
});
