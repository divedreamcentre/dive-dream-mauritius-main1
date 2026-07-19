import type { NavLink, SocialLink, WebsiteSettings } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { WEBSITE_SETTINGS } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { normalizeStringArray, resolveStrapiMediaUrl } from '@/lib/strapiMappers';

// This powers Layout.tsx (nav, footer, contact info) on every page, so the
// fallback here matters more than most: if this single type is ever
// half-broken in Strapi (reachable but missing a field), prefer letting it
// throw and fall back wholesale rather than rendering a Layout with holes
// in it.
interface RawWebsiteSettings {
  siteName: string;
  tagline: string;
  logo: StrapiMedia | null;
  contact: WebsiteSettings['contact'];
  socialLinks?: SocialLink[];
  navLinks?: NavLink[];
  secondaryLinks?: NavLink[];
  utilityBadges?: unknown;
  footer: {
    description: string;
    badges?: unknown;
    columns?: { title: string; links: NavLink[] }[];
    legalLinks?: NavLink[];
    copyrightText: string;
  };
}

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawWebsiteSettings>>(ENDPOINTS.websiteSettings);
    const entry = raw.data;
    return {
      siteName: entry.siteName,
      tagline: entry.tagline,
      logo: resolveStrapiMediaUrl(entry.logo) || WEBSITE_SETTINGS.logo,
      contact: { ...WEBSITE_SETTINGS.contact, ...entry.contact },
      socialLinks: entry.socialLinks ?? [],
      navLinks: entry.navLinks ?? [],
      secondaryLinks: entry.secondaryLinks ?? [],
      utilityBadges: normalizeStringArray(entry.utilityBadges),
      footer: {
        description: entry.footer.description,
        badges: normalizeStringArray(entry.footer.badges),
        columns: entry.footer.columns ?? [],
        legalLinks: entry.footer.legalLinks ?? [],
        copyrightText: entry.footer.copyrightText,
      },
    };
  } catch (err) {
    console.warn('[Strapi] website-settings single type not found yet, using local content fallback', err);
    return WEBSITE_SETTINGS;
  }
}
