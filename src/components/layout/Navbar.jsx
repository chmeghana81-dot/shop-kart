import { useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Heart, Moon, Sun, Menu, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { toggleDarkMode, toggleMobileMenu } from '@redux/slices/uiSlice';
import { cn } from '@utils/helpers';
import { ROUTES } from '@constants/routes';

import IconButton      from '@components/ui/IconButton';
import Badge           from '@components/ui/Badge';
import NavSearchBar    from './NavSearchBar';
import NavUserMenu     from './NavUserMenu';
import NavCategoryMenu from './NavCategoryMenu';

const TOP_LINKS = [
  { label: 'Products',   to: ROUTES.PRODUCTS   },
  { label: 'Categories', to: ROUTES.CATEGORIES },
];

/**
 * Sticky top navigation bar.
 * – Dark-mode toggle
 * – Debounced search
 * – Cart & Wishlist icon badges
 * – User account menu
 * – Mobile hamburger → MobileMenu drawer
 */
export default function Navbar() {
  const dispatch   = useDispatch();
  const darkMode   = useSelector((s) => s.ui.darkMode);
  const cartCount  = useSelector((s) => s.cart?.totalItems       ?? 0);
  const wishCount  = useSelector((s) => s.wishlist?.items?.length ?? 0);

  const handleDarkMode   = useCallback(() => dispatch(toggleDarkMode()),   [dispatch]);
  const handleMobileMenu = useCallback(() => dispatch(toggleMobileMenu()), [dispatch]);

  return (
    <motion.header
      initial={{ y: -64 }}
      animate={{ y: 0    }}
      transition={{ type: 'spring', stiffness: 260, damping: 25 }}
      className={cn(
        'sticky top-0 z-30 w-full',
        'bg-white/90 dark:bg-gray-900/90',
        'backdrop-blur-md',
        'border-b border-gray-200 dark:border-gray-800',
        'shadow-sm'
      )}
    >
      <div className="page-container">
        <div className="flex items-center gap-3 h-16">

          {/* ── Mobile hamburger ── */}
          <IconButton
            tooltip="Open menu"
            onClick={handleMobileMenu}
            className="md:hidden flex-shrink-0"
          >
            <Menu size={22} />
          </IconButton>

          {/* ── Logo ── */}
          <Link
            to={ROUTES.HOME}
            className="flex-shrink-0 flex items-center gap-1 mr-2"
            aria-label="ShopKart home"
          >
            <span className="text-2xl font-extrabold text-primary-500 tracking-tight select-none">
              Shop<span className="text-gray-900 dark:text-white">Kart</span>
            </span>
          </Link>

          {/* ── Category dropdown (desktop) ── */}
          <NavCategoryMenu />

          {/* ── Desktop quick links ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {TOP_LINKS.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── Search bar (grows to fill space) ── */}
          <NavSearchBar className="flex-1 max-w-xl hidden sm:flex" />

          {/* ── Right-side icon cluster ── */}
          <div className="ml-auto flex items-center gap-1">

            {/* Mobile search trigger — links to search page */}
            <IconButton
              tooltip="Search"
              className="sm:hidden"
              onClick={() => window.location.assign(ROUTES.SEARCH)}
            >
              <Search size={20} />
            </IconButton>

            {/* Dark mode toggle */}
            <IconButton tooltip={darkMode ? 'Light mode' : 'Dark mode'} onClick={handleDarkMode}>
              {darkMode
                ? <Sun  size={20} className="text-amber-400" />
                : <Moon size={20} />
              }
            </IconButton>

            {/* Wishlist */}
            <Link
              to={ROUTES.WISHLIST}
              aria-label={`Wishlist — ${wishCount} items`}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              <Heart size={20} />
              <Badge count={wishCount} />
            </Link>

            {/* Cart */}
            <Link
              to={ROUTES.CART}
              aria-label={`Cart — ${cartCount} items`}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              <ShoppingCart size={20} />
              <Badge count={cartCount} />
            </Link>

            {/* User menu */}
            <NavUserMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
