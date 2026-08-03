import { configureStore } from '@reduxjs/toolkit';
import uiReducer       from './slices/uiSlice';
import authReducer     from './slices/authSlice';
import cartReducer     from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import productsReducer from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    ui:       uiReducer,
    auth:     authReducer,
    cart:     cartReducer,
    wishlist: wishlistReducer,
    products: productsReducer,
  },
  devTools: import.meta.env.DEV,
});
