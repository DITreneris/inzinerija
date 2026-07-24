import { fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import ContextEngineeringPipelineDiagram from '../ContextEngineeringPipelineDiagram';

const storageKey = 'prompt-anatomy-locale';

describe('ContextEngineeringPipelineDiagram placeholder (variant B)', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(storageKey, 'lt');
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('prompt mode shows dashed slot labels, not full context node titles', () => {
    const { container } = renderWithProviders(
      <ContextEngineeringPipelineDiagram />
    );
    const text = container.querySelector('svg')?.textContent ?? '';

    expect(text).toContain('+ kontekstas');
    expect(text).toContain('+ įrankiai');
    expect(text).not.toContain('3. Kontekstas');
    expect(text).not.toContain('5. Įrankiai / Duomenys');
    expect(text).toContain('1. Vartotojo tikslas');
    expect(text).toContain('4. LLM');
  });

  it('context mode fills slots with full emerald node labels', () => {
    const { container, getByRole } = renderWithProviders(
      <ContextEngineeringPipelineDiagram />
    );

    fireEvent.click(
      getByRole('button', { name: /Režimas:\s*Konteksto inžinerija/i })
    );

    const text = container.querySelector('svg')?.textContent ?? '';

    expect(text).toContain('3. Kontekstas');
    expect(text).toContain('5. Įrankiai / Duomenys');
    expect(text).toContain('dokumentai, CRM, taisyklės');
  });
});
