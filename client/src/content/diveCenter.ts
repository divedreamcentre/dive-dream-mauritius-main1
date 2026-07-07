import type { DiveCenterPage } from '@/types';
import { diveCenter as diveCenterImages } from './media';

export const DIVE_CENTER_PAGE: DiveCenterPage = {
  hero: {
    eyebrow: 'Our Headquarters',
    title: 'The Dive Center',
    description: 'Explore our physical facility. Custom-built to offer a luxurious, comfortable, and highly functional space for divers to prepare, learn, and relax.',
  },
  tourSection: {
    eyebrow: 'Virtual Tour',
    title: 'World-Class Infrastructure',
    description: 'Every square meter of our facility is optimized for safety, flow, and comfort. Take a look inside.',
  },
  facilityAreas: [
    {
      id: 'reception',
      title: 'Elegant Reception',
      description: 'A spacious, air-conditioned check-in area with comfortable lounge seating, complimentary organic refreshments, and retail display of premium dive accessories.',
      image: diveCenterImages.reception,
    },
    {
      id: 'classroom',
      title: 'Interactive Classroom',
      description: 'Equipped with ultra-high-definition smart screens, whiteboards, and comfortable seating to ensure a premium, focused learning environment for SDI/TDI theory.',
      image: diveCenterImages.classroom,
    },
    {
      id: 'showers-lockers',
      title: 'Hot Showers & Lockers',
      description: 'Secure digital key lockers to store your valuables safely, and private hot-water showers with complimentary organic, reef-safe shampoo and body wash.',
      image: diveCenterImages.showersLockers,
    },
    {
      id: 'nitrox-station',
      title: 'Nitrox Blending Station',
      description: 'Our state-of-the-art continuous-flow membrane blending station, capable of custom mixing Enriched Air Nitrox up to 40% oxygen on-demand.',
      image: diveCenterImages.nitroxStation,
    },
  ],
  locationSection: {
    eyebrow: 'How to Find Us',
    title: 'Location & Access',
    description: 'Located right on the beach at Siren Bay, our center offers direct shore access to our private house reef, and is only a 5-minute walk from the main resort district.',
    address: '100 Marine Drive, Siren Bay, MB 1204',
    parkingNote: 'Complimentary private parking and valet services are available for all diving guests.',
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.34925453057!2d57.54324857616065!3d-20.035808741613913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217dacaed25f4d75%3A0x1814f7c7bab412c1!2sDive%20Dream%20Divers!5e0!3m2!1sen!2smu!4v1781795341840!5m2!1sen!2smu',
};
