import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  it('renders default, brand, and accent variants', () => {
    const { rerender, container } = render(<Card>Default</Card>);
    expect(container.firstElementChild?.className).toContain('bg-white');
    expect(screen.getByText('Default')).toBeInTheDocument();

    rerender(<Card variant="brand">Brand</Card>);
    expect(container.firstElementChild?.className).toContain('bg-brand-50');

    rerender(<Card variant="accent">Accent</Card>);
    expect(container.firstElementChild?.className).toContain('bg-accent-50');
  });
});
