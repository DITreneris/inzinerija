#!/usr/bin/env node
/**
 * M1P prompt maturity (fit-for-purpose + freeze):
 * - M1: 3-block micro-win labels (not "6-block try")
 * - M2.51: Micro chips as add-ons; drop max_tokens
 * - M2.52: split packed 3-prompt blobs → 6 Stage copyables
 * - M3.31–36: ADVANCED tone/format; CoT → step-by-step; 31 grammar + LT OUTPUT
 * Updates: modules.json, modules-en.json, modules-en-us-overrides.json
 * Contract: docs/development/M1_M3_PROMPT_MATURITY.md
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function findModule(data, id) {
  return (data.modules || data)?.find?.((m) => m.id === id) || null;
}

function findSlide(mod, id) {
  return (mod?.slides || []).find((s) => s.id === id) || null;
}

function walkReplace(obj, fn) {
  if (obj == null) return;
  if (typeof obj === 'string') return;
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === 'string') obj[i] = fn(obj[i]);
      else walkReplace(obj[i], fn);
    }
    return;
  }
  if (typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      if (typeof obj[k] === 'string') obj[k] = fn(obj[k]);
      else walkReplace(obj[k], fn);
    }
  }
}

// --- M1 ---
function patchM1(mod, locale) {
  const intro = findSlide(mod, 1);
  if (intro?.content) {
    if (locale === 'lt') {
      intro.content.firstActionCTA =
        'Nukopijuok žalią struktūruotą promptą ir pakeisk tik temą, auditoriją ir biudžetą pagal savo situaciją. Tai pirmas struktūruotas bandymas (META·INPUT·OUTPUT) – vėliau pridėsi dar 3 blokus.';
      if (intro.content.footer?.includes('6 blokų')) {
        intro.content.footer = intro.content.footer.replace(
          'Pirmas 6 blokų bandymas',
          'Pirmas struktūruotas bandymas'
        );
      }
    } else {
      intro.content.firstActionCTA =
        'Copy the green structured prompt and change only the topic, audience and budget for your situation. This is your first structured try (META·INPUT·OUTPUT) – later you will add 3 more blocks.';
      if (intro.content.footer) {
        intro.content.footer = intro.content.footer.replace(
          'First 6-block try',
          'First structured try'
        );
      }
    }
  }

  // Footer on previous slide (0.5 infographic) may point to 1.1
  const s05 = findSlide(mod, 0.5);
  if (s05?.content?.footer) {
    if (locale === 'lt') {
      s05.content.footer = s05.content.footer.replace(
        'Pirmas 6 blokų bandymas',
        'Pirmas struktūruotas bandymas'
      );
    } else {
      s05.content.footer = s05.content.footer.replace(
        'First 6-block try',
        'First structured try'
      );
    }
  }

  const s11 = findSlide(mod, 1.1);
  if (!s11) return;
  if (locale === 'lt') {
    s11.title = 'Pirmas struktūruotas bandymas';
    s11.subtitle = 'Micro-win: nukopijuok META·INPUT·OUTPUT promptą ir pakeisk 3 laukus';
    if (s11.content) {
      s11.content.title = 'Pirmas bandymas – struktūruotas promptas';
      s11.content.pathLabel = '3 blokų kelias';
      const secs = s11.content.sections || [];
      const check = secs.find((s) => /Patikra|Check/i.test(s.heading || ''));
      if (check) {
        check.body =
          'Ar pakeitei visus 3 laukus? Jei taip – jau turi pirmą struktūruotą (META·INPUT·OUTPUT) bandymą, kurį vėliau plėsi iki 6 blokų.';
      }
    }
  } else {
    s11.title = 'First structured try';
    s11.subtitle = 'Micro-win: copy the META·INPUT·OUTPUT prompt and change 3 fields';
    if (s11.content) {
      s11.content.title = 'First try – structured prompt';
      s11.content.pathLabel = '3-block path';
      const secs = s11.content.sections || [];
      const check = secs.find((s) => /Check|Patikra/i.test(s.heading || ''));
      if (check) {
        check.body =
          'Did you change all 3 fields? If yes, you already have your first structured (META·INPUT·OUTPUT) try and can expand it to 6 blocks later.';
      }
    }
  }
}

// --- M2.51 ---
function patchM251(mod, locale) {
  const s = findSlide(mod, 51);
  if (!s?.content?.sections) return;
  const secs = s.content.sections;

  if (locale === 'lt') {
    const daryk = secs.find((x) => /^Daryk/i.test(x.heading || ''));
    if (daryk) {
      daryk.body =
        'Chip’ai žemiau – priedai prie tavo užduoties ar teksto. Pasirink vieną, nukopijuok, pridėk prie savo prompto ir paleisk DI. Jei nori detaliau – išskleisk „Kas padarys tavo promptus išskirtinius“.';
    }
    for (const sec of secs) {
      const h = sec.heading || '';
      if (/Profesionalus/i.test(h)) {
        sec.body =
          'Pridėk prie savo užduoties: nukopijuok žemiau ir įklijuok į promptą – tikslinė auditorija ir stilius bus aiškiai nurodyti.';
        sec.copyable =
          'Stilius: profesionalus, aiškus, be perteklinių tekstų. Tikslinė auditorija: [Įrašyk auditoriją].';
      } else if (/Formalus/i.test(h)) {
        sec.body =
          'Pridėk prie savo užduoties: nukopijuok, įklijuok tekstą į [įklijuok tekstą] ir paleisk DI – gausi formalų 5–7 sakinių apibendrinimą.';
        sec.copyable =
          'Formalus tonas, lietuvių kalba. Tekstas: [įklijuok tekstą]. Pateik 5–7 sakinių apibendrinimą.';
      } else if (/Kompaktiškas/i.test(h)) {
        sec.body =
          'Pridėk prie savo užduoties: nukopijuok žemiau – DI laikysis apie 500 žodžių (iki ~1 psl.).';
        sec.copyable = 'Kompaktiškas stilius; laikykis apie 500 žodžių (iki ~1 psl.).';
      } else if (/Formatavimas/i.test(h)) {
        sec.body =
          'Pridėk prie esamo teksto: nukopijuok žemiau ir pritaikyk formatui (pvz. Markdown ar įmonės stilius).';
        sec.copyable = 'Pataisyk formatavimą pagal [Markdown / įmonės stilių].';
      }
    }
  } else {
    const examples = secs.find((x) => /Examples|copy and adapt/i.test(x.heading || ''));
    if (examples) {
      examples.body =
        'The chips below are add-ons to your task or text. Pick one, copy it, append it to your prompt, and run AI.';
    }
    for (const sec of secs) {
      const h = sec.heading || '';
      if (/Professional/i.test(h)) {
        sec.body =
          'Add to your task: copy below and paste into your prompt – audience and style will be clear.';
        sec.copyable =
          'Style: professional, clear, no fluff. Target audience: [Enter audience].';
      } else if (/Formal/i.test(h)) {
        sec.body =
          'Add to your task: copy, paste text into [paste text], and run AI – you get a formal 5–7 sentence summary.';
        sec.copyable =
          'Formal tone. Text: [paste text]. Provide a 5–7 sentence summary.';
      } else if (/Compact/i.test(h)) {
        sec.body =
          'Add to your task: copy below – AI will keep to about 500 words (about 1 page).';
        sec.copyable = 'Compact style; keep to about 500 words (about 1 page).';
      } else if (/Formatting/i.test(h)) {
        sec.body =
          'Add to existing text: copy below and adapt to your format (e.g. Markdown or company style).';
        sec.copyable = 'Fix formatting to match [Markdown / company style].';
      }
    }
  }
}

// --- M2.52 ---
const LT_52_PROMPTS = [
  {
    heading: 'Oficialus kvietimas',
    body: 'Nukopijuok, pakeisk [įrašyk…] laukus ir paleisk DI.',
    copyable:
      'META: Tu esi verslo komunikacijos specialistas. Tikslas – parengti kvietimą.\nINPUT: Renginys – [tavo verslo renginys]. Data – [kitas mėnuo]. Auditorija – partneriai ir klientai.\nOUTPUT: Oficialus kvietimo tekstas, 1 puslapis, formalus tonas.',
  },
  {
    heading: 'Formali sutartis',
    body: 'Nukopijuok, pakeisk produkto lauką ir paleisk DI – gausi sutarties projekto skeletą (ne teisinė konsultacija).',
    copyable:
      'META: Tu esi verslo dokumentų asistentas. Tikslas – parengti sutarties projekto juodraštį.\nINPUT: Produktas – [įrašyk produktą]. Šalys – pardavėjas ir klientas. Apribojimai – 1–2 puslapiai.\nOUTPUT: Formali sutartis su punktais: šalys, objektas, kaina, terminai. Teisinis tonas. Pastaba: tai juodraštis, ne teisinė konsultacija.',
  },
  {
    heading: 'Darbuotojo skelbimas',
    body: 'Nukopijuok, pakeisk poziciją ir įmonę, paleisk DI.',
    copyable:
      'META: Tu esi personalo specialistas. Tikslas – pritraukti kandidatus.\nINPUT: Pozicija – [įrašyk poziciją]. Įmonė – [įrašyk įmonę]. Privalumai – lankstus grafikas, komanda.\nOUTPUT: Darbo skelbimas, 150–200 žodžių, entuziastingas ir įtraukiantis tonas.',
  },
  {
    heading: 'Atsiprašomas atsakymas',
    body: 'Nukopijuok ir paleisk DI – gausi mandagų atsakymą dėl vėlavimo.',
    copyable:
      'META: Tu esi klientų aptarnavimo specialistas. Tikslas – išlaikyti klientą.\nINPUT: Situacija – klientas skundžiasi dėl pavėluoto pristatymo. Tonas – mandagus, atsiprašantis.\nOUTPUT: El. laiško atsakymas, 80–120 žodžių, su konkrečiu sprendimu ir atsiprašymu.',
  },
  {
    heading: 'Informacinis atsakymas',
    body: 'Nukopijuok, įrašyk paslaugas ir paleisk DI.',
    copyable:
      'META: Tu esi pardavimų vadybininkas. Tikslas – pateikti informaciją ir paskatinti pirkti.\nINPUT: Klientas klausia apie paslaugų kainas ir nuolaidas. Paslaugos – [įrašyk paslaugas].\nOUTPUT: Profesionalus atsakymas, 100–150 žodžių, su kainų struktūra ir kvietimu susisiekti.',
  },
  {
    heading: 'Grąžinimo politika',
    body: 'Nukopijuok, įrašyk parduotuvę ir paleisk DI.',
    copyable:
      'META: Tu esi e-komercijos klientų aptarnavimo specialistas. Tikslas – aiškiai paaiškinti politiką.\nINPUT: Klientas domisi grąžinimo politika. Parduotuvė – [įrašyk parduotuvę]. Terminas – 14 dienų.\nOUTPUT: Pagarbus atsakymas, 80–120 žodžių, su grąžinimo žingsniais ir sąlygomis.',
  },
];

const EN_52_PROMPTS = [
  {
    heading: 'Official invitation',
    body: 'Copy, replace [enter…] fields, and run AI.',
    copyable:
      'META: You are a business communications specialist. Goal – prepare an invitation.\nINPUT: Event – [your business event]. Date – [next month]. Audience – partners and clients.\nOUTPUT: Official invitation text, 1 page, formal tone.',
  },
  {
    heading: 'Formal agreement',
    body: 'Copy, replace the product field, and run AI – you get a draft skeleton (not legal advice).',
    copyable:
      'META: You are a business documents assistant. Goal – draft an agreement outline.\nINPUT: Product – [enter product]. Parties – seller and client. Constraints – 1–2 pages.\nOUTPUT: Formal agreement with sections: parties, subject, price, terms. Legal tone. Note: this is a draft, not legal advice.',
  },
  {
    heading: 'Job posting',
    body: 'Copy, replace position and company, and run AI.',
    copyable:
      'META: You are an HR specialist. Goal – attract candidates.\nINPUT: Position – [enter position]. Company – [enter company]. Benefits – flexible schedule, team.\nOUTPUT: Job posting, 150–200 words, enthusiastic and engaging tone.',
  },
  {
    heading: 'Apology reply',
    body: 'Copy and run AI – polite reply about late delivery.',
    copyable:
      'META: You are a customer service specialist. Goal – retain the customer.\nINPUT: Situation – customer complains about late delivery. Tone – polite, apologetic.\nOUTPUT: Email reply, 80–120 words, with a concrete solution and apology.',
  },
  {
    heading: 'Informative reply',
    body: 'Copy, enter services, and run AI.',
    copyable:
      'META: You are a sales manager. Goal – provide information and encourage purchase.\nINPUT: Customer asks about service prices and discounts. Services – [enter services].\nOUTPUT: Professional reply, 100–150 words, with pricing structure and call to action.',
  },
  {
    heading: 'Returns policy',
    body: 'Copy, enter the store name, and run AI.',
    copyable:
      'META: You are an e-commerce customer service specialist. Goal – clearly explain the policy.\nINPUT: Customer asks about returns policy. Store – [enter store]. Deadline – 14 days.\nOUTPUT: Respectful reply, 80–120 words, with return steps and conditions.',
  },
];

function patchM252(mod, locale) {
  const s = findSlide(mod, 52);
  if (!s?.content) return;
  const prompts = locale === 'lt' ? LT_52_PROMPTS : EN_52_PROMPTS;
  const promptSecs = prompts.map((p) => ({
    heading: p.heading,
    body: p.body,
    copyable: p.copyable,
    collapsible: true,
    collapsedByDefault: true,
  }));

  if (locale === 'lt') {
    s.content.sections = [
      {
        heading: 'Trumpai',
        body: 'Du praktiniai paketai: stilių tekstai ir atsakymai į klientų laiškus. Pasirink vieną promptą žemiau, nukopijuok ir paleisk DI.',
        blockVariant: 'accent',
      },
      {
        heading: 'Daryk dabar',
        body: 'Išskleisk vieną bloką žemiau, nukopijuok promptą, pakeisk [įrašyk…] laukus ir paleisk DI. Vienas Copy = vienas paleidimas.',
        blockVariant: 'brand',
      },
      ...promptSecs,
      {
        heading: 'Patikra',
        body: 'Ar paleidai bent vieną promptą ir pakeitei [įrašyk…] į savo kontekstą? Jei ne – grįžk prie Daryk dabar.',
        blockVariant: 'accent',
      },
    ];
  } else {
    s.content.sections = [
      {
        heading: 'In short',
        body: 'Two practice packs: style texts and customer email replies. Pick one prompt below, copy, and run AI.',
        blockVariant: 'accent',
      },
      {
        heading: 'Do it now',
        body: 'Expand one block below, copy the prompt, replace [enter…] fields, and run AI. One Copy = one run.',
        blockVariant: 'brand',
      },
      ...promptSecs,
      {
        heading: 'Check',
        body: 'Did you run at least one prompt and replace [enter…] with your context? If not – go back to Do it now.',
        blockVariant: 'accent',
      },
    ];
  }
}

// --- M3 templates ---
const ADVANCED_BY_SLIDE = {
  lt: {
    31: {
      hint: 'Tonas: faktinis. Formatas: verslo dokumentas.',
      partial: 'ADVANCED:\nTonas: faktinis. Formatas: verslo dokumentas',
      inTemplate: 'ADVANCED:\nTonas: faktinis. Formatas: verslo dokumentas',
    },
    32: {
      hint: 'Tonas: faktinis, analitinis. Formatas: struktūruota pardavimų analizė.',
      partial: 'ADVANCED:\nTonas: faktinis, analitinis.\nFormatas: struktūruota pardavimų analizė',
      inTemplate: 'ADVANCED:\nTonas: faktinis, analitinis.\nFormatas: struktūruota pardavimų analizė',
    },
    33: {
      hint: 'Tonas: strateginis su kūrybiškumu. Formatas: struktūruotas marketingo dokumentas.',
      partial:
        'ADVANCED:\nTonas: strateginis su kūrybiškumu.\nFormatas: struktūruotas marketingo dokumentas',
      inTemplate:
        'ADVANCED:\nTonas: strateginis su kūrybiškumu.\nFormatas: struktūruotas marketingo dokumentas',
    },
    34: {
      hint: 'Tonas: empatingas, profesionalus. Formatas: vidinis pranešimas.',
      partial: 'ADVANCED:\nTonas: empatingas, profesionalus. Formatas: vidinis pranešimas',
      inTemplate: 'ADVANCED: Tonas: empatingas, profesionalus. Formatas: vidinis pranešimas',
    },
    35: {
      hint: 'Tonas: jautrus, profesionalus. Formatas: HR ataskaita.',
      partial: 'ADVANCED:\nTonas: jautrus, profesionalus. Formatas: HR ataskaita',
      inTemplate: 'ADVANCED: Tonas: jautrus, profesionalus. Formatas: HR ataskaita',
    },
    36: {
      hint: 'Tonas: empatiškas, kontroliuojamas. Formatas: klientų aptarnavimo dokumentas.',
      partial: 'ADVANCED:\nTonas: empatiškas, kontroliuojamas. Formatas: klientų aptarnavimo dokumentas',
      inTemplate: 'ADVANCED: Tonas: empatiškas, kontroliuojamas. Formatas: klientų aptarnavimas',
    },
  },
  en: {
    31: {
      hint: 'Tone: factual. Format: business document.',
      partial: 'ADVANCED:\nTone: factual. Format: business document',
      inTemplate: 'ADVANCED:\nTone: factual. Format: business document',
    },
    32: {
      hint: 'Tone: factual, analytical. Format: structured sales analysis.',
      partial: 'ADVANCED:\nTone: factual, analytical.\nFormat: structured sales analysis',
      inTemplate: 'ADVANCED:\nTone: factual, analytical.\nFormat: structured sales analysis',
    },
    33: {
      hint: 'Tone: strategic with creativity. Format: structured marketing document.',
      partial: 'ADVANCED:\nTone: strategic with creativity.\nFormat: structured marketing document',
      inTemplate: 'ADVANCED:\nTone: strategic with creativity.\nFormat: structured marketing document',
    },
    34: {
      hint: 'Tone: empathetic, professional. Format: internal announcement.',
      partial: 'ADVANCED:\nTone: empathetic, professional. Format: internal announcement',
      inTemplate: 'ADVANCED: Tone: empathetic, professional. Format: internal announcement',
    },
    35: {
      hint: 'Tone: sensitive, professional. Format: HR report.',
      partial: 'ADVANCED:\nTone: sensitive, professional. Format: HR report',
      inTemplate: 'ADVANCED: Tone: sensitive, professional. Format: HR report',
    },
    36: {
      hint: 'Tone: empathetic, controlled. Format: customer service document.',
      partial: 'ADVANCED:\nTone: empathetic, controlled. Format: customer service document',
      inTemplate: 'ADVANCED: Tone: empathetic, controlled. Format: customer service',
    },
  },
};

function polishM3String(str, locale, slideId) {
  if (typeof str !== 'string') return str;
  let s = str;
  if (locale === 'lt') {
    s = s.replace(/REASONING \(CoT\):/g, 'REASONING (žingsnis po žingsnio):');
    s = s.replace(/Naudok CoT\./g, 'Eik žingsnis po žingsnio.');
    s = s.replace(/\bCoT:\s*/g, 'Žingsniai: ');
    if (slideId === 31) {
      s = s.replace(
        /valdybai, kurie priims/g,
        'valdybai – ji priims'
      );
      s = s.replace(
        /Formatas: Executive Summary \(1–2 puslapiai\)/g,
        'Formatas: Vadovybės santrauka (Executive Summary, 1–2 puslapiai)'
      );
    }
  } else {
    s = s.replace(/REASONING \(CoT\):/g, 'REASONING (step by step):');
    s = s.replace(/Use CoT\./gi, 'Go step by step.');
    s = s.replace(/\bCoT:\s*/g, 'Steps: ');
  }

  // Strip Temperature ADVANCED lines (generic) – slide-specific set later
  s = s.replace(
    /ADVANCED:\s*\n?Temperature:[^\n]*(?:\nFormat:[^\n]*)?/g,
    'ADVANCED:\n__ADV_PLACEHOLDER__'
  );
  s = s.replace(
    /ADVANCED:\s*Temperature:[^\n]*/g,
    'ADVANCED: __ADV_PLACEHOLDER__'
  );

  // Trim 32/33 reasoning to 3 steps in templates (drop 4th if present after polish)
  if (slideId === 32 || slideId === 33) {
    s = s.replace(
      /(REASONING \(žingsnis po žingsnio\):|REASONING \(step by step\):)\n1\)[^\n]+\n2\)[^\n]+\n3\)[^\n]+\n4\)[^\n]+/g,
      (m, head) => {
        const lines = m.split('\n');
        return [head, lines[1], lines[2], lines[3]].join('\n');
      }
    );
  }

  return s;
}

function patchM3Slide(slide, locale) {
  if (!slide?.practicalTask) return;
  const id = slide.id;
  const adv = ADVANCED_BY_SLIDE[locale]?.[id];
  if (!adv) return;

  const pt = slide.practicalTask;
  const apply = (str) => {
    let s = polishM3String(str, locale, id);
    if (s.includes('__ADV_PLACEHOLDER__')) {
      s = s.replace(/ADVANCED:\s*\n?__ADV_PLACEHOLDER__/g, adv.inTemplate);
      s = s.replace(/ADVANCED: __ADV_PLACEHOLDER__/g, adv.inTemplate);
    }
    // Also direct replace leftover Temperature patterns
    s = s.replace(/Temperature:\s*0\.[0-9]+[^\n]*/g, '');
    return s;
  };

  if (pt.template) pt.template = apply(pt.template);
  if (pt.placeholder) {
    pt.placeholder = pt.placeholder.replace(
      /ADVANCED: Parametrai\.\.\./g,
      locale === 'lt' ? 'ADVANCED: Tonas / formatas...' : 'ADVANCED: Tone / format...'
    );
    pt.placeholder = pt.placeholder.replace(
      /ADVANCED: Parameters\.\.\./g,
      'ADVANCED: Tone / format...'
    );
  }

  const steps = pt.instructions?.steps || [];
  for (const step of steps) {
    if (step.step === 4) {
      if (step.hint) step.hint = apply(step.hint);
      if (step.partialSolution) step.partialSolution = apply(step.partialSolution);
    }
    if (step.step === 6) {
      step.hint = adv.hint;
      step.partialSolution = adv.partial;
      if (locale === 'lt') {
        step.description = 'Nustatyk toną ir formatą (be API parametrų)';
        step.title = step.title.replace('parametrus', 'toną ir formatą');
      } else {
        step.description = 'Set tone and format (no API parameters)';
        step.title = step.title.replace(/parameters/i, 'tone and format');
      }
    }
    // Other steps may mention CoT in hints
    if (step.hint) step.hint = apply(step.hint);
    if (step.partialSolution && step.step !== 6) {
      step.partialSolution = apply(step.partialSolution);
    }
  }

  // Ensure template ADVANCED is exact (re-apply if Temperature survived)
  if (pt.template) {
    pt.template = pt.template
      .replace(/ADVANCED:[\s\S]*$/m, adv.inTemplate)
      .replace(/\n+$/, '');
    // Safer: if ADVANCED block mid-string
    const advIdx = pt.template.search(/ADVANCED:/);
    if (advIdx >= 0) {
      pt.template = pt.template.slice(0, advIdx) + adv.inTemplate;
    }
  }
}

function patchM3(mod, locale) {
  for (const id of [31, 32, 33, 34, 35, 36]) {
    const slide = findSlide(mod, id);
    if (slide) patchM3Slide(slide, locale);
  }
}

function patchUsOverrides(data) {
  walkReplace(data, (str) => {
    let s = str;
    s = s.replace(/valdybai, kurie priims/g, 'valdybai – ji priims');
    s = s.replace(
      /Formatas: Executive Summary \(1–2 puslapiai\)/g,
      'Formatas: Vadovybės santrauka (Executive Summary, 1–2 puslapiai)'
    );
    s = s.replace(/REASONING \(CoT\):/g, () =>
      /Tu esi|valdybai|lietuvių|Kalba: lietuvi/i.test(s)
        ? 'REASONING (žingsnis po žingsnio):'
        : 'REASONING (step by step):'
    );
    // Temperature → tone (generic US overrides)
    s = s.replace(
      /ADVANCED:\s*\nTemperature:\s*0\.3\s*\(faktinis tonas\),\s*Format:\s*verslo dokumentas/g,
      'ADVANCED:\nTonas: faktinis. Formatas: verslo dokumentas'
    );
    s = s.replace(
      /ADVANCED:\s*\nTemperature:\s*0\.3\s*\(factual tone\),\s*Format:\s*business document/g,
      'ADVANCED:\nTone: factual. Format: business document'
    );
    s = s.replace(
      /ADVANCED:\s*Temperature:\s*0\.3,\s*Format:\s*HR report/g,
      'ADVANCED: Tone: sensitive, professional. Format: HR report'
    );
    s = s.replace(
      /ADVANCED:\s*\nTemperature:\s*0\.3\s*\(factual tone\)\.\s*Use only the given context \(RAG\)\./g,
      'ADVANCED:\nTone: factual. Use only the given context (RAG). Format: research report'
    );
    s = s.replace(/Temperature:\s*0\.[0-9]+[^\n]*/g, (match) => {
      if (/factual|faktinis/i.test(match)) return 'Tone: factual';
      if (/sensitive|jautrus/i.test(match)) return 'Tone: sensitive, professional';
      if (/empath/i.test(match)) return 'Tone: empathetic, professional';
      return 'Tone: professional';
    });
    return s;
  });
}

function main() {
  const modulesPath = join(root, 'src', 'data', 'modules.json');
  const enPath = join(root, 'src', 'data', 'modules-en.json');
  const usPath = join(root, 'src', 'data', 'modules-en-us-overrides.json');

  const modules = JSON.parse(readFileSync(modulesPath, 'utf8'));
  const en = JSON.parse(readFileSync(enPath, 'utf8'));
  const us = JSON.parse(readFileSync(usPath, 'utf8'));

  const m1 = findModule(modules, 1);
  const m2 = findModule(modules, 2);
  const m3 = findModule(modules, 3);
  if (!m1 || !m2 || !m3) throw new Error('M1–M3 missing in modules.json');

  patchM1(m1, 'lt');
  patchM251(m2, 'lt');
  patchM252(m2, 'lt');
  patchM3(m3, 'lt');

  const e1 = findModule(en, 1);
  const e2 = findModule(en, 2);
  const e3 = findModule(en, 3);
  if (!e1 || !e2 || !e3) throw new Error('M1–M3 missing in modules-en.json');

  patchM1(e1, 'en');
  patchM251(e2, 'en');
  patchM252(e2, 'en');
  patchM3(e3, 'en');

  patchUsOverrides(us);

  writeFileSync(modulesPath, JSON.stringify(modules, null, 2) + '\n');
  writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');
  writeFileSync(usPath, JSON.stringify(us, null, 2) + '\n');

  console.log('M1P patch applied: modules.json, modules-en.json, modules-en-us-overrides.json');
}

main();
