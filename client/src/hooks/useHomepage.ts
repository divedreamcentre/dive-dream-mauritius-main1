import { useAsyncData } from './useAsyncData';
import { getHomepage, getHomeHeroBackgrounds } from '@/services/homepage.service';

export function useHomepage() {
  return useAsyncData(getHomepage, []);
}

export function useHomeHeroBackgrounds() {
  return useAsyncData(getHomeHeroBackgrounds, []);
}
