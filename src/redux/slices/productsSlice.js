import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '@services/productService';
import { DEFAULT_PAGE_SIZE } from '@constants/app';

/* ─── Async thunks ──────────────────────────────────────────── */

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async ({ limit = DEFAULT_PAGE_SIZE, skip = 0, category, q } = {}, { rejectWithValue }) => {
    try {
      let res;
      if (q?.trim()) {
        res = await productService.search({ q: q.trim(), limit, skip });
      } else if (category) {
        res = await productService.getByCategory(category, { limit, skip });
      } else {
        res = await productService.getAll({ limit, skip });
      }
      return res.data; // { products, total, skip, limit }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message ?? 'Failed to load products');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await productService.getCategories();
      // DummyJSON returns an array of objects: [{ slug, name, url }] in newer API
      // or a plain string array in older API — normalise to string array
      if (Array.isArray(data) && typeof data[0] === 'object') {
        return data.map((c) => c.slug ?? c.name ?? c);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message ?? 'Failed to load categories');
    }
  }
);

/* ─── Slice ─────────────────────────────────────────────────── */

const initialState = {
  items:       [],
  total:       0,
  categories:  [],

  // Filters / pagination kept in slice for URL-sync convenience
  filters: {
    q:        '',
    category: '',
    brand:    '',
    minRating:0,
    minPrice: 0,
    maxPrice: 10000,
    sort:     '',
  },
  page:     1,
  pageSize: DEFAULT_PAGE_SIZE,
  view:     'grid',  // 'grid' | 'list'

  loading:           false,
  categoriesLoading: false,
  error:             null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.page    = 1; // reset to first page on filter change
    },
    resetFilters(state) {
      state.filters  = { ...initialState.filters };
      state.page     = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
      state.page     = 1;
    },
    setView(state, action) {
      state.view = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items   = action.payload.products ?? [];
        state.total   = action.payload.total    ?? 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
        state.items   = [];
      });

    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories        = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesLoading = false;
      });
  },
});

export const { setFilters, resetFilters, setPage, setPageSize, setView } = productsSlice.actions;
export default productsSlice.reducer;

/* ─── Selectors ─────────────────────────────────────────────── */
export const selectProducts           = (s) => s.products.items;
export const selectProductsTotal      = (s) => s.products.total;
export const selectProductsLoading    = (s) => s.products.loading;
export const selectProductsError      = (s) => s.products.error;
export const selectFilters            = (s) => s.products.filters;
export const selectPage               = (s) => s.products.page;
export const selectPageSize           = (s) => s.products.pageSize;
export const selectView               = (s) => s.products.view;
export const selectCategories         = (s) => s.products.categories;
export const selectCategoriesLoading  = (s) => s.products.categoriesLoading;
