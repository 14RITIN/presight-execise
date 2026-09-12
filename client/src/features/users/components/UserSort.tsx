import {
  SortDirection,
  SortField,
} from '../types/user.types';

interface UserSortProps {
  sort: SortField;
  direction: SortDirection;
  onSortChange: (sort: SortField) => void;
  onDirectionChange: (direction: SortDirection) => void;
}

export function UserSort({
  sort,
  direction,
  onSortChange,
  onDirectionChange,
}: UserSortProps) {
  return (
    <div className="flex gap-2">
      <select
        value={sort}
        onChange={(event) =>
          onSortChange(event.target.value as SortField)
        }
        aria-label="Sort users by"
        className="rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm"
      >
        <option value="first_name">First name</option>
        <option value="last_name">Last name</option>
        <option value="age">Age</option>
        <option value="nationality">Nationality</option>
      </select>

      <select
        value={direction}
        onChange={(event) =>
          onDirectionChange(event.target.value as SortDirection)
        }
        aria-label="Sort direction"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      
    </div>
  );
}