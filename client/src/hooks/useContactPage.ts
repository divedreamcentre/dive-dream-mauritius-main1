import { useAsyncData } from './useAsyncData';
import { getContactPage } from '@/services/contact.service';

export function useContactPage() {
  return useAsyncData(getContactPage, []);
}
