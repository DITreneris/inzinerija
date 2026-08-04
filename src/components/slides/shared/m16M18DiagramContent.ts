/**
 * M16–18 signature diagram labels + Shell explanations (LT/EN).
 * Keys: m16_delivery_gates · m16_vsr_maturity · m16_user_cycle · m18_packet_stack · m18_diff_ritual
 */
import type { StepExplanation } from './stepExplanations';
import type { M10Locale } from './m10DiagramContent';

export type M16Locale = M10Locale;

type StepLite = { label: string; desc: string };

function chrome(
  locale: M16Locale,
  lt: {
    title: string;
    hint: string;
    aria: string;
    regionAria: string;
    enlargeLabel: string;
  },
  en: typeof lt
) {
  const L = locale === 'en' ? en : lt;
  return {
    ...L,
    youAreHere: locale === 'en' ? 'You are here:' : 'Tu esi čia:',
    navAria: locale === 'en' ? 'Step selection' : 'Žingsnių pasirinkimas',
    stepAria: (i: number, title: string) =>
      locale === 'en'
        ? `Step ${i + 1}: ${title}`
        : `Žingsnis ${i + 1}: ${title}`,
  };
}

/* —— m16_delivery_gates (16.3) —— */
const GATES_LT: StepLite[] = [
  { label: 'Problema', desc: 'Kas kenčia' },
  { label: 'Naudotojas', desc: 'Kam' },
  { label: 'Vertė', desc: 'Pokytis' },
  { label: '1 funkcija', desc: 'Pagrindinė funkcija' },
  { label: 'Prototipas', desc: 'Brief / MVP' },
  { label: 'Testas', desc: 'Patikra' },
];
const GATES_EN: StepLite[] = [
  { label: 'Problem', desc: 'Who hurts' },
  { label: 'User', desc: 'For whom' },
  { label: 'Value', desc: 'Outcome' },
  { label: '1 feature', desc: 'Core feature' },
  { label: 'Prototype', desc: 'Brief / MVP' },
  { label: 'Test', desc: 'Check' },
];

export function getM16DeliveryGatesSteps(locale: M16Locale) {
  return locale === 'en' ? GATES_EN : GATES_LT;
}

export function getM16DeliveryGatesExplanations(
  locale: M16Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: '1. Problem',
        body: 'Start with a concrete user pain in a situation – not “I want an app”.',
      },
      {
        title: '2. User',
        body: 'Name one primary user. If you need three personas, the scope is too wide.',
      },
      {
        title: '3. Value',
        body: 'Value = change for the person (time, clarity, less stress) – not a button name.',
      },
      {
        title: '4. One feature',
        body: 'One Must function (+ at most 1–2 helpers). Everything else is Later or Won’t.',
      },
      {
        title: '5. Prototype',
        body: 'In Module 16 you finish with a brief – Cursor build is Module 18.',
      },
      {
        title: '6. Test',
        body: 'A success criterion you can check in under 2 minutes. No criterion = still an idea.',
      },
    ];
  }
  return [
    {
      title: '1. Problema',
      body: 'Pradėk nuo konkrečios naudotojo skausmo situacijos – ne „noriu app“.',
    },
    {
      title: '2. Naudotojas',
      body: 'Įvardyk vieną pagrindinį naudotoją. Jei reikia trijų personų – apimtis per plati.',
    },
    {
      title: '3. Vertė',
      body: 'Vertė = pokytis žmogui (laikas, aiškumas, mažiau streso) – ne mygtuko pavadinimas.',
    },
    {
      title: '4. 1 funkcija',
      body: 'Viena Must funkcija (+ max 1–2 palaikančios). Visa kita – Later arba Won’t.',
    },
    {
      title: '5. Prototipas',
      body: 'Modulyje 16 baigiame brief’u – Cursor build yra Modulyje 18.',
    },
    {
      title: '6. Testas',
      body: 'Sėkmės kriterijus, kurį patikrinsi per <2 min. Be kriterijaus – vis dar idėja.',
    },
  ];
}

export function getM16DeliveryGatesChrome(locale: M16Locale) {
  return chrome(
    locale,
    {
      title: 'Kelio žingsniai',
      hint: 'Paspausk žingsnį – paaiškinimas apačioje',
      aria: 'Šeši žingsniai: problema, naudotojas, vertė, 1 funkcija, prototipas, testas',
      regionAria: 'Kelio žingsniai – šeši žingsniai',
      enlargeLabel: 'Modulis 16 – kelio žingsniai',
    },
    {
      title: 'Path steps',
      hint: 'Tap a step – explanation below',
      aria: 'Six steps: problem, user, value, one feature, prototype, test',
      regionAria: 'Path steps – six steps',
      enlargeLabel: 'Module 16 – path steps',
    }
  );
}

/* —— m16_vsr_maturity (16.101) —— */
const VSR_LT: StepLite[] = [
  { label: 'Vibe', desc: 'Idėja / jausmas' },
  { label: 'Skeleton', desc: 'Ciklas + ribos' },
  { label: 'Refinement', desc: 'Brief brandumas' },
];
const VSR_EN: StepLite[] = [
  { label: 'Vibe', desc: 'Idea / feel' },
  { label: 'Skeleton', desc: 'Cycle + bounds' },
  { label: 'Refinement', desc: 'Brief maturity' },
];

export function getM16VsrMaturitySteps(locale: M16Locale) {
  return locale === 'en' ? VSR_EN : VSR_LT;
}

export function getM16VsrMaturityExplanations(
  locale: M16Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: '1. Vibe',
        body: 'Capture the direction in plain language. Do not polish copy before the cycle exists.',
      },
      {
        title: '2. Skeleton',
        body: 'Lock user cycle + Must/Won’t. Skipping Skeleton makes Refinement cosmetic.',
      },
      {
        title: '3. Refinement',
        body: 'Sharpen the brief fields. Still not a Cursor build – that is Module 18.',
      },
    ];
  }
  return [
    {
      title: '1. Vibe',
      body: 'Užfiksuok kryptį paprasta kalba. Negludink teksto, kol nėra ciklo.',
    },
    {
      title: '2. Skeleton',
      body: 'Užrakink naudotojo ciklą + Must/Won’t. Be Skeleton Refinement lieka kosmetika.',
    },
    {
      title: '3. Refinement',
      body: 'Smailink brief laukus. Vis dar ne Cursor build – tai Modulis 18.',
    },
  ];
}

export function getM16VsrMaturityChrome(locale: M16Locale) {
  return chrome(
    locale,
    {
      title: 'Brief brandinimo žingsniai',
      hint: 'Paspausk pakopą – paaiškinimas apačioje',
      aria: 'Trys brief brandinimo žingsniai: Vibe, Skeleton, Refinement',
      regionAria: 'Brief brandinimo žingsniai – trys pakopos',
      enlargeLabel: 'Modulis 16 – brief brandinimo žingsniai',
    },
    {
      title: 'Brief maturity steps',
      hint: 'Tap a rung – explanation below',
      aria: 'Three brief maturity steps: Vibe, Skeleton, Refinement',
      regionAria: 'Brief maturity steps – three rungs',
      enlargeLabel: 'Module 16 – brief maturity steps',
    }
  );
}

/* —— m16_user_cycle (16.16 / 18.3) —— */
const CYCLE_LT: StepLite[] = [
  { label: 'Triggeris', desc: 'Kas paleidžia' },
  { label: 'Įvestis', desc: 'Ką įveda' },
  { label: 'Veiksmas', desc: 'Ką daro sistema' },
  { label: 'Rezultatas', desc: 'Ką mato' },
  { label: 'Kitas', desc: 'Kas toliau' },
];
const CYCLE_EN: StepLite[] = [
  { label: 'Trigger', desc: 'What starts it' },
  { label: 'Input', desc: 'What they enter' },
  { label: 'Action', desc: 'What the system does' },
  { label: 'Result', desc: 'What they see' },
  { label: 'Next', desc: 'What follows' },
];

export function getM16UserCycleSteps(locale: M16Locale) {
  return locale === 'en' ? CYCLE_EN : CYCLE_LT;
}

export function getM16UserCycleExplanations(
  locale: M16Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: '1. Trigger',
        body: 'When does the user start? Morning, meeting, inbox overflow – be concrete.',
      },
      {
        title: '2. Input',
        body: 'What do they bring in? Tasks, notes, a short list – keep it minimal.',
      },
      {
        title: '3. Action',
        body: 'The one Must function of the product – not a feature catalogue.',
      },
      {
        title: '4. Result',
        body: 'Visible outcome in under 2 minutes. If they cannot see it, the cycle is incomplete.',
      },
      {
        title: '5. Next',
        body: 'What happens after? Loop back tomorrow, share, or stop. This is UX, not a feature list.',
      },
    ];
  }
  return [
    {
      title: '1. Triggeris',
      body: 'Kada naudotojas pradeda? Rytas, susitikimas, perpildytas inbox – būk konkretus.',
    },
    {
      title: '2. Įvestis',
      body: 'Ką atsineša? Užduotis, užrašus, trumpą sąrašą – laikyk minimaliai.',
    },
    {
      title: '3. Veiksmas',
      body: 'Viena Must funkcija produkte – ne funkcijų katalogas.',
    },
    {
      title: '4. Rezultatas',
      body: 'Matomas rezultatas per <2 min. Jei nemato – ciklas nepilnas.',
    },
    {
      title: '5. Kitas',
      body: 'Kas toliau? Rytojaus kilpa, dalijimasis ar stop. Tai UX, ne feature list.',
    },
  ];
}

export function getM16UserCycleChrome(locale: M16Locale) {
  return chrome(
    locale,
    {
      title: 'Naudotojo ciklas',
      hint: 'Paspausk žingsnį – paaiškinimas apačioje',
      aria: 'Penki ciklo žingsniai su grįžimu: triggeris, įvestis, veiksmas, rezultatas, kitas',
      regionAria: 'Naudotojo ciklas – penki žingsniai',
      enlargeLabel: 'Modulis 16 – naudotojo ciklas',
    },
    {
      title: 'User cycle',
      hint: 'Tap a step – explanation below',
      aria: 'Five cycle steps with return: trigger, input, action, result, next',
      regionAria: 'User cycle – five steps',
      enlargeLabel: 'Module 16 – user cycle',
    }
  );
}

/* —— m18_packet_stack (18.12) —— */
const PACKET_LT: StepLite[] = [
  { label: 'mvp_brief.md', desc: 'Alias 01_MVP_BRIEF' },
  { label: 'user_flow.md', desc: '5–7 žingsniai' },
  { label: 'schema (opt.)', desc: '2–4 esybės' },
  { label: 'build_prompt.md', desc: 'Cursor pjūvis' },
  { label: 'PROJECT_RULES.md', desc: 'Ribos agentui' },
];
const PACKET_EN: StepLite[] = [
  { label: 'mvp_brief.md', desc: 'Alias 01_MVP_BRIEF' },
  { label: 'user_flow.md', desc: '5–7 steps' },
  { label: 'schema (opt.)', desc: '2–4 entities' },
  { label: 'build_prompt.md', desc: 'Cursor slice' },
  { label: 'PROJECT_RULES.md', desc: 'Agent bounds' },
];

export function getM18PacketStackSteps(locale: M16Locale) {
  return locale === 'en' ? PACKET_EN : PACKET_LT;
}

export function getM18PacketStackExplanations(
  locale: M16Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: '1. mvp_brief.md',
        body: 'Same artefact as Module 16 `01_MVP_BRIEF.md` – keep Must/Won’t and success criteria.',
      },
      {
        title: '2. user_flow.md',
        body: '5–7 steps with at least one error branch. Screens come from the flow.',
      },
      {
        title: '3. schema (optional)',
        body: '2–4 entities in plain language – or a table in the brief. Not a SQL course.',
      },
      {
        title: '4. build_prompt.md',
        body: 'Cursor-first vertical slice: one Must function, plan before code.',
      },
      {
        title: '5. PROJECT_RULES.md',
        body: 'Short rules in the repo root: Must/Won’t, Done, security, approve gate.',
      },
    ];
  }
  return [
    {
      title: '1. mvp_brief.md',
      body: 'Tas pats artefaktas kaip Modulio 16 `01_MVP_BRIEF.md` – Must/Won’t ir sėkmės kriterijus.',
    },
    {
      title: '2. user_flow.md',
      body: '5–7 žingsniai su bent viena klaidos atšaka. Ekranai – iš srauto.',
    },
    {
      title: '3. schema (optional)',
      body: '2–4 esybės paprasta kalba – arba lentelė brief’e. Ne SQL kursas.',
    },
    {
      title: '4. build_prompt.md',
      body: 'Cursor-first vertikalus pjūvis: viena Must fn, planas prieš kodą.',
    },
    {
      title: '5. PROJECT_RULES.md',
      body: 'Trumpos taisyklės repo šaknyje: Must/Won’t, Done, saugumas, approve gate.',
    },
  ];
}

export function getM18PacketStackChrome(locale: M16Locale) {
  return chrome(
    locale,
    {
      title: 'BUILD PACKET sluoksniai',
      hint: 'Paspausk failą – paaiškinimas apačioje',
      aria: 'Penki PACKET failų sluoksniai',
      regionAria: 'BUILD PACKET – penki sluoksniai',
      enlargeLabel: 'Modulis 18 – BUILD PACKET',
    },
    {
      title: 'BUILD PACKET layers',
      hint: 'Tap a file – explanation below',
      aria: 'Five PACKET file layers',
      regionAria: 'BUILD PACKET – five layers',
      enlargeLabel: 'Module 18 – BUILD PACKET',
    }
  );
}

/* —— m18_diff_ritual (18.201) —— */
const DIFF_LT: StepLite[] = [
  { label: 'Status', desc: 'Kas pakeista' },
  { label: 'Diff', desc: 'Perskaityk' },
  { label: 'Smoke', desc: 'Ar veikia' },
  { label: 'Commit', desc: 'Užfiksuok' },
  { label: 'Push', desc: 'Nuotolinė' },
];
const DIFF_EN: StepLite[] = [
  { label: 'Status', desc: 'What changed' },
  { label: 'Diff', desc: 'Read it' },
  { label: 'Smoke', desc: 'Does it run' },
  { label: 'Commit', desc: 'Lock it' },
  { label: 'Push', desc: 'Remote' },
];

export function getM18DiffRitualSteps(locale: M16Locale) {
  return locale === 'en' ? DIFF_EN : DIFF_LT;
}

export function getM18DiffRitualExplanations(
  locale: M16Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: '1. Status',
        body: 'See what AI (or you) changed. Prefer a clean working tree before a big AI edit – commit a working version first.',
      },
      {
        title: '2. Diff (magnifier)',
        body: '**Read the diff before commit.** Blind AI commits are the fastest way to vibe-debt.',
      },
      {
        title: '3. Smoke',
        body: 'Run the critical path once. Red = do not push.',
      },
      {
        title: '4. Commit',
        body: 'Commit only after diff + smoke. Message = what changed for the user.',
      },
      {
        title: '5. Push',
        body: 'Push after local proof. Rollback thought = previous commit.',
      },
    ];
  }
  return [
    {
      title: '1. Status',
      body: 'Pamatyk, ką pakeitė DI (ar tu). Prieš didesnį DI pakeitimą – commit veikiančios versijos.',
    },
    {
      title: '2. Diff (didinamas)',
      body: '**Perskaityk diff prieš commit.** Aklas DI commit – greičiausias kelias į vibe-debt.',
    },
    {
      title: '3. Smoke',
      body: 'Paleisk kritinį kelią vieną kartą. Raudona = nepushink.',
    },
    {
      title: '4. Commit',
      body: 'Commit tik po diff + smoke. Žinutė = kas pasikeitė naudotojui.',
    },
    {
      title: '5. Push',
      body: 'Push po lokalaus proof. Rollback mintis = ankstesnis commit.',
    },
  ];
}

export function getM18DiffRitualChrome(locale: M16Locale) {
  return chrome(
    locale,
    {
      title: 'Diff ritualas',
      hint: 'Paspausk žingsnį – paaiškinimas apačioje',
      aria: 'Penki Git saugos žingsniai: status, diff, smoke, commit, push',
      regionAria: 'Diff ritualas – penki žingsniai',
      enlargeLabel: 'Modulis 18 – diff ritualas',
    },
    {
      title: 'Diff ritual',
      hint: 'Tap a step – explanation below',
      aria: 'Five Git safety steps: status, diff, smoke, commit, push',
      regionAria: 'Diff ritual – five steps',
      enlargeLabel: 'Module 18 – diff ritual',
    }
  );
}

/* —— m18_launch_gates (18.19) — tollgate barriers, ≠ delivery corridor —— */
const LAUNCH_LT: StepLite[] = [
  { label: 'VEIKIA', desc: 'Lokalai' },
  { label: 'PATIKRINTA', desc: 'Smoke' },
  { label: 'APSAUGOTA', desc: 'Raktai' },
  { label: 'PALEISTA', desc: 'URL / proof' },
  { label: 'STEBIMA', desc: 'Logai' },
];
const LAUNCH_EN: StepLite[] = [
  { label: 'WORKS', desc: 'Local' },
  { label: 'CHECKED', desc: 'Smoke' },
  { label: 'PROTECTED', desc: 'Keys' },
  { label: 'LIVE', desc: 'URL / proof' },
  { label: 'WATCHED', desc: 'Logs' },
];

export function getM18LaunchGatesSteps(locale: M16Locale) {
  return locale === 'en' ? LAUNCH_EN : LAUNCH_LT;
}

export function getM18LaunchGatesExplanations(
  locale: M16Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: '1. Works',
        body: 'App starts locally. Without this gate, do not talk about deploy.',
      },
      {
        title: '2. Checked',
        body: 'Smoke + critical path green. “Looks fine” is not enough.',
      },
      {
        title: '3. Protected (barrier)',
        body: '**Do not skip:** `.gitignore`, no keys in code/prompts, `.env.example` only.',
      },
      {
        title: '4. Live',
        body: 'Public URL **or** documented local proof + GitHub. Soft DoD accepts either.',
      },
      {
        title: '5. Watched',
        body: 'You know where logs/errors show up after launch. Rollback thought ready.',
      },
    ];
  }
  return [
    {
      title: '1. Veikia',
      body: 'App pasileidžia lokalai. Be šio vartų – nekalbėk apie deploy.',
    },
    {
      title: '2. Patikrinta',
      body: 'Smoke + kritinis kelias žalias. „Atrodo veikia“ – nepakanka.',
    },
    {
      title: '3. Apsaugota (barjeras)',
      body: '**Nepraleisk:** `.gitignore`, raktai ne kode/promptuose, tik `.env.example`.',
    },
    {
      title: '4. Paleista',
      body: 'Viešas URL **arba** dokumentuotas lokalus proof + GitHub. Soft DoD priima abu.',
    },
    {
      title: '5. Stebima',
      body: 'Žinai, kur matyti logus/klaidas po paleidimo. Rollback mintis paruošta.',
    },
  ];
}

export function getM18LaunchGatesChrome(locale: M16Locale) {
  return chrome(
    locale,
    {
      title: 'Paleidimo vartai',
      hint: 'Paspausk vartus – paaiškinimas apačioje',
      aria: 'Penki paleidimo vartai: veikia, patikrinta, apsaugota, paleista, stebima',
      regionAria: 'Paleidimo vartai – penki žingsniai',
      enlargeLabel: 'Modulis 18 – paleidimo vartai',
    },
    {
      title: 'Launch gates',
      hint: 'Tap a gate – explanation below',
      aria: 'Five launch gates: works, checked, protected, live, watched',
      regionAria: 'Launch gates – five steps',
      enlargeLabel: 'Module 18 – launch gates',
    }
  );
}
