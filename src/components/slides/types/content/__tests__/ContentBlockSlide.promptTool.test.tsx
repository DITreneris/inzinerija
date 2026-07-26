import { describe, expect, it } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/test-utils';
import { ContentBlockSlide } from '../../ContentSlides';
import type { ContentBlockContent } from '../../../../../types/modules';

const promptToolContent: ContentBlockContent = {
  sections: [
    {
      heading: '1️⃣ Trumpai',
      body: 'EDA tool.',
      blockVariant: 'accent',
    },
    {
      heading: '2️⃣ Daryk dabar',
      body: 'Pick area.',
      blockVariant: 'brand',
      toolChoiceBar: {
        variant: 'prompt-tool',
        question: 'Ką analizuoji?',
        sequenceHint: 'Statistika → Koreliacija',
        sampleData: {
          label: 'Pavyzdiniai KPI (5 eilutės)',
          body: 'a | b\n1 | 2',
        },
        choices: [
          {
            label: 'Statistika',
            rowIndex: 0,
            whenHint: 'Kai nori tipinių reikšmių.',
          },
          {
            label: 'Koreliacija',
            rowIndex: 1,
            whenHint: 'Kai nori ryšių.',
          },
        ],
      },
    },
    {
      heading: '3a. Statistika',
      body: 'Stats body.',
      copyable:
        'Duomenys: x\nPadaryk: y\nFormatas: metrika | vidurkis | mediana',
      linkedRowIndex: 0,
    },
    {
      heading: '3b. Koreliacija',
      body: 'Corr body.',
      copyable: 'Duomenys: x\nPadaryk: y\nFormatas: 1) matrica 2) paaiškinimas',
      linkedRowIndex: 1,
    },
  ],
};

describe('ContentBlockSlide prompt-tool variant', () => {
  it('does not auto-select a mode or show linked prompt until pick', () => {
    const { container } = renderWithProviders(
      <ContentBlockSlide content={promptToolContent} />
    );

    expect(container.querySelector('[data-prompt-tool-surface]')).toBeTruthy();
    expect(container.textContent).not.toContain('metrika | vidurkis | mediana');
    expect(container.textContent).not.toContain('1) matrica 2) paaiškinimas');
    expect(container.querySelector('[data-linked-copy]')).toBeNull();
  });

  it('shows Format preview and linked prompt after ChoiceControl pick', () => {
    const { container, getByRole } = renderWithProviders(
      <ContentBlockSlide content={promptToolContent} />
    );

    fireEvent.click(getByRole('radio', { name: /Statistika/i }));

    expect(container.querySelector('[data-prompt-tool-preview]')).toBeTruthy();
    expect(container.textContent).toContain('Kai nori tipinių reikšmių.');
    expect(container.textContent).toContain('metrika | vidurkis | mediana');
    expect(
      container.querySelector('[data-linked-copy]')?.textContent
    ).toContain('Formatas: metrika | vidurkis | mediana');
    expect(container.textContent).not.toContain('1) matrica 2) paaiškinimas');
  });

  it('keeps chips variant auto-select behaviour', () => {
    const chipsContent: ContentBlockContent = {
      sections: [
        {
          heading: 'Daryk',
          body: 'Choose',
          toolChoiceBar: {
            question: 'Kuris?',
            choices: [
              { label: 'A', rowIndex: 0 },
              { label: 'B', rowIndex: 1 },
            ],
          },
        },
        {
          heading: 'Prompt A',
          body: '',
          copyable: 'CHIPS_PROMPT_A',
          linkedRowIndex: 0,
        },
        {
          heading: 'Prompt B',
          body: '',
          copyable: 'CHIPS_PROMPT_B',
          linkedRowIndex: 1,
        },
      ],
    };

    const { container } = renderWithProviders(
      <ContentBlockSlide content={chipsContent} />
    );

    expect(container.querySelector('[data-prompt-tool-surface]')).toBeNull();
    expect(container.textContent).toContain('CHIPS_PROMPT_A');
    expect(container.textContent).not.toContain('CHIPS_PROMPT_B');
    expect(container.querySelector('button[aria-pressed="true"]')).toBeTruthy();
  });
});
