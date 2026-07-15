import type { NewsPortalCtaBlock } from '../../../types/modules';

import {
  getPortalEditorialSurfaceClasses,
  getPortalInteractiveCtaClasses,
  PORTAL_HEADING,
  PORTAL_TEXT,
} from './portalSurfaces';

interface PortalSlideCtaProps {
  ctaBlock: NewsPortalCtaBlock;

  onNextSlide?: () => void;

  staticAriaLabel?: string;
}

export default function PortalSlideCta({
  ctaBlock,

  onNextSlide,

  staticAriaLabel,
}: PortalSlideCtaProps) {
  const surfaceClasses = getPortalEditorialSurfaceClasses('accent');

  if (onNextSlide) {
    return (
      <button
        type="button"
        onClick={onNextSlide}
        className={`${surfaceClasses} ${getPortalInteractiveCtaClasses()}`}
        aria-label={`${ctaBlock.label}${ctaBlock.subline ? `. ${ctaBlock.subline}` : ''}`}
      >
        <span className={`block ${PORTAL_HEADING.cta}`}>{ctaBlock.label}</span>

        {ctaBlock.subline && (
          <span className={PORTAL_TEXT.ctaSubline}>{ctaBlock.subline}</span>
        )}
      </button>
    );
  }

  return (
    <div className={surfaceClasses} role="region" aria-label={staticAriaLabel}>
      <p className={PORTAL_HEADING.cta}>{ctaBlock.label}</p>

      {ctaBlock.subline && (
        <p className={PORTAL_TEXT.ctaSublineStatic}>{ctaBlock.subline}</p>
      )}
    </div>
  );
}
