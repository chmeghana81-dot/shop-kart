import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { cn } from '@utils/helpers';
import { calcPricing, formatCurrency, truncate } from '@utils/format';
import { ROUTES } from '@constants/routes';
import { PLACEHOLDER_IMAGE } from '@constants/app';
import { addToCart }                          from '@redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist }  from '@redux/slices/wishlistSlice';

/**
 * Reusable product card — used across Home, Products listing,
 * Search results, Related products, Wishlist, etc.
 *
 * Supports `variant`: 'grid' (default) | 'list'
 *
 * Cart / Wishlist dispatches are guarded: if the Redux slice
 * doesn't exist yet (early features), we fail gracefully.
 */
const ProductCard = memo(function ProductCard({ product, variant = 'grid' }) {
  const dispatch = useDispatch();

  // Safe selectors — slices may not be registered yet
  const wishlistItems = useSelector((s) => s.wishlist?.items ?? []);
  const isWishlisted  = wishlistItems.some((i) => i.id === product?.id);

  const { salePrice, originalPrice, discountLabel } = calcPricing(
    product?.price           ?? 0,
    product?.discountPercentage ?? 0
  );

  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success(`${truncate(product.title, 30)} added to cart`);
    },
    [dispatch, product]
  );

  const handleToggleWishlist = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isWishlisted) {
        dispatch(removeFromWishlist(product));
        toast.success('Removed from wishlist');
      } else {
        dispatch(addToWishlist(product));
        toast.success(`${truncate(product.title, 30)} added to wishlist`);
      }
    },
    [dispatch, product, isWishlisted]
  );

  if (!product) return null;

  /* ─── LIST VARIANT ─────────────────────────────────────── */
  if (variant === 'list') {
    return (
      <Link
        to={ROUTES.PRODUCT(product.id)}
        className="card flex gap-4 p-4 hover:shadow-md transition-shadow duration-200 group"
      >
        {/* Image */}
        <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
          <img
            src={product.thumbnail ?? PLACEHOLDER_IMAGE}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
          {discountLabel && (
            <span className="absolute top-2 left-2 badge bg-primary-500 text-white text-[10px]">
              {discountLabel}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-xs text-gray-400 capitalize mb-0.5">{product.brand ?? product.category}</p>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 leading-snug">
            {product.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {product.rating?.toFixed(1)}
            </span>
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between mt-auto pt-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-gray-900 dark:text-white">
                {formatCurrency(salePrice)}
              </span>
              {originalPrice > salePrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              aria-label="Add to cart"
              className="btn-primary text-xs py-1.5 px-3"
            >
              <ShoppingCart size={13} />
              Add
            </button>
          </div>
        </div>
      </Link>
    );
  }

  /* ─── GRID VARIANT (default) ───────────────────────────── */
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card overflow-hidden group"
    >
      <Link to={ROUTES.PRODUCT(product.id)} className="block">
        {/* Image container */}
        <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 overflow-hidden">
          <img
            src={product.thumbnail ?? PLACEHOLDER_IMAGE}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />

          {/* Discount badge */}
          {discountLabel && (
            <span className="absolute top-2 left-2 badge bg-primary-500 text-white text-[10px]">
              {discountLabel}
            </span>
          )}

          {/* Hover actions overlay */}
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center gap-2',
              'bg-black/0 group-hover:bg-black/10 transition-colors duration-200'
            )}
          >
            <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 flex gap-2">
              {/* Wishlist */}
              <button
                onClick={handleToggleWishlist}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shadow-md',
                  'bg-white dark:bg-gray-800 transition-colors duration-150',
                  isWishlisted
                    ? 'text-red-500'
                    : 'text-gray-500 hover:text-red-500'
                )}
              >
                <Heart size={15} className={isWishlisted ? 'fill-current' : ''} />
              </button>

              {/* Quick view link */}
              <Link
                to={ROUTES.PRODUCT(product.id)}
                onClick={(e) => e.stopPropagation()}
                aria-label="Quick view"
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-white dark:bg-gray-800 text-gray-500 hover:text-primary-500 transition-colors duration-150"
              >
                <Eye size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-3">
          <p className="text-[11px] text-gray-400 uppercase tracking-wide truncate mb-0.5">
            {product.brand ?? product.category}
          </p>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug min-h-[2.5rem]">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={11}
                  className={
                    s <= Math.round(product.rating ?? 0)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-200 dark:text-gray-600 fill-current'
                  }
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-400">
              ({product.stock ?? 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-gray-900 dark:text-white">
              {formatCurrency(salePrice)}
            </span>
            {originalPrice > salePrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="btn-primary w-full mt-3 text-xs py-2"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingCart size={13} />
            Add to Cart
          </button>
        </div>
      </Link>
    </motion.div>
  );
});

export default ProductCard;
