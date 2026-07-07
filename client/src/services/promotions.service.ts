import type { Promotion } from '@/types';
import type { StrapiCollectionResponse, StrapiEntryBase } from '@/types/strapi';
import { PROMOTIONS } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { unwrapCollection } from '@/lib/strapiMappers';

interface RawPromotion extends StrapiEntryBase {
  title: string;
  discountLabel?: string;
  discount?: string;
  description: string;
  expiryDate?: string | null;
  code: string;
}

function mapPromotionFromStrapi(raw: RawPromotion): Promotion {
  return {
    id: raw.documentId,
    title: raw.title,
    discount: raw.discountLabel ?? raw.discount ?? '',
    description: raw.description,
    expiryDate: raw.expiryDate ?? undefined,
    code: raw.code,
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
