/**
 * SlideWorkspace – unified inner workspace chrome for content-block slides (DS hardening 2026-07).
 * @see docs/development/GOLDEN_STANDARD.md §4, design-tokens spacingClasses
 */
import type { ReactNode } from 'react';
import { spacingClasses } from '../../../design-tokens';

export type SlideWorkspaceVariant = 'default' | 'fullBleed';

interface SlideWorkspaceProps {
  children: ReactNode;
  variant?: SlideWorkspaceVariant;
  className?: string;
}

export default function SlideWorkspace({
  children,
  variant = 'default',
  className = '',
}: SlideWorkspaceProps) {
  const gap = variant === 'fullBleed' ? '' : spacingClasses.blockGap;
  return (
    <div
      className={`${gap} ${className}`.trim()}
      data-slide-workspace={variant}
    >
      {children}
    </div>
  );
}
