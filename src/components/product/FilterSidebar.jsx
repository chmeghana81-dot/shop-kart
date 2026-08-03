import { memo, useCallback } from 'react';
import { X, SlidersHorizontal, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, labelFromSlug } from '@utils/helpers';
import { SORT_OPTIONS } from '@constants/app';

const POPULAR_BRANDS = [
  'Apple', 'Samsung', 'Huawei', 'OPPO', 'Microsoft',
  'HP', 'Dell', 'Lenovo', 'L\'Oreal', 'Maybelline',
];

const RATING_OPTIONS = [4, 3, 2, 1];

/**
 * Product filters sidebar — category, brand, rating, price range.
 *
 * @param {{
 *   filters: object,
 *   categories: string[],
 *   onFilterChange: (patch: object) => void,
 *   onReset: () => void,
 *   isOpen: boolean,
 *   onClose: () => void,
 * }} props
 */
const FilterSidebar = memo(function FilterSidebar({
  filters,
  categories,
  onFilterChange,
  onReset,
  isOpen,
  onClose,
}) {
  const hasActiveFilters =
    filters.category || filters.brand || filters.minRating > 0 ||
    filters.minPrice > 0 || filters.maxPrice < 10000;

  const Section = ({ title, children }) => (
    <div className="pb-5 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        {title}
      </h4>
      {children}
    </div>
  );

  return (
    <>
      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar panel ── */}
      <aside
        className={cn(
          // Mobile: fixed drawer
          'fixed top-0 left-0 h-full z-50 w-72 overflow-y-auto',
          'bg-white dark:bg-gray-900',
          'transition-transform duration-300 ease-in-out',
          'lg:static lg:translate-x-0 lg:h-auto lg:z-auto lg:w-56 xl:w-64',
          'lg:bg-transparent lg:overflow-visible',
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full',
        )}
        aria-label="Product filters"
      >
        <div className="p-5 lg:p-0 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-primary-500" />
              <span className="font-bold text-gray-900 dark:text-white text-sm">Filters</span>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={onReset}
                  className="text-xs text-primary-500 hover:text-primary-600 font-semibold transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ── Categories ── */}
          <Section title="Category">
            <ul className="space-y-1 max-h-52 overflow-y-auto no-scrollbar">
              <li>
                <button
                  onClick={() => onFilterChange({ category: '' })}
                  className={cn(
                    'w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors duration-100',
                    !filters.category
                      ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onFilterChange({ category: cat })}
                    className={cn(
                      'w-full text-left px-2 py-1.5 rounded-lg text-sm capitalize transition-colors duration-100',
                      filters.category === cat
                        ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    )}
                  >
                    {labelFromSlug(cat)}
                  </button>
                </li>
              ))}
            </ul>
          </Section>

          {/* ── Brands ── */}
          <Section title="Brand">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => onFilterChange({ brand: '' })}
                  className={cn(
                    'w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors',
                    !filters.brand
                      ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  All Brands
                </button>
              </li>
              {POPULAR_BRANDS.map((brand) => (
                <li key={brand}>
                  <button
                    onClick={() => onFilterChange({ brand: filters.brand === brand ? '' : brand })}
                    className={cn(
                      'w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors',
                      filters.brand === brand
                        ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    )}
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </Section>

          {/* ── Rating ── */}
          <Section title="Customer Rating">
            <ul className="space-y-1">
              {RATING_OPTIONS.map((r) => (
                <li key={r}>
                  <button
                    onClick={() => onFilterChange({ minRating: filters.minRating === r ? 0 : r })}
                    className={cn(
                      'flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm transition-colors',
                      filters.minRating === r
                        ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    )}
                  >
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={12}
                          className={s <= r ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-current'}
                        />
                      ))}
                    </div>
                    <span>& above</span>
                  </button>
                </li>
              ))}
            </ul>
          </Section>

          {/* ── Price range ── */}
          <Section title="Price Range">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>₹{filters.minPrice.toLocaleString('en-IN')}</span>
                <span className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span>₹{filters.maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-500">Min price</label>
                <input
                  type="range"
                  min={0}
                  max={filters.maxPrice - 100}
                  step={100}
                  value={filters.minPrice}
                  onChange={(e) => onFilterChange({ minPrice: Number(e.target.value) })}
                  className="w-full accent-primary-500"
                />
                <label className="text-xs text-gray-500">Max price</label>
                <input
                  type="range"
                  min={filters.minPrice + 100}
                  max={10000}
                  step={100}
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                  className="w-full accent-primary-500"
                />
              </div>
            </div>
          </Section>
        </div>
      </aside>
    </>
  );
});

export default FilterSidebar;
