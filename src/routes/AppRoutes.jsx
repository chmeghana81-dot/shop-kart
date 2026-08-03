import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import RootLayout      from '@layouts/RootLayout';
import PageLoader      from '@components/ui/PageLoader';
import ProtectedRoute  from './ProtectedRoute';
import { ROUTES }       from '@constants/routes';

/* ─── Lazy-loaded pages ──────────────────────────────────────── */
const HomePage          = lazy(() => import('@pages/HomePage'));
const ProductsPage      = lazy(() => import('@pages/ProductsPage'));
const CategoriesPage    = lazy(() => import('@pages/CategoriesPage'));
const ProductDetailPage = lazy(() => import('@pages/ProductDetailPage'));
const CartPage          = lazy(() => import('@pages/CartPage'));
const WishlistPage      = lazy(() => import('@pages/WishlistPage'));
const CheckoutPage      = lazy(() => import('@pages/CheckoutPage'));
const LoginPage         = lazy(() => import('@pages/LoginPage'));
const RegisterPage      = lazy(() => import('@pages/RegisterPage'));
const ProfilePage       = lazy(() => import('@pages/ProfilePage'));
const OrdersPage        = lazy(() => import('@pages/OrdersPage'));
const SearchPage        = lazy(() => import('@pages/SearchPage'));
const NotFoundPage      = lazy(() => import('@pages/NotFoundPage'));

/**
 * Central route registry.
 * – Public routes are inside RootLayout.
 * – Protected routes are wrapped with <ProtectedRoute>.
 * – Auth pages have no layout chrome (their own AuthLayout).
 */
export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Routes inside the main layout ── */}
        <Route element={<RootLayout />}>

          {/* Public */}
          <Route index                         element={<HomePage />}          />
          <Route path={ROUTES.PRODUCTS}        element={<ProductsPage />}      />
          <Route path={ROUTES.CATEGORIES}      element={<CategoriesPage />}    />
          <Route path={ROUTES.PRODUCT_STATIC}  element={<ProductDetailPage />} />
          <Route path={ROUTES.SEARCH}          element={<SearchPage />}        />

          {/* Semi-public (works without login but better with) */}
          <Route path={ROUTES.CART}     element={<CartPage />}     />
          <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />

          {/* Protected — must be logged in */}
          <Route
            path={ROUTES.CHECKOUT}
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ORDERS}
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*"    element={<NotFoundPage />} />
        </Route>

        {/* ── Auth routes — no layout chrome ── */}
        <Route path={ROUTES.LOGIN}    element={<LoginPage />}    />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
}
