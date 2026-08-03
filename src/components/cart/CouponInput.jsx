import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tag, X, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { applyCoupon, removeCoupon, selectCartCoupon, selectCartCouponCode } from '@redux/slices/cartSlice';
import { COUPONS } from '@constants/app';
import { cn } from '@utils/helpers';

/**
 * Coupon code input with validation against the COUPONS constant map.
 */
export default function CouponInput() {
  const dispatch    = useDispatch();
  const coupon      = useSelector(selectCartCoupon);
  const couponCode  = useSelector(selectCartCouponCode);
  const [input, setInput]   = useState('');
  const [error, setError]   = useState('');

  const handleApply = useCallback(() => {
    const code = input.trim().toUpperCase();
    if (!code) { setError('Enter a coupon code'); return; }
    if (COUPONS[code]) {
      dispatch(applyCoupon(code));
      setInput('');
      setError('');
      toast.success(`Coupon "${code}" applied — ${COUPONS[code].label}!`);
    } else {
      setError('Invalid or expired coupon code');
    }
  }, [dispatch, input]);

  const handleRemove = useCallback(() => {
    dispatch(removeCoupon());
    toast('Coupon removed', { icon: '🗑️' });
  }, [dispatch]);

  // Coupon already applied
  if (coupon) {
    return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <CheckCircle size={16} />
          <span className="text-sm font-semibold">{couponCode}</span>
          <span className="text-xs text-green-600 dark:text-green-500">— {coupon.label}</span>
        </div>
        <button
          onClick={handleRemove}
          className="text-green-600 hover:text-red-500 transition-colors"
          aria-label="Remove coupon"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value.toUpperCase()); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            placeholder="Enter coupon code"
            className={cn('input-field pl-9 text-sm uppercase', error && 'border-red-400')}
          />
        </div>
        <button
          onClick={handleApply}
          className="btn-primary text-sm px-4 flex-shrink-0"
        >
          Apply
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {/* Demo hint */}
      <p className="text-xs text-gray-400">
        Try: <span className="font-mono font-semibold">SAVE10</span>, <span className="font-mono font-semibold">SAVE20</span>, <span className="font-mono font-semibold">FLAT50</span>
      </p>
    </div>
  );
}
