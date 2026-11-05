import type { MetadataRoute } from 'next';
import { site } from '@/lib/config';
export default function sitemap(): MetadataRoute.Sitemap {
  // La URL canónica debe configurarse antes del lanzamiento público y de enviar el sitemap a buscadores.
  if (!site.website || !/^https:\/\//.test(site.website)) return [];
  const root = site.website.replace(/\/$/, '');
  return ['/', '/migracion-ueno/', '/privacidad/', '/terminos/', '/reembolsos/'].map(path => ({ url: `${root}${path}`, changeFrequency: path === '/' ? 'weekly' : 'monthly' as const, priority: path === '/' ? 1 : 0.5 }));
}
