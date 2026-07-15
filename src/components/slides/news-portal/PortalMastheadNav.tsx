import { Menu, Search } from 'lucide-react';

import type { NewsPortalNavLink } from '../../../types/modules';

import {
  getPortalKickerClasses,
  PORTAL_HEADING,
  PORTAL_TEXT,
} from './portalSurfaces';

interface PortalMastheadNavProps {
  portalBrand: string;

  portalNav?: NewsPortalNavLink[];

  isEn?: boolean;
}

export default function PortalMastheadNav({
  portalBrand,

  portalNav,

  isEn = false,
}: PortalMastheadNavProps) {
  const utilityLabel = isEn
    ? 'Search · Newsletter'
    : 'Paieška · Naujienlaiškis';

  const mediaLabel = isEn ? 'Media' : 'Žiniasklaida';

  const navAria = isEn
    ? 'Decorative portal navigation'
    : 'Dekoratyvi portalo navigacija';

  return (
    <header className="border-b border-gray-200/80 dark:border-gray-700/80 pb-2 mb-0.5">
      <div className="flex items-center justify-between gap-3 py-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`${PORTAL_HEADING.mastheadBrand} text-base lg:text-lg`}
          >
            {portalBrand}
          </span>

          <span
            className={`hidden sm:inline ${getPortalKickerClasses('neutral')} shrink-0`}
          >
            {mediaLabel}
          </span>
        </div>

        <div
          className={`flex items-center gap-2 shrink-0 ${PORTAL_TEXT.mutedXs}`}
        >
          <Search className="w-4 h-4 hidden sm:block" aria-hidden />

          <span className="hidden md:inline">{utilityLabel}</span>

          <Menu className="w-5 h-5 lg:hidden" aria-hidden />
        </div>
      </div>

      {portalNav && portalNav.length > 0 && (
        <nav
          className={`flex flex-wrap gap-x-4 gap-y-1 opacity-80 ${PORTAL_TEXT.navDecor}`}
          aria-label={navAria}
        >
          {portalNav.map((link, idx) => (
            <span
              key={idx}
              className="cursor-default pointer-events-none"
              aria-hidden="true"
            >
              {link.label}
            </span>
          ))}
        </nav>
      )}
    </header>
  );
}
