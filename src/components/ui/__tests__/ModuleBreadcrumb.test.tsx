import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ModuleBreadcrumb from '../ModuleBreadcrumb';

describe('ModuleBreadcrumb', () => {
  it('renders parent and current with aria attributes', () => {
    render(
      <ModuleBreadcrumb
        parentLabel="Moduliai"
        parentAriaLabel="Grįžti į modulių sąrašą"
        currentLabel="1. DI įvadas"
        onParentClick={vi.fn()}
        ariaLabel="Modulio navigacija"
      />
    );

    expect(
      screen.getByRole('navigation', { name: 'Modulio navigacija' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Grįžti į modulių sąrašą' })
    ).toHaveTextContent('Moduliai');
    const current = screen.getByText('1. DI įvadas');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('calls onParentClick when parent is activated', () => {
    const onParentClick = vi.fn();
    render(
      <ModuleBreadcrumb
        parentLabel="Modules"
        parentAriaLabel="Back to module list"
        currentLabel="Module title"
        onParentClick={onParentClick}
        ariaLabel="Module navigation"
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Back to module list' })
    );
    expect(onParentClick).toHaveBeenCalledTimes(1);
  });

  it('does not use Back/Atgal wording in parent label', () => {
    render(
      <ModuleBreadcrumb
        parentLabel="Moduliai"
        parentAriaLabel="Grįžti į modulių sąrašą"
        currentLabel="Modulis"
        onParentClick={vi.fn()}
        ariaLabel="Modulio navigacija"
      />
    );

    expect(screen.queryByText(/^Atgal$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Atgal į modulius/i)).not.toBeInTheDocument();
  });
});
