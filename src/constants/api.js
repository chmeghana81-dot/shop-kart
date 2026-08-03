/**
 * DummyJSON API endpoint map.
 * All paths are relative to VITE_API_BASE_URL.
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN:      '/auth/login',
  AUTH_REFRESH:    '/auth/refresh',
  AUTH_ME:         '/auth/me',

  // Products
  PRODUCTS:        '/products',
  PRODUCT_BY_ID:   (id)       => `/products/${id}`,
  PRODUCTS_SEARCH: '/products/search',
  PRODUCTS_CATEGORY: (cat)    => `/products/category/${cat}`,
  CATEGORIES:      '/products/categories',

  // Users
  USERS:           '/users',
  USER_BY_ID:      (id)       => `/users/${id}`,
  USER_CART:       (id)       => `/users/${id}/carts`,
  USER_ORDERS:     (id)       => `/users/${id}/orders`,

  // Carts
  CARTS:           '/carts',
  CART_BY_ID:      (id)       => `/carts/${id}`,
  CART_ADD:        '/carts/add',
};
