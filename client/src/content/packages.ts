import type { DivePackage } from '@/types';

// Dive Dream dive packages for all experience levels
export const DIVE_PACKAGES: DivePackage[] = [
  {
    id: 'single-dive',
    name: 'Single Dive Explorer',
    price: { amount: 65, currency: 'USD' },
    divesCount: 1,
    equipmentIncluded: false,
    nitroxOption: true,
    privateGuideOption: true,
    duration: 'Half Day',
  },
  {
    id: 'two-dives',
    name: 'Double Tank Adventure',
    price: { amount: 120, currency: 'USD' },
    divesCount: 2,
    equipmentIncluded: false,
    nitroxOption: true,
    privateGuideOption: true,
    duration: 'Half Day',
    isBestValue: false,
  },
  {
    id: 'five-dives',
    name: 'Five Dive Package',
    price: { amount: 275, currency: 'USD' },
    divesCount: 5,
    equipmentIncluded: true,
    nitroxOption: true,
    privateGuideOption: true,
    duration: '2 - 3 Days',
    isBestValue: true,
  },
  {
    id: 'ten-dives',
    name: 'Ten Dive Package',
    price: { amount: 500, currency: 'USD' },
    divesCount: 10,
    equipmentIncluded: true,
    nitroxOption: true,
    privateGuideOption: true,
    duration: '5 Days',
  },
];
