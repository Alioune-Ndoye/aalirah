import type { MetadataRoute } from 'next';
import siteConfig from '@/data/siteConfig';
import cities from '@/data/cities';
import services from '@/data/services';

const base = siteConfig.SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const corePages: MetadataRoute.Sitemap = [
    { url: `${base}/`,        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/services`,lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/book`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];

  const servicePages: MetadataRoute.Sitemap = Object.keys(services).map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = Object.keys(cities).map((slug) => ({
    url: `${base}/cleaning-services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...corePages, ...servicePages, ...cityPages];
}
