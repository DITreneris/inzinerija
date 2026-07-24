import type { StepExplanation } from './stepExplanations';
import type { M10Locale } from './m10DiagramContent';

export type M15PracticePath = 'quick' | 'full';

export function getM15PracticeLoopLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Project loop',
      quick: 'Quick path',
      full: 'Full path (optional)',
      brief: 'Brief',
      pick: 'Pick one',
      img: 'Image',
      vid: 'Video',
      mus: 'Audio',
      prompt: 'Prompt',
      result: 'Result',
      fix: 'Tweak',
      qa: 'QA',
      done: 'Done',
      repeat: 'Tweak until ready',
      aria: 'Project loop: quick path from brief to one asset, optional full path from image to video to audio, montage and quality check',
      modeAria: 'Project path mode',
      regionAriaQuick: 'Quick project path – five steps',
      regionAriaFull: 'Full project path – five steps',
      youAreHere: 'You are here:',
      navAria: 'Project step selection',
      stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
      enlargeLabel: 'Project loop',
      hint: 'Tap a step – explanation below',
    };
  }
  return {
    title: 'Projekto ciklas',
    quick: 'Greitas kelias',
    full: 'Pilnas kelias (optional)',
    brief: 'Brief',
    pick: 'Pasirink vieną',
    img: 'Vaizdas',
    vid: 'Video',
    mus: 'Garsas',
    prompt: 'Promptas',
    result: 'Rezultatas',
    fix: 'Korekcija',
    qa: 'QA',
    done: 'Baigta',
    repeat: 'Koreguok, kol tinka',
    aria: 'Projekto ciklas: greitas kelias nuo brief iki vieno artefakto, optional pilnas kelias nuo vaizdo iki video, garso, montažo ir patikros',
    modeAria: 'Projekto kelio režimas',
    regionAriaQuick: 'Greitas projekto kelias – penki žingsniai',
    regionAriaFull: 'Pilnas projekto kelias – penki žingsniai',
    youAreHere: 'Tu esi čia:',
    navAria: 'Projekto žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Projekto ciklas',
    hint: 'Paspausk žingsnį – paaiškinimas apačioje',
  };
}

const CTA_QUICK_LT = ' Kitas žingsnis: skaidrė 150.5 (hero vaizdas).';
const CTA_QUICK_EN = ' Next step: slide 150.5 (hero image).';
const CTA_FULL_LT = ' Kitas žingsnis: skaidrė 151 (optional full).';
const CTA_FULL_EN = ' Next step: slide 151 (optional full).';

export function getM15PracticeLoopExplanations(
  locale: M10Locale,
  path: M15PracticePath
): StepExplanation[] {
  if (path === 'full') {
    const cta = locale === 'en' ? CTA_FULL_EN : CTA_FULL_LT;
    if (locale === 'en') {
      return [
        {
          title: '1. Image',
          body: `Lock a keyframe (hero) with brand and refs. This is the visual anchor for short clips.${cta}`,
        },
        {
          title: '2. Video',
          body: `Generate **3–5 s** I2V clips from the keyframe – not one long one-shot.${cta}`,
        },
        {
          title: '3. Audio',
          body: `Audio-first: VO or licensed bed sets the duration before montage.${cta}`,
        },
        {
          title: '4. QA',
          body: `Check brand, message, rights and disclosure before you publish.${cta}`,
        },
        {
          title: '5. Done',
          body: `Optional montage 15–30 s + CPI note, then go to the project summary.${cta}`,
        },
      ];
    }
    return [
      {
        title: '1. Vaizdas',
        body: `Užrakink keyframe (hero) su brand ir refs. Tai vizualus stuburas trumpiems klipams.${cta}`,
      },
      {
        title: '2. Video',
        body: `Generuok **3–5 s** I2V klipus iš keyframe – ne vieną ilgą one-shot.${cta}`,
      },
      {
        title: '3. Garsas',
        body: `Audio-first: VO arba licensed bed diktuoja trukmę prieš montažą.${cta}`,
      },
      {
        title: '4. QA',
        body: `Patikrink brand, žinutę, teises ir disclosure prieš publikaciją.${cta}`,
      },
      {
        title: '5. Baigta',
        body: `Optional montažas 15–30 s + CPI pastaba, tada eik į projekto santrauką.${cta}`,
      },
    ];
  }

  const cta = locale === 'en' ? CTA_QUICK_EN : CTA_QUICK_LT;
  if (locale === 'en') {
    return [
      {
        title: '1. Brief',
        body: `Two lines: goal (A/E/C), audience and platform. Enough to steer the hero image.${cta}`,
      },
      {
        title: '2. Pick one',
        body: `Choose one asset type for the quick path – usually a single hero image.${cta}`,
      },
      {
        title: '3. Prompt',
        body: `Write and save the prompt you used (object + context + style + aspect ratio).${cta}`,
      },
      {
        title: '4. Result',
        body: `Generate the hero image. Keep the brief + prompt with the file.${cta}`,
      },
      {
        title: '5. Tweak',
        body: `Iterate until brand and message fit – then go to the summary (slide 150.5 is enough).${cta}`,
      },
    ];
  }

  return [
    {
      title: '1. Brief',
      body: `Dvi eilutės: tikslas (A/E/C), auditorija ir platforma. Pakanka hero vaizdui.${cta}`,
    },
    {
      title: '2. Pasirink vieną',
      body: `Greitam keliui rinkis vieną artefaktą – dažniausiai hero vaizdą.${cta}`,
    },
    {
      title: '3. Promptas',
      body: `Parašyk ir išsaugok naudotą promptą (objektas + kontekstas + stilius + proporcijos).${cta}`,
    },
    {
      title: '4. Rezultatas',
      body: `Sugeneruok hero vaizdą. Brief + promptą laikyk kartu su failu.${cta}`,
    },
    {
      title: '5. Korekcija',
      body: `Koreguok, kol brand ir žinutė tinka – tada eik į santrauką (150.5 pakanka).${cta}`,
    },
  ];
}
