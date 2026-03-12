import { Lightbulb, CheckCircle, BookOpen, ExternalLink } from 'lucide-react';
import type { TestQuestion } from '../../../../types/modules';
import { ConfidenceSelector } from './ConfidenceSelector';
import type { ConfidenceLevel } from './ConfidenceSelector';
import { confidenceLabel } from './confidenceLabels';
import { useLocale } from '../../../../contexts/LocaleContext';

interface ScenarioQuestionProps {
  question: TestQuestion;
  questionIndex: number;
  userAnswer: number | undefined;
  showResults: boolean;
  showHint: boolean;
  confidence?: ConfidenceLevel;
  onConfidence?: (level: ConfidenceLevel) => void;
  onAnswer: (questionId: string, optionIndex: number) => void;
  onRequestHint: (questionId: string) => void;
  onRemediationLink?: (moduleId: number, slideId: number) => void;
}

/**
 * Scenario-based MCQ: shows a business context box, then MCQ options.
 */
export function ScenarioQuestion({
  question,
  questionIndex,
  userAnswer,
  showResults,
  showHint,
  confidence,
  onConfidence,
  onAnswer,
  onRequestHint,
  onRemediationLink,
}: ScenarioQuestionProps) {
  const { locale } = useLocale();
  const isCorrect = userAnswer === question.correct;
  const options = question.options || [];
  const answerDisabled = showResults || confidence === undefined;
  const en = locale === 'en';

  return (
    <div
      className={`p-5 rounded-xl border-2 transition-all ${
        showResults
          ? isCorrect
            ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20'
            : 'border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/20'
          : 'bg-brand-50/50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-700'
      }`}
    >
      <div className="flex items-start gap-2 mb-3">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-sm font-bold flex-shrink-0">
          {questionIndex + 1}
        </span>
        <div>
          <span className="text-xs font-semibold text-accent-600 dark:text-accent-400 uppercase tracking-wider">
            <BookOpen className="w-3 h-3 inline mr-1" />
            {en ? 'Business scenario' : 'Verslo scenarijus'}
          </span>
        </div>
      </div>

      {/* Scenario context box */}
      {question.scenarioContext && (
        <div className="mb-4 p-4 rounded-lg bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {question.scenarioContext}
          </p>
        </div>
      )}

      {/* Question */}
      <p className="font-bold text-gray-900 dark:text-white mb-4">{question.question}</p>

      <ConfidenceSelector
        value={confidence}
        onChange={(level) => onConfidence?.(level)}
        disabled={showResults}
      />

      {/* Options - same as MCQ */}
      <div className="space-y-2">
        {options.map((option, idx) => {
          const isSelected = userAnswer === idx;
          const isCorrectOption = idx === question.correct;

          return (
            <button
              key={idx}
              onClick={() => onAnswer(question.id, idx)}
              disabled={answerDisabled}
              aria-label={`${en ? 'Option' : 'Pasirinkimas'}: ${option}`}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all min-h-[44px] ${
                showResults
                  ? isCorrectOption
                    ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30'
                    : isSelected && !isCorrectOption
                    ? 'border-rose-500 bg-rose-100 dark:bg-rose-900/30'
                    : 'border-gray-200 dark:border-gray-700'
                  : isSelected
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    showResults
                      ? isCorrectOption
                        ? 'border-emerald-500 bg-emerald-500'
                        : isSelected
                        ? 'border-rose-500 bg-rose-500'
                        : 'border-gray-300'
                      : isSelected
                      ? 'border-brand-500 bg-brand-500'
                      : 'border-gray-300'
                  }`}
                >
                  {showResults && isCorrectOption && <CheckCircle className="w-4 h-4 text-white" />}
                  {isSelected && !showResults && <div className="w-3 h-3 rounded-full bg-white" />}
                </div>
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Progressive hint */}
      {showHint && question.hint && !showResults && (
        <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200">{question.hint}</p>
          </div>
        </div>
      )}

      {!showHint && question.hint && !showResults && userAnswer !== undefined && userAnswer !== question.correct && (
        <button
          onClick={() => onRequestHint(question.id)}
          className="mt-3 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1 transition-colors"
          aria-label={en ? 'Get hint' : 'Gauti užuominą'}
        >
          <Lightbulb className="w-4 h-4" />
          {en ? 'Show hint' : 'Rodyti užuominą'}
        </button>
      )}

      {showResults && (
        <>
          {confidence != null && (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              {en ? 'Confidence:' : 'Pasitikėjimas:'}{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">{confidenceLabel(confidence, locale)}</span>
            </p>
          )}
          <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
            <p className={`text-sm ${isCorrect ? 'text-emerald-800 dark:text-emerald-200' : 'text-amber-800 dark:text-amber-200'}`}>
              <strong>{isCorrect ? (en ? 'Correct!' : 'Teisingai!') : (en ? 'Incorrect.' : 'Neteisingai.')}</strong> {question.explanation}
            </p>
            {!isCorrect && question.ifWrongSee && onRemediationLink && (
              <button
                type="button"
                onClick={() => onRemediationLink(question.ifWrongSee!.moduleId, question.ifWrongSee!.slideId)}
                className="mt-3 flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline"
                aria-label={en ? `View slide: ${question.ifWrongSee!.label}` : `Peržiūrėti skaidrę: ${question.ifWrongSee!.label}`}
              >
                <ExternalLink className="w-4 h-4" />
                {en
                  ? `If incorrect – see slide "${question.ifWrongSee!.label}"`
                  : `Jei klaidingai – žr. skaidrę \u201E${question.ifWrongSee!.label}\u201C`}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
