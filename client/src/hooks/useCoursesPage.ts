import { useAsyncData } from './useAsyncData';
import { getCoursesPage } from '@/services/coursesPage.service';

export function useCoursesPage() {
  return useAsyncData(getCoursesPage, []);
}
