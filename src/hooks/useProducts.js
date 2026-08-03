import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  fetchProducts,
  fetchCategories,
  setFilters,
  resetFilters,
  setPage,
  setView,
  selectProducts,
  selectProductsTotal,
  selectProductsLoading,
  selectProductsError,
  selectFilters,
  selectPage,
  selectPageSize,
  selectView,
  selectCategories,
} from '@redux/slices/productsSlice';
import { useDebounce } from './useDebounce';
import { DEFAULT_PAGE_SIZE } from '@constants/app';

/**
 * Central hook for the Products listing page.
 * – Syncs URL search params ↔ Redux filters
 * – Triggers fetchProducts whenever filters / page change
 * – Debounces the text-search query
 */
export function useProducts() {
  const dispatch      = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const products   = useSelector(selectProducts);
  const total      = useSelector(selectProductsTotal);
  const loading    = useSelector(selectProductsLoading);
  const error      = useSelector(selectProductsError);
  const filters    = useSelector(selectFilters);
  const page       = useSelector(selectPage);
  const pageSize   = useSelector(selectPageSize);
  const view       = useSelector(selectView);
  const categories = useSelector(selectCategories);

  // Debounce the search query before triggering an API call
  const debouncedQ = useDebounce(filters.q, 500);

  /* ── Sync URL → filters on mount ── */
  useEffect(() => {
    const urlFilters = {
      q:         searchParams.get('q')        ?? '',
      category:  searchParams.get('category') ?? '',
      brand:     searchParams.get('brand')    ?? '',
      minRating: Number(searchParams.get('minRating') ?? 0),
      minPrice:  Number(searchParams.get('minPrice')  ?? 0),
      maxPrice:  Number(searchParams.get('maxPrice')  ?? 10000),
      sort:      searchParams.get('sort')     ?? '',
    };
    dispatch(setFilters(urlFilters));
    if (categories.length === 0) dispatch(fetchCategories());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Fetch products when filters/page change ── */
  useEffect(() => {
    const skip = (page - 1) * pageSize;
    dispatch(
      fetchProducts({
        limit:    pageSize,
        skip,
        q:        debouncedQ,
        category: filters.category,
      })
    );

    // Sync filters → URL
    const params = {};
    if (debouncedQ)        params.q         = debouncedQ;
    if (filters.category)  params.category  = filters.category;
    if (filters.brand)     params.brand     = filters.brand;
    if (filters.sort)      params.sort      = filters.sort;
    if (page > 1)          params.page      = page;
    setSearchParams(params, { replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, filters.category, filters.brand, filters.sort, page, pageSize]);

  /* ── Client-side filtering for fields DummyJSON doesn't support ── */
  const visibleProducts = products.filter((p) => {
    if (filters.brand && p.brand?.toLowerCase() !== filters.brand.toLowerCase()) return false;
    if (filters.minRating > 0 && (p.rating ?? 0) < filters.minRating)           return false;
    if (filters.minPrice > 0 && p.price < filters.minPrice)                      return false;
    if (filters.maxPrice < 10000 && p.price > filters.maxPrice)                  return false;
    return true;
  });

  /* ── Client-side sort (for fields not natively supported by API) ── */
  const sortedProducts = [...visibleProducts].sort((a, b) => {
    switch (filters.sort) {
      case 'price_asc':    return a.price - b.price;
      case 'price_desc':   return b.price - a.price;
      case 'rating_desc':  return (b.rating ?? 0) - (a.rating ?? 0);
      case 'discount_desc':return (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0);
      default:             return 0;
    }
  });

  const totalPages = Math.ceil(total / pageSize);

  const updateFilters = useCallback((patch) => dispatch(setFilters(patch)),  [dispatch]);
  const clearFilters  = useCallback(()       => dispatch(resetFilters()),    [dispatch]);
  const changePage    = useCallback((p)      => dispatch(setPage(p)),        [dispatch]);
  const changeView    = useCallback((v)      => dispatch(setView(v)),        [dispatch]);

  return {
    products:   sortedProducts,
    allProducts: products,
    total,
    loading,
    error,
    filters,
    page,
    pageSize,
    totalPages,
    view,
    categories,
    updateFilters,
    clearFilters,
    changePage,
    changeView,
  };
}
