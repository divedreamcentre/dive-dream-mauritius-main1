import { useAsyncData } from './useAsyncData';
import { getGalleryImages } from '@/services/gallery.service';

export function useGalleryImages() {
  return useAsyncData(getGalleryImages, []);
}
