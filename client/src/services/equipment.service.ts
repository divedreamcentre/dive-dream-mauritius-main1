import type { EquipmentPage } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { EQUIPMENT_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, normalizeStringArray, resolveStrapiMediaUrl, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `equipment-page` doesn't exist in Strapi yet (404) — falls back to
// local content until published.
interface RawEquipmentPage {
  hero: RawSectionHeading;
  safetySection: RawSectionHeading & { paragraphs?: unknown; badges?: unknown; image?: StrapiMedia | null };
  diverEquipmentSection: RawSectionHeading & { paragraph?: string; items?: unknown; image?: StrapiMedia | null };
  fleetSection: RawSectionHeading & { paragraph?: string; items?: unknown; image?: StrapiMedia | null };
}

export async function getEquipmentPage(): Promise<EquipmentPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawEquipmentPage>>(ENDPOINTS.equipmentPage);
    const entry = raw.data;
    return {
      hero: mapSectionHeading(entry.hero),
      safetySection: {
        ...mapSectionHeading(entry.safetySection),
        paragraphs: normalizeStringArray(entry.safetySection.paragraphs),
        badges: normalizeStringArray(entry.safetySection.badges),
        image: resolveStrapiMediaUrl(entry.safetySection.image),
      },
      diverEquipmentSection: {
        ...mapSectionHeading(entry.diverEquipmentSection),
        paragraph: entry.diverEquipmentSection.paragraph ?? '',
        items: normalizeStringArray(entry.diverEquipmentSection.items),
        image: resolveStrapiMediaUrl(entry.diverEquipmentSection.image),
      },
      fleetSection: {
        ...mapSectionHeading(entry.fleetSection),
        paragraph: entry.fleetSection.paragraph ?? '',
        items: normalizeStringArray(entry.fleetSection.items),
        image: resolveStrapiMediaUrl(entry.fleetSection.image),
      },
    };
  } catch (err) {
    console.warn('[Strapi] equipment-page single type not found yet, using local content fallback', err);
    return EQUIPMENT_PAGE;
  }
}
