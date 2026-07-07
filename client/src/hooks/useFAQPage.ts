import { useAsyncData } from './useAsyncData';
import { getFAQPage } from '@/services/faqPage.service';

export function useFAQPage() {
  return useAsyncData(getFAQPage, []);
}
