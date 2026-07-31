import { describe, expect, it } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/test-utils';
import { ContentBlockSlide } from '../../ContentSlides';
import type { ContentBlockContent } from '../../../../../types/modules';

const gated: ContentBlockContent = {
  sections: [
    {
      heading: '1️⃣ Trumpai',
      body: 'Theory first.',
      blockVariant: 'accent',
    },
    {
      heading: 'Kopijuojamas',
      body: 'Template below.',
      blockVariant: 'terms',
      copyable: 'GATED_PROMPT_TEXT',
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

describe('ContentBlockSlide preCopyCheckBlock gate (M79-S1a)', () => {
  it('keeps Copy disabled until the correct answer is selected', () => {
    const { container, getByRole } = renderWithProviders(
      <ContentBlockSlide content={gated} />
    );

    const copyBtn = container.querySelector(
      '[data-action="copy"] button'
    ) as HTMLButtonElement | null;
    expect(copyBtn).toBeTruthy();
    expect(copyBtn!.disabled).toBe(true);
    expect(container.querySelector('[data-copy-gated="true"]')).toBeTruthy();

    fireEvent.click(getByRole('radio', { name: /Safe with source/i }));
    expect(copyBtn!.disabled).toBe(true);
    expect(container.querySelector('[data-pre-copy-result]')).toBeTruthy();

    fireEvent.click(getByRole('radio', { name: /Invented number/i }));
    expect(copyBtn!.disabled).toBe(false);
    expect(container.querySelector('[data-copy-gated="true"]')).toBeFalsy();
  });

  it('announces the result with aria-live', () => {
    const { container, getByRole } = renderWithProviders(
      <ContentBlockSlide content={gated} />
    );

    fireEvent.click(getByRole('radio', { name: /Invented number/i }));
    const live = container.querySelector('[data-pre-copy-result]');
    expect(live?.getAttribute('aria-live')).toBe('polite');
    expect(live?.getAttribute('role')).toBe('status');
  });
});
