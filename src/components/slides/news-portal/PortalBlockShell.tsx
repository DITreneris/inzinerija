import type { CSSProperties, ReactNode } from 'react';

import {
  getPortalCardShellClasses,
  type PortalShellVariant,
} from './portalCardShell';

import { PORTAL_CARD, PORTAL_TEXT } from './portalSurfaces';

export type { PortalShellVariant };

interface PortalBlockShellProps {
  variant: PortalShellVariant;

  children: ReactNode;

  className?: string;

  footerInsight?: string;

  cornerRadius?: 'lg' | 'xl';

  as?: 'div' | 'aside';

  style?: CSSProperties;

  'aria-label'?: string;

  role?: string;
}

export default function PortalBlockShell({
  variant,

  children,

  className = '',

  footerInsight,

  cornerRadius = PORTAL_CARD.radius,

  as: Tag = 'div',

  style,

  ...rest
}: PortalBlockShellProps) {
  const blockClasses = getPortalCardShellClasses(variant, cornerRadius);

  return (
    <Tag
      className={`${blockClasses} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}

      {footerInsight && (
        <p
          className={`mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 max-w-2xl ${PORTAL_TEXT.cardFooter}`}
        >
          {footerInsight}
        </p>
      )}
    </Tag>
  );
}
