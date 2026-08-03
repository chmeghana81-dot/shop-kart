import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { ROUTES } from '@constants/routes';

/**
 * Empty cart illustration + CTA to continue shopping.
 */
export default function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      {/* Animated cart icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="w-24 h-24 rounded-full bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-6"
      >
        <ShoppingCart size={44} className="text-primary-400" />
      </motion.div>

      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mb-8">
        Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
      </p>

      <Link to={ROUTES.PRODUCTS} className="btn-primary">
        Browse Products
      </Link>
    </motion.div>
  );
}
