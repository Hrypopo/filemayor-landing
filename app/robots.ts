import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    // Only server endpoints are off-limits. /_next/ holds every page's CSS,
    // JS and fonts — blocking it stops Google rendering the pages properly.
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
