import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar      from '@components/layout/Navbar';
import Footer      from '@components/layout/Footer';
import MobileMenu  from '@components/layout/MobileMenu';
import { scrollToTop } from '@utils/helpers';

const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 6  },
  animate: { opacity: 1, y: 0  },
  exit:    { opacity: 0, y: -6 },
};

/**
 * Root layout — wraps every page with Navbar, MobileMenu drawer, animated
 * page transitions, and Footer.
 *
 * Children (pages) are rendered via <Outlet />.
 */
export default function RootLayout() {
  const { pathname } = useLocation();

  // Scroll to top on every navigation
  useEffect(() => {
    scrollToTop('instant');
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Sticky navbar */}
      <Navbar />

      {/* Mobile slide-in drawer (portal-like, sits above everything) */}
      <MobileMenu />

      {/* Animated page content */}
      <main className="flex-1" id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            variants={PAGE_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
