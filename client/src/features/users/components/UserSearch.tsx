import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  const { key: navigationKey } = useLocation();
  const [searchValue, setSearchValue] = useState(value);
  const [previousNavigationKey, setPreviousNavigationKey] = useState(navigationKey);

  // Discard pending input on reset or history navigation, even if q is unchanged.
  // This is only the existing debounce draft; committed filters live in the URL.
  if (previousNavigationKey !== navigationKey) {
    setPreviousNavigationKey(navigationKey);
    setSearchValue(value);
  }

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