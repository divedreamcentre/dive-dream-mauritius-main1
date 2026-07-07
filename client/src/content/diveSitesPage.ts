import type { DiveSitesPage } from '@/types';
import { diveSites as diveSiteImages } from './media';

export const DIVE_SITES_PAGE: DiveSitesPage = {
  hero: {
    eyebrow: 'Marine Expeditions',
    title: 'Interactive Dive Sites',
    description: 'Explore our curated selection of pristine coral reefs, historic wrecks, and dramatic drop-offs. Filter by difficulty or type to find your perfect dive.',
  },
  mapSection: {
    eyebrow: 'Complete Map',
    title: 'All 47 Dive Sites',
    description: 'From shallow coral gardens to deep wrecks and dramatic walls — explore the full range of dive sites across Northern Mauritius, Flic en Flac, Round Island, and the South Safari route.',
  },
  mapImage: diveSiteImages.map,
  highlightsSection: {
    eyebrow: 'Handpicked',
    title: 'Featured Dive Sites',
    description: 'Our top picks for unforgettable underwater experiences. Filter by certification or environment to find your perfect dive.',
  },
  certLevels: ['All', 'Beginner', 'Intermediate', 'Advanced', 'Technical'],
  diveTypes: ['All', 'Wreck', 'Reef', 'Deep', 'Drift', 'Wall', 'Night'],
};
