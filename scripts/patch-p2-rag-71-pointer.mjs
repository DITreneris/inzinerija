#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ltPath = join(root, 'src', 'data', 'modules.json');
const enPath = join(root, 'src', 'data', 'modules-en-m7-m9.json');
const lt = JSON.parse(readFileSync(ltPath, 'utf8'));
const en = JSON.parse(readFileSync(enPath, 'utf8'));

const s71 = lt.modules.find((m) => m.id === 7).slides.find((x) => x.id === 71);
const sec = s71.content.sections.find((x) => x.heading === 'O Modulyje 4?');
sec.body =
  'Šaltinius ir tikrinimą jau matei Modulio 4 kontekste (įskaitant optional „DI įrankiai informacijos paieškai“ – RAG / tyrimų paieška). Čia fokusas – analizės užklausos ir išvados. Tą pačią įrankių atmintinę rasi ir šiame kelyje kaip optional po įrankių sekos žingsnio.';

const e71 = en.modules.find((m) => m.id === 7).slides.find((x) => x.id === 71);
const esec = (e71.content.sections || []).find((x) =>
  /Module 4|Modulyje 4/i.test(x.heading || '')
);
if (esec) {
  esec.heading = 'What about Module 4?';
  esec.body =
    'You already covered sources and checking in Module 4 (including the optional “AI tools for information search” handout – RAG / research search). Here the focus is analysis queries and conclusions. The same tools handout also appears on this path as optional after the tools-sequence step.';
}

writeFileSync(ltPath, JSON.stringify(lt, null, 2) + '\n', 'utf8');
writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
console.log('71 RAG pointer patched LT+EN');
