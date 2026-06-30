import { ExternalLink } from 'lucide-react';
import { trackSpinoffClick } from '../utils/analytics';

export interface EcosystemOutboundLinkProps {
  href: string;
  label: string;
  ariaLabel: string;
  moduleId: number;
  ctaId: string;
  slideId?: number | string;
}

/** Secondary outbound link with spin-off analytics. */
export function EcosystemOutboundLink({
  href,
  label,
  ariaLabel,
  moduleId,
  ctaId,
  slideId,
}: EcosystemOutboundLinkProps) {
  return (
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
      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded px-0.5"
      aria-label={ariaLabel}
    >
      {label}
      <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden />
    </a>
  );
}
