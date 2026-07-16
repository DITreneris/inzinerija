import { describe, expect, it } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/test-utils';
import { ContentBlockSlide } from '../../ContentSlides';
import type { ContentBlockContent } from '../../../../../types/modules';

const linkedRowContent: ContentBlockContent = {
  sections: [
    {
      heading: '1️⃣ Trumpai',
      body: 'Pick one area.',
      blockVariant: 'accent',
    },
    {
      heading: '2️⃣ Pasirink',
      body: 'Choose below.',
      blockVariant: 'brand',
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
      body: 'First prompt.',
      copyable: 'PROMPT_A_ONLY',
      linkedRowIndex: 0,
    },
    {
      heading: 'Prompt B',
      body: 'Second prompt.',
      copyable: 'PROMPT_B_HIDDEN_BY_DEFAULT',
      linkedRowIndex: 1,
    },
  ],
};

describe('ContentBlockSlide linkedRowIndex filter', () => {
  it('shows only the default linked copyable (row 0) on first render', () => {
    const { container } = renderWithProviders(
      <ContentBlockSlide content={linkedRowContent} />
    );

    expect(container.textContent).toContain('PROMPT_A_ONLY');
    expect(container.textContent).not.toContain('PROMPT_B_HIDDEN_BY_DEFAULT');
  });

  it('renders toolChoiceBar without a table section', () => {
    const { container } = renderWithProviders(
      <ContentBlockSlide content={linkedRowContent} />
    );

    expect(container.textContent).toContain('Kuris?');
    expect(container.querySelector('button[aria-pressed="true"]')).toBeTruthy();
  });

  it('marks the active linked copy section with data-linked-copy', () => {
    const { container } = renderWithProviders(
      <ContentBlockSlide content={linkedRowContent} />
    );

    expect(container.querySelector('[data-linked-copy]')).toBeTruthy();
    expect(
      container.querySelector('[data-linked-copy]')?.textContent
    ).toContain('PROMPT_A_ONLY');
  });

  it('shows toolChoiceBar hint when linked copy sections exist', () => {
    const { container } = renderWithProviders(
      <ContentBlockSlide content={linkedRowContent} />
    );

    expect(container.textContent).toContain(
      'Pasirinkus – žemiau parodomas tavo promptas'
    );
  });

  it('switches visible linked prompt when another bar choice is selected', () => {
    const { container, getByRole } = renderWithProviders(
      <ContentBlockSlide content={linkedRowContent} />
    );

    const choiceB = getByRole('button', { name: /B/ });
    fireEvent.click(choiceB);

    expect(container.textContent).toContain('PROMPT_B_HIDDEN_BY_DEFAULT');
    expect(container.textContent).not.toContain('PROMPT_A_ONLY');
    expect(
      container.querySelector('[data-linked-copy]')?.textContent
    ).toContain('PROMPT_B_HIDDEN_BY_DEFAULT');
  });
});
