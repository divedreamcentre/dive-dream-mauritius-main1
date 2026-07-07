import type { CrewPage } from '@/types';
import type { StrapiSingleResponse } from '@/types/strapi';
import { CREW_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `crew-page` doesn't exist in Strapi yet (404) — falls back to local
// content until published.
export async function getCrewPage(): Promise<CrewPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<{ hero: RawSectionHeading }>>(ENDPOINTS.crewPage);
    return { hero: mapSectionHeading(raw.data.hero) };
  } catch (err) {
    console.warn('[Strapi] crew-page single type not found yet, using local content fallback', err);
    return CREW_PAGE;
  }
}
