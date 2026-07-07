import { useAsyncData } from './useAsyncData';
import { getDiveCenterPage } from '@/services/diveCenter.service';

export function useDiveCenterPage() {
  return useAsyncData(getDiveCenterPage, []);
}
