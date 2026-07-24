/**
 * M10 human-control simulator – LT/EN labels and generated artefact copy.
 */

import type { M10Locale } from './m10DiagramContent';
import {
  type ErrorCaseOutcomeKind,
  type GeneratedControlRuleParts,
  type HumanControlModeId,
  type HumanControlScenarioId,
  type QualitativeTradeOffs,
  type TradeOffTone,
  getMismatchReasonKey,
  getTradeOffs,
  recommendMode,
} from './m10HumanControlModel';

export interface HumanControlScenarioCopy {
  id: HumanControlScenarioId;
  label: string;
  description: string;
  stakeLabel: string;
}

export interface HumanControlModeCopy {
  id: HumanControlModeId;
  label: string;
  description: string;
  short: string;
}

export function getHumanControlUiLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      regionAria: 'Human control simulator: choose scenario and oversight mode',
      scenarioLegend: 'Choose a business scenario',
      modeLegend: 'Control mode',
      recommendHeading: 'Recommended mode',
      bestFit: 'Best fit',
      mismatch: 'Reconsider',
      useRecommended: 'Use recommended mode',
      tradeOffHeading: 'Trade-offs (qualitative)',
      speed: 'Speed',
      workload: 'Human workload',
      errorTiming: 'When an error is visible',
      testError: 'Test an error case',
      artefactHeading: 'Control rule for your brief',
      artefactHint:
        'Copy this rule into the workflow brief (slide 10.64, item 8).',
      copyLabel: 'Copy control rule',
      copiedLabel: 'Copied',
      takeaway:
        'Human oversight is not a maturity ladder to full autonomy. Choose the control by consequence and how hard it is to reverse a mistake.',
      matrixHeading: 'Where this sits on risk',
      matrixConsequence: 'Consequence',
      matrixReversibility: 'Reversibility',
      matrixLower: 'Lower',
      matrixHigher: 'Higher',
      matrixEasy: 'Easy to reverse',
      matrixHard: 'Hard to reverse',
      matrixRecommended: 'Recommended for this scenario',
      timingHeading: 'When the human steps in',
      timingPhase: {
        before_execution: 'Before action',
        at_exception: 'On exception',
        after_execution: 'After action',
        aggregate_only: 'Outcomes only',
      } satisfies Record<QualitativeTradeOffs['errorTiming'], string>,
      stakeChip: {
        low: 'Low',
        mid: 'Medium',
        critical: 'Critical',
      },
      tone: {
        low: 'Lower',
        medium: 'Medium',
        high: 'Higher',
      } satisfies Record<TradeOffTone, string>,
      errorTimingLabel: {
        before_execution: 'Before the action runs',
        at_exception: 'When a risk or uncertainty rule fires',
        after_execution: 'Only in a later sample check',
        aggregate_only: 'Only in aggregate outcome monitoring',
      } satisfies Record<QualitativeTradeOffs['errorTiming'], string>,
    };
  }
  return {
    regionAria:
      'Žmogaus kontrolės simuliatorius: pasirink scenarijų ir kontrolės režimą',
    scenarioLegend: 'Pasirink verslo scenarijų',
    modeLegend: 'Kontrolės režimas',
    recommendHeading: 'Rekomenduojamas režimas',
    bestFit: 'Tinkamiausias',
    mismatch: 'Persvarstyk',
    useRecommended: 'Naudok rekomenduojamą režimą',
    tradeOffHeading: 'Kompromisai (kokybiniai)',
    speed: 'Greitis',
    workload: 'Žmogaus darbo krūvis',
    errorTiming: 'Kada matoma klaida',
    testError: 'Patikrink klaidos atvejį',
    artefactHeading: 'Kontrolės taisyklė aprašymui',
    artefactHint:
      'Nukopijuok šią taisyklę į darbo eigos aprašymą (skaidrė 10.64, 8 punktas).',
    copyLabel: 'Kopijuoti taisyklę',
    copiedLabel: 'Nukopijuota',
    takeaway:
      'Žmogaus kontrolė – ne brandos kopėčios iki pilnos autonomijos. Režimą rink pagal pasekmes ir tai, ar klaidą sunku atšaukti.',
    matrixHeading: 'Kur tu esi rizikoje',
    matrixConsequence: 'Pasekmė',
    matrixReversibility: 'Atšaukimas',
    matrixLower: 'Mažesnė',
    matrixHigher: 'Didesnė',
    matrixEasy: 'Lengva atšaukti',
    matrixHard: 'Sunku atšaukti',
    matrixRecommended: 'Rekomenduojama šiam scenarijui',
    timingHeading: 'Kada įsijungia žmogus',
    timingPhase: {
      before_execution: 'Prieš veiksmą',
      at_exception: 'Išimtis',
      after_execution: 'Po veiksmo',
      aggregate_only: 'Tik stebėsena',
    } satisfies Record<QualitativeTradeOffs['errorTiming'], string>,
    stakeChip: {
      low: 'Maža',
      mid: 'Vidutinė',
      critical: 'Kritinė',
    },
    tone: {
      low: 'Mažesnis',
      medium: 'Vidutinis',
      high: 'Didesnis',
    } satisfies Record<TradeOffTone, string>,
    errorTimingLabel: {
      before_execution: 'Prieš vykdymą',
      at_exception: 'Kai suveikia rizikos ar neapibrėžtumo taisyklė',
      after_execution: 'Tik vėlesnėje atrankinėje patikroje',
      aggregate_only: 'Tik stebint bendrus rezultatus',
    } satisfies Record<QualitativeTradeOffs['errorTiming'], string>,
  };
}

export function getHumanControlScenarios(
  locale: M10Locale
): HumanControlScenarioCopy[] {
  if (locale === 'en') {
    return [
      {
        id: 'customer_reply',
        label: 'Customer reply',
        description:
          'Draft a standard FAQ answer before or instead of sending.',
        stakeLabel: 'Low impact · easy to reverse',
      },
      {
        id: 'refund',
        label: 'Refund / credit',
        description:
          'Approve a customer refund or store credit from a request.',
        stakeLabel: 'Medium financial impact · hard to reverse',
      },
      {
        id: 'sensitive_payment',
        label: 'Sensitive data or payment',
        description:
          'Export personal data or trigger a payment / wire-like action.',
        stakeLabel: 'Critical impact · hard to reverse',
      },
    ];
  }
  return [
    {
      id: 'customer_reply',
      label: 'Atsakymas klientui',
      description:
        'Paruošti standartinį FAQ atsakymą prieš siuntimą ar vietoj jo.',
      stakeLabel: 'Maža pasekmė · lengva atšaukti',
    },
    {
      id: 'refund',
      label: 'Grąžinimas / kreditas',
      description: 'Patvirtinti kliento grąžinimą ar parduotuvės kreditą.',
      stakeLabel: 'Vidutinė finansinė pasekmė · sunku atšaukti',
    },
    {
      id: 'sensitive_payment',
      label: 'Asmens duomenys ar mokėjimas',
      description:
        'Eksportuoti asmens duomenis arba paleisti mokėjimo tipo veiksmą.',
      stakeLabel: 'Kritinė pasekmė · sunku atšaukti',
    },
  ];
}

export function getHumanControlModes(
  locale: M10Locale
): HumanControlModeCopy[] {
  if (locale === 'en') {
    return [
      {
        id: 'every_case',
        label: 'Approve every case',
        short: 'Every case',
        description: 'AI drafts only. A human must approve before any action.',
      },
      {
        id: 'exception_gate',
        label: 'Exception review',
        short: 'Exceptions',
        description:
          'Routine cases run automatically; uncertain or high-risk cases go to a human.',
      },
      {
        id: 'spot_check',
        label: 'Post-action spot checks',
        short: 'Spot checks',
        description:
          'Actions run first. Humans review a sample afterwards to catch drift.',
      },
      {
        id: 'outcome_monitor',
        label: 'Outcome monitoring',
        short: 'Monitor outcomes',
        description:
          'No per-case review. Humans watch aggregate results and alerts.',
      },
    ];
  }
  return [
    {
      id: 'every_case',
      label: 'Visada tvirtina žmogus',
      short: 'Kiekvienas atvejis',
      description:
        'DI tik ruošia juodraštį. Prieš veiksmą žmogus privalo patvirtinti.',
    },
    {
      id: 'exception_gate',
      label: 'Išimčių peržiūra',
      short: 'Išimtys',
      description:
        'Standartiniai atvejai vyksta automatiškai; neaiškūs ar rizikingi – žmogui.',
    },
    {
      id: 'spot_check',
      label: 'Patikra po veiksmo',
      short: 'Atrankinė patikra',
      description:
        'Veiksmas įvyksta pirmiau. Žmogus vėliau peržiūri atranką, kad pagautų nukrypimus.',
    },
    {
      id: 'outcome_monitor',
      label: 'Rezultatų stebėsena',
      short: 'Stebėti rezultatus',
      description:
        'Be individualių atvejų peržiūros. Žmogus stebi bendrus rezultatus ir įspėjimus.',
    },
  ];
}

function modeLabel(locale: M10Locale, modeId: HumanControlModeId): string {
  return (
    getHumanControlModes(locale).find((m) => m.id === modeId)?.label ?? modeId
  );
}

function scenarioLabel(
  locale: M10Locale,
  scenarioId: HumanControlScenarioId
): string {
  return (
    getHumanControlScenarios(locale).find((s) => s.id === scenarioId)?.label ??
    scenarioId
  );
}

export function getMismatchReasonText(
  locale: M10Locale,
  scenarioId: HumanControlScenarioId,
  selected: HumanControlModeId
): string | null {
  const key = getMismatchReasonKey(scenarioId, selected);
  if (!key) return null;
  const recommended = modeLabel(locale, recommendMode(scenarioId));
  if (locale === 'en') {
    switch (key) {
      case 'over_engineered':
        return `Too much human friction for this stake level. Recommended: ${recommended}.`;
      case 'spot_check_too_weak':
        return `Spot checks find errors only after the action. Recommended: ${recommended}.`;
      case 'monitor_too_weak':
        return `Outcome monitoring alone is too weak for this consequence. Recommended: ${recommended}.`;
      case 'under_controlled':
        return `This mode under-controls the risk. Recommended: ${recommended}.`;
    }
  }
  switch (key) {
    case 'over_engineered':
      return `Per daug žmogaus trinties šiam pasekmių lygiui. Rekomenduojama: ${recommended}.`;
    case 'spot_check_too_weak':
      return `Atrankinė patikra klaidą randa tik po veiksmo. Rekomenduojama: ${recommended}.`;
    case 'monitor_too_weak':
      return `Viena stebėsena šiai pasekmei per silpna. Rekomenduojama: ${recommended}.`;
    case 'under_controlled':
      return `Šis režimas per silpnai kontroliuoja riziką. Rekomenduojama: ${recommended}.`;
  }
}

export function getErrorCaseOutcomeText(
  locale: M10Locale,
  kind: ErrorCaseOutcomeKind
): { title: string; body: string; success: boolean } {
  if (locale === 'en') {
    switch (kind) {
      case 'stopped_before':
        return {
          title: 'Error stopped before execution',
          body: 'The every-case gate blocked a bad draft. No customer-facing action left the system.',
          success: true,
        };
      case 'escalated_by_rule':
        return {
          title: 'Case escalated to a human',
          body: 'A risk or uncertainty rule sent the case to human review. No automatic send or payout.',
          success: true,
        };
      case 'detected_after':
        return {
          title: 'Error executed, then sampled',
          body: 'The action already ran. A later spot check may catch it — or may miss it entirely.',
          success: false,
        };
      case 'aggregate_only':
        return {
          title: 'Error visible only in aggregates',
          body: 'No per-case gate. Damage may appear only in dashboards or complaints after the fact.',
          success: false,
        };
    }
  }
  switch (kind) {
    case 'stopped_before':
      return {
        title: 'Klaida sustabdyta prieš vykdymą',
        body: '„Visada tvirtina žmogus“ vartai sustabdė blogą juodraštį. Klientui niekas neišėjo.',
        success: true,
      };
    case 'escalated_by_rule':
      return {
        title: 'Atvejis perduotas žmogui',
        body: 'Rizikos ar neapibrėžtumo taisyklė nukreipė atvejį žmogaus peržiūrai. Automatinio siuntimo ar išmokos nebuvo.',
        success: true,
      };
    case 'detected_after':
      return {
        title: 'Klaida įvyko, vėliau atranka',
        body: 'Veiksmas jau įvyko. Vėlesnė atrankinė patikra gali pagauti – arba praleisti.',
        success: false,
      };
    case 'aggregate_only':
      return {
        title: 'Klaida matoma tik bendruose rezultatuose',
        body: 'Be individualaus vartų. Žala gali pasirodyti tik suvestinėse ar skunduose po fakto.',
        success: false,
      };
  }
}

function conditionLine(locale: M10Locale, conditionKey: string): string {
  if (locale === 'en') {
    switch (conditionKey) {
      case 'standard_faq':
        return 'Human review when tone is unclear, facts are missing, or the reply is not a standard FAQ.';
      case 'refund_limit':
        return 'Auto only up to the policy refund limit and high confidence; otherwise human approval before payout.';
      case 'pii_or_payment':
        return 'Human approval always required before personal-data export or payment-like actions.';
      default:
        return 'Human approval when risk or uncertainty is detected.';
    }
  }
  switch (conditionKey) {
    case 'standard_faq':
      return 'Žmogaus peržiūra, kai tonas neaiškus, trūksta faktų arba atsakymas nėra standartinis FAQ.';
    case 'refund_limit':
      return 'Automatiškai tik iki politikos grąžinimo ribos ir kai pasitikėjimas aukštas; kitaip – žmogaus patvirtinimas prieš išmoką.';
    case 'pii_or_payment':
      return 'Žmogaus patvirtinimas visada prieš asmens duomenų eksportą ar mokėjimo tipo veiksmus.';
    default:
      return 'Žmogaus patvirtinimas, kai aptinkama rizika ar neapibrėžtumas.';
  }
}

function rejectEscalateLine(
  locale: M10Locale,
  modeId: HumanControlModeId
): string {
  if (locale === 'en') {
    switch (modeId) {
      case 'every_case':
        return 'On reject: edit or block; do not send. Escalate to owner if policy is unclear.';
      case 'exception_gate':
        return 'On reject: stop auto-action, ask for missing data or escalate to a specialist.';
      case 'spot_check':
        return 'On failed spot check: reverse if possible, log the incident, tighten the rule.';
      case 'outcome_monitor':
        return 'On bad aggregate signal: pause the flow, investigate, restore a stronger gate.';
    }
  }
  switch (modeId) {
    case 'every_case':
      return 'Atsisakius: taisyti arba blokuoti; nesiųsti. Jei politika neaiški – eskaluoti savininkui.';
    case 'exception_gate':
      return 'Atsisakius: stabdyti auto veiksmą, prašyti trūkstamų duomenų arba eskaluoti specialistui.';
    case 'spot_check':
      return 'Nepavykus atrankai: jei įmanoma – atšaukti, fiksuoti incidentą, sugriežtinti taisyklę.';
    case 'outcome_monitor':
      return 'Blogam bendram signalui: pristabdyti srautą, ištirti, grąžinti stipresnį vartą.';
  }
}

/**
 * Generated artefact for slide 10.64 item 8 (control contract).
 */
export function formatControlRuleArtefact(
  locale: M10Locale,
  parts: GeneratedControlRuleParts
): string {
  const mode = modeLabel(locale, parts.modeId);
  const scenario = scenarioLabel(locale, parts.scenarioId);
  const condition = conditionLine(locale, parts.conditionKey);
  const reject = rejectEscalateLine(locale, parts.modeId);
  const trade = getTradeOffs(parts.modeId);
  const ui = getHumanControlUiLabels(locale);

  if (locale === 'en') {
    return [
      `Human control rule (${scenario}):`,
      `1) Control mode: ${mode}.`,
      `2) Approval condition / limit: ${condition}`,
      `3) On reject / escalate: ${reject}`,
      `4) Audit record: who decided, when, case id, approve/edit/reject, reason.`,
      `Note: ${ui.errorTiming} – ${ui.errorTimingLabel[trade.errorTiming]}.`,
    ].join('\n');
  }
  return [
    `Žmogaus kontrolės taisyklė (${scenario}):`,
    `1) Kontrolės režimas: ${mode}.`,
    `2) Patvirtinimo sąlyga / riba: ${condition}`,
    `3) Atsisakius / eskaluojant: ${reject}`,
    `4) Audito įrašas: kas sprendė, kada, atvejo id, patvirtinti/taisyti/atmesti, priežastis.`,
    `Pastaba: ${ui.errorTiming} – ${ui.errorTimingLabel[trade.errorTiming]}.`,
  ].join('\n');
}
