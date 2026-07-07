import { useAsyncData } from './useAsyncData';
import { getPackages } from '@/services/packages.service';

export function usePackages() {
  return useAsyncData(getPackages, []);
}
