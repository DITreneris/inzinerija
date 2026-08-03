import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const ltContent = {
  veiksmoIntro: {
    trumpai:
      'Geras promptas turi aiškią rolę, įvestį ir formatą. Vertintojas padeda rasti spragas.',
    daryk: [
      'Nukopijuok vertintojo promptą',
      'Įklijuok savo darbo promptą kaip INPUT',
      'Pataisyk 1 silpną vietą pagal atsakymą',
    ],
    patikra: [
      'Ar Meta sako kas esi ir ko nori?',
      'Ar Input turi konkrečius duomenis?',
      'Ar Output nurodo formatą?',
    ],
  },
  sections: [
    {
      heading: 'Trumpai',
      body: 'Pagamink promptą → įvertink kriterijais → pataisyk vieną vietą.',
      blockVariant: 'brand',
    },
    {
      heading: 'Vertintojo promptas',
      body: 'Nukopijuok ir paleisk su savo darbo promptu.',
      blockVariant: 'accent',
      copyable:
        'META: Tu esi promptų kokybės vertintojas. Tikslas – rasti spragas, ne perrašyti viską.\nINPUT: Štai mano promptas:\n"""\n[Įklijuok savo promptą]\n"""\nOUTPUT: Duok: (1) balą 1–5 pagal Meta/Input/Output aiškumą, (2) 3 konkrečias spragas, (3) vieną perrašytą silpną sakinį. Be įžangos.',
    },
    {
      heading: 'Patikra',
      body: 'Išsaugok 1 patobulinimą ir paleisk patobulintą promptą dar kartą.',
      blockVariant: 'emerald',
    },
  ],
  practicalTask: {
    title: 'Žingsniai: įvertink savo promptą',
    placeholder: '',
    templateLabel: 'Žingsniai',
    template:
      '1. Nukopijuok vertintojo promptą.\n2. Įklijuok savo darbo promptą.\n3. Pataisyk 1 silpną vietą.\n4. Paleisk patobulintą versiją.',
  },
  footer: 'Toliau – skaidrė: Prieš ir Po',
};

const enContent = {
  veiksmoIntro: {
    trumpai:
      'A strong prompt has a clear role, input, and format. The evaluator finds gaps.',
    daryk: [
      'Copy the evaluator prompt',
      'Paste your work prompt as INPUT',
      'Fix 1 weak spot from the feedback',
    ],
    patikra: [
      'Does Meta say who you are and what you want?',
      'Does Input include concrete data?',
      'Does Output specify the format?',
    ],
  },
  sections: [
    {
      heading: 'In brief',
      body: 'Produce a prompt → score with criteria → improve one spot.',
      blockVariant: 'brand',
    },
    {
      heading: 'Evaluator prompt',
      body: 'Copy and run it with your work prompt.',
      blockVariant: 'accent',
      copyable:
        'META: You are a prompt quality reviewer. Find gaps; do not rewrite everything.\nINPUT: Here is my prompt:\n"""\n[Paste your prompt]\n"""\nOUTPUT: Give: (1) a 1–5 score for Meta/Input/Output clarity, (2) 3 concrete gaps, (3) one rewritten weak sentence. No preamble.',
    },
    {
      heading: 'Check',
      body: 'Save 1 improvement and re-run the improved prompt.',
      blockVariant: 'emerald',
    },
  ],
  practicalTask: {
    title: 'Steps: score your prompt',
    placeholder: '',
    templateLabel: 'Steps',
    template:
      '1. Copy the evaluator prompt.\n2. Paste your work prompt.\n3. Fix 1 weak spot.\n4. Re-run the improved version.',
  },
  footer: 'Next – slide: Before and After',
};

const files = [
  'src/data/modules.json',
  'src/data/modules-en.json',
  'src/data/modules-m1-m6.json',
  'src/data/modules-m1-m9.json',
  'src/data/modules-m1-m12.json',
  'src/data/modules-m1-m15.json',
];

for (const rel of files) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) continue;
  const data = JSON.parse(fs.readFileSync(full, 'utf8'));
  const mod = (data.modules || []).find((m) => m.id === 1);
  if (!mod) continue;
  const slide = mod.slides.find((s) => s.id === 12.5);
  if (!slide) {
    console.log('no 12.5', rel);
    continue;
  }
  slide.content = rel.includes('modules-en') ? enContent : ltContent;
  fs.writeFileSync(full, `${JSON.stringify(data, null, 2)}\n`);
  console.log('fixed', rel);
}
