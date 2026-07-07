import { useAsyncData } from './useAsyncData';
import { getPackagesPage } from '@/services/packagesPage.service';

export function usePackagesPage() {
  return useAsyncData(getPackagesPage, []);
}
