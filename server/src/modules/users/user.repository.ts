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
  hobbies?: string[];
  page: number;
  limit: number;
  sort: SortField;
  direction: SortDirection;
}

export const findUsers = ({
  q,
  nationalities = [],
  hobbies = [],
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

  if (hobbies.length > 0) {
    const placeholders = hobbies.map(() => '?').join(', ');

    conditions.push(`
      id IN (
        SELECT uh.user_id
        FROM user_hobbies uh
        INNER JOIN hobbies h ON h.id = uh.hobby_id
        WHERE h.name IN (${placeholders})
        GROUP BY uh.user_id
        HAVING COUNT(DISTINCT h.name) = ?
      )
    `);

    filterParams.push(...hobbies, hobbies.length);
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

    if (users.length === 0) {
    return {
      users: [],
      total: totalResult.total,
    };
  }
  const userIds = users.map((user) => user.id);
  const placeholders = userIds.map(() => '?').join(', ');

  const hobbyRows = db
    .prepare(`
      SELECT
        uh.user_id,
        h.name
      FROM user_hobbies uh
      INNER JOIN hobbies h ON h.id = uh.hobby_id
      WHERE uh.user_id IN (${placeholders})
      ORDER BY h.name ASC
    `)
    .all(...userIds) as { user_id: number; name: string }[];

  const hobbiesByUser = new Map<number, string[]>();

  for (const row of hobbyRows) {
    const hobbies = hobbiesByUser.get(row.user_id) ?? [];
    hobbies.push(row.name);
    hobbiesByUser.set(row.user_id, hobbies);
  }

  const usersWithHobbies: User[] = users.map((user) => ({
    ...user,
    hobbies: hobbiesByUser.get(user.id) ?? [],
  }));

  return {
    users: usersWithHobbies,
    total: totalResult.total,
  };
};

