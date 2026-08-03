import { cn } from '@utils/helpers';

/**
 * Displays stock / availability status chip.
 *
 * @param {{ stock: number, availabilityStatus?: string }} props
 */
export default function ProductBadges({ stock = 0, availabilityStatus }) {
  const status = availabilityStatus?.toLowerCase() ?? (stock > 0 ? 'in stock' : 'out of stock');

  const config = {
    'in stock':          { bg: 'bg-green-50 dark:bg-green-950/40',  text: 'text-green-700 dark:text-green-400',  label: `In Stock (${stock})` },
    'low stock':         { bg: 'bg-amber-50 dark:bg-amber-950/40',  text: 'text-amber-700 dark:text-amber-400',  label: `Only ${stock} left!` },
    'out of stock':      { bg: 'bg-red-50   dark:bg-red-950/40',    text: 'text-red-700   dark:text-red-400',    label: 'Out of Stock'        },
  };

  const c = config[status] ?? config['in stock'];

  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold', c.bg, c.text)}>
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full mr-1.5',
          status === 'in stock'     ? 'bg-green-500' :
          status === 'low stock'    ? 'bg-amber-500' : 'bg-red-500'
        )}
      />
      {c.label}
    </span>
  );
}
