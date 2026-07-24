/**
 * M7 sk. 67.7 – haliucinacijų mažinimo grandinė.
 * Type etalon: HTML icon-chain + autoplay (InteractiveDiagramShell).
 */
import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useLocale } from '../../../contexts/LocaleContext';
import { useAutoplaySteps } from '../../../utils/useAutoplaySteps';
import EnlargeableDiagram from './EnlargeableDiagram';
import HallucinationPipelineDiagram from './HallucinationPipelineDiagram';
import {
  getHallucinationPipelineStepExplanations,
  getHallucinationPipelineUi,
  HALLUCINATION_PIPELINE_STEP_KEYS,
} from './hallucinationPipelineContent';
import { InteractiveDiagramShell } from './diagramKit';

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export default function HallucinationPipelineBlock() {
  const { locale } = useLocale();
  const explanations = getHallucinationPipelineStepExplanations(locale);
  const ui = getHallucinationPipelineUi(locale);
  const reducedMotion = usePrefersReducedMotion();
  const { activeIndex, isPlaying, toggle, pinStep } = useAutoplaySteps({
    stepCount: HALLUCINATION_PIPELINE_STEP_KEYS.length,
    reducedMotion,
  });

  const step = explanations[activeIndex] ?? explanations[0];
  const totalSteps = explanations.length;

  return (
    <InteractiveDiagramShell
      density="hero"
      regionAria={ui.regionAria}
      statusLabel={ui.youAreHere}
      currentStep={activeIndex}
      totalSteps={totalSteps}
      currentTitle={`${activeIndex + 1}. ${step.title}`}
      navAria={ui.navAria}
      steps={explanations}
      onStepSelect={pinStep}
      stepAria={ui.stepAria}
      stepOfLabel={ui.stepOfLabel}
      explanationTitle={step.title}
      explanation={<p>{step.body}</p>}
    >
      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={toggle}
          disabled={reducedMotion}
          title={ui.clickHint}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? ui.pauseLabel : ui.playLabel}
          className="inline-flex min-h-[44px] min-w-[44px] items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" strokeWidth={2} aria-hidden />
          ) : (
            <Play className="h-4 w-4" strokeWidth={2} aria-hidden />
          )}
          <span aria-hidden>{isPlaying ? ui.pauseShort : ui.playShort}</span>
        </button>
      </div>

      {reducedMotion ? (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {ui.reducedMotionHint}
        </p>
      ) : null}

      <p className="text-xs font-medium text-brand-700 dark:text-brand-300">
        {ui.bridgeLine}
      </p>

      <p className="sr-only" aria-live="polite">
        {ui.statusLine(activeIndex + 1, totalSteps, step.title)}
      </p>

      <EnlargeableDiagram
        enlargeLabel={ui.enlargeLabel}
        renderContent={() => (
          <HallucinationPipelineDiagram
            activeIndex={activeIndex}
            onStepSelect={pinStep}
            isPlaying={isPlaying}
            reducedMotion={reducedMotion}
            locale={locale}
          />
        )}
      />
    </InteractiveDiagramShell>
  );
}
