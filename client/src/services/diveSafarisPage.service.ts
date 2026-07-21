import type { DiveSafarisPage } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { DIVE_SAFARIS_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, normalizeStringArray, resolveStrapiMediaUrl, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `dive-sites-page` doesn't exist in Strapi yet (404) — falls back to
// local content until published.
interface RawDiveSafarisPage {
  hero: RawSectionHeading;
  mapSection: RawSectionHeading;
  mapImage: StrapiMedia | null;
  highlightsSection: RawSectionHeading;
  certLevels?: unknown;
  diveTypes?: unknown;
}

export async function getDiveSafarisPage(): Promise<DiveSafarisPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawDiveSafarisPage>>(ENDPOINTS.diveSafarisPage);
    const entry = raw.data;
    return {
      hero: mapSectionHeading(entry.hero),
      mapSection: mapSectionHeading(entry.mapSection),
      mapImage: resolveStrapiMediaUrl(entry.mapImage),
      highlightsSection: mapSectionHeading(entry.highlightsSection),
      certLevels: normalizeStringArray(entry.certLevels),
      diveTypes: normalizeStringArray(entry.diveTypes),
    };
  } catch (err) {
    console.warn('[Strapi] dive-sites-page single type not found yet, using local content fallback', err);
    return DIVE_SAFARIS_PAGE;
  }
}
