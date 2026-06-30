/**
 * BrandMark smoke tests — DS v0.3.1 (single brand glyph).
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import BrandMark from '../BrandMark';

describe('BrandMark', () => {
  it('renders the Zap glyph with gold color', () => {
    const { container } = render(<BrandMark variant="nav" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('text-gold');
  });

  it('keeps nav size (w-5) to avoid layout shift', () => {
    const { container } = render(<BrandMark variant="nav" />);
    expect(container.querySelector('svg')).toHaveClass('w-5', 'h-5');
  });

  it('keeps hero size (w-16)', () => {
    const { container } = render(<BrandMark variant="hero" />);
    expect(container.querySelector('svg')).toHaveClass('w-16', 'h-16');
  });

  it('keeps footer size (w-3.5)', () => {
    const { container } = render(<BrandMark variant="footer" />);
    expect(container.querySelector('svg')).toHaveClass('w-3.5', 'h-3.5');
  });

  it('is decorative (aria-hidden) without aria-label', () => {
    const { container } = render(<BrandMark variant="nav" />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes role=img with aria-label when standalone', () => {
    const { getByRole } = render(
      <BrandMark variant="icon-only" aria-label="Prompt Anatomy" />
    );
    expect(getByRole('img', { name: 'Prompt Anatomy' })).toBeInTheDocument();
  });
});
