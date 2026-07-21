import type { AboutPage, Activity } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { ABOUT_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, resolveStrapiMediaUrl, unwrapSingle, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: the `about-page` single type doesn't exist in Strapi yet (verified
// live — every naming variant returned 404), so this always falls back to
// local content today. Wiring + mapper are in place so it activates
// automatically the moment the single type is published — see the
// BoatPage service for the same pattern repeated across every
// not-yet-built single type.
interface RawActivity {
  id?: number;
  documentId?: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  image?: StrapiMedia | null;
}

interface RawAboutPage {
  hero: RawSectionHeading;
  mission: RawSectionHeading & { points?: unknown; image?: StrapiMedia | null };
  conservation: RawSectionHeading & { initiatives?: RawActivity[]; image?: StrapiMedia | null };
}

function mapActivity(raw: RawActivity, index: number): Activity {
  return {
    id: raw.documentId ?? String(raw.id ?? index),
    title: raw.title,
    description: raw.description ?? undefined,
    icon: raw.icon ?? undefined,
    image: raw.image ? resolveStrapiMediaUrl(raw.image) : undefined,
  };
}

export async function getAboutPage(): Promise<AboutPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawAboutPage>>(ENDPOINTS.aboutPage);
    const entry = unwrapSingle(raw);
    return {
      hero: mapSectionHeading(entry.hero),
      mission: {
        ...mapSectionHeading(entry.mission),
        points: Array.isArray(entry.mission.points) ? (entry.mission.points as string[]) : [],
        image: resolveStrapiMediaUrl(entry.mission.image),
      },
      conservation: {
        ...mapSectionHeading(entry.conservation),
        initiatives: (entry.conservation.initiatives ?? []).map(mapActivity),
        image: resolveStrapiMediaUrl(entry.conservation.image),
      },
    };
  } catch (err) {
    console.warn('[Strapi] about-page single type not found yet, using local content fallback', err);
    return ABOUT_PAGE;
  }
}
