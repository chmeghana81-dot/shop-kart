import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '@constants/app';
import { getStorage, setStorage } from '@utils/storage';

/**
 * Wishlist slice — stub for Feature 5.
 * Full implementation with localStorage persistence in Feature 9.
 */

const initialState = {
  items: getStorage(STORAGE_KEYS.WISHLIST) ?? [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const exists = state.items.some((i) => i.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        setStorage(STORAGE_KEYS.WISHLIST, state.items);
      }
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
      setStorage(STORAGE_KEYS.WISHLIST, state.items);
    },
    clearWishlist(state) {
      state.items = [];
      setStorage(STORAGE_KEYS.WISHLIST, []);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

export const selectWishlistItems = (s) => s.wishlist.items;
export const selectIsWishlisted  = (id) => (s) => s.wishlist.items.some((i) => i.id === id);
