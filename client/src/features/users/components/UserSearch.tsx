import { useEffect, useState } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  const { key: navigationKey } = useLocation();
  const navigationType = useNavigationType();
  const [searchValue, setSearchValue] = useState(value);
  const [previousNavigationKey, setPreviousNavigationKey] = useState(navigationKey);

  // Preserve the draft when its trimmed value is committed to the URL.
  // History navigation and changes to the committed query restore URL state.
  if (previousNavigationKey !== navigationKey) {
    setPreviousNavigationKey(navigationKey);
    if (navigationType === 'POP' || searchValue.trim() !== value) {
      setSearchValue(value);
    }
  }

  useEffect(() => {
    const query = searchValue.trim();
    if (query === value.trim()) {
      return;
    }

    const timer = window.setTimeout(() => {
      onChange(query);
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
