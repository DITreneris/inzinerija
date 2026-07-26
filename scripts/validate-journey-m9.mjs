#!/usr/bin/env node
/**
 * Validates M9 journey overlays against slide 90 journeyChoices ids.
 * LT: modules-journey-m9.json · EN: modules-journey-en-m9.json
 * Exit 0 = OK, 1 = failed.
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');

const EXPECTED_DOMAINS = [
  'pardavimai',
  'rinkodara',
  'it-inzinerija',
  'personalas',
  'vadyba',
  'kita',
];

const JOURNEY_STRING_KEYS = [
  'catalogSectorHint',
  'sampleColumns',
  'sampleFileLabel',
  'kpiHint',
  'themePlaceholder',
];

function loadJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    console.error(`Failed to read ${path}:`, e.message);
    process.exit(1);
  }
}

function choiceIdsFromModules(modulesPath) {
  const data = loadJson(modulesPath);
  const mod = data.modules?.find((m) => m.id === 9);
  const slide = mod?.slides?.find((s) => s.id === 90 && s.type === 'practice-quest-intro');
  if (!slide?.content?.journeyChoices?.length) {
    console.error(`${modulesPath}: M9/90 practice-quest-intro missing journeyChoices`);
    process.exit(1);
  }
  return slide.content.journeyChoices.map((c) => c.id);
}

function validateJourneyFile(path, choiceIds, label) {
  const data = loadJson(path);
  let hasError = false;

  if (!data.journeys || typeof data.journeys !== 'object') {
    console.error(`${label}: missing journeys object`);
    return false;
  }

  const journeyKeys = Object.keys(data.journeys).sort();
  const expected = [...choiceIds].sort();

  const missingFromJourney = expected.filter((id) => !data.journeys[id]);
  const extraInJourney = journeyKeys.filter((id) => !choiceIds.includes(id));

  if (missingFromJourney.length) {
    console.error(`${label}: missing journey domains:`, missingFromJourney.join(', '));
    hasError = true;
  }
  if (extraInJourney.length) {
    console.error(`${label}: extra journey domains (not on slide 90):`, extraInJourney.join(', '));
    hasError = true;
  }

  for (const id of EXPECTED_DOMAINS) {
    const entry = data.journeys[id];
    if (!entry) continue;
    for (const key of JOURNEY_STRING_KEYS) {
      if (typeof entry[key] !== 'string' || entry[key].trim().length === 0) {
        console.error(`${label}: journeys.${id}.${key} must be non-empty string`);
        hasError = true;
      }
    }
    if (!Array.isArray(entry.recommendedSlideIds) || entry.recommendedSlideIds.length < 1) {
      console.error(`${label}: journeys.${id}.recommendedSlideIds must be non-empty array`);
      hasError = true;
    }
  }

  if (!hasError) {
    console.log(`${label}: OK (${journeyKeys.length} domains)`);
  }
  return !hasError;
}

const ltChoiceIds = choiceIdsFromModules(join(dataDir, 'modules.json'));
const enMod = loadJson(join(dataDir, 'modules-en-m7-m9.json'));
const enSlide = enMod.modules?.find((m) => m.id === 9)?.slides?.find((s) => s.id === 90);
const enChoiceIds = (enSlide?.content?.journeyChoices ?? []).map((c) => c.id);

if (enChoiceIds.length && enChoiceIds.sort().join() !== [...ltChoiceIds].sort().join()) {
  console.error('EN M9/90 journeyChoices ids differ from LT');
  process.exit(1);
}

const choiceIds = ltChoiceIds;
const missingExpected = EXPECTED_DOMAINS.filter((id) => !choiceIds.includes(id));
if (missingExpected.length) {
  console.error('M9/90 journeyChoices missing expected domains:', missingExpected.join(', '));
  process.exit(1);
}

const ltOk = validateJourneyFile(join(dataDir, 'modules-journey-m9.json'), choiceIds, 'modules-journey-m9.json');
const enOk = validateJourneyFile(
  join(dataDir, 'modules-journey-en-m9.json'),
  choiceIds,
  'modules-journey-en-m9.json',
);

if (!ltOk || !enOk) {
  console.error('\nM9 journey validation: FAIL');
  process.exit(1);
}

console.log('\nM9 journey validation: OK');
process.exit(0);
