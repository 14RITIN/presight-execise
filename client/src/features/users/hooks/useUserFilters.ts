import { useSearchParams } from "react-router-dom";

import { SortDirection, SortField, UserQueryParams } from "../types/user.types";

const DEFAULT_SORT = SortField.FirstName;
const DEFAULT_DIRECTION = SortDirection.Asc;

const parseList = (value: string | null): string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const isSortField = (value: string | null): value is SortField => {
  return Object.values(SortField).includes(value as SortField);
};

const isSortDirection = (value: string | null): value is SortDirection => {
  return Object.values(SortDirection).includes(value as SortDirection);
};

export const useUserFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get("sort");
  const directionValue = searchParams.get("direction");

  const filters: UserQueryParams = {
    q: (searchParams.get("q") ?? "").trim(),
    nationalities: parseList(searchParams.get("nationalities")),
    hobbies: parseList(searchParams.get("hobbies")),
    sort: isSortField(sortValue) ? sortValue : DEFAULT_SORT,
    direction: isSortDirection(directionValue)
      ? directionValue
      : DEFAULT_DIRECTION,
  };

  const updateFilters = (updates: Partial<UserQueryParams>) => {
    const next = {
      ...filters,
      ...updates,
    };

    const params = new URLSearchParams();

    const query = next.q?.trim();
    if (query) {
      params.set("q", query);
    }

    if (next.nationalities?.length) {
      params.set("nationalities", next.nationalities.join(","));
    }

    if (next.hobbies?.length) {
      params.set("hobbies", next.hobbies.join(","));
    }

    if (next.sort && next.sort !== DEFAULT_SORT) {
      params.set("sort", next.sort);
    }

    if (next.direction && next.direction !== DEFAULT_DIRECTION) {
      params.set("direction", next.direction);
    }

    setSearchParams(params);
  };

  const resetFilters = () => {
    updateFilters({
      q: "",
      nationalities: [],
      hobbies: [],
      sort: DEFAULT_SORT,
      direction: DEFAULT_DIRECTION,
    });
  };

  const hasActiveFilters = Boolean(
    filters.q ||
    filters.nationalities?.length ||
    filters.hobbies?.length ||
    filters.sort !== DEFAULT_SORT ||
    filters.direction !== DEFAULT_DIRECTION,
  );

  return {
    resetFilters,
    hasActiveFilters,
    filters,
    updateFilters,
  };
};
