import { ExternalLink } from 'lucide-react';
import { trackSpinoffClick } from '../utils/analytics';

export interface EcosystemDeepenBlockProps {
  href: string;
  label: string;
  description: string;
  ariaLabel: string;
  moduleId: number;
  slideId?: number | string;
  ctaId?: string;
}

/** Secondary Deepen (blog) CTA – accent-bordered spin-off block. */
export function EcosystemDeepenBlock({
  href,
  label,
  description,
  ariaLabel,
  moduleId,
  slideId,
  ctaId = 'spinoff_deepen',
}: EcosystemDeepenBlockProps) {
  return (
    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackSpinoffClick({
            module_id: moduleId,
            slide_id: slideId,
            url: href,
            cta_id: ctaId,
            cta_label: label,
          })
        }
        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl border-2 border-accent-400 dark:border-accent-500 bg-transparent text-accent-700 dark:text-accent-300 font-semibold text-sm shadow-sm hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:border-accent-500 dark:hover:border-accent-400 hover:shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
        aria-label={ariaLabel}
      >
        <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden />
        {label}
      </a>
    </div>
  );
}
