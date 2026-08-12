#!/usr/bin/env node
/**
 * M10-M12 content hygiene: LT/EN typography, orthography markers, jargon and
 * LT<->EN parity of the learner-visible copy.
 *
 * Complements audit:m1012 (hybrid tokens / LT remnants) with the layer no
 * existing gate covers: punctuation, number parity, untranslated remainders,
 * placeholder parity and translation length drift.
 *
 * Usage:
 *   node scripts/audit-m1012-content-hygiene.mjs [--json] [--out=file]
 *                                                [--rule=name] [--slide=id]
 *                                                [--strict] [--fail-on-regression]
 *                                                [--write-baseline]
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  loadCorpus,
  isPromptField,
  isProseField,
  isChromeField,
} from './lib/m1012-content-corpus.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const baselinePath = join(__dirname, 'fixtures', 'm1012-content-hygiene-baseline.json');

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const strict = args.includes('--strict');
const failOnRegression = args.includes('--fail-on-regression');
const writeBaseline = args.includes('--write-baseline');
const outArg = args.find((a) => a.startsWith('--out='))?.slice('--out='.length);
const ruleFilter = args.find((a) => a.startsWith('--rule='))?.slice('--rule='.length);
const slideFilter = args.find((a) => a.startsWith('--slide='))?.slice('--slide='.length);

const LT_LOWER = 'ąčęėįšųūž';
const LT_UPPER = 'ĄČĘĖĮŠŲŪŽ';
const LT_LETTERS = LT_LOWER + LT_UPPER;
const LT_WORD = new RegExp(`[A-Za-z${LT_LETTERS}]`);

/** Abbreviations that legitimately end in a period mid-sentence. */
const ABBREV = new Set([
  'pvz',
  'psl',
  'val',
  'min',
  'sek',
  'proc',
  'pan',
  'kt',
  'nr',
  'sk',
  'mln',
  'tukst',
  'tūkst',
  'plg',
  'str',
  'p',
  't',
  'y',
  'a',
  'm',
  'etc',
  'vs',
  'approx',
  'inc',
  'no',
  'e',
  'g',
  'i',
  'fig',
  'ca',
  'el',
  'žr',
  'zr',
  'tt',
  'pvz',
  'gr',
  'sav',
  'd',
]);

const BRITISH = [
  ['behaviour', 'behavior'],
  ['artefact', 'artifact'],
  ['organis', 'organiz'],
  ['optimis', 'optimiz'],
  ['prioritis', 'prioritiz'],
  ['realis', 'realiz'],
  ['recognis', 'recogniz'],
  ['summaris', 'summariz'],
  ['utilis', 'utiliz'],
  ['customis', 'customiz'],
  ['personalis', 'personaliz'],
  ['analyse', 'analyze'],
  ['catalogue', 'catalog'],
  ['centre', 'center'],
  ['colour', 'color'],
  ['favour', 'favor'],
  ['labour', 'labor'],
  ['licence', 'license'],
  ['defence', 'defense'],
  ['programme', 'program'],
  ['whilst', 'while'],
  ['amongst', 'among'],
  ['learnt', 'learned'],
  ['practise', 'practice'],
  ['enrol', 'enroll'],
  ['fulfil', 'fulfill'],
  ['judgement', 'judgment'],
  ['modelling', 'modeling'],
  ['labelling', 'labeling'],
  ['travelled', 'traveled'],
  ['cancelled', 'canceled'],
];

/** LT jargon: [pattern, suggestion, chromeOnly]. */
const LT_JARGON = [
  [/\btriaž\w*/gi, 'išskirsto / nukreipia pagal tipą', false],
  [/\btrigger\w*/gi, 'paleidiklis / įvykis', false],
  [/\bworkflow\w*/gi, 'darbo eiga', true],
  [/\bchip\w*/gi, 'žingsnis / taškas', false],
  [/\bLab['’]\w*/g, 'šioje užduotyje / žemiau', false],
  [/\bpilnai\b/gi, 'visiškai', false],
  [/\bsekant(is|į|ys|iam|io|i|ę)\b/gi, 'kitas', false],
  [/\bdeadline\w*/gi, 'terminas', false],
  [/\bfeedback\w*/gi, 'grįžtamasis ryšys', false],
  [/\binsight\w*/gi, 'įžvalga', false],
  [/\bbottleneck\w*/gi, 'kliūtis', false],
  [/\bTL;DR\b/gi, 'Trumpai', false],
  [/\bAI\b/g, 'DI', false],
  [/\benterprise\b/gi, 'didelės organizacijos', true],
  [/\bcase['’]?\w*\b/gi, 'atvejis', true],
  [/\bflow['’]\w*/gi, 'srautas', false],
];

const LT_PLURAL_ADDRESS =
  /\b(Jūs|jūs|jūsų|Jūsų|galite|Galite|paspauskite|pasirinkite|įrašykite|peržiūrėkite|tęskite|pažymėkite|naudokite|atkreipkite|patikrinkite|nurodykite|pridėkite|paleiskite|užpildykite|turite|Turite)\b/g;

/**
 * LT function words that signal untranslated text when clustered in EN.
 * Excludes words that are also valid English ("per", "prie" in loanwords).
 */
const LT_FUNCTION_WORDS = /\b(ir|arba|tavo|savo|kai|jei|nes|kaip|tai)\b/g;

/**
 * Default strings emitted by scripts/build-en-m10-m12.mjs when a field has no
 * authored translation. Their presence in the overlay means the EN learner is
 * reading generator filler instead of content.
 */
const BUILD_FILLER = [
  'Use this step to design, test and improve an AI agent workflow',
  'AI agent workflow step.',
  'A key term used in agent engineering.',
];

/** Paths where an identical value across slides is by design, not filler. */
function isRepeatableChrome(path) {
  return /(^title$|^subtitle$|^shortTitle$|^pathLabel$|heading|^label$|templateLabel|reflectionTitle|introHeading|^term$|content\.title|instructions\.title|taskFrame)/.test(
    path
  );
}

const SEVERITY = {
  'en-build-filler': 'P0',
  'filler-repeat': 'P1',
  'scaffold-collapse': 'P1',
  'parity-en-missing': 'P0',
  'parity-lt-missing': 'P0',
  'parity-numbers': 'P0',
  'en-untranslated': 'P0',
  'en-lt-diacritics': 'P0',
  'en-di-leak': 'P0',
  'lt-ai-leak': 'P0',
  'unbalanced-bold': 'P0',
  'unbalanced-bracket': 'P0',
  'unbalanced-lt-quotes': 'P0',
  'en-lt-words': 'P0',
  'lt-jargon': 'P1',
  'lt-plural-address': 'P1',
  'en-british': 'P1',
  'parity-placeholders': 'P1',
  'parity-length-drift': 'P1',
  'percent-spacing': 'P1',
  'no-terminal-punct': 'P1',
  'missing-space-after-punct': 'P1',
  'space-before-punct': 'P1',
  'double-punct': 'P1',
  'lt-abbrev-punct': 'P1',
  'parity-markdown': 'P2',
  'parity-url': 'P2',
  'double-space': 'P2',
  'trailing-space': 'P2',
  'straight-quote': 'P2',
  'straight-apostrophe': 'P2',
  'triple-dot': 'P2',
  'repeated-word': 'P2',
  'lowercase-after-period': 'P2',
};

const { slides } = loadCorpus();
const findings = [];

function add(slide, path, lang, rule, snippet, note) {
  findings.push({
    severity: SEVERITY[rule] || 'P2',
    rule,
    lang,
    moduleId: slide.moduleId,
    slideId: slide.slideId,
    uiIndex: slide.uiIndex,
    path,
    snippet: String(snippet).slice(0, 140),
    note,
  });
}

function countOf(text, re) {
  return (text.match(re) || []).length;
}

function numbersIn(text) {
  const withoutUrls = text.replace(/https?:\/\/\S+/g, '');
  const raw = withoutUrls.match(/\d+(?:[.,]\d+)?/g) || [];
  return raw
    .map((n) => n.replace(',', '.'))
    .map((n) => String(parseFloat(n)))
    .sort();
}

function markdownShape(text) {
  return {
    bold: countOf(text, /\*\*/g),
    bullets: countOf(text, /(^|\n)\s*[-*]\s/g),
    ordered: countOf(text, /(^|\n)\s*\d+\.\s/g),
    tableRows: countOf(text, /(^|\n)\s*\|/g),
    breaks: countOf(text, /\n/g),
  };
}

function placeholdersIn(text) {
  return {
    brackets: countOf(text, /\[[^\]]{1,60}\]/g),
    braces: countOf(text, /\{\{[^}]{1,60}\}\}/g),
  };
}

function urlsIn(text) {
  return (text.match(/https?:\/\/[^\s)"'»„“]+/g) || []).sort();
}

/** Shared typography checks. */
function checkTypography(slide, path, lang, text) {
  const prompt = isPromptField(path);

  if (/\S {2,}\S/.test(text)) add(slide, path, lang, 'double-space', matchContext(text, /\S {2,}\S/));
  if (/ +(\n|$)/.test(text)) add(slide, path, lang, 'trailing-space', matchContext(text, / +(\n|$)/));
  if (/\.\.\./.test(text)) add(slide, path, lang, 'triple-dot', matchContext(text, /\.\.\./), 'naudok …');
  if (/ [,.;:!?]/.test(text))
    add(slide, path, lang, 'space-before-punct', matchContext(text, / [,.;:!?]/));
  if (/([,;:!?])\1/.test(text) || /(?<!\.)\.\.(?!\.)/.test(text))
    add(slide, path, lang, 'double-punct', matchContext(text, /([,;:!?])\1|(?<!\.)\.\.(?!\.)/));
  if (/\d%/.test(text))
    add(slide, path, lang, 'percent-spacing', matchContext(text, /\d%/), 'projekte naudojama „80 %“');

  const commaRe = /,(?=[^\s\d)\]])/;
  if (!prompt && commaRe.test(text))
    add(slide, path, lang, 'missing-space-after-punct', matchContext(text, commaRe));

  if (!prompt && /"/.test(text))
    add(
      slide,
      path,
      lang,
      'straight-quote',
      matchContext(text, /"/),
      lang === 'lt' ? 'LT naudoja „ “' : 'EN naudoja “ ”'
    );
  if (!prompt && /'/.test(text)) add(slide, path, lang, 'straight-apostrophe', matchContext(text, /'/));

  if (countOf(text, /\*\*/g) % 2 !== 0)
    add(slide, path, lang, 'unbalanced-bold', text.slice(0, 140), 'nelyginis ** kiekis');
  // Line-initial enumeration markers like "1)" or "a)" are not brackets.
  const withoutEnumeration = text.replace(/(^|\n)\s*[0-9a-zA-Z]\)/g, '$1 ');
  if (countOf(withoutEnumeration, /\(/g) !== countOf(withoutEnumeration, /\)/g))
    add(slide, path, lang, 'unbalanced-bracket', text.slice(0, 140), '( ir ) nesutampa');
  if (lang === 'lt' && countOf(text, /„/g) !== countOf(text, /“/g))
    add(slide, path, lang, 'unbalanced-lt-quotes', text.slice(0, 140), '„ ir “ nesutampa');

  const repeated = text.match(
    new RegExp(`\\b([A-Za-z${LT_LETTERS}]{2,})\\s+\\1\\b`, 'i')
  );
  if (repeated) add(slide, path, lang, 'repeated-word', repeated[0]);

  if (!prompt) {
    const lowerAfterPeriod = new RegExp(`([A-Za-z${LT_LETTERS}]+)\\.\\s+([a-z${LT_LOWER}])`, 'g');
    let m;
    while ((m = lowerAfterPeriod.exec(text))) {
      const prev = m[1].toLowerCase().replace(new RegExp(`[^a-z${LT_LETTERS}]`, 'g'), '');
      if (!ABBREV.has(prev) && prev.length > 1) {
        add(slide, path, lang, 'lowercase-after-period', m[0]);
        break;
      }
    }
  }

  if (!prompt && isProseField(path) && text.trim().length > 60) {
    const trimmed = text.trim();
    if (!/[.!?:;…)»„“"”'*|%\]}]$/.test(trimmed) && !/\|\s*$/.test(trimmed))
      add(slide, path, lang, 'no-terminal-punct', trimmed.slice(-90));
  }
}

function matchContext(text, re) {
  const m = text.match(re);
  if (!m) return text.slice(0, 60);
  const at = m.index ?? text.indexOf(m[0]);
  return text.slice(Math.max(0, at - 35), at + m[0].length + 35);
}

function checkLt(slide, path, text) {
  // PAPRASTOS_KALBOS_GAIRES §2 allows a bilingual first mention such as
  // "Paleidiklis (trigger)" - only the bare loanword is a violation.
  const withoutGloss = text.replace(
    /\((trigger|workflow|router|condition|action|webhook|human-in-the-loop|hitl)[^)]{0,30}\)/gi,
    ''
  );
  for (const [re, suggestion, chromeOnly] of LT_JARGON) {
    if (chromeOnly && !isChromeField(path)) continue;
    if (isPromptField(path) && !/triaž|chip|pilnai|sekant/i.test(re.source)) continue;
    if (withoutGloss.match(re)) {
      const rule = /\\bAI\\b/.test(re.source) ? 'lt-ai-leak' : 'lt-jargon';
      add(slide, path, 'lt', rule, matchContext(text, re), `→ ${suggestion}`);
    }
  }
  const plural = text.match(LT_PLURAL_ADDRESS);
  if (plural) add(slide, path, 'lt', 'lt-plural-address', matchContext(text, LT_PLURAL_ADDRESS), 'tu forma');

  const abbrev = text.match(/\bt\.\s?y\b(?!\.)|\bpvz\b(?!\.)|\bpsl\b(?!\.)|\bval\b(?!\.)/);
  if (abbrev) add(slide, path, 'lt', 'lt-abbrev-punct', matchContext(text, /\bt\.\s?y\b(?!\.)|\bpvz\b(?!\.)|\bpsl\b(?!\.)|\bval\b(?!\.)/));
}

function checkEn(slide, path, text) {
  for (const [bre, ame] of BRITISH) {
    const re = new RegExp(`\\b${bre}\\w*`, 'gi');
    if (re.test(text)) add(slide, path, 'en', 'en-british', matchContext(text, re), `→ ${ame}`);
  }
  const diacritics = new RegExp(`[${LT_LETTERS}]`);
  if (diacritics.test(text))
    add(slide, path, 'en', 'en-lt-diacritics', matchContext(text, diacritics), 'LT raidė EN tekste');
  if (/\bDI\b/.test(text)) add(slide, path, 'en', 'en-di-leak', matchContext(text, /\bDI\b/), '→ AI');
  const ltWords = text.match(LT_FUNCTION_WORDS) || [];
  if (ltWords.length >= 2)
    add(slide, path, 'en', 'en-lt-words', text.slice(0, 140), `LT žodžiai: ${[...new Set(ltWords)].join(', ')}`);
}

function checkParity(slide, path, lt, en) {
  if (lt && !en) {
    add(slide, path, 'parity', 'parity-en-missing', lt.slice(0, 140), 'nėra EN atitikmens');
    return;
  }
  if (!lt && en) {
    add(slide, path, 'parity', 'parity-lt-missing', en.slice(0, 140), 'yra tik EN');
    return;
  }
  if (!lt || !en) return;

  const ltNums = numbersIn(lt);
  const enNums = numbersIn(en);
  if (ltNums.join(',') !== enNums.join(','))
    add(
      slide,
      path,
      'parity',
      'parity-numbers',
      `LT [${ltNums.join(' ')}] vs EN [${enNums.join(' ')}]`,
      'skaičiai nesutampa'
    );

  const ltPh = placeholdersIn(lt);
  const enPh = placeholdersIn(en);
  if (ltPh.brackets !== enPh.brackets || ltPh.braces !== enPh.braces)
    add(
      slide,
      path,
      'parity',
      'parity-placeholders',
      `LT [${ltPh.brackets}]/{{${ltPh.braces}}} vs EN [${enPh.brackets}]/{{${enPh.braces}}}`,
      'placeholder kiekis nesutampa'
    );

  if (lt.length > 120) {
    const ratio = en.length / lt.length;
    if (ratio < 0.65 || ratio > 1.45)
      add(
        slide,
        path,
        'parity',
        'parity-length-drift',
        `LT ${lt.length} vs EN ${en.length} (${ratio.toFixed(2)}x)`,
        ratio < 0.65 ? 'EN gali būti sutrumpintas' : 'EN gali būti išplėstas'
      );
  }

  const a = markdownShape(lt);
  const b = markdownShape(en);
  const diffs = Object.keys(a).filter((k) => a[k] !== b[k]);
  if (diffs.length)
    add(
      slide,
      path,
      'parity',
      'parity-markdown',
      diffs.map((k) => `${k}: LT ${a[k]} vs EN ${b[k]}`).join('; '),
      'struktūra nesutampa'
    );

  const ltUrls = urlsIn(lt);
  const enUrls = urlsIn(en);
  if (ltUrls.join(',') !== enUrls.join(','))
    add(slide, path, 'parity', 'parity-url', `LT ${ltUrls.join(' ')} | EN ${enUrls.join(' ')}`);

  // Identical strings are expected for URLs and proper-noun lists; only flag
  // when the text carries lowercase prose words that should have changed.
  const hasProseWord = /(^|\s)[a-ząčęėįšųūž]{4,}/.test(lt);
  if (
    lt.trim() === en.trim() &&
    lt.trim().length > 25 &&
    LT_WORD.test(lt) &&
    hasProseWord &&
    !/url$/i.test(path)
  )
    add(slide, path, 'parity', 'en-untranslated', lt.slice(0, 140), 'EN identiškas LT');
}

/**
 * Flags a scaffolding ladder that collapsed: task description, hint and
 * partial solution carrying the same sentence teaches nothing on click.
 */
function checkScaffold(slide) {
  const steps = new Map();
  for (const { path, lt, en } of slide.rows) {
    const m = path.match(/^(.*instructions\.steps\[\d+\])\.(description|hint|partialSolution)$/);
    if (!m) continue;
    const entry = steps.get(m[1]) || { lt: {}, en: {} };
    if (lt) entry.lt[m[2]] = lt;
    if (en) entry.en[m[2]] = en;
    steps.set(m[1], entry);
  }
  for (const [stepPath, entry] of steps) {
    for (const lang of ['lt', 'en']) {
      const v = entry[lang];
      const pairs = [
        ['description', 'hint'],
        ['description', 'partialSolution'],
        ['hint', 'partialSolution'],
      ];
      const same = pairs.filter(([a, b]) => v[a] && v[b] && v[a].trim() === v[b].trim());
      if (same.length)
        add(
          slide,
          stepPath,
          lang,
          'scaffold-collapse',
          (v.description || v.hint || '').slice(0, 100),
          `identiški: ${same.map(([a, b]) => `${a}=${b}`).join(', ')}`
        );
    }
  }
}

for (const slide of slides) {
  if (slideFilter && slide.slideId !== slideFilter) continue;
  for (const { path, lt, en } of slide.rows) {
    if (lt) {
      checkTypography(slide, path, 'lt', lt);
      checkLt(slide, path, lt);
    }
    if (en) {
      checkTypography(slide, path, 'en', en);
      checkEn(slide, path, en);
      for (const filler of BUILD_FILLER) {
        if (en.includes(filler)) {
          add(slide, path, 'en', 'en-build-filler', en.slice(0, 120), 'build-en generatoriaus užpildas');
          break;
        }
      }
    }
    checkParity(slide, path, lt, en);
  }
  checkScaffold(slide);
}

// Cross-slide repeated prose: same sentence in 3+ non-chrome fields.
for (const lang of ['lt', 'en']) {
  const byValue = new Map();
  for (const slide of slides) {
    if (slideFilter && slide.slideId !== slideFilter) continue;
    for (const row of slide.rows) {
      const value = row[lang];
      if (!value || value.trim().length < 20 || isRepeatableChrome(row.path)) continue;
      const key = value.trim();
      const hits = byValue.get(key) || [];
      hits.push({ slide, path: row.path });
      byValue.set(key, hits);
    }
  }
  for (const [value, hits] of byValue) {
    if (hits.length < 3) continue;
    if (BUILD_FILLER.some((f) => value.includes(f))) continue; // already reported
    const places = hits.map((h) => `${h.slide.slideId}:${h.path}`).join(' | ');
    add(hits[0].slide, hits[0].path, lang, 'filler-repeat', value.slice(0, 100), `${hits.length}x: ${places}`.slice(0, 400));
  }
}

const filtered = ruleFilter ? findings.filter((f) => f.rule === ruleFilter) : findings;
const fingerprint = (f) => `${f.moduleId}|${f.slideId}|${f.path}|${f.rule}|${f.lang}`;

if (writeBaseline) {
  const fps = [...new Set(findings.map(fingerprint))].sort();
  writeFileSync(baselinePath, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), count: fps.length, fingerprints: fps }, null, 2), 'utf8');
  console.log(`Baseline written: ${fps.length} fingerprints -> ${baselinePath}`);
  process.exit(0);
}

if (outArg) {
  writeFileSync(join(root, outArg), JSON.stringify({ total: filtered.length, findings: filtered }, null, 2), 'utf8');
  console.log(`Wrote ${filtered.length} findings -> ${outArg}`);
}

if (jsonMode) {
  console.log(JSON.stringify({ total: filtered.length, findings: filtered }, null, 2));
} else {
  const byRule = filtered.reduce((acc, f) => {
    acc[f.rule] = (acc[f.rule] || 0) + 1;
    return acc;
  }, {});
  const bySeverity = filtered.reduce((acc, f) => {
    acc[f.severity] = (acc[f.severity] || 0) + 1;
    return acc;
  }, {});
  const bySlide = filtered.reduce((acc, f) => {
    const key = `M${f.moduleId}/${f.slideId}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  console.log('M10-M12 content hygiene');
  console.log('Severity:', bySeverity);
  console.log('\nBy rule:');
  Object.entries(byRule)
    .sort((a, b) => b[1] - a[1])
    .forEach(([rule, n]) => console.log(`  ${String(n).padStart(4)}  ${rule} (${SEVERITY[rule] || 'P2'})`));
  console.log('\nWorst slides:');
  Object.entries(bySlide)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .forEach(([slide, n]) => console.log(`  ${String(n).padStart(4)}  ${slide}`));
  console.log(`\nTotal: ${filtered.length} findings across ${Object.keys(bySlide).length} slides`);
}

if (failOnRegression) {
  if (!existsSync(baselinePath)) {
    console.error('\nNo baseline file. Run with --write-baseline first.');
    process.exit(1);
  }
  const baseline = new Set(JSON.parse(readFileSync(baselinePath, 'utf8')).fingerprints);
  const regressions = [...new Set(findings.map(fingerprint))].filter((fp) => !baseline.has(fp));
  if (regressions.length) {
    console.error(`\nREGRESSION: ${regressions.length} new content hygiene findings`);
    regressions.slice(0, 25).forEach((fp) => console.error(`  ${fp}`));
    process.exit(1);
  }
  console.log('\nNo regression against baseline.');
}

if (strict && filtered.length) process.exit(1);
