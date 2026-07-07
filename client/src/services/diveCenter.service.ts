import type { Activity, DiveCenterPage } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { DIVE_CENTER_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, resolveStrapiMediaUrl, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `dive-center-page` doesn't exist in Strapi yet (404) — falls back
// to local content until published.
interface RawActivity {
  id?: number;
  documentId?: string;
  title: string;
  description?: string | null;
  image?: StrapiMedia | null;
}

interface RawDiveCenterPage {
  hero: RawSectionHeading;
  tourSection: RawSectionHeading;
  facilityAreas?: RawActivity[];
  locationSection: RawSectionHeading & { address?: string; parkingNote?: string };
  mapEmbedUrl: string;
}

function mapActivity(raw: RawActivity, index: number): Activity {
  return {
    id: raw.documentId ?? String(raw.id ?? index),
    title: raw.title,
    description: raw.description ?? undefined,
    image: raw.image ? resolveStrapiMediaUrl(raw.image) : undefined,
  };
}

export async function getDiveCenterPage(): Promise<DiveCenterPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawDiveCenterPage>>(ENDPOINTS.diveCenterPage);
    const entry = raw.data;
    return {
      hero: mapSectionHeading(entry.hero),
      tourSection: mapSectionHeading(entry.tourSection),
      facilityAreas: (entry.facilityAreas ?? []).map(mapActivity),
      locationSection: {
        ...mapSectionHeading(entry.locationSection),
        address: entry.locationSection.address ?? '',
        parkingNote: entry.locationSection.parkingNote ?? '',
      },
      mapEmbedUrl: entry.mapEmbedUrl,
    };
  } catch (err) {
    console.warn('[Strapi] dive-center-page single type not found yet, using local content fallback', err);
    return DIVE_CENTER_PAGE;
  }
}
