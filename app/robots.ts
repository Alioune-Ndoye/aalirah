import type { MetadataRoute } from 'next';
import siteConfig from '@/data/siteConfig';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/api/book'],
    },
    sitemap: `${siteConfig.SITE_URL}/sitemap.xml`,
  };
}
