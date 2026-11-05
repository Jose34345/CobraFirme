export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
import { site } from '@/lib/config';
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: ['/recursos/privado/'] }, ...(site.website ? { sitemap: `${site.website.replace(/\/$/, '')}/sitemap.xml` } : {}) };
}
