/**
 * Named client-side routes.
 * Import from here instead of hard-coding strings in Links/navigate().
 */
export const ROUTES = {
  HOME:           '/',
  PRODUCTS:       '/products',
  CATEGORIES:     '/categories',
  PRODUCT:        (id) => `/products/${id}`,
  PRODUCT_STATIC: '/products/:id',
  SEARCH:         '/search',
  CART:           '/cart',
  WISHLIST:       '/wishlist',
  CHECKOUT:       '/checkout',
  LOGIN:          '/login',
  REGISTER:       '/register',
  PROFILE:        '/profile',
  ORDERS:         '/orders',
  ORDER:          (id) => `/orders/${id}`,
  NOT_FOUND:      '/404',
};
