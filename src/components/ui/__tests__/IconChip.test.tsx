/**
 * IconChip smoke tests – Design System v0.2 (E4.2).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Briefcase, AlertTriangle } from 'lucide-react';
import IconChip from '../IconChip';

describe('IconChip', () => {
  it('renders info role with icon', () => {
    const { container } = render(
      <IconChip icon={Briefcase} role="info" size="md" />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  it('renders warn role at sm size', () => {
    const { container } = render(
      <IconChip icon={AlertTriangle} role="warn" size="sm" />
    );
    expect(container.firstChild).toHaveClass('w-7', 'h-7');
  });
});
