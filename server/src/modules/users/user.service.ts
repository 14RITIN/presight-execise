import { findUsers } from './user.repository';
import { UserQueryParams } from './user.types';

export const getUsersService = (query: UserQueryParams) => {
  const result = findUsers({
    page: query.page,
    limit: query.limit,
    sort: query.sort,
    direction: query.direction,
  });

  const totalPages = Math.ceil(result.total / query.limit);

  return {
    data: result.users,
    pagination: {
      page: query.page,
      limit: query.limit,
      total: result.total,
      totalPages,
      hasNextPage: query.page < totalPages,
    },
  };
};