import type { FAQItem } from '@/types';
import type { StrapiCollectionResponse, StrapiEntryBase } from '@/types/strapi';
import { FAQS } from '@/content';
import { fetchAPI } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { unwrapCollection } from '@/lib/strapiMappers';

interface RawFAQ extends StrapiEntryBase {
  question: string;
  answer: string;
  category?: { name?: string } | string | null;
}

function mapFAQFromStrapi(raw: RawFAQ): FAQItem {
  const category = typeof raw.category === 'string' ? raw.category : raw.category?.name ?? 'General';
  return {
    question: raw.question,
    answer: raw.answer,
    category,
  };
}

export async function getFAQs(): Promise<FAQItem[]> {
  try {
    const raw = await fetchAPI<StrapiCollectionResponse<RawFAQ>>(ENDPOINTS.faq);
    return unwrapCollection(raw).map(mapFAQFromStrapi);
  } catch (err) {
    console.warn('[Strapi] faqs unavailable, using local content fallback', err);
    return FAQS;
  }
}
