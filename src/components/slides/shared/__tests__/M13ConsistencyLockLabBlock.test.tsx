import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import M13ConsistencyLockLabBlock from '../M13ConsistencyLockLabBlock';

const storageKey = 'prompt-anatomy-locale';

function setLocale(locale: 'lt' | 'en') {
  localStorage.setItem(storageKey, locale);
}

describe('M13ConsistencyLockLabBlock', () => {
  beforeEach(() => {
    setLocale('lt');
  });

  it('waits for copy until a mode is chosen', () => {
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    expect(
      screen.getByRole('region', { name: /Consistency drift lab/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
    expect(screen.getByText(/Pirmiausia pasirink režimą/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Kopijuoti taisyklę/i })
    ).not.toBeInTheDocument();
  });

  it('shows Content-track Before/After strip above mode Choice', () => {
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    const strip = screen.getByTestId('m13-consistency-before-after');
    expect(strip).toBeInTheDocument();
    expect(strip).toHaveAttribute(
      'aria-label',
      'Drift ir reference lock palyginimas'
    );
    expect(screen.getByTestId('m13-consistency-mirror')).toHaveAttribute(
      'aria-live',
      'polite'
    );
    expect(screen.getByText('Prieš (Drift)')).toBeInTheDocument();
    expect(screen.getByText('Po (Ref lock)')).toBeInTheDocument();
    expect(screen.getByText('Po (Ref lock)').parentElement?.className).toMatch(
      /emerald/
    );
    const region = screen.getByRole('region', {
      name: /Consistency drift lab/i,
    });
    expect(region.className).toMatch(/border-rose-200/);
    expect(region.className).toMatch(/bg-rose-50/);
  });

  it('reveals drift artefact and contrast after choosing a drift mode', () => {
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    fireEvent.click(
      screen.getByRole('radio', { name: /Išsipūtė \/ proporcijos/i })
    );
    expect(
      screen.getByRole('button', { name: /Kopijuoti taisyklę/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Reference lock:/i)).toBeInTheDocument();
    expect(screen.getByText('Simptomas')).toBeInTheDocument();
    expect(screen.getByText('Fix')).toBeInTheDocument();
    expect(screen.getByText(/Trūksta:/i)).toBeInTheDocument();
  });

  it('omits missing-refs line when at least 3 refs are ticked', () => {
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    const boxes = screen.getAllByRole('checkbox');
    fireEvent.click(boxes[0]);
    fireEvent.click(boxes[1]);
    fireEvent.click(boxes[2]);
    fireEvent.click(screen.getByRole('radio', { name: /Spalva pasikeitė/i }));
    expect(screen.queryByText(/Trūksta:/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Reference lock:/i)).toBeInTheDocument();
  });

  it('reveals fresh artefact without lock rule', () => {
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    fireEvent.click(screen.getByRole('radio', { name: /Brief keičiasi/i }));
    expect(
      screen.getByText(/Naujas generate \(be reference lock\)/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/Reference lock:/i)).not.toBeInTheDocument();
  });

  it('renders EN labels', () => {
    setLocale('en');
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    expect(screen.getByText('What drifted?')).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: /Brief changed/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/You have 0\/4/i)).toBeInTheDocument();
  });
});
