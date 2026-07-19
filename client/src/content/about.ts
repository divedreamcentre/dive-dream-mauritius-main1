import type { AboutPage } from '@/types';
import { about as aboutImages } from './media';

export const ABOUT_PAGE: AboutPage = {
  hero: {
    eyebrow: 'Our Story',
    title: 'About Dive Dream Divers',
    description: 'Established in 2004 in Mauritius, Dive Dream Divers offers professional SDI and TDI training with over 40 pristine dive sites. We combine elite instruction with safety-first operations and a passion for marine conservation.',
  },
  mission: {
    eyebrow: 'Our Mission',
    title: 'Our Mission: Excellence in Diving',
    description: 'At Dive Dream, we offer a high level of service to divers of all levels, whether beginners or experts, with a smile. Our goal is to provide unforgettable underwater experiences while maintaining the highest safety standards and respecting marine ecosystems.',
    points: ['100% Safety Record', 'Elite SDI/TDI Facility', 'Eco-Friendly Reef-Safe Center', 'Multilingual Elite Crew'],
    image: aboutImages.mission,
  },
  conservation: {
    eyebrow: 'Eco-Responsibility',
    title: 'Marine Conservation Efforts',
    description: 'We do not just dive on reefs; we active steward and restore them. In partnership with marine biologists, Dive Dream runs weekly reef-cleanup dives, monitors coral nursery restoration zones, and enforces a strict zero-touch reef policy.',
    initiatives: [
      {
        id: 'green-fins',
        title: 'Green Fins Certified',
        description: 'We strictly adhere to internationally recognized Green Fins environmental standards to minimize dive tourism impact.',
        icon: 'Heart',
      },
      {
        id: 'coral-nursery',
        title: 'Coral Nursery Sponsorship',
        description: '10% of all technical training course proceeds are directly funneled into local coral grafting and restoration nurseries.',
        icon: 'Globe',
      },
    ],
    image: aboutImages.conservation,
  },
};
