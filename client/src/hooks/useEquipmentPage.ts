import { useAsyncData } from './useAsyncData';
import { getEquipmentPage } from '@/services/equipment.service';

export function useEquipmentPage() {
  return useAsyncData(getEquipmentPage, []);
}
