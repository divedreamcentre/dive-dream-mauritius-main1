import type { Promotion } from '@/types';
import type { StrapiCollectionResponse, StrapiEntryBase } from '@/types/strapi';
import { PROMOTIONS } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { normalizeStringArray, unwrapCollection } from '@/lib/strapiMappers';

interface RawPromotion extends StrapiEntryBase {
  title: string;
  discountLabel?: string;
  discount?: string;
  description: string;
  // Not yet configured in Strapi — see the CMS notes. Falls back to an
  // empty conditions list (card just shows no bullets) rather than
  // crashing, until the field is added.
  conditions?: unknown;
  expiryDate?: string | null;
  code: string;
  ctaHref?: string | null;
  ctaLabel?: string | null;
}

function mapPromotionFromStrapi(raw: RawPromotion): Promotion {
  return {
    id: raw.documentId,
    title: raw.title,
    discount: raw.discountLabel ?? raw.discount ?? '',
    description: raw.description,
    conditions: normalizeStringArray(raw.conditions),
    expiryDate: raw.expiryDate ?? undefined,
    code: raw.code,
    ctaHref: raw.ctaHref ?? undefined,
    ctaLabel: raw.ctaLabel ?? undefined,
  };
}

export async function getPromotions(): Promise<Promotion[]> {
  try {
    const raw = await fetchAPI<StrapiCollectionResponse<RawPromotion>>(ENDPOINTS.promotions);
    return unwrapCollection(raw).map(mapPromotionFromStrapi);
  } catch (err) {
    console.warn('[Strapi] promotions unavailable, using local content fallback', err);
    return PROMOTIONS;
  }
}

export async function getPromotionById(id: string): Promise<Promotion | undefined> {
  const promotions = await getPromotions();
  return promotions.find((promo) => promo.id === id);
}
