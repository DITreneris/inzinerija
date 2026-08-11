#!/usr/bin/env node
/**
 * LT gate: learner copy addresses the reader as `tu`, never `Jūs`, and avoids
 * non-normative forms (AGENTS.md – universalios taisyklės).
 *
 * Covers the LT surfaces the per-range EN audits never look at: glossary, quiz,
 * prompt library, journey overlays, handouts and `lt.json` UI strings.
 */
import { readFileSync, readdirSync, existsSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { findLtAddressViolations, findLtBarbarisms } from './lib/lt-address-rules.mjs';
import { forEachStringLiteral } from './lib/source-string-literals.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'src', 'data');
const allowlistPath = join(root, 'scripts', 'fixtures', 'lt-address-allowlist.json');

const allowlist = existsSync(allowlistPath)
  ? JSON.parse(readFileSync(allowlistPath, 'utf8'))
  : { entries: [] };

/** Placeholders and ids are not prose. */
const SKIP_KEYS = new Set([
  'id', 'url', 'icon', 'image', 'type', 'accent', 'identityIcon', 'category',
  'blockVariant', 'pathBranch', 'branchIds', 'relatedSlideId', 'targetSlideId',
  'bloomLevel', 'level', 'correct', 'blockNumber',
]);

const FILES = [
  'modules.json',
  'glossary.json',
  'quiz.json',
  'promptLibrary.json',
  'modules-journey-m7.json',
  'modules-journey-m9.json',
  'modules-journey-m9-hub.json',
  'm1HandoutContent.json',
  'm4HandoutContent.json',
  'm5HandoutContent.json',
  'm6HandoutContent.json',
  'm79HandoutContent.json',
  'm1012HandoutContent.json',
  'm1315HandoutContent.json',
  'm1618HandoutContent.json',
  'certificateContent.json',
  'introPiePdfContent.json',
]
  .map((f) => join(dataDir, f))
  .concat([join(root, 'src', 'locales', 'lt.json')])
  .filter((f) => existsSync(f));

const findings = [];

function isAllowed(file, hit, path) {
  return allowlist.entries.some(
    (e) =>
      (e.file === file || e.file === '*') &&
      e.hit.toLowerCase() === hit.toLowerCase() &&
      (!e.path || e.path === path)
  );
}

function walk(node, file, path, key) {
  if (typeof node === 'string') {
    if (SKIP_KEYS.has(key) || !node.trim()) return;
    const rel = relative(root, file).replace(/\\/g, '/');
    for (const f of [...findLtAddressViolations(node), ...findLtBarbarisms(node)]) {
      if (isAllowed(rel, f.hit, path)) continue;
      findings.push({ file: rel, path, ...f, snippet: context(node, f.hit) });
    }
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, file, `${path}[${i}]`, key));
    return;
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, file, `${path}.${k}`, k);
  }
}

function context(value, hit) {
  const i = value.toLowerCase().indexOf(String(hit).toLowerCase());
  const start = Math.max(0, i - 40);
  return `${start > 0 ? '…' : ''}${value.slice(start, i + hit.length + 40).replace(/\s+/g, ' ')}`;
}

for (const file of FILES) walk(JSON.parse(readFileSync(file, 'utf8')), file, '', '');

/**
 * Components carry hardcoded LT fallbacks next to their EN twin (`locale === 'en'
 * ? … : …`), which is how `Esate pasiruošę` and `Dalinkitės su komanda` stayed in
 * the `Jūs` form while every JSON surface was clean.
 */
const SKIP_SOURCE = /\.test\.tsx?$|[\\/]__tests__[\\/]|\.d\.ts$/;

function collectSources(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const fp = join(dir, e.name);
    if (e.isDirectory()) collectSources(fp, out);
    else if (/\.(ts|tsx)$/.test(e.name) && !SKIP_SOURCE.test(fp)) out.push(fp);
  }
  return out;
}

const sources = collectSources(join(root, 'src'));
for (const file of sources) {
  const rel = relative(root, file).replace(/\\/g, '/');
  forEachStringLiteral(readFileSync(file, 'utf8'), (body) => {
    if (!body.trim()) return;
    for (const f of [...findLtAddressViolations(body), ...findLtBarbarisms(body)]) {
      if (isAllowed(rel, f.hit, null)) continue;
      findings.push({ file: rel, path: '(string literal)', ...f, snippet: context(body, f.hit) });
    }
  });
}

if (!findings.length) {
  console.log(
    `LT address-form audit (tu): OK – ${FILES.length} data file(s) + ${sources.length} source file(s)`
  );
  process.exit(0);
}

const byRule = {};
for (const f of findings) (byRule[f.rule] ??= []).push(f);

console.error(`LT address-form audit: ${findings.length} finding(s).\n`);
for (const [rule, list] of Object.entries(byRule)) {
  console.error(`  ${rule} (${list.length})`);
  for (const f of list) {
    console.error(`    ${f.hit}${f.detail ? ` [${f.detail}]` : ''}`);
    console.error(`      ${f.file} ${f.path}`);
    console.error(`      ${f.snippet}`);
  }
}
console.error(
  '\nRašyk `tu` forma. Sąmoningas išimtis – scripts/fixtures/lt-address-allowlist.json'
);
process.exit(1);
