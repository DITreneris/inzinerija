import { describe, expect, it } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/test-utils';
import { ContentBlockSlide } from '../../ContentSlides';
import type { ContentBlockContent } from '../../../../../types/modules';

const manipulationContent: ContentBlockContent = {
  sections: [
    {
      heading: '1️⃣ Trumpai',
      body: 'Manipulation tool.',
      blockVariant: 'accent',
    },
    {
      heading: '2️⃣ Pasirink tipą',
      body: 'Pick a type.',
      blockVariant: 'brand',
      toolChoiceBar: {
        variant: 'manipulation-contrast',
        question: 'Kuris tipas?',
        sequenceHint: 'Pasirink tipą.',
        choices: [
          {
            label: 'Įrėminimas',
            rowIndex: 0,
            pushSignal: 'Išvada įrašyta klausime.',
            badExample: 'BAD_FRAMING_EXAMPLE',
          },
          {
            label: 'Kriterijai',
            rowIndex: 1,
            pushSignal: 'Vienas KPI.',
            badExample: 'BAD_CRITERIA_EXAMPLE',
          },
        ],
      },
    },
    {
      heading: 'Kopijuok – Įrėminimas',
      body: 'Try it.',
      copyable: 'GOOD_FRAMING_COPYABLE',
      linkedRowIndex: 0,
      blockVariant: 'terms',
    },
    {
      heading: 'Kopijuok – Kriterijai',
      body: 'Try it.',
      copyable: 'GOOD_CRITERIA_COPYABLE',
      linkedRowIndex: 1,
      blockVariant: 'terms',
    },
  ],
};

describe('ContentBlockSlide manipulation-contrast variant', () => {
  it('does not auto-select or show linked prompt until pick', () => {
    const { container } = renderWithProviders(
      <ContentBlockSlide content={manipulationContent} />
    );

    expect(
      container.querySelector('[data-manipulation-contrast-surface]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-manipulation-contrast-empty]')
    ).toBeTruthy();
    expect(container.textContent).not.toContain('GOOD_FRAMING_COPYABLE');
    expect(container.textContent).not.toContain('GOOD_CRITERIA_COPYABLE');
    expect(container.textContent).not.toContain('BAD_FRAMING_EXAMPLE');
    expect(container.querySelector('[data-linked-copy]')).toBeNull();
  });

  it('shows contrast panel and linked neutral prompt after pick', () => {
    const { container, getByRole } = renderWithProviders(
      <ContentBlockSlide content={manipulationContent} />
    );

    fireEvent.click(getByRole('radio', { name: /Įrėminimas/i }));

    expect(
      container.querySelector('[data-manipulation-contrast-panel]')
    ).toBeTruthy();
    expect(container.textContent).toContain('Išvada įrašyta klausime.');
    expect(container.textContent).toContain('BAD_FRAMING_EXAMPLE');
    expect(container.textContent).toContain('GOOD_FRAMING_COPYABLE');
    expect(
      container.querySelector('[data-linked-copy]')?.textContent
    ).toContain('GOOD_FRAMING_COPYABLE');
    expect(container.textContent).not.toContain('GOOD_CRITERIA_COPYABLE');
    expect(container.textContent).not.toContain('BAD_CRITERIA_EXAMPLE');
  });
});
