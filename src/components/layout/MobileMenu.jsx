import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Home, ShoppingBag, Heart, ShoppingCart, User, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { closeMobileMenu } from '@redux/slices/uiSlice';
import { cn } from '@utils/helpers';
import { ROUTES } from '@constants/routes';

const NAV_LINKS = [
  { label: 'Home',      icon: Home,         to: ROUTES.HOME      },
  { label: 'Products',  icon: ShoppingBag,  to: ROUTES.PRODUCTS  },
  { label: 'Categories',icon: List,         to: ROUTES.CATEGORIES},
  { label: 'Wishlist',  icon: Heart,        to: ROUTES.WISHLIST  },
  { label: 'Cart',      icon: ShoppingCart, to: ROUTES.CART      },
  { label: 'Profile',   icon: User,         to: ROUTES.PROFILE   },
];

/**
 * Full-screen slide-in mobile navigation drawer.
 */
export default function MobileMenu() {
  const dispatch   = useDispatch();
  const isOpen     = useSelector((s) => s.ui.mobileMenuOpen);
  const cartCount  = useSelector((s) => s.cart?.totalItems     ?? 0);
  const wishCount  = useSelector((s) => s.wishlist?.items?.length ?? 0);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => dispatch(closeMobileMenu());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0        }}
            exit={{    x: '-100%'  }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed inset-y-0 left-0 z-50 w-72',
              'bg-white dark:bg-gray-900 flex flex-col shadow-2xl'
            )}
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <Link to={ROUTES.HOME} onClick={close} className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-primary-500 tracking-tight">
                  Shop<span className="text-gray-900 dark:text-white">Kart</span>
                </span>
              </Link>
              <button
                onClick={close}
                aria-label="Close menu"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <ul className="space-y-1">
                {NAV_LINKS.map(({ label, icon: Icon, to }) => (
                  <li key={label}>
                    <NavLink
                      to={to}
                      end={to === ROUTES.HOME}
                      onClick={close}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium',
                          'transition-colors duration-150',
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        )
                      }
                    >
                      <Icon size={18} />
                      {label}
                      {label === 'Cart' && cartCount > 0 && (
                        <span className="ml-auto badge bg-primary-500 text-white">
                          {cartCount}
                        </span>
                      )}
                      {label === 'Wishlist' && wishCount > 0 && (
                        <span className="ml-auto badge bg-red-500 text-white">
                          {wishCount}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer links */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 space-y-1">
              <p>© {new Date().getFullYear()} ShopKart. All rights reserved.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
