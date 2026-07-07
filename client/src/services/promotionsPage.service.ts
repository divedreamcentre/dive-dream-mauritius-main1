import type { PromotionsPage } from '@/types';
import type { StrapiSingleResponse } from '@/types/strapi';
import { PROMOTIONS_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `promotions-page` doesn't exist in Strapi yet (404) — falls back to
// local content until published.
export async function getPromotionsPage(): Promise<PromotionsPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<{ hero: RawSectionHeading }>>(ENDPOINTS.promotionsPage);
    return { hero: mapSectionHeading(raw.data.hero) };
  } catch (err) {
    console.warn('[Strapi] promotions-page single type not found yet, using local content fallback', err);
    return PROMOTIONS_PAGE;
  }
}
