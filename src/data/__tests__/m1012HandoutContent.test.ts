import { describe, expect, it } from 'vitest';
import ltContent from '../m1012HandoutContent.json';
import enContent from '../m1012HandoutContent-en.json';
import type { M1012HandoutContent } from '../handoutContentLoader';

const lt = ltContent as M1012HandoutContent;
const en = enContent as M1012HandoutContent;

const ARRAY_FIELDS = [
  'agentCycleSteps',
  'threeAModel',
  'workflowSteps',
  'promptPatterns',
] as const;

const REQUIRED_STRING_FIELDS = [
  'title',
  'subtitle',
  'reflectionSummary',
  'nextPageHeading',
  'nextPageIntro',
  'primaryCtaLabel',
  'websiteUrl',
  'websiteCta',
  'footerText',
] as const;

function sortedKeys(value: object): string[] {
  return Object.keys(value).sort();
}

function visibleStrings(content: M1012HandoutContent): string[] {
  return [
    content.title,
    content.subtitle,
    ...content.agentCycleSteps,
    ...content.threeAModel,
    ...content.workflowSteps,
    ...content.promptPatterns,
    content.reflectionSummary,
    content.nextPageHeading,
    content.nextPageIntro,
    content.primaryCtaLabel,
    content.secondaryCtaLabels.decide,
    content.secondaryCtaLabels.map,
    content.websiteCta,
    content.footerText,
  ];
}

describe('M10–M12 handout content parity', () => {
  it('keeps LT and EN top-level structure in sync', () => {
    expect(sortedKeys(en)).toEqual(sortedKeys(lt));
  });

  it('keeps list lengths in sync across locales', () => {
    for (const field of ARRAY_FIELDS) {
      expect(en[field], field).toHaveLength(lt[field].length);
      expect(en[field].length, field).toBeGreaterThan(0);
    }
  });

  it('keeps secondary CTA keys in sync', () => {
    expect(sortedKeys(en.secondaryCtaLabels)).toEqual(
      sortedKeys(lt.secondaryCtaLabels)
    );
  });

  it('keeps required root strings populated', () => {
    for (const field of REQUIRED_STRING_FIELDS) {
      expect(lt[field], `LT ${field}`).toBeTruthy();
      expect(en[field], `EN ${field}`).toBeTruthy();
    }
  });

  it('uses locale-specific AI terminology in visible strings', () => {
    const ltText = visibleStrings(lt).join('\n');
    const enText = visibleStrings(en).join('\n');

    expect(ltText).not.toMatch(/\bAI\b/);
    expect(enText).not.toMatch(/\bDI\b/);
    expect(ltText).toMatch(/\bDI\b/);
    expect(enText).toMatch(/\bAI\b/);
  });
});
