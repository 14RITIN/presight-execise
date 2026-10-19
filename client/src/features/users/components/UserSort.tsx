import Select from "react-select";
import { getSelectStyles } from "./select.styles";

import { ArrowDown, ArrowUp } from "lucide-react";

import { SortDirection, SortField } from "../types/user.types";

interface UserSortProps {
  sort: SortField;
  direction: SortDirection;
  onSortChange: (sort: SortField) => void;
  onDirectionChange: (direction: SortDirection) => void;
}

const SORT_OPTIONS = [
  {
    value: SortField.FirstName,
    label: "First name",
  },
  {
    value: SortField.LastName,
    label: "Last name",
  },
  {
    value: SortField.Age,
    label: "Age",
  },
  {
    value: SortField.Nationality,
    label: "Nationality",
  },
];

const sortStyles = getSelectStyles<(typeof SORT_OPTIONS)[number], false>();

export function UserSort({
  sort,
  direction,
  onSortChange,
  onDirectionChange,
}: UserSortProps) {
  const toggleDirection = () => {
    onDirectionChange(
      direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc,
    );
  };

  return (
    <div className="flex w-full shrink-0 items-center gap-2 sm:w-[220px]">
      <Select
        className="min-w-0 flex-1"
        options={SORT_OPTIONS}
        value={SORT_OPTIONS.find((option) => option.value === sort)}
        onChange={(option) => {
          if (option) onSortChange(option.value);
        }}
        isMulti={false}
        isClearable={false}
        isSearchable={false}
        aria-label="Sort users by"
        styles={sortStyles}
      />

      <button
        type="button"
        onClick={toggleDirection}
        aria-label={
          direction === SortDirection.Asc ? "Sort descending" : "Sort ascending"
        }
        title={direction === SortDirection.Asc ? "Ascending" : "Descending"}
        className="flex h-11 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-50"
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
