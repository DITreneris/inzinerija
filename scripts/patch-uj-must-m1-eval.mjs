/**
 * UJ-MUST-S4: M1 evaluator-prompt-block 12.5 (produce → score → improve).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const LT_SLIDE = {
  id: 12.5,
  title: 'Patikra: įvertink promptą',
  subtitle: 'Pagamink → įvertink kriterijais → pataisyk vieną vietą',
  type: 'evaluator-prompt-block',
  content: {
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
        heading: 'Vertintojo promptas',
        copyable:
          'META: Tu esi promptų kokybės vertintojas. Tikslas – rasti spragas, ne perrašyti viską.\nINPUT: Štai mano promptas:\n"""\n[Įklijuok savo promptą]\n"""\nOUTPUT: Duok: (1) balą 1–5 pagal Meta/Input/Output aiškumą, (2) 3 konkrečias spragas, (3) vieną perrašytą silpną sakinį. Be įžangos.',
      },
    ],
    practicalTask: {
      template: [
        'Paleisk vertintoją su vienu savo darbo promptu',
        'Išsaugok 1 patobulinimą (sakinį ar bloką)',
        'Paleisk patobulintą promptą dar kartą',
      ],
    },
    footer: 'Toliau – skaidrė: Prieš ir Po',
  },
};

const EN_SLIDE = {
  id: 12.5,
  title: 'Check: score the prompt',
  subtitle: 'Produce → score with criteria → improve one spot',
  type: 'evaluator-prompt-block',
  content: {
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
        heading: 'Evaluator prompt',
        copyable:
          'META: You are a prompt quality reviewer. Find gaps; do not rewrite everything.\nINPUT: Here is my prompt:\n"""\n[Paste your prompt]\n"""\nOUTPUT: Give: (1) a 1–5 score for Meta/Input/Output clarity, (2) 3 concrete gaps, (3) one rewritten weak sentence. No preamble.',
      },
    ],
    practicalTask: {
      template: [
        'Run the evaluator on one work prompt',
        'Save 1 improvement (sentence or block)',
        'Re-run the improved prompt',
      ],
    },
    footer: 'Next – slide: Before and After',
  },
};

function insertSlide(fileRel, slide, moduleId = 1) {
  const full = path.join(root, fileRel);
  const data = JSON.parse(fs.readFileSync(full, 'utf8'));
  const mod = (data.modules ?? []).find((m) => m.id === moduleId);
  if (!mod) {
    console.warn('no module', moduleId, fileRel);
    return;
  }
  if (mod.slides.some((s) => s.id === 12.5)) {
    console.log('already has 12.5', fileRel);
    return;
  }
  const idx = mod.slides.findIndex((s) => s.id === 12);
  if (idx === -1) {
    console.warn('no slide 12', fileRel);
    return;
  }
  mod.slides.splice(idx + 1, 0, slide);
  fs.writeFileSync(full, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log('inserted 12.5 into', fileRel);
}

insertSlide('src/data/modules.json', LT_SLIDE);
insertSlide('src/data/modules-en.json', EN_SLIDE);
