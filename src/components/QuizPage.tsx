import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Progress } from '../utils/progress';
import { getModulesDataSync } from '../data/modulesLoader';
import { useLocale } from '../contexts/LocaleContext';
import { useQuizState } from '../utils/useQuizState';
import { LoadingSpinner } from './ui';
import CircularProgress from './CircularProgress';
import { QuizResultsView } from './QuizResultsView';

interface QuizPageProps {
  onBack: () => void;
  progress: Progress;
  onQuizComplete: (score: number) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizPage({
  onBack,
  progress,
  onQuizComplete,
}: QuizPageProps) {
  const { t } = useTranslation(['quiz', 'common']);
  const { locale } = useLocale();
  const modulesData = getModulesDataSync(locale);

  const questions = useMemo(() => {
    if (!modulesData?.quiz.questions) return [];
    const originalQuestions = modulesData.quiz.questions;
    const shuffledQuestions = shuffleArray(originalQuestions);
    return shuffledQuestions.map((q) => {
      const originalOptions = [...q.options];
      const originalCorrect = q.correct;
      const indices = originalOptions.map((_, idx) => idx);
      const shuffledIndices = shuffleArray(indices);
      const newCorrectIndex = shuffledIndices.indexOf(originalCorrect);
      const shuffledOptions = shuffledIndices.map((idx) => originalOptions[idx]);
      return {
        ...q,
        options: shuffledOptions,
        correct: newCorrectIndex,
      };
    });
  }, [modulesData]);

  const {
    currentIndex: currentQuestion,
    setCurrentIndex: setCurrentQuestion,
    answers: selectedAnswers,
    showResults,
    score,
    showExplanation,
    setShowExplanation,
    handleAnswer: handleAnswerSelect,
    handleSubmit,
    handleRestart,
    firstWrongIndex,
  } = useQuizState({ questions, onQuizComplete });

  // Show loading if modules not yet loaded
  if (!modulesData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text={t('common:loading')} />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400"
          aria-label={t('backToHomeAria')}
        >
          <ArrowLeft className="w-5 h-5" />
          {t('backToHome')}
        </button>
        <div className="card p-4 sm:p-6 lg:p-8 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            {t('emptyState')} {t('emptyStateHint')}
          </p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <QuizResultsView
        questions={questions}
        answers={selectedAnswers}
        score={score}
        firstWrongIndex={firstWrongIndex}
        onRestart={handleRestart}
        onBack={onBack}
      />
    );
  }

  const currentQ = questions[currentQuestion];
  // Apsauga: jei klausimų masyvas pasikeitė (pvz. locale), currentQuestion gali būti už ribų
  if (!currentQ) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400" aria-label={t('backToHomeAria')}>
          <ArrowLeft className="w-5 h-5" />
          {t('backToHome')}
        </button>
        <div className="card p-4 sm:p-6 lg:p-8 text-center">
          <p className="text-gray-700 dark:text-gray-300">{t('emptyState')}</p>
        </div>
      </div>
    );
  }
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswer = selectedAnswers[currentQ.id] !== undefined;
  const quizProgress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('quiz:backToHome')}</span>
          </button>
          {progress.completedModules.length > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {t('quiz:completedModulesCount')}: {progress.completedModules.length}/{modulesData?.modules?.length ?? 6}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <CircularProgress
            progress={quizProgress}
            size={50}
            strokeWidth={5}
            showPercentage={false}
          />
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('quiz:questionLabel')}</p>
            <p className="text-lg font-bold text-brand-600 dark:text-brand-400">
              {currentQuestion + 1}/{questions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Question card */}
      <div className="card p-4 sm:p-6 lg:p-8">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-500 to-accent-500 h-2.5 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${quizProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
        
        {/* Question */}
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQ.id] === idx;
            const isCorrect = idx === currentQ.correct;
            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(currentQ.id, idx)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 min-h-[44px] touch-manipulation ${
                  isSelected
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 shadow-lg scale-[1.02]'
                      : 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 shadow-lg scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50/50 dark:hover:bg-brand-900/10 bg-white dark:bg-gray-800'
                } focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2`}
                aria-label={t('selectOptionAria', { option })}
                aria-pressed={isSelected}
                disabled={showExplanation}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-rose-500 bg-rose-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {isSelected && (
                      <>
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                      </>
                    )}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation – rodomas visada, kai klausimas jau atsakytas (įsk. grįžus atgal), kad neprarastų grįžtamojo ryšio (vartotojo testavimas) */}
        {selectedAnswers[currentQ.id] !== undefined && currentQ.explanation && (
          <div className={`mt-6 p-4 rounded-xl border-l-4 ${
            selectedAnswers[currentQ.id] === currentQ.correct
              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500'
              : 'bg-amber-50 dark:bg-amber-900/20 border-amber-500'
          } animate-fade-in`}>
            <div className="flex items-start gap-3">
              {selectedAnswers[currentQ.id] === currentQ.correct ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`text-sm font-semibold mb-1 ${
                  selectedAnswers[currentQ.id] === currentQ.correct
                    ? 'text-emerald-800 dark:text-emerald-200'
                    : 'text-amber-800 dark:text-amber-200'
                }`}>
                  {selectedAnswers[currentQ.id] === currentQ.correct ? t('correctLabel') : t('incorrectLabel')}
                </p>
                <p className={`text-sm ${
                  selectedAnswers[currentQ.id] === currentQ.correct
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : 'text-amber-700 dark:text-amber-300'
                }`}>
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex flex-col gap-3">
          {!hasAnswer && (
            <p id="quiz-next-hint" className="text-sm text-gray-500 dark:text-gray-400" role="status" aria-live="polite">
              {t('selectAnswerHint')}
            </p>
          )}
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
              aria-label={t('prevQuestionAria')}
            >
              {t('common:back')}
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!hasAnswer}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-h-[44px] touch-manipulation"
                aria-label={t('finishQuizAria')}
                aria-describedby={!hasAnswer ? 'quiz-next-hint' : undefined}
              >
                {t('submit')}
                <CheckCircle className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentQuestion((prev) => prev + 1);
                  setShowExplanation(false);
                }}
                disabled={!hasAnswer}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-h-[44px] touch-manipulation"
                aria-label={t('nextQuestionAria')}
                aria-describedby={!hasAnswer ? 'quiz-next-hint' : undefined}
              >
                {t('nextQuestion')}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
