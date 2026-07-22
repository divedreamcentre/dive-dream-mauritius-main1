import { useAsyncData } from './useAsyncData';
import { getServices, getServiceById } from '@/services/services.service';

export function useServices() {
  return useAsyncData(getServices, []);
}

export function useServiceDetail(id: string) {
  return useAsyncData(() => getServiceById(id), [id]);
}
