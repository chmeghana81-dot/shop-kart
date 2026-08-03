import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { cn } from '@utils/helpers';
import { ROUTES } from '@constants/routes';

/**
 * Debounced search bar that lives inside the Navbar.
 * On submit (Enter or button click) it navigates to /search?q=<query>.
 */
export default function NavSearchBar({ className }) {
  const [query, setQuery]   = useState('');
  const navigate            = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const q = query.trim();
      if (q) navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(q)}`);
    },
    [query, navigate]
  );

  const handleClear = useCallback(() => setQuery(''), []);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative flex items-center group', className)}
      role="search"
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products, brands and more…"
        aria-label="Search products"
        className={cn(
          'w-full pl-4 pr-20 py-2.5 rounded-full',
          'bg-gray-100 dark:bg-gray-800',
          'border border-transparent',
          'group-focus-within:border-primary-500 group-focus-within:bg-white dark:group-focus-within:bg-gray-900',
          'text-sm text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400',
          'transition-all duration-200',
          'outline-none'
        )}
      />

      {/* Clear button */}
      {query.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X size={16} />
        </button>
      )}

      {/* Search submit */}
      <button
        type="submit"
        aria-label="Submit search"
        className={cn(
          'absolute right-0 h-full px-3 rounded-r-full',
          'text-gray-500 hover:text-primary-500 transition-colors'
        )}
      >
        <Search size={18} />
      </button>
    </form>
  );
}
