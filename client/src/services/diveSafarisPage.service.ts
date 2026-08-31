import type { DiveSafarisPage } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { DIVE_SAFARIS_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, normalizeStringArray, resolveStrapiMediaUrl, type RawSectionHeading } from '@/lib/strapiMappers';

// `dive-sites-page` is live in Strapi, but the published entry only has
// `hero`/`seo` filled in — no mapSection/mapImage/highlightsSection/
// certLevels/diveTypes yet. Every field below falls back independently to
// the matching DIVE_SAFARIS_PAGE section instead of the old behavior
// (resolveStrapiMediaUrl on a missing image silently returning '', which
// rendered as a broken <img> — no crash, but a broken picture in production).
interface RawDiveSafarisPage {
  hero?: RawSectionHeading | null;
  mapSection?: RawSectionHeading | null;
  mapImage?: StrapiMedia | null;
  highlightsSection?: RawSectionHeading | null;
  certLevels?: unknown;
  diveTypes?: unknown;
}

export async function getDiveSafarisPage(): Promise<DiveSafarisPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawDiveSafarisPage>>(ENDPOINTS.diveSafarisPage);
    const entry = raw.data;
    return {
      hero: entry.hero ? mapSectionHeading(entry.hero) : DIVE_SAFARIS_PAGE.hero,
      mapSection: entry.mapSection ? mapSectionHeading(entry.mapSection) : DIVE_SAFARIS_PAGE.mapSection,
      mapImage: resolveStrapiMediaUrl(entry.mapImage) || DIVE_SAFARIS_PAGE.mapImage,
      highlightsSection: entry.highlightsSection ? mapSectionHeading(entry.highlightsSection) : DIVE_SAFARIS_PAGE.highlightsSection,
      certLevels: entry.certLevels ? normalizeStringArray(entry.certLevels) : DIVE_SAFARIS_PAGE.certLevels,
      diveTypes: entry.diveTypes ? normalizeStringArray(entry.diveTypes) : DIVE_SAFARIS_PAGE.diveTypes,
    };
  } catch (err) {
    console.warn('[Strapi] dive-sites-page request failed, using local content fallback', err);
    return DIVE_SAFARIS_PAGE;
  }
}
