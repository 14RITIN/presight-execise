import { db } from '../../db/database';

import {
  PaginatedUsers,
  SortDirection,
  SortField,
  User,
} from './user.types';

const SORT_COLUMNS: Record<SortField, string> = {
  first_name: 'first_name',
  last_name: 'last_name',
  age: 'age',
  nationality: 'nationality',
};

interface FindUsersParams {
  page: number;
  limit: number;
  sort: SortField;
  direction: SortDirection;
}

export const findUsers = ({
  page,
  limit,
  sort,
  direction,
}: FindUsersParams): PaginatedUsers => {
  const offset = (page - 1) * limit;

  const sortColumn = SORT_COLUMNS[sort];
  const sortDirection = direction === 'desc' ? 'DESC' : 'ASC';

  const users = db
    .prepare(
      `
      SELECT
        id,
        avatar,
        first_name,
        last_name,
        age,
        nationality
      FROM users
      ORDER BY ${sortColumn} ${sortDirection}, id ASC
      LIMIT ? OFFSET ?
      `,
    )
    .all(limit, offset) as User[];

  const totalResult = db
    .prepare('SELECT COUNT(*) AS total FROM users')
    .get() as { total: number };

  return {
    users,
    total: totalResult.total,
  };
};