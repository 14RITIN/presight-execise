import { findUserFacets, findUserFilterOptions, findUsers } from './user.repository';
import { UserQueryParams } from './user.types';
import { z } from 'zod';
import { redis } from '../../redis';

export const getUsersService = (query: UserQueryParams) => {
const result = findUsers({
  q: query.q,
  nationalities: query.nationalities,
  hobbies: query.hobbies,
  page: query.page,
  limit: query.limit,
  sort: query.sort,
  direction: query.direction,
});

  const totalPages = Math.ceil(result.total / query.limit);
  
  const facets = findUserFacets({
  q: query.q,
  nationalities: query.nationalities,
  hobbies: query.hobbies,
});
  return {
    data: result.users,
    pagination: {
      page: query.page,
      limit: query.limit,
      total: result.total,
      totalPages,
      hasNextPage: query.page < totalPages,
    },
      facets,
  };


};

const FILTER_OPTIONS_KEY = 'users:filter-options';
const FILTER_OPTIONS_TTL = 300;
const filterOptionsSchema = z.object({
  hobbies: z.array(z.string()),
  nationalities: z.array(z.string()),
});

export const getUserFilterOptionsService = async () => {
  if (!redis) {
    console.log('[cache] users:filter-options Redis not configured; SQLite fallback');
    return findUserFilterOptions();
  }

  try {
    if (redis.status === 'wait') await redis.connect();
    const cached = await redis.get(FILTER_OPTIONS_KEY);
    if (cached !== null) {
      const options = filterOptionsSchema.parse(JSON.parse(cached));
      console.log('[cache] users:filter-options hit');
      return options;
    }
    console.log('[cache] users:filter-options miss');
  } catch {
    console.warn('[cache] users:filter-options Redis read unavailable or invalid; SQLite fallback');
    return findUserFilterOptions();
  }

  const options = findUserFilterOptions();
  try {
    await redis.set(FILTER_OPTIONS_KEY, JSON.stringify(options), 'EX', FILTER_OPTIONS_TTL);
  } catch {
    console.warn('[cache] users:filter-options Redis write unavailable; returning SQLite result');
  }
  return options;
};
