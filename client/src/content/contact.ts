import type { ContactPage } from '@/types';

export const CONTACT_PAGE: ContactPage = {
  hero: {
    eyebrow: 'Get In Touch',
    title: 'Contact Dive Dream Divers',
    description: 'Have questions about our dive sites, training courses, or private charters? Contact us directly and our team will assist you promptly.',
  },
  channelsHeading: 'Direct Channels',
  safetyNote: {
    title: 'Encrypted Submissions',
    description: 'All messages sent through our online portal are encrypted using secure socket layers. Your personal information is protected under our strict privacy standards.',
  },
  formHeading: 'Send Us A Message',
  mapConfig: {
    // TODO: these are Trou aux Biches town-center coordinates, not the
    // exact Becosy Hotel pin — drop a pin on the real hotel location in
    // Google Maps and swap in the precise lat/lng.
    center: { lat: -20.05, lng: 57.55 },
    zoom: 15,
    markerTitle: 'Dive Dream Divers — Becosy Hotel, Trou aux Biches',
  },
};
