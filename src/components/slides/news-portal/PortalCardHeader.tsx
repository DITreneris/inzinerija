import { getPortalKickerClasses, PORTAL_TEXT } from './portalSurfaces';

interface PortalCardHeaderProps {
  label: string;
  title: string;
}

/** Vienas card antraštės pattern visiems PortalBlockShell blokams */
export default function PortalCardHeader({ label, title }: PortalCardHeaderProps) {
  return (
    <>
      <div className={`${getPortalKickerClasses('neutral')} mb-1`}>{label}</div>
      <h3 className={`${PORTAL_TEXT.cardTitle} mb-3`}>{title}</h3>
    </>
  );
}
