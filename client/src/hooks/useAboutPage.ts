import { useAsyncData } from './useAsyncData';
import { getAboutPage } from '@/services/about.service';

export function useAboutPage() {
  return useAsyncData(getAboutPage, []);
}
