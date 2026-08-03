/**
 * General-purpose utility functions.
 */

/**
 * Merge Tailwind class names, filtering out falsy values.
 * Lightweight alternative to clsx + twMerge for simple cases.
 * Import as `cn` everywhere.
 *
 * @example cn('px-4', isActive && 'bg-blue-500', undefined)
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Returns a function that, when called, delays executing `fn`
 * until after `delay` ms have passed since the last invocation.
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Shallow-compare two objects for equality.
 * Useful for memoisation guards.
 */
export const shallowEqual = (a, b) => {
  if (a === b) return true;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => a[k] === b[k]);
};

/**
 * Generate a simple unique id (not cryptographic).
 * Good enough for React keys / temp IDs.
 */
export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);

/**
 * Return a range array: range(1, 5) → [1, 2, 3, 4, 5]
 */
export const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

/**
 * Chunk an array into sub-arrays of size n.
 * chunk([1,2,3,4,5], 2) → [[1,2],[3,4],[5]]
 */
export const chunk = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

/**
 * Pick specified keys from an object.
 */
export const pick = (obj, keys) =>
  keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) acc[key] = obj[key];
    return acc;
  }, {});

/**
 * Capitalise the first letter of every word.
 */
export const toTitleCase = (str) =>
  str.replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Scroll to the top of the page.
 */
export const scrollToTop = (behavior = 'smooth') =>
  window.scrollTo({ top: 0, behavior });

/**
 * Convert a kebab-case or snake_case string to a readable label.
 * "smart-phones" → "Smart Phones"
 */
export const labelFromSlug = (slug) =>
  toTitleCase(slug.replace(/[-_]/g, ' '));
