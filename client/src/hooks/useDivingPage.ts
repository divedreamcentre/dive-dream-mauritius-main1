import { useAsyncData } from './useAsyncData';
import { getDivingPage } from '@/services/diving.service';

export function useDivingPage() {
  return useAsyncData(getDivingPage, []);
}
