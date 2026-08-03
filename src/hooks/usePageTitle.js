import { useEffect } from 'react';
import { APP_NAME } from '@constants/app';

/**
 * Dynamically sets `document.title` on mount and restores it on unmount.
 *
 * @param {string}  title         - page-specific title fragment
 * @param {boolean} [appendApp]   - append "| ShopKart" suffix (default true)
 *
 * @example
 * usePageTitle('My Cart');         // → "My Cart | ShopKart"
 * usePageTitle('Home', false);     // → "Home"
 */
export function usePageTitle(title, appendApp = true) {
  useEffect(() => {
    const prev     = document.title;
    document.title = appendApp ? `${title} | ${APP_NAME}` : title;
    return () => {
      document.title = prev;
    };
  }, [title, appendApp]);
}
