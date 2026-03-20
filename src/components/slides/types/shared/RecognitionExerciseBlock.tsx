import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { renderBodyWithBold } from './renderBody';
import { useLocale } from '../../../../contexts/LocaleContext';
import type { ContentBlockContent } from '../../../../types/modules';

export function RecognitionExerciseBlock({
  exercise,
  useAiAccent = false,
}: {
  exercise: NonNullable<ContentBlockContent['recognitionExercise']>;
  useAiAccent?: boolean;
}) {
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const [selections, setSelections] = useState<(number | null)[]>(
    exercise.examples.map(() => null)
  );

  const handleSelect = (exampleIdx: number, choiceIdx: number) => {
    if (selections[exampleIdx] !== null) return;
    setSelections((prev) => {
      const next = [...prev];
      next[exampleIdx] = choiceIdx;
      return next;
    });
  };

  const borderAccent = useAiAccent
    ? 'border-l-4 border-l-di-visata-ai-accent border border-blue-200/60 dark:border-blue-800/40'
    : 'border-l-4 border-l-accent-500 border border-accent-200 dark:border-accent-800';
  const bgAccent = useAiAccent
    ? 'bg-di-visata-ai-cool/80 dark:bg-gray-800/80'
    : 'bg-accent-50 dark:bg-accent-900/20';

  return (
    <div className={`mt-6 p-6 rounded-xl ${borderAccent} ${bgAccent}`}>
      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
        {exercise.title}
      </h4>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {renderBodyWithBold(exercise.task)}
      </p>
      <div className="space-y-4 mb-4">
        {exercise.examples.map((ex, exIdx) => {
          const selected = selections[exIdx];
          const correct = exercise.correctAnswers[exIdx];
          const isCorrect = selected === correct;
          return (
            <div
              key={exIdx}
              className="p-4 rounded-lg bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600"
            >
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-2">
                {exIdx + 1}. {ex}
              </p>
              <div
                className="flex flex-col gap-2"
                role="group"
                aria-label={
                  isEn
                    ? 'Select AI universe layer'
                    : 'Pasirink DI visatos sluoksnį'
                }
              >
                {exercise.choices.map((choice, choiceIdx) => {
                  const isSelected = selected === choiceIdx;
                  const showCorrect =
                    selected !== null && choiceIdx === correct;
                  const showWrong =
                    selected !== null && isSelected && !isCorrect;
                  const disabled = selected !== null;
                  return (
                    <button
                      key={choiceIdx}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleSelect(exIdx, choiceIdx)}
                      className={`flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-default ${
                        disabled
                          ? showCorrect
                            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
                            : showWrong
                              ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700'
                              : 'bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600'
                          : 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 hover:bg-brand-200 dark:hover:bg-brand-900/50 cursor-pointer'
                      }`}
                    >
                      {disabled && showCorrect && (
                        <Check className="w-4 h-4 shrink-0" aria-hidden />
                      )}
                      {disabled && showWrong && (
                        <X className="w-4 h-4 shrink-0" aria-hidden />
                      )}
                      {choice}
                    </button>
                  );
                })}
              </div>
              {selected !== null && (
                <div className="mt-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  {!isCorrect && (
                    <p className="text-sm text-emerald-800 dark:text-emerald-200 font-medium">
                      {isEn ? 'Correct answer:' : 'Teisingas atsakymas:'}{' '}
                      <strong>{exercise.choices[correct]}</strong>
                    </p>
                  )}
                  {exercise.explanations?.[exIdx] && (
                    <p
                      className={`text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed ${!isCorrect ? 'mt-1.5' : ''}`}
                    >
                      {exercise.explanations[exIdx]}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 pt-3 border-t border-accent-200 dark:border-accent-800 leading-relaxed">
        <span className="font-bold text-gray-800 dark:text-gray-200">
          {isEn ? 'Goal: ' : 'Tikslas: '}
        </span>
        {renderBodyWithBold(exercise.goal)}
      </p>
    </div>
  );
}
