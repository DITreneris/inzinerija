/**
 * Komponento testas: IntroActionPieSlide „Eksportuok PDF“ mygtukas kviečia ensurePdfFont ir downloadIntroPiePdf su teisingu segmentu.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../../test/test-utils';
import { IntroActionPieSlide } from '../IntroActionPieSlide';
import type { IntroActionPieContent } from '../../../../../types/modules';
import { getIntroPiePdfContent } from '../../../../../data/introPiePdfContentLoader';
import * as introPiePdf from '../../../../../utils/introPiePdf';

vi.mock('../../../../../utils/introPiePdf', () => ({
  ensurePdfFont: vi.fn().mockResolvedValue(undefined),
  downloadIntroPiePdf: vi.fn(),
}));

const storageKey = 'prompt-anatomy-locale';

const minimalContent: IntroActionPieContent = {
  question: 'Kur tu dažniausiai naudoji DI?',
  subtitle: 'Pasirink vieną – palyginsi su 2026 m. duomenimis.',
  ctaReveal: 'Parodyk 2026 duomenis',
  segments: [{ label: 'Rašymas', value: 40, colorKey: 'brand' }],
  cards: [{ icon: 'Pen', title: 'Rašymui', description: 'laiškai, tekstai' }],
  revealInsights: [
    { insight: 'Tu patenki į 40% segmentą.', question: 'Klausimas tau?' },
  ],
};

describe('IntroActionPieSlide – Eksportuok PDF', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem(storageKey, 'lt');
  });

  it('CTA is disabled until an option is selected', () => {
    renderWithProviders(<IntroActionPieSlide content={minimalContent} />);
    const cta = screen.getByRole('button', { name: /Parodyk 2026 duomenis/i });
    expect(cta).toHaveAttribute('aria-disabled', 'true');
  });

  it('calls ensurePdfFont and downloadIntroPiePdf with correct segment when clicking Eksportuok PDF', async () => {
    const user = userEvent.setup();
    renderWithProviders(<IntroActionPieSlide content={minimalContent} />);

    const radiogroup = screen.getByRole('radiogroup', {
      name: /Kur tu dažniausiai naudoji DI/i,
    });
    const firstOption = within(radiogroup).getByLabelText(/Rašymui/i);
    await act(async () => {
      await user.click(firstOption);
    });

    const ctaReveal = screen.getByRole('button', {
      name: /Parodyk 2026 duomenis/i,
    });
    await act(async () => {
      await user.click(ctaReveal);
    });

    expect(screen.getByTitle('Tavo pasirinkimas')).toBeInTheDocument();

    const pdfButton = screen.getByRole('button', { name: /Eksportuok PDF/i });
    await act(async () => {
      await user.click(pdfButton);
    });

    expect(introPiePdf.ensurePdfFont).toHaveBeenCalledTimes(1);
    expect(introPiePdf.downloadIntroPiePdf).toHaveBeenCalledTimes(1);
    const segments = getIntroPiePdfContent('lt').segments;
    expect(segments.length).toBeGreaterThanOrEqual(1);
    expect(introPiePdf.downloadIntroPiePdf).toHaveBeenCalledWith(
      expect.objectContaining({ title: segments[0].title }),
      expect.any(Map),
      expect.any(Map),
      undefined,
      'lt'
    );
  });

  it('does not show PDF actions when hidePdfActions is enabled', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <IntroActionPieSlide
        content={{
          ...minimalContent,
          chartHeading: 'Profilių pasiskirstymas',
          hidePdfActions: true,
        }}
      />
    );

    const radiogroup = screen.getByRole('radiogroup', {
      name: /Kur tu dažniausiai naudoji DI/i,
    });
    const firstOption = within(radiogroup).getByLabelText(/Rašymui/i);
    await act(async () => {
      await user.click(firstOption);
    });

    const ctaReveal = screen.getByRole('button', {
      name: /Parodyk 2026 duomenis/i,
    });
    await act(async () => {
      await user.click(ctaReveal);
    });

    expect(screen.getByText('Profilių pasiskirstymas')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Eksportuok PDF/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Generuok patarimus sau/i })
    ).not.toBeInTheDocument();
    expect(introPiePdf.downloadIntroPiePdf).not.toHaveBeenCalled();
  });
});

describe('IntroActionPieSlide – M7 profilių ikonos (sk. 70.5)', () => {
  const m7WarmUpContent: IntroActionPieContent = {
    question: 'Koks tavo analitiko profilis šiandien?',
    ctaReveal: 'Parodyk, ką tai reiškia',
    hidePdfActions: true,
    segments: [
      { label: 'Sprendimų analitikas', value: 30, colorKey: 'brand' },
      { label: 'Duomenų tvarkytojas', value: 24, colorKey: 'emerald' },
      { label: 'Rinkos tyrėjas', value: 18, colorKey: 'orange' },
      { label: 'Vizualizacijų kūrėjas', value: 16, colorKey: 'violet' },
      { label: 'Automatizavimo kūrėjas', value: 12, colorKey: 'rose' },
    ],
    cards: [
      {
        icon: 'Target',
        title: 'Sprendimų analitikas',
        description: 'vadovybei',
      },
      {
        icon: 'Database',
        title: 'Duomenų tvarkytojas',
        description: 'šaltiniai',
      },
      { icon: 'Search', title: 'Rinkos tyrėjas', description: 'tendencijos' },
      {
        icon: 'BarChart3',
        title: 'Vizualizacijų kūrėjas',
        description: 'grafikai',
      },
      {
        icon: 'Workflow',
        title: 'Automatizavimo kūrėjas',
        description: 'srautai',
      },
    ],
    revealInsights: [
      { insight: 'a', question: 'q' },
      { insight: 'b', question: 'q' },
      { insight: 'c', question: 'q' },
      { insight: 'd', question: 'q' },
      { insight: 'e', question: 'q' },
    ],
  };

  it('renders Lucide SVG icons instead of raw icon key text', () => {
    const { container } = renderWithProviders(
      <IntroActionPieSlide content={m7WarmUpContent} />
    );
    const iconBoxes = container.querySelectorAll('[aria-hidden="true"] svg');
    expect(iconBoxes.length).toBeGreaterThanOrEqual(5);
    expect(screen.queryByText('Target')).not.toBeInTheDocument();
    expect(screen.queryByText('Database')).not.toBeInTheDocument();
    expect(screen.queryByText('BarChart3')).not.toBeInTheDocument();
    expect(screen.queryByText('Workflow')).not.toBeInTheDocument();
  });

  it('uses HelpCircle fallback for unknown intro-pie icon keys', () => {
    const { container } = renderWithProviders(
      <IntroActionPieSlide
        content={{
          ...m7WarmUpContent,
          cards: [{ icon: 'UnknownIconKey', title: 'Test', description: 'd' }],
          segments: [{ label: 'Test', value: 100, colorKey: 'brand' }],
          revealInsights: [{ insight: 'a', question: 'q' }],
        }}
      />
    );
    expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText('UnknownIconKey')).not.toBeInTheDocument();
  });
});
