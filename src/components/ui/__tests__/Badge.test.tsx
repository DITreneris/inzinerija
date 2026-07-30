import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge', () => {
  it('renders children with brand variant classes', () => {
    render(<Badge variant="brand">Brand</Badge>);
    const el = screen.getByText('Brand');
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toContain('bg-brand-100');
    expect(el.className).toContain('rounded-full');
  });

  it('allows custom tone via className on default variant', () => {
    render(<Badge className="bg-rose-100 text-rose-700">Custom</Badge>);
    expect(screen.getByText('Custom').className).toContain('bg-rose-100');
  });
});
