/**
 * Regression: M7–M9 EN language audit (scripts/audit-en-language-m7-m9.mjs --json).
 */
import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const testDir = dirname(fileURLToPath(import.meta.url));
const root = join(testDir, '../../..');

function runLanguageAudit(): AuditReport {
  const out = execSync('node scripts/audit-en-language-m7-m9.mjs --json', {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  return JSON.parse(out);
}

type AuditReport = {
  findings: Array<{ moduleId: number; slideId: number; rule: string }>;
  counts: Record<string, number>;
};

const dataDir = join(root, 'src', 'data');

function findingsForSlides(
  report: AuditReport,
  moduleId: number,
  slideIds: number[]
) {
  return report.findings.filter(
    (f) => f.moduleId === moduleId && slideIds.includes(f.slideId as number)
  );
}

describe('M7–M9 EN language audit', () => {
  const enOverlay = join(dataDir, 'modules-en-m7-m9.json');

  it('M9 slides 99 and 92 have no audit violations', () => {
    if (!existsSync(enOverlay)) return;
    const report = runLanguageAudit();
    const hits = findingsForSlides(report, 9, [99, 92]);
    expect(hits, JSON.stringify(hits, null, 2)).toEqual([]);
  });

  it('M9 lean practice scenarios 101,102,111,116,117 have no hybrid token violations', () => {
    if (!existsSync(enOverlay)) return;
    const report = runLanguageAudit();
    const hits = findingsForSlides(report, 9, [101, 102, 111, 116, 117]).filter(
      (f) => f.rule === 'en_hybrid_token' || f.rule === 'en_title_lt_prefix'
    );
    expect(hits, JSON.stringify(hits, null, 2)).toEqual([]);
  });

  it('LT tu-form: no lt_jusu findings in audit report', () => {
    if (!existsSync(join(dataDir, 'modules.json'))) return;
    const report = runLanguageAudit();
    const tu = report.findings.filter((f) => f.rule.startsWith('lt_jusu'));
    expect(tu).toEqual([]);
  });

  it('hybrid token count stays below regression ceiling', () => {
    if (!existsSync(enOverlay)) return;
    const report = runLanguageAudit();
    const hybrid = report.counts.en_hybrid_token ?? 0;
    expect(hybrid).toBe(0);
  });

  it('worst-risk M7 and M9 slides have no EN language audit findings', () => {
    if (!existsSync(enOverlay)) return;
    const report = runLanguageAudit();
    const m7Hits = findingsForSlides(
      report,
      7,
      [85, 861, 87, 88, 89, 891, 90, 91, 94, 75]
    );
    const m9Hits = findingsForSlides(report, 9, [90]);
    expect(
      [...m7Hits, ...m9Hits],
      JSON.stringify([...m7Hits, ...m9Hits], null, 2)
    ).toEqual([]);
  });

  it('LT token and broken phrase counts stay at zero in EN overlay', () => {
    if (!existsSync(enOverlay)) return;
    const report = runLanguageAudit();
    expect(report.counts.en_lt_token ?? 0).toBe(0);
    expect(report.counts.en_broken_phrase ?? 0).toBe(0);
    expect(report.counts.en_lt_heading ?? 0).toBe(0);
  });
});
