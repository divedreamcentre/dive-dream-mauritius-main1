import type { Price } from './common';

// Unified Course entity — covers both the compact "listing card" shape
// (Home/Courses pages) and the richer "detail page" shape (courses/*.tsx).
// Only `id`, `name`, `overview` are guaranteed; everything else is optional
// so lightweight list-only entries and fully detailed courses share one type.
export interface Course {
  id: string;
  name: string;
  overview: string;
  detailPath?: string;
  category?: 'Beginner' | 'Advanced' | 'Rescue' | 'Technical';
  agency?: 'SDI' | 'TDI';

  // Detail-page hero
  eyebrow?: string;
  heroDescription?: string;

  // Detail-page "overview" section (the two-column intro block)
  overviewSection?: { eyebrow: string; title: string; description: string };

  // Detail-page "highlight card" (e.g. "Internationally Recognized")
  highlightCard?: {
    title: string;
    text: string;
    icon?: string;
    notes?: string[];
  };

  // Prerequisites
  prerequisites?: string;
  prerequisitesList?: string[];
  prerequisitesSection?: { eyebrow: string; heading: string };

  // Booking / listing metadata
  duration?: string;
  certificationAwarded?: string;
  includedMaterials?: string[];
  price?: Price;
  schedule?: string;

  // Curriculum
  learningPoints?: string[];
  learningPointsSection?: { eyebrow: string; heading: string };
  requiredDives?: string[];
  optionalDives?: string[];
  courseStructureSection?: { eyebrow: string; heading: string };
  courseStructureNote?: string;

  // Detail-page CTA section
  ctaHeading?: string;
  ctaDescription?: string;
}
