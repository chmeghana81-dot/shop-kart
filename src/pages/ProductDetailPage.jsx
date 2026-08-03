import { useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ShoppingCart, Heart, Share2, Truck, ShieldCheck,
  RefreshCw, ChevronRight, Star, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { useProductDetail }    from '@hooks/useProductDetail';
import { usePageTitle }        from '@hooks/usePageTitle';
import { addToCart }           from '@redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsWishlisted } from '@redux/slices/wishlistSlice';

import ImageGallery            from '@components/product/ImageGallery';
import RatingStars             from '@components/product/RatingStars';
import ProductBadges           from '@components/product/ProductBadges';
import QuantitySelector        from '@components/product/QuantitySelector';
import ReviewList              from '@components/product/ReviewList';
import RelatedProducts         from '@components/product/RelatedProducts';
import SkeletonCard            from '@components/common/SkeletonCard';
import Button                  from '@components/ui/Button';

import { calcPricing, formatCurrency } from '@utils/format';
import { labelFromSlug }               from '@utils/helpers';
import { ROUTES }              from '@constants/routes';

/* ─── Skeleton while loading ─────────────────────────────── */
function DetailSkeleton() {
  return (
    <div className="page-container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
        <div className="skeleton aspect-square rounded-2xl" />
        <div className="space-y-4">
          <div className="skeleton h-4 w-1/3 rounded" />
          <div className="skeleton h-7 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
          <div className="skeleton h-10 w-1/3 rounded" />
          <div className="skeleton h-20 w-full rounded" />
          <div className="skeleton h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/* ─── Share helper ────────────────────────────────────────── */
const handleShare = async (title) => {
  if (navigator.share) {
    await navigator.share({ title, url: window.location.href });
  } else {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  }
};

export default function ProductDetailPage() {
  const { id }        = useParams();
  const dispatch      = useDispatch();
  const navigate      = useNavigate();

  const [qty, setQty] = useState(1);

  const { product, related, loading, error } = useProductDetail(id);

  // Dynamic page title
  usePageTitle(product?.title ?? 'Product Details');

  // Wishlist state
  const isWishlisted = useSelector(selectIsWishlisted(product?.id));

  const pricing = product
    ? calcPricing(product.price, product.discountPercentage)
    : null;

  /* ── Handlers ── */
  const handleAddToCart = useCallback(() => {
    if (!product) return;
    dispatch(addToCart({ ...product, quantity: qty }));
    toast.success(`${product.title} added to cart!`);
  }, [dispatch, product, qty]);

  const handleBuyNow = useCallback(() => {
    if (!product) return;
    dispatch(addToCart({ ...product, quantity: qty }));
    navigate(ROUTES.CART);
  }, [dispatch, product, qty, navigate]);

  const handleWishlist = useCallback(() => {
    if (!product) return;
    if (isWishlisted) {
      dispatch(removeFromWishlist(product));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist!');
    }
  }, [dispatch, product, isWishlisted]);

  /* ── Error state ── */
  if (error) {
    return (
      <div className="page-container py-20 text-center">
        <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Product not found</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <Link to={ROUTES.PRODUCTS} className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  /* ── Skeleton ── */
  if (loading) return <DetailSkeleton />;

  return (
    <div className="page-container py-6">

      {/* ── Breadcrumb ── */}
      <nav className="text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 flex-wrap">
          <li><Link to={ROUTES.HOME}     className="hover:text-primary-500">Home</Link></li>
          <li><ChevronRight size={12} /></li>
          <li><Link to={ROUTES.PRODUCTS} className="hover:text-primary-500">Products</Link></li>
          {product.category && (
            <>
              <li><ChevronRight size={12} /></li>
              <li>
                <Link
                  to={`${ROUTES.PRODUCTS}?category=${product.category}`}
                  className="hover:text-primary-500 capitalize"
                >
                  {labelFromSlug(product.category)}
                </Link>
              </li>
            </>
          )}
          <li><ChevronRight size={12} /></li>
          <li className="text-gray-600 dark:text-gray-300 font-medium truncate max-w-[200px]">
            {product.title}
          </li>
        </ol>
      </nav>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

        {/* Left — Image gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0  }}
          transition={{ duration: 0.35 }}
        >
          <ImageGallery
            images={product.images ?? [product.thumbnail]}
            title={product.title}
          />
        </motion.div>

        {/* Right — Product info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0  }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-4"
        >
          {/* Brand + category */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {product.brand && (
              <Link
                to={`${ROUTES.PRODUCTS}?brand=${encodeURIComponent(product.brand)}`}
                className="font-semibold text-primary-500 hover:text-primary-600"
              >
                {product.brand}
              </Link>
            )}
            {product.brand && product.category && <span>·</span>}
            {product.category && (
              <Link
                to={`${ROUTES.PRODUCTS}?category=${product.category}`}
                className="capitalize hover:text-primary-500 transition-colors"
              >
                {labelFromSlug(product.category)}
              </Link>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-snug">
            {product.title}
          </h1>

          {/* Rating */}
          <RatingStars
            rating={product.rating ?? 0}
            showValue
            count={product.reviews?.length ?? 0}
          />

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <ProductBadges
              stock={product.stock}
              availabilityStatus={product.availabilityStatus}
            />
            {product.sku && (
              <span className="text-xs text-gray-400 font-mono">SKU: {product.sku}</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 py-2">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {formatCurrency(pricing.salePrice)}
            </span>
            {pricing.originalPrice > pricing.salePrice && (
              <>
                <span className="text-lg text-gray-400 line-through mb-0.5">
                  {formatCurrency(pricing.originalPrice)}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-sm font-bold">
                  {pricing.discountLabel}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {/* Divider */}
          <hr className="border-gray-100 dark:border-gray-700" />

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</span>
            <QuantitySelector
              value={qty}
              max={Math.min(product.stock, 10)}
              onChange={setQty}
              disabled={product.stock === 0}
            />
            {product.minimumOrderQuantity > 1 && (
              <span className="text-xs text-amber-600 dark:text-amber-400">
                Min order: {product.minimumOrderQuantity}
              </span>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<ShoppingCart size={18} />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </Button>
          </div>

          {/* Wishlist + Share */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleWishlist}
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-150 ${
                isWishlisted
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>

            <span className="text-gray-200 dark:text-gray-700">|</span>

            <button
              onClick={() => handleShare(product.title)}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary-500 transition-colors"
            >
              <Share2 size={16} />
              Share
            </button>
          </div>

          {/* Trust strip */}
          <div className="grid grid-cols-3 gap-3 mt-2 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            {[
              { icon: Truck,        text: 'Free delivery above ₹499' },
              { icon: ShieldCheck,  text: '100% authentic product'   },
              { icon: RefreshCw,    text: '30-day easy returns'       },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 text-center">
                <Icon size={18} className="text-primary-500" />
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{text}</span>
              </div>
            ))}
          </div>

          {/* Specs table */}
          {(product.weight || product.dimensions || product.warrantyInformation) && (
            <div className="space-y-2 mt-2">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Specifications</h3>
              <dl className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                {product.weight && (
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-500">Weight</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{product.weight}g</dd>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-500">Dimensions</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">
                      {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                    </dd>
                  </div>
                )}
                {product.warrantyInformation && (
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-500">Warranty</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{product.warrantyInformation}</dd>
                  </div>
                )}
                {product.shippingInformation && (
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-500">Shipping</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{product.shippingInformation}</dd>
                  </div>
                )}
                {product.returnPolicy && (
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-500">Returns</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{product.returnPolicy}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Reviews ── */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Star size={20} className="text-amber-400 fill-amber-400" />
          Customer Reviews
        </h2>
        <ReviewList
          reviews={product.reviews ?? []}
          overallRating={product.rating ?? 0}
        />
      </section>

      {/* ── Related products ── */}
      {(related.length > 0 || loading) && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            You Might Also Like
          </h2>
          <RelatedProducts products={related} loading={loading} />
        </section>
      )}
    </div>
  );
}
