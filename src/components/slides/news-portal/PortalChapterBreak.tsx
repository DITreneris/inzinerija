import { PORTAL_SCROLL_TARGET } from './portalSectionAnchors';
import {
  getPortalSectionLabelClasses,
  PORTAL_SPACING,
  PORTAL_TEXT,
} from './portalSurfaces';

interface PortalChapterBreakProps {
  label: string;
  subtitle?: string;
  id?: string;
}

export default function PortalChapterBreak({
  label,
  subtitle,
  id,
}: PortalChapterBreakProps) {
  const isLandmark = Boolean(id);

  return (
    <div
      id={id}
      tabIndex={isLandmark ? -1 : undefined}
      className={`${PORTAL_SPACING.chapter} pb-1 ${isLandmark ? PORTAL_SCROLL_TARGET : ''}`.trim()}
      role={isLandmark ? undefined : 'presentation'}
      aria-hidden={isLandmark ? undefined : true}
    >
      <p className={getPortalSectionLabelClasses('break')}>{label}</p>
      {subtitle && (
        <p className={`mt-1 ${PORTAL_TEXT.muted}`}>{subtitle}</p>
      )}
    </div>
  );
}
