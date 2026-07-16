#!/usr/bin/env node
/**
 * M7 path-step 71.1–71.5: add journey task section (base = pardavimai).
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ltTasks = JSON.parse(
  readFileSync(join(root, 'scripts/journey-lt-pathstep.json'), 'utf8')
);
const enTasks = JSON.parse(
  readFileSync(join(root, 'scripts/journey-en-pathstep.json'), 'utf8')
);

const STEP_META = {
  71.1: {
    ltBody: 'Nukopijuok užduotį pagal savo kelią – tai pirmas praktinis žingsnis.',
    enBody: 'Copy the task for your path – this is the first practical step.',
  },
  71.2: {
    ltBody: 'Nukopijuok sisteminį promptą ir tyrimo temą pagal savo kelią.',
    enBody: 'Copy the system prompt and research topic for your path.',
  },
  71.3: {
    ltBody: 'Nukopijuok 2–4 šaltinių užduotį pagal savo kelią.',
    enBody: 'Copy the 2–4 sources task for your path.',
  },
  71.4: {
    ltBody: 'Nukopijuok sintezės užduotį pagal savo kelią.',
    enBody: 'Copy the synthesis task for your path.',
  },
  71.5: {
    ltBody: 'Nukopijuok duomenų masyvo užduotį pagal savo kelią.',
    enBody: 'Copy the data-table task for your path.',
  },
};

function patchFile(path, isEn) {
  const data = JSON.parse(readFileSync(path, 'utf8'));
  const m7 = data.modules.find((m) => m.id === 7);
  if (!m7) throw new Error(`Module 7 not found in ${path}`);
  const tasks = isEn ? enTasks : ltTasks;
  for (const id of [71.1, 71.2, 71.3, 71.4, 71.5]) {
    const slide = m7.slides.find((s) => s.id === id);
    if (!slide) throw new Error(`Slide ${id} not found in ${path}`);
    const meta = STEP_META[id];
    const copyable = tasks[String(id)]['step-task'].pardavimai;
    slide.content.sections = [
      {
        heading: isEn ? 'Task for your path' : 'Užduotis pagal tavo kelią',
        body: isEn ? meta.enBody : meta.ltBody,
        copyable,
      },
    ];
  }
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Patched path-step tasks in ${path}`);
}

patchFile(join(root, 'src/data/modules.json'), false);
patchFile(join(root, 'src/data/modules-en-m7-m9.json'), true);
