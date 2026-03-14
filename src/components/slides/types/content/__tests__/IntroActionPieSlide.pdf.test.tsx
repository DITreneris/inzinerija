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
  segments: [
    { label: 'Rašymas', value: 40, colorKey: 'brand' },
  ],
  cards: [
    { icon: 'Pen', title: 'Rašymui', description: 'laiškai, tekstai' },
  ],
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

    const radiogroup = screen.getByRole('radiogroup', { name: /Kur tu dažniausiai naudoji DI/i });
    const firstOption = within(radiogroup).getByLabelText(/Rašymui/i);
    await act(async () => {
      await user.click(firstOption);
    });

    const ctaReveal = screen.getByRole('button', { name: /Parodyk 2026 duomenis/i });
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
});
