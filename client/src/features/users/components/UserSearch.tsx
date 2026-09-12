import { useEffect, useState } from 'react';

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    if (searchValue === value) {
      return;
    }

    const timer = window.setTimeout(() => {
      onChange(searchValue);
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchValue, value, onChange]);

  return (
    <input
      type="search"
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
      placeholder="Search by first or last name..."
      aria-label="Search users"
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  );
}