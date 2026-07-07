import type { FAQPage } from '@/types';
import type { StrapiSingleResponse } from '@/types/strapi';
import { FAQ_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, normalizeStringArray, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `faq-page` doesn't exist in Strapi yet (404) — falls back to local
// content until published.
interface RawFAQPage {
  hero: RawSectionHeading;
  categories?: unknown;
  emergencyNotice: { title: string; description: string; hotlineLabel: string };
}

export async function getFAQPage(): Promise<FAQPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawFAQPage>>(ENDPOINTS.faqPage);
    const entry = raw.data;
    return {
      hero: mapSectionHeading(entry.hero),
      categories: normalizeStringArray(entry.categories),
      emergencyNotice: entry.emergencyNotice,
    };
  } catch (err) {
    console.warn('[Strapi] faq-page single type not found yet, using local content fallback', err);
    return FAQ_PAGE;
  }
}
