#!/usr/bin/env node
/**
 * Typography audit (GOLDEN §1 / DS 0.3.3) — skenuoja src/components TSX.
 *
 * Ban: font-black; text-[9px|10px|11px] learner UI.
 * Info: files with many raw text-(xl|2xl|3xl) and no typographyClasses import.
 *
 * Usage: node scripts/audit-typography.mjs [--json] [--fail-on-regression]
 * Exit: 0 warn | 1 if --fail-on-regression and hard bans fail
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SCAN_DIRS = ['src/components'];
const SKIP_PATTERNS = [/\.test\.tsx?$/, /\.d\.ts$/, /\bnode_modules\b/];

/** Empty after T6 — no learner UI micro-px allowlist */
const MICRO_PX_ALLOWLIST = [];

const FLAGS = {
  json: process.argv.includes('--json'),
  failOnRegression: process.argv.includes('--fail-on-regression'),
};

const FONT_BLACK_RE = /\bfont-black\b/g;
const MICRO_PX_RE = /\btext-\[(?:9|10|11)px\]/g;
const RAW_DISPLAY_RE = /\btext-(?:xl|2xl|3xl|4xl)\b/g;

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
    if (st.isDirectory()) walk(full, files);
    else if (/\.tsx?$/.test(entry)) files.push(full);
  }
  return files;
}

function toRel(full) {
  return relative(root, full).replace(/\\/g, '/');
}

function countMatches(re, text) {
  const m = text.match(re);
  return m ? m.length : 0;
}

function lineHits(re, text, rel) {
  const hits = [];
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) {
      hits.push({ file: rel, line: i + 1, preview: lines[i].trim().slice(0, 120) });
    }
    re.lastIndex = 0;
  }
  return hits;
}

const files = SCAN_DIRS.flatMap((d) => walk(join(root, d)));
const fontBlackHits = [];
const microPxHits = [];
const infoRaw = [];

for (const full of files) {
  const rel = toRel(full);
  const text = readFileSync(full, 'utf8');
  fontBlackHits.push(...lineHits(FONT_BLACK_RE, text, rel));

  if (!MICRO_PX_ALLOWLIST.includes(rel)) {
    microPxHits.push(...lineHits(MICRO_PX_RE, text, rel));
  }

  const hasImport = /typographyClasses/.test(text);
  const rawCount = countMatches(RAW_DISPLAY_RE, text);
  if (!hasImport && rawCount >= 8) {
    infoRaw.push({ file: rel, rawDisplay: rawCount });
  }
}

const summary = {
  fontBlack: fontBlackHits.length,
  microPx: microPxHits.length,
  infoRawHeavy: infoRaw.length,
  ok: fontBlackHits.length === 0 && microPxHits.length === 0,
};

if (FLAGS.json) {
  console.log(
    JSON.stringify(
      { summary, fontBlackHits, microPxHits, infoRaw: infoRaw.slice(0, 20) },
      null,
      2
    )
  );
} else {
  console.log('Typography audit (GOLDEN §1 / DS 0.3.3)');
  console.log(`  font-black: ${summary.fontBlack} (ban → 0)`);
  console.log(`  text-[9|10|11px] outside allowlist: ${summary.microPx} (ban → 0)`);
  console.log(`  info: files ≥8 raw text-xl+ without typographyClasses: ${summary.infoRawHeavy}`);
  if (fontBlackHits.length) {
    console.log('\nfont-black:');
    for (const h of fontBlackHits.slice(0, 30)) {
      console.log(`  ${h.file}:${h.line}  ${h.preview}`);
    }
  }
  if (microPxHits.length) {
    console.log('\nmicro px:');
    for (const h of microPxHits.slice(0, 40)) {
      console.log(`  ${h.file}:${h.line}  ${h.preview}`);
    }
  }
  if (infoRaw.length) {
    console.log('\ninfo (raw display heavy):');
    for (const r of infoRaw.slice(0, 15)) {
      console.log(`  ${r.file}  rawDisplay=${r.rawDisplay}`);
    }
  }
  console.log(summary.ok ? '\nPASS' : '\nFAIL (hard bans)');
}

if (FLAGS.failOnRegression && !summary.ok) process.exit(1);
process.exit(0);
