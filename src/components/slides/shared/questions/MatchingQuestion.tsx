import { useState, useCallback, useMemo } from 'react';
import { Link2, Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import type { TestQuestion } from '../../../../types/modules';
import { ConfidenceSelector } from './ConfidenceSelector';
import type { ConfidenceLevel } from './ConfidenceSelector';
import { confidenceLabel } from './confidenceLabels';
import { useLocale } from '../../../../contexts/LocaleContext';

interface MatchingQuestionProps {
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
 * Matching question – click left, then click right to match pairs.
 * Score = fraction of correct matches (0–1).
 */
export function MatchingQuestion({
  question,
  questionIndex,
  showResults,
  showHint,
  confidence,
  onConfidence,
  onComplete,
  onRequestHint,
}: MatchingQuestionProps) {
  const { locale } = useLocale();
  const en = locale === 'en';
  const pairs = useMemo(() => question.matchPairs || [], [question.matchPairs]);

  const shuffledRight = useMemo(() => {
    const arr = pairs.map((p) => p.right);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [isChecked, setIsChecked] = useState(false);

  const handleLeftClick = useCallback((idx: number) => {
    if (isChecked) return;
    setSelectedLeft((prev) => (prev === idx ? null : idx));
  }, [isChecked]);

  const handleRightClick = useCallback((rightIdx: number) => {
    if (isChecked || selectedLeft === null) return;
    const usedBy = Object.entries(matches).find(([, v]) => v === rightIdx);
    if (usedBy) {
      setMatches((prev) => {
        const next = { ...prev };
        delete next[Number(usedBy[0])];
        return next;
      });
    }
    setMatches((prev) => ({ ...prev, [selectedLeft]: rightIdx }));
    setSelectedLeft(null);
  }, [isChecked, selectedLeft, matches]);

  const allMatched = Object.keys(matches).length === pairs.length;

  const handleCheck = useCallback(() => {
    if (!allMatched) return;
    setIsChecked(true);
    let correct = 0;
    pairs.forEach((pair, leftIdx) => {
      const rightIdx = matches[leftIdx];
      if (rightIdx !== undefined && shuffledRight[rightIdx] === pair.right) {
        correct++;
      }
    });
    const score = pairs.length > 0 ? correct / pairs.length : 0;
    onComplete(question.id, score);
  }, [allMatched, pairs, matches, shuffledRight, onComplete, question.id]);

  const getMatchColor = (leftIdx: number): string => {
    const colors = [
      'bg-brand-100 dark:bg-brand-900/30 border-brand-400',
      'bg-violet-100 dark:bg-violet-900/30 border-violet-400',
      'bg-amber-100 dark:bg-amber-900/30 border-amber-400',
      'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-400',
      'bg-rose-100 dark:bg-rose-900/30 border-rose-400',
      'bg-cyan-100 dark:bg-cyan-900/30 border-cyan-400',
    ];
    return colors[leftIdx % colors.length];
  };

  const isLeftMatched = (idx: number) => matches[idx] !== undefined;
  const getLeftForRight = (rightIdx: number): number | undefined =>
    Number(Object.entries(matches).find(([, v]) => v === rightIdx)?.[0]);

  return (
    <div
      className={`p-5 rounded-xl border-2 transition-all ${
        showResults && isChecked
          ? 'border-brand-300 dark:border-brand-700 bg-brand-50/30 dark:bg-brand-900/10'
          : 'bg-brand-50/50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-700'
      }`}
    >
      <div className="flex items-start gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-sm font-bold flex-shrink-0">
          {questionIndex + 1}
        </span>
        <div>
          <span className="text-xs font-semibold text-accent-600 dark:text-accent-400 uppercase tracking-wider">
            <Link2 className="w-3 h-3 inline mr-1" />
            {en ? 'Match pairs' : 'Sujunk poras'}
          </span>
          <p className="font-bold text-gray-900 dark:text-white mt-1">{question.question}</p>
        </div>
      </div>

      {!isChecked && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {en
            ? 'Click left, then right – match the correct pairs.'
            : 'Paspausk kairėje, tada dešinėje – sujunk teisingas poras.'}
        </p>
      )}

      <ConfidenceSelector
        value={confidence}
        onChange={(level) => onConfidence?.(level)}
        disabled={isChecked}
      />

      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="space-y-2">
          {pairs.map((pair, leftIdx) => {
            const matched = isLeftMatched(leftIdx);
            const isSelected = selectedLeft === leftIdx;
            const rightIdx = matches[leftIdx];
            const isCorrectMatch =
              isChecked && rightIdx !== undefined && shuffledRight[rightIdx] === pair.right;
            const isWrongMatch = isChecked && rightIdx !== undefined && !isCorrectMatch;

            return (
              <button
                key={leftIdx}
                onClick={() => handleLeftClick(leftIdx)}
                disabled={isChecked}
                aria-label={`${en ? 'Left side' : 'Kairė pusė'}: ${pair.left}`}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all min-h-[44px] text-sm font-medium ${
                  isChecked
                    ? isCorrectMatch
                      ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30'
                      : isWrongMatch
                      ? 'border-rose-500 bg-rose-100 dark:bg-rose-900/30'
                      : 'border-gray-200 dark:border-gray-700'
                    : isSelected
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 ring-2 ring-brand-300'
                    : matched
                    ? `border-2 ${getMatchColor(leftIdx)}`
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {isChecked && isCorrectMatch && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                  {isChecked && isWrongMatch && <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />}
                  <span className="text-gray-800 dark:text-gray-200 break-words">{pair.left}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          {shuffledRight.map((rightText, rightIdx) => {
            const matchedByLeft = getLeftForRight(rightIdx);
            const matched = matchedByLeft !== undefined;
            const isCorrectMatch =
              isChecked && matched && pairs[matchedByLeft].right === rightText;
            const isWrongMatch = isChecked && matched && !isCorrectMatch;

            return (
              <button
                key={rightIdx}
                onClick={() => handleRightClick(rightIdx)}
                disabled={isChecked}
                aria-label={`${en ? 'Right side' : 'Dešinė pusė'}: ${rightText}`}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all min-h-[44px] text-sm ${
                  isChecked
                    ? isCorrectMatch
                      ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30'
                      : isWrongMatch
                      ? 'border-rose-500 bg-rose-100 dark:bg-rose-900/30'
                      : 'border-gray-200 dark:border-gray-700'
                    : matched && matchedByLeft !== undefined
                    ? `border-2 ${getMatchColor(matchedByLeft)}`
                    : selectedLeft !== null && !matched
                    ? 'border-gray-200 dark:border-gray-700 hover:border-accent-400 cursor-pointer'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <span className="text-gray-800 dark:text-gray-200 break-words block min-w-0">{rightText}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Check button */}
      {!isChecked && allMatched && (
        <button
          onClick={handleCheck}
          className="mt-4 w-full btn-primary flex items-center justify-center gap-2 min-h-[44px]"
          aria-label={en ? 'Check pairs' : 'Patikrinti poras'}
        >
          <CheckCircle className="w-5 h-5" />
          {en ? 'Check pairs' : 'Patikrinti poras'}
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

      {!showHint && question.hint && !isChecked && allMatched && (
        <button
          onClick={() => onRequestHint(question.id)}
          className="mt-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1 transition-colors"
          aria-label={en ? 'Get hint' : 'Gauti užuominą'}
        >
          <Lightbulb className="w-4 h-4" />
          {en ? 'Show hint before checking' : 'Rodyti užuominą prieš tikrinant'}
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
