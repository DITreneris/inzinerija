import { useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, Trophy, RefreshCw, ArrowRight, ExternalLink } from 'lucide-react';
import CircularProgress from './CircularProgress';
import { useCountUp } from '../utils/useCountUp';
import type { QuizQuestion } from '../types/modules';

const CEO_SPINOFF_URL = 'https://ditreneris.github.io/ceo/';

export interface QuizResultsViewProps {
  questions: QuizQuestion[];
  answers: Record<number, number>;
  score: number;
  firstWrongIndex: number;
  onRestart: () => void;
  onBack: () => void;
}

export function QuizResultsView({
  questions,
  answers,
  score,
  firstWrongIndex,
  onRestart,
  onBack,
}: QuizResultsViewProps) {
  const { t } = useTranslation('quiz');
  const resultsReviewRef = useRef<HTMLDivElement>(null);
  const firstWrongRef = useRef<HTMLDivElement>(null);
  const animatedScore = useCountUp(score, 1500, 300);

  const correctCount = questions.filter((q) => answers[q.id] === q.correct).length;
  const hasWrong = correctCount < questions.length;

  /** M3: klaidingi atsakymai pirmi – pirmas neteisingas iš karto matomas */
  const orderedQuestions = useMemo(() => {
    const wrong = questions.filter((q) => answers[q.id] !== q.correct);
    const correct = questions.filter((q) => answers[q.id] === q.correct);
    return [...wrong, ...correct];
  }, [questions, answers]);

  useEffect(() => {
    const scroll = (el: HTMLElement | null, opts: ScrollIntoViewOptions) => {
      if (el?.scrollIntoView && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView(opts);
      }
    };
    const runScroll = () => {
      if (hasWrong && firstWrongRef.current) {
        scroll(firstWrongRef.current, { behavior: 'smooth', block: 'start' });
      } else if (resultsReviewRef.current) {
        scroll(resultsReviewRef.current, { behavior: 'smooth', block: 'start' });
      }
    };
    const rafId = requestAnimationFrame(runScroll);
    const timeoutId = setTimeout(runScroll, 150);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [firstWrongIndex, hasWrong]);

  const passed = score >= 70;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="card p-8 md:p-12 text-center">
        <div className="mb-6">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${
              passed
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/30'
                : 'bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg shadow-orange-500/30'
            } animate-bounce-in`}
          >
            {passed ? (
              <Trophy className="w-12 h-12 text-white" />
            ) : (
              <XCircle className="w-12 h-12 text-white" />
            )}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {passed ? t('resultsTitlePass') : t('resultsTitleFail')}
        </h2>

        <div className="my-8">
          <CircularProgress
            progress={animatedScore}
            size={120}
            strokeWidth={12}
          />
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {t('resultsScoreBefore')}
          <span className="font-bold text-gray-900 dark:text-white">
            {correctCount}
          </span>
          {t('resultsScoreAfter', { total: questions.length })}
        </p>

        {hasWrong && (
          <p className="text-left text-sm font-medium text-rose-700 dark:text-rose-300 mb-2">
            {t('wrongFirstHint')}
          </p>
        )}
        <div
          ref={resultsReviewRef}
          className="space-y-4 mb-8 text-left max-h-[50vh] overflow-y-auto overscroll-contain"
        >
          {orderedQuestions.map((q, idx) => {
            const isCorrect = answers[q.id] === q.correct;
            const isFirstWrong = hasWrong && idx === 0;
            return (
              <div
                key={q.id}
                ref={isFirstWrong ? firstWrongRef : undefined}
                id={isFirstWrong ? 'quiz-first-wrong' : undefined}
                aria-live={isFirstWrong ? 'polite' : undefined}
                className={`p-4 rounded-xl border-2 scroll-mt-4 ${
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700'
                    : `bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-700 ${isFirstWrong ? 'border-l-4 border-l-rose-500' : 'ring-2 ring-rose-400/50'}`
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {q.question}
                  </p>
                </div>
                <div className="space-y-2 ml-8">
                  {q.options.map((option, optIdx) => (
                    <div
                      key={optIdx}
                      className={`text-sm p-3 rounded-lg ${
                        optIdx === q.correct
                          ? 'bg-emerald-200 dark:bg-emerald-800 font-semibold text-emerald-900 dark:text-emerald-100'
                          : optIdx === answers[q.id] && optIdx !== q.correct
                            ? 'bg-rose-200 dark:bg-rose-800 text-rose-900 dark:text-rose-100'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {option}
                      {optIdx === q.correct && <span className="ml-2">✓</span>}
                      {optIdx === answers[q.id] && optIdx !== q.correct && (
                        <span className="ml-2">✗</span>
                      )}
                    </div>
                  ))}
                </div>
                {q.explanation && (
                  <div
                    className={`mt-4 p-3 rounded-lg border-l-4 ${
                      isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500'
                        : 'bg-amber-100 dark:bg-amber-900/30 border-amber-500'
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        isCorrect
                          ? 'text-emerald-800 dark:text-emerald-200'
                          : 'text-amber-800 dark:text-amber-200'
                      }`}
                    >
                      <strong>
                        {isCorrect ? t('explanationStrong') : t('explanationTryAgain')}
                      </strong>
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            {t('btnRestart')}
          </button>
          <button
            onClick={onBack}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {t('btnBack')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden treasure: nuoroda į DI Operacinį centrą (Spin-off Nr. 5, CEO) */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('ceoSpinoffDescription')}</p>
          <a
            href={CEO_SPINOFF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl border-2 border-accent-400 dark:border-accent-500 bg-transparent text-accent-700 dark:text-accent-300 font-semibold text-sm shadow-sm hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:border-accent-500 dark:hover:border-accent-400 hover:shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            aria-label={t('ceoSpinoffAria')}
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden />
            {t('ceoSpinoffLabel')}
          </a>
        </div>
      </div>
    </div>
  );
}
