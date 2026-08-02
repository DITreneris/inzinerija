/** Optional mid-A warm-up for M18 streak (budget 28). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const modulesPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/data/modules.json'
);
const data = JSON.parse(fs.readFileSync(modulesPath, 'utf8'));
const m18 = data.modules.find((m) => m.id === 18);
const i = m18.slides.findIndex((s) => s.id === 18.8);
if (m18.slides[i + 1]?.id === 18.55) {
  console.log('18.55 already present');
  process.exit(0);
}
m18.slides.splice(i + 1, 0, {
  id: 18.55,
  title: 'Savitikra: planas prieš kodą',
  shortTitle: 'Savitikra',
  subtitle: '2 klausimai prieš Cursor generate',
  type: 'warm-up-quiz',
  content: {
    questions: [
      {
        id: 'm18-wu-plan',
        question: 'Kas turi eiti prieš pirmą didesnę Cursor generate sesiją?',
        options: [
          'Trumpas planas / patvirtinimas, tada kodas',
          'Iš karto visas app be brief',
          'Tik deploy URL',
          'MCP ir Spec Kit kaip privaloma',
        ],
        correct: 0,
        explanation:
          'Planas prieš kodą – disciplina. Žr. skaidrę „Planas → patvirtinimas → kodas“.',
      },
      {
        id: 'm18-wu-rules',
        question: 'Kam skirtas PROJECT_RULES.md vibe-coding sesijoje?',
        options: [
          'Trumpos ribos agentui: Won’t, Done, ko negeneruoti',
          'Pilnas SysEng vadovas',
          'Tik spalvų paletė',
          'Heroku-only deploy instrukcija',
        ],
        correct: 0,
        explanation:
          'PROJECT_RULES – trumpos ribos Cursor. Žr. skaidrę PROJECT_RULES.md.',
      },
    ],
  },
});

for (let j = 0; j < m18.slides.length; j++) {
  const s = m18.slides[j];
  const next = m18.slides[j + 1];
  if (!s.content) s.content = {};
  if (!next || s.type === 'summary') {
    s.content.footer =
      'Kelias „Kodo inžinerija“ – brief → testas → įrodytas MVP.';
    continue;
  }
  s.content.footer = `Toliau – skaidrė ${j + 2}: ${next.shortTitle || next.title}`;
}

console.log('M18', m18.slides.length);
fs.writeFileSync(modulesPath, JSON.stringify(data, null, 2) + '\n');
