import type { LucideIcon } from 'lucide-react';
import { resolveLucideIcon } from './resolveIcon';
import type { IconContext } from './types';

function isEmoji(key: string): boolean {
  return /^[\p{Extended_Pictographic}]/u.test(key);
}

export interface SlideLucideIconProps {
  name: string;
  context?: Exclude<IconContext, 'portalKpi' | 'portalTool' | 'module'>;
  className?: string;
  strokeWidth?: number;
}

/** Renders Lucide SVG for JSON icon keys; legacy emoji as text until migrated. */
export function SlideLucideIcon({
  name,
  context = 'infographic',
  className = 'w-6 h-6',
  strokeWidth = 2,
}: SlideLucideIconProps) {
  const Icon: LucideIcon | undefined = resolveLucideIcon(name, context, {
    fallback: false,
  });
  if (Icon) {
    return <Icon className={className} strokeWidth={strokeWidth} aria-hidden />;
  }
  if (isEmoji(name)) {
    return <span className="text-2xl leading-none">{name}</span>;
  }
  const Fallback = resolveLucideIcon(undefined, context)!;
  return (
    <Fallback className={className} strokeWidth={strokeWidth} aria-hidden />
  );
}
