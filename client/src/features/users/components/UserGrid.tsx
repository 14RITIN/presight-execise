import { User } from '../types/user.types';
import { UserCard } from './UserCard';

interface UserGridProps {
  users: User[];
}

export function UserGrid({ users }: UserGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}