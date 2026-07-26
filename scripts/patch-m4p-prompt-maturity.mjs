#!/usr/bin/env node
/**
 * M4P prompt maturity (fit-for-purpose):
 * - Trim bloated Flagships; upgrade thin Stage; Micro + Formatas cues
 * - Chrome: Kam tai? → Trumpai where needed
 * Updates: modules.json, modules-en-m4-m6.json
 * Contract: docs/development/M4_PROMPT_MATURITY.md
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const LT = {
  49: `ROLE: Tu esi promptų kokybės vertintojas.
TASK: Įvertink promptą pagal 5 principus: Aiškumas; Eksperimentavimas; Nuo paprasto → sudėtingo; Kontekstas; Žodžių pasirinkimas.
INPUT: [įklijuok savo promptą čia]
OUTPUT:
1) Lentelė 1–5 kiekvienam principui + 1 sakinys kodėl
2) 3 silpnos vietos
3) Pataisyta versija (tik tai, kas duoda naudą)
Jei trūksta info – įvardink; jei per sudėtinga – pasiūlyk paprastesnę pirmą versiją.`,

  55: `ROLE: Tu esi darbo procesų asistentas.
TASK: Apibrėžk mano profesinį workflow su DI – 3–5 žingsniai. Kiekvienam: tikslas, ką įvedu, ką gaunu. Procesas kartotinam naudojimui.
CONTEXT: [Įklijuok: ką dažniausiai darau su DI – 1–2 sakiniai]
OUTPUT: Numeruotas sąrašas – žingsnis | tikslas | įvestis | rezultatas.
Jei trūksta info – įvardink ko reikia.`,

  '55a': `Duomenys: [sektorius / įmonės dydis / rinka]
Padaryk: sukurk augimo strategijos procesą (rinka → produktas → plėtra)
Formatas: etapas | dažna klaida | kaip išvengti`,

  '55b': `Duomenys: [projektas / skaitmeninė transformacija / suinteresuotieji]
Padaryk: struktūruotas procesas nuo pritarimo iki įgyvendinimo
Formatas: etapas | rizikos | valdymo veiksmas`,

  '55c': `Duomenys: [operacija, pvz. tiekimo grandinė / mažmena]
Padaryk: žingsnis po žingsnio optimizavimo procesas (kaštai, efektyvumas, technologijos)
Formatas: žingsnis | tikslas | KPI`,

  43: `ROLE: Tu esi praktinių grandinių asistentas.
TASK: 1) Paversk užduotį į 3 žingsnių grandinę (įvestis → apdorojimas → rezultatas) + įrankį kiekvienam. 2) Įgyvendinimo instrukcija: ką atidaryti / įvesti / paspausti kiekviename žingsnyje.
CONTEXT: [Vienu sakiniu: ką nori gauti ir kam]
OUTPUT: 1) Grandinė (žingsnis + įrankis) 2) Instrukcija Žingsnis 1–3.
Žingsniai = veiksmai; įrankiai realūs (ChatGPT, Claude, Gamma ir kt.).`,

  '66.6': `ROLE: Tu esi promptų asistentas – perrašai silpnas užklausas.
TASK: Perrašyk mano užklausą į gerą promptą: aiškus tikslas, kontekstas, išvesties formatas; be abstrakcijų („padėk“, „optimizuok“) be veiksmų.
CONTEXT: [Įklijuok savo blogą / seną užklausą]
OUTPUT:
Trumpas variantas: (1–2 sakiniai)
Išsamesnis: tikslas + kontekstas + formatas
Jei trūksta info – įvardink ko reikia.`,

  60: `Duomenys: [įklijuok tekstą su [Šaltinis 1], [Šaltinis 2]…]
Padaryk: pateik išvadas tik pagal šiuos šaltinius
Formatas: išvada | šaltinis | citata / fragmentas
Jei duomenų nėra – parašyk „Nežinau“ ir ko trūksta.`,

  '64qw': `Duomenys: tema [TEMA]; tikslas [sprendimas / ataskaita]
Padaryk: 3 sub-klausimai + kokių šaltinių reikia + trumpa sintezė
Formatas: sub-klausimas | ką ieškoti | 1 išvada (su nuoroda jei turi)
Jei šaltinio nėra – „Nežinau“.`,

  65: `Duomenys: problema [PROBLEMA]; tipas [seka / grandinė / idėjų medis]
Padaryk: sugeneruok promptų struktūrą šiai problemai
Formatas: 1) numeruoti žingsniai 2) kaip siejasi 3) galutinio sprendimo formatas`,

  '63a': `Pateik žingsnis po žingsnio planą: [užduotis].
Formatas: numeruoti žingsniai + 1 sakinys kiekvienam.`,

  '63b': `Paaiškink [temą, pvz. kainodarą] nuo pradžios iki rezultato. Parodyk, kaip vienas žingsnis veda į kitą.
Formatas: žingsnis → kodėl seka kitas.`,

  '63c': `Palygink [A] ir [B] verslui. Nurodyk konkrečius atvejus.
Formatas: lentelė + 2 konkretūs atvejai.`,

  '63d': `Įvertink 3 alternatyvas [projektui / investicijai] pagal riziką, grąžą ir laiką.
Formatas: lentelė + geriausia + 2 sakiniai pagrindimo.`,

  '59euro': `Duomenys: užduotis [aprašyk, pvz. BVP palyginimas]
Padaryk: atsakyti tik iš Eurostat (ec.europa.eu/eurostat)
Formatas: teiginys | dataset | nuoroda
Jei nėra duomenų – „Nežinau“.`,

  '59list': `Duomenys: poreikis – RAG analizei Lietuvoje
Padaryk: oficialių atvirų duomenų šaltinių sąrašas
Formatas: kategorija (statistika / teisė / verslas / finansai / pirkimai) | institucija | URL | tipas | API (taip/ne)`,

  '48rl': `Tu esi DI, optimizuojantis verslo el. laiškus.
Tikslas: laiškas, kuris didina atidarymo tikimybę.
Taisyklės: iki 100 žodžių; aiški vertė; aiškus CTA.
OUTPUT: 3 variantai + pats pasirink geriausią pagal „aiškiausias ir trumpiausias“ + 1 sakinys kodėl.`,

  '48rlhf': `Tu esi DI, kuriantis verslo el. laiškus.
Užduotis: 3 laiško variantai klientui apie DI mokymus.
Tada: paprašyk MANĘS pasirinkti geriausią ir paklausk, kas patiko / nepatiko.
OUTPUT: 1 patobulintas galutinis laiškas pagal mano atsiliepimą.`,
};

const EN = {
  49: `ROLE: You are a prompt quality evaluator.
TASK: Rate the prompt on 5 principles: Clarity; Experimentation; Simple → complex; Context; Word choice.
INPUT: [paste your prompt here]
OUTPUT:
1) Table 1–5 per principle + 1 sentence why
2) 3 weak spots
3) Improved version (only changes that add value)
If info is missing – say so; if too complex – suggest a simpler first version.`,

  55: `ROLE: You are a work-process assistant.
TASK: Define my professional AI workflow – 3–5 steps. For each: goal, what I input, what I get. Reusable process.
CONTEXT: [Paste: what I most often do with AI – 1–2 sentences]
OUTPUT: Numbered list – step | goal | input | result.
If info is missing – say what you need.`,

  '55a': `Data: [sector / company size / market]
Do: build a growth-strategy process (market → product → expansion)
Format: stage | common mistake | how to avoid`,

  '55b': `Data: [project / digital transformation / stakeholders]
Do: structured process from buy-in to delivery
Format: stage | risks | control action`,

  '55c': `Data: [operation, e.g. supply chain / retail]
Do: step-by-step optimization process (cost, efficiency, tech)
Format: step | goal | KPI`,

  43: `ROLE: You are a practical workflow-chain assistant.
TASK: 1) Turn my task into a concrete 3-step chain (input → process → result) + a tool per step. 2) Implementation: what to open / paste / click in each step.
CONTEXT: [One sentence: what I want and for whom]
OUTPUT: 1) Chain (step + tool) 2) Instructions Steps 1–3.
Steps = actions; real tools (ChatGPT, Claude, Gamma, etc.).`,

  '66.6': `ROLE: You are a prompt assistant – you rewrite weak requests.
TASK: Rewrite my request into a good prompt: clear goal, context, output format; no vague verbs (“help”, “optimize”) without actions.
CONTEXT: [Paste your bad / old request]
OUTPUT:
Short version: (1–2 sentences)
Fuller: goal + context + format
If info is missing – say what to add.`,

  60: `Data: [paste text with [Source 1], [Source 2]…]
Do: give conclusions only from these sources
Format: conclusion | source | quote / fragment
If data is missing – write “I don’t know” and what is missing.`,

  '64qw': `Data: topic [TOPIC]; goal [decision / report]
Do: 3 sub-questions + which sources you need + short synthesis
Format: sub-question | what to look for | 1 finding (with link if you have one)
If no source – “I don’t know”.`,

  65: `Data: problem [PROBLEM]; type [sequence / chain / idea tree]
Do: generate a prompt structure for this problem
Format: 1) numbered steps 2) how they link 3) final decision format`,

  '63a': `Give a step-by-step plan for: [task].
Format: numbered steps + 1 sentence each.`,

  '63b': `Explain [topic, e.g. pricing] from start to result. Show how each step leads to the next.
Format: step → why the next follows.`,

  '63c': `Compare [A] and [B] for business. Give concrete cases.
Format: table + 2 concrete cases.`,

  '63d': `Rate 3 alternatives for [project / investment] by risk, return and time.
Format: table + best pick + 2 sentences of rationale.`,

  '59euro': `Data: task [describe, e.g. GDP comparison]
Do: answer using Eurostat only (ec.europa.eu/eurostat)
Format: claim | dataset | link
If no data – “I don’t know”.`,

  '59list': `Data: need – sources for RAG analysis in Lithuania
Do: list official open data sources
Format: category (stats / law / business / finance / procurement) | institution | URL | type | API (yes/no)`,

  '48rl': `You are an AI optimizing business emails.
Goal: an email that maximizes open likelihood.
Rules: under 100 words; clear value; clear CTA.
OUTPUT: 3 variants + pick the best by “clearest and shortest” + 1 sentence why.`,

  '48rlhf': `You are an AI writing business emails.
Task: 3 email variants to a client about AI training.
Then: ask ME to pick the best and what I liked / disliked.
OUTPUT: 1 improved final email based on my feedback.`,
};

function findModule(data, id) {
  return (data.modules ?? []).find((m) => m.id === id);
}

function findSlide(mod, id) {
  return (mod.slides ?? []).find((s) => s.id === id || String(s.id) === String(id));
}

function setCopyable(slide, sectionIndex, text) {
  if (!slide?.content?.sections?.[sectionIndex]) {
    throw new Error(`Missing section ${sectionIndex} on slide ${slide?.id}`);
  }
  slide.content.sections[sectionIndex].copyable = text;
}

function findCopyableIndex(slide, pred) {
  const secs = slide.content?.sections ?? [];
  for (let i = 0; i < secs.length; i++) {
    if (secs[i].copyable != null && pred(secs[i], i)) return i;
  }
  return -1;
}

function renameChrome(slide, locale) {
  if (!slide?.content?.sections) return;
  for (const sec of slide.content.sections) {
    const h = sec.heading || '';
    if (locale === 'lt') {
      if (/^1️⃣\s*Kam tai/i.test(h) || /^1️⃣\s*Kodėl čia/i.test(h)) {
        sec.heading = '1️⃣ Trumpai';
      } else if (/^2️⃣\s*Apibrėžk/i.test(h)) {
        sec.heading = '2️⃣ Daryk dabar (2–7 min)';
      }
    } else {
      if (/^1️⃣\s*What('s| is) it for/i.test(h) || /^1️⃣\s*Why (here|this)/i.test(h)) {
        sec.heading = '1️⃣ In short';
      } else if (/^2️⃣\s*Define your/i.test(h)) {
        sec.heading = '2️⃣ Do now (2–7 min)';
      }
    }
  }
}

function patchModule(mod, locale) {
  const P = locale === 'lt' ? LT : EN;
  const isLt = locale === 'lt';

  // 49 Flagship trim
  const s49 = findSlide(mod, 49);
  if (s49) {
    const idx = findCopyableIndex(s49, (s) => /Kopijuojamas|Copyable/i.test(s.heading || ''));
    if (idx >= 0) setCopyable(s49, idx, P[49]);
    renameChrome(s49, locale);
  }

  // 55 primary + Stage examples + chrome
  const s55 = findSlide(mod, 55);
  if (s55) {
    const primary = findCopyableIndex(s55, (s) =>
      /proceso|workflow|Kopijuojamas promptas \(proceso/i.test(s.heading || '') ||
      /Copyable prompt \(process/i.test(s.heading || '')
    );
    if (primary >= 0) setCopyable(s55, primary, P[55]);
    const ex = (s55.content.sections || [])
      .map((sec, i) => ({ sec, i }))
      .filter(({ sec }) => sec.copyable && /Pavyzdys|Example/i.test(sec.heading || ''));
    if (ex[0]) setCopyable(s55, ex[0].i, P['55a']);
    if (ex[1]) setCopyable(s55, ex[1].i, P['55b']);
    if (ex[2]) setCopyable(s55, ex[2].i, P['55c']);
    renameChrome(s55, locale);
  }

  // 43 trim
  const s43 = findSlide(mod, 43);
  if (s43) {
    const idx = findCopyableIndex(s43, () => true);
    if (idx >= 0) setCopyable(s43, idx, P[43]);
  }

  // 66.6 trim
  const s666 = findSlide(mod, 66.6);
  if (s666) {
    const idx = findCopyableIndex(s666, () => true);
    if (idx >= 0) setCopyable(s666, idx, P['66.6']);
  }

  // 60 Stage upgrade
  const s60 = findSlide(mod, 60);
  if (s60) {
    const idx = findCopyableIndex(s60, () => true);
    if (idx >= 0) setCopyable(s60, idx, P[60]);
  }

  // 64 Quick win
  const s64 = findSlide(mod, 64);
  if (s64) {
    const qw = findCopyableIndex(s64, (s) => /Quick win|Greitas/i.test(s.heading || '') || (s.copyable && s.copyable.length < 80));
    // prefer heading match; fallback last copyable if short
    let idx = findCopyableIndex(s64, (s) => /Quick win|⚡/i.test(s.heading || ''));
    if (idx < 0) {
      const secs = s64.content.sections || [];
      for (let i = secs.length - 1; i >= 0; i--) {
        if (secs[i].copyable && secs[i].copyable.length < 80) {
          idx = i;
          break;
        }
      }
    }
    if (idx >= 0) {
      setCopyable(s64, idx, P['64qw']);
      const sec = s64.content.sections[idx];
      if (isLt && /Quick win/i.test(sec.heading || '')) {
        sec.heading = '⚡ Greitas startas (tyrimo starteris)';
        sec.body = 'Nukopijuok ir pakeisk [TEMA] / [tikslą] – gausi sub-klausimus ir sintezės skeletą (ne meta „sukurk promptą“).';
      } else if (!isLt && /Quick win/i.test(sec.heading || '')) {
        sec.heading = '⚡ Quick start (research starter)';
        sec.body = 'Copy and replace [TOPIC] / [goal] – you get sub-questions and a synthesis skeleton (not a meta “write a prompt”).';
      }
    }
  }

  // 65 Stage
  const s65 = findSlide(mod, 65);
  if (s65) {
    const idx = findCopyableIndex(s65, () => true);
    if (idx >= 0) setCopyable(s65, idx, P[65]);
  }

  // 63 Micro ×4
  const s63 = findSlide(mod, 63);
  if (s63) {
    const keys = ['63a', '63b', '63c', '63d'];
    const withCopy = (s63.content.sections || [])
      .map((sec, i) => ({ sec, i }))
      .filter(({ sec }) => sec.copyable);
    keys.forEach((k, n) => {
      if (withCopy[n]) setCopyable(s63, withCopy[n].i, P[k]);
    });
  }

  // 59 minis
  const s59 = findSlide(mod, 59);
  if (s59) {
    const euro = findCopyableIndex(s59, (s) => /Eurostat šablonas|Eurostat template|Mini-promptas: Eurostat/i.test(s.heading || ''));
    if (euro >= 0) setCopyable(s59, euro, P['59euro']);
    const list = findCopyableIndex(s59, (s) => /atvirų šaltinių|open.*source|Mini-promptas: atvir/i.test(s.heading || ''));
    if (list >= 0) setCopyable(s59, list, P['59list']);
  }

  // 48 RL demos
  const s48 = findSlide(mod, 48);
  if (s48) {
    const rl = findCopyableIndex(s48, (s) => /RL prompt|RL prompto/i.test(s.heading || '') && !/RLHF/i.test(s.heading || ''));
    const rlhf = findCopyableIndex(s48, (s) => /RLHF/i.test(s.heading || ''));
    if (rl >= 0) setCopyable(s48, rl, P['48rl']);
    if (rlhf >= 0) setCopyable(s48, rlhf, P['48rlhf']);
  }

  // Chrome on practice slides
  for (const id of [55, 49, 65.5, 66.6, 60, 65]) {
    const s = findSlide(mod, id);
    if (s) renameChrome(s, locale);
  }
}

function main() {
  const modulesPath = join(root, 'src', 'data', 'modules.json');
  const enPath = join(root, 'src', 'data', 'modules-en-m4-m6.json');

  const modules = JSON.parse(readFileSync(modulesPath, 'utf8'));
  const en = JSON.parse(readFileSync(enPath, 'utf8'));

  const mod4 = findModule(modules, 4);
  if (!mod4) throw new Error('Module 4 not found in modules.json');
  patchModule(mod4, 'lt');

  const enMod4 = findModule(en, 4);
  if (!enMod4) throw new Error('Module 4 not found in modules-en-m4-m6.json');
  patchModule(enMod4, 'en');

  writeFileSync(modulesPath, JSON.stringify(modules, null, 2) + '\n');
  writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');

  console.log('M4P patch applied: modules.json, modules-en-m4-m6.json');
}

main();
