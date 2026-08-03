import { X } from 'lucide-react';
import { cn, labelFromSlug } from '@utils/helpers';

/**
 * Displays active filters as removable chips below the sort bar.
 */
export default function FilterChips({ filters, onRemove, onReset }) {
  const chips = [];

  if (filters.category)    chips.push({ key: 'category',  label: labelFromSlug(filters.category) });
  if (filters.brand)       chips.push({ key: 'brand',     label: filters.brand });
  if (filters.minRating)   chips.push({ key: 'minRating', label: `${filters.minRating}★ & above` });
  if (filters.minPrice)    chips.push({ key: 'minPrice',  label: `Min ₹${filters.minPrice}` });
  if (filters.maxPrice < 10000) chips.push({ key: 'maxPrice', label: `Max ₹${filters.maxPrice}` });
  if (filters.q)           chips.push({ key: 'q',         label: `"${filters.q}"` });

  if (chips.length === 0) return null;

  const getResetValue = (key) => {
    switch (key) {
      case 'minRating': return { minRating: 0 };
      case 'minPrice':  return { minPrice:  0 };
      case 'maxPrice':  return { maxPrice:  10000 };
      default:          return { [key]: '' };
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-gray-400 font-medium">Active:</span>

      {chips.map((chip) => (
        <span
          key={chip.key}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
            'bg-primary-50 dark:bg-primary-950/40',
            'text-primary-700 dark:text-primary-300',
            'text-xs font-medium border border-primary-200 dark:border-primary-800'
          )}
        >
          {chip.label}
          <button
            onClick={() => onRemove(getResetValue(chip.key))}
            aria-label={`Remove ${chip.label} filter`}
            className="hover:text-primary-900 dark:hover:text-primary-100 transition-colors"
          >
            <X size={12} />
          </button>
        </span>
      ))}

      {chips.length > 1 && (
        <button
          onClick={onReset}
          className="text-xs text-gray-500 hover:text-red-500 font-medium transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
