import { describe, it, expect } from 'vitest';
import {
  blogArticleUrl,
  BLOG_ARTICLE_SLUGS,
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
});
