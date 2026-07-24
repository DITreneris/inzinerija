import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import M10DepthRolesLabBlock from '../M10DepthRolesLabBlock';

const storageKey = 'prompt-anatomy-locale';

function setLocale(locale: 'lt' | 'en') {
  localStorage.setItem(storageKey, locale);
}

describe('M10DepthRolesLabBlock', () => {
  beforeEach(() => {
    setLocale('lt');
  });

  it('renders four depth choices and waits for copy until depth is chosen', () => {
    renderWithProviders(<M10DepthRolesLabBlock />);
    expect(
      screen.getByRole('region', { name: /Agentų gylis ir rolės/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Gylio lygiai')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
    expect(screen.getByText(/Pirmiausia pasirink gylį/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Kopijuoti promptą/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Pridėti maršrutizatorių/i)
    ).not.toBeInTheDocument();
  });

  it('reveals team roles, router toggle and artefact after Komanda', () => {
    renderWithProviders(<M10DepthRolesLabBlock />);
    fireEvent.click(screen.getByRole('radio', { name: /Komanda \(L2\)/i }));
    expect(screen.getByText(/Komandos rolės/i)).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /Pridėti maršrutizatorių/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Kopijuoti promptą/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Gylio lygis: Komanda \(L2\)/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/1\) Koordinatorius/i)).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('checkbox', { name: /Pridėti maršrutizatorių/i })
    );
    expect(screen.getByText(/4\) Maršrutizatorius/i)).toBeInTheDocument();
  });

  it('syncs schema pill click with choice state', () => {
    const { container } = renderWithProviders(<M10DepthRolesLabBlock />);
    const hit = container.querySelector('svg rect[cursor="pointer"]');
    expect(hit).toBeTruthy();
    fireEvent.click(hit!);
    expect(
      screen.getByRole('button', { name: /Kopijuoti promptą/i })
    ).toBeInTheDocument();
  });

  it('renders EN labels without taxonomy jargon', () => {
    setLocale('en');
    renderWithProviders(<M10DepthRolesLabBlock />);
    expect(screen.getByText('Depth levels')).toBeInTheDocument();
    expect(screen.queryByText(/taxonomy/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: /Chat \(L0\)/i })
    ).toBeInTheDocument();
  });
});
