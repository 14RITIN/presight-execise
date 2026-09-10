export type SortField = 'first_name' | 'last_name' | 'age' | 'nationality';

export type SortDirection = 'asc' | 'desc';

export interface UserQueryParams {
  q?: string;
  nationalities?: string[];
  hobbies?: string[];
  sort: SortField;
  direction: SortDirection;
  page: number;
  limit: number;
}

export interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
}

export interface PaginatedUsers {
  users: User[];
  total: number;
}