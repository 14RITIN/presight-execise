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

  const { data, isLoading, isError, error, refetch } = useUsers(filters);

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

          <section>
            {isLoading ? (
              <div className="py-10 text-center text-gray-500">
                Loading users...
              </div>
            ) : isError ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-700">
                  {error instanceof Error
                    ? error.message
                    : "Unable to load users."}
                </p>

                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                >
                  Retry
                </button>
              </div>
            ) : users.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                No users found.
              </div>
            ) : (
              <UserGrid users={users} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
