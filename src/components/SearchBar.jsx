import { useContacts } from '../context/ContactContext';
import { useDebounce } from '../hooks/useDebounce';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const { dispatch } = useContacts();
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    dispatch({ type: 'SET_SEARCH', payload: debouncedSearch });
  }, [debouncedSearch, dispatch]);

  return (
    <input
      type="text"
      placeholder="Search contacts..."
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700 border-gray-200 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 outline-teal-600/8"
    />
  );
}