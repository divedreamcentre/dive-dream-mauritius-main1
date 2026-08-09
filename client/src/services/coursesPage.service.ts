import type { CoursesPage } from '@/types';
import type { StrapiMedia, StrapiSingleResponse } from '@/types/strapi';
import { COURSES_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, normalizeStringArray, resolveStrapiMediaUrl, type RawSectionHeading } from '@/lib/strapiMappers';
import { mapCourseFromStrapi, type RawCourse } from './courses.service';

// NOTE: `courses-page` doesn't exist in Strapi yet (404) — falls back to
// local content until published. Every field below is optional and falls
// back independently to the matching COURSES_PAGE section so an editor can
// fill in just `hero`/`heroImage` without authoring the rest of the page.
interface RawCoursesPage {
  hero?: RawSectionHeading | null;
  heroImage?: StrapiMedia | null;
  languagesSection?: (RawSectionHeading & { languages?: unknown }) | null;
  coreCoursesHeading?: string | null;
  coreCourses?: RawCourse[];
  specialtyCoursesHeading?: string | null;
  specialtyCourses?: RawCourse[];
  additionalCoursesHeading?: string | null;
  additionalCourses?: RawCourse[];
  specialtyDivesHeading?: string | null;
  specialtyDives?: { name: string; icon: string }[];
  ctaSection?: CoursesPage['ctaSection'] | null;
}

export async function getCoursesPage(): Promise<CoursesPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawCoursesPage>>(ENDPOINTS.coursesPage);
    const entry = raw.data;
    return {
      hero: entry.hero ? mapSectionHeading(entry.hero) : COURSES_PAGE.hero,
      heroImage: resolveStrapiMediaUrl(entry.heroImage) || COURSES_PAGE.heroImage,
      languagesSection: entry.languagesSection
        ? {
            ...mapSectionHeading(entry.languagesSection),
            languages: normalizeStringArray(entry.languagesSection.languages),
          }
        : COURSES_PAGE.languagesSection,
      coreCoursesHeading: entry.coreCoursesHeading ?? COURSES_PAGE.coreCoursesHeading,
      coreCourses: entry.coreCourses?.length ? entry.coreCourses.map(mapCourseFromStrapi) : COURSES_PAGE.coreCourses,
      specialtyCoursesHeading: entry.specialtyCoursesHeading ?? COURSES_PAGE.specialtyCoursesHeading,
      specialtyCourses: entry.specialtyCourses?.length ? entry.specialtyCourses.map(mapCourseFromStrapi) : COURSES_PAGE.specialtyCourses,
      additionalCoursesHeading: entry.additionalCoursesHeading ?? COURSES_PAGE.additionalCoursesHeading,
      additionalCourses: entry.additionalCourses?.length ? entry.additionalCourses.map(mapCourseFromStrapi) : COURSES_PAGE.additionalCourses,
      specialtyDivesHeading: entry.specialtyDivesHeading ?? COURSES_PAGE.specialtyDivesHeading,
      specialtyDives: entry.specialtyDives?.length ? entry.specialtyDives : COURSES_PAGE.specialtyDives,
      ctaSection: entry.ctaSection ?? COURSES_PAGE.ctaSection,
    };
  } catch (err) {
    console.warn('[Strapi] courses-page single type not found yet, using local content fallback', err);
    return COURSES_PAGE;
  }
}
