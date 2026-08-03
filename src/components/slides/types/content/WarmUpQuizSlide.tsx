import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getT } from '../../../../i18n';
import { CheckCircle } from 'lucide-react';
import { useLocale } from '../../../../contexts/LocaleContext';
import type { WarmUpQuizContent } from '../../../../types/modules';

export function WarmUpQuizSlide({ content }: { content: WarmUpQuizContent }) {
  useTranslation();
  const t = getT('contentSlides');
  const tCommon = getT('common');
  const tQuiz = getT('quiz');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const questions = content.questions ?? [];
  const q = questions[currentIndex];
  const isDone = currentIndex >= questions.length;

  const handleOptionClick = (idx: number) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setCurrentIndex(questions.length);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-400">
        {isEn ? 'No warm-up questions available.' : 'Bandomųjų klausimų nėra.'}
      </div>
    );
  }

  if (isDone) {
    return (
      <div className="space-y-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-6 rounded-xl text-center">
          <CheckCircle
            className="w-12 h-12 text-emerald-500 mx-auto mb-3"
            aria-hidden
          />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
            {isEn
              ? 'Warm-up self-check complete'
              : 'Pasiruošimo savitikra baigta'}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {isEn
              ? 'You can start the test \u2013 it\u2019s not graded, just preparation.'
              : 'Gali pradėti testą – įskaita neįskaitoma, tai tik pasiruošimas.'}
          </p>
        </div>
      </div>
    );
  }

  const isCorrect = selectedOption === q.correct;

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t('warmUpQuestionInfo', {
          n: currentIndex + 1,
          total: questions.length,
        })}
      </p>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700">
        <p className="font-bold text-gray-900 dark:text-white mb-4">
          {q.question}
        </p>
        <div className="space-y-2">
          {(q.options ?? []).map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOption = idx === q.correct;
            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={showFeedback}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  showFeedback
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
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showFeedback
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
                    {showFeedback && isCorrectOption && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                    {isSelected && !showFeedback && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {showFeedback && (
        <div
          className={`p-4 rounded-xl ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800'}`}
        >
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {isCorrect ? tQuiz('correctLabel') : tQuiz('incorrectLabel')}
          </p>
          {q.explanation && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {q.explanation}
            </p>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="mt-3 px-4 py-2 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors"
          >
            {currentIndex + 1 < questions.length
              ? tCommon('next')
              : tCommon('finish')}
          </button>
        </div>
      )}
    </div>
  );
}
