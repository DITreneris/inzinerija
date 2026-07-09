import { describe, expect, it } from 'vitest';
import ltContent from '../m4HandoutContent.json';
import enContent from '../m4HandoutContent-en.json';
import type { M4HandoutContent } from '../handoutContentLoader';

const lt = ltContent as M4HandoutContent;
const en = enContent as M4HandoutContent;

const ARRAY_FIELDS = ['coreTopics', 'checklist'] as const;

function sortedKeys(value: object): string[] {
  return Object.keys(value).sort();
}

function visibleStrings(content: M4HandoutContent): string[] {
  return [
    content.title,
    content.subtitle,
    ...content.coreTopics.flatMap((topic) => [topic.title, topic.meaning]),
    ...content.checklist,
    content.starterPrompt,
    content.footerText,
  ];
}

describe('Module 4 handout content parity', () => {
  it('keeps LT and EN top-level structure in sync', () => {
    expect(sortedKeys(en)).toEqual(sortedKeys(lt));
  });

  it('keeps list lengths in sync across locales', () => {
    for (const field of ARRAY_FIELDS) {
      expect(en[field], field).toHaveLength(lt[field].length);
      expect(en[field].length, field).toBeGreaterThan(0);
    }
  });

  it('keeps required root strings populated', () => {
    for (const field of [
      'title',
      'subtitle',
      'starterPrompt',
      'footerText',
    ] as const) {
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
