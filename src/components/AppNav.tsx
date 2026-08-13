import { useRef, useEffect } from 'react';
import {
  Home,
  BookOpen,
  ClipboardCheck,
  Moon,
  Sun,
  Menu,
  X,
  BookMarked,
  Wrench,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../contexts/LocaleContext';
import {
  focusRingClasses,
  surfaceGlass,
  touchTargetClasses,
} from '../design-tokens';
import { BrandMark } from './ui';

export type NavPage =
  | 'home'
  | 'modules'
  | 'module'
  | 'quiz'
  | 'glossary'
  | 'tools'
  | 'certificate';

export interface AppNavProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onToggleDark: () => void;
  overallProgress: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

function CourseProgressMeter({
  percent,
  compact,
  label,
}: {
  percent: number;
  compact?: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2" role="img" aria-label={label}>
      <div
        className={`${compact ? 'w-12' : 'w-14'} h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      {!compact && (
        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
          {percent}%
        </span>
      )}
    </div>
  );
}

function destClass(active: boolean) {
  return `flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${focusRingClasses.brand} ${touchTargetClasses.minimumHeight} justify-center whitespace-nowrap ${
    active
      ? 'bg-brand-600 dark:bg-brand-500 text-white shadow-lg shadow-brand-500/25 border-b-2 border-accent-500 rounded-b-xl'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 border-b-2 border-transparent'
  }`;
}

export function AppNav({
  currentPage,
  onNavigate,
  onToggleDark,
  overallProgress,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: AppNavProps) {
  const { t } = useTranslation('nav');
  const { locale, setLocale } = useLocale();
  const navRef = useRef<HTMLElement>(null);
  const nav = (page: NavPage) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };
  const showMeter = overallProgress > 0 && currentPage !== 'module';
  const modulesActive = currentPage === 'modules' || currentPage === 'module';

  useEffect(() => {
    const el = navRef.current;
    const Ctor =
      typeof window !== 'undefined' && 'ResizeObserver' in window
        ? (window as Window & { ResizeObserver: typeof ResizeObserver })
            .ResizeObserver
        : null;
    if (!el || !Ctor) return;
    const ro = new Ctor(([entry]) => {
      const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
      document.documentElement.style.setProperty('--app-nav-height', `${h}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const renderThemeToggle = () => (
    <button
      type="button"
      onClick={onToggleDark}
      className={`p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors ${touchTargetClasses.minimum} ${focusRingClasses.brand} flex items-center justify-center`}
      aria-label={t('toggleDark')}
    >
      <Moon className="w-5 h-5 dark:hidden" strokeWidth={1.5} />
      <Sun className="w-5 h-5 hidden dark:block" strokeWidth={1.5} />
    </button>
  );

  const destButtons = (
    <>
      <button
        onClick={() => nav('home')}
        className={destClass(currentPage === 'home')}
        aria-label={t('homeAria')}
        aria-current={currentPage === 'home' ? 'page' : undefined}
      >
        <Home className="w-5 h-5" strokeWidth={1.5} />
        <span
          className={currentPage === 'home' ? 'font-semibold' : 'font-medium'}
        >
          {t('home')}
        </span>
      </button>

      <button
        onClick={() => nav('modules')}
        className={destClass(modulesActive)}
        aria-label={t('modulesAria')}
        aria-current={modulesActive ? 'page' : undefined}
      >
        <BookOpen className="w-5 h-5" strokeWidth={1.5} />
        <span className={modulesActive ? 'font-semibold' : 'font-medium'}>
          {t('modules')}
        </span>
      </button>

      <button
        onClick={() => nav('glossary')}
        className={destClass(currentPage === 'glossary')}
        aria-label={t('glossaryAria')}
        aria-current={currentPage === 'glossary' ? 'page' : undefined}
      >
        <BookMarked className="w-5 h-5" strokeWidth={1.5} />
        <span
          className={
            currentPage === 'glossary' ? 'font-semibold' : 'font-medium'
          }
        >
          {t('glossary')}
        </span>
      </button>

      <button
        onClick={() => nav('tools')}
        className={destClass(currentPage === 'tools')}
        aria-label={t('toolsAria')}
        aria-current={currentPage === 'tools' ? 'page' : undefined}
      >
        <Wrench className="w-5 h-5" strokeWidth={1.5} />
        <span
          className={currentPage === 'tools' ? 'font-semibold' : 'font-medium'}
        >
          {t('tools')}
        </span>
      </button>

      <button
        onClick={() => nav('quiz')}
        className={destClass(currentPage === 'quiz')}
        aria-label={t('quizAria')}
        aria-current={currentPage === 'quiz' ? 'page' : undefined}
      >
        <ClipboardCheck className="w-5 h-5" strokeWidth={1.5} />
        <span
          className={currentPage === 'quiz' ? 'font-semibold' : 'font-medium'}
        >
          {t('quiz')}
        </span>
      </button>
    </>
  );

  return (
    <nav
      ref={navRef}
      className={`${surfaceGlass.shell} shadow-sm sticky top-0 z-40 border-b`}
      aria-label={t('ariaLabel')}
    >
      <h1 className="sr-only">{t('appTitle')}</h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-between min-h-16 gap-x-4 gap-y-2 py-2">
          <button
            type="button"
            onClick={() => nav('home')}
            className={`flex items-center gap-3 shrink-0 rounded-xl transition-opacity hover:opacity-90 ${focusRingClasses.brand} ${touchTargetClasses.minimumHeight}`}
            aria-label={t('appTitle')}
            aria-current={currentPage === 'home' ? 'page' : undefined}
          >
            <BrandMark variant="nav" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              <span className="lg:hidden">{t('appTitleShort')}</span>
              <span className="hidden lg:inline">{t('appTitle')}</span>
            </span>
          </button>

          {/* lg: contents so dest can basis-full on the outer row; xl: one right cluster */}
          <div className="hidden lg:contents xl:flex xl:items-center xl:gap-4">
            <div className="flex items-center gap-3 shrink-0">
              {showMeter && (
                <CourseProgressMeter
                  percent={overallProgress}
                  label={t('progressLabel', { percent: overallProgress })}
                />
              )}
              {renderThemeToggle()}
              <div
                className="flex items-center rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                role="group"
                aria-label={t('langSwitchAria')}
              >
                <button
                  type="button"
                  onClick={() => setLocale('lt')}
                  className={`px-3 py-2 text-sm font-medium ${touchTargetClasses.minimumHeight} transition-colors ${
                    locale === 'lt'
                      ? 'bg-brand-600 text-white dark:bg-brand-500'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  aria-pressed={locale === 'lt'}
                >
                  {t('langLt')}
                </button>
                <button
                  type="button"
                  onClick={() => setLocale('en')}
                  className={`px-3 py-2 text-sm font-medium ${touchTargetClasses.minimumHeight} transition-colors ${
                    locale === 'en'
                      ? 'bg-brand-600 text-white dark:bg-brand-500'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  aria-pressed={locale === 'en'}
                >
                  {t('langEn')}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 basis-full xl:basis-auto justify-between xl:justify-end">
              {destButtons}
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            {showMeter && (
              <CourseProgressMeter
                percent={overallProgress}
                compact
                label={t('progressShort', { percent: overallProgress })}
              />
            )}
            {renderThemeToggle()}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${touchTargetClasses.minimum} ${focusRingClasses.brand} flex items-center justify-center`}
              aria-label={isMobileMenuOpen ? t('menuClose') : t('menuOpen')}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 dark:border-gray-800 animate-fade-in overflow-hidden">
            <div className="py-2 space-y-1">
              <button
                onClick={() => nav('home')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left min-h-[48px] border-b-2 ${
                  currentPage === 'home'
                    ? 'bg-brand-600 dark:bg-brand-500 text-white shadow-lg shadow-brand-500/25 border-accent-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 border-transparent'
                }`}
                aria-label={t('homeAria')}
                aria-current={currentPage === 'home' ? 'page' : undefined}
              >
                <Home className="w-5 h-5 shrink-0" />
                <span
                  className={
                    currentPage === 'home' ? 'font-semibold' : 'font-medium'
                  }
                >
                  {t('home')}
                </span>
              </button>

              <button
                onClick={() => nav('modules')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left min-h-[48px] border-b-2 ${
                  modulesActive
                    ? 'bg-brand-600 dark:bg-brand-500 text-white shadow-lg shadow-brand-500/25 border-accent-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 border-transparent'
                }`}
                aria-label={t('modulesAria')}
                aria-current={modulesActive ? 'page' : undefined}
              >
                <BookOpen className="w-5 h-5 shrink-0" />
                <span
                  className={modulesActive ? 'font-semibold' : 'font-medium'}
                >
                  {t('modules')}
                </span>
              </button>

              <button
                onClick={() => nav('glossary')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left min-h-[48px] border-b-2 ${
                  currentPage === 'glossary'
                    ? 'bg-brand-600 dark:bg-brand-500 text-white shadow-lg shadow-brand-500/25 border-accent-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 border-transparent'
                }`}
                aria-label={t('glossaryAria')}
                aria-current={currentPage === 'glossary' ? 'page' : undefined}
              >
                <BookMarked className="w-5 h-5 shrink-0" />
                <span
                  className={
                    currentPage === 'glossary' ? 'font-semibold' : 'font-medium'
                  }
                >
                  {t('glossary')}
                </span>
              </button>

              <button
                onClick={() => nav('tools')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left min-h-[48px] border-b-2 ${
                  currentPage === 'tools'
                    ? 'bg-brand-600 dark:bg-brand-500 text-white shadow-lg shadow-brand-500/25 border-accent-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 border-transparent'
                }`}
                aria-label={t('toolsAria')}
                aria-current={currentPage === 'tools' ? 'page' : undefined}
              >
                <Wrench className="w-5 h-5 shrink-0" />
                <span
                  className={
                    currentPage === 'tools' ? 'font-semibold' : 'font-medium'
                  }
                >
                  {t('tools')}
                </span>
              </button>

              <button
                onClick={() => nav('quiz')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left min-h-[48px] border-b-2 ${
                  currentPage === 'quiz'
                    ? 'bg-brand-600 dark:bg-brand-500 text-white shadow-lg shadow-brand-500/25 border-accent-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 border-transparent'
                }`}
                aria-label={t('quizAria')}
                aria-current={currentPage === 'quiz' ? 'page' : undefined}
              >
                <ClipboardCheck className="w-5 h-5 shrink-0" />
                <span
                  className={
                    currentPage === 'quiz' ? 'font-semibold' : 'font-medium'
                  }
                >
                  {t('quiz')}
                </span>
              </button>

              <div className="px-4 py-2 mt-1 border-t border-gray-200/50 dark:border-gray-800">
                <div
                  className="flex items-center rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden w-full"
                  role="group"
                  aria-label={t('langSwitchAria')}
                >
                  <button
                    type="button"
                    onClick={() => setLocale('lt')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${
                      locale === 'lt'
                        ? 'bg-brand-600 text-white dark:bg-brand-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                    aria-pressed={locale === 'lt'}
                  >
                    {t('langLt')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocale('en')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${
                      locale === 'en'
                        ? 'bg-brand-600 text-white dark:bg-brand-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                    aria-pressed={locale === 'en'}
                  >
                    {t('langEn')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
