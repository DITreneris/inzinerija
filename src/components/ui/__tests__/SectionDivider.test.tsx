/**
 * SectionDivider smoke tests – Design System v0.2 (E4.3).
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionDivider from '../SectionDivider';

describe('SectionDivider', () => {
  it('renders unlabeled hr', () => {
    const { container } = render(<SectionDivider accent="brand" />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('renders labeled separator with accessible name', () => {
    render(<SectionDivider label="Refleksija" accent="accent" />);
    expect(
      screen.getByRole('separator', { name: 'Refleksija' })
    ).toBeInTheDocument();
  });
});
