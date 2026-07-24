import { describe, expect, it, beforeEach } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import M4PromptModeSimulatorBlock from '../M4PromptModeSimulatorBlock';

const storageKey = 'prompt-anatomy-locale';

function setLocale(locale: 'lt' | 'en') {
  localStorage.setItem(storageKey, locale);
}

describe('M4PromptModeSimulatorBlock', () => {
  beforeEach(() => {
    setLocale('lt');
  });

  it('renders LT labels and waits for a mode choice before feedback', () => {
    renderWithProviders(<M4PromptModeSimulatorBlock />);
    expect(
      screen.getByRole('region', { name: /Promptų režimo simuliatorius/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/brandos kopėčios/i)).toBeInTheDocument();
    expect(screen.getByText('Kur tu esi ašyse')).toBeInTheDocument();
    expect(
      screen.queryByText(/Rekomenduojama šiam scenarijui/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText('Pasirink verslo scenarijų')).toBeInTheDocument();
    expect(screen.getByText('Promptų režimas')).toBeInTheDocument();
    expect(
      screen.queryByText('Promptų režimo taisyklė darbui')
    ).not.toBeInTheDocument();
  });

  it('reveals recommendation, mismatch, error outcome and artefact after mode choice', () => {
    renderWithProviders(<M4PromptModeSimulatorBlock />);

    fireEvent.click(screen.getByRole('radio', { name: /Laisvas klausimas/i }));

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
    expect(screen.getByText(/Sklandu|nepatikrinta/i)).toBeTruthy();

    fireEvent.click(
      screen.getByRole('button', { name: /Naudok rekomenduojamą režimą/i })
    );
    expect(screen.getByText(/Tinkamiausias/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Kada pasirodo silpnas pasirinkimas/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Promptų režimo taisyklė darbui/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/1\) Režimas:/i)).toBeInTheDocument();
  });

  it('resets mode feedback when the scenario changes', () => {
    renderWithProviders(<M4PromptModeSimulatorBlock />);
    fireEvent.click(screen.getByRole('radio', { name: /Tik agentinis/i }));
    expect(
      screen.getByText(/Promptų režimo taisyklė darbui/i)
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('radio', { name: /SWOT iš turimų faktų/i })
    );
    expect(
      screen.queryByText('Promptų režimo taisyklė darbui')
    ).not.toBeInTheDocument();
  });

  it('supports keyboard radiogroups for scenarios and modes', () => {
    renderWithProviders(<M4PromptModeSimulatorBlock />);
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
    renderWithProviders(<M4PromptModeSimulatorBlock />);
    expect(
      screen.getByRole('region', { name: /Prompt mode simulator/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/not a maturity ladder/i)).toBeInTheDocument();
    expect(screen.getByText('Where this sits on the axes')).toBeInTheDocument();
    expect(screen.getByText('Choose a business scenario')).toBeInTheDocument();
    expect(screen.getByText('Prompt mode')).toBeInTheDocument();
  });
});
