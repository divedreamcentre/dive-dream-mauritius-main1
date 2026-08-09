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
  hero?: RawSectionHeading | null;
  heroImage?: StrapiMedia | null;
  mission?: (RawSectionHeading & { points?: unknown; image?: StrapiMedia | null }) | null;
  conservation?: (RawSectionHeading & { initiatives?: RawActivity[]; image?: StrapiMedia | null }) | null;
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

// Each section below falls back to the matching local section as a whole
// (rather than the whole page bailing to ABOUT_PAGE) so an editor can fill
// in just e.g. `heroImage` in Strapi without also having to author mission
// and conservation copy for the page to keep rendering real content.
export async function getAboutPage(): Promise<AboutPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawAboutPage>>(ENDPOINTS.aboutPage);
    const entry = unwrapSingle(raw);
    return {
      hero: entry.hero ? mapSectionHeading(entry.hero) : ABOUT_PAGE.hero,
      heroImage: resolveStrapiMediaUrl(entry.heroImage) || ABOUT_PAGE.heroImage,
      mission: entry.mission
        ? {
            ...mapSectionHeading(entry.mission),
            points: Array.isArray(entry.mission.points) ? (entry.mission.points as string[]) : ABOUT_PAGE.mission.points,
            image: resolveStrapiMediaUrl(entry.mission.image) || ABOUT_PAGE.mission.image,
          }
        : ABOUT_PAGE.mission,
      conservation: entry.conservation
        ? {
            ...mapSectionHeading(entry.conservation),
            initiatives: entry.conservation.initiatives?.length
              ? entry.conservation.initiatives.map(mapActivity)
              : ABOUT_PAGE.conservation.initiatives,
            image: resolveStrapiMediaUrl(entry.conservation.image) || ABOUT_PAGE.conservation.image,
          }
        : ABOUT_PAGE.conservation,
    };
  } catch (err) {
    console.warn('[Strapi] about-page single type not found yet, using local content fallback', err);
    return ABOUT_PAGE;
  }
}
