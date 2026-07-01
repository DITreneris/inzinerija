#!/usr/bin/env node
/**
 * Design Tokens audit (warn-only) — skenuoja src/components/**\/*.tsx ir
 * randa hex spalvas bei inline style su spalvomis/šešėliais, kurios turėtų
 * būti tokens (tailwind.config.js arba src/design-tokens.ts).
 *
 * SOT: docs/development/DESIGN_SYSTEM_V0_2.md §5 (Etapas E2 — Token inventory).
 * Naudojimas: node scripts/audit-design-tokens.mjs [--json] [--top=N] [--verbose]
 * Exit code: VISADA 0 (warn-only — baseline'ui, ne pre-commit gate).
 *
 * Flag'ai:
 *   --json       JSON output (summary + ranked top-N).
 *   --top=N      Top „dirtiest“ failai N (default 5).
 *   --verbose    Po santraukos atspausdina per-finding eilutes formatu
 *                `path:line  [category]  preview` (atitinka plano §5 E2.1 exit #2).
 *
 * Detekcija:
 *   - hex          → /#[0-9a-fA-F]{3,8}\b/ (CSS-style hex)
 *   - inlineStyle    → style={{ ... color|background|boxShadow|fill|stroke ... }}
 *   - svgFill        → fill="#..."  arba stroke="#..."
 *   - arbitraryClass → Tailwind arbitrary styling such as bg-[#...], border-[#...], shadow-[...]
 *
 * Praleidžia: testai (*.test.tsx), tipų failai (*.d.ts), node_modules.
 * Tinka:      visus .tsx ir .ts src/components/ ir src/utils/ paviršiuje.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SCAN_DIRS = ['src/components', 'src/utils'];
const SKIP_PATTERNS = [/\.test\.tsx?$/, /\.d\.ts$/, /\bnode_modules\b/];

const FLAGS = {
  json: process.argv.includes('--json'),
  verbose: process.argv.includes('--verbose'),
  topN: (() => {
    const arg = process.argv.find((a) => a.startsWith('--top='));
    return arg ? parseInt(arg.split('=')[1], 10) || 5 : 5;
  })(),
};

/** Reikšmės, kurios NETURI būti laikomos „hex'ais“ (legitimūs base64 fragmentai, regex bait'ai). */
const HEX_FALSE_POSITIVE = /^#(fff|000|ffffff|000000)$/i; // jei nori taikyti baltą/juodą kaip OK
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
const SVG_COLOR_RE = /(?:fill|stroke)="(#[0-9a-fA-F]{3,8})"/g;
const INLINE_STYLE_RE = /style=\{\{[^}]*?(?:color|background|backgroundImage|boxShadow|fill|stroke)[^}]*?\}\}/g;
const ARBITRARY_CLASS_RE = /\b(?:bg|border|text|shadow|fill|stroke)-\[[^\]]+\]/g;

function walk(dir, files = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (SKIP_PATTERNS.some((re) => re.test(full))) continue;
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      walk(full, files);
    } else if (/\.tsx?$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

function scanFile(absPath) {
  const content = readFileSync(absPath, 'utf8');
  const lines = content.split('\n');
  const findings = { hex: [], inlineStyle: [], svgFill: [], arbitraryClass: [] };

  // hex: line-by-line, kad turėtume line number ir context
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const matches = line.match(HEX_RE);
    if (matches) {
      for (const m of matches) {
        if (HEX_FALSE_POSITIVE.test(m)) continue;
        findings.hex.push({ line: i + 1, value: m, preview: line.trim().slice(0, 100) });
      }
    }
    const svgMatches = [...line.matchAll(SVG_COLOR_RE)];
    for (const sm of svgMatches) {
      findings.svgFill.push({ line: i + 1, value: sm[1], preview: line.trim().slice(0, 100) });
    }
    const arbitraryClassMatches = [...line.matchAll(ARBITRARY_CLASS_RE)];
    for (const am of arbitraryClassMatches) {
      findings.arbitraryClass.push({
        line: i + 1,
        value: am[0],
        preview: line.trim().slice(0, 100),
      });
    }
  }

  // inline style: multi-line — ieškom per visą failą (su `s` flag prie pat regex)
  const inlineStyleAll = [...content.matchAll(/style=\{\{[\s\S]*?\}\}/g)];
  for (const m of inlineStyleAll) {
    const block = m[0];
    if (!/(?:color|background|backgroundImage|boxShadow|fill|stroke)\s*:/.test(block)) continue;
    const startIdx = m.index;
    const lineNum = content.slice(0, startIdx).split('\n').length;
    findings.inlineStyle.push({
      line: lineNum,
      value: block.slice(0, 60).replace(/\s+/g, ' '),
      preview: '(see file)',
    });
  }

  return findings;
}

function summarize(report) {
  const counts = {
    files: report.length,
    hex: report.reduce((s, r) => s + r.findings.hex.length, 0),
    inlineStyle: report.reduce((s, r) => s + r.findings.inlineStyle.length, 0),
    svgFill: report.reduce((s, r) => s + r.findings.svgFill.length, 0),
    arbitraryClass: report.reduce((s, r) => s + r.findings.arbitraryClass.length, 0),
  };
  const ranked = report
    .map((r) => ({
      file: r.file,
      total:
        r.findings.hex.length +
        r.findings.inlineStyle.length +
        r.findings.svgFill.length +
        r.findings.arbitraryClass.length,
      ...r.findings,
    }))
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total);
  return { counts, ranked };
}

function printText(summary) {
  const { counts, ranked } = summary;
  console.log('\n=== Design Tokens Audit (warn-only baseline) ===');
  console.log(`Scanned files: ${counts.files}`);
  console.log(`  hex literals:    ${counts.hex}`);
  console.log(`  inline styles:   ${counts.inlineStyle}`);
  console.log(`  svg fill/stroke: ${counts.svgFill}`);
  console.log(`  arbitrary class: ${counts.arbitraryClass}`);
  console.log(`  TOTAL findings:  ${counts.hex + counts.inlineStyle + counts.svgFill + counts.arbitraryClass}`);
  console.log(`\nTop ${FLAGS.topN} „dirtiest“ failai:`);
  for (const r of ranked.slice(0, FLAGS.topN)) {
    const rel = relative(root, r.file);
    console.log(`  ${rel}  →  total ${r.total}  (hex: ${r.hex.length}, inline: ${r.inlineStyle.length}, svg: ${r.svgFill.length}, arbitrary: ${r.arbitraryClass.length})`);
  }
  console.log('\nNote: warn-only baseline. SOT — docs/development/DESIGN_SYSTEM_V0_2.md §5.');
  console.log('Hex „false positives“: #fff, #000, #ffffff, #000000 (praleisti).');
  console.log('Refactor planuojamas v0.3 — žr. §11 Backlog B1.');
}

function printVerbose(ranked) {
  console.log('\n--- Verbose findings (path:line  [category]  preview) ---');
  for (const r of ranked) {
    const rel = relative(root, r.file).replace(/\\/g, '/');
    for (const f of r.hex) {
      console.log(`${rel}:${f.line}  [hex]       ${f.value}  ${f.preview}`);
    }
    for (const f of r.inlineStyle) {
      console.log(`${rel}:${f.line}  [inline]    ${f.value}`);
    }
    for (const f of r.svgFill) {
      console.log(`${rel}:${f.line}  [svg]       ${f.value}  ${f.preview}`);
    }
    for (const f of r.arbitraryClass) {
      console.log(`${rel}:${f.line}  [arbitrary] ${f.value}  ${f.preview}`);
    }
  }
}

function main() {
  const allFiles = SCAN_DIRS.flatMap((d) => walk(join(root, d)));
  const report = allFiles.map((f) => ({ file: f, findings: scanFile(f) }));
  const summary = summarize(report);

  if (FLAGS.json) {
    console.log(JSON.stringify({ summary: summary.counts, ranked: summary.ranked.slice(0, FLAGS.topN) }, null, 2));
  } else {
    printText(summary);
    if (FLAGS.verbose) {
      printVerbose(summary.ranked);
    }
  }
  // warn-only: ALWAYS exit 0
  process.exit(0);
}

main();
