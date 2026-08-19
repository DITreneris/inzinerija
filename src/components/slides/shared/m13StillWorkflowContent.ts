import type { StepExplanation } from './stepExplanations';
import type { M10Locale } from './m10DiagramContent';

const STEPS_LT = [
  { label: 'Idėja', desc: 'Tikslas, kam' },
  { label: 'Promptas', desc: '3 sluoksniai' },
  { label: 'Bandymas', desc: '2–3 variantai' },
  { label: 'Generuok', desc: 'Vienas modelis' },
  { label: 'Pataisyk', desc: 'Spalvos, kirpimas' },
] as const;

const STEPS_EN = [
  { label: 'Idea', desc: 'Goal, who' },
  { label: 'Prompt', desc: '3 layers' },
  { label: 'Try', desc: '2–3 variants' },
  { label: 'Generate', desc: 'One model' },
  { label: 'Fix', desc: 'Color, crop' },
] as const;

export function getM13StillWorkflowSteps(locale: M10Locale) {
  return locale === 'en' ? STEPS_EN : STEPS_LT;
}

export function getM13StillWorkflowExplanations(
  locale: M10Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: '1. Idea',
        body: 'Write the goal (awareness / engagement / conversion), audience and mood **before** you open a tool.',
      },
      {
        title: '2. Prompt',
        body: 'Fill object + context + aesthetics. One style lock (15+ words) if this is a series.',
      },
      {
        title: '3. Try',
        body: 'Run 2–3 short tests. Change one thing at a time – not five knobs at once.',
      },
      {
        title: '4. Generate',
        body: 'Keep one model for the series. Save the prompt that worked.',
      },
      {
        title: '5. Fix',
        body: 'Crop, color, text if needed. The generator is not the last step.',
      },
    ];
  }
  return [
    {
      title: '1. Idėja',
      body: 'Užrašyk tikslą (atpažįstamumas / įsitraukimas / konversija), kam skirta ir nuotaiką **prieš** atidarydamas įrankį.',
    },
    {
      title: '2. Promptas',
      body: 'Užpildyk objektą + kontekstą + estetiką. Serijai – vienas stiliaus užraktas (15+ žodžių).',
    },
    {
      title: '3. Bandymas',
      body: 'Paleisk 2–3 trumpus bandymus. Keisk po vieną dalyką – ne penkis mygtukus iš karto.',
    },
    {
      title: '4. Generuok',
      body: 'Serijai laikyk vieną modelį. Išsaugok promptą, kuris suveikė.',
    },
    {
      title: '5. Pataisyk',
      body: 'Kirpk, sulygink spalvas, pridėk tekstą jei reikia. Generatorius – ne paskutinis žingsnis.',
    },
  ];
}

export function getM13StillWorkflowChrome(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Still-image workflow',
      metaphorCaption: 'Desk stations – five print cards on the table',
      hint: 'Tap a station – explanation below',
      aria: 'Five desk stations: idea, prompt, try, generate, fix',
      regionAria: 'Still-image workflow – five stations',
      youAreHere: 'You are here:',
      navAria: 'Workflow station selection',
      stepAria: (i: number, title: string) => `Station ${i + 1}: ${title}`,
      enlargeLabel: 'Still-image workflow',
    };
  }
  return {
    title: 'Vaizdų darbo eiga',
    metaphorCaption: 'Stalo stotys – penkios kortelės ant stalo',
    hint: 'Paspausk stotį – paaiškinimas apačioje',
    aria: 'Penkios stalo stotys: idėja, promptas, bandymas, generuok, pataisyk',
    regionAria: 'Vaizdų darbo eiga – penkios stotys',
    youAreHere: 'Tu esi čia:',
    navAria: 'Eigos stočių pasirinkimas',
    stepAria: (i: number, title: string) => `Stotis ${i + 1}: ${title}`,
    enlargeLabel: 'Vaizdų darbo eiga',
  };
}
