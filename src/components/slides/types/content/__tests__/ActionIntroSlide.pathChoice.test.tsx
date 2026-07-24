import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/test-utils';
import { ActionIntroSlide } from '../ActionIntroSlide';
import type { ActionIntroContent } from '../../../../../types/modules';

const baseContent: ActionIntroContent = {
  whyBenefit: 'Mažiau klaidų.',
  heroStat: 'Jau moki.',
  heroText: 'Dabar kontekstas.',
  ctaText: 'Pamatyk, kas laukia',
  unstructuredPrompt: 'Parašyk ataskaitą.',
  structuredPrompt: 'META: …',
  outcomes: [
    'Duoti DI savo šaltinius.',
    'Struktūruoti gilesnes užklausas.',
    'Taupyti tokenus.',
    'Tikrinti atsakymus.',
  ],
  howToUseModule: {
    heading: 'Pasirink kelią',
    short: {
      label: 'Trumpas kelias',
      description: 'Be papildomų skaidrių.',
    },
    full: {
      label: 'Ilgas kelias',
      description: 'Visos skaidrės.',
    },
  },
};

describe('ActionIntroSlide pathChoice', () => {
  it('shows ChoiceControl radios after reveal and calls onPathModeChange', () => {
    const onPathModeChange = vi.fn();
    renderWithProviders(
      <ActionIntroSlide
        content={baseContent}
        moduleId={4}
        moduleAccent="violet"
        levelLabel="Mokymasis"
        pathMode="full"
        onPathModeChange={onPathModeChange}
        visibleSlideCount={35}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Pamatyk, kas laukia/i })
    );

    expect(screen.queryByText(/4\.2-open/i)).not.toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();

    const shortBtn = screen.getByRole('radio', { name: /Trumpas kelias/i });
    const fullBtn = screen.getByRole('radio', { name: /Ilgas kelias/i });
    expect(shortBtn).toHaveAttribute('aria-checked', 'false');
    expect(fullBtn).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(shortBtn);
    expect(onPathModeChange).toHaveBeenCalledWith('short');
    expect(screen.getByText(/35/)).toBeInTheDocument();
  });

  it('reflects pathMode=short as selected', () => {
    renderWithProviders(
      <ActionIntroSlide
        content={baseContent}
        moduleId={4}
        moduleAccent="violet"
        levelLabel="Mokymasis"
        pathMode="short"
        onPathModeChange={vi.fn()}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Pamatyk, kas laukia/i })
    );

    expect(
      screen.getByRole('radio', { name: /Trumpas kelias/i })
    ).toHaveAttribute('aria-checked', 'true');
  });
});
