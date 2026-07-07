import { useAsyncData } from './useAsyncData';
import { getWebsiteSettings } from '@/services/settings.service';

export function useWebsiteSettings() {
  return useAsyncData(getWebsiteSettings, []);
}
