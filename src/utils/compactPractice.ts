import type { PracticalTask, Slide } from '../types/modules';

export type CompactPracticeStep = {
  step: number;
  title: string;
  description: string;
};

export type CompactPracticeContent = {
  scenarioTitle?: string;
  scenarioDescription?: string;
  taskFrame?: { task: string; doneWhen: string } | string;
  template?: string;
  templateLabel?: string;
  scenario?: { narrativeLead?: string };
  instructions?: { title?: string; steps?: CompactPracticeStep[] };
};

function isFullScenario(slide: Slide): boolean {
  return (
    slide.scenario != null &&
    typeof slide.scenario.context === 'string' &&
    slide.scenario.context.trim().length > 0
  );
}

export function getCompactPracticeContent(
  slide: Slide
): CompactPracticeContent | null {
  if (isFullScenario(slide)) return null;
  const content = slide.content as CompactPracticeContent | undefined;
  if (!content) return null;
  const hasCompact =
    typeof content.template === 'string' ||
    typeof content.scenarioDescription === 'string' ||
    typeof content.scenario?.narrativeLead === 'string';
  return hasCompact ? content : null;
}

export function resolveCompactTaskFrame(
  content: CompactPracticeContent,
  locale: string
): { task: string; doneWhen: string } | undefined {
  const raw = content.taskFrame;
  const fallbackDone =
    locale === 'en'
      ? 'You saved the prompt and the result.'
      : 'Išsaugojai promptą ir rezultatą.';
  if (raw && typeof raw === 'object' && typeof raw.task === 'string') {
    return { task: raw.task, doneWhen: raw.doneWhen || fallbackDone };
  }
  if (typeof content.scenarioDescription === 'string') {
    return { task: content.scenarioDescription, doneWhen: fallbackDone };
  }
  if (typeof raw === 'string' && raw.trim() && raw !== 'Užduotis') {
    return { task: raw, doneWhen: fallbackDone };
  }
  return undefined;
}

/** Mark-complete wire when JSON has no top-level practicalTask. */
export function synthesizeCompactPracticalTask(
  slide: Slide,
  locale: string
): PracticalTask | null {
  const content = getCompactPracticeContent(slide);
  if (!content?.template && !content?.scenarioDescription) return null;
  const isEn = locale.startsWith('en');
  return {
    title:
      content.templateLabel ??
      content.scenarioTitle ??
      (isEn ? 'Task' : 'Užduotis'),
    placeholder: isEn
      ? 'Paste the prompt you used…'
      : 'Įklijuok naudotą promptą…',
    allowMarkWithoutAnswer: true,
  };
}
