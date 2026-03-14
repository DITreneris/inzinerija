import { beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import ProcessStepper from '../ProcessStepper';

const storageKey = 'prompt-anatomy-locale';

describe('ProcessStepper locale and mobile layout', () => {
  beforeEach(() => {
    localStorage.setItem(storageKey, 'en');
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 390,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 844,
    });
  });

  it('renders English Custom GPT diagram copy in compact mobile layout', () => {
    const { container } = renderWithProviders(<ProcessStepper />);

    expect(container.textContent).toContain('Custom GPT creation process');
    expect(container.textContent).toContain('You are here: Step 1');
    expect(container.textContent).not.toContain('Custom GPT kūrimo procesas');
    expect(container.textContent).not.toContain('Tu esi čia');

    const compactDiagram = container.querySelector(
      'svg[viewBox="0 0 360 780"]'
    );
    expect(compactDiagram).toBeTruthy();
    expect(container.querySelector('[data-slide-swipe-lock]')).toBeTruthy();
  });
});
