import { describe, expect, it } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import LlmArchDiagramBlock from '../LlmArchDiagramBlock';

describe('LlmArch mode states (W6)', () => {
  it('basic: tool and DB are mode-absent placeholders with Neaktyvu', () => {
    const { getByTestId, getAllByTestId } = renderWithProviders(
      <LlmArchDiagramBlock />
    );
    expect(getByTestId('llm-arch-tool-node')).toHaveAttribute(
      'data-state',
      'absent'
    );
    expect(getByTestId('llm-arch-db-node')).toHaveAttribute(
      'data-state',
      'absent'
    );
    expect(
      getAllByTestId(/llm-arch-.*-inactive/).length
    ).toBeGreaterThanOrEqual(2);
    expect(getByTestId('llm-arch-tool-inactive').textContent).toMatch(
      /Neaktyvu/i
    );
  });

  it('tabs use Agentinis (not Įrankiai) and brand-active aria-pressed', () => {
    const { getByRole, queryByRole } = renderWithProviders(
      <LlmArchDiagramBlock />
    );
    expect(getByRole('button', { name: /Režimas: Agentinis/i })).toBeTruthy();
    expect(queryByRole('button', { name: /Režimas: Įrankiai/i })).toBeNull();
    expect(getByRole('button', { name: /Režimas: Bazinis/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('RAG makes DB live and tool live; Agentinis keeps DB absent', () => {
    const { getByRole, getByTestId } = renderWithProviders(
      <LlmArchDiagramBlock />
    );
    fireEvent.click(getByRole('button', { name: /Režimas: RAG/i }));
    expect(getByTestId('llm-arch-tool-node')).toHaveAttribute(
      'data-state',
      'live'
    );
    expect(getByTestId('llm-arch-db-node')).toHaveAttribute(
      'data-state',
      'live'
    );

    fireEvent.click(getByRole('button', { name: /Režimas: Agentinis/i }));
    expect(getByTestId('llm-arch-tool-node')).toHaveAttribute(
      'data-state',
      'live'
    );
    expect(getByTestId('llm-arch-db-node')).toHaveAttribute(
      'data-state',
      'absent'
    );
    expect(getByTestId('llm-arch-db-inactive')).toBeTruthy();
  });

  it('architecture card click switches mode', () => {
    const { getByRole, getByText } = renderWithProviders(
      <LlmArchDiagramBlock />
    );
    fireEvent.click(getByRole('button', { name: /03 — Agentinis/i }));
    expect(
      getByRole('button', { name: /Režimas: Agentinis/i })
    ).toHaveAttribute('aria-pressed', 'true');
    expect(getByText(/Aktyvus režimas/i).textContent).toMatch(/Agentinis/);
  });
});
