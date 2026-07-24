import { describe, expect, it } from 'vitest';
import {
  buildVerticalColumnOrigin,
  verticalColumnMarginsEqual,
  visibleShaftMeetsFloor,
} from '../diagramLayoutMath';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import { DI_PREZENTACIJOS_GEOMETRY } from '../DiPrezentacijosWorkflowDiagram';
import { getDiPrezentacijosSteps } from '../diPrezentacijosWorkflowConfig';

describe('diPrezentacijosLayout (M5 LMS 1A W2)', () => {
  it('centers desktop and compact columns with equal margins', () => {
    const desktop = buildVerticalColumnOrigin({
      viewBoxW: DI_PREZENTACIJOS_GEOMETRY.desktop.viewBoxW,
      colW: DI_PREZENTACIJOS_GEOMETRY.desktop.colW,
    });
    const compact = buildVerticalColumnOrigin({
      viewBoxW: DI_PREZENTACIJOS_GEOMETRY.compact.viewBoxW,
      colW: DI_PREZENTACIJOS_GEOMETRY.compact.colW,
    });
    expect(desktop.colsX).toBe(100);
    expect(desktop.cx).toBe(280);
    expect(compact.colsX).toBe(30);
    expect(compact.cx).toBe(170);
    expect(
      verticalColumnMarginsEqual(
        desktop.colsX,
        DI_PREZENTACIJOS_GEOMETRY.desktop.colW,
        DI_PREZENTACIJOS_GEOMETRY.desktop.viewBoxW
      )
    ).toBe(true);
    expect(
      verticalColumnMarginsEqual(
        compact.colsX,
        DI_PREZENTACIJOS_GEOMETRY.compact.colW,
        DI_PREZENTACIJOS_GEOMETRY.compact.viewBoxW
      )
    ).toBe(true);
  });

  it('keeps five-step shaft floor with local tip 10 and LMS caption tokens', () => {
    expect(DI_PREZENTACIJOS_GEOMETRY.stepCount).toBe(5);
    expect(DI_PREZENTACIJOS_GEOMETRY.arrowTip).toBeGreaterThanOrEqual(10);
    expect(
      visibleShaftMeetsFloor(
        DI_PREZENTACIJOS_GEOMETRY.gap,
        DI_PREZENTACIJOS_GEOMETRY.arrowTip
      )
    ).toBe(true);
    expect(DIAGRAM_TOKENS.opacity.inactive).toBeGreaterThanOrEqual(0.85);
    expect(DIAGRAM_TOKENS.typography.titleWeight).toBe(700);
    expect(DIAGRAM_TOKENS.typography.title.desktop).toBe(17);
  });

  it('uses Title Case labels and verb sub-descriptions (not ALL CAPS nouns)', () => {
    const lt = getDiPrezentacijosSteps('lt');
    const en = getDiPrezentacijosSteps('en');
    expect(lt.map((s) => s.label)).toEqual([
      'Tikslas',
      'Struktūra',
      'Turinys',
      'Vizualas',
      'Poliravimas',
    ]);
    expect(en.map((s) => s.label)).toEqual([
      'Goal',
      'Structure',
      'Content',
      'Visuals',
      'Polish',
    ]);
    for (const step of [...lt, ...en]) {
      expect(step.label).not.toMatch(/^[A-ZĄČĘĖĮŠŲŪŽ ]{4,}$/);
      expect(step.label).not.toMatch(/TURINIO GENERAVIMAS|CONTENT GENERATION/i);
    }
    expect(lt.map((s) => s.desc)).toEqual([
      'Nustatyk auditoriją',
      'Sudėliok karkasą',
      'Generuok tekstą',
      'Dėliok layout',
      'Sutvarkyk CTA',
    ]);
    expect(en.map((s) => s.desc)).toEqual([
      'Set the audience',
      'Build the outline',
      'Generate the text',
      'Shape the layout',
      'Tighten the CTA',
    ]);
  });
});
