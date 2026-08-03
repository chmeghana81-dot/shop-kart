import { useEffect, useState } from 'react';
import productService from '@services/productService';
import SectionHeader from '@components/common/SectionHeader';
import ProductCard   from '@components/common/ProductCard';
import SkeletonCard  from '@components/common/SkeletonCard';
import { ROUTES }    from '@constants/routes';

/**
 * Fetches 8 featured products from DummyJSON and renders them
 * in a responsive grid with skeleton loading.
 */
export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    let cancelled = false;
    productService
      .getAll({ limit: 8, skip: 0 })
      .then(({ data }) => {
        if (!cancelled) setProducts(data.products ?? []);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="page-container py-10">
      <SectionHeader
        title="Featured Products"
        subtitle="Handpicked just for you"
        href={ROUTES.PRODUCTS}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((p) => <ProductCard key={p.id} product={p} />)
        }
      </div>
    </section>
  );
}
