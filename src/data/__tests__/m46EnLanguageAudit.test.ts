/**
 * Regression: M4–M6 EN language audit (scripts/audit-en-language-m4-m6.mjs --json).
 * Locks in that the M4–6 EN overlay has no LT remnants / DI-AI issues after deep-merge.
 */
import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const testDir = dirname(fileURLToPath(import.meta.url));
const root = join(testDir, '../../..');
const dataDir = join(root, 'src', 'data');

type AuditReport = {
  findings: Array<{ moduleId?: number; slideId?: number; rule: string }>;
  counts: Record<string, number>;
};

function runLanguageAudit(): AuditReport {
  const out = execSync('node scripts/audit-en-language-m4-m6.mjs --json', {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  return JSON.parse(out);
}

describe('M4–M6 EN language audit', () => {
  const enOverlay = join(dataDir, 'modules-en-m4-m6.json');

  it('no EN LT-word or diacritics remnants in merged M4–6', () => {
    if (!existsSync(enOverlay)) return;
    const report = runLanguageAudit();
    const remnants = report.findings.filter(
      (f) => f.rule === 'en_lt_word' || f.rule === 'en_lt_diacritics'
    );
    expect(remnants, JSON.stringify(remnants, null, 2)).toEqual([]);
  });

  it('no LT tu-form or AI-instead-of-DI findings in M4–6 source', () => {
    if (!existsSync(join(dataDir, 'modules.json'))) return;
    const report = runLanguageAudit();
    const lt = report.findings.filter(
      (f) => f.rule.startsWith('lt_jusu') || f.rule === 'lt_uses_AI_not_DI'
    );
    expect(lt, JSON.stringify(lt, null, 2)).toEqual([]);
  });

  it('total violation count is zero', () => {
    if (!existsSync(enOverlay)) return;
    const report = runLanguageAudit();
    expect(report.findings.length).toBe(0);
  });
});
