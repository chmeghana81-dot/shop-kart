/**
 * Type-safe localStorage helpers with JSON serialisation.
 * All methods are wrapped in try/catch — private/incognito
 * mode can throw even on read attempts.
 */

/** Read a value from localStorage (returns null on miss / error) */
export const getStorage = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/** Write a value to localStorage. Returns true on success. */
export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/** Remove a single key from localStorage. */
export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
};

/** Remove multiple keys at once. */
export const removeStorageKeys = (...keys) => {
  keys.forEach(removeStorage);
};

/** Check if a key exists in localStorage. */
export const hasStorage = (key) => {
  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
};
