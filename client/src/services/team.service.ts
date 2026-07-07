import type { TeamMember } from '@/types';
import type { StrapiCollectionResponse, StrapiEntryBase, StrapiMedia } from '@/types/strapi';
import { TEAM_MEMBERS } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { normalizeStringArray, resolveStrapiMediaUrl, unwrapCollection } from '@/lib/strapiMappers';

interface RawTeamMember extends StrapiEntryBase {
  name: string;
  position: string;
  certifications?: unknown;
  experience: string;
  languages?: unknown;
  specializations?: unknown;
  biography: string;
  image: StrapiMedia | null;
}

function mapTeamMemberFromStrapi(raw: RawTeamMember): TeamMember {
  return {
    id: raw.documentId,
    name: raw.name,
    position: raw.position,
    certifications: normalizeStringArray(raw.certifications),
    experience: raw.experience,
    languages: normalizeStringArray(raw.languages),
    specializations: normalizeStringArray(raw.specializations),
    biography: raw.biography,
    image: resolveStrapiMediaUrl(raw.image),
  };
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const raw = await fetchAPI<StrapiCollectionResponse<RawTeamMember>>(ENDPOINTS.team);
    return unwrapCollection(raw).map(mapTeamMemberFromStrapi);
  } catch (err) {
    console.warn('[Strapi] team-members unavailable, using local content fallback', err);
    return TEAM_MEMBERS;
  }
}
