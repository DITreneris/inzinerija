/**
 * M4 prompt-mode simulator – LT/EN labels and generated artefact copy.
 */

import {
  type ErrorCaseOutcomeKind,
  type GeneratedPromptModeRuleParts,
  type PromptModeId,
  type PromptModeScenarioId,
  type QualitativeTradeOffs,
  type TradeOffTone,
  getMismatchReasonKey,
  getTradeOffs,
  recommendMode,
} from './m4PromptModeModel';

export type M4PromptModeLocale = 'lt' | 'en';

export interface PromptModeScenarioCopy {
  id: PromptModeScenarioId;
  label: string;
  description: string;
  stakeLabel: string;
}

export interface PromptModeModeCopy {
  id: PromptModeId;
  label: string;
  description: string;
  short: string;
}

export function getPromptModeUiLabels(locale: M4PromptModeLocale) {
  if (locale === 'en') {
    return {
      regionAria: 'Prompt mode simulator: choose scenario and prompt mode',
      scenarioLegend: 'Choose a business scenario',
      modeLegend: 'Prompt mode',
      recommendHeading: 'Recommended mode',
      bestFit: 'Best fit',
      mismatch: 'Reconsider',
      useRecommended: 'Use recommended mode',
      tradeOffHeading: 'Trade-offs (qualitative)',
      speed: 'Speed',
      hallucinationRisk: 'Hallucination risk',
      errorTiming: 'When a weak prompt shows',
      testError: 'Test a failure case',
      artefactHeading: 'Prompt-mode rule for your work',
      artefactHint:
        'Copy this rule into your RAG / Deep research notes or Module 6 project plan.',
      copyLabel: 'Copy prompt-mode rule',
      copiedLabel: 'Copied',
      takeaway:
        'Agentic is not a maturity ladder above methodical. Choose the mode by whether you need live sources and how strict the output method must be.',
      matrixHeading: 'Where this sits on the axes',
      matrixLiveData: 'Live / external data',
      matrixStructure: 'Method / format strictness',
      matrixNone: 'Not needed',
      matrixNeeded: 'Needed',
      matrixLower: 'Lower',
      matrixHigher: 'Higher',
      matrixRecommended: 'Recommended for this scenario',
      timingHeading: 'When a weak choice shows up',
      timingPhase: {
        before_tools: 'Before tools',
        at_search: 'At search',
        after_draft: 'After draft',
        never_checked: 'Never checked',
      } satisfies Record<QualitativeTradeOffs['errorTiming'], string>,
      stakeChip: {
        low: 'Low risk',
        mid: 'Live data',
        high: 'Live + structure',
      },
      tone: {
        low: 'Lower',
        medium: 'Medium',
        high: 'Higher',
      } satisfies Record<TradeOffTone, string>,
      errorTimingLabel: {
        before_tools: 'Structure catches gaps before any search',
        at_search: 'Gaps show when Browse / Search is missing or weak',
        after_draft: 'You see gaps after gather + analysis draft',
        never_checked: 'No frame – errors may look fluent and stay unchecked',
      } satisfies Record<QualitativeTradeOffs['errorTiming'], string>,
    };
  }
  return {
    regionAria:
      'Promptų režimo simuliatorius: pasirink scenarijų ir promptų režimą',
    scenarioLegend: 'Pasirink verslo scenarijų',
    modeLegend: 'Promptų režimas',
    recommendHeading: 'Rekomenduojamas režimas',
    bestFit: 'Tinkamiausias',
    mismatch: 'Persvarstyk',
    useRecommended: 'Naudok rekomenduojamą režimą',
    tradeOffHeading: 'Kompromisai (kokybiniai)',
    speed: 'Greitis',
    hallucinationRisk: 'Haliucinacijos rizika',
    errorTiming: 'Kada matoma silpna užklausa',
    testError: 'Patikrink klaidos atvejį',
    artefactHeading: 'Promptų režimo taisyklė darbui',
    artefactHint:
      'Nukopijuok šią taisyklę į RAG / Deep research užrašus arba Modulio 6 projekto planą.',
    copyLabel: 'Kopijuoti režimo taisyklę',
    copiedLabel: 'Nukopijuota',
    takeaway:
      'Agentinis nėra brandos kopėčios virš metodinio. Režimą rink pagal tai, ar reikia gyvų šaltinių, ir kiek griežta turi būti metodika.',
    matrixHeading: 'Kur tu esi ašyse',
    matrixLiveData: 'Gyvi / išoriniai duomenys',
    matrixStructure: 'Metodikos / formato griežtumas',
    matrixNone: 'Nereikia',
    matrixNeeded: 'Reikia',
    matrixLower: 'Žemesnis',
    matrixHigher: 'Aukštesnis',
    matrixRecommended: 'Rekomenduojama šiam scenarijui',
    timingHeading: 'Kada pasirodo silpnas pasirinkimas',
    timingPhase: {
      before_tools: 'Prieš įrankius',
      at_search: 'Paieškoje',
      after_draft: 'Po juodraščio',
      never_checked: 'Be patikros',
    } satisfies Record<QualitativeTradeOffs['errorTiming'], string>,
    stakeChip: {
      low: 'Maža rizika',
      mid: 'Gyvi duomenys',
      high: 'Gyvi + struktūra',
    },
    tone: {
      low: 'Mažesnis',
      medium: 'Vidutinis',
      high: 'Didesnis',
    } satisfies Record<TradeOffTone, string>,
    errorTimingLabel: {
      before_tools: 'Struktūra pagauna spragas prieš bet kokią paiešką',
      at_search:
        'Spragos matomos, kai trūksta Browse / Search arba jis silpnas',
      after_draft: 'Spragas matai po surinkimo ir analizės juodraščio',
      never_checked:
        'Be rėmų – klaidos gali skambėti sklandžiai ir likti nepatikrintos',
    } satisfies Record<QualitativeTradeOffs['errorTiming'], string>,
  };
}

export function getPromptModeScenarios(
  locale: M4PromptModeLocale
): PromptModeScenarioCopy[] {
  if (locale === 'en') {
    return [
      {
        id: 'known_swot',
        label: 'SWOT from known facts',
        description:
          'You already have sector facts and need a structured SWOT / report.',
        stakeLabel: 'No live data · higher structure',
      },
      {
        id: 'live_top10',
        label: 'Live TOP 10 list',
        description:
          'Find current companies with revenue and contacts from the web.',
        stakeLabel: 'Live data needed · lower structure',
      },
      {
        id: 'gather_then_analyze',
        label: 'Gather, then analyse',
        description:
          'Collect fresh facts first, then produce a structured SWOT report.',
        stakeLabel: 'Live data needed · higher structure',
      },
    ];
  }
  return [
    {
      id: 'known_swot',
      label: 'SWOT iš turimų faktų',
      description:
        'Jau turi sektoriaus faktus ir reikia struktūruotos SWOT / ataskaitos.',
      stakeLabel: 'Be gyvų duomenų · aukštesnė metodika',
    },
    {
      id: 'live_top10',
      label: 'Gyvas TOP 10 sąrašas',
      description:
        'Surasti aktualias įmones su pajamomis ir kontaktais iš interneto.',
      stakeLabel: 'Reikia gyvų duomenų · žemesnė metodika',
    },
    {
      id: 'gather_then_analyze',
      label: 'Surinkti, tada analizuoti',
      description:
        'Pirma surinkti šviežius faktus, tada pateikti struktūruotą SWOT ataskaitą.',
      stakeLabel: 'Reikia gyvų duomenų · aukštesnė metodika',
    },
  ];
}

export function getPromptModes(
  locale: M4PromptModeLocale
): PromptModeModeCopy[] {
  if (locale === 'en') {
    return [
      {
        id: 'methodical',
        label: 'Methodical only',
        short: 'Methodical',
        description:
          'Role + steps + format. AI writes from your method – no search required.',
      },
      {
        id: 'agentive',
        label: 'Agentic only',
        short: 'Agentic',
        description:
          'Ask AI to search, gather and use tools (Browse / Search must be on).',
      },
      {
        id: 'sequence',
        label: 'Agentic → methodical',
        short: 'Sequence',
        description:
          'First gather live facts with tools, then analyse inside a clear method frame.',
      },
      {
        id: 'vague_ask',
        label: 'Loose question',
        short: 'Loose',
        description:
          '“Analyse the market” with no method and no tools – a weak teaching mode.',
      },
    ];
  }
  return [
    {
      id: 'methodical',
      label: 'Tik metodinis',
      short: 'Metodinis',
      description:
        'Rolė + žingsniai + formatas. DI rašo pagal tavo metodiką – paieška nebūtina.',
    },
    {
      id: 'agentive',
      label: 'Tik agentinis',
      short: 'Agentinis',
      description:
        'Prašyk DI ieškoti, rinkti ir naudoti įrankius (Browse / Search turi būti įjungti).',
    },
    {
      id: 'sequence',
      label: 'Agentinis → metodinis',
      short: 'Seka',
      description:
        'Pirma surink gyvus faktus su įrankiais, tada analizuok aiškiame metodikos rėme.',
    },
    {
      id: 'vague_ask',
      label: 'Laisvas klausimas',
      short: 'Laisvas',
      description:
        '„Išanalizuok rinką“ be metodikos ir be įrankių – mokomasis silpnas režimas.',
    },
  ];
}

function modeLabel(locale: M4PromptModeLocale, modeId: PromptModeId): string {
  return getPromptModes(locale).find((m) => m.id === modeId)?.label ?? modeId;
}

function scenarioLabel(
  locale: M4PromptModeLocale,
  scenarioId: PromptModeScenarioId
): string {
  return (
    getPromptModeScenarios(locale).find((s) => s.id === scenarioId)?.label ??
    scenarioId
  );
}

export function getMismatchReasonText(
  locale: M4PromptModeLocale,
  scenarioId: PromptModeScenarioId,
  selected: PromptModeId
): string | null {
  const key = getMismatchReasonKey(scenarioId, selected);
  if (!key) return null;
  const recommended = modeLabel(locale, recommendMode(scenarioId));
  if (locale === 'en') {
    switch (key) {
      case 'over_engineered':
        return `Too heavy a pipeline for this task. Recommended: ${recommended}.`;
      case 'wrong_tooling':
        return `Wrong tooling for the data need. Recommended: ${recommended}.`;
      case 'under_controlled':
        return `This mode under-frames the task. Recommended: ${recommended}.`;
    }
  }
  switch (key) {
    case 'over_engineered':
      return `Per sunki seka šiai užduočiai. Rekomenduojama: ${recommended}.`;
    case 'wrong_tooling':
      return `Netinkamas įrankių / duomenų pasirinkimas. Rekomenduojama: ${recommended}.`;
    case 'under_controlled':
      return `Šis režimas per silpnai įrėmina užduotį. Rekomenduojama: ${recommended}.`;
  }
}

export function getErrorCaseOutcomeText(
  locale: M4PromptModeLocale,
  kind: ErrorCaseOutcomeKind
): { title: string; body: string; success: boolean } {
  if (locale === 'en') {
    switch (kind) {
      case 'structured_ok':
        return {
          title: 'Structure catches inventing',
          body: 'The method frame forces sections and “I don’t know” gaps before any search. Hallucinated numbers are harder to hide.',
          success: true,
        };
      case 'search_required':
        return {
          title: 'Search must be on',
          body: 'Without Browse / Search the agentic ask invents a plausible TOP list. With tools on, you can demand sources.',
          success: true,
        };
      case 'pipeline_ok':
        return {
          title: 'Gather then frame',
          body: 'Live facts land first; the methodical second step turns them into a usable SWOT instead of a loose essay.',
          success: true,
        };
      case 'unchecked_hallucination':
        return {
          title: 'Fluent but unchecked',
          body: 'A loose question often returns confident text with no sources and no required sections. Errors may never surface.',
          success: false,
        };
    }
  }
  switch (kind) {
    case 'structured_ok':
      return {
        title: 'Struktūra pagauna išgalvojimą',
        body: 'Metodikos rėmas reikalauja skyrių ir „Nežinau“ spragų prieš bet kokią paiešką. Išgalvotus skaičius sunkiau paslėpti.',
        success: true,
      };
    case 'search_required':
      return {
        title: 'Paieška turi būti įjungta',
        body: 'Be Browse / Search agentinis prašymas išgalvoja įtikinamą TOP sąrašą. Su įrankiais gali reikalauti šaltinių.',
        success: true,
      };
    case 'pipeline_ok':
      return {
        title: 'Surink, tada įrėmink',
        body: 'Pirma gyvi faktai; antras metodinis žingsnis paverčia juos naudojama SWOT, o ne laisvu rašiniu.',
        success: true,
      };
    case 'unchecked_hallucination':
      return {
        title: 'Sklandu, bet nepatikrinta',
        body: 'Laisvas klausimas dažnai grąžina užtikrintą tekstą be šaltinių ir be privalomų skyrių. Klaidos gali niekada neiškilti.',
        success: false,
      };
  }
}

function conditionLine(
  locale: M4PromptModeLocale,
  conditionKey: string
): string {
  if (locale === 'en') {
    switch (conditionKey) {
      case 'have_facts_need_structure':
        return 'Use when you already have facts and need a fixed report / SWOT frame – no live search.';
      case 'need_live_list':
        return 'Use when you must gather current entities from the web and cite sources.';
      case 'gather_then_frame':
        return 'Use when you need fresh facts first, then a structured analysis of those facts.';
      default:
        return 'Use when the data need and structure need match this mode.';
    }
  }
  switch (conditionKey) {
    case 'have_facts_need_structure':
      return 'Naudok, kai jau turi faktus ir reikia fiksuoto ataskaitos / SWOT rėmo – be gyvos paieškos.';
    case 'need_live_list':
      return 'Naudok, kai reikia surinkti aktualius objektus iš interneto ir cituoti šaltinius.';
    case 'gather_then_frame':
      return 'Naudok, kai pirma reikia šviežių faktų, tada – struktūruotos tų faktų analizės.';
    default:
      return 'Naudok, kai duomenų ir metodikos poreikis atitinka šį režimą.';
  }
}

function checkLine(locale: M4PromptModeLocale, modeId: PromptModeId): string {
  if (locale === 'en') {
    switch (modeId) {
      case 'methodical':
        return 'Required sections present; no invented numbers; “I don’t know” when facts are missing.';
      case 'agentive':
        return 'Browse / Search is on; every row has a source; no invented contacts.';
      case 'sequence':
        return 'Gather step cites sources; analysis step only uses gathered facts + required SWOT frame.';
      case 'vague_ask':
        return 'Replace with a real mode – loose questions skip both sources and structure.';
    }
  }
  switch (modeId) {
    case 'methodical':
      return 'Yra privalomi skyriai; nėra išgalvotų skaičių; „Nežinau“, kai faktų trūksta.';
    case 'agentive':
      return 'Browse / Search įjungta; kiekviena eilutė turi šaltinį; nėra išgalvotų kontaktų.';
    case 'sequence':
      return 'Surinkimo žingsnis cituoja šaltinius; analizė naudoja tik surinktus faktus + SWOT rėmą.';
    case 'vague_ask':
      return 'Pakeisk į tikrą režimą – laisvas klausimas praleidžia ir šaltinius, ir struktūrą.';
  }
}

function nextStepLine(locale: M4PromptModeLocale): string {
  if (locale === 'en') {
    return 'Next: apply in RAG practice / Deep research, then reuse in the Module 6 project plan.';
  }
  return 'Toliau: pritaikyk RAG praktikoje / Deep research, tada naudok Modulio 6 projekto plane.';
}

/**
 * Generated artefact for RAG notes / M6 project plan.
 */
export function formatPromptModeArtefact(
  locale: M4PromptModeLocale,
  parts: GeneratedPromptModeRuleParts
): string {
  const mode = modeLabel(locale, parts.modeId);
  const scenario = scenarioLabel(locale, parts.scenarioId);
  const condition = conditionLine(locale, parts.conditionKey);
  const check = checkLine(locale, parts.modeId);
  const next = nextStepLine(locale);
  const trade = getTradeOffs(parts.modeId);
  const ui = getPromptModeUiLabels(locale);

  if (locale === 'en') {
    return [
      `Prompt-mode rule (${scenario}):`,
      `1) Mode: ${mode}.`,
      `2) Condition: ${condition}`,
      `3) Check: ${check}`,
      `4) Next step: ${next}`,
      `Note: ${ui.errorTiming} – ${ui.errorTimingLabel[trade.errorTiming]}.`,
    ].join('\n');
  }
  return [
    `Promptų režimo taisyklė (${scenario}):`,
    `1) Režimas: ${mode}.`,
    `2) Sąlyga: ${condition}`,
    `3) Patikra: ${check}`,
    `4) Kitas žingsnis: ${next}`,
    `Pastaba: ${ui.errorTiming} – ${ui.errorTimingLabel[trade.errorTiming]}.`,
  ].join('\n');
}
