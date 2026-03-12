/**
 * DI turinio aptikimo įrankiai – Top 10 (2026).
 * Šaltinis: di_detektoriai.html (kurso autorių apžvalga).
 * Naudojama skaidrėje „DI turinio detektoriai" (Modulis 4, sekcija 4.6).
 */

export type AiDetectorsLocale = 'lt' | 'en';

/** Įrankio aptikimo tipas */
export type DetectorType = 'text' | 'image' | 'video' | 'plagiat';

/** Vienas DI turinio aptikimo įrankis */
export interface AiDetectorEntry {
  id: string;
  /** Eilės numeris (rodyti kortelėje) */
  number: number;
  name: string;
  /** Aptikimo tipai (gali būti keli) */
  types: DetectorType[];
  /** Trumpas aprašymas */
  description: string;
  /** Nuoroda į svetainę (null jei nėra viešo URL) */
  url: string | null;
  /** Paryškinti kaip lietuvišką / rekomenduojamą */
  highlight?: boolean;
}

const TYPE_COLOR_CLASSES = {
  text: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  image: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  video: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  plagiat: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
} as const;

/** Tipo etiketės UI atvaizdavimui (LT) */
export const DETECTOR_TYPE_LABELS: Record<
  DetectorType,
  { label: string; colorClass: string }
> = {
  text: { label: 'Tekstas', colorClass: TYPE_COLOR_CLASSES.text },
  image: { label: 'Vaizdai', colorClass: TYPE_COLOR_CLASSES.image },
  video: { label: 'Video', colorClass: TYPE_COLOR_CLASSES.video },
  plagiat: { label: 'Plagiatas', colorClass: TYPE_COLOR_CLASSES.plagiat },
};

const DETECTOR_TYPE_LABELS_EN: Record<DetectorType, string> = {
  text: 'Text',
  image: 'Images',
  video: 'Video',
  plagiat: 'Plagiarism',
};

export function getDetectorTypeLabels(locale: AiDetectorsLocale): Record<DetectorType, { label: string; colorClass: string }> {
  return {
    text: { label: locale === 'en' ? DETECTOR_TYPE_LABELS_EN.text : DETECTOR_TYPE_LABELS.text.label, colorClass: TYPE_COLOR_CLASSES.text },
    image: { label: locale === 'en' ? DETECTOR_TYPE_LABELS_EN.image : DETECTOR_TYPE_LABELS.image.label, colorClass: TYPE_COLOR_CLASSES.image },
    video: { label: locale === 'en' ? DETECTOR_TYPE_LABELS_EN.video : DETECTOR_TYPE_LABELS.video.label, colorClass: TYPE_COLOR_CLASSES.video },
    plagiat: { label: locale === 'en' ? DETECTOR_TYPE_LABELS_EN.plagiat : DETECTOR_TYPE_LABELS.plagiat.label, colorClass: TYPE_COLOR_CLASSES.plagiat },
  };
}

/** Visi filtravimo variantai (su „Visi") – LT */
export const DETECTOR_FILTERS: { key: DetectorType | 'all'; label: string }[] = [
  { key: 'all', label: 'Visi' },
  { key: 'text', label: 'Tekstas' },
  { key: 'image', label: 'Vaizdai' },
  { key: 'video', label: 'Video' },
  { key: 'plagiat', label: 'Plagiatas' },
];

const DETECTOR_FILTERS_EN: { key: DetectorType | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'text', label: 'Text' },
  { key: 'image', label: 'Images' },
  { key: 'video', label: 'Video' },
  { key: 'plagiat', label: 'Plagiarism' },
];

export function getDetectorFilters(locale: AiDetectorsLocale): { key: DetectorType | 'all'; label: string }[] {
  return locale === 'en' ? DETECTOR_FILTERS_EN : DETECTOR_FILTERS;
}

/** 10 DI turinio aptikimo įrankių (2026 m. apžvalga) – LT */
export const AI_DETECTORS: AiDetectorEntry[] = [
  { id: 'winston-ai', number: 1, name: 'Winston AI', types: ['text', 'plagiat'], description: 'Labai tiksli DI turinio detekcija, žema klaidingų teigiamų rodiklių norma; plačiai naudojama mokyklose ir leidybos sektoriuje.', url: 'https://gowinston.ai/' },
  { id: 'gptzero', number: 2, name: 'GPTZero', types: ['text'], description: 'Benchmark įrankis akademijai – ~99 % tikslumas tekstui; atpažįsta ir mišrų (žmogus + DI) turinį.', url: 'https://gptzero.me/' },
  { id: 'copyleaks', number: 3, name: 'Copyleaks', types: ['text', 'image'], description: 'Teksto ir DI paveikslėlių detektorius; nauja plėtra į video/audio detekciją 2026 m.', url: 'https://copyleaks.com/' },
  { id: 'originality-ai', number: 4, name: 'Originality.ai', types: ['text'], description: 'Labai geras SEO / marketingo turinio detektorius, masinė analizė.', url: null },
  { id: 'youscan', number: 5, name: 'YouScan AI Detector', types: ['text'], description: 'Skirta marketingo / social media turiniui analizuoti ir autentiškumą patikrinti.', url: null },
  { id: 'mydetector', number: 6, name: 'MyDetector.ai', types: ['text'], description: 'Greitas nemokamas DI teksto detektorius be registracijos, palaiko daug kalbų.', url: 'https://mydetector.ai/' },
  { id: 'quetext', number: 7, name: 'Quetext AI Detector', types: ['text', 'plagiat'], description: 'Nemokamas detektorius su plagiato tikrinimu; geras universalus sprendimas.', url: null },
  { id: 'zerogpt', number: 8, name: 'ZeroGPT', types: ['text'], description: 'Nemokama priemonė, skirta greitai patikrinti DI turinį.', url: 'https://zerogpt.com/' },
  { id: 'isgen-ai', number: 9, name: 'Isgen.ai (LT)', types: ['text'], description: 'Lietuviškas DI detektorius, gerai aptinka populiarių LLM generuotą tekstą (~96 % tikslumas).', url: 'https://isgen.ai/lt', highlight: true },
  { id: 'synthid', number: 10, name: 'Google Gemini SynthID', types: ['image', 'video'], description: 'Gemini atpažįsta DI generuotą turinį per SynthID watermark technologiją (kol kas tik Google DI turiniui).', url: null },
];

/** Same tools, EN descriptions (for EN locale) */
const AI_DETECTORS_EN: AiDetectorEntry[] = [
  { id: 'winston-ai', number: 1, name: 'Winston AI', types: ['text', 'plagiat'], description: 'Highly accurate AI content detection, low false positive rate; widely used in education and publishing.', url: 'https://gowinston.ai/' },
  { id: 'gptzero', number: 2, name: 'GPTZero', types: ['text'], description: 'Benchmark tool for academia – ~99% accuracy for text; detects mixed (human + AI) content.', url: 'https://gptzero.me/' },
  { id: 'copyleaks', number: 3, name: 'Copyleaks', types: ['text', 'image'], description: 'Text and AI image detector; 2026 expansion into video/audio detection.', url: 'https://copyleaks.com/' },
  { id: 'originality-ai', number: 4, name: 'Originality.ai', types: ['text'], description: 'Strong SEO / marketing content detector, bulk analysis.', url: null },
  { id: 'youscan', number: 5, name: 'YouScan AI Detector', types: ['text'], description: 'For marketing / social media content analysis and authenticity checks.', url: null },
  { id: 'mydetector', number: 6, name: 'MyDetector.ai', types: ['text'], description: 'Fast free AI text detector, no sign-up, supports many languages.', url: 'https://mydetector.ai/' },
  { id: 'quetext', number: 7, name: 'Quetext AI Detector', types: ['text', 'plagiat'], description: 'Free detector with plagiarism check; solid all-round option.', url: null },
  { id: 'zerogpt', number: 8, name: 'ZeroGPT', types: ['text'], description: 'Free tool for quick AI content checks.', url: 'https://zerogpt.com/' },
  { id: 'isgen-ai', number: 9, name: 'Isgen.ai (LT)', types: ['text'], description: 'Lithuanian AI detector, good at popular LLM-generated text (~96% accuracy).', url: 'https://isgen.ai/lt', highlight: true },
  { id: 'synthid', number: 10, name: 'Google Gemini SynthID', types: ['image', 'video'], description: 'Gemini detects AI-generated content via SynthID watermarking (currently Google AI content).', url: null },
];

export function getAiDetectors(locale: AiDetectorsLocale): AiDetectorEntry[] {
  return locale === 'en' ? AI_DETECTORS_EN : AI_DETECTORS;
}

/** 6-block prompt for AI content verification (copyable) – LT */
export const SIX_BLOCK_PROMPT_LT = `Tu esi DI turinio patikrinimo asistentas.

INPUT: Tekstas, kurį reikia patikrinti (DI arba žmogaus sukurtas).
OUTPUT: Aiškus atsakymas: kokį detektorių naudoti, kaip įrašyti tekstą ir kaip interpretuoti rezultatą.
REASONING: Žingsnis po žingsnio – atidaryk įrankį, įklijuok tekstą, paleisk analizę.
QUALITY: Rezultatas nėra 100 % tikslus; vertink kritiškai; detektoriai – savikontrolei, ne slėpimui.
ADVANCED: Jei kalba lietuvių – Isgen.ai (LT) gerai aptinka LLM tekstą.`;

/** 6-block prompt for AI content verification (copyable) – EN */
export const SIX_BLOCK_PROMPT_EN = `You are an AI content verification assistant.

INPUT: Text to check (AI-generated or human-written).
OUTPUT: Clear answer: which detector to use, how to paste the text, and how to interpret the result.
REASONING: Step by step – open the tool, paste the text, run the analysis.
QUALITY: Results are not 100% accurate; interpret critically; detectors are for self-check, not for hiding AI use.
ADVANCED: For Lithuanian text – Isgen.ai (LT) detects LLM output well.`;

export function getSixBlockPrompt(locale: AiDetectorsLocale): string {
  return locale === 'en' ? SIX_BLOCK_PROMPT_EN : SIX_BLOCK_PROMPT_LT;
}
