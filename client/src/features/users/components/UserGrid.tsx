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
  listClassName="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  itemClassName="h-full"
  computeItemKey={(_, user) => user.id}
  endReached={() => {
    if (hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }}
  itemContent={(_, user) => <UserCard user={user} />}
/>
  );
}