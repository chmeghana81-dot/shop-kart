import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingBag, LogOut, ChevronDown, Settings } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@utils/helpers';
import { ROUTES } from '@constants/routes';
import { logout } from '@redux/slices/authSlice';

const MENU_ITEMS = [
  { label: 'My Profile',  icon: User,        to: ROUTES.PROFILE },
  { label: 'My Orders',   icon: ShoppingBag, to: ROUTES.ORDERS  },
  { label: 'Settings',    icon: Settings,    to: ROUTES.PROFILE },
];

/**
 * User avatar / "Sign In" button with dropdown.
 * Auth state comes from redux auth slice (added in Feature 4).
 * For now we read a safe fallback so the layout renders without auth slice.
 */
export default function NavUserMenu() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [open, setOpen]   = useState(false);
  const menuRef           = useRef(null);

  // Auth slice may not exist yet — fallback gracefully
  const user  = useSelector((s) => s.auth?.user  ?? null);
  const token = useSelector((s) => s.auth?.token ?? null);

  const isLoggedIn = Boolean(token);

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

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
    setOpen(false);
  }, [dispatch, navigate]);

  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to={ROUTES.LOGIN}
          className="btn-secondary text-sm py-1.5 px-4"
        >
          Sign In
        </Link>
        <Link
          to={ROUTES.REGISTER}
          className="btn-primary text-sm py-1.5 px-4 hidden sm:inline-flex"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'text-sm font-medium text-gray-700 dark:text-gray-200',
          'transition-colors duration-150'
        )}
      >
        {/* Avatar */}
        <span className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold uppercase select-none">
          {user?.firstName?.[0] ?? user?.username?.[0] ?? 'U'}
        </span>
        <span className="hidden md:block max-w-[120px] truncate">
          {user?.firstName ?? user?.username ?? 'Account'}
        </span>
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1      }}
            exit={{    opacity: 0, y: -8, scale: 0.97   }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute right-0 top-full mt-2 w-52',
              'card shadow-lg py-1 z-50'
            )}
            role="menu"
          >
            {/* User info header */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.firstName
                  ? `${user.firstName} ${user.lastName ?? ''}`
                  : user?.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email ?? ''}
              </p>
            </div>

            {/* Menu items */}
            <ul className="py-1">
              {MENU_ITEMS.map(({ label, icon: Icon, to }) => (
                <li key={label} role="menuitem">
                  <Link
                    to={to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5',
                      'text-sm text-gray-700 dark:text-gray-300',
                      'hover:bg-gray-50 dark:hover:bg-gray-800/60',
                      'transition-colors duration-100'
                    )}
                  >
                    <Icon size={15} className="text-gray-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Logout */}
            <div className="border-t border-gray-100 dark:border-gray-700 py-1">
              <button
                onClick={handleLogout}
                role="menuitem"
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-2.5',
                  'text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30',
                  'transition-colors duration-100'
                )}
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
