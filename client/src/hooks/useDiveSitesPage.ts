import { useAsyncData } from './useAsyncData';
import { getDiveSitesPage } from '@/services/diveSitesPage.service';

export function useDiveSitesPage() {
  return useAsyncData(getDiveSitesPage, []);
}
