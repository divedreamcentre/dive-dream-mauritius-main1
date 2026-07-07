import type { Activity, Homepage } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { HOMEPAGE, HOME_HERO_BACKGROUNDS } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, resolveStrapiMediaUrl, type RawSectionHeading } from '@/lib/strapiMappers';

// NOTE: `homepage` doesn't exist in Strapi yet (404) — always falls back to
// local content today. This is the richest single type in the model; once
// it's published in Strapi, spot-check this mapper carefully (fields here
// mirror the original CMS content-model prompt but are unverified against
// real data).
interface RawActivity {
  id?: number;
  documentId?: string;
  title: string;
  description?: string | null;
  icon?: string | null;
}

interface RawHomepage {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryCta: Homepage['hero']['primaryCta'];
    secondaryCta: Homepage['hero']['secondaryCta'];
    trustBadge: Homepage['hero']['trustBadge'];
  };
  heroSlides?: { image: StrapiMedia | null; title: string; subtitle: string }[];
  trustStats?: RawActivity[];
  promotionBanner: Homepage['promotionBanner'];
  featuredDiveSites: Homepage['featuredDiveSites'];
  quickFeatures?: RawActivity[];
  packagesSection: RawSectionHeading & { ctaLabel: string };
  coursesSection: RawSectionHeading & Omit<Homepage['coursesSection'], keyof RawSectionHeading>;
  promotionsSection: RawSectionHeading & { ctaLabel: string };
  servicesSection: RawSectionHeading & { ctaLabel: string };
  testimonialsSection: RawSectionHeading;
  gallerySection: RawSectionHeading;
  languagesSection: RawSectionHeading & { languages: Homepage['languagesSection']['languages'] };
  contactSection: Homepage['contactSection'];
}

function mapActivity(raw: RawActivity, index: number): Activity {
  return {
    id: raw.documentId ?? String(raw.id ?? index),
    title: raw.title,
    description: raw.description ?? undefined,
    icon: raw.icon ?? undefined,
  };
}

export async function getHomepage(): Promise<Homepage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawHomepage>>(ENDPOINTS.homepage);
    const entry = raw.data;
    return {
      hero: entry.hero,
      heroSlides: (entry.heroSlides ?? []).map((slide) => ({
        image: resolveStrapiMediaUrl(slide.image),
        title: slide.title,
        subtitle: slide.subtitle,
      })),
      trustStats: (entry.trustStats ?? []).map(mapActivity),
      promotionBanner: entry.promotionBanner,
      featuredDiveSites: entry.featuredDiveSites,
      quickFeatures: (entry.quickFeatures ?? []).map(mapActivity),
      packagesSection: { ...mapSectionHeading(entry.packagesSection), ctaLabel: entry.packagesSection.ctaLabel },
      coursesSection: {
        ...mapSectionHeading(entry.coursesSection),
        coreCoursesLabel: entry.coursesSection.coreCoursesLabel,
        specialtyCoursesLabel: entry.coursesSection.specialtyCoursesLabel,
        coreCourses: entry.coursesSection.coreCourses,
        specialtyNames: entry.coursesSection.specialtyNames,
        ctaLabel: entry.coursesSection.ctaLabel,
      },
      promotionsSection: { ...mapSectionHeading(entry.promotionsSection), ctaLabel: entry.promotionsSection.ctaLabel },
      servicesSection: { ...mapSectionHeading(entry.servicesSection), ctaLabel: entry.servicesSection.ctaLabel },
      testimonialsSection: mapSectionHeading(entry.testimonialsSection),
      gallerySection: mapSectionHeading(entry.gallerySection),
      languagesSection: { ...mapSectionHeading(entry.languagesSection), languages: entry.languagesSection.languages },
      contactSection: entry.contactSection,
    };
  } catch (err) {
    console.warn('[Strapi] homepage single type not found yet, using local content fallback', err);
    return HOMEPAGE;
  }
}

export async function getHomeHeroBackgrounds(): Promise<string[]> {
  // Home.tsx's rotating background slideshow images aren't part of the
  // `homepage` single type's authored content — they're the same as the
  // heroSlides carousel photos below. Kept as local assets for now.
  return HOME_HERO_BACKGROUNDS;
}
