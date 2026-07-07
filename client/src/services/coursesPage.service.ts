import type { CoursesPage } from '@/types';
import type { StrapiSingleResponse } from '@/types/strapi';
import { COURSES_PAGE } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { mapSectionHeading, normalizeStringArray, type RawSectionHeading } from '@/lib/strapiMappers';
import { mapCourseFromStrapi, type RawCourse } from './courses.service';

// NOTE: `courses-page` doesn't exist in Strapi yet (404) — falls back to
// local content until published.
interface RawCoursesPage {
  hero: RawSectionHeading;
  languagesSection: RawSectionHeading & { languages?: unknown };
  coreCoursesHeading: string;
  coreCourses?: RawCourse[];
  specialtyCoursesHeading: string;
  specialtyCourses?: RawCourse[];
  additionalCoursesHeading: string;
  additionalCourses?: RawCourse[];
  specialtyDivesHeading: string;
  specialtyDives?: { name: string; icon: string }[];
  ctaSection: CoursesPage['ctaSection'];
}

export async function getCoursesPage(): Promise<CoursesPage> {
  try {
    const raw = await fetchAPI<StrapiSingleResponse<RawCoursesPage>>(ENDPOINTS.coursesPage);
    const entry = raw.data;
    return {
      hero: mapSectionHeading(entry.hero),
      languagesSection: {
        ...mapSectionHeading(entry.languagesSection),
        languages: normalizeStringArray(entry.languagesSection.languages),
      },
      coreCoursesHeading: entry.coreCoursesHeading,
      coreCourses: (entry.coreCourses ?? []).map(mapCourseFromStrapi),
      specialtyCoursesHeading: entry.specialtyCoursesHeading,
      specialtyCourses: (entry.specialtyCourses ?? []).map(mapCourseFromStrapi),
      additionalCoursesHeading: entry.additionalCoursesHeading,
      additionalCourses: (entry.additionalCourses ?? []).map(mapCourseFromStrapi),
      specialtyDivesHeading: entry.specialtyDivesHeading,
      specialtyDives: entry.specialtyDives ?? [],
      ctaSection: entry.ctaSection,
    };
  } catch (err) {
    console.warn('[Strapi] courses-page single type not found yet, using local content fallback', err);
    return COURSES_PAGE;
  }
}
