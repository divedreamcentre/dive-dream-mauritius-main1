export interface DivePackage {
  id: string;
  name: string;
  price: number;
  divesCount: number;
  equipmentIncluded: boolean;
  nitroxOption: boolean;
  privateGuideOption: boolean;
  duration: string;
  isBestValue?: boolean;
}
