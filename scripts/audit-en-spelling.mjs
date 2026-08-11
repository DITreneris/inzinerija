#!/usr/bin/env node
/**
 * EN spelling-convention gate: American English is the standard on every EN
 * surface (GOLDEN §6c).
 *
 * Covers what the per-range language audits do not: journey overlays, glossary,
 * quiz, handouts, locales, component copy and the durable EN build scripts. The
 * `audit:en-language-m*` gates each read only their own two files, which is how
 * `artefact` survived in `modules-journey-en-m7.json` after the 2026-08-04 pass.
 *
 * Identifiers keep their spelling – only string literals are checked in source
 * files, so `formatDepthRolesArtefact` and `artefactHeading` are not findings.
 */
import { readFileSync, readdirSync, existsSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { findBritishSpellings } from './lib/en-spelling-map.mjs';
import { forEachStringLiteral } from './lib/source-string-literals.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'src', 'data');
const allowlistPath = join(root, 'scripts', 'fixtures', 'en-spelling-allowlist.json');

const allowlist = existsSync(allowlistPath)
  ? JSON.parse(readFileSync(allowlistPath, 'utf8'))
  : { entries: [] };

/** Tool `name` must stay byte-identical to tools.json (see audit:tools). */
const SKIP_JSON_KEYS = new Set(['id', 'url', 'icon', 'image', 'type', 'accent', 'identityIcon']);
const TAILWIND_OR_TOKEN =
  /(?:bg|text|border|from|to|via|ring|fill|stroke|shadow|outline|divide|placeholder|accent|decoration)-|^#|--/;

const findings = [];

function isAllowed(file, hit) {
  return allowlist.entries.some(
    (e) => (e.file === file || e.file === '*') && e.hit.toLowerCase() === hit.toLowerCase()
  );
}

function add(file, hit, ame, context) {
  const rel = relative(root, file).replace(/\\/g, '/');
  if (isAllowed(rel, hit)) return;
  findings.push({ file: rel, hit, ame, context });
}

// ---------- EN JSON data ----------

function auditJson(file) {
  const raw = readFileSync(file, 'utf8');
  for (const m of raw.matchAll(/"((?:\\.|[^"\\])*)"(\s*:)?/g)) {
    const [, body, colon] = m;
    if (colon || !body) continue;
    const before = raw.slice(Math.max(0, m.index - 60), m.index);
    const key = before.match(/"([A-Za-z0-9_]+)"\s*:\s*$/)?.[1];
    if (key && SKIP_JSON_KEYS.has(key)) continue;
    for (const h of findBritishSpellings(body)) {
      add(file, h.hit, h.ame, body.slice(Math.max(0, h.index - 40), h.index + 40));
    }
  }
}

const enJsonFiles = readdirSync(dataDir)
  .filter((f) => f.endsWith('.json'))
  .filter((f) => /-en(-|\.)|^quiz-en|^glossary-en/.test(f))
  .map((f) => join(dataDir, f));

for (const file of enJsonFiles) auditJson(file);
auditJson(join(root, 'src', 'locales', 'en.json'));

// ---------- source copy ----------

function auditSource(file) {
  const raw = readFileSync(file, 'utf8');
  forEachStringLiteral(raw, (body) => {
    if (!body || TAILWIND_OR_TOKEN.test(body)) return;
    for (const h of findBritishSpellings(body)) {
      add(file, h.hit, h.ame, body.slice(Math.max(0, h.index - 40), h.index + 40));
    }
  });
}

/**
 * Tests are not shipped copy, and the gate's own regression fixtures have to
 * contain British spellings on purpose — scanning them makes the gate fail on
 * itself.
 */
const SKIP_SOURCE = /diagramTokens\.ts$|\.d\.ts$|\.test\.tsx?$|[\\/]__tests__[\\/]/;

function collect(dir, test, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const fp = join(dir, e.name);
    if (e.isDirectory()) collect(fp, test, out);
    else if (test(fp)) out.push(fp);
  }
  return out;
}

for (const file of collect(join(root, 'src'), (f) => /\.(ts|tsx)$/.test(f) && !SKIP_SOURCE.test(f))) {
  auditSource(file);
}

// ---------- durable EN build scripts ----------

const scriptDir = join(root, 'scripts');
for (const f of readdirSync(scriptDir)) {
  if (/^build-en-|^extract-modules-/.test(f) && f.endsWith('.mjs')) auditSource(join(scriptDir, f));
}
const libDir = join(scriptDir, 'lib');
if (existsSync(libDir)) {
  for (const f of readdirSync(libDir)) {
    if (/en-plain-overrides|en-lt-map|en-manifest/.test(f) && f.endsWith('.mjs')) {
      auditSource(join(libDir, f));
    }
  }
}

// ---------- report ----------

if (!findings.length) {
  console.log('EN spelling audit (American English): OK');
  process.exit(0);
}

const byFile = {};
for (const f of findings) (byFile[f.file] ??= []).push(f);

console.error(`EN spelling audit: ${findings.length} British spelling(s) found.\n`);
for (const [file, list] of Object.entries(byFile).sort()) {
  console.error(`  ${file} (${list.length})`);
  for (const f of list.slice(0, 8)) {
    console.error(`    ${f.hit} → ${f.ame}   …${f.context.replace(/\s+/g, ' ')}…`);
  }
  if (list.length > 8) console.error(`    … ${list.length - 8} more`);
}
console.error(
  '\nFix with: node scripts/patch-en-american-spelling.mjs --apply' +
    '\nIntentional exceptions go in scripts/fixtures/en-spelling-allowlist.json'
);
process.exit(1);
