import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles } from 'lucide-react';
import Celebration from './components/Celebration';
import { AppNav } from './components/AppNav';
import { ErrorBoundary, LoadingSpinner } from './components/ui';
import { getProgress, saveProgress, flushProgressSave } from './utils/progress';
import {
  logLearningEvent,
  hasLoggedFirstActionSuccess,
} from './utils/learningEvents';
import { useTheme } from './utils/useTheme';
import {
  loadModules,
  getModulesDataSync,
  preloadModules,
  clearModulesLoadError,
  type ModulesLocale,
} from './data/modulesLoader';
import {
  getMaxAccessibleModuleId,
  hasAccessTokenInUrl,
  stripMagicLinkSearchParams,
  VERIFIED_ACCESS_TIER_KEY,
} from './utils/accessTier';
import { useLocale } from './contexts/LocaleContext';
import { useTranslation } from 'react-i18next';
import type { ModulesData } from './types/modules';
import { getBrowserEnglishContentVariant } from './i18n';

// Lazy load heavy components for better initial load
const HomePage = lazy(() => import('./components/HomePage'));
const ModulesPage = lazy(() => import('./components/ModulesPage'));
const ModuleView = lazy(() => import('./components/ModuleView'));
const QuizPage = lazy(() => import('./components/QuizPage'));
const GlossaryPage = lazy(() => import('./components/GlossaryPage'));
const ToolsPage = lazy(() => import('./components/ToolsPage'));
const CertificateScreen = lazy(() =>
  import('./components/CertificateScreen').then((m) => ({
    default: m.CertificateScreen,
  }))
);

type Page =
  | 'home'
  | 'modules'
  | 'module'
  | 'quiz'
  | 'glossary'
  | 'tools'
  | 'certificate';

function getVerifyAccessUrl(configuredValue: string): string {
  const trimmed = configuredValue.trim();
  if (!trimmed) return '/api/verify-access';
  if (trimmed.endsWith('/api/verify-access')) return trimmed;
  return `${trimmed.replace(/\/+$/, '')}/api/verify-access`;
}

function App() {
  const { t } = useTranslation(['common', 'seo', 'footer']);
  const { locale } = useLocale();
  const modulesLocale: ModulesLocale = locale;
  const englishContentVariant = getBrowserEnglishContentVariant();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [initialSlideIndex, setInitialSlideIndex] = useState<number | null>(
    null
  );
  /** A-M3: when viewing Module 1 from Module 2 test results (remediation), allow return to results */
  const [remediationFrom, setRemediationFrom] = useState<{
    sourceModuleId: number;
  } | null>(null);
  const [progress, setProgress] = useState(getProgress());
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState<
    'task' | 'module' | 'quiz'
  >('task');
  const [modulesData, setModulesData] = useState<ModulesData | null>(() =>
    getModulesDataSync(modulesLocale, englishContentVariant)
  );
  const [modulesLoadError, setModulesLoadError] = useState<Error | null>(null);
  const [isDark, setIsDark] = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toolsInitialFilter, setToolsInitialFilter] = useState<number | null>(
    null
  );
  const [glossaryHighlightTerm, setGlossaryHighlightTerm] = useState<
    string | null
  >(null);
  const [certificateTier, setCertificateTier] = useState<1 | 2 | 3>(1);
  /** Incremented after magic link verification so getMaxAccessibleModuleId() re-reads localStorage. */
  const [, setAccessTierRefresh] = useState(0);

  const replaceUrlWithoutMagicLinkParams = useCallback(() => {
    const cleanSearch = stripMagicLinkSearchParams(window.location.search);
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${cleanSearch}${window.location.hash}`
    );
  }, []);

  // Magic link: verify token and persist tier to localStorage, then clean URL
  useEffect(() => {
    if (!hasAccessTokenInUrl() || typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const accessTier = params.get('access_tier');
    const expires = params.get('expires');
    const token = params.get('token');
    if (!accessTier || !token) return;

    const query = new URLSearchParams({ access_tier: accessTier, token });
    if (expires) query.set('expires', expires);
    const apiBase = (import.meta.env.VITE_VERIFY_ACCESS_URL as string) || '';
    const verifyAccessUrl = getVerifyAccessUrl(apiBase);
    fetch(`${verifyAccessUrl}?${query.toString()}`)
      .then((res) => {
        if (res.ok) return res.json() as Promise<{ access_tier: number }>;
        throw new Error(
          res.status === 401 ? 'Invalid or expired link' : 'Verification failed'
        );
      })
      .then((data) => {
        const tier = data.access_tier;
        if (Number.isInteger(tier) && [3, 6].includes(tier)) {
          localStorage.setItem(VERIFIED_ACCESS_TIER_KEY, String(tier));
          replaceUrlWithoutMagicLinkParams();
          setAccessTierRefresh((n) => n + 1);
        }
      })
      .catch(() => {
        replaceUrlWithoutMagicLinkParams();
      });
  }, [replaceUrlWithoutMagicLinkParams]);

  // Load modules data for current locale; reload when locale changes
  useEffect(() => {
    loadModules(modulesLocale, englishContentVariant)
      .then((data) => {
        setModulesLoadError(null);
        setModulesData(data);
      })
      .catch((err) => {
        console.error('Nepavyko įkelti modulių:', err);
        setModulesLoadError(err);
      });
    preloadModules(modulesLocale, englishContentVariant);
  }, [modulesLocale, englishContentVariant]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Flush progress save on page unload to prevent data loss
  useEffect(() => {
    const handleBeforeUnload = () => {
      flushProgressSave();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Redirect if selected module exceeds access tier (e.g. direct link, state manipulation)
  useEffect(() => {
    const maxAccessible = getMaxAccessibleModuleId();
    if (
      currentPage === 'module' &&
      selectedModule != null &&
      selectedModule > maxAccessible
    ) {
      setCurrentPage('modules');
      setSelectedModule(null);
      setRemediationFrom(null);
    }
  }, [currentPage, selectedModule]);

  // Kai išeiname iš įrankių puslapio – išvalome pradinį filtrą
  useEffect(() => {
    if (currentPage !== 'tools') setToolsInitialFilter(null);
  }, [currentPage]);

  // Kai išeiname iš žodynėlio – išvalome paryškintą terminą
  useEffect(() => {
    if (currentPage !== 'glossary') setGlossaryHighlightTerm(null);
  }, [currentPage]);

  // Close mobile menu when clicking outside or when page changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('nav')) {
          setIsMobileMenuOpen(false);
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isMobileMenuOpen]);

  const handleModuleSelect = useCallback((moduleId: number) => {
    if (moduleId > getMaxAccessibleModuleId()) return;
    setSelectedModule(moduleId);
    setCurrentPage('module');
  }, []);

  // Get next module ID
  const getNextModuleId = useCallback(
    (currentModuleId: number): number | null => {
      if (!modulesData) return null;
      const moduleIds = modulesData.modules.map((m) => m.id);
      const currentIndex = moduleIds.indexOf(currentModuleId);
      if (currentIndex < moduleIds.length - 1) {
        return moduleIds[currentIndex + 1];
      }
      return null;
    },
    [modulesData]
  );

  const handleRetryModules = useCallback(() => {
    clearModulesLoadError();
    setModulesLoadError(null);
    setModulesData(null);
    loadModules(modulesLocale, englishContentVariant)
      .then((data) => {
        setModulesLoadError(null);
        setModulesData(data);
      })
      .catch((err) => {
        console.error('Nepavyko įkelti modulių:', err);
        setModulesLoadError(err);
      });
  }, [modulesLocale, englishContentVariant]);

  const handleModuleComplete = (moduleId: number) => {
    if (!progress.completedModules.includes(moduleId)) {
      setProgress((prev) => ({
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
      }));
      logLearningEvent('module_completed', { moduleId });
      // Show celebration
      setCelebrationType('module');
      setShowCelebration(true);
    }
  };

  const handleGoToModule = useCallback(
    (
      moduleId: number,
      slideIndex?: number,
      fromRemediationSourceModuleId?: number
    ) => {
      if (moduleId > getMaxAccessibleModuleId()) {
        setCurrentPage('modules');
        setSelectedModule(null);
        setRemediationFrom(null);
        return;
      }
      setSelectedModule(moduleId);
      setInitialSlideIndex(slideIndex ?? null);
      if (fromRemediationSourceModuleId != null) {
        setRemediationFrom({ sourceModuleId: fromRemediationSourceModuleId });
      } else {
        setRemediationFrom(null);
      }
      setCurrentPage('module');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  /** A-M3: return to test-results slide of the module we came from (e.g. Module 2). */
  const handleRequestCertificate = useCallback((tier: 1 | 2 | 3) => {
    setCertificateTier(tier);
    setCurrentPage('certificate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCertificateBack = useCallback(() => {
    setCurrentPage('modules');
    setSelectedModule(null);
  }, []);

  const handleReturnToRemediation = useCallback(() => {
    if (!remediationFrom) return;
    const sourceId = remediationFrom.sourceModuleId;
    setRemediationFrom(null);
    setSelectedModule(sourceId);
    // Module 2 enriched view: slides = [test-intro, test-section, test-results] → index 2
    const resultsSlideIndex =
      sourceId === 2
        ? 2
        : (() => {
            const mod = modulesData?.modules?.find((m) => m.id === sourceId);
            const idx =
              mod?.slides?.findIndex((s) => s.type === 'test-results') ?? -1;
            return idx >= 0 ? idx : 0;
          })();
    setInitialSlideIndex(resultsSlideIndex);
    setCurrentPage('module');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [remediationFrom, modulesData]);

  // Navigate to next module (called from ModuleView)
  const handleContinueToNextModule = (currentModuleId: number) => {
    const nextModuleId = getNextModuleId(currentModuleId);
    if (nextModuleId) {
      setSelectedModule(nextModuleId);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // All modules completed, go to quiz
      setCurrentPage('quiz');
      setSelectedModule(null);
    }
  };

  const handleModuleJourneyFocus = useCallback(
    (moduleId: number, choiceLabel: string) => {
      setProgress((prev) => ({
        ...prev,
        moduleJourneyFocus: {
          ...(prev.moduleJourneyFocus ?? {}),
          [moduleId]: choiceLabel,
        },
      }));
    },
    []
  );

  const handleTaskComplete = (
    moduleId: number,
    taskId: number,
    testScore?: number
  ) => {
    const isNewTask = !progress.completedTasks[moduleId]?.includes(taskId);
    if (isNewTask || testScore !== undefined) {
      setProgress((prev) => ({
        ...prev,
        ...(isNewTask && {
          completedTasks: {
            ...prev.completedTasks,
            [moduleId]: [...(prev.completedTasks[moduleId] || []), taskId],
          },
        }),
        ...(testScore !== undefined && {
          moduleTestScores: {
            ...(prev.moduleTestScores ?? {}),
            [moduleId]: testScore,
          },
        }),
      }));
      if (isNewTask) {
        if (!hasLoggedFirstActionSuccess()) {
          logLearningEvent('first_action_success', { moduleId, taskId });
        }
        setCelebrationType('task');
        setShowCelebration(true);
      }
    }
  };

  const totalModules = modulesData?.modules.length || 0;
  const completedModulesCount = progress.completedModules.length;
  const overallProgress =
    totalModules > 0
      ? Math.round((completedModulesCount / totalModules) * 100)
      : 0;

  const currentModule =
    selectedModule && modulesData?.modules
      ? modulesData.modules.find((m) => m.id === selectedModule)
      : null;
  const baseTitle = t('seo:baseTitle');
  const seoTitle =
    currentPage === 'home'
      ? t('seo:titleHome')
      : currentPage === 'modules'
        ? t('seo:titleModules')
        : currentPage === 'module' && currentModule
          ? `${currentModule.title} – ${baseTitle}`
          : currentPage === 'glossary'
            ? t('seo:titleGlossary')
            : currentPage === 'tools'
              ? t('seo:titleTools')
              : currentPage === 'quiz'
                ? t('seo:titleQuiz')
                : currentPage === 'certificate'
                  ? t('seo:titleCertificate')
                  : t('seo:titleDefault');
  const maxAccessible = getMaxAccessibleModuleId();
  const requiresModulesData =
    currentPage === 'modules' ||
    currentPage === 'module' ||
    currentPage === 'quiz';
  const defaultDescription =
    maxAccessible > 0
      ? t('seo:descDefaultWithModules', { count: maxAccessible })
      : t('seo:descDefault');
  const seoDescription =
    currentPage === 'module' && currentModule?.description
      ? currentModule.description
      : currentPage === 'modules'
        ? t('seo:descModules')
        : currentPage === 'glossary'
          ? t('seo:descGlossary')
          : currentPage === 'tools'
            ? t('seo:descTools')
            : currentPage === 'quiz'
              ? t('seo:descQuiz')
              : defaultDescription;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-brand-50/40 to-accent-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
      </Helmet>
      {/* Celebration overlay */}
      <Celebration
        show={showCelebration}
        type={celebrationType}
        onComplete={() => setShowCelebration(false)}
      />

      {/* Skip link – matomas tik klaviatūra / ekrano skaitytuvams */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none"
      >
        {t('skipToContent')}
      </a>
      <AppNav
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onToggleDark={() => setIsDark(!isDark)}
        overallProgress={overallProgress}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Content */}
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        role="main"
      >
        <ErrorBoundary>
          {requiresModulesData && !modulesData && modulesLoadError && (
            <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {t('modulesLoadError')}
              </p>
              {currentPage === 'quiz' && (
                <button
                  onClick={() => setCurrentPage('modules')}
                  className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {t('back')}
                </button>
              )}
              <button
                onClick={handleRetryModules}
                className="px-6 py-3 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-colors"
              >
                {t('retry')}
              </button>
            </div>
          )}
          {!(requiresModulesData && !modulesData && modulesLoadError) && (
            <Suspense
              fallback={<LoadingSpinner size="lg" text={t('loading')} />}
            >
              {currentPage === 'home' && (
                <HomePage
                  onStart={() => setCurrentPage('modules')}
                  onGoToQuiz={() => setCurrentPage('quiz')}
                  progress={progress}
                />
              )}
              {currentPage === 'modules' && (
                <ModulesPage
                  onModuleSelect={handleModuleSelect}
                  onGoToQuiz={() => setCurrentPage('quiz')}
                  progress={progress}
                />
              )}
              {currentPage === 'module' &&
                selectedModule &&
                selectedModule <= maxAccessible && (
                  <ModuleView
                    moduleId={selectedModule}
                    initialSlideIndex={initialSlideIndex}
                    onClearInitialSlideIndex={() => setInitialSlideIndex(null)}
                    onBack={() => {
                      setCurrentPage('modules');
                      setSelectedModule(null);
                      setInitialSlideIndex(null);
                      setRemediationFrom(null);
                    }}
                    onComplete={handleModuleComplete}
                    onTaskComplete={handleTaskComplete}
                    onJourneyFocusChoice={handleModuleJourneyFocus}
                    onContinueToNext={handleContinueToNextModule}
                    onGoToModule={handleGoToModule}
                    onGoToGlossary={(slideIndex) => {
                      setInitialSlideIndex(slideIndex);
                      setCurrentPage('glossary');
                    }}
                    onGoToGlossaryTerm={(term) => {
                      setGlossaryHighlightTerm(term);
                      setCurrentPage('glossary');
                    }}
                    onGoToTools={(moduleId) => {
                      setToolsInitialFilter(moduleId);
                      setCurrentPage('tools');
                    }}
                    remediationFrom={
                      selectedModule === 1 &&
                      remediationFrom?.sourceModuleId === 2
                        ? remediationFrom
                        : null
                    }
                    onReturnToRemediation={
                      remediationFrom && selectedModule === 1
                        ? handleReturnToRemediation
                        : undefined
                    }
                    onRequestCertificate={handleRequestCertificate}
                    progress={progress}
                    totalModules={totalModules}
                  />
                )}
              {currentPage === 'glossary' && (
                <GlossaryPage
                  highlightTerm={glossaryHighlightTerm}
                  onBackToModule={
                    selectedModule ? () => setCurrentPage('module') : undefined
                  }
                  progress={progress}
                />
              )}
              {currentPage === 'tools' && (
                <ToolsPage
                  onBackToModule={
                    selectedModule
                      ? () => {
                          setCurrentPage('module');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      : undefined
                  }
                  initialFilter={toolsInitialFilter}
                />
              )}
              {currentPage === 'quiz' && (
                <QuizPage
                  onBack={() => setCurrentPage('modules')}
                  progress={progress}
                  onQuizComplete={(score) => {
                    setProgress((prev) => ({
                      ...prev,
                      quizScore: score,
                      quizCompleted: true,
                    }));
                  }}
                />
              )}
              {currentPage === 'certificate' && (
                <CertificateScreen
                  tier={certificateTier}
                  onBack={handleCertificateBack}
                />
              )}
            </Suspense>
          )}
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {t('footer:brandName')}
              </span>
            </div>
            <div className="text-center">
              <span>© 2024-2026 </span>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Tomas Staniulis
              </span>
              <span className="mx-2">•</span>
              <span>{t('footer:copyright')}</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.promptanatomy.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                aria-label={t('footer:websiteAria')}
              >
                {t('footer:websiteLabel')}
              </a>
              <a
                href="https://chat.whatsapp.com/It49fzTl1n90huRCoWWkwu?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                aria-label={t('footer:whatsAppAria')}
              >
                {t('footer:whatsAppLabel')}
              </a>
              <a
                href="https://github.com/DITreneris"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                aria-label={t('footer:githubAria')}
              >
                {t('footer:githubLabel')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
