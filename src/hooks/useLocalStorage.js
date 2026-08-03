import { useState, useCallback } from 'react';
import { getStorage, setStorage, removeStorage } from '@utils/storage';

/**
 * useState-like hook that persists state to localStorage.
 *
 * @template T
 * @param {string}  key            - localStorage key
 * @param {T}       initialValue   - fallback when key doesn't exist
 * @returns {[T, (value: T | ((prev: T) => T)) => void, () => void]}
 *   [storedValue, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = getStorage(key);
    return item !== null ? item : initialValue;
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = typeof value === 'function' ? value(prev) : value;
        setStorage(key, next);
        return next;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    removeStorage(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
