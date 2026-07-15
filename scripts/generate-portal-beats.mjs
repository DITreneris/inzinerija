#!/usr/bin/env node
/**
 * Generate M4 sk. 53.5 editorial beat PNGs via Satori + resvg.
 * Manifest: data/satori/portal-beats.yaml
 *
 * Usage:
 *   node scripts/generate-portal-beats.mjs
 *   node scripts/generate-portal-beats.mjs --id awareness-gap
 *   node scripts/generate-portal-beats.mjs --dry-run
 *   node scripts/generate-portal-beats.mjs --check
 *
 * On Windows prefer `node scripts/...` over `npm run generate:portal-beats -- --id`
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { renderPng } from './satori/lib/render.mjs';
import { getTemplate } from './satori/templates/index.mjs';
import { sizes } from './satori/brand.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = join(ROOT, 'data', 'satori', 'portal-beats.yaml');
const PUBLIC_DIR = join(ROOT, 'public');
const MAX_BYTES_WARN = 150 * 1024;

function parseArgs(argv) {
  const out = { id: null, dryRun: false, check: false };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === '--dry-run') out.dryRun = true;
    else if (argv[i] === '--check') out.check = true;
    else if (argv[i] === '--id') out.id = argv[++i];
  }
  return out;
}

function loadManifest() {
  return yaml.load(readFileSync(MANIFEST, 'utf8'));
}

function propsFromRow(row) {
  const props = { ...row };
  delete props.id;
  delete props.template;
  delete props.output;
  return props;
}

async function writePng(buffer, dest, dryRun) {
  const rel = dest.replace(ROOT + '\\', '').replace(ROOT + '/', '');
  if (dryRun) {
    console.log(`  [dry-run] would write ${rel} (${buffer.length} bytes)`);
    return;
  }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buffer);
  const warn = buffer.length > MAX_BYTES_WARN ? ' ⚠ over 150KB' : '';
  console.log(`  OK: ${rel} (${buffer.length} bytes)${warn}`);
}

function runCheck(rows) {
  const missing = rows
    .filter((r) => !existsSync(join(PUBLIC_DIR, r.output)))
    .map((r) => r.output);
  if (missing.length === 0) {
    console.log('Portal beat asset check OK — all PNG in public/.');
    return 0;
  }
  console.error('Missing portal beat PNG:');
  for (const f of missing) console.error(`  - public/${f}`);
  console.error('Run: node scripts/generate-portal-beats.mjs');
  return 1;
}

async function main() {
  const args = parseArgs(process.argv);
  const manifest = loadManifest();
  let rows = manifest.beats || [];

  if (args.id) {
    rows = rows.filter((r) => r.id === args.id);
    if (rows.length === 0) {
      throw new Error(`No beat with id: ${args.id}`);
    }
  }

  if (args.check) {
    process.exit(runCheck(manifest.beats || []));
  }

  console.log(`Satori portal beats (${rows.length}) → public/ …`);

  for (const row of rows) {
    const templateName = row.template || 'editorial-beat';
    const build = getTemplate(templateName);
    const props = propsFromRow(row);
    const label = row.id || row.output;
    console.log(` ${label} [${templateName}/${props.variant}]`);
    const element = build(props);
    const png = await renderPng(element, {
      width: sizes.beatWidth,
      height: sizes.beatHeight,
    });
    const dest = join(PUBLIC_DIR, row.output);
    await writePng(png, dest, args.dryRun);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error('Portal beat generation failed:', err.message || err);
  process.exit(1);
});
