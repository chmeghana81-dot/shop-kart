import { forwardRef } from 'react';
import { cn } from '@utils/helpers';

/**
 * Polymorphic, variant-driven button component.
 *
 * Variants : primary | secondary | ghost | danger | outline
 * Sizes    : sm | md | lg
 */
const VARIANTS = {
  primary:
    'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-sm',
  secondary:
    'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 text-gray-800 dark:text-gray-200',
  ghost:
    'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
  danger:
    'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-sm',
  outline:
    'border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 bg-transparent',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-7 py-3   text-base rounded-xl',
};

const Button = forwardRef(function Button(
  {
    variant  = 'primary',
    size     = 'md',
    loading  = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold',
        'transition-all duration-200 ease-in-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size]       ?? SIZES.md,
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {loading ? (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
});

export default Button;
