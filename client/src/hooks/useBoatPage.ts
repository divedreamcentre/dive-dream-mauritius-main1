import { useAsyncData } from './useAsyncData';
import { getBoatPage } from '@/services/boat.service';

export function useBoatPage() {
  return useAsyncData(getBoatPage, []);
}
