import { useAsyncData } from './useAsyncData';
import { getServicesPage } from '@/services/servicesPage.service';

export function useServicesPage() {
  return useAsyncData(getServicesPage, []);
}
