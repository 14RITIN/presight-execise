import { ArrowDown, ArrowUp } from 'lucide-react';

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

const SORT_OPTIONS = [
  {
    value: SortField.FirstName,
    label: 'First name',
  },
  {
    value: SortField.LastName,
    label: 'Last name',
  },
  {
    value: SortField.Age,
    label: 'Age',
  },
  {
    value: SortField.Nationality,
    label: 'Nationality',
  },
];

export function UserSort({
  sort,
  direction,
  onSortChange,
  onDirectionChange,
}: UserSortProps) {
  const toggleDirection = () => {
    onDirectionChange(
      direction === SortDirection.Asc
        ? SortDirection.Desc
        : SortDirection.Asc,
    );
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={sort}
        onChange={(event) =>
          onSortChange(event.target.value as SortField)
        }
        aria-label="Sort users by"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={toggleDirection}
        aria-label={
          direction === SortDirection.Asc
            ? 'Sort descending'
            : 'Sort ascending'
        }
        title={
          direction === SortDirection.Asc
            ? 'Ascending'
            : 'Descending'
        }
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-50"
      >
        {direction === SortDirection.Asc ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}