import { memo } from 'react';
import { motion } from 'framer-motion';
import { PackageSearch } from 'lucide-react';
import ProductCard  from '@components/common/ProductCard';
import SkeletonCard from '@components/common/SkeletonCard';
import { cn }       from '@utils/helpers';
import { VIEW_MODES } from '@constants/app';

const SKELETON_COUNT = 12;

/**
 * Renders a responsive grid or list of ProductCards.
 * Shows skeleton placeholders while loading.
 * Shows an empty-state illustration when no products match.
 */
const ProductGrid = memo(function ProductGrid({ products, loading, view, error }) {
  const isList = view === VIEW_MODES.LIST;

  /* ── Error state ── */
  if (error && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-5xl mb-4">😕</p>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Something went wrong
        </h3>
        <p className="text-sm text-gray-500 max-w-sm">{error}</p>
      </div>
    );
  }

  /* ── Skeleton loading ── */
  if (loading) {
    return (
      <div
        className={cn(
          isList
            ? 'space-y-3'
            : 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
        )}
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} variant={isList ? 'list' : 'grid'} />
        ))}
      </div>
    );
  }

  /* ── Empty state ── */
  if (!loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageSearch size={64} className="text-gray-200 dark:text-gray-700 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          No products found
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          Try adjusting your filters or search query to find what you're looking for.
        </p>
      </div>
    );
  }

  /* ── Products ── */
  return (
    <motion.div
      layout
      className={cn(
        isList
          ? 'space-y-3'
          : 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
      )}
    >
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: Math.min(i * 0.04, 0.3) }}
        >
          <ProductCard product={product} variant={isList ? 'list' : 'grid'} />
        </motion.div>
      ))}
    </motion.div>
  );
});

export default ProductGrid;
