import { useAsyncData } from './useAsyncData';
import { getRebreatherDivingPage } from '@/services/rebreatherDiving.service';

export function useRebreatherDivingPage() {
  return useAsyncData(getRebreatherDivingPage, []);
}
