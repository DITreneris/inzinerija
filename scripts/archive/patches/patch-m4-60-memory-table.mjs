#!/usr/bin/env node
/**
 * Patch M4 slide 60: replace "Kada naudoti Memory, o kada dokumentus?" table
 * with Sprendimo matrica (3 cols, badges, Kodėl?, warning row, solutionMatrixStyle).
 * Run: node scripts/patch-m4-60-memory-table.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slide = mod?.slides?.find((s) => s.id === 60);
if (!slide?.content?.sections) {
  console.error('M4 or slide 60 not found');
  process.exit(1);
}

const sections = slide.content.sections;
const idx = sections.findIndex(
  (s) => s.heading === 'Kada naudoti Memory, o kada dokumentus?'
);
if (idx === -1) {
  console.error('Table section not found');
  process.exit(1);
}

const newSection = {
  heading: 'Sprendimo matrica: Memory vs Dokumentai',
  body: 'Keturi tipiniai atvejai ir viena klaidos zona – kai reikia konteksto (Memory), skaičių (dokumentai) ar abu.',
  blockVariant: 'terms',
  table: {
    headers: ['Situacija', 'Sprendimas', 'Kodėl?'],
    rows: [
      ['Bendras verslo kontekstas', 'Memory', 'Kontekstas ilgalaikis, kartojamas'],
      ['Skaičių analizė', 'Išoriniai šaltiniai', 'Reikalingas tikslumas ir faktai'],
      ['Sprendimo pagrindimas', 'Išoriniai šaltiniai', 'Citavimas ir atsakomybė'],
      ['Greitas strateginis mąstymas', 'Memory + dokumentai', 'Kontekstas ir skaičiai kartu'],
      ['Teisinis tikslumas', 'Išoriniai šaltiniai', '⚠ Memory gali būti netikslus'],
    ],
    solutionMatrixStyle: true,
    rowMeta: [
      { strengthBadge: 'Memory', badgeVariant: 'blue' },
      { strengthBadge: 'Išoriniai šaltiniai', badgeVariant: 'yellow' },
      { strengthBadge: 'Išoriniai šaltiniai', badgeVariant: 'yellow' },
      { strengthBadge: 'Memory + dokumentai', badgeVariant: 'green' },
      { strengthBadge: 'Išoriniai šaltiniai', badgeVariant: 'yellow', isWarning: true },
    ],
  },
};

sections[idx] = newSection;
writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Patched M4 slide 60 table section.');
