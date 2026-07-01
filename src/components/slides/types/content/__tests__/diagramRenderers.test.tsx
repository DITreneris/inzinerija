import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/test-utils';
import {
  getDiagramRendererKeys,
  renderDiagramSection,
} from '../diagramRenderers';

function renderDiagram(
  image: string,
  body?: string,
  imageAlt = 'Registry test image'
) {
  const node = renderDiagramSection(image, body, {
    moduleId: 10,
    slideId: 100,
    imageAlt,
  });

  expect(node).not.toBeNull();
  return renderWithProviders(<>{node}</>);
}

describe('diagramRenderers registry contract', () => {
  it('keeps renderer keys collision-free', () => {
    const keys = getDiagramRendererKeys();
    const collisions = keys.flatMap((key) =>
      keys
        .filter((candidate) => candidate !== key && candidate.includes(key))
        .map((candidate) => `${key} -> ${candidate}`)
    );

    expect(collisions).toEqual([]);
  });

  it('matches exact image keys and svg paths without substring collisions', () => {
    expect(
      renderDiagramSection('/assets/m9_data_workflow.svg', 'Body', {})
    ).not.toBeNull();
    expect(
      renderDiagramSection(
        '/assets/prefix_m9_data_workflow_suffix.svg',
        'Body',
        {}
      )
    ).toBeNull();
  });

  it('renders migrated M10+ keys through React components', () => {
    const { container: trigger } = renderDiagram(
      'm10_trigger_flow',
      'Trigger body'
    );
    expect(trigger.textContent).toContain('Trigger body');
    expect(trigger.querySelector('img')).toBeNull();

    const { container: promptStack } = renderDiagram(
      'm13_prompt_stack',
      'Prompt stack body'
    );
    expect(promptStack.textContent).toContain('Prompt stack body');
    expect(promptStack.querySelector('img')).toBeNull();
  });

  it('returns null for unknown image keys so ContentSlides fallback can handle them', () => {
    expect(
      renderDiagramSection('unknown_legacy_image.svg', 'Body', {})
    ).toBeNull();
  });

  it('preserves body placement before, after, and none', () => {
    const before = renderDiagram(
      'strukturuotas_procesas',
      'Before body text'
    ).container;
    const beforeText = before.textContent ?? '';
    expect(beforeText.indexOf('Before body text')).toBeLessThan(
      beforeText.indexOf('Tu esi čia:')
    );

    const after = renderDiagram(
      'm10_agent_taxonomy',
      'After body text'
    ).container;
    const afterText = after.textContent ?? '';
    expect(afterText.indexOf('After body text')).toBeGreaterThan(
      afterText.indexOf('Agent')
    );

    const none = renderDiagram(
      'custom_gpt_process',
      'Hidden body text'
    ).container;
    expect(none.textContent).not.toContain('Hidden body text');
  });

  it('renders static illustrations through DiagramImageFrame with alt text and no step nav', () => {
    renderDiagram(
      '/da_schema_entity_example.svg',
      undefined,
      'Pavyzdinė duomenų schema'
    );

    expect(
      screen.getByRole('img', { name: 'Pavyzdinė duomenų schema' })
    ).toHaveAttribute(
      'src',
      expect.stringContaining('da_schema_entity_example.svg')
    );
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('keeps body text after static illustration frames', () => {
    const { container } = renderDiagram(
      '/da_schema_entity_example.svg',
      'Entity body text',
      'Entity example'
    );
    const image = screen.getByRole('img', { name: 'Entity example' });
    const body = screen.getByText('Entity body text');

    expect(within(container).getByText('Entity body text')).toBeInTheDocument();
    expect(image.compareDocumentPosition(body)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });
});
