import { FacetItem } from '../types/user.types';

interface UserFiltersProps {
  nationalities: FacetItem[];
  selectedNationalities: string[];
  onNationalityChange: (nationalities: string[]) => void;
}

export function UserFilters({
  nationalities,
  selectedNationalities,
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


    </aside>
  );
}