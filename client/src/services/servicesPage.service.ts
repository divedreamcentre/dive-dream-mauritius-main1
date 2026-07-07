import type { ServicesPage } from '@/types';
import type { StrapiSingleResponse } from '@/types/strapi';
import { SERVICES_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `services-page` doesn't exist in Strapi yet (404) — falls back to
// local content until published.
export async function getServicesPage(): Promise<ServicesPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<{ hero: RawSectionHeading }>>(ENDPOINTS.servicesPage);
    return { hero: mapSectionHeading(raw.data.hero) };
  } catch (err) {
    console.warn('[Strapi] services-page single type not found yet, using local content fallback', err);
    return SERVICES_PAGE;
  }
}
