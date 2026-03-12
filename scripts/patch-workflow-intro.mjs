#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';

const path = 'src/data/modules.json';
let content = readFileSync(path, 'utf8');
const old = '"intro": "Skirtumas paprastas: Pokalbis = laisvas atsakymas. Workflow = struktūruotas rezultatas."';
const neu = '"intro": "Pokalbis = laisvas atsakymas. Workflow = struktūruotas rezultatas."';
if (content.includes(old)) {
  content = content.replace(old, neu);
  writeFileSync(path, content);
  console.log('modules.json intro updated');
} else {
  console.log('Intro already updated or not found');
}
