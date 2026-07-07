import type { ContactPage } from '@/types';
import type { StrapiSingleResponse } from '@/types/strapi';
import { CONTACT_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `contact-page` doesn't exist in Strapi yet (404 on every naming
// variant tried) — falls back to local content until it's published.
interface RawContactPage {
  hero: RawSectionHeading;
  channelsHeading: string;
  safetyNote: { title: string; description: string };
  formHeading: string;
  mapConfig: { center: { lat: number; lng: number }; zoom: number; markerTitle: string };
}

export async function getContactPage(): Promise<ContactPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawContactPage>>(ENDPOINTS.contactPage);
    const entry = raw.data;
    return {
      hero: mapSectionHeading(entry.hero),
      channelsHeading: entry.channelsHeading,
      safetyNote: entry.safetyNote,
      formHeading: entry.formHeading,
      mapConfig: entry.mapConfig,
    };
  } catch (err) {
    console.warn('[Strapi] contact-page single type not found yet, using local content fallback', err);
    return CONTACT_PAGE;
  }
}
