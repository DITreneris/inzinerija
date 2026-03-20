import { useState, useEffect, useRef, useCallback } from 'react';
import {
  CheckCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Save,
  HelpCircle,
  Pencil,
  Copy,
} from 'lucide-react';
import {
  useAutoSave,
  loadAutoSave,
  clearAutoSave,
  saveCompletedContent,
} from '../../../utils/useAutoSave';
import { Progress } from '../../../utils/progress';
import { track } from '../../../utils/analytics';
import {
  detectBlocks,
  getBlockExample,
  type BlockName,
} from '../../../utils/sixBlockStructure';
import { PracticalTask as PracticalTaskType } from '../../../types/modules';
import { useLocale } from '../../../contexts/LocaleContext';
import CopyButton from './CopyButton';

interface PracticalTaskProps {
  task: PracticalTaskType;
  slideId: number;
  moduleId: number;
  onTaskComplete: (taskId: number) => void;
  progress: Progress;
}

export default function PracticalTask({
  task,
  slideId,
  moduleId,
  onTaskComplete,
  progress,
}: PracticalTaskProps) {
  const { locale } = useLocale();
  const autoSaveKey = `task-draft-${moduleId}-${slideId}`;
  const completedContentKey = `task-completed-${moduleId}-${slideId}`;
  const isTaskCompleted =
    progress.completedTasks[moduleId]?.includes(slideId) || false;
  const savedDraft = loadAutoSave<string>(autoSaveKey, '');
  const savedCompleted = loadAutoSave<string>(completedContentKey, '');
  const [answer, setAnswer] = useState(
    isTaskCompleted ? savedCompleted : savedDraft
  );
  const [showSavedFlash, setShowSavedFlash] = useState(false);
  const [showCompleteFeedback, setShowCompleteFeedback] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [showInstructions, setShowInstructions] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const hasDraft = Boolean(answer && answer.trim() && !isTaskCompleted);
  const answerRef = useRef(answer);
  const lastSavedRef = useRef(savedCompleted || '');
  const practiceStartTimeRef = useRef<number | null>(null);
  const hasTrackedStartRef = useRef(false);
  answerRef.current = answer;

  /** MVP Analytics: practice_start on first interaction */
  const trackPracticeStartIfNeeded = useCallback(() => {
    if (hasTrackedStartRef.current) return;
    hasTrackedStartRef.current = true;
    practiceStartTimeRef.current = Date.now();
    track('practice_start', {
      module_id: moduleId,
      slide_id: slideId,
      practice_id: slideId,
    });
  }, [moduleId, slideId]);

  const toggleStep = (step: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(step)) {
      newExpanded.delete(step);
    } else {
      newExpanded.add(step);
    }
    setExpandedSteps(newExpanded);
  };

  // Auto-save draft answers (not when completed – completed content stored separately)
  useAutoSave(autoSaveKey, isTaskCompleted ? '' : answer, 1500);

  // Flash "saved" indicator when value changes
  useEffect(() => {
    if (answer && answer.trim() && !isTaskCompleted) {
      setShowSavedFlash(true);
      const timer = setTimeout(() => setShowSavedFlash(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [answer, isTaskCompleted]);

  // Clear draft when task is completed
  useEffect(() => {
    if (isTaskCompleted) {
      clearAutoSave(autoSaveKey);
    }
  }, [isTaskCompleted, autoSaveKey]);

  // Protect unsaved work with beforeunload warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasUnsaved =
        (!isTaskCompleted && answerRef.current?.trim()) ||
        (isTaskCompleted &&
          isEditing &&
          answerRef.current !== lastSavedRef.current);
      if (hasUnsaved) e.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isTaskCompleted, isEditing]);

  const handleSubmit = () => {
    if (answer?.trim()) {
      trackPracticeStartIfNeeded();
      const timeToCompleteSec = practiceStartTimeRef.current
        ? Math.round((Date.now() - practiceStartTimeRef.current) / 1000)
        : undefined;
      track('practice_complete', {
        module_id: moduleId,
        slide_id: slideId,
        practice_id: slideId,
        time_to_complete_sec: timeToCompleteSec,
      });
      saveCompletedContent(completedContentKey, answer);
      lastSavedRef.current = answer;
      onTaskComplete(slideId);
      clearAutoSave(autoSaveKey);
      setShowCompleteFeedback(true);
      setTimeout(() => setShowCompleteFeedback(false), 2500);
    }
  };

  /** W2: pažymėti užduotį atlikta be teksto (optional) */
  const handleMarkWithoutAnswer = () => {
    trackPracticeStartIfNeeded();
    const timeToCompleteSec = practiceStartTimeRef.current
      ? Math.round((Date.now() - practiceStartTimeRef.current) / 1000)
      : undefined;
    track('practice_complete', {
      module_id: moduleId,
      slide_id: slideId,
      practice_id: slideId,
      time_to_complete_sec: timeToCompleteSec,
    });
    saveCompletedContent(completedContentKey, '—');
    lastSavedRef.current = '—';
    setAnswer('—');
    onTaskComplete(slideId);
    clearAutoSave(autoSaveKey);
    setShowCompleteFeedback(true);
    setTimeout(() => setShowCompleteFeedback(false), 2500);
  };

  const handleSaveEdits = () => {
    if (answer?.trim()) {
      saveCompletedContent(completedContentKey, answer);
      lastSavedRef.current = answer;
      setIsEditing(false);
      setShowSavedFlash(true);
      setTimeout(() => setShowSavedFlash(false), 2000);
    }
  };

  return (
    <div className="mt-8 p-4 sm:p-6 bg-accent-50 dark:bg-accent-900/20 rounded-2xl border-l-4 border-accent-400 relative">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent-600 dark:text-accent-400" />
        <p className="font-bold text-accent-800 dark:text-accent-200">
          {task.title}
        </p>
      </div>

      {showCompleteFeedback && (
        <div
          className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 px-4 py-2 text-emerald-800 dark:text-emerald-200 animate-fade-in"
          role="status"
          aria-live="polite"
        >
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span className="font-medium">
            {locale === 'en' ? 'Well done!' : 'Gerai padirbėta!'}
          </span>
        </div>
      )}

      {task.motivation && (
        <div className="mb-4 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 p-4 rounded-lg border border-brand-200 dark:border-brand-700">
          <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">
            {task.motivation}
          </p>
        </div>
      )}

      {/* M3 Faze 3: Copy blokas virš CTA – šablonas pirmiausia, kad vartotojas matytų, ką kopijuoti */}
      {task.template && (
        <div className="mb-4 bg-white dark:bg-gray-800 border-2 border-accent-200 dark:border-accent-800 rounded-xl p-4 relative group">
          <div className="flex items-start justify-between gap-3 mb-2">
            <p className="text-sm font-semibold text-accent-800 dark:text-accent-200">
              {task.templateLabel ||
                (locale === 'en' ? 'Copy prompt' : 'Kopijuoti promptą')}
            </p>
            <CopyButton text={task.template} />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line font-mono">
            {task.template}
          </p>
          {task.explanation && (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
              {task.explanation}
            </p>
          )}
        </div>
      )}

      {task.instructions && (
        <div className="mb-6 bg-white dark:bg-gray-800 border border-brand-200 dark:border-brand-800 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <h4 className="font-bold text-gray-900 dark:text-white">
                {task.instructions.title}
              </h4>
              {task.instructions.steps.length > 0 && (
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {locale === 'en'
                    ? `${task.instructions.steps.length} steps`
                    : `${task.instructions.steps.length} žingsnių`}
                </span>
              )}
            </div>
            {showInstructions ? (
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>

          {showInstructions && (
            <div className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
              {task.instructions.steps.map((step) => (
                <div
                  key={step.step}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleStep(step.step)}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500 text-white font-bold text-sm"
                        aria-hidden
                      >
                        {step.step}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {step.title}
                          </p>
                          <span className="text-xs font-medium text-brand-600 dark:text-brand-400 shrink-0">
                            ({step.step}/{task.instructions?.steps.length ?? 0})
                          </span>
                          {step.hint && (
                            <span
                              className="inline-flex text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400"
                              title={step.hint}
                              aria-label={
                                locale === 'en'
                                  ? `Hint: ${step.hint}`
                                  : `Užuomina: ${step.hint}`
                              }
                            >
                              <HelpCircle className="w-4 h-4 shrink-0" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {expandedSteps.has(step.step) ? (
                      <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>

                  {expandedSteps.has(step.step) && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <p className="text-xs font-semibold text-amber-800 dark:text-amber-200 mb-1 flex items-center gap-1.5">
                          <Lightbulb
                            className="w-3.5 h-3.5"
                            strokeWidth={1.5}
                          />
                          {locale === 'en' ? 'Tip:' : 'Patarimas:'}
                        </p>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          {step.hint}
                        </p>
                      </div>

                      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 relative group">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-1.5">
                            <Sparkles
                              className="w-3.5 h-3.5"
                              strokeWidth={1.5}
                            />
                            {locale === 'en'
                              ? 'Partial solution (copy):'
                              : 'Tarpinis sprendimas (kopijuoti):'}
                          </p>
                          <CopyButton text={step.partialSolution} />
                        </div>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300 whitespace-pre-line font-mono">
                          {step.partialSolution}
                        </p>
                      </div>
                      {step.whenToProceed && (
                        <p className="text-xs font-medium text-violet-700 dark:text-violet-300 italic">
                          {step.whenToProceed}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6 blokų užpildymo vizualizacija (#6) – A-S1: struktūros tikrinimas (sekcijos META:, INPUT:, …) */}
      {task.instructions?.steps?.length === 6 &&
        (() => {
          const { present, missing } = detectBlocks(answer);
          return (
            <div
              className="mb-3"
              role="status"
              aria-label={
                locale === 'en'
                  ? 'Block completion progress'
                  : 'Blokų užpildymo progresas'
              }
            >
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    'META',
                    'INPUT',
                    'OUTPUT',
                    'REASONING',
                    'QUALITY',
                    'ADVANCED',
                  ] as BlockName[]
                ).map((block) => {
                  const filled = present.includes(block);
                  return (
                    <span
                      key={block}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                        filled
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}
                    >
                      {filled ? (
                        <CheckCircle className="w-3.5 h-3.5" aria-hidden />
                      ) : (
                        <span
                          className="w-3.5 h-3.5 rounded-full border-2 border-current"
                          aria-hidden
                        />
                      )}
                      {block}
                    </span>
                  );
                })}
              </div>
              {missing.length > 0 && answer?.trim() && (
                <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">
                  {locale === 'en' ? (
                    <>
                      Missing blocks: {missing.join(', ')}. E.g.:{' '}
                      {getBlockExample(missing[0], 'en')}
                    </>
                  ) : (
                    <>
                      Trūksta blokų: {missing.join(', ')}. Pvz.:{' '}
                      {getBlockExample(missing[0], 'lt')}
                    </>
                  )}
                </p>
              )}
            </div>
          );
        })()}

      {/* Aiški instrukcija, ką vesti – sumažina painiavą „tik skliausteliai“ vs „visas promptas“ (TEST_REPORT #2) */}
      {(task.inputHint || task.template) && (
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          {task.inputHint ??
            (locale === 'en'
              ? 'Enter the full prompt in the field below. If the template shows [brackets] – replace them with your own words.'
              : 'Įvesk visą promptą į lauką žemiau. Jei šablone matai [skliaustelius] – įrašyk savo žodžius vietoje jų.')}
        </p>
      )}

      <div className="relative">
        <textarea
          className="input min-h-[120px] font-mono text-sm"
          placeholder={task.placeholder}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onFocus={trackPracticeStartIfNeeded}
          disabled={isTaskCompleted && !isEditing}
          aria-label={
            locale === 'en' ? 'Task answer field' : 'Užduoties atsakymo laukas'
          }
        />
        {/* Flash indicator on save */}
        {showSavedFlash && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg animate-fade-in">
            <CheckCircle className="w-3 h-3" />
            <span>{locale === 'en' ? 'Saved' : 'Išsaugota'}</span>
          </div>
        )}
      </div>

      {/* Persistent "draft saved" indicator */}
      {hasDraft && !showSavedFlash && (
        <div className="flex items-center gap-1.5 mt-1 text-xs text-brand-600 dark:text-brand-400">
          <Save className="w-3 h-3" />
          <span>
            {locale === 'en'
              ? 'Draft saved – you can come back anytime'
              : 'Juodraštis išsaugotas – gali grįžti bet kada'}
          </span>
        </div>
      )}

      {!isTaskCompleted ? (
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 order-2 sm:order-1">
            {locale === 'en'
              ? 'Answer is auto-saved'
              : 'Atsakymas automatiškai išsaugomas'}
          </p>
          <div className="flex flex-wrap gap-2 order-1 sm:order-2">
            <button
              onClick={async () => {
                if (answer?.trim()) {
                  try {
                    await navigator.clipboard.writeText(answer);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch (e) {
                    console.error('Kopijuoti nepavyko:', e);
                  }
                }
              }}
              disabled={!answer?.trim()}
              className="btn-secondary flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={
                locale === 'en' ? 'Copy draft' : 'Kopijuoti juodraštį'
              }
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied
                ? locale === 'en'
                  ? 'Copied!'
                  : 'Nukopijuota!'
                : locale === 'en'
                  ? 'Copy'
                  : 'Kopijuoti'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!answer?.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
            >
              <CheckCircle className="w-5 h-5" />
              {locale === 'en' ? 'Save task' : 'Išsaugoti užduotį'}
            </button>
            {task.allowMarkWithoutAnswer && (
              <button
                type="button"
                onClick={handleMarkWithoutAnswer}
                className="btn-secondary flex items-center justify-center gap-2 min-h-[44px]"
                aria-label={
                  locale === 'en'
                    ? 'Mark task done without text'
                    : 'Pažymėti užduotį atlikta be teksto'
                }
              >
                <CheckCircle className="w-4 h-4" />
                {locale === 'en' ? 'Marked as done' : 'Pažymėjau kaip atliktą'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-3 rounded-xl animate-fade-in">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span className="font-semibold">
              {locale === 'en' ? 'Task completed! 🎉' : 'Užduotis atlikta! 🎉'}
            </span>
          </div>
          {/* W2: po atliktos užduoties – feedback promptas (kopijuojamas) */}
          {task.feedbackPrompt && (
            <div className="mt-4 p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-200 mb-2">
                {locale === 'en'
                  ? 'What did you get from AI?'
                  : 'Ką gavai iš DI?'}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-2">
                {task.feedbackPrompt}
              </p>
              <CopyButton
                text={task.feedbackPrompt}
                size="sm"
                ariaLabel={
                  locale === 'en'
                    ? 'Copy feedback prompt'
                    : 'Nukopijuoti atsiliepimo promptą'
                }
              />
            </div>
          )}
          {/* Redaguoti + Kopijuoti – visiems moduliams (įsk. Modulį 3 practice-scenario) */}
          {!isEditing ? (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={async () => {
                  if (answer?.trim()) {
                    try {
                      await navigator.clipboard.writeText(answer);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    } catch (e) {
                      console.error('Kopijuoti nepavyko:', e);
                    }
                  }
                }}
                disabled={!answer?.trim()}
                className="btn-secondary flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={
                  locale === 'en' ? 'Copy prompt' : 'Kopijuoti promptą'
                }
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied
                  ? locale === 'en'
                    ? 'Copied!'
                    : 'Nukopijuota!'
                  : locale === 'en'
                    ? 'Copy'
                    : 'Kopijuoti'}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary flex items-center justify-center gap-2 min-h-[44px]"
                aria-label={
                  locale === 'en' ? 'Edit prompt' : 'Redaguoti promptą'
                }
              >
                <Pencil className="w-4 h-4" />
                {locale === 'en' ? 'Edit' : 'Redaguoti'}
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setAnswer(lastSavedRef.current);
                  setIsEditing(false);
                }}
                className="btn-secondary flex items-center justify-center gap-2 min-h-[44px]"
              >
                {locale === 'en' ? 'Cancel' : 'Atšaukti'}
              </button>
              <button
                onClick={handleSaveEdits}
                disabled={!answer?.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
              >
                <CheckCircle className="w-5 h-5" />
                {locale === 'en' ? 'Save changes' : 'Išsaugoti pakeitimus'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
