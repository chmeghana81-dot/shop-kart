/**
 * Application-wide configuration constants.
 */

export const APP_NAME    = import.meta.env.VITE_APP_NAME    ?? 'ShopKart';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '1.0.0';

// Pagination
export const DEFAULT_PAGE_SIZE   = 20;
export const PAGE_SIZE_OPTIONS   = [10, 20, 40, 60];

// Commerce
export const TAX_RATE            = 0.18;   // 18 % GST
export const FREE_SHIPPING_ABOVE = 499;    // ₹ 499+  → free shipping
export const SHIPPING_COST       = 49;     // ₹ 49 flat shipping
export const MAX_CART_QUANTITY   = 10;

// Coupons (static demo coupons; replace with backend in production)
export const COUPONS = {
  SAVE10:  { discount: 0.10, label: '10% off' },
  SAVE20:  { discount: 0.20, label: '20% off' },
  FLAT50:  { discount: 50,   label: '₹50 off', flat: true },
};

// Ratings
export const MAX_RATING          = 5;

// Image placeholders
export const PLACEHOLDER_IMAGE   = 'https://placehold.co/400x400?text=No+Image';

// Local storage keys (single source of truth)
export const STORAGE_KEYS = {
  AUTH_TOKEN:    'shopkart_token',
  REFRESH_TOKEN: 'shopkart_refresh_token',
  USER:          'shopkart_user',
  CART:          'shopkart_cart',
  WISHLIST:      'shopkart_wishlist',
  DARK_MODE:     'shopkart_dark_mode',
  REMEMBER_ME:   'shopkart_remember_me',
};

// Sort options used in product listing
export const SORT_OPTIONS = [
  { label: 'Relevance',       value: '' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Rating',          value: 'rating_desc' },
  { label: 'Newest',          value: 'newest' },
  { label: 'Discount',        value: 'discount_desc' },
];

// View mode for product listing
export const VIEW_MODES = { GRID: 'grid', LIST: 'list' };
