import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import productService from '@services/productService';
import ProductCard    from '@components/common/ProductCard';
import SkeletonCard   from '@components/common/SkeletonCard';
import SectionHeader  from '@components/common/SectionHeader';
import { ROUTES }     from '@constants/routes';

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [category, setCategory] = useState('all');

  const TABS = [
    { label: 'All',       value: 'all'         },
    { label: 'Phones',    value: 'smartphones' },
    { label: 'Fashion',   value: 'tops'        },
    { label: 'Skincare',  value: 'skincare'    },
    { label: 'Laptops',   value: 'laptops'     },
  ];

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const req = category === 'all'
      ? productService.getAll({ limit: 8, skip: 20 })
      : productService.getByCategory(category, { limit: 8 });

    req
      .then(({ data }) => {
        if (!cancelled) setProducts(data.products ?? []);
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [category]);

  return (
    <section className="page-container py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <SectionHeader
          title="Trending Now"
          subtitle="What shoppers are loving"
          href={ROUTES.PRODUCTS}
          className="mb-0 flex-1"
        />

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setCategory(t.value)}
              className={
                category === t.value
                  ? 'px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-500 text-white'
                  : 'px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((p) => <ProductCard key={p.id} product={p} />)
        }
      </div>
    </section>
  );
}
