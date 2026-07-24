import type { StepExplanation } from './stepExplanations';
import type { M10Locale } from './m10DiagramContent';

export function getM13AecLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Campaign goals funnel',
      awareness: 'Awareness',
      awarenessSub: 'Attention, emotion',
      engagement: 'Engagement',
      engagementSub: 'Context, stop scroll',
      conversion: 'Conversion',
      conversionSub: 'Action, CTA, trust',
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
    awareness: 'Awareness',
    awarenessSub: 'Dėmesys, emocija',
    engagement: 'Engagement',
    engagementSub: 'Kontekstas, sustojimas',
    conversion: 'Conversion',
    conversionSub: 'Veiksmas, CTA, pasitikėjimas',
    hint: 'Paspausk juostą – kada rinktis',
    aria: 'Piltuvas: Awareness, Engagement, Conversion',
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
        body: 'Make people stop and interact – clear context, “what is this?”. Typical: carousel, video intro, article illustration.',
      },
      {
        title: 'Conversion',
        body: 'Drive action – product, offer, CTA visible; trust and readability first. Typical: ad layout, landing hero, “buy now” block.',
      },
    ];
  }
  return [
    {
      title: 'Awareness',
      body: 'Pritrauk dėmesį emocija ir kontrastu. Tipiniai formatai: viršelis, baneris, social postas. Daugiau emocijos nei aiškumo.',
    },
    {
      title: 'Engagement',
      body: 'Skatink sustoti ir sąveikauti – aiškus kontekstas, „kas čia?“. Tipiška: carousel, video intro, iliustracija straipsniui.',
    },
    {
      title: 'Conversion',
      body: 'Skatink veiksmą – produktas, pasiūlymas, CTA matomas; pirmiausia aiškumas ir pasitikėjimas. Tipiška: reklamos maketas, landingo hero, „pirk dabar“ blokas.',
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
      sub: 'Place focus near intersection points',
      aria: 'Composition grid: rule of thirds with four focal points',
    };
  }
  return {
    title: 'Trečdalių taisyklė (gairė)',
    sub: 'Fokusą kur prie sankirtų',
    aria: 'Kompozicijos tinklelis: trečdalių taisyklė su keturiomis sankirtomis',
  };
}
