import type { StepExplanation } from './stepExplanations';
import type { M10Locale } from './m10DiagramContent';

/** Stage titles only in SVG (etalon); body copy lives in getM13AecExplanations. */
export function getM13AecLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Campaign goals funnel',
      awareness: 'Awareness',
      engagement: 'Engagement',
      conversion: 'Conversion',
      hint: 'Tap a band – when to choose it',
      aria: 'Funnel: Awareness, Engagement, Conversion',
      regionAria: 'Campaign goals – three stages',
      youAreHere: 'You are here:',
      navAria: 'Campaign goal selection',
      stepAria: (i: number, title: string) => `Stage ${i + 1}: ${title}`,
      enlargeLabel: 'A/E/C funnel',
    };
  }
  return {
    title: 'Kampanijos tikslų piltuvas',
    awareness: 'Atpažįstamumas',
    engagement: 'Įsitraukimas',
    conversion: 'Konversija',
    hint: 'Paspausk juostą – kada rinktis',
    aria: 'Piltuvas: atpažįstamumas, įsitraukimas, konversija',
    regionAria: 'Kampanijos tikslai – trys etapai',
    youAreHere: 'Tu esi čia:',
    navAria: 'Kampanijos tikslo pasirinkimas',
    stepAria: (i: number, title: string) => `Etapas ${i + 1}: ${title}`,
    enlargeLabel: 'A/E/C piltuvas',
  };
}

export function getM13AecExplanations(locale: M10Locale): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: 'Awareness',
        body: 'Pull attention with emotion and contrast. Typical formats: cover, banner, social post. More emotion than clarity.',
      },
      {
        title: 'Engagement',
        body: 'Make people stop and interact – clear context, “what is this?”. Typical: carousel (several frames), video intro, article illustration.',
      },
      {
        title: 'Conversion',
        body: 'Drive action – product, offer, call to action (CTA) visible; trust and readability first. Typical: ad layout, landing hero, “buy now” block.',
      },
    ];
  }
  return [
    {
      title: 'Atpažįstamumas',
      body: 'Pritrauk dėmesį emocija ir kontrastu. Tipiniai formatai: viršelis, baneris, įrašas socialiniame tinkle. Daugiau emocijos nei aiškumo.',
    },
    {
      title: 'Įsitraukimas',
      body: 'Skatink sustoti ir sąveikauti – aiškus kontekstas, „kas čia?“. Tipiška: karuselė (keli kadrai), video intro, iliustracija straipsniui.',
    },
    {
      title: 'Konversija',
      body: 'Skatink veiksmą – produktas, pasiūlymas, kvietimas veikti (CTA) matomas; pirmiausia aiškumas ir pasitikėjimas. Tipiška: reklamos maketas, tinklalapio pagrindinis vaizdas (hero), „pirk dabar“ blokas.',
    },
  ];
}

export function getM13PromptStackLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Image prompt = layers',
      obj: 'Object',
      objSub: 'What is shown',
      ctx: 'Context',
      ctxSub: 'Place, action',
      est: 'Aesthetics',
      estSub: 'Style, light',
      hint: 'Tap a layer – explanation below',
      aria: 'Three layers: Object, Context, Aesthetics',
      regionAria: 'Image prompt layers – three steps',
      youAreHere: 'You are here:',
      navAria: 'Prompt layer selection',
      stepAria: (i: number, title: string) => `Layer ${i + 1}: ${title}`,
      enlargeLabel: 'Prompt layers',
    };
  }
  return {
    title: 'Vaizdo promptas = sluoksniai',
    obj: 'Objektas',
    objSub: 'Ką rodoma',
    ctx: 'Kontekstas',
    ctxSub: 'Vieta, veiksmas',
    est: 'Estetika',
    estSub: 'Stilius, šviesa',
    hint: 'Paspausk sluoksnį – paaiškinimas apačioje',
    aria: 'Trys sluoksniai: Objektas, Kontekstas, Estetika',
    regionAria: 'Vaizdo prompto sluoksniai – trys žingsniai',
    youAreHere: 'Tu esi čia:',
    navAria: 'Prompto sluoksnio pasirinkimas',
    stepAria: (i: number, title: string) => `Sluoksnis ${i + 1}: ${title}`,
    enlargeLabel: 'Prompto sluoksniai',
  };
}

export function getM13PromptStackExplanations(
  locale: M10Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: 'Object',
        body: 'Name the main subject with concrete nouns – who or what is shown (person, product, scene element).',
      },
      {
        title: 'Context',
        body: 'Place and action: where it happens and what is going on – desk, street, studio, holding, walking.',
      },
      {
        title: 'Aesthetics',
        body: 'Style and light crown the idea: photoreal, minimal vector, studio light, golden hour. Add aspect ratio separately.',
      },
    ];
  }
  return [
    {
      title: 'Objektas',
      body: 'Įvardyk pagrindinį subjektą konkrečiais daiktavardžiais – kas rodoma (žmogus, produktas, scenos elementas).',
    },
    {
      title: 'Kontekstas',
      body: 'Vieta ir veiksmas: kur vyksta ir kas vyksta – biuras, gatvė, studija, laiko, eina.',
    },
    {
      title: 'Estetika',
      body: 'Stilius ir šviesa vainikuoja idėją: fotorealistiškas, minimalus vektorius, studijos šviesa, aukso valanda. Proporcijas nurodyk atskirai.',
    },
  ];
}

export function getM13ThirdsLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Rule of thirds (guide)',
      sub: 'Put the subject on the right intersection — not dead center',
      aria: 'Composition grid: rule of thirds with subject on the upper-right intersection and muted center',
    };
  }
  return {
    title: 'Trečdalių taisyklė (gairė)',
    sub: 'Subjektą dėk ant dešinės sankirtos — ne į patį centrą',
    aria: 'Kompozicijos tinklelis: trečdalių taisyklė su subjektu ant viršutinės dešinės sankirtos ir prislopintu centru',
  };
}
