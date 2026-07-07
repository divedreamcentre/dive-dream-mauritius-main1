import { useAsyncData } from './useAsyncData';
import { getDiveSites } from '@/services/diveSites.service';

export function useDiveSites() {
  return useAsyncData(getDiveSites, []);
}
