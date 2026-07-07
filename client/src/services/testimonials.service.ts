import type { Testimonial } from '@/types';
import type { StrapiCollectionResponse, StrapiEntryBase } from '@/types/strapi';
import { TESTIMONIALS } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { unwrapCollection } from '@/lib/strapiMappers';

interface RawTestimonial extends StrapiEntryBase {
  name: string;
  role: string;
  text: string;
  rating: number;
}

function mapTestimonialFromStrapi(raw: RawTestimonial): Testimonial {
  return {
    id: raw.documentId,
    name: raw.name,
    role: raw.role,
    text: raw.text,
    rating: raw.rating,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const raw = await fetchAPI<StrapiCollectionResponse<RawTestimonial>>(ENDPOINTS.testimonials);
    return unwrapCollection(raw).map(mapTestimonialFromStrapi);
  } catch (err) {
    console.warn('[Strapi] testimonials unavailable, using local content fallback', err);
    return TESTIMONIALS;
  }
}
