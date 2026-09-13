import { RotateCcw } from "lucide-react";
import { FacetItem } from "../types/user.types";

interface UserFiltersProps {
  hobbies: FacetItem[];
  nationalities: FacetItem[];
  selectedHobbies: string[];
  selectedNationalities: string[];
  onHobbyChange: (hobbies: string[]) => void;
  onNationalityChange: (nationalities: string[]) => void;
  onReset: () => void;
}

export function UserFilters({
  hobbies,
  nationalities,
  selectedHobbies,
  selectedNationalities,
  onHobbyChange,
  onNationalityChange,
  onReset,
}: UserFiltersProps) {
  const toggleValue = (
    value: string,
    selectedValues: string[],
    onChange: (values: string[]) => void,
  ) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((item) => item !== value));
      return;
    }

    onChange([...selectedValues, value]);
  };

  const hasSelectedFilters =
    selectedHobbies.length > 0 || selectedNationalities.length > 0;

  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-4">
      <div>
        <h2 className="flex items-center justify-between mb-3 font-semibold text-gray-900">
          Nationality{" "}
          <span className="text-gray-600 text-xs font-light">
            (Top 20 nationality)
          </span>
          {hasSelectedFilters && (
            <button
              type="button"
              onClick={onReset}
              aria-label="Reset filters"
              title="Reset filters"
              className="cursor-pointer rounded-md p-1.5  text-gray-500 transition hover:bg-gray-100 hover:text-lime-600 "
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </h2>

        <div className="space-y-2">
          {nationalities.map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center justify-between gap-3 text-sm"
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedNationalities.includes(item.value)}
                  onChange={() =>
                    toggleValue(
                      item.value,
                      selectedNationalities,
                      onNationalityChange,
                    )
                  }
                  className="h-4 w-4
                                cursor-pointer
                                rounded
                                border-gray-300
                                text-gray-600
                               accent-lime-600
                                focus:ring-2
                                focus:ring-lime-200
                            "
                />

                <label
                  key={item.value}
                  className="flex cursor-pointer items-center justify-between
                            rounded-md px-2 py-1.5
                            text-sm text-gray-700
                            transition
                            hover:bg-gray-50
                        "
                >
                  {item.value}
                </label>
              </span>

              <span className="text-xs font-medium text-gray-500">
                {item.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-5">
        <h2 className="flex items-center justify-between mb-3 font-semibold text-gray-900">
          Hobbies{" "}
          <span className="text-gray-600 text-xs font-light">
            (Top 20 Hobbies)
          </span>
          {hasSelectedFilters && (
            <button
              type="button"
              onClick={onReset}
              aria-label="Reset filters"
              title="Reset filters"
              className="cursor-pointer rounded-md p-1.5  text-gray-500 transition hover:bg-gray-100 hover:text-lime-600 "
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </h2>

        <div className="space-y-2">
          {hobbies.map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center justify-between gap-3 text-sm"
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedHobbies.includes(item.value)}
                  onChange={() =>
                    toggleValue(item.value, selectedHobbies, onHobbyChange)
                  }
                  className="h-4 w-4
                                cursor-pointer
                                rounded
                                border-gray-300
                                text-gray-600
                               accent-lime-600
                                focus:ring-2
                                focus:ring-lime-200
                            "
                />
                <label
                  key={item.value}
                  className="flex cursor-pointer items-center justify-between
                        rounded-md px-2 py-1.5
                        text-sm text-gray-700
                        transition
                        hover:bg-gray-50
  "
                >
                  {item.value}
                </label>
              </span>

              <span className="text-xs font-medium text-gray-500">
                {item.count}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
