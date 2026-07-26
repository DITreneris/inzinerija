import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../../test/test-utils';
import { ContentBlockSlide } from '../../ContentSlides';
import type { ContentBlockContent } from '../../../../../types/modules';

const preCopyBeforeCopyable: ContentBlockContent = {
  sections: [
    {
      heading: '1️⃣ Trumpai',
      body: 'THEORY_BEFORE_CHECK',
      blockVariant: 'accent',
    },
    {
      heading: 'Kas yra?',
      body: 'More theory.',
      blockVariant: 'brand',
    },
    {
      heading: '5 taisyklės',
      body: 'Rules body.',
      blockVariant: 'terms',
      copyable: 'COPYABLE_TEMPLATE_TEXT',
    },
  ],
  preCopyCheckBlock: {
    heading: 'Prieš kopijuojant',
    question: 'Kurį atsakymą laikytum rizika?',
    options: ['Safe with source', 'Invented number', 'Marked guess'],
    correct: 1,
    explanation: 'Invented number without a source is hallucination risk.',
  },
};

describe('ContentBlockSlide preCopyCheckBlock placement', () => {
  it('renders preCopy before the first copyable section (not above theory)', () => {
    const { container } = renderWithProviders(
      <ContentBlockSlide content={preCopyBeforeCopyable} />
    );

    const preCopy = container.querySelector('[data-pre-copy-check]');
    expect(preCopy).toBeTruthy();
    expect(preCopy?.textContent).toContain('Prieš kopijuojant');

    const theory = Array.from(container.querySelectorAll('h3')).find((el) =>
      el.textContent?.includes('1️⃣ Trumpai')
    );
    const copyHeading = Array.from(container.querySelectorAll('h3')).find(
      (el) => el.textContent?.includes('5 taisyklės')
    );
    expect(theory).toBeTruthy();
    expect(copyHeading).toBeTruthy();

    // Theory precedes preCopy; preCopy precedes first copyable heading.
    expect(
      theory!.compareDocumentPosition(preCopy!) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      preCopy!.compareDocumentPosition(copyHeading!) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(container.textContent).toContain('COPYABLE_TEMPLATE_TEXT');
  });

  it('falls back to slide-top preCopy when there is no copyable section', () => {
    const content: ContentBlockContent = {
      sections: [
        {
          heading: 'Only theory',
          body: 'No template here.',
          blockVariant: 'brand',
        },
      ],
      preCopyCheckBlock: {
        heading: 'Top check',
        question: 'Q?',
        options: ['A', 'B'],
        correct: 0,
        explanation: 'A',
      },
    };
    const { container } = renderWithProviders(
      <ContentBlockSlide content={content} />
    );

    const preCopy = container.querySelector('[data-pre-copy-check]');
    const heading = Array.from(container.querySelectorAll('h3')).find((el) =>
      el.textContent?.includes('Only theory')
    );
    expect(preCopy).toBeTruthy();
    expect(heading).toBeTruthy();
    expect(
      preCopy!.compareDocumentPosition(heading!) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
