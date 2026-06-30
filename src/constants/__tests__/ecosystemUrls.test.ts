import { describe, it, expect } from 'vitest';
import {
  blogArticleUrl,
  BLOG_ARTICLE_SLUGS,
  buildEcosystemUrl,
  getSpinoffCtaIdFromUrl,
} from '../ecosystemUrls';

describe('ecosystemUrls', () => {
  it('blogArticleUrl builds deep link with UTM', () => {
    const url = blogArticleUrl(BLOG_ARTICLE_SLUGS.ragInProduction, {
      moduleId: 8,
      touchpoint: 'test_fail',
    });
    expect(url).toContain('/articles/rag-in-production/');
    expect(url).toContain('utm_source=training');
    expect(url).toContain('utm_medium=spinoff');
    expect(url).toContain('utm_campaign=m8_test_fail');
  });

  it('getSpinoffCtaIdFromUrl maps blog article URLs to spinoff_deepen', () => {
    const url = blogArticleUrl(BLOG_ARTICLE_SLUGS.groundingAiOutputs, {
      moduleId: 7,
      touchpoint: '66_9',
    });
    expect(getSpinoffCtaIdFromUrl(url)).toBe('spinoff_deepen');
  });

  it('buildEcosystemUrl adds training UTM to plain ecosystem URLs', () => {
    const url = buildEcosystemUrl('manage', {
      moduleId: 5,
      touchpoint: 'test_results',
    });

    expect(url).toContain('https://www.promptanatomy.ceo/');
    expect(url).toContain('utm_source=training');
    expect(url).toContain('utm_medium=spinoff');
    expect(url).toContain('utm_campaign=m5_test_results');
    expect(getSpinoffCtaIdFromUrl(url)).toBe('spinoff_manage');
  });

  it('buildEcosystemUrl preserves hash targets for map and anatomizer', () => {
    const mapUrl = buildEcosystemUrl('map', {
      moduleId: 6,
      touchpoint: 'complete',
    });
    const anatomizerUrl = buildEcosystemUrl('anatomizer', {
      moduleId: 1,
      touchpoint: 'complete',
    });

    expect(mapUrl).toContain('?utm_source=training');
    expect(mapUrl).toContain('#ecosystem');
    expect(getSpinoffCtaIdFromUrl(mapUrl)).toBe('spinoff_map');
    expect(anatomizerUrl).toContain('#anatomizer');
    expect(getSpinoffCtaIdFromUrl(anatomizerUrl)).toBe('spinoff_anatomizer');
  });
});
