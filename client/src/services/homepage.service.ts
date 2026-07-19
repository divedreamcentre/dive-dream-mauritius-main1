import type { Activity, Homepage } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { HOMEPAGE, HOME_HERO_BACKGROUNDS } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { resolveStrapiMediaUrl } from '@/lib/strapiMappers';

// The homepage single type is only partially configured in Strapi right
// now — several nested components (hero.primaryCta/secondaryCta/trustBadge,
// promotionBanner.countdown, coursesSection.coreCourses/specialtyNames,
// languagesSection.languages) aren't filled in yet, and Strapi omits a
// component's key entirely rather than sending it as null when it's empty.
// Every section below is merged as `{ ...HOMEPAGE.section, ...entry.section }`
// so any field Strapi hasn't configured yet quietly inherits the rich local
// default instead of crashing (`.href`/`.map()` on undefined), while any
// field that *is* filled in on the CMS takes precedence automatically.
interface RawActivity {
  id?: number;
  documentId?: string;
  title: string;
  description?: string | null;
  icon?: string | null;
}

interface RawHomepage {
  hero?: Partial<Homepage['hero']>;
  heroBackgrounds?: StrapiMedia[] | null;
  heroSlides?: { image: StrapiMedia | null; title: string; subtitle: string; href?: string | null }[];
  trustStats?: RawActivity[];
  promotionBanner?: Partial<Homepage['promotionBanner']>;
  featuredDiveSites?: Partial<Homepage['featuredDiveSites']>;
  quickFeatures?: RawActivity[];
  packagesSection?: Partial<Homepage['packagesSection']>;
  coursesSection?: Partial<Homepage['coursesSection']>;
  promotionsSection?: Partial<Homepage['promotionsSection']>;
  servicesSection?: Partial<Homepage['servicesSection']>;
  testimonialsSection?: Partial<Homepage['testimonialsSection']>;
  gallerySection?: Partial<Homepage['gallerySection']>;
  languagesSection?: Partial<Homepage['languagesSection']>;
  contactSection?: Partial<Homepage['contactSection']>;
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
      hero: { ...HOMEPAGE.hero, ...entry.hero },
      heroSlides: entry.heroSlides?.length
        ? entry.heroSlides.map((slide, index) => ({
            image: resolveStrapiMediaUrl(slide.image) || HOMEPAGE.heroSlides[0]?.image,
            title: slide.title,
            subtitle: slide.subtitle,
            href: slide.href ?? HOMEPAGE.heroSlides[index]?.href,
          }))
        : HOMEPAGE.heroSlides,
      trustStats: entry.trustStats?.length ? entry.trustStats.map(mapActivity) : HOMEPAGE.trustStats,
      promotionBanner: { ...HOMEPAGE.promotionBanner, ...entry.promotionBanner },
      featuredDiveSites: { ...HOMEPAGE.featuredDiveSites, ...entry.featuredDiveSites },
      quickFeatures: entry.quickFeatures?.length ? entry.quickFeatures.map(mapActivity) : HOMEPAGE.quickFeatures,
      packagesSection: { ...HOMEPAGE.packagesSection, ...entry.packagesSection },
      coursesSection: { ...HOMEPAGE.coursesSection, ...entry.coursesSection },
      promotionsSection: { ...HOMEPAGE.promotionsSection, ...entry.promotionsSection },
      servicesSection: { ...HOMEPAGE.servicesSection, ...entry.servicesSection },
      testimonialsSection: { ...HOMEPAGE.testimonialsSection, ...entry.testimonialsSection },
      gallerySection: { ...HOMEPAGE.gallerySection, ...entry.gallerySection },
      languagesSection: { ...HOMEPAGE.languagesSection, ...entry.languagesSection },
      contactSection: { ...HOMEPAGE.contactSection, ...entry.contactSection },
    };
  } catch (err) {
    console.warn('[Strapi] homepage single type not found yet, using local content fallback', err);
    return HOMEPAGE;
  }
}

export async function getHomeHeroBackgrounds(): Promise<string[]> {
  // Home.tsx's rotating full-bleed background slideshow reads from the
  // `homepage` single type's `heroBackgrounds` media (multiple) field in
  // Strapi. Falls back to the local bundled images if that field is empty
  // or the single type isn't reachable yet.
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawHomepage>>(ENDPOINTS.homepage);
    const media = raw.data.heroBackgrounds ?? [];
    const urls = media.map((item) => resolveStrapiMediaUrl(item)).filter(Boolean);
    return urls.length ? urls : HOME_HERO_BACKGROUNDS;
  } catch (err) {
    console.warn('[Strapi] homepage heroBackgrounds unavailable, using local content fallback', err);
    return HOME_HERO_BACKGROUNDS;
  }
}
