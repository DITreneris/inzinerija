import { describe, expect, it } from 'vitest';
import {
  applyM9JourneyTheme,
  applyM9PracticeTemplate,
} from '../applyM9JourneyTheme';
import { getM9WorkflowPrompts } from '../../components/slides/shared/m9DataWorkflowContent';
import { resolveM9JourneySlots } from '../resolveM9JourneyCopy';

describe('applyM9JourneyTheme', () => {
  it('replaces [X] and legacy theme brackets', () => {
    const out = applyM9JourneyTheme(
      'Tema [X]; senas [TAVO TEMA – įmonė]; EN [YOUR TOPIC – company]',
      'valdybos rodiklių santrauka'
    );
    expect(out).toContain('valdybos rodiklių santrauka');
    expect(out).not.toMatch(/\[X\]|TAVO TEMA|YOUR TOPIC/);
  });

  it('injects vadyba theme into deep-research workflow prompts', () => {
    const theme = resolveM9JourneySlots('vadyba', 'lt').themePlaceholder;
    const prompts = getM9WorkflowPrompts('lt');
    const deepResearch = prompts[2];
    const runTools = prompts[3];
    expect(applyM9JourneyTheme(deepResearch.copyable, theme)).toContain(theme);
    expect(applyM9JourneyTheme(runTools.copyable, theme)).toContain(theme);
    expect(applyM9JourneyTheme(deepResearch.copyable, theme)).not.toContain(
      '[X]'
    );
  });

  it('injects pardavimai theme into EN deep-research prompts', () => {
    const theme = resolveM9JourneySlots('pardavimai', 'en').themePlaceholder;
    const prompts = getM9WorkflowPrompts('en');
    const copyable = applyM9JourneyTheme(prompts[2].copyable, theme);
    expect(copyable).toContain(theme);
    expect(copyable).not.toMatch(/\[YOUR TOPIC|\[X\]/);
  });

  it('replaces LT sector token in catalog practice template', () => {
    const slots = resolveM9JourneySlots('rinkodara', 'lt');
    const out = applyM9PracticeTemplate(
      'Šaltiniai [įmonės / sektoriaus] temai.',
      slots.themePlaceholder,
      slots.sampleColumns
    );
    expect(out).toContain(slots.themePlaceholder);
    expect(out).not.toContain('[įmonės / sektoriaus]');
  });

  it('injects rinkodara columns into 93.2 LT template token', () => {
    const slots = resolveM9JourneySlots('rinkodara', 'lt');
    const out = applyM9PracticeTemplate(
      'Stulpeliai: [STULPELIAI].',
      slots.themePlaceholder,
      slots.sampleColumns
    );
    expect(out).toContain('channel');
    expect(out).toContain('campaign');
    expect(out).not.toContain('[STULPELIAI]');
    expect(out).not.toContain('revenue');
  });

  it('injects IT columns into EN [COLUMNS] token', () => {
    const slots = resolveM9JourneySlots('it-inzinerija', 'en');
    const out = applyM9PracticeTemplate(
      'Columns: [COLUMNS].',
      slots.themePlaceholder,
      slots.sampleColumns
    );
    expect(out).toContain('error_count');
    expect(out).not.toContain('[COLUMNS]');
    expect(out).not.toMatch(/revenue|units/);
  });

  it('falls back to pardavimai columns when journey is null', () => {
    const slots = resolveM9JourneySlots(null, 'lt');
    const out = applyM9PracticeTemplate(
      'Stulpeliai: [STULPELIAI].',
      slots.themePlaceholder,
      slots.sampleColumns
    );
    expect(out).toContain('date, region, product, revenue, units');
  });
});
