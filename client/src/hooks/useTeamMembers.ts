import { useAsyncData } from './useAsyncData';
import { getTeamMembers } from '@/services/team.service';

export function useTeamMembers() {
  return useAsyncData(getTeamMembers, []);
}
