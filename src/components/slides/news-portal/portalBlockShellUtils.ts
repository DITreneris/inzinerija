import type { PortalShellVariant } from './portalCardShell';

export function resolveBeatShellVariant(
  beatId: string,
  accentKey?: string
): PortalShellVariant {
  if (beatId === 'awareness-gap') return 'accent';
  if (beatId === 'lithuania-context') return 'brand';
  if (beatId === 'next-step-prompt') return 'violet';
  if (accentKey === 'violet') return 'violet';
  if (accentKey === 'emerald') return 'emerald';
  if (accentKey === 'brand') return 'brand';
  return 'accent';
}
