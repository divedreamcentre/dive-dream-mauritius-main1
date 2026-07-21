import type { DiveSafari } from '@/types';
import type { StrapiCollectionResponse, StrapiEntryBase, StrapiMedia } from '@/types/strapi';
import { DIVE_SAFARIS } from '@/content';
import { shared } from '@/content/media';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { extractPlainText, normalizeStringArray, resolveStrapiMediaUrl, unwrapCollection } from '@/lib/strapiMappers';

interface RawDiveSafari extends StrapiEntryBase {
  name: string;
  tagline: string | null;
  // Strapi has this configured as Rich Text (Blocks), which returns a JSON
  // array of block nodes, not a plain string — see extractPlainText().
  description: unknown;
  location: string | null;
  maxDepth: string | null;
  certificationLevel: DiveSafari['certificationLevel'] | null;
  type: unknown;
  marineLife: unknown;
  highlights: unknown;
  visibility: string | null;
  waterTemp: string | null;
  bestSeason: string | null;
  weatherConditions: string | null;
  image: StrapiMedia | null;
}

function mapDiveSafariFromStrapi(raw: RawDiveSafari): DiveSafari {
  return {
    id: raw.documentId,
    name: raw.name,
    tagline: raw.tagline ?? undefined,
    description: extractPlainText(raw.description),
    location: raw.location ?? '',
    maxDepth: raw.maxDepth ?? '',
    certificationLevel: raw.certificationLevel ?? undefined,
    type: normalizeStringArray(raw.type) as DiveSafari['type'],
    marineLife: normalizeStringArray(raw.marineLife),
    highlights: normalizeStringArray(raw.highlights),
    visibility: raw.visibility ?? '',
    waterTemp: raw.waterTemp ?? '',
    bestSeason: raw.bestSeason ?? '',
    weatherConditions: raw.weatherConditions ?? '',
    image: resolveStrapiMediaUrl(raw.image) || shared.heroUnderwater,
  };
}

export async function getDiveSafaris(): Promise<DiveSafari[]> {
  try {
    // NOTE: still points at Strapi's existing `/api/dive-sites` collection —
    // deliberately not renamed here, since that would 404 against the live
    // CMS unless the Strapi content-type is renamed too. See the CMS notes
    // for the coordinated rename.
    const raw = await fetchAPI<StrapiCollectionResponse<RawDiveSafari>>(ENDPOINTS.diveSafaris);
    return unwrapCollection(raw).map(mapDiveSafariFromStrapi);
  } catch (err) {
    console.warn('[Strapi] dive-sites unavailable, using local content fallback', err);
    return DIVE_SAFARIS;
  }
}

export async function getDiveSafariById(id: string): Promise<DiveSafari | undefined> {
  const safaris = await getDiveSafaris();
  return safaris.find((safari) => safari.id === id);
}
