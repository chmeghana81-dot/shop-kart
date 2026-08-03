import { useState, useEffect } from 'react';

/**
 * Returns a debounced copy of `value` that only updates after
 * `delay` ms have passed without a new value being received.
 *
 * @template T
 * @param {T} value
 * @param {number} delay  - milliseconds (default 400)
 * @returns {T}
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
