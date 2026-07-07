/**
 * Regression: M10–M12 EN/LT language audit (scripts/audit-en-language-m10-12.mjs --json).
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
  findings: Array<{
    moduleId: number;
    slideId: number;
    rule: string;
    path: string;
  }>;
  counts: Record<string, number>;
};

function runLanguageAudit(): AuditReport {
  const out = execSync('node scripts/audit-en-language-m10-12.mjs --json', {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  return JSON.parse(out);
}

describe('M10–M12 EN/LT language audit', () => {
  const enOverlay = join(dataDir, 'modules-en-m10-m12.json');

  it('has no EN overlay LT remnants or DI terminology leaks', () => {
    if (!existsSync(enOverlay)) return;
    const report = runLanguageAudit();
    expect(report.counts.en_lt_diacritics ?? 0).toBe(0);
    expect(report.counts.en_must_ai ?? 0).toBe(0);
    expect(report.counts.en_lt_word ?? 0).toBe(0);
  });

  it('has no LT formal-you or user-facing English relic findings', () => {
    if (!existsSync(enOverlay)) return;
    const report = runLanguageAudit();
    const ltHits = report.findings.filter((f) => f.rule.startsWith('lt_'));
    expect(ltHits, JSON.stringify(ltHits, null, 2)).toEqual([]);
  });
});
