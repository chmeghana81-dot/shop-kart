import { Minus, Plus } from 'lucide-react';
import { cn } from '@utils/helpers';
import { MAX_CART_QUANTITY } from '@constants/app';

/**
 * +/− quantity control used on product detail and cart pages.
 *
 * @param {{ value: number, min?: number, max?: number, onChange: (n: number) => void, size?: 'sm'|'md' }} props
 */
export default function QuantitySelector({
  value    = 1,
  min      = 1,
  max      = MAX_CART_QUANTITY,
  onChange,
  size     = 'md',
  disabled = false,
}) {
  const isSmall = size === 'sm';

  const dec = () => { if (value > min)  onChange(value - 1); };
  const inc = () => { if (value < max)  onChange(value + 1); };

  return (
    <div
      className={cn(
        'inline-flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden',
        disabled && 'opacity-50 pointer-events-none'
      )}
    >
      <button
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(
          'flex items-center justify-center transition-colors duration-150',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          isSmall ? 'w-7 h-7' : 'w-10 h-10'
        )}
      >
        <Minus size={isSmall ? 12 : 16} />
      </button>

      <span
        className={cn(
          'border-x border-gray-200 dark:border-gray-700',
          'text-center font-semibold text-gray-900 dark:text-white tabular-nums',
          isSmall ? 'w-8 h-7 text-xs leading-7' : 'w-12 h-10 text-sm leading-10'
        )}
      >
        {value}
      </span>

      <button
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(
          'flex items-center justify-center transition-colors duration-150',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          isSmall ? 'w-7 h-7' : 'w-10 h-10'
        )}
      >
        <Plus size={isSmall ? 12 : 16} />
      </button>
    </div>
  );
}
