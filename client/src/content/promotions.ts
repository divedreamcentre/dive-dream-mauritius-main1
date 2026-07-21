import type { Promotion } from '@/types';

// Current promotions at Dive Dream
export const PROMOTIONS: Promotion[] = [
  {
    id: 'early-booking',
    title: 'Early Booking Discount',
    discount: '5% OFF',
    description: 'Lock in your dive package early and save. Reserve well ahead of your trip with a larger group to unlock this discount on our best-value multi-dive packages.',
    conditions: [
      'Book at least 60 days in advance',
      'Minimum 6 divers per booking',
      'Valid only on the 5-Dive Package and 10-Dive Package',
    ],
    code: 'EARLYBIRD5',
  },
  {
    id: 'group-discount',
    title: 'Group Package Discount',
    discount: '10% OFF',
    description: 'Bring the whole crew! Book a large group expedition together and receive 10% off your dive package.',
    conditions: [
      'Minimum 10 divers per booking',
    ],
    expiryDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    code: 'DIVEGROUP10',
  },
  {
    id: 'repeat-customer',
    title: 'Loyalty Offer — 2nd Visit',
    discount: '8% OFF',
    description: 'Welcome back! This loyalty offer rewards returning divers on their second visit to Dive Dream. Confirm your previous visit and we\'ll apply your discount.',
    conditions: [
      'Valid for your 2nd visit with us only',
      'Requires confirmation of your previous visit (uses a separate short form, not the standard booking form)',
    ],
    code: 'LOYAL8',
    ctaHref: '/loyalty-claim',
    ctaLabel: 'Confirm My Previous Visit',
  },
];
