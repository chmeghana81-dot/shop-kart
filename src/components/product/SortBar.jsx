import { LayoutGrid, LayoutList, SlidersHorizontal } from 'lucide-react';
import { cn } from '@utils/helpers';
import { SORT_OPTIONS, VIEW_MODES, PAGE_SIZE_OPTIONS } from '@constants/app';

/**
 * Top bar above the product grid:
 * – Result count
 * – Sort dropdown
 * – Page size selector
 * – Grid / List view toggle
 * – Filter toggle (mobile)
 */
export default function SortBar({
  total,
  sort,
  view,
  pageSize,
  onSortChange,
  onViewChange,
  onPageSizeChange,
  onFilterToggle,
  loading,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-gray-100 dark:border-gray-700 mb-4">

      {/* Left — result count + filter toggle */}
      <div className="flex items-center gap-3">
        {/* Mobile filter button */}
        <button
          onClick={onFilterToggle}
          className="flex items-center gap-2 lg:hidden btn-secondary text-xs py-1.5 px-3"
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>

        {!loading && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {total.toLocaleString('en-IN')}
            </span>{' '}
            result{total !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Right — sort + page-size + view toggle */}
      <div className="flex items-center gap-2">

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort products"
          className="input-field py-1.5 text-sm w-44 rounded-lg"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {/* Page size */}
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          aria-label="Products per page"
          className="input-field py-1.5 text-sm w-20 rounded-lg hidden sm:block"
        >
          {PAGE_SIZE_OPTIONS.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        {/* View toggle */}
        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange(VIEW_MODES.GRID)}
            aria-label="Grid view"
            className={cn(
              'p-2 transition-colors duration-150',
              view === VIEW_MODES.GRID
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => onViewChange(VIEW_MODES.LIST)}
            aria-label="List view"
            className={cn(
              'p-2 transition-colors duration-150',
              view === VIEW_MODES.LIST
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <LayoutList size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
