import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard  from '@components/common/ProductCard';
import SkeletonCard from '@components/common/SkeletonCard';
import { cn }       from '@utils/helpers';

/**
 * Horizontal-scrolling row of related product cards.
 */
export default function RelatedProducts({ products = [], loading = false }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 260, behavior: 'smooth' });
  };

  const items = loading
    ? Array.from({ length: 6 })
    : products;

  if (!loading && products.length === 0) return null;

  return (
    <div className="relative group/rel">
      {/* Scroll left */}
      <button
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4',
          'w-9 h-9 rounded-full bg-white dark:bg-gray-800 shadow-md',
          'flex items-center justify-center',
          'opacity-0 group-hover/rel:opacity-100 transition-opacity duration-200',
          'hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Cards row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
      >
        {items.map((product, i) => (
          <div key={product?.id ?? i} className="flex-shrink-0 w-48">
            {loading
              ? <SkeletonCard />
              : <ProductCard product={product} />
            }
          </div>
        ))}
      </div>

      {/* Scroll right */}
      <button
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className={cn(
          'absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4',
          'w-9 h-9 rounded-full bg-white dark:bg-gray-800 shadow-md',
          'flex items-center justify-center',
          'opacity-0 group-hover/rel:opacity-100 transition-opacity duration-200',
          'hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
