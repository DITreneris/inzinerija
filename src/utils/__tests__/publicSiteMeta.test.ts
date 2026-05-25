import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getPublicAppUrl,
  getOgImageUrl,
  getPublicSiteOrigin,
  resolvePublicAppUrlsForBuild,
} from '../publicSiteMeta';

describe('resolvePublicAppUrlsForBuild', () => {
  it('builds monorepo prod URLs', () => {
    const { appUrl, ogImageUrl } = resolvePublicAppUrlsForBuild({
      publicSiteUrl: 'https://www.promptanatomy.app',
      basePath: '/anatomy/',
    });
    expect(appUrl).toBe('https://www.promptanatomy.app/anatomy/');
    expect(ogImageUrl).toBe(
      'https://www.promptanatomy.app/anatomy/og-image.png'
    );
  });

  it('builds GitHub Pages URLs', () => {
    const { appUrl } = resolvePublicAppUrlsForBuild({
      publicSiteUrl: 'https://ditreneris.github.io',
      basePath: '/inzinerija/',
    });
    expect(appUrl).toBe('https://ditreneris.github.io/inzinerija/');
  });

  it('strips trailing slash from origin', () => {
    const { appUrl } = resolvePublicAppUrlsForBuild({
      publicSiteUrl: 'https://www.promptanatomy.app/',
      basePath: '/anatomy/',
    });
    expect(appUrl).toBe('https://www.promptanatomy.app/anatomy/');
  });
});

describe('getPublicSiteOrigin / getPublicAppUrl (runtime env)', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_PUBLIC_SITE_URL', 'https://www.promptanatomy.app');
    vi.stubEnv('BASE_URL', '/anatomy/');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('uses VITE_PUBLIC_SITE_URL for origin', () => {
    expect(getPublicSiteOrigin()).toBe('https://www.promptanatomy.app');
  });

  it('composes app and OG image URLs', () => {
    expect(getPublicAppUrl()).toBe('https://www.promptanatomy.app/anatomy/');
    expect(getOgImageUrl()).toBe(
      'https://www.promptanatomy.app/anatomy/og-image.png'
    );
  });
});
