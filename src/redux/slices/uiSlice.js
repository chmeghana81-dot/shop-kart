import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'shopkart_dark_mode';

const getInitialDarkMode = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  // Fall back to OS preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState = {
  darkMode: getInitialDarkMode(),
  mobileMenuOpen: false,
  searchOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.darkMode));
      } catch {
        // ignore storage errors
      }
    },
    setDarkMode(state, action) {
      state.darkMode = action.payload;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      } catch {
        // ignore storage errors
      }
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    toggleSearch(state) {
      state.searchOpen = !state.searchOpen;
    },
    closeSearch(state) {
      state.searchOpen = false;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  toggleMobileMenu,
  closeMobileMenu,
  toggleSearch,
  closeSearch,
} = uiSlice.actions;

export default uiSlice.reducer;
