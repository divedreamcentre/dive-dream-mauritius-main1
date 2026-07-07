import type { Activity, DivingPage, FAQItem } from '@/types';
import type { StrapiSingleResponse } from '@/types/strapi';
import { DIVING_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, normalizeStringArray, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `diving-page` doesn't exist in Strapi yet (404) — falls back to
// local content until published.
interface RawActivity {
  id?: number;
  documentId?: string;
  title: string;
  icon?: string | null;
}

interface RawDivingPage {
  hero: RawSectionHeading;
  nitroxSection: RawSectionHeading & {
    points?: unknown;
    ctaLabel: string;
    highlightCard: { title: string; description: string; notes?: unknown };
  };
  rebreatherSection: RawSectionHeading & {
    whatIsIt: { title: string; description: string; benefits?: RawActivity[] };
    idealFor: { title: string; items?: RawActivity[] };
    enquiry: { description: string; ctaLabel: string };
  };
  nitroxFaqs?: FAQItem[];
}

function mapActivity(raw: RawActivity, index: number): Activity {
  return {
    id: raw.documentId ?? String(raw.id ?? index),
    title: raw.title,
    icon: raw.icon ?? undefined,
  };
}

export async function getDivingPage(): Promise<DivingPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawDivingPage>>(ENDPOINTS.divingPage);
    const entry = raw.data;
    return {
      hero: mapSectionHeading(entry.hero),
      nitroxSection: {
        ...mapSectionHeading(entry.nitroxSection),
        points: normalizeStringArray(entry.nitroxSection.points),
        ctaLabel: entry.nitroxSection.ctaLabel,
        highlightCard: {
          title: entry.nitroxSection.highlightCard.title,
          description: entry.nitroxSection.highlightCard.description,
          notes: normalizeStringArray(entry.nitroxSection.highlightCard.notes),
        },
      },
      rebreatherSection: {
        ...mapSectionHeading(entry.rebreatherSection),
        whatIsIt: {
          title: entry.rebreatherSection.whatIsIt.title,
          description: entry.rebreatherSection.whatIsIt.description,
          benefits: (entry.rebreatherSection.whatIsIt.benefits ?? []).map(mapActivity),
        },
        idealFor: {
          title: entry.rebreatherSection.idealFor.title,
          items: (entry.rebreatherSection.idealFor.items ?? []).map(mapActivity),
        },
        enquiry: entry.rebreatherSection.enquiry,
      },
      nitroxFaqs: entry.nitroxFaqs ?? [],
    };
  } catch (err) {
    console.warn('[Strapi] diving-page single type not found yet, using local content fallback', err);
    return DIVING_PAGE;
  }
}
