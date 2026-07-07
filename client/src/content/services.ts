import type { Service } from '@/types';
import { services as serviceImages } from './media';

// Premium services offered by Dive Dream
export const SERVICES: Service[] = [
  {
    id: 'airport-transfer',
    title: 'Airport & Hotel Transfers',
    description: 'Enjoy seamless, air-conditioned private transfers from Mauritius International Airport directly to our dive center or your hotel. Comfortable transport for you and all your dive equipment.',
    price: '$40 per way',
    image: serviceImages.airportTransfer,
  },
  {
    id: 'private-charter',
    title: 'Private Boat Charters',
    description: 'Charter our dedicated dive boat for fully customized private expeditions. Perfect for groups, families, or professional underwater photography and videography projects.',
    price: 'From $800 / Day',
    image: serviceImages.privateCharter,
  },
  {
    id: 'snorkeling-trips',
    title: 'Guided Snorkeling Safaris',
    description: 'Not a certified diver? Join our experienced guides on a guided snorkeling adventure to pristine shallow reefs. All premium snorkeling gear and refreshments included.',
    price: '$35 per person',
    image: serviceImages.snorkeling,
  },
  {
    id: 'underwater-photography',
    title: 'Underwater Photography Services',
    description: 'Capture your underwater memories with professional underwater photography. Our certified photographer will accompany you and provide high-resolution edited digital images.',
    price: '$85 per session',
    image: serviceImages.photography,
  },
  {
    id: 'refreshments',
    title: 'Onboard Catering & Refreshments',
    description: 'All boat trips include fresh tropical fruits, snacks, and mineral water. Upgrade to our premium lunch package with hot meals prepared fresh on board.',
    price: 'Included (Lunch upgrade $12)',
    image: serviceImages.refreshments,
  },
];
