import { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppRoutes    from '@routes/AppRoutes';
import PageLoader   from '@components/ui/PageLoader';
import { fetchMeThunk, selectAutoLoading } from '@redux/slices/authSlice';
import { STORAGE_KEYS } from '@constants/app';
import { getStorage } from '@utils/storage';

/**
 * Root application component.
 *
 * Responsibilities:
 *  1. Apply dark/light class to <html>
 *  2. Boot auto-login: if a token exists in storage, fetch /auth/me
 *     to hydrate the user object without requiring re-login.
 */
export default function App() {
  const dispatch    = useDispatch();
  const darkMode    = useSelector((state) => state.ui?.darkMode ?? false);
  const autoLoading = useSelector(selectAutoLoading);

  /* Apply dark mode class */
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  /* Auto-login on app boot */
  useEffect(() => {
    const hasToken = Boolean(getStorage(STORAGE_KEYS.AUTH_TOKEN)) ||
      (() => {
        try { return Boolean(sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)); } catch { return false; }
      })();

    if (hasToken) {
      dispatch(fetchMeThunk());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* While auto-login is in flight, show full-screen loader */
  if (autoLoading) return <PageLoader />;

  return (
    <Suspense fallback={<PageLoader />}>
      <AppRoutes />
    </Suspense>
  );
}
