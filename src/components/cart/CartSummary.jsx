import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Tag } from 'lucide-react';
import {
  selectCartSubtotal,
  selectCartDiscount,
  selectCartTax,
  selectCartShipping,
  selectCartTotalPrice,
  selectCartItems,
} from '@redux/slices/cartSlice';
import { formatCurrency } from '@utils/format';
import { TAX_RATE, FREE_SHIPPING_ABOVE, SHIPPING_COST } from '@constants/app';
import { ROUTES } from '@constants/routes';
import CouponInput from './CouponInput';

const Row = ({ label, value, className = '' }) => (
  <div className={`flex items-center justify-between text-sm ${className}`}>
    <span className="text-gray-500 dark:text-gray-400">{label}</span>
    <span className="font-medium text-gray-800 dark:text-gray-200">{value}</span>
  </div>
);

/**
 * Sticky order-summary panel shown on the right side of CartPage.
 */
export default function CartSummary() {
  const items    = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectCartDiscount);
  const tax      = useSelector(selectCartTax);
  const shipping = useSelector(selectCartShipping);
  const total    = useSelector(selectCartTotalPrice);

  const isEmpty = items.length === 0;

  return (
    <div className="card p-5 space-y-5 sticky top-24">
      <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <ShoppingBag size={18} className="text-primary-500" />
        Order Summary
      </h2>

      {/* Coupon */}
      <CouponInput />

      <hr className="border-gray-100 dark:border-gray-700" />

      {/* Line items */}
      <div className="space-y-3">
        <Row label="Subtotal"   value={formatCurrency(subtotal)} />
        {discount > 0 && (
          <Row
            label={<span className="flex items-center gap-1"><Tag size={12} /> Coupon discount</span>}
            value={<span className="text-green-600 dark:text-green-400">− {formatCurrency(discount)}</span>}
          />
        )}
        <Row
          label={`GST (${Math.round(TAX_RATE * 100)}%)`}
          value={formatCurrency(tax)}
        />
        <Row
          label={
            <span className="flex items-center gap-1">
              <Truck size={12} />
              Shipping
            </span>
          }
          value={
            shipping === 0
              ? <span className="text-green-600 font-semibold">Free</span>
              : formatCurrency(shipping)
          }
        />
        {shipping > 0 && (
          <p className="text-xs text-gray-400">
            Add {formatCurrency(FREE_SHIPPING_ABOVE - (subtotal - discount))} more for free shipping
          </p>
        )}
      </div>

      <hr className="border-gray-100 dark:border-gray-700" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-900 dark:text-white">Total</span>
        <span className="text-xl font-extrabold text-primary-600 dark:text-primary-400">
          {formatCurrency(total)}
        </span>
      </div>

      {/* Checkout CTA */}
      <Link
        to={ROUTES.CHECKOUT}
        className={`btn-primary w-full justify-center text-sm py-3 ${isEmpty ? 'pointer-events-none opacity-50' : ''}`}
        aria-disabled={isEmpty}
        tabIndex={isEmpty ? -1 : undefined}
      >
        Proceed to Checkout
      </Link>

      {/* Continue shopping */}
      <Link
        to={ROUTES.PRODUCTS}
        className="block text-center text-sm text-gray-500 hover:text-primary-500 transition-colors"
      >
        ← Continue Shopping
      </Link>
    </div>
  );
}
