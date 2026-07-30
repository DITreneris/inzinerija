import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import AgentWorkflowBlock from '../AgentWorkflowBlock';
import EnlargeableDiagram from '../EnlargeableDiagram';

vi.mock('../../../../utils/useIsMobile', () => ({
  useIsMobile: () => true,
}));

describe('EnlargeableDiagram mobile a11y wrapper', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('prompt-anatomy-locale', 'lt');
  });

  it('keeps reflow Shell navigation outside role="img"', () => {
    renderWithProviders(<AgentWorkflowBlock />);

    const firstStep = screen.getByRole('button', {
      name: /Žingsnis 1: Agentas/i,
    });

    expect(firstStep.closest('[role="img"]')).toBeNull();
    expect(firstStep.closest('[role="group"]')).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/agent/i)
    );
  });

  it('keeps scroll interactive content outside role="img"', () => {
    renderWithProviders(
      <EnlargeableDiagram
        enlargeLabel="Scrollable test diagram"
        renderContent={() => <button type="button">Mobile action</button>}
      />
    );

    const action = screen.getByRole('button', { name: 'Mobile action' });

    expect(action.closest('[role="img"]')).toBeNull();
    expect(action.closest('[role="group"]')).toHaveAttribute(
      'aria-label',
      'Scrollable test diagram'
    );
  });
});
