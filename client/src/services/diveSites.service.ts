import type { DiveSite } from '@/types';
import type { StrapiCollectionResponse, StrapiEntryBase, StrapiMedia } from '@/types/strapi';
import { DIVE_SITES } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { normalizeStringArray, resolveStrapiMediaUrl, unwrapCollection } from '@/lib/strapiMappers';

interface RawDiveSite extends StrapiEntryBase {
  name: string;
  tagline: string | null;
  description: string;
  location: string;
  maxDepth: string;
  certificationLevel: DiveSite['certificationLevel'];
  type: unknown;
  marineLife: unknown;
  highlights: unknown;
  visibility: string;
  waterTemp: string;
  bestSeason: string;
  weatherConditions: string;
  image: StrapiMedia | null;
}

function mapDiveSiteFromStrapi(raw: RawDiveSite): DiveSite {
  return {
    id: raw.documentId,
    name: raw.name,
    tagline: raw.tagline ?? undefined,
    description: raw.description,
    location: raw.location,
    maxDepth: raw.maxDepth,
    certificationLevel: raw.certificationLevel,
    type: normalizeStringArray(raw.type) as DiveSite['type'],
    marineLife: normalizeStringArray(raw.marineLife),
    highlights: normalizeStringArray(raw.highlights),
    visibility: raw.visibility,
    waterTemp: raw.waterTemp,
    bestSeason: raw.bestSeason,
    weatherConditions: raw.weatherConditions,
    image: resolveStrapiMediaUrl(raw.image),
  };
}

export async function getDiveSites(): Promise<DiveSite[]> {
  try {
    const raw = await fetchAPI<StrapiCollectionResponse<RawDiveSite>>(ENDPOINTS.diveSites);
    return unwrapCollection(raw).map(mapDiveSiteFromStrapi);
  } catch (err) {
    console.warn('[Strapi] dive-sites unavailable, using local content fallback', err);
    return DIVE_SITES;
  }
}

export async function getDiveSiteById(id: string): Promise<DiveSite | undefined> {
  const sites = await getDiveSites();
  return sites.find((site) => site.id === id);
}
