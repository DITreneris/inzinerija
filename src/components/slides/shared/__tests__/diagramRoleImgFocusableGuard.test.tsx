/**
 * A11Y-GUARD (M79): no tab-stop / native interactive descendants inside role="img".
 * Keyboard primary lives on Shell / DiagramStepNav outside the img.
 */
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import {
  getDiagramRendererKeys,
  renderDiagramSection,
} from '../../types/content/diagramRenderers';
import Schema3InteractiveDiagram from '../Schema3InteractiveDiagram';
import RagDuomenuRuosimasDiagram from '../RagDuomenuRuosimasDiagram';
import WorkflowComparisonDiagram from '../WorkflowComparisonDiagram';
import ContextEngineeringPipelineDiagram from '../ContextEngineeringPipelineDiagram';
import LlmAutoregressiveDiagram from '../LlmAutoregressiveDiagram';

const FOCUSABLE_SELECTOR =
  'button, a[href], input, select, textarea, [contenteditable="true"], [tabindex]';

function focusableInsideRoleImg(root: ParentNode): Element[] {
  const imgs = root.querySelectorAll('[role="img"]');
  const hits: Element[] = [];
  imgs.forEach((img) => {
    img.querySelectorAll(FOCUSABLE_SELECTOR).forEach((el) => {
      const ti = el.getAttribute('tabindex');
      if (ti !== null && Number(ti) < 0) return;
      hits.push(el);
    });
  });
  return hits;
}

describe('A11Y-GUARD: role=img has no focusable descendants', () => {
  it('registry diagrams via getDiagramRendererKeys() stay keyboard-clean under role=img', () => {
    const keys = getDiagramRendererKeys();
    expect(keys.length).toBeGreaterThan(10);

    const offenders: string[] = [];
    for (const key of keys) {
      const node = renderDiagramSection(key, undefined, {
        moduleId: 7,
        slideId: 73,
        imageAlt: key,
      });
      if (!node) {
        offenders.push(`${key}: null renderer`);
        continue;
      }
      const { container, unmount } = renderWithProviders(<>{node}</>);
      const bad = focusableInsideRoleImg(container);
      if (bad.length) {
        offenders.push(
          `${key}: ${bad.length} focusable (${bad
            .slice(0, 3)
            .map((el) => el.tagName + (el.getAttribute('tabindex') ?? ''))
            .join(', ')})`
        );
      }
      unmount();
    }
    expect(offenders).toEqual([]);
  });

  it('A11Y-SWEEP targets keep role=img free of tab stops', () => {
    const cases = [
      {
        name: 'Schema3InteractiveDiagram',
        ui: (
          <Schema3InteractiveDiagram
            currentStep={0}
            onStepClick={() => {}}
            locale="lt"
          />
        ),
      },
      {
        name: 'RagDuomenuRuosimasDiagram',
        ui: (
          <RagDuomenuRuosimasDiagram
            currentStep={0}
            onStepClick={() => {}}
            locale="lt"
          />
        ),
      },
      {
        name: 'WorkflowComparisonDiagram',
        ui: (
          <WorkflowComparisonDiagram
            mode="workflow"
            onLlmClick={() => {}}
            locale="lt"
          />
        ),
      },
      {
        name: 'ContextEngineeringPipelineDiagram',
        ui: <ContextEngineeringPipelineDiagram />,
      },
      {
        name: 'LlmAutoregressiveDiagram',
        ui: (
          <LlmAutoregressiveDiagram
            currentStep={0}
            onStepClick={() => {}}
            locale="lt"
          />
        ),
      },
    ] as const;

    const offenders: string[] = [];
    for (const c of cases) {
      const { container, unmount } = renderWithProviders(c.ui);
      const bad = focusableInsideRoleImg(container);
      if (bad.length) {
        offenders.push(`${c.name}: ${bad.length} focusable`);
      }
      unmount();
    }
    expect(offenders).toEqual([]);
  });
});
