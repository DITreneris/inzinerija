import type {
  InteractivePipelineContent,
  InteractivePipelineMode,
  InteractivePipelineStep,
} from '../../../types/modules';
import { getModeLabels, getPipelineNodes, type Locale } from './contextEngineeringPipelineConfig';

const DEFAULT_LABELS_LT: InteractivePipelineContent['labels'] = {
  hint: 'Trumpas paaiškinimas',
  examplePrompt: 'Pavyzdinis promptas',
  withoutContext: 'Be konteksto',
  withContext: 'Su kontekstu',
  availableInContextModeOnly: 'Šis žingsnis aktyvus tik Konteksto inžinerijos režime.',
};

const DEFAULT_LABELS_EN: InteractivePipelineContent['labels'] = {
  hint: 'Short explanation',
  examplePrompt: 'Example prompt',
  withoutContext: 'Without context',
  withContext: 'With context',
  availableInContextModeOnly: 'This step is active only in Context engineering mode.',
};

function getDefaultContent(locale: Locale): InteractivePipelineContent {
  const nodes = getPipelineNodes(locale);
  const labels = locale === 'en' ? DEFAULT_LABELS_EN : DEFAULT_LABELS_LT;
  const modes = locale === 'en'
    ? {
        prompt: { panelTitle: 'Prompt engineering path', panelDescription: 'Short path: goal → prompt → model → answer.' },
        context: { panelTitle: 'Context engineering path', panelDescription: 'Full path: context and tools help get a more accurate answer.' },
      }
    : {
        prompt: { panelTitle: 'Prompt engineering kelias', panelDescription: 'Greitas kelias: tikslas → promptas → modelis → atsakymas.' },
        context: { panelTitle: 'Konteksto inžinerijos kelias', panelDescription: 'Pilnas kelias: kontekstas ir įrankiai padeda gauti tikslesnį atsakymą.' },
      };
  return {
    labels,
    modes,
    steps: nodes.map((node) => ({
      id: node.id,
      title: node.label,
      shortHint: node.sub,
      description: node.sub,
      examplePrompt: '',
      withoutContext: '',
      withContext: '',
      availableInModes: node.mode === 'context' ? ['context'] : ['prompt', 'context'],
    })),
  };
}

function isStepValid(step: InteractivePipelineStep): boolean {
  return Boolean(
    step.id &&
      step.title &&
      step.shortHint &&
      step.description &&
      Array.isArray(step.availableInModes) &&
      step.availableInModes.length > 0,
  );
}

export function resolveInteractivePipelineContent(content?: InteractivePipelineContent, locale: Locale = 'lt'): InteractivePipelineContent {
  const defaultContent = getDefaultContent(locale);
  if (!content) return defaultContent;

  const safeSteps = content.steps?.filter(isStepValid);
  if (!safeSteps || safeSteps.length === 0) return defaultContent;

  return {
    labels: { ...defaultContent.labels, ...content.labels },
    modes: {
      prompt: content.modes?.prompt ?? defaultContent.modes.prompt,
      context: content.modes?.context ?? defaultContent.modes.context,
    },
    steps: safeSteps,
  };
}

export function isStepAvailableInMode(step: InteractivePipelineStep, mode: InteractivePipelineMode): boolean {
  return step.availableInModes.includes(mode);
}

export function getStepById(content: InteractivePipelineContent, stepId: string): InteractivePipelineStep | undefined {
  return content.steps.find((step) => step.id === stepId);
}

export function getFirstAvailableStepId(content: InteractivePipelineContent, mode: InteractivePipelineMode): string {
  const first = content.steps.find((step) => isStepAvailableInMode(step, mode));
  return first?.id ?? content.steps[0]?.id ?? 'goal';
}

export function getModeSummaryLabel(mode: InteractivePipelineMode, locale: Locale = 'lt'): string {
  return getModeLabels(locale)[mode];
}
