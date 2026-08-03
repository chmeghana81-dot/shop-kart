import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { cn, labelFromSlug } from '@utils/helpers';
import { ROUTES } from '@constants/routes';

/**
 * Categories mega-dropdown in the navbar.
 * Categories are fetched via the products slice (Feature 6).
 * Falls back to a hard-coded starter list so the layout works standalone.
 */

const FALLBACK_CATEGORIES = [
  'smartphones', 'laptops', 'fragrances', 'skincare',
  'groceries', 'home-decoration', 'furniture', 'tops',
  'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes',
  'mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery',
  'sunglasses', 'automotive', 'motorcycle', 'lighting',
];

export default function NavCategoryMenu() {
  const [open, setOpen]   = useState(false);
  const menuRef           = useRef(null);
  const dispatch          = useDispatch();

  // Will be populated by productSlice in Feature 6
  const categories = useSelector((s) => s.products?.categories ?? FALLBACK_CATEGORIES);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={menuRef} className="relative hidden md:block">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium',
          'text-gray-700 dark:text-gray-200',
          'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150'
        )}
      >
        <LayoutGrid size={16} />
        Categories
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{    opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute left-0 top-full mt-2 z-50',
              'w-[480px] card shadow-xl p-4'
            )}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              All Categories
            </p>
            <ul className="grid grid-cols-2 gap-0.5">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`${ROUTES.PRODUCTS}?category=${cat}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg',
                      'text-sm text-gray-700 dark:text-gray-300',
                      'hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-600',
                      'transition-colors duration-100 capitalize'
                    )}
                  >
                    {labelFromSlug(cat)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
