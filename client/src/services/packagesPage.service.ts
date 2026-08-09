import type { PackagesPage } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { PACKAGES_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, resolveStrapiMediaUrl, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `packages-page` doesn't exist in Strapi yet (404) — falls back to
// local content until published. `hero`/`notice` fall back independently so
// an editor can fill in just `heroImage` without authoring the notice copy.
interface RawPackagesPage {
  hero?: RawSectionHeading | null;
  heroImage?: StrapiMedia | null;
  notice?: { title: string; description: string } | null;
}

export async function getPackagesPage(): Promise<PackagesPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawPackagesPage>>(ENDPOINTS.packagesPage);
    const entry = raw.data;
    return {
      hero: entry.hero ? mapSectionHeading(entry.hero) : PACKAGES_PAGE.hero,
      heroImage: resolveStrapiMediaUrl(entry.heroImage) || PACKAGES_PAGE.heroImage,
      notice: entry.notice ?? PACKAGES_PAGE.notice,
    };
  } catch (err) {
    console.warn('[Strapi] packages-page single type not found yet, using local content fallback', err);
    return PACKAGES_PAGE;
  }
}
