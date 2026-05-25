/**
 * Eyebrow smoke tests – Design System v0.2 (E4.1).
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookOpen } from 'lucide-react';
import Eyebrow from '../Eyebrow';

describe('Eyebrow', () => {
  it('renders children with accent classes', () => {
    render(<Eyebrow accent="violet">Modulis 4 · Teorija</Eyebrow>);
    expect(screen.getByText('Modulis 4 · Teorija')).toBeInTheDocument();
  });

  it('renders optional lucide icon', () => {
    const { container } = render(
      <Eyebrow icon={BookOpen} accent="brand">
        Modulis 1
      </Eyebrow>
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
