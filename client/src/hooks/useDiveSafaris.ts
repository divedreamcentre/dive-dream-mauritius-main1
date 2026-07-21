import { useAsyncData } from './useAsyncData';
import { getDiveSafaris } from '@/services/diveSafaris.service';

export function useDiveSafaris() {
  return useAsyncData(getDiveSafaris, []);
}
