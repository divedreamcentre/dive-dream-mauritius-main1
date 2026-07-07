import type { GalleryImage } from '@/types';
import type { StrapiCollectionResponse, StrapiEntryBase, StrapiMedia } from '@/types/strapi';
import { GALLERY_IMAGES } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { resolveStrapiMediaUrl, unwrapCollection } from '@/lib/strapiMappers';

interface RawGalleryImage extends StrapiEntryBase {
  alt: string | null;
  isFeatured: boolean;
  image: StrapiMedia | null;
}

function mapGalleryImageFromStrapi(raw: RawGalleryImage): GalleryImage {
  return {
    id: raw.documentId,
    url: resolveStrapiMediaUrl(raw.image),
    alt: raw.alt ?? raw.image?.alternativeText ?? '',
  };
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const raw = await fetchAPI<StrapiCollectionResponse<RawGalleryImage>>(ENDPOINTS.gallery);
    return unwrapCollection(raw).map(mapGalleryImageFromStrapi);
  } catch (err) {
    console.warn('[Strapi] gallery-images unavailable, using local content fallback', err);
    return GALLERY_IMAGES;
  }
}
