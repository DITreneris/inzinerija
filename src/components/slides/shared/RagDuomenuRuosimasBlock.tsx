/**
 * RAG duomenų paruošimo magistralės blokas – interaktyvi schema.
 * Lokalizuota per useLocale() ir getterius.
 */
import { useState } from 'react';
import { Tags, Layers, Layout, CheckCircle2, FileText, Info } from 'lucide-react';
import { useLocale } from '../../../contexts/LocaleContext';
import RagDuomenuRuosimasDiagram from './RagDuomenuRuosimasDiagram';
import CopyButton from './CopyButton';
import {
  getRagDuomenuRuosimasBlockLabels,
  getRagDuomenuRuosimasSteps,
  RAG_STEP_COLOR_CLASSES,
  type RagStepColorKey,
} from './ragDuomenuRuosimasLayout';

const STEP_ICONS = [Tags, Layers, Layout, CheckCircle2, FileText];

export default function RagDuomenuRuosimasBlock() {
  const { locale } = useLocale();
  const steps = getRagDuomenuRuosimasSteps(locale);
  const blockLabels = getRagDuomenuRuosimasBlockLabels(locale);
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const colorKey = step.colorKey as RagStepColorKey;
  const colors = RAG_STEP_COLOR_CLASSES[colorKey];
  const TOTAL_STEPS = steps.length;

  return (
    <div className="space-y-4" role="region" aria-label={blockLabels.regionAria}>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex min-w-[11rem] items-center gap-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 px-3 py-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300"
          aria-live="polite"
        >
          <span className="h-2 w-2 rounded-full bg-brand-500 shrink-0" aria-hidden />
          {blockLabels.youAreHere} {currentStep + 1}. {step.label}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {currentStep + 1} / {TOTAL_STEPS}
        </span>
      </div>

      <RagDuomenuRuosimasDiagram currentStep={currentStep} onStepClick={setCurrentStep} locale={locale} />

      <nav className="flex flex-wrap justify-center gap-1.5" aria-label={blockLabels.navAria}>
        {steps.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentStep(idx)}
            aria-current={currentStep === idx ? 'step' : undefined}
            aria-label={blockLabels.stepAria(idx, s.label)}
            className={`
              flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
              ${currentStep === idx
                ? 'border-brand-500 bg-brand-500 text-white shadow-md'
                : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30'}
            `}
          >
            {idx + 1}
          </button>
        ))}
      </nav>

      {/* 3. Kortelė – promptas + Copy + benefit */}
      <div
        className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 overflow-hidden shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className={`h-1.5 w-full ${colors.bg}`} aria-hidden />

        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = STEP_ICONS[currentStep];
                return (
                  <div
                    className={`p-3 rounded-xl ${colors.bgLight} ${colors.bgLightDark} ${colors.textLight}`}
                  >
                    <Icon className="w-6 h-6" aria-hidden />
                  </div>
                );
              })()}
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{step.label}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{step.phase}</p>
              </div>
            </div>

            <CopyButton
              text={step.prompt}
              ariaLabel={blockLabels.copyPromptLabel}
              copiedLabel={blockLabels.copiedLabel}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 font-semibold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            />
          </div>

          {/* Promptas kopijavimui */}
          <div className="relative">
            <div className="absolute -top-2.5 left-4 px-2 bg-white dark:bg-slate-900 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {blockLabels.promptLabel}
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 lg:p-5 border border-slate-100 dark:border-slate-700 font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              &bdquo;{step.prompt}&ldquo;
            </div>
          </div>

          {/* Kodėl tai svarbu? */}
          <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-brand-50/50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-800/50">
            <Info className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" aria-hidden />
            <div>
              <h4 className="font-bold text-brand-900 dark:text-brand-200 text-sm mb-1">
                {blockLabels.benefitTitle}
              </h4>
              <p className="text-brand-800/90 dark:text-brand-300/90 text-sm leading-relaxed">
                {step.benefit}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
