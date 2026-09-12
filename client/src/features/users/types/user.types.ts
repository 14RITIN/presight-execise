export type SortField =
  | 'first_name'
  | 'last_name'
  | 'age'
  | 'nationality';

export type SortDirection = 'asc' | 'desc';

export interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
  hobbies: string[];
}

export interface FacetItem {
  value: string;
  count: number;
}

export interface UserQueryParams {
  q?: string;
  nationalities?: string[];
  hobbies?: string[];
  sort?: SortField;
  direction?: SortDirection;
  page?: number;
  limit?: number;
}

export interface UsersResponse {
  data: User[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
  };

  facets: {
    hobbies: FacetItem[];
    nationalities: FacetItem[];
  };
}