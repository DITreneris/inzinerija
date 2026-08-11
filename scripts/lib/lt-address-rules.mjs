/**
 * LT address form (`tu`, never `Jūs`) + barbarism rules.
 *
 * Why this exists: `m79-language-rules.mjs` checked five literal patterns
 * (`JŪSŲ`, `jūsų`, `galite`, `Paspauskite`, `Įrašykite`), so every other
 * second-person-plural verb passed the gate — that is how `Kai tiriate`,
 * `Kai matuojate` and `Gaunate RFP` survived in M7/M10/M11.
 *
 * A pure suffix rule is not possible: the noun locative `audite`, `rezultate`,
 * `sertifikate` and the instrumental `formuluote` end exactly like a 2nd-person
 * plural verb. So the reliable suffixes (`-kite`, `-tumėte`) are matched as
 * patterns and the ambiguous indicative forms are an explicit list.
 */

/**
 * Plural imperative (`-kite`) and subjunctive (`-tumėte`) are unambiguous.
 *
 * `\b` is ASCII-only, so it would split `įsigykite` into `sigykite`; the
 * boundaries are spelled out with the Lithuanian letter class instead.
 */
const LT_LETTER = 'a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ';
// Reflexive `-kitės` / `-tumėtės` too: `Dalinkitės su komanda` sat in a component
// fallback because the suffix list only had the non-reflexive forms.
export const LT_2PL_SUFFIX_PATTERN = new RegExp(
  `(?<![${LT_LETTER}])[${LT_LETTER}]{2,}(?:kite|kitės|tumėte|tumėtės)(?![${LT_LETTER}])`,
  'gi'
);

/** Whole-word matcher that respects Lithuanian diacritics. */
export function ltWordPattern(word) {
  return new RegExp(`(?<![${LT_LETTER}])${word}(?![${LT_LETTER}])`, 'gi');
}

/** High-frequency indicative / past 2nd-person-plural forms used in this domain. */
export const LT_2PL_VERBS = [
  'galite', 'turite', 'norite', 'matote', 'žinote', 'esate', 'darote', 'dirbate',
  'naudojate', 'gaunate', 'kuriate', 'jungiate', 'tiriate', 'matuojate',
  'ieškote', 'prašote', 'rašote', 'skaitote', 'klausiate', 'pradedate',
  'baigiate', 'pasirenkate', 'keičiate', 'pakeičiate', 'patikrinate',
  'tikrinate', 'mapinate', 'renkate', 'vedate', 'kopijuojate', 'siunčiate',
  'planuojate', 'vertinate', 'analizuojate', 'aprašote', 'įvedate',
  'matysite', 'naudosite', 'rasite', 'gausite', 'pamatysite', 'galėsite',
  'turėsite', 'sužinosite', 'išmoksite', 'pradėsite', 'baigsite',
  'buvote', 'sutarėte', 'prašėte', 'pakeitėte', 'padarėte', 'gavote',
  'matėte', 'norėjote', 'bandėte', 'radote',
];

/** Formal pronouns. */
export const LT_FORMAL_PRONOUNS = [/\bJŪSŲ\b/g, /\bjūsų\b/gi, /\bJūs\b/g, /\bJums\b/g, /\bJumis\b/g];

/**
 * Words that match a 2PL shape but are not verbs, plus English tokens that
 * legitimately appear inside LT copy.
 */
export const LT_2PL_ALLOWLIST = new Set([
  // LT noun locative / instrumental singular
  'audite', 'rezultate', 'sertifikate', 'formuluote', 'kontekste', 'projekte',
  'prompte', 'formate', 'variante', 'etape', 'segmente', 'komplekte',
  'dokumente', 'momente', 'punkte', 'aparate', 'plakate', 'startuolyje',
  // English tokens seen in LT copy
  'suite', 'white', 'write', 'quote', 'note', 'vote', 'delete', 'template',
  'update', 'validate', 'generate', 'create', 'iterate', 'rate', 'state',
  'late', 'private', 'accurate', 'separate', 'complete', 'concrete', 'date',
  'estimate', 'automate', 'evaluate', 'communicate', 'elite', 'invite',
  'unite', 'website', 'favorite', 'corporate', 'candidate', 'moderate',
  'aggregate', 'duplicate', 'escalate', 'translate', 'site', 'cite',
]);

/**
 * Non-normative forms and barbarisms with their preferred replacement.
 *
 * Built through `ltWordPattern` for the same reason as the 2PL rules: `\b` never
 * matches before `į`, so a literal `/\bįtakoja\b/` silently matches nothing and
 * the rule looks clean while the barbarism is still in the copy.
 */
export const LT_BARBARISMS = [
  [ltWordPattern('[iį]takoj[a-ząčęėįšųūž]*'), 'įtakoti → turėti įtakos / įtakingas'],
  [ltWordPattern('pilnai'), 'pilnai → visiškai / visai'],
  // „sekantis“ = einantis iš paskos, ne „next“; abu kamienai: sekant- / sekanč-.
  [ltWordPattern('sekan[tč][a-ząčęėįšųūž]*'), 'sekantis → kitas / tolesnis'],
  [ltWordPattern('pasekoje'), 'pasekoje → dėl to'],
  [ltWordPattern('išdavoje'), 'išdavoje → todėl'],
  [ltWordPattern('apart'), 'apart → išskyrus'],
  [ltWordPattern('pritaikinti'), 'pritaikinti → pritaikyti'],
  [ltWordPattern('įvykdinti'), 'įvykdinti → įvykdyti'],
  [
    ltWordPattern(
      '(?:padauginki|daryki|imki|rašyki|skaityki|tikrinki|pasirinki|paleiski|kopijuoki|žiūrėki|klausyki)'
    ),
    '-ki imperatyvas → be -i (padaugink)',
  ],
  [
    ltWordPattern(
      'ne\\s+(?:spėliok|daryk|rašyk|klausk|pamiršk|kopijuok|naudok|leisk|bandyk|siųsk|dėk)'
    ),
    'ne + veiksmažodis rašomas kartu (nespėliok)',
  ],
];

/** All address-form findings in one string. */
export function findLtAddressViolations(value) {
  const out = [];

  for (const re of LT_FORMAL_PRONOUNS) {
    for (const m of value.matchAll(re)) out.push({ rule: 'lt_formal_pronoun', hit: m[0] });
  }

  for (const m of value.matchAll(LT_2PL_SUFFIX_PATTERN)) {
    if (LT_2PL_ALLOWLIST.has(m[0].toLowerCase())) continue;
    out.push({ rule: 'lt_2pl_imperative', hit: m[0] });
  }

  for (const verb of LT_2PL_VERBS) {
    for (const m of value.matchAll(ltWordPattern(verb))) {
      if (LT_2PL_ALLOWLIST.has(m[0].toLowerCase())) continue;
      out.push({ rule: 'lt_2pl_verb', hit: m[0] });
    }
  }

  return out;
}

/** All barbarism findings in one string. */
export function findLtBarbarisms(value) {
  const out = [];
  for (const [re, label] of LT_BARBARISMS) {
    for (const m of value.matchAll(re)) out.push({ rule: 'lt_barbarism', hit: m[0], detail: label });
  }
  return out;
}
