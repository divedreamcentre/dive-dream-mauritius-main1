import { useAsyncData } from './useAsyncData';
import { getTestimonials } from '@/services/testimonials.service';

export function useTestimonials() {
  return useAsyncData(getTestimonials, []);
}
