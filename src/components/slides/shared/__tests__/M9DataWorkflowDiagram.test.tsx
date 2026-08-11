import { fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import M9DataWorkflowDiagram from '../M9DataWorkflowDiagram';

describe('M9DataWorkflowDiagram', () => {
  it('exposes desktop 2×4 and mobile stack layouts with eight step cards each', () => {
    const { container } = renderWithProviders(
      <M9DataWorkflowDiagram locale="lt" onStepClick={() => {}} />
    );

    const desktop = container.querySelector('[data-layout="desktop-2x4"]');
    const mobile = container.querySelector('[data-layout="mobile-stack"]');
    expect(desktop).toBeTruthy();
    expect(mobile).toBeTruthy();
    expect(desktop?.querySelectorAll('[data-step-index]').length).toBe(8);
    expect(mobile?.querySelectorAll('[data-step-index]').length).toBe(8);
    expect(container.textContent).toContain('Surinkimas');
    expect(container.textContent).toContain('Vaizdai');
    expect(container.textContent).toContain('Paleidimas');
  });

  it('calls onStepClick for steps 4 and 5 (row boundary)', () => {
    const onStepClick = vi.fn();
    const { container } = renderWithProviders(
      <M9DataWorkflowDiagram locale="lt" onStepClick={onStepClick} />
    );

    const desktop = container.querySelector('[data-layout="desktop-2x4"]');
    const step4 = desktop?.querySelector('[data-step-index="3"]');
    const step5 = desktop?.querySelector('[data-step-index="4"]');
    expect(step4).toBeTruthy();
    expect(step5).toBeTruthy();

    fireEvent.click(step4!);
    fireEvent.click(step5!);
    expect(onStepClick).toHaveBeenCalledWith(3);
    expect(onStepClick).toHaveBeenCalledWith(4);
  });

  it('keeps interactive cards out of tab order under role=img (M79-S2a)', () => {
    const { container } = renderWithProviders(
      <M9DataWorkflowDiagram locale="lt" onStepClick={() => {}} />
    );

    const img = container.querySelector('[role="img"]');
    expect(img).toBeTruthy();
    const focusableInside = img!.querySelectorAll(
      'button, a[href], [tabindex]:not([tabIndex="-1"]):not([tabindex="-1"])'
    );
    // Cards use tabIndex={-1}; no positive tabindex / native buttons inside img.
    expect(focusableInside.length).toBe(0);
    const cards = img!.querySelectorAll('[data-step-index][role="button"]');
    expect(cards.length).toBeGreaterThan(0);
    cards.forEach((card) => {
      expect(card.getAttribute('tabindex')).toBe('-1');
      expect(card.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('renders English box labels without uppercase desc styling requirement', () => {
    const { container } = renderWithProviders(
      <M9DataWorkflowDiagram locale="en" diagramContext="m7_master" />
    );

    expect(container.textContent).toContain('MASTER: 8 analysis steps');
    expect(container.textContent).toContain('Charts');
    expect(container.textContent).toContain('Run tools');
    expect(container.textContent).not.toContain('COLORS, CHARTS');
  });
});
