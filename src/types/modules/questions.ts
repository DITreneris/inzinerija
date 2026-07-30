// Question / scenario / practical-task types (split from modules.ts – P2 #3)
/** Klausimo tipas – MCQ (numatytasis), matching, ordering, true-false, scenario */
export type QuestionType =
  | 'mcq'
  | 'matching'
  | 'ordering'
  | 'true-false'
  | 'scenario';

/** Matching klausimo pora – kairė ir dešinė pusė */
export interface MatchPair {
  left: string;
  right: string;
}

export interface TestQuestion {
  id: string;
  /** Klausimo tipas. Jei nenurodyta – traktuojama kaip 'mcq' (backward compatible) */
  type?: QuestionType;
  question: string;
  // MCQ + Scenario fields
  options?: string[];
  correct?: number;
  // Matching fields
  matchPairs?: MatchPair[];
  // Ordering fields
  correctOrder?: string[];
  items?: string[];
  // True/False fields
  isTrue?: boolean;
  // Scenario fields
  scenarioContext?: string;
  // Common fields
  explanation: string;
  /** Užuomina – rodoma po pirmo neteisingmo bandymo (progressive hint) */
  hint?: string;
  /** Bloom taksonomijos lygis: 1=Remember, 2=Understand, 3=Apply, 4=Analyze, 5=Evaluate, 6=Create */
  bloomLevel?: number;
  /** Susijusios Modulio 1 skaidrės ID – remediation nuoroda */
  relatedSlideId?: number;
  /** Kategorija per-bloko vertinimui: meta, input, output, reasoning, quality, advanced, workflow, technikos */
  category?: string;
  /** Diagnostinė nuoroda, kai atsakymas neteisingas – žr. skaidrę X (Modulio 5 ir kt.) */
  ifWrongSee?: {
    moduleId: number;
    slideId: number;
    label: string;
  };
}

/** W1: vienas pasirinkimas šakotame scenarijuje – etiketė ir pasekmės tekstas */
export interface ScenarioBranchingChoice {
  label: string;
  consequence: string;
}

/** W1: šakotas scenarijus – klausimas ir 2–3 pasirinkimai su pasekmėmis */
export interface ScenarioBranching {
  question: string;
  choices: ScenarioBranchingChoice[];
}

export interface Scenario {
  context: string;
  data: string;
  constraints: string;
  expectedFormat: string;
  /** 2–3 sakiniai: persona, problema, kontekstas – rodomi virš scenarijaus skirtukų (M3 ir kt.) */
  situation?: string;
  /** Modulio 9 role-quest: optional įvedantis sakinys „Šią savaitę [Veikėjas] atlieka…“ */
  narrativeLead?: string;
  /** W1: optional šakotas scenarijus – pasirinkimai ir pasekmės */
  branching?: ScenarioBranching;
}

export interface InstructionStep {
  step: number;
  title: string;
  description: string;
  hint: string;
  partialSolution: string;
  /** Kada pereiti prie kito žingsnio (pvz. „Kada toliau: kai META blokas užpildytas“). */
  whenToProceed?: string;
}

export interface TaskInstructions {
  title: string;
  steps: InstructionStep[];
}

export interface PracticalTask {
  title: string;
  placeholder: string;
  motivation?: string;
  /** Aiški instrukcija, ką vesti į lauką (pvz. „Įveskite visą promptą – ne tik žodžius skliausteliuose“). */
  inputHint?: string;
  templateLabel?: string;
  template?: string;
  explanation?: string;
  instructions?: TaskInstructions;
  /** W2: leisti pažymėti užduotį atlikta be teksto įvedimo (mygtukas „Pažymėjau kaip atliktą“). */
  allowMarkWithoutAnswer?: boolean;
  /** W2: po atliktos užduoties – kopijuojamas refleksijos promptas (pvz. „Ką gavai iš DI?“). */
  feedbackPrompt?: string;
}
