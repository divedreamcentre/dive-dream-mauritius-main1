import type { Service } from '@/types';
import type { StrapiCollectionResponse, StrapiEntryBase, StrapiMedia } from '@/types/strapi';
import { SERVICES } from '@/content';
import { shared } from '@/content/media';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { extractPlainText, resolveStrapiMediaUrl, unwrapCollection } from '@/lib/strapiMappers';

interface RawService extends StrapiEntryBase {
  title: string;
  // May come back as a plain string or, if Strapi has this field configured
  // as Rich Text (Blocks), a JSON array of block nodes — see extractPlainText().
  description: unknown;
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
    description: extractPlainText(raw.description),
    price,
    image: resolveStrapiMediaUrl(raw.image) || shared.heroUnderwater,
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
