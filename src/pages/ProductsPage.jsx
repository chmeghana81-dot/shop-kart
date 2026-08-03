import { useState } from 'react';
import { usePageTitle } from '@hooks/usePageTitle';
import { useProducts }  from '@hooks/useProducts';
import FilterSidebar    from '@components/product/FilterSidebar';
import FilterChips      from '@components/product/FilterChips';
import SortBar          from '@components/product/SortBar';
import ProductGrid      from '@components/product/ProductGrid';
import Pagination       from '@components/ui/Pagination';
import { setPageSize }  from '@redux/slices/productsSlice';
import { useDispatch }  from 'react-redux';
import { scrollToTop }  from '@utils/helpers';

/**
 * /products — Full product listing page with filters, sort, pagination.
 */
export default function ProductsPage() {
  usePageTitle('Products');

  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    products,
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
  } = useProducts();

  const handlePageChange = (p) => {
    changePage(p);
    scrollToTop('smooth');
  };

  return (
    <div className="page-container py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1">
          <li><a href="/" className="hover:text-primary-500">Home</a></li>
          <li>/</li>
          <li className="text-gray-600 dark:text-gray-300 font-medium">Products</li>
          {filters.category && (
            <>
              <li>/</li>
              <li className="text-gray-600 dark:text-gray-300 font-medium capitalize">
                {filters.category.replace(/-/g, ' ')}
              </li>
            </>
          )}
        </ol>
      </nav>

      <div className="flex gap-6">
        {/* ── Filter Sidebar ── */}
        <FilterSidebar
          filters={filters}
          categories={categories}
          onFilterChange={updateFilters}
          onReset={clearFilters}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">

          {/* Inline search */}
          <div className="mb-4">
            <input
              type="search"
              value={filters.q}
              onChange={(e) => updateFilters({ q: e.target.value })}
              placeholder="Search within results…"
              className="input-field text-sm rounded-full max-w-sm"
            />
          </div>

          {/* Active filter chips */}
          <div className="mb-3">
            <FilterChips
              filters={filters}
              onRemove={updateFilters}
              onReset={clearFilters}
            />
          </div>

          {/* Sort bar */}
          <SortBar
            total={total}
            sort={filters.sort}
            view={view}
            pageSize={pageSize}
            onSortChange={(sort) => updateFilters({ sort })}
            onViewChange={changeView}
            onPageSizeChange={(size) => dispatch(setPageSize(size))}
            onFilterToggle={() => setSidebarOpen(true)}
            loading={loading}
          />

          {/* Product grid / list */}
          <ProductGrid
            products={products}
            loading={loading}
            view={view}
            error={error}
          />

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
