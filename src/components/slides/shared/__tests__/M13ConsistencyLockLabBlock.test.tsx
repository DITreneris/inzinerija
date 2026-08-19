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

  it('waits for copy until a mode is chosen and shows a sample rule', () => {
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    expect(
      screen.getByRole('region', { name: /Nuoseklumo dirbtuvė/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
    expect(screen.getByTestId('m13-consistency-sample')).toHaveTextContent(
      /Ąžuolo puodelis/i
    );
    expect(screen.getByText(/Po režimo – tavo taisyklė/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Kopijuoti taisyklę/i })
    ).not.toBeInTheDocument();
  });

  it('shows thumbs on the checklist and visual Before/After', () => {
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    const strip = screen.getByTestId('m13-consistency-before-after');
    expect(strip).toBeInTheDocument();
    expect(strip).toHaveAttribute(
      'aria-label',
      'Slinkties ir užrakto palyginimas'
    );
    expect(screen.getByTestId('m13-consistency-mirror')).toHaveAttribute(
      'aria-live',
      'polite'
    );
    expect(screen.getByText('Prieš (slinktis)')).toBeInTheDocument();
    expect(screen.getByText('Po (užraktas)')).toBeInTheDocument();
    expect(
      screen.getByText('Po (užraktas)').closest('figure')?.className
    ).toMatch(/emerald/);
    expect(
      screen.getByAltText(/Ąžuolo puodelis su slinktimi/i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/Ąžuolo puodelis užrakintas/i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/Ąžuolo puodelis iš priekio/i)
    ).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(6);
    const region = screen.getByRole('region', {
      name: /Nuoseklumo dirbtuvė/i,
    });
    expect(region.className).toMatch(/border-rose-200/);
    expect(region.className).toMatch(/bg-rose-50/);
  });

  it('reveals drift artifact and contrast after choosing a drift mode', () => {
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    fireEvent.click(
      screen.getByRole('radio', { name: /Išsipūtė \/ proporcijos/i })
    );
    expect(
      screen.getByRole('button', { name: /Kopijuoti taisyklę/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Užraktas: naudok tas pačias/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Simptomas')).toBeInTheDocument();
    expect(screen.getByText('Taisymas')).toBeInTheDocument();
    expect(screen.getByText(/Trūksta:/i)).toBeInTheDocument();
    expect(
      screen.queryByTestId('m13-consistency-sample')
    ).not.toBeInTheDocument();
  });

  it('omits missing-refs line when at least 3 refs are ticked', () => {
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    const boxes = screen.getAllByRole('checkbox');
    fireEvent.click(boxes[0]);
    fireEvent.click(boxes[1]);
    fireEvent.click(boxes[2]);
    fireEvent.click(screen.getByRole('radio', { name: /Spalva pasikeitė/i }));
    expect(screen.queryByText(/Trūksta:/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/Užraktas: naudok tas pačias/i)
    ).toBeInTheDocument();
  });

  it('reveals fresh artifact without lock rule', () => {
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    fireEvent.click(
      screen.getByRole('radio', { name: /Užduoties aprašas keičiasi/i })
    );
    expect(
      screen.getByText(/Naujas generavimas \(be užrakto\)/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Užraktas: naudok tas pačias/i)
    ).not.toBeInTheDocument();
  });

  it('renders EN labels', () => {
    setLocale('en');
    renderWithProviders(<M13ConsistencyLockLabBlock />);
    expect(screen.getByText('What drifted?')).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: /Brief changed/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/You have 0\/4/i)).toBeInTheDocument();
    expect(screen.getByText(/Series: Oak Mug/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Oak Mug drifted/i)).toBeInTheDocument();
  });
});
