import { useAsyncData } from './useAsyncData';
import { getCrewPage } from '@/services/crewPage.service';

export function useCrewPage() {
  return useAsyncData(getCrewPage, []);
}
