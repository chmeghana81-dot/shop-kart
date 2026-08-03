import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS, MAX_CART_QUANTITY, TAX_RATE, FREE_SHIPPING_ABOVE, SHIPPING_COST, COUPONS } from '@constants/app';
import { getStorage, setStorage } from '@utils/storage';

/* ─── Helpers ───────────────────────────────────────────────── */

const recalc = (items, coupon = null) => {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  // Coupon discount
  let discount = 0;
  if (coupon) {
    discount = coupon.flat
      ? Math.min(coupon.discount, subtotal)
      : subtotal * coupon.discount;
  }

  const discountedSubtotal = subtotal - discount;
  const tax                = Math.round(discountedSubtotal * TAX_RATE);
  const shipping           = discountedSubtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_COST;
  const total              = Math.round(discountedSubtotal + tax + shipping);
  const totalItems         = items.reduce((s, i) => s + i.quantity, 0);

  return { subtotal: Math.round(subtotal), discount: Math.round(discount), tax, shipping, total, totalItems };
};

const persist = (state) => {
  setStorage(STORAGE_KEYS.CART, {
    items:      state.items,
    coupon:     state.coupon,
    couponCode: state.couponCode,
    ...recalc(state.items, state.coupon),
  });
};

const loadCart = () => {
  const saved = getStorage(STORAGE_KEYS.CART);
  if (saved) return saved;
  return { items: [], coupon: null, couponCode: '', subtotal: 0, discount: 0, tax: 0, shipping: 0, total: 0, totalItems: 0 };
};

/* ─── Slice ─────────────────────────────────────────────────── */

const initialState = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart(state, action) {
      const incoming = action.payload;
      const existing = state.items.find((i) => i.id === incoming.id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + (incoming.quantity ?? 1), MAX_CART_QUANTITY);
      } else {
        state.items.push({
          id:          incoming.id,
          title:       incoming.title,
          price:       incoming.price,
          thumbnail:   incoming.thumbnail,
          brand:       incoming.brand    ?? '',
          category:    incoming.category ?? '',
          stock:       incoming.stock    ?? 99,
          quantity:    Math.min(incoming.quantity ?? 1, MAX_CART_QUANTITY),
          discountPercentage: incoming.discountPercentage ?? 0,
        });
      }
      const totals = recalc(state.items, state.coupon);
      Object.assign(state, totals);
      persist(state);
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      const totals = recalc(state.items, state.coupon);
      Object.assign(state, totals);
      persist(state);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.min(Math.max(1, quantity), MAX_CART_QUANTITY);
      }
      const totals = recalc(state.items, state.coupon);
      Object.assign(state, totals);
      persist(state);
    },

    clearCart(state) {
      state.items      = [];
      state.coupon     = null;
      state.couponCode = '';
      const totals = recalc([], null);
      Object.assign(state, totals);
      persist(state);
    },

    applyCoupon(state, action) {
      const code   = action.payload.toUpperCase();
      const coupon = COUPONS[code];
      if (coupon) {
        state.coupon     = coupon;
        state.couponCode = code;
        const totals = recalc(state.items, coupon);
        Object.assign(state, totals);
        persist(state);
        return { success: true };
      }
      // Invalid code — don't change state
    },

    removeCoupon(state) {
      state.coupon     = null;
      state.couponCode = '';
      const totals = recalc(state.items, null);
      Object.assign(state, totals);
      persist(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;

/* ─── Selectors ─────────────────────────────────────────────── */
export const selectCartItems      = (s) => s.cart.items;
export const selectCartTotalItems = (s) => s.cart.totalItems;
export const selectCartTotalPrice = (s) => s.cart.total;
export const selectCartSubtotal   = (s) => s.cart.subtotal;
export const selectCartDiscount   = (s) => s.cart.discount;
export const selectCartTax        = (s) => s.cart.tax;
export const selectCartShipping   = (s) => s.cart.shipping;
export const selectCartCoupon     = (s) => s.cart.coupon;
export const selectCartCouponCode = (s) => s.cart.couponCode;
