import { useSearchParams } from 'react-router-dom';

import {
  SortDirection,
  SortField,
  UserQueryParams,
} from '../types/user.types';

const DEFAULT_SORT: SortField = 'first_name';
const DEFAULT_DIRECTION: SortDirection = 'asc';

const parseList = (value: string | null): string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const useUserFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: UserQueryParams = {
    q: searchParams.get('q') ?? '',
    nationalities: parseList(searchParams.get('nationalities')),
    hobbies: parseList(searchParams.get('hobbies')),
    sort:
      (searchParams.get('sort') as SortField | null) ??
      DEFAULT_SORT,
    direction:
      (searchParams.get('direction') as SortDirection | null) ??
      DEFAULT_DIRECTION,
  };

  const updateFilters = (
    updates: Partial<UserQueryParams>,
  ) => {
    const next = {
      ...filters,
      ...updates,
    };

    const params = new URLSearchParams();

    if (next.q) {
      params.set('q', next.q);
    }

    if (next.nationalities?.length) {
      params.set(
        'nationalities',
        next.nationalities.join(','),
      );
    }

    if (next.hobbies?.length) {
      params.set('hobbies', next.hobbies.join(','));
    }

    if (next.sort && next.sort !== DEFAULT_SORT) {
      params.set('sort', next.sort);
    }

    if (
      next.direction &&
      next.direction !== DEFAULT_DIRECTION
    ) {
      params.set('direction', next.direction);
    }

    setSearchParams(params);
  };

  return {
    filters,
    updateFilters,
  };
};