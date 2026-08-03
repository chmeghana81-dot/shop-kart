import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  selectIsAuthenticated,
  selectCurrentUser,
  selectAuthLoading,
  selectAuthError,
  logout,
  clearError,
} from '@redux/slices/authSlice';

/**
 * Convenience hook — exposes auth state and actions without
 * importing selectors directly in every component.
 */
export function useAuth() {
  const dispatch        = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user            = useSelector(selectCurrentUser);
  const loading         = useSelector(selectAuthLoading);
  const error           = useSelector(selectAuthError);

  const handleLogout   = useCallback(() => dispatch(logout()),     [dispatch]);
  const handleClearErr = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    isAuthenticated,
    user,
    loading,
    error,
    logout:     handleLogout,
    clearError: handleClearErr,
  };
}
