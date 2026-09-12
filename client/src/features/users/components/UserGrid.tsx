import { User } from '../types/user.types';
import { UserCard } from './UserCard';

interface UserGridProps {
  users: User[];
}

export function UserGrid({ users }: UserGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}