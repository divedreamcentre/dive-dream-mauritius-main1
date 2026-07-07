import { useAsyncData } from './useAsyncData';
import { getServices } from '@/services/services.service';

export function useServices() {
  return useAsyncData(getServices, []);
}
