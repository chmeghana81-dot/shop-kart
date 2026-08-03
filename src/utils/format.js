/**
 * Formatting utilities — currency, dates, numbers, percentages.
 */

/** Format a number as Indian Rupees */
export const formatCurrency = (amount, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', {
    style:                 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

/** Format a date string / Date object to a readable string */
export const formatDate = (date, options = {}) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
    ...options,
  }).format(d);
};

/** Shorten large numbers: 1200 → 1.2K, 1200000 → 1.2M */
export const formatCompactNumber = (num) =>
  new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(num);

/** Convert decimal discount to percentage string: 0.18 → "18%" */
export const formatDiscount = (discount) =>
  `${Math.round(discount * 100)}%`;

/**
 * Calculate the discounted price.
 * DummyJSON provides `price` (already discounted) and `discountPercentage`.
 * This helper restores the original MRP and returns both.
 */
export const calcPricing = (price, discountPercentage) => {
  const discount      = discountPercentage ?? 0;
  const originalPrice = price / (1 - discount / 100);
  return {
    salePrice:     Math.round(price),
    originalPrice: Math.round(originalPrice),
    savings:       Math.round(originalPrice - price),
    discountLabel: discount > 0 ? `${Math.round(discount)}% off` : null,
  };
};

/** Clamp a value between min and max */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/** Truncate a string to maxLength and append ellipsis */
export const truncate = (str, maxLength = 80) =>
  str && str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;

/** Generate a star array for rating display: (3.7, 5) → [1,1,1,0.7,0] */
export const buildStarArray = (rating, max = 5) => {
  const stars = [];
  for (let i = 0; i < max; i++) {
    if (rating >= i + 1) stars.push(1);
    else if (rating > i) stars.push(+(rating - i).toFixed(1));
    else stars.push(0);
  }
  return stars;
};
