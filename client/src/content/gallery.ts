import type { GalleryImage } from '@/types';
import { galleryUrls } from './media';

// Gallery images auto-imported from client/src/assets/gallery/*.
export const GALLERY_IMAGES: GalleryImage[] = galleryUrls.map((url, idx) => ({
  id: `gallery-${idx + 1}`,
  url,
  alt: `Dive Dream underwater gallery photo ${idx + 1}`,
}));
