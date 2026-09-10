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
  q?: string;
  nationalities?: string[];
  page: number;
  limit: number;
  sort: SortField;
  direction: SortDirection;
}

export const findUsers = ({
  q,
  nationalities = [],
  page,
  limit,
  sort,
  direction,
}: FindUsersParams): PaginatedUsers => {
  const offset = (page - 1) * limit;

  const sortColumn = SORT_COLUMNS[sort];
  const sortDirection = direction === 'desc' ? 'DESC' : 'ASC';

  const conditions: string[] = [];
  const filterParams: unknown[] = [];

  if (q) {
    conditions.push('(first_name LIKE ? OR last_name LIKE ?)');
    const searchValue = `%${q}%`;
    filterParams.push(searchValue, searchValue);
  }

  if (nationalities.length > 0) {
    const placeholders = nationalities.map(() => '?').join(', ');

    conditions.push(`nationality IN (${placeholders})`);
    filterParams.push(...nationalities);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const users = db
    .prepare(`
      SELECT
        id,
        avatar,
        first_name,
        last_name,
        age,
        nationality
      FROM users
      ${whereClause}
      ORDER BY ${sortColumn} ${sortDirection}, id ASC
      LIMIT ? OFFSET ?
    `)
    .all(...filterParams, limit, offset) as User[];

  const totalResult = db
    .prepare(`
      SELECT COUNT(*) AS total
      FROM users
      ${whereClause}
    `)
    .get(...filterParams) as { total: number };

  return {
    users,
    total: totalResult.total,
  };
};