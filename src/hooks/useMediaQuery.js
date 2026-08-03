import { useState, useEffect } from 'react';

/**
 * Returns true when the given CSS media query matches.
 *
 * @param {string} query - e.g. '(max-width: 768px)'
 * @returns {boolean}
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * const isDark   = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql      = window.matchMedia(query);
    const handler  = (e) => setMatches(e.matches);

    // Use the modern addEventListener if available
    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
    } else {
      mql.addListener(handler); // Safari < 14 fallback
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handler);
      } else {
        mql.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}

// Convenience breakpoint hooks (matches Tailwind defaults)
export const useIsMobile  = () => useMediaQuery('(max-width: 639px)');
export const useIsTablet  = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
