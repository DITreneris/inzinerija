import type { NewsPortalPromoRibbon as RibbonContent } from '../../../types/modules';

import {
  getPortalEditorialSurfaceClasses,
  getPortalKickerClasses,
  PORTAL_HEADING,
  PORTAL_TEXT,
} from './portalSurfaces';

interface NewsPortalPromoRibbonProps {
  ribbon: RibbonContent;
}

export default function NewsPortalPromoRibbon({
  ribbon,
}: NewsPortalPromoRibbonProps) {
  const variant = ribbon.variant === 'accent' ? 'accent' : 'brand';

  return (
    <aside
      className={getPortalEditorialSurfaceClasses(variant)}
      role="complementary"
      aria-label={ribbon.eyebrow}
    >
      <div className={`${getPortalKickerClasses('neutral')} mb-1`}>
        {ribbon.eyebrow}
      </div>

      <p className={`${PORTAL_HEADING.pullQuote} mb-0`}>{ribbon.title}</p>

      {ribbon.subline && (
        <p className={`mt-2 ${PORTAL_TEXT.bodySm}`}>{ribbon.subline}</p>
      )}
    </aside>
  );
}
