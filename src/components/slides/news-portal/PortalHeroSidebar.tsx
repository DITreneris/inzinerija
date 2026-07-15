import type { NewsPortalHeroSidebarTeaser } from '../../../types/modules';

import { scrollToPortalSection } from './portalSectionAnchors';
import {
  getPortalKickerClasses,
  getPortalSectionLabelClasses,
  PORTAL_TEXT,
} from './portalSurfaces';

interface PortalHeroSidebarProps {
  teasers: NewsPortalHeroSidebarTeaser[];
  isEn?: boolean;
}

const TEASER_JUMP_BTN =
  'w-full text-left min-h-[44px] rounded-md -mx-1 px-1 py-1 hover:text-brand-700 dark:hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 transition-colors';

export default function PortalHeroSidebar({
  teasers,
  isEn = false,
}: PortalHeroSidebarProps) {
  if (teasers.length === 0) return null;

  const heading = isEn ? 'Top stories' : 'Svarbiausia';
  const jumpPrefix = isEn ? 'Jump to: ' : 'Pereiti prie: ';

  return (
    <aside
      className="min-w-0 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 pt-4 lg:pt-0 lg:pl-5"
      aria-label={heading}
    >
      <p className={`${getPortalSectionLabelClasses('break')} mb-3`}>{heading}</p>
      <ul className="space-y-4 lg:space-y-3" role="list">
        {teasers.map((teaser, idx) => (
          <li
            key={idx}
            className="border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0 last:pb-0"
          >
            {teaser.eyebrow && (
              <p className={`${getPortalKickerClasses('neutral')} mb-0.5`}>
                {teaser.eyebrow}
                {teaser.readMinutes != null && (
                  <span className="font-normal normal-case tracking-normal">
                    {' '}
                    · {teaser.readMinutes} min
                  </span>
                )}
              </p>
            )}
            {teaser.scrollTarget ? (
              <button
                type="button"
                className={`${TEASER_JUMP_BTN} ${PORTAL_TEXT.teaserTitle}`}
                aria-label={`${jumpPrefix}${teaser.headline}`}
                onClick={() => scrollToPortalSection(teaser.scrollTarget!)}
              >
                {teaser.headline}
              </button>
            ) : (
              <p className={PORTAL_TEXT.teaserTitle}>{teaser.headline}</p>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
