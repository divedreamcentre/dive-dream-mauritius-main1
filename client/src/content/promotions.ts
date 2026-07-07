import type { Promotion } from '@/types';

// Current promotions at Dive Dream
export const PROMOTIONS: Promotion[] = [
  {
    id: 'early-booking',
    title: 'Early Booking Discount',
    discount: '5% OFF',
    description: 'Book your dive package or training course at least 30 days in advance and receive a 5% discount on all bookings.',
    code: 'EARLYBIRD5',
  },
  {
    id: 'group-discount',
    title: 'Group Diving Expeditions',
    discount: '10% OFF',
    description: 'Diving is more fun with friends! Book for a group of 4 or more divers and receive a 10% discount on all dive packages.',
    expiryDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    code: 'DIVEGROUP10',
  },
  {
    id: 'repeat-customer',
    title: 'Loyal Diver Rewards',
    discount: '8% OFF',
    description: 'Returning customers receive an 8% discount on their next dive package or training course. We value your loyalty!',
    code: 'LOYAL8',
  },
];
