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
