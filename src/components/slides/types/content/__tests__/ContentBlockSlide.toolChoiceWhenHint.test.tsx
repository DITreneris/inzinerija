import { describe, expect, it } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/test-utils';
import { ContentBlockSlide } from '../../ContentSlides';
import type { ContentBlockContent } from '../../../../../types/modules';

const whenHintContent: ContentBlockContent = {
  sections: [
    {
      heading: '1️⃣ Trumpai',
      body: 'Pick a situation.',
      blockVariant: 'accent',
    },
    {
      heading: '2️⃣ Kokį DB įrankį rinktis?',
      body: 'Pasirink situaciją.',
      blockVariant: 'brand',
      toolChoiceBar: {
        question: 'Koks tavo atvejis?',
        choices: [
          {
            label: 'Struktūruoti verslo duomenys',
            rowIndex: 0,
            whenHint: 'Rekomenduojama: PostgreSQL – analitika.',
          },
          {
            label: 'Lanksti schema',
            rowIndex: 1,
            whenHint: 'Rekomenduojama: MongoDB – dokumentai.',
          },
        ],
      },
      table: {
        headers: ['Įrankis', 'Kada'],
        rows: [
          ['**PostgreSQL**', 'Struktūruoti'],
          ['**MongoDB**', 'Lanksti'],
        ],
      },
    },
  ],
};

describe('ContentBlockSlide toolChoiceBar whenHint (chips)', () => {
  it('hides whenHint until the learner picks (no default auto-select)', () => {
    const { container } = renderWithProviders(
      <ContentBlockSlide content={whenHintContent} />
    );

    expect(container.querySelector('[data-tool-choice-when-hint]')).toBeFalsy();
  });

  it('shows whenHint after the first chip is selected', () => {
    const { container, getByRole } = renderWithProviders(
      <ContentBlockSlide content={whenHintContent} />
    );

    fireEvent.click(
      getByRole('button', { name: /Struktūruoti verslo duomenys/ })
    );
    const hint = container.querySelector('[data-tool-choice-when-hint]');
    expect(hint?.textContent).toContain('PostgreSQL');
  });

  it('updates whenHint when another chip is selected', () => {
    const { container, getByRole } = renderWithProviders(
      <ContentBlockSlide content={whenHintContent} />
    );

    fireEvent.click(
      getByRole('button', { name: /Struktūruoti verslo duomenys/ })
    );
    fireEvent.click(getByRole('button', { name: /Lanksti schema/ }));

    const hint = container.querySelector('[data-tool-choice-when-hint]');
    expect(hint?.textContent).toContain('MongoDB');
    expect(hint?.textContent).not.toContain('PostgreSQL');
  });
});
