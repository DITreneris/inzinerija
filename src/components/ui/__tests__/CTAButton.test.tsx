import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CTAButton from '../CTAButton';
import { ctaButtonClassName } from '../ctaButtonClasses';

describe('CTAButton', () => {
  it('renders primary with brand gradient tokens', () => {
    render(<CTAButton variant="primary">Go</CTAButton>);
    const btn = screen.getByRole('button', { name: 'Go' });
    expect(btn.className).toContain('from-brand-500');
    expect(btn.className).toContain('min-h-[44px]');
    expect(btn.className).toContain('inline-flex');
  });

  it('renders secondary, accent, and self-contained hero', () => {
    const { rerender } = render(<CTAButton variant="secondary">Sec</CTAButton>);
    expect(screen.getByRole('button').className).toContain('bg-gray-100');

    rerender(<CTAButton variant="accent">Acc</CTAButton>);
    expect(screen.getByRole('button').className).toContain('from-accent-400');

    rerender(<CTAButton variant="hero">Hero</CTAButton>);
    const hero = screen.getByRole('button');
    expect(hero.className).toContain('min-h-[56px]');
    expect(hero.className).toContain('rounded-2xl');
    expect(hero.className).toContain('linear-gradient');
    expect(hero.className).not.toContain('from-brand-500');
  });

  it('merges className and exports ctaButtonClassName for anchors', () => {
    render(
      <CTAButton variant="primary" className="extra-class">
        X
      </CTAButton>
    );
    expect(screen.getByRole('button').className).toContain('extra-class');
    expect(ctaButtonClassName('accent')).toContain('from-accent-400');
    expect(ctaButtonClassName('accent', 'ml-2')).toContain('ml-2');
  });
});
