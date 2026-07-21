import type { Activity, RebreatherDivingPage } from '@/types';
import { REBREATHER_DIVING_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, normalizeStringArray, type RawSectionHeading } from '@/lib/strapiMappers';
import type { StrapiSingleResponse } from '@/types/strapi';

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
  hero: RawSectionHeading;
  whatIsItSection: RawSectionHeading & { points?: unknown };
  whoIsItForSection: RawSectionHeading & { prerequisites?: unknown };
  offeringsSection: RawSectionHeading & { offerings?: RawActivity[] };
  ctaSection: { heading: string; description: string; ctaLabel: string };
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
      hero: mapSectionHeading(entry.hero),
      whatIsItSection: {
        ...mapSectionHeading(entry.whatIsItSection),
        points: normalizeStringArray(entry.whatIsItSection.points),
      },
      whoIsItForSection: {
        ...mapSectionHeading(entry.whoIsItForSection),
        prerequisites: normalizeStringArray(entry.whoIsItForSection.prerequisites),
      },
      offeringsSection: {
        ...mapSectionHeading(entry.offeringsSection),
        offerings: (entry.offeringsSection.offerings ?? []).map(mapActivity),
      },
      ctaSection: entry.ctaSection,
    };
  } catch (err) {
    console.warn('[Strapi] rebreather-diving-page single type not found yet, using local content fallback', err);
    return REBREATHER_DIVING_PAGE;
  }
}
