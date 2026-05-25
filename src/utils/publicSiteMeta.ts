/** Default origin when VITE_PUBLIC_SITE_URL is unset (monorepo prod). */
const DEFAULT_PUBLIC_SITE_ORIGIN = 'https://www.promptanatomy.app';

function normalizeBasePath(base: string): string {
  if (!base || base === '/') return '/';
  let normalized = base.startsWith('/') ? base : `/${base}`;
  if (!normalized.endsWith('/')) normalized = `${normalized}/`;
  return normalized;
}

/**
 * Public site origin (no trailing slash).
 * VITE_PUBLIC_SITE_URL → window.location.origin (browser) → default prod URL.
 */
export function getPublicSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_PUBLIC_SITE_URL;
  if (fromEnv != null && String(fromEnv).trim() !== '') {
    return String(fromEnv).replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return DEFAULT_PUBLIC_SITE_ORIGIN;
}

/** Full public URL of the training app (origin + Vite BASE_URL). */
export function getPublicAppUrl(): string {
  const origin = getPublicSiteOrigin();
  const base = normalizeBasePath(import.meta.env.BASE_URL || '/');
  if (base === '/') return `${origin}/`;
  return `${origin}${base}`;
}

/** OG/Twitter image URL (served from public/og-image.png). */
export function getOgImageUrl(): string {
  return `${getPublicAppUrl()}og-image.png`;
}

/** Build-time helper for index.html transform (Node / Vite config). */
export function resolvePublicAppUrlsForBuild(options: {
  publicSiteUrl?: string;
  basePath?: string;
  nodeEnv?: string;
}): { appUrl: string; ogImageUrl: string } {
  const origin = (options.publicSiteUrl ?? DEFAULT_PUBLIC_SITE_ORIGIN).replace(
    /\/$/,
    ''
  );
  const base =
    options.basePath ??
    (options.nodeEnv === 'production' ? '/inzinerija/' : '/');
  const normalized = normalizeBasePath(base);
  const appUrl = normalized === '/' ? `${origin}/` : `${origin}${normalized}`;
  return { appUrl, ogImageUrl: `${appUrl}og-image.png` };
}
