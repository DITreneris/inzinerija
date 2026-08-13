import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import { resetLabInteractions } from '../../../../utils/labInteractions';
import M10DepthRolesLabBlock from '../M10DepthRolesLabBlock';

const storageKey = 'prompt-anatomy-locale';

function setLocale(locale: 'lt' | 'en') {
  localStorage.setItem(storageKey, locale);
}

describe('M10DepthRolesLabBlock', () => {
  beforeEach(() => {
    resetLabInteractions();
    setLocale('lt');
  });

  it('renders four depth choices and waits for copy until depth is chosen', () => {
    const { container } = renderWithProviders(<M10DepthRolesLabBlock />);
    expect(
      screen.getByRole('region', { name: /Agentų gylis ir rolės/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Proceso lygiai')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
    expect(
      container.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
    ).toHaveLength(0);
    expect(container.querySelector('svg')?.textContent).toContain('Pokalbis');
    expect(container.querySelector('svg')?.textContent).toContain('Lygis 0');
    expect(
      screen.getByText(/Pirmiausia pasirink proceso lygį/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Kopijuoti promptą/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Pridėti maršrutizatorių/i)
    ).not.toBeInTheDocument();
  });

  it('reveals team roles, router toggle and artifact after Komanda', () => {
    renderWithProviders(<M10DepthRolesLabBlock />);
    fireEvent.click(screen.getByRole('radio', { name: /Komanda/i }));
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

  it('restores depth and router flag after remount', () => {
    const { unmount } = renderWithProviders(<M10DepthRolesLabBlock />);
    fireEvent.click(screen.getByRole('radio', { name: /Komanda/i }));
    fireEvent.click(
      screen.getByRole('checkbox', { name: /Pridėti maršrutizatorių/i })
    );
    expect(screen.getByText(/4\) Maršrutizatorius/i)).toBeInTheDocument();

    unmount();
    renderWithProviders(<M10DepthRolesLabBlock />);

    expect(
      screen.getByRole('checkbox', { name: /Pridėti maršrutizatorių/i })
    ).toBeChecked();
    expect(
      screen.getByText(/Gylio lygis: Komanda \(L2\)/i)
    ).toBeInTheDocument();
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
    expect(screen.getByText('Process levels')).toBeInTheDocument();
    expect(screen.queryByText(/taxonomy/i)).not.toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Chat/i })).toBeInTheDocument();
  });
});
