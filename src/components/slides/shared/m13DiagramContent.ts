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
      hint: 'Emotion vs clarity: top = more emotion; bottom = more clarity',
      aria: 'Funnel: Awareness, Engagement, Conversion',
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
    hint: 'Emocija vs aiškumas: viršuje – daugiau emocijos; apačioje – aiškumas',
    aria: 'Piltuvas: Awareness, Engagement, Conversion',
  };
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
      aria: 'Three layers: Object, Context, Aesthetics',
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
    aria: 'Trys sluoksniai: Objektas, Kontekstas, Estetika',
  };
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
