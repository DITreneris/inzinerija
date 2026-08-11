#!/usr/bin/env node
/**
 * One-off migration: normalize every EN surface to American English (GOLDEN §6c).
 *
 * Scope:
 * - EN JSON data (authoring SOT only – `tools-en-m1-*.json` etc. come from
 *   `generate:core-data`, so run that afterwards).
 * - `src/locales/en.json` values (never keys – `t('artefactDesc')` call sites).
 * - EN string literals in `.ts` / `.tsx`, skipping identifiers and design tokens.
 * - Durable EN build scripts + `*-en-plain-overrides` modules, so a rebuild
 *   cannot reintroduce British spellings.
 *
 * Run `node scripts/patch-en-american-spelling.mjs` for a dry-run report,
 * add `--apply` to write.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import {
  findBritishSpellings,
  toAmericanEnglish,
} from './lib/en-spelling-map.mjs';
import {
  rewriteStringLiterals,
  isLossless,
} from './lib/source-string-literals.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const APPLY = process.argv.includes('--apply');
const dataDir = join(root, 'src', 'data');

/** Tool `name` must stay byte-identical to tools.json (see audit:tools). */
const SKIP_JSON_KEYS = new Set([
  'id',
  'url',
  'icon',
  'image',
  'type',
  'accent',
  'identityIcon',
]);
const SKIP_TOOL_NAME = /^tools(-en)?(-m1-m\d+)?\.json$/;

/** Generated profiles – rebuilt by generate:core-data, never edited directly. */
const GENERATED = /^(modules|glossary|tools|tools-en)-m1-m\d+\.json$/;

const changes = [];

function record(file, before, after, kind) {
  const hits = findBritishSpellings(before).map((h) => `${h.hit}→${h.ame}`);
  changes.push({
    file: relative(root, file),
    kind,
    hits,
    before: before.slice(0, 120),
  });
  return after;
}

// ---------- JSON data ----------

/**
 * Edited as text, not via JSON.parse/stringify: a round-trip would reflow every
 * compact array in the file and bury the real change in thousands of lines of
 * formatting churn.
 *
 * A JSON string token is a key when the next non-space character is `:`; only
 * values are rewritten.
 */
function processJson(file) {
  const raw = readFileSync(file, 'utf8');
  const fileName = file.split(/[/\\]/).pop();
  const guardToolName = SKIP_TOOL_NAME.test(fileName);
  let changed = false;

  const next = raw.replace(
    /"((?:\\.|[^"\\])*)"(\s*:)?/g,
    (whole, body, colon, offset) => {
      if (colon) return whole; // object key
      if (!body) return whole;

      // The key this value belongs to, e.g. `"description": "…"`.
      const before = raw.slice(Math.max(0, offset - 60), offset);
      const keyMatch = before.match(/"([A-Za-z0-9_]+)"\s*:\s*$/);
      const key = keyMatch?.[1];
      if (key && SKIP_JSON_KEYS.has(key)) return whole;
      if (key === 'name' && guardToolName) return whole;

      const rewritten = toAmericanEnglish(body);
      if (rewritten === body) return whole;
      changed = true;
      record(file, body, rewritten, 'json');
      return `"${rewritten}"`;
    }
  );

  if (changed && APPLY) writeFileSync(file, next);
}

const enJsonFiles = readdirSync(dataDir)
  .filter((f) => f.endsWith('.json'))
  .filter((f) => /-en(-|\.)|^quiz-en|^glossary-en/.test(f))
  .filter((f) => !GENERATED.test(f))
  .map((f) => join(dataDir, f));

for (const file of enJsonFiles) processJson(file);

// ---------- locale file (values only) ----------

const localeFile = join(root, 'src', 'locales', 'en.json');
processJson(localeFile);

// ---------- TS / TSX string literals ----------

const TAILWIND_OR_TOKEN =
  /(?:bg|text|border|from|to|via|ring|fill|stroke|shadow|outline|divide|placeholder|accent|decoration)-|^#|--/;

/**
 * Rewrites happen only inside string literals, so identifiers
 * (`formatDepthRolesArtefact`, `artefactHeading`) and Tailwind class names keep
 * their spelling.
 */
function normalizeSource(file) {
  const raw = readFileSync(file, 'utf8');
  // A no-op pass must reproduce the file byte for byte, otherwise the scanner
  // mis-parsed something and rewriting would corrupt it.
  if (!isLossless(raw)) {
    throw new Error(
      `Scanner is not lossless on ${relative(root, file)} – aborting`
    );
  }
  let changed = false;
  const next = rewriteStringLiterals(raw, (body) => {
    if (!body || TAILWIND_OR_TOKEN.test(body)) return body;
    const rewritten = toAmericanEnglish(body);
    if (rewritten === body) return body;
    changed = true;
    record(file, body, rewritten, 'source');
    return rewritten;
  });
  if (changed && APPLY) writeFileSync(file, next);
}

/** Mirrors audit-en-spelling.mjs: gate fixtures hold British forms on purpose. */
const SKIP_SOURCE =
  /diagramTokens\.ts$|contentTrackTokens|\.d\.ts$|\.test\.tsx?$|[\\/]__tests__[\\/]/;

function collectSources(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const fp = join(dir, e.name);
    if (e.isDirectory()) collectSources(fp, out);
    else if (/\.(ts|tsx)$/.test(e.name) && !SKIP_SOURCE.test(fp)) out.push(fp);
  }
  return out;
}

for (const file of collectSources(join(root, 'src'))) normalizeSource(file);

// ---------- durable EN build scripts + override modules ----------

const scriptDir = join(root, 'scripts');
const durable = [
  ...readdirSync(scriptDir)
    .filter((f) => /^build-en-|^extract-modules-/.test(f) && f.endsWith('.mjs'))
    .map((f) => join(scriptDir, f)),
  ...(existsSync(join(scriptDir, 'lib'))
    ? readdirSync(join(scriptDir, 'lib'))
        .filter((f) => /en-plain-overrides|en-lt-map|en-manifest/.test(f))
        .map((f) => join(scriptDir, 'lib', f))
    : []),
];

for (const file of durable) {
  if (file.endsWith('.json')) processJson(file);
  else normalizeSource(file);
}

// ---------- report ----------

const byFile = {};
for (const c of changes) (byFile[c.file] ??= []).push(c);

let total = 0;
for (const [file, list] of Object.entries(byFile).sort()) {
  const hits = list.flatMap((c) => c.hits);
  total += hits.length;
  const uniq = [...new Set(hits)].sort();
  console.log(`${String(hits.length).padStart(4)}  ${file}`);
  console.log(`      ${uniq.join(', ')}`);
}

console.log(
  `\n${APPLY ? 'Applied' : 'Dry-run'}: ${total} British spelling(s) in ${Object.keys(byFile).length} file(s).`
);
if (!APPLY) console.log('Re-run with --apply to write.');
else console.log('Next: npm run generate:core-data');
