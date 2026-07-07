import type { PackagesPage } from '@/types';
import type { StrapiSingleResponse } from '@/types/strapi';
import { PACKAGES_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `packages-page` doesn't exist in Strapi yet (404) — falls back to
// local content until published.
interface RawPackagesPage {
  hero: RawSectionHeading;
  notice: { title: string; description: string };
}

export async function getPackagesPage(): Promise<PackagesPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawPackagesPage>>(ENDPOINTS.packagesPage);
    const entry = raw.data;
    return { hero: mapSectionHeading(entry.hero), notice: entry.notice };
  } catch (err) {
    console.warn('[Strapi] packages-page single type not found yet, using local content fallback', err);
    return PACKAGES_PAGE;
  }
}
