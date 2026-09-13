import { useEffect, useState } from "react";
import { UserFilters } from "./components/UserFilters";
import { UserGrid } from "./components/UserGrid";
import { UserSearch } from "./components/UserSearch";
import { UserSort } from "./components/UserSort";
import { useUserFilters } from "./hooks/useUserFilters";
import { useUsers } from "./hooks/useUsers";
import { ArrowUp, CircleAlert, RefreshCw, UsersRound } from "lucide-react";
import { UserGridSkeleton } from "./components/UserGridSkeleton";
import { UserFiltersSkeleton } from "./components/UserFiltersSkeleton";
import { SortDirection, SortField } from "./types/user.types";
import { useUserFilterOptions } from "./hooks/useUserFilterOptions";
import { UserFilterSelects } from "./components/UserFilterSelects";

export function UsersPage() {
  const { filters, updateFilters } = useUserFilters();
  const [showFilters, setShowFilters] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useUsers(filters);

  const facets = data?.pages[0]?.facets;
  const hobbies = facets?.hobbies ?? [];
  const nationalities = facets?.nationalities ?? [];
  const users = data?.pages.flatMap((page) => page.data) ?? [];
  const totalUsers = data?.pages[0]?.pagination.total ?? 0;

  const hasData = users.length > 0;
  const isInitialError = isError && !hasData;
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { data: filterOptions, isLoading: isFilterOptionsLoading } =
    useUserFilterOptions();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            {!isFilterOptionsLoading && filterOptions && (
              <UserFilterSelects
                hobbies={filterOptions.hobbies}
                nationalities={filterOptions.nationalities}
                selectedHobbies={filters.hobbies ?? []}
                selectedNationalities={filters.nationalities ?? []}
                onHobbiesChange={(hobbies) => updateFilters({ hobbies })}
                onNationalitiesChange={(nationalities) =>
                  updateFilters({ nationalities })
                }
              />
            )}
            <UserSort
              sort={filters.sort ?? SortField.FirstName}
              direction={filters.direction ?? SortDirection.Asc}
              onSortChange={(sort) => updateFilters({ sort })}
              onDirectionChange={(direction) => updateFilters({ direction })}
            />
          </div>
        </div>

        <div className="sticky top-0 z-20 mb-4 border-b border-gray-200 bg-gray-50/95 py-3 backdrop-blur">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {users.length.toLocaleString()}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {totalUsers.toLocaleString()}
            </span>{" "}
            users
          </p>
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
            {isLoading ? (
              <UserFiltersSkeleton />
            ) : (
              <UserFilters
                hobbies={hobbies}
                nationalities={nationalities}
                selectedHobbies={filters.hobbies ?? []}
                selectedNationalities={filters.nationalities ?? []}
                onHobbyChange={(hobbies) => updateFilters({ hobbies })}
                onNationalityChange={(nationalities) =>
                  updateFilters({ nationalities })
                }
                onReset={() =>
                  updateFilters({
                    hobbies: [],
                    nationalities: [],
                  })
                }
              />
            )}
          </div>
          <section>
            {isLoading ? (
              <UserGridSkeleton />
            ) : isInitialError ? (
              <div className="flex flex-col items-center justify-center py-16">
                <CircleAlert className="mb-4 h-14 w-14 text-red-400" />

                <p className="text-sm text-gray-700">
                  {error instanceof Error
                    ? error.message
                    : "Unable to load users."}
                </p>

                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </button>
              </div>
            ) : users.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <UsersRound className="mb-4 h-14 w-14 text-gray-300" />

                <p className="font-medium text-gray-700">No users found</p>
                <p className="mt-1 text-sm">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <>
                <UserGrid
                  users={users}
                  hasNextPage={Boolean(hasNextPage)}
                  isFetchingNextPage={isFetchingNextPage}
                  onLoadMore={() => {
                    fetchNextPage();
                  }}
                />

                {isFetchingNextPage && (
                  <div className="mt-4">
                    <UserGridSkeleton />
                  </div>
                )}

                {isFetchNextPageError && (
                  <div className="py-6 text-center">
                    <p className="text-sm text-gray-500">
                      Unable to load more users.
                    </p>

                    <button
                      type="button"
                      onClick={() => fetchNextPage()}
                      className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                    >
                      Retry
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
      {showScrollTop && (
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          aria-label="Scroll to top"
          title="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-lime-600 text-white shadow-lg transition hover:bg-lime-700"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </main>
  );
}
