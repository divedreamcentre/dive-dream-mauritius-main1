import { useAsyncData } from './useAsyncData';
import { getPromotions } from '@/services/promotions.service';

export function usePromotions() {
  return useAsyncData(getPromotions, []);
}
