import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectAutoLoading } from '@redux/slices/authSlice';
import { ROUTES } from '@constants/routes';
import PageLoader from '@components/ui/PageLoader';

/**
 * Wraps any route that requires authentication.
 *
 * - While auto-login is in progress → show PageLoader
 * - Unauthenticated          → redirect to /login (preserves `from` for post-login redirect)
 * - Authenticated            → render children
 *
 * @param {{ children: ReactNode }} props
 */
export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const autoLoading     = useSelector(selectAutoLoading);
  const location        = useLocation();

  if (autoLoading) return <PageLoader />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
