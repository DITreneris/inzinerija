/**
 * RAG duomenų paruošimo magistralės layout – vienas SOT žingsniams ir spalvoms.
 * SCHEME_AGENT: colorKey per žingsnį; CONTENT_AGENT: label, phase, prompt, benefit.
 */

export type RagStepColorKey = 'brand' | 'emerald' | 'violet' | 'amber' | 'slate';

export interface RagDuomenuRuosimasStep {
  label: string;
  phase: string;
  prompt: string;
  benefit: string;
  colorKey: RagStepColorKey;
}

/** 5 žingsnių seka: Metaduomenys → Išvalymas → Antraštės → Fragmentai → Santrauka */
export const RAG_DUOMENU_RUOSIMAS_STEPS: RagDuomenuRuosimasStep[] = [
  {
    label: 'Metaduomenys',
    phase: '1. Kontekstas',
    prompt:
      'Prie šio teksto pridėk metaduomenis: šaltinio pavadinimas, data, tipas (pvz. ataskaita/įstatymas). Pateik kaip aiškiai pažymėtą bloką pradžioje.',
    benefit: 'Užtikrina tikslų filtravimą pagal šaltinio savybes.',
    colorKey: 'brand',
  },
  {
    label: 'Išvalymas',
    phase: '2. Kokybė',
    prompt:
      'Išvalyk šį tekstą: pašalink perteklinius tarpus ir dubliavimus, išlaikyk vienodą kodavimą. Išvestį pateik kaip paruoštą RAG šaltiniui.',
    benefit: 'Sumažina triukšmą ir taupo tokenų sąnaudas.',
    colorKey: 'emerald',
  },
  {
    label: 'Antraštės',
    phase: '3. Struktūra',
    prompt:
      'Pridėk aiškias antraštes ir skyrių pavadinimus; jei reikia – trumpą turinio anonsą pradžioje. Formatas: paruošta RAG kontekstui.',
    benefit: 'Suteikia hierarchiją semantinei paieškai.',
    colorKey: 'violet',
  },
  {
    label: 'Fragmentai',
    phase: '4. Segmentai',
    prompt:
      'Suskirstyk šį dokumentą į logiškus fragmentus (pastraipos arba skyriai); prie kiekvieno pridėk trumpą antraštę. Tikslas – paruošti RAG paieškai.',
    benefit: 'Optimizuoja paieškos lango (context window) užpildymą.',
    colorKey: 'amber',
  },
  {
    label: 'Santrauka',
    phase: '5. Paieška',
    prompt:
      'Padaryk 2–3 sakinių santrauką šio dokumento pradžiai. Tikslas – RAG greičiau rastų atitikmenis.',
    benefit: 'Pagerina dokumento atpažinimą pirminio skenavimo metu.',
    colorKey: 'slate',
  },
];

export type RagLocale = 'lt' | 'en';

export const RAG_DUOMENU_RUOSIMAS_STEPS_EN: RagDuomenuRuosimasStep[] = [
  {
    label: 'Metadata',
    phase: '1. Context',
    prompt:
      'Add metadata to this text: source name, date, type (e.g. report/law). Present as a clearly marked block at the start.',
    benefit: 'Enables accurate filtering by source properties.',
    colorKey: 'brand',
  },
  {
    label: 'Cleaning',
    phase: '2. Quality',
    prompt:
      'Clean this text: remove extra spaces and duplicates, keep encoding consistent. Output ready for RAG ingestion.',
    benefit: 'Reduces noise and saves token usage.',
    colorKey: 'emerald',
  },
  {
    label: 'Headings',
    phase: '3. Structure',
    prompt:
      'Add clear headings and section titles; if needed, a short content summary at the start. Format: ready for RAG context.',
    benefit: 'Provides hierarchy for semantic search.',
    colorKey: 'violet',
  },
  {
    label: 'Chunks',
    phase: '4. Segments',
    prompt:
      'Split this document into logical chunks (paragraphs or sections); add a short heading to each. Aim: ready for RAG retrieval.',
    benefit: 'Optimises context window filling.',
    colorKey: 'amber',
  },
  {
    label: 'Summary',
    phase: '5. Search',
    prompt:
      'Write a 2–3 sentence summary for the start of this document. Aim: RAG finds matches faster.',
    benefit: 'Improves document recognition during initial scan.',
    colorKey: 'slate',
  },
];

export function getRagDuomenuRuosimasSteps(locale: RagLocale): RagDuomenuRuosimasStep[] {
  return locale === 'en' ? RAG_DUOMENU_RUOSIMAS_STEPS_EN : RAG_DUOMENU_RUOSIMAS_STEPS;
}

export interface RagDuomenuRuosimasBlockLabels {
  regionAria: string;
  youAreHere: string;
  navAria: string;
  stepAria: (index: number, label: string) => string;
  copyPromptLabel: string;
  copiedLabel: string;
  promptLabel: string;
  benefitTitle: string;
  diagramAria: string;
  diagramHint: string;
  diagramStepAria: (index: number, label: string) => string;
}

const RAG_BLOCK_LT: RagDuomenuRuosimasBlockLabels = {
  regionAria: 'RAG ruošimo magistralė',
  youAreHere: 'Tu esi čia:',
  navAria: 'Žingsnių pasirinkimas',
  stepAria: (i, label) => `Žingsnis ${i + 1}: ${label}`,
  copyPromptLabel: 'Kopijuoti promptą',
  copiedLabel: 'Nukopijuota!',
  promptLabel: 'Promptas kopijavimui',
  benefitTitle: 'Kodėl tai svarbu?',
  diagramAria: 'RAG ruošimo magistralė.',
  diagramHint: ' Paspausk žingsnį, kad pamatytum promptą.',
  diagramStepAria: (i, label) => `Žingsnis ${i + 1}: ${label}. Paspausk promptui.`,
};

const RAG_BLOCK_EN: RagDuomenuRuosimasBlockLabels = {
  regionAria: 'RAG preparation pipeline',
  youAreHere: 'You are here:',
  navAria: 'Step selection',
  stepAria: (i, label) => `Step ${i + 1}: ${label}`,
  copyPromptLabel: 'Copy prompt',
  copiedLabel: 'Copied!',
  promptLabel: 'Prompt to copy',
  benefitTitle: 'Why does this matter?',
  diagramAria: 'RAG preparation pipeline.',
  diagramHint: ' Click a step to see the prompt.',
  diagramStepAria: (i, label) => `Step ${i + 1}: ${label}. Click for prompt.`,
};

export function getRagDuomenuRuosimasBlockLabels(locale: RagLocale): RagDuomenuRuosimasBlockLabels {
  return locale === 'en' ? RAG_BLOCK_EN : RAG_BLOCK_LT;
}

/** Pilnos Tailwind klasės pagal colorKey – vengti dinaminio bg-${color}-500 */
export const RAG_STEP_COLOR_CLASSES: Record<
  RagStepColorKey,
  { bg: string; border: string; text: string; bgLight: string; bgLightDark: string; textLight: string }
> = {
  brand: {
    bg: 'bg-brand-500',
    border: 'border-brand-500',
    text: 'text-brand-600',
    bgLight: 'bg-brand-50',
    bgLightDark: 'dark:bg-brand-900/30',
    textLight: 'text-brand-600',
  },
  emerald: {
    bg: 'bg-emerald-500',
    border: 'border-emerald-500',
    text: 'text-emerald-600',
    bgLight: 'bg-emerald-50',
    bgLightDark: 'dark:bg-emerald-900/30',
    textLight: 'text-emerald-600',
  },
  violet: {
    bg: 'bg-violet-500',
    border: 'border-violet-500',
    text: 'text-violet-600',
    bgLight: 'bg-violet-50',
    bgLightDark: 'dark:bg-violet-900/30',
    textLight: 'text-violet-600',
  },
  amber: {
    bg: 'bg-amber-500',
    border: 'border-amber-500',
    text: 'text-amber-700',
    bgLight: 'bg-amber-50',
    bgLightDark: 'dark:bg-amber-900/30',
    textLight: 'text-amber-700',
  },
  slate: {
    bg: 'bg-slate-500',
    border: 'border-slate-500',
    text: 'text-slate-600',
    bgLight: 'bg-slate-50',
    bgLightDark: 'dark:bg-slate-800/50',
    textLight: 'text-slate-600',
  },
};
