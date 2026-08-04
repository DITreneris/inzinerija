import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusPanel from '../StatusPanel';

describe('StatusPanel', () => {
  it('renders success hero with tone and size classes', () => {
    const { container } = render(
      <StatusPanel tone="success" size="hero" title="Passed">
        <p>Message</p>
      </StatusPanel>
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('from-emerald-50');
    expect(root.className).toContain('to-brand-50');
    expect(root.className).toContain('p-8');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Passed'
    );
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('applies warning and outcome tones', () => {
    const { container: warn } = render(
      <StatusPanel tone="warning" title="Retry" />
    );
    expect((warn.firstElementChild as HTMLElement).className).toContain(
      'from-amber-50'
    );

    const { container: outcome } = render(
      <StatusPanel tone="outcome" size="compact" title="Next" />
    );
    const el = outcome.firstElementChild as HTMLElement;
    expect(el.className).toContain('from-accent-50');
    expect(el.className).toContain('p-5');
  });

  it('renders icon slot and role=status when asStatus', () => {
    render(
      <StatusPanel
        asStatus
        icon={<span data-testid="icon">i</span>}
        title="Done"
      />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
