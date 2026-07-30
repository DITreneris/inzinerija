// Shared slide/module helper types (split from modules.ts – P2 #3)
export type BlockColor =
  | 'rose'
  | 'orange'
  | 'amber'
  | 'emerald'
  | 'brand'
  | 'violet';

export interface HierarchyBlock {
  num: string;
  name: string;
  desc: string;
  priority: string;
  color: BlockColor;
  /** Papildomos sąvokos – rodomos išskleidžiamame bloke; jei nurodyta, blokas tampa collapsible */
  concepts?: string[];
  /** Patarimas blokui – rodomas išskleidžiamame bloke */
  tip?: string;
}

/** Hierarchijos skaidrė (Modulio 1) – content-driven. P2 SKAIDRIU_TIPU_ANALIZE §4.1 */
export interface HierarchyContent {
  introHeading?: string;
  introBody?: string;
  blocks: HierarchyBlock[];
  /** Praktinė užduotis (toje pačioje skaidrėje): antraštė, body, kopijuojamas promptas */
  practiceHeading?: string;
  practiceBody?: string;
  practiceCopyable?: string;
  /** Ką prisiminti – atskiras blokas (kai yra practiceCopyable) arba vienas blokas su „Praktinė užduotis:“ */
  tip?: string;
}

/** Palyginimo skaidrė (nestruktūruotas vs struktūruotas) – content-driven. P2 §4.1 */
export interface ComparisonContent {
  introText?: string;
  unstructuredPrompt: string;
  structuredPrompt: string;
  unstructuredCons?: string[];
  structuredPros?: string[];
  labelLeft?: string;
  labelRight?: string;
  /** leftPct, rightPct, lessEditsPct – rezultatų palyginimas */
  stats?: { leftPct: number; rightPct: number; lessEditsPct: number };
}

/** Modulio santraukos skaidrė – content-driven. P2 §4.1
 *  v2 2026-02: redesign pagal top e-learning platformų šablonus (Duolingo, Design+Code, Articulate).
 *  Pridėta: sekcijų ikonos, spalvos, statistika, motyvacinis CTA. */
export interface SummarySection {
  heading: string;
  items: string[];
  /** Lucide ikonos pavadinimas (pvz. "Layers", "Workflow", "Lightbulb", "ArrowRight") */
  icon?: string;
  /** Spalvos raktas – brand, emerald, violet, amber, rose, orange */
  color?: string;
}
export interface SummaryContent {
  introHeading?: string;
  introBody?: string;
  sections: SummarySection[];
  /** Statistikos blokai hero dalyje (pvz. "6 blokai", "5 technikos") */
  stats?: { label: string; value: string }[];
  /** Motyvacinis šūkis apačioje (pvz. "Struktūruoti promptai = nuspėjami rezultatai") */
  tagline?: string;
  /** Kopijuojamas refleksijos promptas – mokinys gali iškart panaudoti su DI įrankiu */
  reflectionPrompt?: string;
  /** Refleksijos kortelės antraštė */
  reflectionTitle?: string;
  /** Pirmas veiksmas per 24–48 val. – trumpas CTA (User Journey: deployment per 24h) */
  firstAction24h?: string;
  /** Kitas žingsnis CTA (pvz. „Pereikite prie Modulio 11“) – rodomas jei nėra sections su Kitas Žingsnis */
  nextStepCTA?: string;
}

/** Praktikos santraukos skaidrė – content-driven. P2 §4.1 */
export interface PracticeSummaryContent {
  title?: string;
  subtitle?: string;
  learnedItems?: string[];
  nextStepsItems?: string[];
  taglineTitle?: string;
  taglineSub?: string;
  /** M9: sekcijos su heading/body vietoj learnedItems/nextSteps */
  sections?: { heading: string; body: string; blockVariant?: string }[];
  /** Kopijuojamas refleksijos promptas (What–So What–Now What) */
  reflectionPrompt?: string;
  /** M9 5 blokų etalonas: antraštė (pvz. „Ką išmokote“) */
  introHeading?: string;
  /** M9: įvodinis body */
  introBody?: string;
  /** M9: statistikos (pvz. 17 scenarijų, 4 veikėjai) */
  stats?: { label: string; value: string }[];
  /** M9: tagline (pvz. „Vienas scenarijus = vienas rezultatas.“) */
  tagline?: string;
  /** M9: kitas žingsnis CTA (pvz. „Pritaikyk per 48 val.…“) */
  nextStepCTA?: string;
  /** M9/M12: pirmas praktinis veiksmas per 24–48 val. */
  firstAction24h?: string;
  /** M9: mygtuko „Parsisiųsti atmintinę (PDF)“ etiketė */
  handoutDownloadLabel?: string;
  /** M9 quest: soft artefact checklist */
  kitChecklist?: { id: string; label: string }[];
  /** M9 quest: mastery badges copy */
  badges?: { id: string; label: string; rule: string }[];
  hubCtaLabel?: string;
  hubSlideId?: number;
}

/** M9 užduoties rėmas – vienas sakinys (Užduotis) ir konkretus output (Užbaigta, kai) */
export interface TaskFrame {
  task: string;
  doneWhen: string;
}

export interface QualityCriteria {
  text: string;
  color: BlockColor;
}

export interface FullExampleBlock {
  num: number;
  name: string;
  color: BlockColor;
  content: string;
}
