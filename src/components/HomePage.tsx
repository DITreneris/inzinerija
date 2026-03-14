import { useState } from 'react';
import {
  Target,
  BookOpen,
  ClipboardCheck,
  ArrowRight,
  Zap,
  Sparkles,
  CheckCircle,
  Copy,
  Check,
  Lightbulb,
  Rocket,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Progress } from '../utils/progress';
import { getModulesSync } from '../data/modulesLoader';
import { getIsMvpMode } from '../utils/mvpMode';
import { useLocale } from '../contexts/LocaleContext';
import PromptLibrary from './PromptLibrary';
import CircularProgress from './CircularProgress';

const QUICK_PROMPTS_LT = [
  {
    id: 1,
    title: 'Gauk aiškų atsakymą',
    prompt:
      'Atsakyk trumpai ir aiškiai: ką man svarbiausia žinoti apie [TEMA] šiandien?',
    timeLabel: 'Atsakymas ~1 min',
    tags: ['Trumpai', 'Aiškiai'],
  },
  {
    id: 2,
    title: 'Atskirti esmę (20/80)',
    prompt:
      'Išskirk 3 svarbiausius dalykus apie [TEMA], kurie duoda didžiausią naudą.',
    timeLabel: 'Analizė ~2 min',
    tags: ['Prioritetai', '20/80 esmė'],
  },
  {
    id: 3,
    title: 'Paversk problemą veiksmais',
    prompt:
      'Pasiūlyk 3 konkrečius žingsnius, ką daryti toliau sprendžiant [PROBLEMĄ].',
    timeLabel: 'Planas ~2 min',
    tags: ['Veiksmai', 'Sprendimo planas'],
  },
] as const;

const QUICK_PROMPTS_EN = [
  {
    id: 1,
    title: 'Get a clear answer',
    prompt:
      'Answer briefly and clearly: what do I most need to know about [TOPIC] today?',
    timeLabel: 'Answer ~1 min',
    tags: ['Brief', 'Clear'],
  },
  {
    id: 2,
    title: 'Focus on what matters (20/80)',
    prompt:
      'Pick 3 most important things about [TOPIC] that give the most value.',
    timeLabel: 'Analysis ~2 min',
    tags: ['Priorities', '20/80'],
  },
  {
    id: 3,
    title: 'Turn problem into actions',
    prompt: 'Suggest 3 concrete steps to take next when solving [PROBLEM].',
    timeLabel: 'Plan ~2 min',
    tags: ['Actions', 'Plan'],
  },
] as const;

interface HomePageProps {
  onStart: () => void;
  onGoToQuiz?: () => void;
  progress: Progress;
}

export default function HomePage({
  onStart,
  onGoToQuiz,
  progress,
}: HomePageProps) {
  const { t } = useTranslation(['home', 'common']);
  const { locale } = useLocale();
  const quickPrompts = locale === 'en' ? QUICK_PROMPTS_EN : QUICK_PROMPTS_LT;
  const [copiedQuickId, setCopiedQuickId] = useState<number | null>(null);
  const modulesCompleted = progress.completedModules.length;
  const totalModules = (() => {
    const n = getModulesSync(locale)?.length;
    if (n != null) return n;
    return getIsMvpMode() ? 6 : 6;
  })();
  const totalTasks = Object.values(progress.completedTasks).reduce(
    (sum, tasks) => sum + tasks.length,
    0
  );

  return (
    <div className="space-y-12">
      {/* Hero Section – premium SaaS: mesh-style orbs, be gryno balto, gylis */}
      <div className="relative overflow-hidden rounded-3xl">
        {/* Mesh-style background: kelios radial gradient „dėmės“ (Stripe/Vercel/Linear praktika) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-gold/8 dark:bg-gold/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-300/8 dark:bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-300/6 dark:bg-brand-400/8 rounded-full blur-3xl" />
        </div>

        <div className="relative text-center py-10 lg:py-24 animate-fade-in">
          {/* Badge – P3: sumažintas vizualinis svoris (slate, mažesnis) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-full text-slate-600 dark:text-slate-400 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{t('home:badge')}</span>
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="rounded-3xl bg-brand-900/95 dark:bg-brand-950/90 p-6 shadow-md shadow-brand-900/8 dark:shadow-black/20 ring-1 ring-brand-700/15 dark:ring-white/10 hover:shadow-lg hover:shadow-brand-900/12 dark:hover:shadow-black/30 hover:scale-[1.02] transition-transform duration-300 animate-bounce-in">
                <Zap className="w-16 h-16 text-gold" strokeWidth={1.5} />
              </div>
              <div className="absolute -top-2 -right-2 rounded-xl bg-gold px-2.5 py-1.5 shadow-sm shadow-gold/15 ring-1 ring-white/40">
                <span className="text-xs font-semibold text-gray-900">
                  {t('home:durationBadge')}
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-5xl lg:text-8xl font-black text-gray-950 dark:text-white mb-4 tracking-tight">
            {t('home:titlePart1')}{' '}
            <span className="gradient-text gradient-text-hero">
              {t('home:titlePart2')}
            </span>
          </h1>

          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 font-normal mb-5 max-w-xl mx-auto">
            {t('home:subline')}
          </p>

          <p className="text-base lg:text-xl text-gray-500 dark:text-gray-400 mb-2 max-w-2xl mx-auto leading-loose">
            {t('home:subtitle')}
            <span className="font-bold text-[1.15em] text-accent-600 dark:text-accent-400">
              {t('home:subtitleBold')}
            </span>
          </p>

          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mb-6 lg:mb-10 max-w-xl mx-auto">
            {t('home:bonus')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8 lg:mb-14 text-sm text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold/70 dark:text-gold/60" />
              <span>
                {totalModules} {t('home:trustModules')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold/70 dark:text-gold/60" />
              <span>{t('home:trustExamples')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold/70 dark:text-gold/60" />
              <span>{t('home:trustQuiz')}</span>
            </div>
          </div>

          {modulesCompleted > 0 && (
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              {t('home:progressLabel', {
                done: modulesCompleted,
                total: totalModules,
              })}
            </p>
          )}

          <button
            onClick={
              modulesCompleted === totalModules &&
              totalModules > 0 &&
              progress.quizCompleted
                ? onStart
                : modulesCompleted === totalModules &&
                    totalModules > 0 &&
                    onGoToQuiz
                  ? onGoToQuiz
                  : onStart
            }
            className="btn-primary btn-hero-cta text-xl px-10 inline-flex items-center gap-3 group"
            aria-label={
              modulesCompleted === totalModules &&
              totalModules > 0 &&
              progress.quizCompleted
                ? t('home:ctaViewModulesAria')
                : modulesCompleted === totalModules &&
                    totalModules > 0 &&
                    onGoToQuiz
                  ? t('home:ctaToQuizAria')
                  : t('home:ctaStartAria')
            }
          >
            {modulesCompleted === totalModules &&
            totalModules > 0 &&
            progress.quizCompleted
              ? t('home:ctaViewModules')
              : modulesCompleted === totalModules &&
                  totalModules > 0 &&
                  onGoToQuiz
                ? t('home:ctaToQuiz')
                : modulesCompleted > 0
                  ? t('home:ctaContinue')
                  : t('home:ctaStartNow')}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="card-hover p-6 animate-fade-in shadow-lg shadow-gray-200/50 dark:shadow-gold/5 border border-gray-100/80 dark:border-gray-700/50"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center gap-4">
            <CircularProgress
              progress={
                totalModules > 0 ? (modulesCompleted / totalModules) * 100 : 0
              }
              size={70}
              strokeWidth={7}
              showPercentage={false}
            />
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {modulesCompleted}/{totalModules}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home:statsCompleted')}
              </p>
            </div>
          </div>
        </div>

        <div
          className="card-hover p-6 animate-fade-in shadow-lg shadow-gray-200/50 dark:shadow-gold/5 border border-gray-100/80 dark:border-gray-700/50"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-2xl">
              <ClipboardCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalTasks}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home:statsTasks')}
              </p>
            </div>
          </div>
        </div>

        <div
          className="card-hover p-6 animate-fade-in shadow-lg shadow-gray-200/50 dark:shadow-gold/5 border border-gray-100/80 dark:border-gray-700/50"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-accent-100 dark:bg-accent-900/30 p-4 rounded-2xl">
              <Target className="w-8 h-8 text-accent-600 dark:text-accent-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {progress.quizCompleted ? `${progress.quizScore}%` : '-'}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home:statsQuizResult')}
              </p>
              {progress.quizCompleted && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      (progress.quizScore || 0) >= 70
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                        : 'bg-gradient-to-r from-orange-400 to-orange-500'
                    }`}
                    style={{ width: `${progress.quizScore || 0}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6 lg:p-10 animate-fade-in shadow-lg shadow-gray-200/40 dark:shadow-gray-900/40 border border-gray-100/80 dark:border-gray-700/50">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t('home:sectionTitle')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home:sectionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex gap-4 p-5 rounded-2xl hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-300 group">
            <div className="bg-brand-100 dark:bg-brand-900/30 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                {t('home:feature1Title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {t('home:feature1Desc')}
              </p>
              <button
                type="button"
                onClick={onStart}
                className="text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded"
              >
                {t('home:feature1Cta')}
              </button>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 group">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                {t('home:feature2Title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {t('home:feature2Desc')}
              </p>
              <button
                type="button"
                onClick={onStart}
                className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm hover:underline inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
              >
                {t('home:feature2Cta')}
              </button>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-300 group">
            <div className="bg-brand-100 dark:bg-brand-900/30 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
              <ClipboardCheck className="w-7 h-7 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                {t('home:feature3Title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {t('home:feature3Desc')}
              </p>
              <button
                type="button"
                onClick={onStart}
                className="text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded"
              >
                {t('home:feature3Cta')}
              </button>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all duration-300 group">
            <div className="bg-gold/10 dark:bg-gold/15 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7 text-gold dark:text-gold" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                {t('home:feature4Title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {t('home:feature4Desc')}
              </p>
              <button
                type="button"
                onClick={onStart}
                className="text-accent-600 dark:text-accent-400 font-semibold text-sm hover:underline inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 rounded"
              >
                {t('home:feature4Cta')}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-700 text-center">
          <button
            onClick={onStart}
            className="btn-primary text-xl px-10 py-5 rounded-2xl inline-flex items-center gap-3 group w-full sm:w-auto justify-center mb-4"
            aria-label={
              modulesCompleted === totalModules &&
              totalModules > 0 &&
              progress.quizCompleted
                ? t('home:ctaViewModulesAria')
                : t('home:ctaPrimaryAria')
            }
          >
            {modulesCompleted === totalModules &&
            totalModules > 0 &&
            progress.quizCompleted ? (
              t('home:ctaViewModules')
            ) : (
              <>
                <Rocket className="w-6 h-6" aria-hidden="true" />
                {t('home:ctaPrimary')}
              </>
            )}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          {!(
            modulesCompleted === totalModules &&
            totalModules > 0 &&
            progress.quizCompleted
          ) && (
            <>
              <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                {t('common:or')}
              </p>
              <button
                type="button"
                onClick={onStart}
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded px-2 py-1"
              >
                {t('common:viewModulesArrow')}
              </button>
            </>
          )}
        </div>
      </div>

      <section className="animate-fade-in">
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-brand-800 dark:text-brand-300 mb-3 text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5" strokeWidth={1.5} />
            {t('home:howToTitle')}
          </h3>
          <ol className="text-sm text-brand-700 dark:text-brand-400 space-y-2">
            <li>
              <span className="font-medium">1.</span> {t('home:howTo1Before')}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-gray-800 rounded border border-brand-200 dark:border-brand-700 text-xs font-medium">
                <Copy className="w-3 h-3 inline" /> {t('common:copy')}
              </span>
              {t('home:howTo1After')}
            </li>
            <li>
              <span className="font-medium">2.</span> {t('home:howTo2')}
            </li>
            <li>
              <span className="font-medium">3.</span> {t('home:howTo3')}
            </li>
          </ol>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('home:quickPromptsTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('home:quickPromptsSubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {quickPrompts.map((item) => (
            <div
              key={item.id}
              className="card-hover p-6 flex flex-col relative shadow-lg shadow-gray-200/50 dark:shadow-gray-900/30 border border-gray-100/80 dark:border-gray-700/50"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                {item.title}
              </h3>
              <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 mb-4 break-words">
                {item.prompt}
              </code>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
                  ⏱ {item.timeLabel}
                </span>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(item.prompt);
                    setCopiedQuickId(item.id);
                    setTimeout(() => setCopiedQuickId(null), 2000);
                  } catch {
                    // ignore
                  }
                }}
                className={`mt-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  copiedQuickId === item.id
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                    : 'btn-secondary'
                }`}
                aria-label={t('home:copyAria', { title: item.title })}
              >
                {copiedQuickId === item.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t('common:copied')}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {t('common:copy')}
                  </>
                )}
              </button>
              {copiedQuickId === item.id && (
                <div className="absolute bottom-3 right-3 badge-success animate-fade-in">
                  <Check className="w-3 h-3 mr-1" />
                  {t('common:copiedExclaim')}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Prompt Library */}
      <PromptLibrary />
    </div>
  );
}
