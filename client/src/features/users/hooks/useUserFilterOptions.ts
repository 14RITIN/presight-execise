import { useQuery } from '@tanstack/react-query';

import { fetchUserFilterOptions } from '../api/users.api';

export const useUserFilterOptions = () => {
  return useQuery({
    queryKey: ['user-filter-options'],
    queryFn: fetchUserFilterOptions,
    staleTime: Infinity,
  });
};