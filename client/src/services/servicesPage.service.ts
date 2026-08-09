import type { ServicesPage } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { SERVICES_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, resolveStrapiMediaUrl, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `services-page` doesn't exist in Strapi yet (404) — falls back to
// local content until published.
export async function getServicesPage(): Promise<ServicesPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<{ hero?: RawSectionHeading | null; heroImage?: StrapiMedia | null }>>(ENDPOINTS.servicesPage);
    return {
      hero: raw.data.hero ? mapSectionHeading(raw.data.hero) : SERVICES_PAGE.hero,
      heroImage: resolveStrapiMediaUrl(raw.data.heroImage) || SERVICES_PAGE.heroImage,
    };
  } catch (err) {
    console.warn('[Strapi] services-page single type not found yet, using local content fallback', err);
    return SERVICES_PAGE;
  }
}
