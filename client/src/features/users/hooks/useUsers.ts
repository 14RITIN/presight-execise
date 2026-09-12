import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchUsers } from '../api/users.api';
import { UserQueryParams } from '../types/user.types';

const DEFAULT_PAGE_SIZE = 30;

type UsersFilters = Omit<UserQueryParams, 'page'>;

export const useUsers = (params: UsersFilters) => {
  return useInfiniteQuery({
    queryKey: ['users', params],
    queryFn: ({ pageParam, signal }) =>
      fetchUsers(
        {
          ...params,
          page: pageParam,
          limit: params.limit ?? DEFAULT_PAGE_SIZE,
        },
        signal,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
  });
};