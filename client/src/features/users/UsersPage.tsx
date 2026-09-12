import { UserGrid } from './components/UserGrid';
import { useUserFilters } from './hooks/useUserFilters';
import { useUsers } from './hooks/useUsers';

export function UsersPage() {
  const { filters } = useUserFilters();

  const {
    data,
    isLoading,
    isError,
  } = useUsers(filters);

  const users =
    data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return <p className="p-6">Loading users...</p>;
  }

  if (isError) {
    return <p className="p-6">Unable to load users.</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">
          User Directory
        </h1>

        {users.length > 0 ? (
          <UserGrid users={users} />
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </main>
  );
}