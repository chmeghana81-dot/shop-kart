import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@utils/helpers';
import { ROUTES } from '@constants/routes';

/**
 * Centered card layout used by Login and Register pages.
 * Full-screen gradient background with glassmorphism card.
 */
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4',
        'bg-gradient-to-br from-primary-50 via-white to-orange-50',
        'dark:from-gray-950 dark:via-gray-900 dark:to-gray-800'
      )}
    >
      {/* Background decoration */}
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 dark:bg-primary-900/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200 dark:bg-orange-900/20 rounded-full blur-3xl opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to={ROUTES.HOME} className="inline-flex items-center gap-2">
            <ShoppingBag size={28} className="text-primary-500" />
            <span className="text-3xl font-extrabold text-primary-500 tracking-tight">
              Shop<span className="text-gray-900 dark:text-white">Kart</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl shadow-2xl px-8 py-10">
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>

          {/* Form content */}
          {children}
        </div>

        {/* Footer link (e.g., "Don't have an account?") */}
        {footer && (
          <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
            {footer}
          </p>
        )}
      </motion.div>
    </div>
  );
}
