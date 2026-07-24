export type ContentBlockVariant =
  | 'accent'
  | 'brand'
  | 'terms'
  | 'emerald'
  | 'violet'
  | 'default'
  | string;

const basePadding = 'p-4 lg:p-5';

export function getContentBlockVariantClasses({
  variant = 'default',
  isOptional = false,
  isBottomLine = false,
  isInteractiveDiagram = false,
  sectionPadding = basePadding,
}: {
  variant?: ContentBlockVariant;
  isOptional?: boolean;
  isBottomLine?: boolean;
  isInteractiveDiagram?: boolean;
  sectionPadding?: string;
}) {
  if (isOptional) {
    return 'bg-gray-50 dark:bg-gray-800/70 p-4 lg:p-5 rounded-xl border-l-4 border-gray-300 dark:border-gray-600 border border-gray-200 dark:border-gray-700';
  }

  if (isBottomLine) {
    return 'bg-white/90 dark:bg-gray-800/90 p-4 lg:p-5 rounded-xl border-l-4 border-l-di-visata-ai-accent border border-blue-200/60 dark:border-blue-800/40 shadow-md';
  }

  if (isInteractiveDiagram) {
    /* LMS: one light panel, almost no frame weight (hero diagram) */
    return 'bg-transparent dark:bg-transparent p-1 sm:p-2 rounded-xl border-0 shadow-none';
  }

  switch (variant) {
    case 'accent':
      return 'bg-accent-50 dark:bg-accent-900/20 p-4 lg:p-5 rounded-xl border-l-4 border-accent-500 border border-accent-200 dark:border-accent-800';
    case 'brand':
      return `bg-brand-50 dark:bg-brand-900/20 ${sectionPadding} rounded-xl border-l-4 border-l-brand-500 border border-brand-200 dark:border-brand-800`;
    case 'terms':
      return 'bg-slate-50 dark:bg-slate-800/60 p-4 lg:p-5 rounded-xl border-l-4 border-slate-500 dark:border-slate-600 border border-slate-300 dark:border-slate-700';
    case 'emerald':
      return 'bg-emerald-50 dark:bg-emerald-900/20 p-4 lg:p-5 rounded-xl border-l-4 border-emerald-500 border border-emerald-200 dark:border-emerald-800';
    case 'violet':
      return 'bg-violet-50 dark:bg-violet-900/20 p-4 lg:p-5 rounded-xl border-l-4 border-violet-500 border border-violet-200 dark:border-violet-800';
    default:
      return 'bg-white dark:bg-gray-800 p-4 lg:p-5 rounded-xl border-l-4 border-brand-200 dark:border-brand-800 border border-gray-200 dark:border-gray-700';
  }
}
