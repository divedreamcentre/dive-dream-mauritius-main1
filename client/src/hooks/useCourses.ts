import { useAsyncData } from './useAsyncData';
import { getCourses, getCourseDetailBySlug } from '@/services/courses.service';

export function useCourses() {
  return useAsyncData(getCourses, []);
}

export function useCourseDetail(slug: string) {
  return useAsyncData(() => getCourseDetailBySlug(slug), [slug]);
}
