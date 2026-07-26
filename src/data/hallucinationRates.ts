/**
 * Haliucinacijų rodikliai pagrindinių DI modelių benchmarke (HHEM-2.x, Vectara dataset).
 * Šaltinis: Hugging Face LLM Hallucination Leaderboard by Vectara.
 * Atnaujinta: 2026-07-14 — top-10 „Best LLMs“ (sutampa su interaktyviu leaderboard 2026-07-11).
 */
export interface HallucinationRateEntry {
  id: string;
  model: string;
  ratePercent: number;
  /** Paryškinti skaidrėje (pvz. žinomas OpenAI modelis top-10) */
  highlight?: boolean;
  /** Answer Rate < 95 % Vectara metodikoje – žemesnis atsakymų aprėptis */
  lowAnswerRate?: boolean;
}

export const HALLUCINATION_RATES_SOURCE = {
  name: 'LLM Hallucination Leaderboard',
  by: 'Vectara',
  url: 'https://huggingface.co/spaces/vectara/leaderboard',
  asOfDate: '2026-07-14',
} as const;

/** Top-10 pagal Vectara leaderboard (žemiausias haliucinacijų rodiklis, 2026-07) */
export const HALLUCINATION_RATES: HallucinationRateEntry[] = [
  { id: 'finix-s1-32b', model: 'Finix S1 32B', ratePercent: 1.8 },
  {
    id: 'gpt-5-4-nano',
    model: 'GPT-5.4 Nano',
    ratePercent: 3.1,
    highlight: true,
  },
  {
    id: 'gemini-2-5-flash-lite',
    model: 'Gemini 2.5 Flash-Lite',
    ratePercent: 3.3,
  },
  { id: 'phi-4', model: 'Phi-4', ratePercent: 3.7, lowAnswerRate: true },
  { id: 'llama-3-3-70b', model: 'Llama 3.3 70B Instruct', ratePercent: 4.1 },
  {
    id: 'snowflake-arctic',
    model: 'Snowflake Arctic Instruct',
    ratePercent: 4.3,
    lowAnswerRate: true,
  },
  { id: 'gemma-3-12b', model: 'Gemma 3 12B', ratePercent: 4.4 },
  { id: 'mistral-large-2411', model: 'Mistral Large 2411', ratePercent: 4.5 },
  { id: 'qwen3-8b', model: 'Qwen3 8B', ratePercent: 4.8 },
  { id: 'mistral-small-2501', model: 'Mistral Small 2501', ratePercent: 5.1 },
];

export type HallucinationRatesLocale = 'lt' | 'en';

/** Learner copyable – tyrimo promptas aktualiems haliucinacijų rodikliams (LT) */
export const RESEARCH_PROMPT_LT = `Tu esi DI patikimumo tyrimo asistentas.

UŽDUOTIS: Surink aktualius LLM haliucinacijų (factual error / hallucination rate) rodiklius ir pateik juos pagal datą [YYYY-MM-DD].

KONTEKSTAS:
- Gamintojai šių rodiklių marketinge atskleidžia nenoriai; palyginamus skaičius dažniausiai skelbia nepriklausomi tyrėjai ir benchmarkai.
- Nenaudok pasenusių reitingų be datos. Jei šaltinyje nėra datos – pažymėk „data nežinoma“.

ŠALTINIAI (privaloma patikrinti pirmiausia):
1) Vectara LLM Hallucination Leaderboard (Hugging Face): https://huggingface.co/spaces/vectara/leaderboard
2) Jei prieinama – HHEM / Vectara metodikos aprašymas toje pačioje erdvėje ar susijusiame HF modelio puslapyje
3) Papildomai (jei rasi viešai): OpenAI / Google / Anthropic / Meta modelių system cards, eval ataskaitos ar peer-reviewed / arXiv darbai apie factuality – tik su nuoroda ir data

OUTPUT formatas:
- Snapshot data: [YYYY-MM-DD]
- Lentelė: Modelis | Hallucination rate (%) | Answer rate / pastabos | Šaltinis (URL) | Šaltinio data
- Trumpa išvada (3–5 sakiniai): kas pasikeitė, ko nelyginti 1:1, ką daryti praktikoje
- Ribos: kas neįtraukta, kur metodika skiriasi

QUALITY:
- Nespėliok skaičių. Jei nerandi – rašyk „nerasta“.
- Aiškiai atskirk: gamintojo teiginys vs nepriklausomas benchmarkas.
- Lietuvių kalba, verslo tonas, be marketingo hiperbolių.`;

/** Learner copyable – research prompt for current hallucination rates (EN) */
export const RESEARCH_PROMPT_EN = `You are an AI reliability research assistant.

TASK: Gather current LLM hallucination (factual error / hallucination rate) metrics and present them as of date [YYYY-MM-DD].

CONTEXT:
- Vendors rarely highlight these rates in marketing; comparable numbers usually come from independent researchers and benchmarks.
- Do not use outdated rankings without a date. If a source has no date, mark it as “date unknown”.

SOURCES (check these first):
1) Vectara LLM Hallucination Leaderboard (Hugging Face): https://huggingface.co/spaces/vectara/leaderboard
2) If available – HHEM / Vectara methodology notes in the same Space or related HF model card
3) Optionally (if public): OpenAI / Google / Anthropic / Meta system cards, eval reports, or peer-reviewed / arXiv work on factuality – only with URL and date

OUTPUT format:
- Snapshot date: [YYYY-MM-DD]
- Table: Model | Hallucination rate (%) | Answer rate / notes | Source (URL) | Source date
- Short takeaway (3–5 sentences): what changed, what not to compare 1:1, what to do in practice
- Limits: what is missing, where methodology differs

QUALITY:
- Do not invent numbers. If you cannot find a figure, write “not found”.
- Clearly separate: vendor claim vs independent benchmark.
- Clear business tone; no marketing hype.`;

export function getHallucinationResearchPrompt(
  locale: HallucinationRatesLocale
): string {
  return locale === 'en' ? RESEARCH_PROMPT_EN : RESEARCH_PROMPT_LT;
}
