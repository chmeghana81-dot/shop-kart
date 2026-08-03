import { Star } from 'lucide-react';
import { cn } from '@utils/helpers';

/**
 * Reusable star rating display.
 *
 * @param {{ rating: number, max?: number, size?: number, showValue?: boolean, count?: number }} props
 */
export default function RatingStars({
  rating  = 0,
  max     = 5,
  size    = 16,
  showValue = false,
  count,
  className,
}) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const filled   = i + 1 <= Math.floor(rating);
          const partial  = !filled && i < rating;
          const fraction = partial ? rating - Math.floor(rating) : 0;

          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              {/* Empty star */}
              <Star size={size} className="text-gray-200 dark:text-gray-600 fill-current" />
              {/* Filled overlay */}
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : `${fraction * 100}%` }}
                >
                  <Star size={size} className="text-amber-400 fill-amber-400" />
                </span>
              )}
            </span>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {rating.toFixed(1)}
        </span>
      )}

      {count !== undefined && (
        <span className="text-sm text-gray-400">
          ({count.toLocaleString('en-IN')} reviews)
        </span>
      )}
    </div>
  );
}
