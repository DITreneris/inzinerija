import type { NewsPortalMeta } from '../../../types/modules';
import { getPortalKickerClasses, PORTAL_TEXT } from './portalSurfaces';

interface PortalHeroMetaProps {
  eyebrow?: string;
  portalMeta?: NewsPortalMeta;
  isEn?: boolean;
  showEyebrow?: boolean;
}

function formatReadMinutes(minutes: number, isEn: boolean): string {
  return isEn ? `${minutes} min read` : `${minutes} min. skaitymo`;
}

export default function PortalHeroMeta({
  eyebrow,
  portalMeta,
  isEn = false,
  showEyebrow = true,
}: PortalHeroMetaProps) {
  const parts: string[] = [];
  if (portalMeta?.byline) parts.push(portalMeta.byline);
  if (portalMeta?.publishedAt) parts.push(portalMeta.publishedAt);
  if (portalMeta?.readMinutes != null) {
    parts.push(formatReadMinutes(portalMeta.readMinutes, isEn));
  }

  if (!showEyebrow && parts.length === 0) return null;

  return (
    <div className="space-y-1">
      {showEyebrow && eyebrow && (
        <p className={getPortalKickerClasses('hero')}>{eyebrow}</p>
      )}
      {parts.length > 0 && (
        <p className={PORTAL_TEXT.muted}>{parts.join(' · ')}</p>
      )}
    </div>
  );
}
