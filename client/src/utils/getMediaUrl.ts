import { strapiConfig } from '@/lib/strapi';

// General-purpose safety net for any already-extracted URL string (as
// opposed to `resolveStrapiMediaUrl` in lib/strapiMappers.ts, which operates
// on a raw Strapi media *object* during response mapping). Local fallback
// content (src/content/*) already uses absolute external URLs, so this is a
// passthrough for those; it only does work for a bare relative path like
// "/uploads/foo.jpeg" that reached a component without going through a
// mapper first.
export function getMediaUrl(source: string): string {
  if (!source) return source;
  if (source.startsWith('http://') || source.startsWith('https://') || source.startsWith('/images/')) {
    return source;
  }
  if (source.startsWith('/uploads/')) {
    return `${strapiConfig.baseUrl}${source}`;
  }
  return source;
}
