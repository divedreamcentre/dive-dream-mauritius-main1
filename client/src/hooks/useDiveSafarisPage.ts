import { useAsyncData } from './useAsyncData';
import { getDiveSafarisPage } from '@/services/diveSafarisPage.service';

export function useDiveSafarisPage() {
  return useAsyncData(getDiveSafarisPage, []);
}
