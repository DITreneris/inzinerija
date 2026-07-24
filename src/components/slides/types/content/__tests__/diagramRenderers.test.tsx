import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/test-utils';
import modulesData from '../../../../../data/modules.json';
import {
  getDiagramRendererKeys,
  renderDiagramSection,
} from '../diagramRenderers';

/** ContentSlides.tsx special-case when registry returns null */
const CONTENT_SLIDES_SPECIAL_IMAGES: string[] = [];

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

    const { container: mediaPipeline } = renderDiagram(
      'm13_media_pipeline',
      'Media pipeline body'
    );
    expect(mediaPipeline.textContent).toContain('Media pipeline body');
    expect(mediaPipeline.querySelector('img')).toBeNull();
    expect(mediaPipeline.querySelectorAll('nav button')).toHaveLength(6);

    const { container: consistency } = renderDiagram(
      'm13_consistency_lock',
      'Consistency body'
    );
    expect(consistency.textContent).toContain('Consistency body');
    expect(consistency.querySelectorAll('nav button')).toHaveLength(4);

    const { container: postprod } = renderDiagram(
      'm13_postprod_steps',
      'Postprod body'
    );
    expect(postprod.textContent).toContain('Postprod body');
    expect(postprod.querySelectorAll('nav button')).toHaveLength(4);

    const { container: turinioWorkflow } = renderDiagram(
      'turinio_workflow',
      'Content workflow body'
    );
    expect(turinioWorkflow.textContent).toContain('Content workflow body');
    expect(turinioWorkflow.querySelector('img')).toBeNull();
    expect(turinioWorkflow.querySelectorAll('nav button')).toHaveLength(7);

    const { container: learningLoop } = renderDiagram(
      'm10_learning_loop',
      'Learning loop body'
    );
    expect(learningLoop.textContent).toContain('Learning loop body');
    expect(learningLoop.querySelector('img')).toBeNull();

    const { container: agentWorkflow } = renderDiagram(
      'agent_workflow_diagram',
      'Agent workflow body'
    );
    expect(agentWorkflow.textContent).toContain('Agent workflow body');
    expect(agentWorkflow.querySelector('img')).toBeNull();

    const { container: workflowSpec } = renderDiagram(
      'm10_workflow_spec',
      'Workflow spec body'
    );
    expect(workflowSpec.textContent).toContain('Workflow spec body');
    expect(workflowSpec.querySelector('img')).toBeNull();

    const { container: incidentPlaybook } = renderDiagram(
      'm10_incident_playbook',
      'Incident playbook body'
    );
    expect(incidentPlaybook.textContent).toContain('Incident playbook body');
    expect(incidentPlaybook.querySelector('img')).toBeNull();

    const { container: humanControl } = renderDiagram(
      'm10_human_control_simulator',
      'Human control body'
    );
    expect(humanControl.textContent).toContain('Human control body');
    expect(humanControl.textContent).toContain('Pasirink verslo scenarijų');
    expect(humanControl.textContent).toContain('Kontrolės režimas');
    expect(humanControl.querySelector('img')).toBeNull();
    expect(humanControl.querySelectorAll('nav button')).toHaveLength(0);

    const { container: m12MultiAgent } = renderDiagram(
      'm12_multi_agent_schema',
      'M12 multi-agent body'
    );
    expect(m12MultiAgent.textContent).toContain('M12 multi-agent body');
    expect(m12MultiAgent.querySelector('img')).toBeNull();
  });

  it('returns null for unknown image keys so ContentSlides fallback can handle them', () => {
    expect(
      renderDiagramSection('unknown_legacy_image.svg', 'Body', {})
    ).toBeNull();
    expect(renderDiagramSection('m10_spec_incident', 'Body', {})).toBeNull();
    expect(
      renderDiagramSection('/llm_autoregressive_rytas_zalgiris.svg', 'Body', {})
    ).toBeNull();
  });

  it('renders M4/44 llm_autoregressive through LlmAutoregressiveBlock (not static img)', () => {
    expect(
      renderDiagramSection('llm_autoregressive', 'LLM body', {})
    ).not.toBeNull();

    const { container } = renderDiagram('llm_autoregressive', 'LLM body');
    expect(container.textContent).toContain('LLM body');
    expect(container.textContent).toContain('Tu esi čia:');
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelectorAll('nav button').length).toBeGreaterThan(0);
  });

  it('renders M4/43 strukturuotas_procesas through StrukturuotasProcesasBlock', () => {
    expect(
      renderDiagramSection('strukturuotas_procesas', 'Process body', {})
    ).not.toBeNull();
    expect(
      renderDiagramSection('strukturuotas_procesas_3_zingsniai', 'Body', {})
    ).toBeNull();

    const { container } = renderDiagram(
      'strukturuotas_procesas',
      'Process body'
    );
    expect(container.textContent).toContain('Process body');
    expect(container.textContent).toContain('Tu esi čia:');
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders M4/56 llm_arch through LlmArchDiagramBlock (not broken static img)', () => {
    expect(renderDiagramSection('llm_arch', 'Arch body', {})).not.toBeNull();
    expect(renderDiagramSection('llm_arch_diagram', 'Body', {})).toBeNull();

    const { container } = renderDiagram('llm_arch', 'Arch body');
    expect(container.textContent).toContain('Arch body');
    expect(container.textContent).toContain('Bazinis');
    expect(container.querySelector('img')).toBeNull();
    // Block mode tabs + diagram in-SVG mode chips both use aria-pressed (3+3).
    expect(
      container.querySelectorAll('button[aria-label^="Režimas"]').length
    ).toBe(3);
    expect(
      container.querySelectorAll('button[aria-pressed]').length
    ).toBeGreaterThanOrEqual(3);
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

  it('resolves every modules.json section.image (M1–15) via registry or known specials', () => {
    const broken: {
      moduleId: number;
      slideId: number | string;
      image: string;
    }[] = [];

    for (const mod of modulesData.modules) {
      if (mod.id > 15) continue;
      for (const slide of mod.slides ?? []) {
        const content = slide.content;
        if (!content || !('sections' in content)) continue;
        const sections = content.sections;
        if (!Array.isArray(sections)) continue;
        for (const section of sections) {
          if (!('image' in section) || typeof section.image !== 'string')
            continue;
          const image = section.image;
          const isSpecial = CONTENT_SLIDES_SPECIAL_IMAGES.some((key) =>
            image.includes(key)
          );
          if (isSpecial) continue;
          if (renderDiagramSection(image, undefined, {}) === null) {
            broken.push({
              moduleId: mod.id,
              slideId: slide.id,
              image,
            });
          }
        }
      }
    }

    expect(broken).toEqual([]);
  });
});
