import { cn } from '@utils/helpers';

/**
 * Numeric badge overlaid on an icon (cart count, wishlist count, etc.).
 *
 * @param {{ count: number, className?: string }} props
 */
export default function Badge({ count = 0, className }) {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        'absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px]',
        'flex items-center justify-center',
        'rounded-full bg-primary-500 text-white text-[10px] font-bold leading-none px-1',
        'ring-2 ring-white dark:ring-gray-900',
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
