import type { DivePackage } from '@/types';
import type { StrapiCollectionResponse, StrapiEntryBase } from '@/types/strapi';
import { DIVE_PACKAGES } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { unwrapCollection } from '@/lib/strapiMappers';

interface RawDivePackage extends StrapiEntryBase {
  name: string;
  price?: { amount?: number } | number;
  divesCount: number;
  equipmentIncluded: boolean;
  nitroxOption: boolean;
  privateGuideOption: boolean;
  duration: string;
  isBestValue?: boolean;
}

function mapDivePackageFromStrapi(raw: RawDivePackage): DivePackage {
  const price = typeof raw.price === 'number' ? raw.price : raw.price?.amount ?? 0;
  return {
    id: raw.documentId,
    name: raw.name,
    price,
    divesCount: raw.divesCount,
    equipmentIncluded: raw.equipmentIncluded,
    nitroxOption: raw.nitroxOption,
    privateGuideOption: raw.privateGuideOption,
    duration: raw.duration,
    isBestValue: raw.isBestValue ?? undefined,
  };
}

export async function getPackages(): Promise<DivePackage[]> {
  try {
    const raw = await fetchAPI<StrapiCollectionResponse<RawDivePackage>>(ENDPOINTS.packages);
    return unwrapCollection(raw).map(mapDivePackageFromStrapi);
  } catch (err) {
    console.warn('[Strapi] dive-packages unavailable, using local content fallback', err);
    return DIVE_PACKAGES;
  }
}
