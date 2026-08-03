import { forwardRef } from 'react';
import { cn } from '@utils/helpers';

/**
 * Icon-only circular/rounded button — used in Navbar icons.
 *
 * @param {{ tooltip?: string, className?: string, children: ReactNode }} props
 */
const IconButton = forwardRef(function IconButton(
  { tooltip, className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      title={tooltip}
      aria-label={tooltip}
      className={cn(
        'relative inline-flex items-center justify-center',
        'w-10 h-10 rounded-full',
        'text-gray-700 dark:text-gray-300',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'active:bg-gray-200 dark:active:bg-gray-700',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

export default IconButton;
