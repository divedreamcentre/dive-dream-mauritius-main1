import type { Price } from './common';

export interface DivePackage {
  id: string;
  name: string;
  price: Price;
  divesCount: number;
  equipmentIncluded: boolean;
  nitroxOption: boolean;
  privateGuideOption: boolean;
  duration: string;
  isBestValue?: boolean;
}
