/**
 * Modulio 9 sk. 94 – step-synced copy panel (vienas matomas promptas per žingsnį).
 */
import { useLocale } from '../../../contexts/LocaleContext';
import { useTranslation } from 'react-i18next';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import { renderBold } from '../../../utils/renderBold';
import TemplateBlock from './TemplateBlock';
import { getM9WorkflowPrompts } from './m9DataWorkflowContent';

const LABELS = {
  lt: {
    regionAria: 'Workflow promptai pagal žingsnį',
    youAreHere: 'Aktyvus žingsnis:',
    navAria: 'Pasirink workflow žingsnį',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    copyLabel: 'Kopijuoti promptą',
  },
  en: {
    regionAria: 'Workflow prompts by step',
    youAreHere: 'Active step:',
    navAria: 'Select workflow step',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
    copyLabel: 'Copy prompt',
  },
} as const;

export default function M9WorkflowStepCopyBlock() {
  const { locale } = useLocale();
  const { t } = useTranslation('contentSlides');
  const { t: tCommon } = useTranslation('common');
  const loc = locale === 'en' ? 'en' : 'lt';
  const labels = LABELS[loc];
  const prompts = getM9WorkflowPrompts(loc);
  const { currentStep, setCurrentStep, totalSteps } = useStepDiagram(prompts);
  const step = prompts[currentStep] ?? prompts[0];

  return (
    <div
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/40 p-4 space-y-4"
      role="region"
      aria-label={labels.regionAria}
    >
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {labels.youAreHere}{' '}
        <span className="font-semibold text-brand-700 dark:text-brand-300">
          {step.title}
        </span>
      </p>

      <nav className="flex flex-wrap gap-2" aria-label={labels.navAria}>
        {prompts.map((p, i) => {
          const isActive = currentStep === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentStep(i)}
              className={`min-h-[44px] px-3 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 ${
                isActive
                  ? 'bg-accent-500 text-white dark:bg-accent-600'
                  : 'bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
              }`}
              aria-pressed={isActive}
              aria-label={labels.stepAria(i, p.title)}
            >
              {i + 1}
            </button>
          );
        })}
      </nav>

      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {renderBold(step.body)}
      </div>

      <TemplateBlock
        label={labels.copyLabel}
        template={step.copyable}
        copyAriaLabel={t('copyPrompt')}
        copyCopiedLabel={tCommon('copiedExclaim')}
      />

      <p className="sr-only" aria-live="polite">
        {`${currentStep + 1} / ${totalSteps}: ${step.title}`}
      </p>
    </div>
  );
}
