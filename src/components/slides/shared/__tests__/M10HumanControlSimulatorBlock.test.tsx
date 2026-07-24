import { describe, expect, it, beforeEach } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import M10HumanControlSimulatorBlock from '../M10HumanControlSimulatorBlock';

const storageKey = 'prompt-anatomy-locale';

function setLocale(locale: 'lt' | 'en') {
  localStorage.setItem(storageKey, locale);
}

describe('M10HumanControlSimulatorBlock', () => {
  beforeEach(() => {
    setLocale('lt');
  });

  it('renders LT labels and waits for a mode choice before feedback', () => {
    renderWithProviders(<M10HumanControlSimulatorBlock />);
    expect(
      screen.getByRole('region', { name: /Žmogaus kontrolės simuliatorius/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ne brandos kopėčios/i)).toBeInTheDocument();
    expect(screen.getByText('Kur tu esi rizikoje')).toBeInTheDocument();
    expect(screen.queryByText(/Čia nėra scenarijaus/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Rekomenduojama šiam scenarijui/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText('Pasirink verslo scenarijų')).toBeInTheDocument();
    expect(screen.getByText('Kontrolės režimas')).toBeInTheDocument();
    expect(
      screen.queryByText('Kontrolės taisyklė aprašymui')
    ).not.toBeInTheDocument();
  });

  it('reveals recommendation, mismatch, error outcome and artefact after mode choice', () => {
    renderWithProviders(<M10HumanControlSimulatorBlock />);

    fireEvent.click(
      screen.getByRole('radio', { name: /Rezultatų stebėsena/i })
    );

    expect(screen.getByText(/Persvarstyk/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Rekomenduojama šiam scenarijui/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Naudok rekomenduojamą režimą/i })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /Patikrink klaidos atvejį/i })
    );
    expect(
      screen.getByText(/bendruose rezultatuose|Tik rezultat/i)
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole('button', { name: /Naudok rekomenduojamą režimą/i })
    );
    expect(screen.getByText(/Tinkamiausias/i)).toBeInTheDocument();
    expect(screen.getByText(/Kada įsijungia žmogus/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Kontrolės taisyklė aprašymui/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Kontrolės režimas:/i)).toBeInTheDocument();
  });

  it('resets mode feedback when the scenario changes', () => {
    renderWithProviders(<M10HumanControlSimulatorBlock />);
    fireEvent.click(screen.getByRole('radio', { name: /Išimčių peržiūra/i }));
    expect(
      screen.getByText(/Kontrolės taisyklė aprašymui/i)
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('radio', { name: /Asmens duomenys ar mokėjimas/i })
    );
    expect(
      screen.queryByText('Kontrolės taisyklė aprašymui')
    ).not.toBeInTheDocument();
  });

  it('supports keyboard radiogroups for scenarios and modes', () => {
    renderWithProviders(<M10HumanControlSimulatorBlock />);
    const groups = screen.getAllByRole('radiogroup');
    expect(groups.length).toBeGreaterThanOrEqual(2);

    const scenarioGroup = groups[0];
    const radios = within(scenarioGroup).getAllByRole('radio');
    radios[0].focus();
    fireEvent.keyDown(radios[0], { key: 'ArrowDown' });
    expect(radios.some((r) => r.getAttribute('aria-checked') === 'true')).toBe(
      true
    );
  });

  it('renders EN labels', () => {
    setLocale('en');
    renderWithProviders(<M10HumanControlSimulatorBlock />);
    expect(
      screen.getByRole('region', { name: /Human control simulator/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/not a maturity ladder/i)).toBeInTheDocument();
    expect(screen.getByText('Where this sits on risk')).toBeInTheDocument();
    expect(screen.queryByText(/No scenario here/i)).not.toBeInTheDocument();
    expect(screen.getByText('Choose a business scenario')).toBeInTheDocument();
    expect(screen.getByText('Control mode')).toBeInTheDocument();
  });
});
