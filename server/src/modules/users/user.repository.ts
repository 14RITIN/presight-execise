import { db } from '../../db/database';

import {
  FacetItem,
  FindUsersParams,
  PaginatedUsers,
  SortField,
  User,
  UserFacets,
  UserFilters,
} from './user.types';

const SORT_COLUMNS: Record<SortField, string> = {
  first_name: 'first_name',
  last_name: 'last_name',
  age: 'age',
  nationality: 'nationality',
};


const buildFilters = ({
  q,
  nationalities = [],
  hobbies = [],
}: UserFilters) => {
  const conditions: string[] = [];
  const params: Array<string | number> = [];

  // Text search: first name OR last name
  if (q) {
    const searchValue = `%${q}%`;

    conditions.push('(first_name LIKE ? OR last_name LIKE ?)');
    params.push(searchValue, searchValue);
  }

  // Nationalities use OR semantics
  // Example: Indian OR Emirati
  if (nationalities.length > 0) {
    const placeholders = nationalities.map(() => '?').join(', ');

    conditions.push(`nationality IN (${placeholders})`);
    params.push(...nationalities);
  }

  // Hobbies use ALL semantics
  // Example: Reading AND Cycling
  if (hobbies.length > 0) {
    const placeholders = hobbies.map(() => '?').join(', ');

    conditions.push(`
      id IN (
        SELECT uh.user_id
        FROM user_hobbies uh
        INNER JOIN hobbies h
          ON h.id = uh.hobby_id
        WHERE h.name IN (${placeholders})
        GROUP BY uh.user_id
        HAVING COUNT(DISTINCT h.name) = ?
      )
    `);

    params.push(...hobbies, hobbies.length);
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

  return {
    whereClause,
    params,
  };
};

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

  const { whereClause, params: filterParams } = buildFilters({
    q,
    nationalities,
    hobbies,
  });

  // Get total before pagination.
  const totalResult = db
    .prepare(`
      SELECT COUNT(*) AS total
      FROM users
      ${whereClause}
    `)
    .get(...filterParams) as { total: number };

  // Fetch only the requested page.
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
    .all(...filterParams, limit, offset) as Omit<User, 'hobbies'>[];

  if (users.length === 0) {
    return {
      users: [],
      total: totalResult.total,
    };
  }

  /*
   * Fetch hobbies for every user on the current page in one query.
   * This avoids an N+1 query:
   *
   * Bad:
   *   1 user query + 30 hobby queries
   *
   * Current approach:
   *   1 user query + 1 hobbies query
   */
  const userIds = users.map((user) => user.id);
  const userPlaceholders = userIds.map(() => '?').join(', ');

  const hobbyRows = db
    .prepare(`
      SELECT
        uh.user_id,
        h.name
      FROM user_hobbies uh
      INNER JOIN hobbies h
        ON h.id = uh.hobby_id
      WHERE uh.user_id IN (${userPlaceholders})
      ORDER BY h.name ASC
    `)
    .all(...userIds) as {
    user_id: number;
    name: string;
  }[];

  const hobbiesByUser = new Map<number, string[]>();

  for (const row of hobbyRows) {
    const userHobbies = hobbiesByUser.get(row.user_id) ?? [];

    userHobbies.push(row.name);

    hobbiesByUser.set(row.user_id, userHobbies);
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

export const findUserFacets = (
  filters: UserFilters,
): UserFacets => {
  const { whereClause, params } = buildFilters(filters);

  // Top 20 hobbies among ALL users matching the active filters.
  const hobbies = db
    .prepare(`
      SELECT
        h.name AS value,
        COUNT(*) AS count
      FROM user_hobbies uh

      INNER JOIN hobbies h
        ON h.id = uh.hobby_id

      INNER JOIN (
        SELECT id
        FROM users
        ${whereClause}
      ) filtered_users
        ON filtered_users.id = uh.user_id

      GROUP BY h.id, h.name
      ORDER BY count DESC, h.name ASC
      LIMIT 20
    `)
    .all(...params) as FacetItem[];

  // Top 20 nationalities among ALL users matching the active filters.
  const nationalities = db
    .prepare(`
      SELECT
        nationality AS value,
        COUNT(*) AS count
      FROM users
      ${whereClause}
      GROUP BY nationality
      ORDER BY count DESC, nationality ASC
      LIMIT 20
    `)
    .all(...params) as FacetItem[];

  return {
    hobbies,
    nationalities,
  };
};