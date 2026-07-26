/**
 * Modulio 9 sk. 93 – step-synced copy panel (vienas matomas promptas per žingsnį).
 * Step index shared with M9DataWorkflowBlock (schema is the selector).
 */
import { useLocale } from '../../../contexts/LocaleContext';
import { useTranslation } from 'react-i18next';
import TemplateBlock from './TemplateBlock';
import { getM9WorkflowPrompts } from './m9DataWorkflowContent';
import { resolveM9JourneySlots } from '../../../utils/resolveM9JourneyCopy';
import { applyM9JourneyTheme } from '../../../utils/applyM9JourneyTheme';
import { getProgress } from '../../../utils/progress';
import { useM9SharedWorkflowStep } from '../../../utils/m9WorkflowSharedStep';

const LABELS = {
  lt: {
    regionAria: 'Kopijuojamas promptas pagal žingsnį',
    activeStep: 'Šio žingsnio promptas:',
    copyLabel: 'Kopijuoti promptą',
    hint: 'Žingsnį keisk schemoje aukščiau – čia lieka kopijuojamas šablonas.',
  },
  en: {
    regionAria: 'Copyable prompt by step',
    activeStep: 'Prompt for this step:',
    copyLabel: 'Copy prompt',
    hint: 'Change the step in the schema above – this stays the copyable template.',
  },
} as const;

export default function M9WorkflowStepCopyBlock() {
  const { locale } = useLocale();
  const { t } = useTranslation('contentSlides');
  const { t: tCommon } = useTranslation('common');
  const loc = locale === 'en' ? 'en' : 'lt';
  const labels = LABELS[loc];
  const prompts = getM9WorkflowPrompts(loc);
  const { currentStep } = useM9SharedWorkflowStep(prompts.length);
  const step = prompts[currentStep] ?? prompts[0];
  const journeyId = getProgress()?.moduleJourneyFocus?.[9];
  const slots = resolveM9JourneySlots(journeyId, loc);
  const themeHint = slots.themePlaceholder;
  const copyable = applyM9JourneyTheme(step.copyable, themeHint);

  return (
    <div
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/40 p-4 space-y-3"
      role="region"
      aria-label={labels.regionAria}
    >
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {labels.hint}
      </p>
      <p className="text-xs font-medium text-brand-700 dark:text-brand-300">
        {slots.kpiHint}
      </p>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {labels.activeStep}{' '}
        <span className="font-semibold text-brand-700 dark:text-brand-300">
          {currentStep + 1}. {step.title}
        </span>
        <span className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-400">
          ({currentStep + 1}/{prompts.length})
        </span>
      </p>

      <TemplateBlock
        label={labels.copyLabel}
        template={copyable}
        copyAriaLabel={t('copyPrompt')}
        copyCopiedLabel={tCommon('copiedExclaim')}
      />

      <p className="sr-only" aria-live="polite">
        {`${currentStep + 1} / ${prompts.length}: ${step.title}`}
      </p>
    </div>
  );
}
