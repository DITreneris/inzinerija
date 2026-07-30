/**
 * RAG duomenų paruošimo magistralės blokas – InteractiveDiagramShell chrome + HTML pipeline.
 * Lokalizuota per useLocale() ir getterius.
 */
import { useState } from 'react';
import {
  Tags,
  Layers,
  Layout,
  CheckCircle2,
  FileText,
  Info,
} from 'lucide-react';
import { useLocale } from '../../../contexts/LocaleContext';
import RagDuomenuRuosimasDiagram from './RagDuomenuRuosimasDiagram';
import CopyButton from './CopyButton';
import { InteractiveDiagramShell } from './diagramKit';
import {
  getRagDuomenuRuosimasBlockLabels,
  getRagDuomenuRuosimasSteps,
} from './ragDuomenuRuosimasLayout';

const STEP_ICONS = [Tags, Layers, Layout, CheckCircle2, FileText];

export default function RagDuomenuRuosimasBlock() {
  const { locale } = useLocale();
  const steps = getRagDuomenuRuosimasSteps(locale);
  const blockLabels = getRagDuomenuRuosimasBlockLabels(locale);
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const Icon = STEP_ICONS[currentStep];
  const shellSteps = steps.map((s) => ({ title: s.label }));

  return (
    <InteractiveDiagramShell
      density="hero"
      regionAria={blockLabels.regionAria}
      statusLabel={blockLabels.youAreHere}
      currentStep={currentStep}
      totalSteps={steps.length}
      currentTitle={`${currentStep + 1}. ${step.label}`}
      navAria={blockLabels.navAria}
      steps={shellSteps}
      onStepSelect={setCurrentStep}
      stepAria={blockLabels.stepAria}
      explanationTitle={step.label}
      explanation={
        <div className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {step.phase}
              </p>
            </div>
            <CopyButton
              text={step.prompt}
              ariaLabel={blockLabels.copyPromptLabel}
              copiedLabel={blockLabels.copiedLabel}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:bg-slate-800 dark:hover:bg-slate-700"
            />
          </div>

          <div className="relative">
            <div className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-900 dark:text-slate-500">
              {blockLabels.promptLabel}
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 font-mono text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300 lg:p-5">
              &bdquo;{step.prompt}&ldquo;
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/50 p-4 dark:border-brand-800/50 dark:bg-brand-900/10">
            <Info
              className="mt-0.5 h-5 w-5 shrink-0 text-brand-500"
              aria-hidden
            />
            <div>
              <h4 className="mb-1 text-sm font-bold text-brand-900 dark:text-brand-200">
                {blockLabels.benefitTitle}
              </h4>
              <p className="text-sm leading-relaxed text-brand-800/90 dark:text-brand-300/90">
                {step.benefit}
              </p>
            </div>
          </div>
        </div>
      }
    >
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {blockLabels.diagramHint.trim()}
      </p>
      <RagDuomenuRuosimasDiagram
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        locale={locale}
      />
    </InteractiveDiagramShell>
  );
}
