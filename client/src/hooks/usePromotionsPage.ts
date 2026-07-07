import { useAsyncData } from './useAsyncData';
import { getPromotionsPage } from '@/services/promotionsPage.service';

export function usePromotionsPage() {
  return useAsyncData(getPromotionsPage, []);
}
