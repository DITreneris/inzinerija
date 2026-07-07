import type { M10Locale } from './m10DiagramContent';

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
      mus: 'Music',
      prompt: 'Prompt',
      result: 'Result',
      fix: 'Tweak',
      qa: 'QA',
      done: 'Done',
      repeat: 'Tweak until ready',
      aria: 'Project loop: quick path from brief to one asset, optional full path from image to video to music and quality check',
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
    mus: 'Muzika',
    prompt: 'Promptas',
    result: 'Rezultatas',
    fix: 'Korekcija',
    qa: 'QA',
    done: 'Baigta',
    repeat: 'Koreguok, kol tinka',
    aria: 'Projekto ciklas: greitas kelias nuo brief iki vieno artefakto, optional pilnas kelias nuo vaizdo iki video, muzikos ir patikros',
  };
}
