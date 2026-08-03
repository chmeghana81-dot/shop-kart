import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import { selectCartItems, selectCartTotalItems, clearCart } from '@redux/slices/cartSlice';
import { usePageTitle } from '@hooks/usePageTitle';

import CartItem    from '@components/cart/CartItem';
import CartSummary from '@components/cart/CartSummary';
import EmptyCart   from '@components/cart/EmptyCart';
import { ROUTES }  from '@constants/routes';

/**
 * /cart — Full cart page with item list and order summary sidebar.
 */
export default function CartPage() {
  usePageTitle('Shopping Cart');

  const dispatch    = useDispatch();
  const items       = useSelector(selectCartItems);
  const totalItems  = useSelector(selectCartTotalItems);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
    toast('Cart cleared', { icon: '🗑️' });
  }, [dispatch]);

  return (
    <div className="page-container py-6">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1">
          <li><Link to={ROUTES.HOME}     className="hover:text-primary-500">Home</Link></li>
          <li>/</li>
          <li className="text-gray-600 dark:text-gray-300 font-medium">Cart</li>
        </ol>
      </nav>

      {/* Page heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <ShoppingBag size={24} className="text-primary-500" />
          My Cart
          {totalItems > 0 && (
            <span className="text-base font-normal text-gray-400">
              ({totalItems} item{totalItems !== 1 ? 's' : ''})
            </span>
          )}
        </h1>

        {items.length > 0 && (
          <button
            onClick={handleClearCart}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
          >
            <Trash2 size={13} />
            Clear Cart
          </button>
        )}
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Cart items list ── */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>

          {/* ── Order summary sidebar ── */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
