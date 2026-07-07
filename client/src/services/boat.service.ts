import type { Activity, BoatPage } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { BOAT_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, normalizeStringArray, resolveStrapiMediaUrl, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `boat-page` doesn't exist in Strapi yet (404), and neither does a
// generalized `boat-trips` collection (also 404) — falls back to local
// content until one of those is published.
interface RawFeatureCard {
  id?: number;
  documentId?: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  items?: unknown;
}

interface RawBoatPage {
  hero: RawSectionHeading;
  vesselImage: StrapiMedia | null;
  specsSection: RawSectionHeading & { description?: string; specs?: { label: string; value: string }[] };
  featureCards?: RawFeatureCard[];
}

function mapFeatureCard(raw: RawFeatureCard, index: number): Activity & { items: string[] } {
  return {
    id: raw.documentId ?? String(raw.id ?? index),
    title: raw.title,
    description: raw.description ?? undefined,
    icon: raw.icon ?? undefined,
    items: normalizeStringArray(raw.items),
  };
}

export async function getBoatPage(): Promise<BoatPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawBoatPage>>(ENDPOINTS.boatPage);
    const entry = raw.data;
    return {
      hero: mapSectionHeading(entry.hero),
      vesselImage: resolveStrapiMediaUrl(entry.vesselImage),
      specsSection: {
        ...mapSectionHeading(entry.specsSection),
        description: entry.specsSection.description ?? '',
        specs: entry.specsSection.specs ?? [],
      },
      featureCards: (entry.featureCards ?? []).map(mapFeatureCard),
    };
  } catch (err) {
    console.warn('[Strapi] boat-page single type not found yet, using local content fallback', err);
    return BOAT_PAGE;
  }
}
