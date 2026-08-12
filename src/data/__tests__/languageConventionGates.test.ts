/**
 * Regression: language-convention gates that span every surface.
 *
 * `audit:en-language-m*` reads only its own two files per range, so `artefact`
 * survived in `modules-journey-en-m7.json` and the LT `Jūs` form survived in the
 * glossary, prompt library, handouts and `lt.json` after the 2026-08-04 pass.
 * These two gates close that hole: EN = American English, LT = `tu`.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import {
  findBritishSpellings,
  toAmericanEnglish,
} from '../../../scripts/lib/en-spelling-map.mjs';
import { forEachStringLiteral } from '../../../scripts/lib/source-string-literals.mjs';
import {
  findLtAddressViolations,
  findLtBarbarisms,
} from '../../../scripts/lib/lt-address-rules.mjs';

const testDir = dirname(fileURLToPath(import.meta.url));
const root = join(testDir, '../../..');

function runGate(script: string): { ok: boolean; out: string } {
  try {
    return {
      ok: true,
      out: execFileSync('node', [script], {
        cwd: root,
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
      }),
    };
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string };
    return { ok: false, out: `${err.stdout ?? ''}${err.stderr ?? ''}` };
  }
}

const repoWideGateTimeoutMs = 120_000;

describe('EN spelling gate (American English)', () => {
  it(
    'passes repo-wide',
    () => {
      const { ok, out } = runGate('scripts/audit-en-spelling.mjs');
      expect(ok, out).toBe(true);
    },
    repoWideGateTimeoutMs
  );

  it('flags British forms and keeps the original casing when rewriting', () => {
    expect(
      findBritishSpellings('an artefact of behaviour').map((h) => h.hit)
    ).toEqual(['artefact', 'behaviour']);
    expect(toAmericanEnglish('Artefact')).toBe('Artifact');
    expect(toAmericanEnglish('ARTEFACT')).toBe('ARTIFACT');
    expect(toAmericanEnglish('optimise the catalogue')).toBe(
      'optimize the catalog'
    );
  });

  it('is idempotent: American forms are not findings', () => {
    for (const clean of [
      'artifact',
      'behavior',
      'catalogs',
      'optimize',
      'defense',
      'license',
    ]) {
      expect(findBritishSpellings(clean), clean).toEqual([]);
    }
  });

  it('leaves code identifiers alone – only string literals are checked', () => {
    const src = 'const artefactHeading = "the artefact"; // artefact note\n';
    const bodies: string[] = [];
    forEachStringLiteral(src, (body) => {
      bodies.push(body);
    });
    expect(bodies).toEqual(['the artefact']);
  });

  it('never exposes ${...} interpolations as copy', () => {
    const bodies: string[] = [];
    forEachStringLiteral(
      'const s = `an artefact of ${artefactCount} items`;',
      (b) => {
        bodies.push(b);
      }
    );
    expect(bodies).toEqual(['an artefact of ', ' items']);
    expect(bodies.join('|')).not.toContain('artefactCount');
  });
});

describe('LT address gate (tu form)', () => {
  it(
    'passes repo-wide',
    () => {
      const { ok, out } = runGate('scripts/audit-lt-address.mjs');
      expect(ok, out).toBe(true);
    },
    repoWideGateTimeoutMs
  );

  it('flags 2nd-person-plural verbs the five legacy patterns missed', () => {
    const hits = (s: string) =>
      findLtAddressViolations(s).map((f) => f.hit.toLowerCase());
    expect(hits('Kai tiriate duomenis')).toContain('tiriate');
    expect(hits('Gaunate RFP')).toContain('gaunate');
    expect(hits('Kaip jungiate komandas')).toContain('jungiate');
  });

  it('handles Lithuanian diacritics at word boundaries', () => {
    // `\b` is ASCII-only, so `įsigykite` slipped through before the rule used a
    // Unicode-aware boundary.
    expect(findLtAddressViolations('įsigykite prieigą')).toHaveLength(1);
    expect(findLtAddressViolations('Paspauskite mygtuką')).toHaveLength(1);
  });

  it('flags formal pronouns', () => {
    expect(
      findLtAddressViolations('Jūs galite pradėti').length
    ).toBeGreaterThan(0);
  });

  it('does not flag English tokens on LT surfaces', () => {
    for (const clean of [
      'Prompt suite',
      'the website',
      'Write it now',
      'Kite Studio',
      'unit tests',
    ]) {
      expect(findLtAddressViolations(clean), clean).toEqual([]);
    }
  });

  it('flags barbarisms fixed in this pass', () => {
    expect(findLtBarbarisms('įtakoja rezultatą').length).toBeGreaterThan(0);
    expect(findLtBarbarisms('pilnai paruošta').length).toBeGreaterThan(0);
    expect(findLtBarbarisms('sekančioje skaidrėje').length).toBeGreaterThan(0);
  });
});

describe('fixed surfaces stay fixed', () => {
  const read = (p: string) => readFileSync(join(root, p), 'utf8');

  it('lt.json uses tu form in learner-facing copy', () => {
    const lt = read('src/locales/lt.json');
    for (const bad of [
      'Pabandykite iš naujo',
      'Slinkite horizontaliai',
      'Aplankykite svetainę',
      'Kas esate ir ką darote',
      'Praktikuokite kasdien',
    ]) {
      expect(lt, bad).not.toContain(bad);
    }
    expect(lt).toContain('Pabandyk iš naujo');
    expect(lt).toContain('Kas esi ir ką darai');
  });

  it('glossary and handout definitions address the learner as tu', () => {
    expect(read('src/data/glossary.json')).toContain('Rolė (kas esi)');
    expect(read('src/data/m6HandoutContent.json')).not.toContain(
      'Kai pakeičiate promptą'
    );
  });

  it('prompt library placeholders match the modules.json convention', () => {
    const lib = read('src/data/promptLibrary.json');
    expect(lib).not.toContain('[ĮRAŠYKITE]');
    expect(lib).not.toContain('[APRAŠYKITE UŽDUOTĮ]');
  });

  it('hardcoded LT fallbacks in components address the learner as tu', () => {
    // These live next to their EN twin (`locale === 'en' ? … : …`), so a
    // JSON-only gate reported clean while the copy still said `Jūs`.
    expect(
      read('src/components/slides/types/TestPracticeSlides.tsx')
    ).not.toContain('Esate pasiruošę');
    expect(
      read('src/components/slides/shared/questions/ConfidenceSelector.tsx')
    ).not.toContain('Kaip esate tikri');
    const readiness = read(
      'src/components/slides/shared/m10TeamReadinessContent.ts'
    );
    expect(readiness).toContain('Sukurk vieną prompto šabloną');
    expect(readiness).not.toMatch(
      /\b(Sutarkite|Pasirinkite|Paleiskite|Pradėkite)\b/
    );
  });

  it('EN journey overlay and glossary use American spelling', () => {
    expect(read('src/data/modules-journey-en-m7.json')).not.toMatch(
      /\bartefact\b/i
    );
    expect(read('src/data/modules-en-m7-m9.json')).not.toMatch(
      /\bRecognise\b/i
    );
  });
});
