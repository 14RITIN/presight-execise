import { useState } from "react";
import { UserFilters } from "./components/UserFilters";
import { UserGrid } from "./components/UserGrid";
import { UserSearch } from "./components/UserSearch";
import { UserSort } from "./components/UserSort";
import { useUserFilters } from "./hooks/useUserFilters";
import { useUsers } from "./hooks/useUsers";

export function UsersPage() {
  const { filters, updateFilters } = useUserFilters();
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError } = useUsers(filters);
  const facets = data?.pages[0]?.facets;

  const hobbies = facets?.hobbies ?? [];
  const nationalities = facets?.nationalities ?? [];
  const users = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">
          User Directory
        </h1>
        <div className="mb-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row">
            <div className="flex-1">
              <UserSearch
                value={filters.q ?? ""}
                onChange={(q) => updateFilters({ q })}
              />
            </div>

            <UserSort
              sort={filters.sort ?? "first_name"}
              direction={filters.direction ?? "asc"}
              onSortChange={(sort) => updateFilters({ sort })}
              onDirectionChange={(direction) => updateFilters({ direction })}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((value) => !value)}
          className="lg:hidden my-4 cursor-pointer"
        >
          {showFilters ? (
            <span className="text-xl font-bold m-2"> ✕ </span>
          ) : (
            <span className="text-3xl font-bold m-2">☰</span>
          )}
          Filters
        </button>
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <UserFilters
              hobbies={hobbies}
              nationalities={nationalities}
              selectedHobbies={filters.hobbies ?? []}
              selectedNationalities={filters.nationalities ?? []}
              onHobbyChange={(hobbies) => updateFilters({ hobbies })}
              onNationalityChange={(nationalities) =>
                updateFilters({ nationalities })
              }
            />
          </div>

          <div>
            {isLoading ? (
              <p>Loading users...</p>
            ) : isError ? (
              <p>Unable to load users.</p>
            ) : users.length > 0 ? (
              <UserGrid users={users} />
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
