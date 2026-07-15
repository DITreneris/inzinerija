/** In-page scroll targets for M4 sk. 53.5 news-portal editorial layout. */

export const PORTAL_SECTION_DATA = 'portal-section-data';
export const PORTAL_BEAT_AWARENESS = 'portal-beat-awareness';
export const PORTAL_BEAT_LITHUANIA = 'portal-beat-lithuania';
export const PORTAL_SECTION_DEPTH = 'portal-section-depth';
export const PORTAL_SECTION_CLOSE = 'portal-section-close';

export type PortalScrollTargetId =
  | typeof PORTAL_SECTION_DATA
  | typeof PORTAL_BEAT_AWARENESS
  | typeof PORTAL_BEAT_LITHUANIA
  | typeof PORTAL_SECTION_DEPTH
  | typeof PORTAL_SECTION_CLOSE;

/** Offset for sticky app nav + immersive progress when scrolling to targets. */
export const PORTAL_SCROLL_TARGET =
  'scroll-mt-[calc(var(--app-nav-height,4rem)+12px)] scroll-mb-20';

export function scrollToPortalSection(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
