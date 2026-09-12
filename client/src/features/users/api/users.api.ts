import {
  UserQueryParams,
  UsersResponse,
} from '../types/user.types';

export const fetchUsers = async (
  params: UserQueryParams,
  signal?: AbortSignal,
): Promise<UsersResponse> => {
  const searchParams = new URLSearchParams();

  if (params.q) {
    searchParams.set('q', params.q);
  }

  if (params.nationalities?.length) {
    searchParams.set(
      'nationalities',
      params.nationalities.join(','),
    );
  }

  if (params.hobbies?.length) {
    searchParams.set('hobbies', params.hobbies.join(','));
  }

  if (params.sort) {
    searchParams.set('sort', params.sort);
  }

  if (params.direction) {
    searchParams.set('direction', params.direction);
  }

  if (params.page) {
    searchParams.set('page', String(params.page));
  }

  if (params.limit) {
    searchParams.set('limit', String(params.limit));
  }

  const response = await fetch(
    `/api/users?${searchParams.toString()}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json() as Promise<UsersResponse>;
};