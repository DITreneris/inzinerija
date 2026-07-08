/**
 * Banner smoke tests – Design System hardening (2026-07).
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Banner from '../Banner';

describe('Banner', () => {
  it('renders info variant with role note', () => {
    render(
      <Banner variant="info" ariaLabel="Trumpai">
        Sekcijos turinys.
      </Banner>
    );
    expect(screen.getByRole('note', { name: 'Trumpai' })).toHaveTextContent(
      'Sekcijos turinys.'
    );
  });

  it('renders terms variant', () => {
    const { container } = render(
      <Banner variant="terms">Papildoma info.</Banner>
    );
    expect(container.firstChild).toHaveClass('border-slate-500');
  });
});
