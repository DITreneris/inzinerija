import type { M10Locale } from './m10DiagramContent';

export function getM15PracticeLoopLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Project loop',
      pick: 'Pick one track',
      img: 'Image',
      vid: 'Video',
      mus: 'Music',
      prompt: 'Prompt',
      result: 'Result',
      fix: 'Tweak',
      aria: 'Choose image, video or music; then prompt, result, tweak loop',
    };
  }
  return {
    title: 'Projekto ciklas',
    pick: 'Pasirink vieną kelią',
    img: 'Vaizdas',
    vid: 'Video',
    mus: 'Muzika',
    prompt: 'Promptas',
    result: 'Rezultatas',
    fix: 'Korekcija',
    aria: 'Pasirink vaizdą, video ar muziką; tada promptas, rezultatas, korekcijos ciklas',
  };
}
