import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, range } from '@utils/helpers';

/**
 * Pagination control component.
 *
 * @param {{
 *   page: number,
 *   totalPages: number,
 *   onPageChange: (page: number) => void,
 *   className?: string,
 * }} props
 */
export default function Pagination({ page, totalPages, onPageChange, className }) {
  if (totalPages <= 1) return null;

  // Build window: always show first, last, current±2
  const buildPages = () => {
    const pages = new Set([1, totalPages]);
    const start = Math.max(2, page - 2);
    const end   = Math.min(totalPages - 1, page + 2);
    range(start, end).forEach((p) => pages.add(p));
    return [...pages].sort((a, b) => a - b);
  };

  const pages  = buildPages();
  const result = [];
  let prev     = 0;

  pages.forEach((p) => {
    if (p - prev > 1) result.push('...');
    result.push(p);
    prev = p;
  });

  const Button = ({ children, active, disabled, onClick, label }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'w-9 h-9 rounded-lg text-sm font-medium flex items-center justify-center',
        'transition-colors duration-150',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        active
          ? 'bg-primary-500 text-white shadow-sm'
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:text-primary-500'
      )}
    >
      {children}
    </button>
  );

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1.5 pt-8', className)}
    >
      {/* Prev */}
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        label="Previous page"
      >
        <ChevronLeft size={16} />
      </Button>

      {/* Pages */}
      {result.map((item, i) =>
        item === '...' ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
            …
          </span>
        ) : (
          <Button
            key={item}
            active={item === page}
            onClick={() => onPageChange(item)}
            label={`Page ${item}`}
          >
            {item}
          </Button>
        )
      )}

      {/* Next */}
      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        label="Next page"
      >
        <ChevronRight size={16} />
      </Button>
    </nav>
  );
}
