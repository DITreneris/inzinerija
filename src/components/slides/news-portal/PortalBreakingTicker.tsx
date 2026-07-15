import { getPortalKickerClasses, PORTAL_TEXT } from './portalSurfaces';

interface PortalBreakingTickerProps {
  ticker: string;
  isEn?: boolean;
}

export default function PortalBreakingTicker({
  ticker,
  isEn = false,
}: PortalBreakingTickerProps) {
  const label = isEn ? 'Now' : 'Dabar';
  return (
    <div
      className={`hidden sm:block overflow-x-auto whitespace-nowrap ${PORTAL_TEXT.mutedXs} py-2 border-b border-gray-200 dark:border-gray-700 mb-2`}
      role="presentation"
    >
      <span className={`${getPortalKickerClasses('hero')} mr-2`}>{label}:</span>
      {ticker}
    </div>
  );
}
