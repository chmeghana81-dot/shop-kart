import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@services/authService';
import { STORAGE_KEYS } from '@constants/app';
import { getStorage, setStorage, removeStorageKeys } from '@utils/storage';

/* ─── Async thunks ──────────────────────────────────────────── */

/**
 * Login with DummyJSON credentials.
 * Stores tokens + user in localStorage so session survives page refresh.
 */
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ username, password, remember }, { rejectWithValue }) => {
    try {
      const { data } = await authService.login({ username, password });
      // Persist based on "remember me"
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(STORAGE_KEYS.AUTH_TOKEN,    JSON.stringify(data.accessToken));
      storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, JSON.stringify(data.refreshToken));
      // Always persist user object in localStorage (needed by Navbar)
      setStorage(STORAGE_KEYS.USER, {
        id:        data.id,
        username:  data.username,
        email:     data.email,
        firstName: data.firstName,
        lastName:  data.lastName,
        image:     data.image,
        gender:    data.gender,
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ?? 'Invalid username or password'
      );
    }
  }
);

/**
 * Fetch the currently logged-in user from /auth/me.
 * Called at app boot to restore session.
 */
export const fetchMeThunk = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authService.getMe();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message ?? 'Session expired');
    }
  }
);

/* ─── Helpers ───────────────────────────────────────────────── */

const readTokenFromStorage = () => {
  // Check sessionStorage first (non-remember sessions), then localStorage
  try {
    const ss = sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (ss) return JSON.parse(ss);
    return getStorage(STORAGE_KEYS.AUTH_TOKEN);
  } catch {
    return null;
  }
};

/* ─── Initial state ─────────────────────────────────────────── */

const initialState = {
  user:        getStorage(STORAGE_KEYS.USER) ?? null,
  token:       readTokenFromStorage()        ?? null,
  loading:     false,
  autoLoading: false,   // true while fetchMe is in flight at boot
  error:       null,
};

/* ─── Slice ─────────────────────────────────────────────────── */

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Hard logout — clears all tokens, user, and redux state */
    logout(state) {
      state.user  = null;
      state.token = null;
      state.error = null;
      removeStorageKeys(
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER
      );
      try {
        sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      } catch {
        // ignore
      }
    },

    /** Manually update the stored user (e.g., after profile edit) */
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
      setStorage(STORAGE_KEYS.USER, state.user);
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* ── Login ── */
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token   = action.payload.accessToken;
        state.user    = {
          id:        action.payload.id,
          username:  action.payload.username,
          email:     action.payload.email,
          firstName: action.payload.firstName,
          lastName:  action.payload.lastName,
          image:     action.payload.image,
          gender:    action.payload.gender,
        };
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    /* ── Auto-login (fetchMe) ── */
    builder
      .addCase(fetchMeThunk.pending, (state) => {
        state.autoLoading = true;
      })
      .addCase(fetchMeThunk.fulfilled, (state, action) => {
        state.autoLoading = false;
        state.user        = action.payload;
        setStorage(STORAGE_KEYS.USER, action.payload);
      })
      .addCase(fetchMeThunk.rejected, (state) => {
        state.autoLoading = false;
        // Token was invalid — clear everything silently
        state.token = null;
        state.user  = null;
        removeStorageKeys(
          STORAGE_KEYS.AUTH_TOKEN,
          STORAGE_KEYS.REFRESH_TOKEN,
          STORAGE_KEYS.USER
        );
      });
  },
});

export const { logout, updateUser, clearError } = authSlice.actions;
export default authSlice.reducer;

/* ─── Selectors ─────────────────────────────────────────────── */
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectCurrentUser     = (state) => state.auth.user;
export const selectAuthLoading     = (state) => state.auth.loading;
export const selectAuthError       = (state) => state.auth.error;
export const selectAutoLoading     = (state) => state.auth.autoLoading;
