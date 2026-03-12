import { Check, X, Lightbulb } from 'lucide-react';
import type { TestQuestion } from '../../../../types/modules';
import { ConfidenceSelector } from './ConfidenceSelector';
import type { ConfidenceLevel } from './ConfidenceSelector';
import { confidenceLabel } from './confidenceLabels';
import { useLocale } from '../../../../contexts/LocaleContext';

interface TrueFalseQuestionProps {
  question: TestQuestion;
  questionIndex: number;
  userAnswer: number | undefined;
  showResults: boolean;
  showHint: boolean;
  confidence?: ConfidenceLevel;
  onConfidence?: (level: ConfidenceLevel) => void;
  onAnswer: (questionId: string, value: number) => void;
  onRequestHint: (questionId: string) => void;
}

/** True/False: userAnswer 1 = Tiesa, 0 = Netiesa */
export function TrueFalseQuestion({
  question,
  questionIndex,
  userAnswer,
  showResults,
  showHint,
  confidence,
  onConfidence,
  onAnswer,
  onRequestHint,
}: TrueFalseQuestionProps) {
  const { locale } = useLocale();
  const correctValue = question.isTrue ? 1 : 0;
  const isCorrect = userAnswer === correctValue;
  const answerDisabled = showResults || confidence === undefined;
  const en = locale === 'en';

  const handleSelect = (value: number) => {
    if (showResults || confidence === undefined) return;
    onAnswer(question.id, value);
  };

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
      <div className="flex items-start gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-bold flex-shrink-0">
          {questionIndex + 1}
        </span>
        <div>
          <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
            {en ? 'True or False?' : 'Tiesa ar Netiesa?'}
          </span>
          <p className="font-bold text-gray-900 dark:text-white mt-1">{question.question}</p>
        </div>
      </div>

      <ConfidenceSelector
        value={confidence}
        onChange={(level) => onConfidence?.(level)}
        disabled={showResults}
      />

      <div className="grid grid-cols-2 gap-3">
        {/* Tiesa button */}
        <button
          onClick={() => handleSelect(1)}
          disabled={answerDisabled}
          aria-label={en ? 'True' : 'Tiesa'}
          className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all min-h-[56px] font-semibold ${
            showResults
              ? correctValue === 1
                ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'
                : userAnswer === 1
                ? 'border-rose-500 bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200'
                : 'border-gray-200 dark:border-gray-700 text-gray-400'
              : userAnswer === 1
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200'
              : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-300'
          }`}
        >
          <Check className="w-5 h-5" />
          {en ? 'True' : 'Tiesa'}
        </button>

        {/* Netiesa button */}
        <button
          onClick={() => handleSelect(0)}
          disabled={answerDisabled}
          aria-label={en ? 'False' : 'Netiesa'}
          className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all min-h-[56px] font-semibold ${
            showResults
              ? correctValue === 0
                ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'
                : userAnswer === 0
                ? 'border-rose-500 bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200'
                : 'border-gray-200 dark:border-gray-700 text-gray-400'
              : userAnswer === 0
              ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-200'
              : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-rose-300'
          }`}
        >
          <X className="w-5 h-5" />
          {en ? 'False' : 'Netiesa'}
        </button>
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

      {/* Request hint button */}
      {!showHint && question.hint && !showResults && userAnswer !== undefined && userAnswer !== correctValue && (
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
          </div>
        </>
      )}
    </div>
  );
}
