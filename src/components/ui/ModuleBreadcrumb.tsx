/**
 * ModuleBreadcrumb – hierarchical escape from module player.
 * Parent = modules catalog; current = module title (not a "Back" control).
 * @see docs/development/GOLDEN_STANDARD.md §8.6
 */
interface ModuleBreadcrumbProps {
  parentLabel: string;
  parentAriaLabel: string;
  currentLabel: string;
  onParentClick: () => void;
  /** nav aria-label */
  ariaLabel: string;
  className?: string;
}

export default function ModuleBreadcrumb({
  parentLabel,
  parentAriaLabel,
  currentLabel,
  onParentClick,
  ariaLabel,
  className = '',
}: ModuleBreadcrumbProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`flex items-center gap-2 min-w-0 ${className}`.trim()}
    >
      <button
        type="button"
        onClick={onParentClick}
        aria-label={parentAriaLabel}
        className="shrink-0 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-lg px-2 py-2 min-h-[44px]"
      >
        {parentLabel}
      </button>
      <span
        className="shrink-0 text-gray-400 dark:text-gray-500 select-none"
        aria-hidden
      >
        /
      </span>
      <span
        aria-current="page"
        className="min-w-0 truncate text-sm font-medium text-gray-700 dark:text-gray-300"
        title={currentLabel}
      >
        {currentLabel}
      </span>
    </nav>
  );
}
