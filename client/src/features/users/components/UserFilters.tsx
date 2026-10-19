import { FacetItem } from "../types/user.types";

interface UserFiltersProps {
  hobbies: FacetItem[];
  nationalities: FacetItem[];
}

export function UserFilters({ hobbies, nationalities }: UserFiltersProps) {
  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-4">
      <div>
        <h2 className="flex items-center justify-between mb-3 font-semibold text-gray-900">
          Nationality
          <span className="text-gray-600 text-xs font-light">
            (Top 20 nationalities)
          </span>
        </h2>
        <ul className="space-y-2">
          {nationalities.map((item) => (
            <li
              key={item.value}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="rounded-md px-2 py-1.5 text-gray-700">
                {item.value}
              </span>
              <span className="text-xs font-medium text-gray-500">
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-5">
        <h2 className="flex items-center justify-between mb-3 font-semibold text-gray-900">
          Hobbies
          <span className="text-gray-600 text-xs font-light">
            (Top 20 hobbies)
          </span>
        </h2>
        <ul className="space-y-2">
          {hobbies.map((item) => (
            <li
              key={item.value}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="rounded-md px-2 py-1.5 text-gray-700">
                {item.value}
              </span>
              <span className="text-xs font-medium text-gray-500">
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
