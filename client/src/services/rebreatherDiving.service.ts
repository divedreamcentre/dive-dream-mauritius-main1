import type { Activity, RebreatherDivingPage } from '@/types';
import { REBREATHER_DIVING_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, normalizeStringArray, resolveStrapiMediaUrl, type RawSectionHeading } from '@/lib/strapiMappers';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';

// NOTE: `rebreather-diving-page` doesn't exist in Strapi yet — this is a
// brand-new page (see content/rebreatherDiving.ts) — so this always falls
// back to local content until the single type is published.
interface RawActivity {
  id?: number;
  documentId?: string;
  title: string;
  description?: string | null;
  icon?: string | null;
}

interface RawRebreatherDivingPage {
  hero?: RawSectionHeading | null;
  heroImage?: StrapiMedia | null;
  whatIsItSection?: (RawSectionHeading & { points?: unknown }) | null;
  whoIsItForSection?: (RawSectionHeading & { prerequisites?: unknown }) | null;
  offeringsSection?: (RawSectionHeading & { offerings?: RawActivity[] }) | null;
  ctaSection?: { heading: string; description: string; ctaLabel: string } | null;
}

function mapActivity(raw: RawActivity, index: number): Activity {
  return {
    id: raw.documentId ?? String(raw.id ?? index),
    title: raw.title,
    description: raw.description ?? undefined,
    icon: raw.icon ?? undefined,
  };
}

export async function getRebreatherDivingPage(): Promise<RebreatherDivingPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawRebreatherDivingPage>>(ENDPOINTS.rebreatherDivingPage);
    const entry = raw.data;
    return {
      hero: entry.hero ? mapSectionHeading(entry.hero) : REBREATHER_DIVING_PAGE.hero,
      heroImage: resolveStrapiMediaUrl(entry.heroImage) || REBREATHER_DIVING_PAGE.heroImage,
      whatIsItSection: entry.whatIsItSection
        ? {
            ...mapSectionHeading(entry.whatIsItSection),
            points: normalizeStringArray(entry.whatIsItSection.points),
          }
        : REBREATHER_DIVING_PAGE.whatIsItSection,
      whoIsItForSection: entry.whoIsItForSection
        ? {
            ...mapSectionHeading(entry.whoIsItForSection),
            prerequisites: normalizeStringArray(entry.whoIsItForSection.prerequisites),
          }
        : REBREATHER_DIVING_PAGE.whoIsItForSection,
      offeringsSection: entry.offeringsSection
        ? {
            ...mapSectionHeading(entry.offeringsSection),
            offerings: entry.offeringsSection.offerings?.length ? entry.offeringsSection.offerings.map(mapActivity) : REBREATHER_DIVING_PAGE.offeringsSection.offerings,
          }
        : REBREATHER_DIVING_PAGE.offeringsSection,
      ctaSection: entry.ctaSection ?? REBREATHER_DIVING_PAGE.ctaSection,
    };
  } catch (err) {
    console.warn('[Strapi] rebreather-diving-page single type not found yet, using local content fallback', err);
    return REBREATHER_DIVING_PAGE;
  }
}
