import { useState, useEffect, useCallback } from 'react';
import productService from '@services/productService';

/**
 * Fetches a single product by ID and a list of related products
 * from the same category.
 *
 * @param {string|number} id - product ID from URL params
 */
export function useProductDetail(id) {
  const [product,  setProduct]  = useState(null);
  const [related,  setRelated]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await productService.getById(id);
      setProduct(data);

      // Fetch related from same category (exclude this product)
      if (data?.category) {
        const rel = await productService.getByCategory(data.category, { limit: 8 });
        setRelated(
          (rel.data.products ?? []).filter((p) => p.id !== data.id).slice(0, 6)
        );
      }
    } catch (err) {
      setError(err.response?.data?.message ?? 'Product not found');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  return { product, related, loading, error, reload: load };
}
