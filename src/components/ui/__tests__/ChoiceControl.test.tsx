import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Zap, Layers } from 'lucide-react';
import ChoiceControl from '../ChoiceControl';

describe('ChoiceControl', () => {
  const options = [
    {
      id: 'short' as const,
      label: 'Trumpas kelias',
      description: 'Be papildomų',
      icon: Zap,
    },
    {
      id: 'full' as const,
      label: 'Ilgas kelias',
      description: 'Visos',
      icon: Layers,
    },
  ];

  it('renders radios and calls onChange on click', () => {
    const onChange = vi.fn();
    render(
      <ChoiceControl
        legend="Pasirink kelią"
        options={options}
        value="full"
        onChange={onChange}
      />
    );

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    const short = screen.getByRole('radio', { name: /Trumpas kelias/i });
    const full = screen.getByRole('radio', { name: /Ilgas kelias/i });
    expect(short).toHaveAttribute('aria-checked', 'false');
    expect(full).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(short);
    expect(onChange).toHaveBeenCalledWith('short');
  });

  it('allows null value (nothing checked)', () => {
    render(
      <ChoiceControl
        legend="Pasirink"
        options={options}
        value={null}
        onChange={vi.fn()}
      />
    );
    const radios = screen.getAllByRole('radio');
    expect(
      radios.every((r) => r.getAttribute('aria-checked') === 'false')
    ).toBe(true);
  });

  it('arrow keys move selection', () => {
    const onChange = vi.fn();
    render(
      <ChoiceControl
        legend="Pasirink kelią"
        options={options}
        value="short"
        onChange={onChange}
      />
    );

    const short = screen.getByRole('radio', { name: /Trumpas kelias/i });
    fireEvent.keyDown(short, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('full');
  });

  it('shows statusHint when provided', () => {
    render(
      <ChoiceControl
        legend="Pasirink"
        options={options}
        value="short"
        onChange={vi.fn()}
        statusHint="Rodoma ~35 skaidrių šiame kelyje."
      />
    );
    expect(screen.getByText(/Rodoma ~35 skaidrių/i)).toBeInTheDocument();
  });

  it('keeps brand selected styles when optionTone is omitted', () => {
    render(
      <ChoiceControl
        legend="Pasirink"
        options={options}
        value="short"
        onChange={vi.fn()}
      />
    );
    const short = screen.getByRole('radio', { name: /Trumpas kelias/i });
    expect(short.className).toContain('border-brand-500');
    expect(short.className).not.toContain('border-l-4');
  });

  it('applies optionTone stripe and selected border for lab use', () => {
    render(
      <ChoiceControl
        legend="Pasirink"
        options={options}
        value="full"
        onChange={vi.fn()}
        optionTone={{ short: 'brand', full: 'rose' }}
      />
    );
    const full = screen.getByRole('radio', { name: /Ilgas kelias/i });
    expect(full.className).toContain('border-rose-500');
    expect(full.className).toContain('border-l-4');
    expect(full.className).toContain('border-l-rose-500');
  });
});
