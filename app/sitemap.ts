import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${site.url}/download`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/docs`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/docs/cli`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/docs/security`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/docs/sop`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${site.url}/blog/three-dependencies`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/blog/curative-triad`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/blog/chevza-doctrine`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/vs`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/vs/hazel`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/changelog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];
}
