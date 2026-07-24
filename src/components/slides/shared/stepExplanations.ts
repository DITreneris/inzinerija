export type StepExplanation = { title: string; body: string };

export const DI_PREZENTACIJOS_STEP_EXPLANATIONS: StepExplanation[] = [
  {
    title: 'Tikslas',
    body: 'Apibrėžk **kam** skirta prezentacija ir **kokia auditorija**. Kuo tiksliau – tuo geriau DI sugeneruos turinį ir struktūrą.',
  },
  {
    title: 'Struktūra',
    body: 'Naudok **8 skaidrių karkasą** (problema → sprendimas → nauda → CTA). Karkasą rasite žemiau šio bloko – nukopijuok į DI.',
  },
  {
    title: 'Turinio generavimas',
    body: 'Įvesk promptą su tema ir auditorija – DI sugeneruos tekstą ir idėjas. Naudok **6 blokų principus** (META, INPUT, OUTPUT) iš Modulio 1.',
  },
  {
    title: 'Vizualizacija',
    body: 'Įrankis (Gamma, Canva, SlidesAI ir kt.) automatiškai pritaikys layout ir grafikus. Tu tik patikrink ir koreguok pagal poreikį.',
  },
  {
    title: 'Poliravimas',
    body: 'Pridėk **CTA** (ką daryti toliau), patikrink aiškumą ir paprastumą. Mažiau teksto – daugiau įspūdis.',
  },
];

export const DI_PREZENTACIJOS_STEP_EXPLANATIONS_EN: StepExplanation[] = [
  {
    title: 'Goal',
    body: 'Define **who** the presentation is for and **what audience**. The more specific – the better the LLM will generate content and structure.',
  },
  {
    title: 'Structure',
    body: 'Use the **8-slide framework** (problem → solution → benefit → CTA). Find the framework below this block – copy it into the LLM.',
  },
  {
    title: 'Content generation',
    body: 'Enter a prompt with topic and audience – the LLM will generate text and ideas. Use **6-block principles** (META, INPUT, OUTPUT) from Module 1.',
  },
  {
    title: 'Visualisation',
    body: 'A tool (Gamma, Canva, SlidesAI, etc.) will automatically apply layout and graphics. You only review and adjust as needed.',
  },
  {
    title: 'Polish',
    body: 'Add **CTA** (what to do next), check clarity and simplicity. Less text – more impact.',
  },
];

export type StepExplanationsLocale = 'lt' | 'en';

export function getDiPrezentacijosStepExplanations(
  locale: StepExplanationsLocale
): StepExplanation[] {
  return locale === 'en'
    ? DI_PREZENTACIJOS_STEP_EXPLANATIONS_EN
    : DI_PREZENTACIJOS_STEP_EXPLANATIONS;
}

/** Turinio verslo workflow – SOT: m13BusinessWorkflowContent.ts */
export {
  TURINIO_WORKFLOW_STEP_EXPLANATIONS,
  TURINIO_WORKFLOW_STEP_EXPLANATIONS_EN,
  getTurinioWorkflowStepExplanations,
  getTurinioWorkflowDiagramLabels,
  type TurinioWorkflowDiagramStep,
  type TurinioWorkflowDiagramLabels,
} from './m13BusinessWorkflowContent';

export const RL_STEP_EXPLANATIONS: StepExplanation[] = [
  {
    title: 'Agentas',
    body: '**DI sistema**, kuri mokosi ir priima sprendimus. Stebi aplinką, parenka veiksmus ir gauna grįžtamąjį ryšį.',
  },
  {
    title: 'Aplinka',
    body: '**Situacija arba užduotis**, kurioje agentas veikia (pvz. žaidimo lentos būsena, kalbos modelio užduotis).',
  },
  {
    title: 'Veiksmas',
    body: '**Ką agentas padaro** – judėjimas, atsakymas, pasirinkimas. Veiksmas keičia aplinką ir lemia rezultatą.',
  },
  {
    title: 'Atlygis',
    body: '**„Gerai" ar „blogai"** – skaitinis signalas arba vertinimas. Atlygis grįžta į agentą ir keičia jo elgesį.',
  },
];

export const RL_STEP_EXPLANATIONS_EN: StepExplanation[] = [
  {
    title: 'Agent',
    body: '**AI system** that learns and makes decisions. Observes the environment, chooses actions and receives feedback.',
  },
  {
    title: 'Environment',
    body: '**Situation or task** in which the agent operates (e.g. game board state, language model task).',
  },
  {
    title: 'Action',
    body: '**What the agent does** – move, response, choice. The action changes the environment and determines the outcome.',
  },
  {
    title: 'Reward',
    body: '**"Good" or "bad"** – numeric signal or score. The reward goes back to the agent and shapes its behaviour.',
  },
];

export function getRlStepExplanations(
  locale: StepExplanationsLocale
): StepExplanation[] {
  return locale === 'en' ? RL_STEP_EXPLANATIONS_EN : RL_STEP_EXPLANATIONS;
}

export const LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS: {
  title: string;
  body: string;
}[] = [
  {
    title: '1. Įvestis (N)',
    body: 'Čia pateikiamas pradinis tekstas **„Rytas tapo"**. Tai įvestis, kurią modelis naudos, kad nuspėtų kitą žodį – kaip **lošimų automatas**, kuris „mato" kol kas išdėstytus simbolius ir ruošiasi „ridenti" kitą.',
  },
  {
    title: '2. LLM (N)',
    body: '**Kalbos modelis** apdoroja įvestį ir skaičiuoja tikimybes kitam žodžiui. Galima manyti, kad tai **lošimų automato „variklis"**: jis nustato, kokie žodžiai geriausiai tinka toliau (čia matome rezultatą kitame bloke).',
  },
  {
    title: '3. Išvestis (N)',
    body: 'Modelis pateikia **tikimybes** kitam žodžiui: pvz. „čempionais" 25%, „2024" 20%, „m." 18%. Tai dar ne galutinis žodis – tik kandidatai su procentais, kaip skaičiai ant automato būgnų.',
  },
  {
    title: '4. Pasirinkta (N)',
    body: 'Iš tikimybių **pasirenkamas** vienas žodis – čia „čempionais". Kaip **lošimų automatas**, kuris „sustoja" ant vieno rezultato. Šis žodis perduodamas į kitą žingsnį (punktyrinė rodyklė „Pridedama prie naujos įvesties").',
  },
  {
    title: '5. Įvestis (N+1)',
    body: 'Įvestis jau **„Rytas tapo čempionais"** – ankstesnio žingsnio pasirinktas žodis pridėtas prie senos įvesties. Kontekstas auga: modelis „mato" visą kol kas sugeneruotą tekstą ir vėl „rinks" kitą žodį.',
  },
  {
    title: '6. LLM (N+1)',
    body: 'Modelis vėl **apdoroja** naują įvestį ir skaičiuoja tikimybes kitam žodžiui. Tas pats ciklas: įvestis → skaičiavimai → tikimybės. **Lošimų automatas** „suka" dar vieną „būgną".',
  },
  {
    title: '7. Išvestis (N+1)',
    body: 'Naujos **tikimybės**: pvz. „2024" 22%, „m." 20%, „LKL" 15%. Modelis siūlo žodžius, kurie logiškai tęsia sakinį „Rytas tapo čempionais".',
  },
  {
    title: '8. Pasirinkta (N+1)',
    body: 'Čia **pasirinkta** „2024". Taip **žodis po žodžio** – kaip lošimų automatas žingsnis po žingsnio – generuojamas visas sakinys; kiekvienas pasirinkimas tampa dalimi kitos įvesties.',
  },
];

export const LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS_EN: {
  title: string;
  body: string;
}[] = [
  {
    title: '1. Input (N)',
    body: 'Here is the initial text **"Rockets became"**. This is the input the model will use to predict the next word – like a **slot machine** that "sees" the symbols so far and is about to "spin" the next one.',
  },
  {
    title: '2. LLM (N)',
    body: 'The **language model** processes the input and computes probabilities for the next word. Think of it as the **slot machine "engine"**: it decides which words fit best next (we see the result in the next block).',
  },
  {
    title: '3. Output (N)',
    body: 'The model outputs **probabilities** for the next word: e.g. "champions" 25%, "2024" 20%, "in" 18%. This is not the final word yet – just candidates with percentages, like numbers on the reels.',
  },
  {
    title: '4. Chosen (N)',
    body: 'One word is **chosen** from the probabilities – here "champions". Like a **slot machine** "stopping" on one result. This word is passed to the next step (dashed arrow "Added to new input").',
  },
  {
    title: '5. Input (N+1)',
    body: 'The input is now **"Rockets became champions"** – the previous step\'s chosen word added to the old input. Context grows: the model "sees" all the text generated so far and again "picks" the next word.',
  },
  {
    title: '6. LLM (N+1)',
    body: 'The model **processes** the new input again and computes probabilities for the next word. Same cycle: input → computation → probabilities. The **slot machine** "spins" another "reel".',
  },
  {
    title: '7. Output (N+1)',
    body: 'New **probabilities**: e.g. "2024" 22%, "in" 20%, "NBA" 15%. The model suggests words that logically continue the sentence "Rockets became champions".',
  },
  {
    title: '8. Chosen (N+1)',
    body: 'Here **"2024"** is chosen. So **word by word** – like a slot machine step by step – the full sentence is generated; each choice becomes part of the next input.',
  },
];
