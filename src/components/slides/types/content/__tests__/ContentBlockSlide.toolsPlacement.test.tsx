import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../../test/test-utils';
import { ContentBlockSlide } from '../../ContentSlides';
import type { ContentBlockContent } from '../../../../../types/modules';

const toolsContent = (placement: ContentBlockContent['toolsPlacement']): ContentBlockContent => ({
  sections: [
    {
      heading: 'Daryk dabar',
      body: 'COPY_THE_PROMPT',
      blockVariant: 'brand',
    },
    {
      heading: 'Patikra',
      body: 'CHECK_THE_WORK',
      blockVariant: 'accent',
    },
  ],
  toolsIntro: 'Kur pradėti (6)',
  toolsCollapsible: false,
  toolsPlacement: placement,
  tools: [
    {
      name: 'Ideogram',
      description: 'Text in image',
      useCases: ['Posters'],
    },
  ],
});

describe('ContentBlockSlide toolsPlacement', () => {
  it('renders tools before Patikra when toolsPlacement is beforePatikra', () => {
    const { container } = renderWithProviders(
      <ContentBlockSlide content={toolsContent('beforePatikra')} />
    );
    const tools = container.querySelector('[data-testid="content-tools-block"]');
    const check = Array.from(container.querySelectorAll('h3, h2')).find((el) =>
      el.textContent?.includes('Patikra')
    );
    expect(tools).toBeTruthy();
    expect(check).toBeTruthy();
    const pos = tools!.compareDocumentPosition(check!);
    expect(pos & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('renders tools after sections by default', () => {
    const { container } = renderWithProviders(
      <ContentBlockSlide content={toolsContent('afterSections')} />
    );
    const tools = container.querySelector('[data-testid="content-tools-block"]');
    const check = Array.from(container.querySelectorAll('h3, h2')).find((el) =>
      el.textContent?.includes('Patikra')
    );
    expect(tools).toBeTruthy();
    expect(check).toBeTruthy();
    const pos = tools!.compareDocumentPosition(check!);
    expect(pos & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
  });
});
