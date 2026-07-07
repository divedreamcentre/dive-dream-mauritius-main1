import { useAsyncData } from './useAsyncData';
import { getFAQs } from '@/services/faq.service';

export function useFAQs() {
  return useAsyncData(getFAQs, []);
}
