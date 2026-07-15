import {
  PORTAL_SECTION_CLOSE,
  PORTAL_SECTION_DATA,
  PORTAL_SECTION_DEPTH,
  scrollToPortalSection,
} from './portalSectionAnchors';
import { getPortalSectionLabelClasses } from './portalSurfaces';

interface PortalChapterNavProps {
  isEn?: boolean;
}

const CHAPTER_JUMP_BTN =
  'min-h-[44px] px-2 py-1.5 -mx-2 rounded-md hover:text-brand-600 dark:hover:text-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 transition-colors';

export default function PortalChapterNav({
  isEn = false,
}: PortalChapterNavProps) {
  const ariaLabel = isEn ? 'Slide contents' : 'Skaidrės turinys';

  const items = isEn
    ? [
        { label: 'Data', target: PORTAL_SECTION_DATA },
        { label: 'In depth', target: PORTAL_SECTION_DEPTH },
        { label: 'Summary', target: PORTAL_SECTION_CLOSE },
      ]
    : [
        { label: 'Duomenys', target: PORTAL_SECTION_DATA },
        { label: 'Giliau', target: PORTAL_SECTION_DEPTH },
        { label: 'Santrauka', target: PORTAL_SECTION_CLOSE },
      ];

  return (
    <nav
      className="flex flex-wrap items-center gap-x-1 gap-y-2 border-t border-gray-100 dark:border-gray-800 pt-3 mt-2"
      aria-label={ariaLabel}
    >
      {items.map((item, idx) => (
        <span key={item.target} className="inline-flex items-center gap-x-1">
          {idx > 0 && (
            <span
              className="text-gray-300 dark:text-gray-600 px-0.5"
              aria-hidden
            >
              ·
            </span>
          )}
          <button
            type="button"
            className={`${CHAPTER_JUMP_BTN} ${getPortalSectionLabelClasses('nav')}`}
            onClick={() => scrollToPortalSection(item.target)}
          >
            {item.label}
          </button>
        </span>
      ))}
    </nav>
  );
}
