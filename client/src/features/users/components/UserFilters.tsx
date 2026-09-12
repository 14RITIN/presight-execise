import { FacetItem } from '../types/user.types';

interface UserFiltersProps {
  hobbies: FacetItem[];
  nationalities: FacetItem[];
  selectedHobbies: string[];
  selectedNationalities: string[];
  onHobbyChange: (hobbies: string[]) => void;
  onNationalityChange: (nationalities: string[]) => void;
}

export function UserFilters({
  hobbies,
  nationalities,
  selectedHobbies,
  selectedNationalities,
  onHobbyChange,
  onNationalityChange,
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

  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-4">
      <div>
        <h2 className="mb-3 font-semibold text-gray-900">
          Nationality
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
                />

                {item.value}
              </span>

              <span className="text-gray-500">
                {item.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-5">
        <h2 className="mb-3 font-semibold text-gray-900">
          Hobbies
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
                    toggleValue(
                      item.value,
                      selectedHobbies,
                      onHobbyChange,
                    )
                  }
                />

                {item.value}
              </span>

              <span className="text-gray-500">
                {item.count}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}