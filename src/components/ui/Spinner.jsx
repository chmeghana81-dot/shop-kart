import { cn } from '@utils/helpers';

/**
 * Lightweight inline spinner.
 *
 * @param {{ size?: 'sm'|'md'|'lg', className?: string }} props
 */
const SIZES = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-4',
};

export default function Spinner({ size = 'md', className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block rounded-full border-primary-500 border-t-transparent animate-spin',
        SIZES[size],
        className
      )}
    />
  );
}
