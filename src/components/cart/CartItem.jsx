import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { removeFromCart, updateQuantity } from '@redux/slices/cartSlice';
import QuantitySelector from '@components/product/QuantitySelector';
import { formatCurrency, calcPricing } from '@utils/format';
import { truncate }    from '@utils/format';
import { ROUTES }      from '@constants/routes';
import { PLACEHOLDER_IMAGE } from '@constants/app';
import { cn }          from '@utils/helpers';

/**
 * A single row in the cart — thumbnail, title, price, qty selector, remove.
 */
const CartItem = memo(function CartItem({ item }) {
  const dispatch = useDispatch();

  const { salePrice, originalPrice, discountLabel } = calcPricing(
    item.price, item.discountPercentage
  );

  const handleQtyChange = useCallback(
    (qty) => dispatch(updateQuantity({ id: item.id, quantity: qty })),
    [dispatch, item.id]
  );

  const handleRemove = useCallback(() => {
    dispatch(removeFromCart(item.id));
    toast.success(`${truncate(item.title, 30)} removed from cart`);
  }, [dispatch, item.id, item.title]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, height: 0 }}
      transition={{ duration: 0.2 }}
      className="card p-4 flex gap-4"
    >
      {/* Product image */}
      <Link
        to={ROUTES.PRODUCT(item.id)}
        className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800"
      >
        <img
          src={item.thumbnail ?? PLACEHOLDER_IMAGE}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-200"
          onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        {/* Title + brand */}
        <div>
          {item.brand && (
            <p className="text-xs text-gray-400 font-medium">{item.brand}</p>
          )}
          <Link
            to={ROUTES.PRODUCT(item.id)}
            className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-500 transition-colors line-clamp-2 leading-snug"
          >
            {item.title}
          </Link>
        </div>

        {/* Price row */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 dark:text-white">
            {formatCurrency(salePrice)}
          </span>
          {originalPrice > salePrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
          {discountLabel && (
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">
              {discountLabel}
            </span>
          )}
        </div>

        {/* Bottom row: qty + line total + remove */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <QuantitySelector
            value={item.quantity}
            max={Math.min(item.stock, 10)}
            onChange={handleQtyChange}
            size="sm"
          />

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
              {formatCurrency(salePrice * item.quantity)}
            </span>
            <button
              onClick={handleRemove}
              aria-label={`Remove ${item.title}`}
              className={cn(
                'p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30',
                'transition-colors duration-150'
              )}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default CartItem;
