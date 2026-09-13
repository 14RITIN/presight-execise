import { VirtuosoGrid } from 'react-virtuoso';

import { User } from '../types/user.types';
import { UserCard } from './UserCard';

interface UserGridProps {
  users: User[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

export function UserGrid({
  users,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: UserGridProps) {
  return (
    <VirtuosoGrid
      useWindowScroll
      data={users}
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          onLoadMore();
        }
      }}
      listClassName="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      itemContent={(_, user) => <UserCard user={user} />}
    />
  );
}