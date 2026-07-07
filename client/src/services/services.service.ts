import type { Service } from '@/types';
import type { StrapiCollectionResponse, StrapiEntryBase, StrapiMedia } from '@/types/strapi';
import { SERVICES } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { resolveStrapiMediaUrl, unwrapCollection } from '@/lib/strapiMappers';

interface RawService extends StrapiEntryBase {
  title: string;
  description: string;
  price?: { amount?: number; unitLabel?: string } | string;
  image: StrapiMedia | null;
}

function mapServiceFromStrapi(raw: RawService): Service {
  const price =
    typeof raw.price === 'string'
      ? raw.price
      : raw.price
        ? `$${raw.price.amount ?? ''} ${raw.price.unitLabel ?? ''}`.trim()
        : '';
  return {
    id: raw.documentId,
    title: raw.title,
    description: raw.description,
    price,
    image: resolveStrapiMediaUrl(raw.image),
  };
}

export async function getServices(): Promise<Service[]> {
  try {
    const raw = await fetchAPI<StrapiCollectionResponse<RawService>>(ENDPOINTS.services);
    return unwrapCollection(raw).map(mapServiceFromStrapi);
  } catch (err) {
    console.warn('[Strapi] services unavailable, using local content fallback', err);
    return SERVICES;
  }
}
