import { cn } from '@utils/helpers';

/**
 * Skeleton placeholder that matches ProductCard dimensions.
 * Used while products are loading.
 *
 * @param {{ variant?: 'grid'|'list', className?: string }} props
 */
export default function SkeletonCard({ variant = 'grid', className }) {
  if (variant === 'list') {
    return (
      <div className={cn('card flex gap-4 p-4 animate-pulse', className)}>
        <div className="skeleton w-32 h-32 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
          <div className="skeleton h-3 w-1/3 rounded" />
          <div className="skeleton h-8 w-28 rounded-lg mt-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('card overflow-hidden animate-pulse', className)}>
      {/* Image area */}
      <div className="skeleton aspect-square w-full" />
      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-16 rounded" />
          <div className="skeleton h-4 w-12 rounded" />
        </div>
        <div className="skeleton h-9 w-full rounded-lg" />
      </div>
    </div>
  );
}
