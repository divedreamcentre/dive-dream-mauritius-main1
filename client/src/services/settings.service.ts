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
  languages?: WebsiteSettings['languages'];
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
      // These four fields are structural — if Strapi has the singleton but
      // an editor cleared one of these repeatable fields (or just never
      // filled it in), `?? []` used to render the nav/social icons/footer
      // as silently empty instead of falling back. Falling back to the
      // local default list keeps something reasonable on screen either way.
      socialLinks: entry.socialLinks ?? WEBSITE_SETTINGS.socialLinks,
      navLinks: entry.navLinks ?? WEBSITE_SETTINGS.navLinks,
      secondaryLinks: entry.secondaryLinks ?? WEBSITE_SETTINGS.secondaryLinks,
      utilityBadges: normalizeStringArray(entry.utilityBadges),
      languages: entry.languages ?? WEBSITE_SETTINGS.languages,
      footer: {
        description: entry.footer.description,
        badges: normalizeStringArray(entry.footer.badges),
        columns: entry.footer.columns ?? WEBSITE_SETTINGS.footer.columns,
        legalLinks: entry.footer.legalLinks ?? WEBSITE_SETTINGS.footer.legalLinks,
        copyrightText: entry.footer.copyrightText,
      },
    };
  } catch (err) {
    console.warn('[Strapi] website-settings single type not found yet, using local content fallback', err);
    return WEBSITE_SETTINGS;
  }
}
