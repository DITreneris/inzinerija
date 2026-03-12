import { useState, useCallback, useMemo } from 'react';
import { ArrowUp, ArrowDown, CheckCircle, Lightbulb, GripVertical } from 'lucide-react';
import type { TestQuestion } from '../../../../types/modules';
import { ConfidenceSelector } from './ConfidenceSelector';
import type { ConfidenceLevel } from './ConfidenceSelector';
import { confidenceLabel } from './confidenceLabels';
import { useLocale } from '../../../../contexts/LocaleContext';

interface OrderingQuestionProps {
  question: TestQuestion;
  questionIndex: number;
  showResults: boolean;
  showHint: boolean;
  confidence?: ConfidenceLevel;
  onConfidence?: (level: ConfidenceLevel) => void;
  onComplete: (questionId: string, score: number) => void;
  onRequestHint: (questionId: string) => void;
}

/**
 * Ordering question – reorder items using up/down buttons.
 * Score = fraction of items in correct position (0–1).
 */
export function OrderingQuestion({
  question,
  questionIndex,
  showResults: _showResults,
  showHint,
  confidence,
  onConfidence,
  onComplete,
  onRequestHint,
}: OrderingQuestionProps) {
  void _showResults;
  const { locale } = useLocale();
  const en = locale === 'en';
  const correctOrder = useMemo(() => question.correctOrder || [], [question.correctOrder]);
  const initialItems = question.items || [...correctOrder].sort(() => Math.random() - 0.5);

  const [items, setItems] = useState<string[]>(initialItems);
  const [isChecked, setIsChecked] = useState(false);

  const moveItem = useCallback((fromIdx: number, direction: 'up' | 'down') => {
    if (isChecked) return;
    const toIdx = direction === 'up' ? fromIdx - 1 : fromIdx + 1;
    if (toIdx < 0 || toIdx >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[fromIdx], next[toIdx]] = [next[toIdx], next[fromIdx]];
      return next;
    });
  }, [isChecked, items.length]);

  const handleCheck = useCallback(() => {
    setIsChecked(true);
    let correctCount = 0;
    items.forEach((item, idx) => {
      if (item === correctOrder[idx]) correctCount++;
    });
    const score = correctOrder.length > 0 ? correctCount / correctOrder.length : 0;
    onComplete(question.id, score);
  }, [items, correctOrder, onComplete, question.id]);

  return (
    <div
      className={`p-5 rounded-xl border-2 transition-all ${
        isChecked
          ? 'border-brand-300 dark:border-brand-700 bg-brand-50/30 dark:bg-brand-900/10'
          : 'bg-brand-50/50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-700'
      }`}
    >
      <div className="flex items-start gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-bold flex-shrink-0">
          {questionIndex + 1}
        </span>
        <div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            {en ? 'Order' : 'Surikiuok'}
          </span>
          <p className="font-bold text-gray-900 dark:text-white mt-1">{question.question}</p>
        </div>
      </div>

      {!isChecked && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {en
            ? 'Use the arrows to reorder items in the correct order (top to bottom).'
            : 'Naudokite rodykles, kad surikiuotumėte elementus teisinga tvarka (nuo viršaus žemyn).'}
        </p>
      )}

      <ConfidenceSelector
        value={confidence}
        onChange={(level) => onConfidence?.(level)}
        disabled={isChecked}
      />

      <div className="space-y-2">
        {items.map((item, idx) => {
          const isCorrectPosition = isChecked && item === correctOrder[idx];
          const isWrongPosition = isChecked && item !== correctOrder[idx];

          return (
            <div
              key={`${item}-${idx}`}
              className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                isChecked
                  ? isCorrectPosition
                    ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30'
                    : 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30'
              }`}
            >
              {/* Position number */}
              <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold flex-shrink-0 ${
                isChecked
                  ? isCorrectPosition
                    ? 'bg-emerald-500 text-white'
                    : 'bg-rose-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {idx + 1}
              </span>

              {/* Grip icon */}
              <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />

              {/* Item text */}
              <span className="flex-1 text-sm text-gray-800 dark:text-gray-200 font-medium">
                {item}
              </span>

              {/* Move buttons */}
              {!isChecked && (
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button
                    onClick={() => moveItem(idx, 'up')}
                    disabled={idx === 0}
                    aria-label={en ? `Move up: ${item}` : `Perkelti aukštyn: ${item}`}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => moveItem(idx, 'down')}
                    disabled={idx === items.length - 1}
                    aria-label={en ? `Move down: ${item}` : `Perkelti žemyn: ${item}`}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              )}

              {/* Result icons */}
              {isChecked && isCorrectPosition && (
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              )}
              {isChecked && isWrongPosition && (
                <span className="text-xs text-rose-600 dark:text-rose-400 flex-shrink-0">
                  → {correctOrder.indexOf(item) + 1}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Check button */}
      {!isChecked && (
        <button
          onClick={handleCheck}
          className="mt-4 w-full btn-primary flex items-center justify-center gap-2 min-h-[44px]"
          aria-label={en ? 'Check order' : 'Patikrinti tvarką'}
        >
          <CheckCircle className="w-5 h-5" />
          {en ? 'Check order' : 'Patikrinti tvarką'}
        </button>
      )}

      {/* Progressive hint */}
      {showHint && question.hint && !isChecked && (
        <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200">{question.hint}</p>
          </div>
        </div>
      )}

      {!showHint && question.hint && !isChecked && (
        <button
          onClick={() => onRequestHint(question.id)}
          className="mt-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1 transition-colors"
          aria-label={en ? 'Get hint' : 'Gauti užuominą'}
        >
          <Lightbulb className="w-4 h-4" />
          {en ? 'Show hint' : 'Rodyti užuominą'}
        </button>
      )}

      {isChecked && (
        <>
          {confidence != null && (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              {en ? 'Confidence:' : 'Pasitikėjimas:'}{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">{confidenceLabel(confidence, locale)}</span>
            </p>
          )}
          <div className="mt-4 p-3 rounded-lg bg-brand-50 dark:bg-brand-900/20">
            <p className="text-sm text-brand-800 dark:text-brand-200">
              <strong>{en ? 'Explanation:' : 'Paaiškinimas:'}</strong> {question.explanation}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
