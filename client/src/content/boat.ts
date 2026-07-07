import type { BoatPage } from '@/types';
import { boat as boatImages } from './media';

export const BOAT_PAGE: BoatPage = {
  hero: {
    eyebrow: 'Luxury Fleet',
    title: 'The MV Ocean Explorer',
    description: 'Explore our state-of-the-art custom 15-meter dive catamaran. Purpose-built to balance elite technical diving logistics with high-end luxury, comfort, and stability.',
  },
  vesselImage: boatImages.vessel,
  specsSection: {
    eyebrow: 'Technical Specs',
    title: 'Vessel Specifications',
    description: 'The MV Ocean Explorer is custom engineered to offer maximum deck space and stability in open ocean swells. With twin 350HP Volvo Penta engines, she gets you to outer atolls quickly and safely.',
    specs: [
      { label: 'Length Overall', value: '15 Meters (50 feet)' },
      { label: 'Beam (Width)', value: '6 Meters (20 feet)' },
      { label: 'Max Capacity', value: '20 Divers + 4 Crew' },
      { label: 'Cruising Speed', value: '18 Knots' },
    ],
  },
  featureCards: [
    {
      id: 'emergency-systems',
      title: 'Emergency Systems',
      description: 'Your safety is our absolute priority. The vessel is fitted with state-of-the-art life-saving systems and advanced navigation.',
      icon: 'Shield',
      items: ['Dual 100% Medical Oxygen Kits', 'SOLAS Life Rafts & Jackets', 'Marine VHF Radio & Radar', 'AED Automated Defibrillator'],
    },
    {
      id: 'onboard-comfort',
      title: 'Onboard Comfort',
      description: 'Enjoy premium travel comfort between dive sessions. Relax, dine, and prepare in style.',
      icon: 'Anchor',
      items: ['Two Fresh Water Showers', 'Air-Conditioned Main Salon', 'Spacious Sun Deck & Lounge', 'Marine Toilet (Head)'],
    },
    {
      id: 'dive-infrastructure',
      title: 'Dive Infrastructure',
      description: 'Engineered specifically for elite dive logistics, featuring spacious individual gearing stations.',
      icon: 'Waves',
      items: ['Custom Individual Tank Racks', 'Dual Sturdy Diving Ladders', 'Large Dedicated Camera Table', 'Fresh Water Rinse Bins'],
    },
  ],
};
