import { usePageTitle }    from '@hooks/usePageTitle';
import HeroSection          from '@components/home/HeroSection';
import CategoriesStrip      from '@components/home/CategoriesStrip';
import FeaturedProducts     from '@components/home/FeaturedProducts';
import FlashSale            from '@components/home/FlashSale';
import TrendingProducts     from '@components/home/TrendingProducts';
import TopBrands            from '@components/home/TopBrands';
import Testimonials         from '@components/home/Testimonials';
import NewsletterBanner     from '@components/home/NewsletterBanner';
import { ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';

const TRUST_BADGES = [
  { icon: Truck,       title: 'Free Delivery',     sub: 'On orders above ₹499'  },
  { icon: ShieldCheck, title: 'Secure Payments',   sub: '100% safe & encrypted' },
  { icon: RefreshCw,   title: 'Easy Returns',      sub: '30-day hassle-free'    },
  { icon: Headphones,  title: '24/7 Support',      sub: 'We\'re always here'    },
];

/**
 * Home page — assembles all home sections.
 * Each section manages its own data fetching and loading state.
 */
export default function HomePage() {
  usePageTitle('Online Shopping — Best Deals & Offers', false);

  return (
    <div>
      {/* ── Hero carousel ── */}
      <HeroSection />

      {/* ── Category quick-links ── */}
      <CategoriesStrip />

      {/* ── Trust badges ── */}
      <div className="border-y border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40">
        <div className="page-container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured products ── */}
      <FeaturedProducts />

      {/* ── Flash sale ── */}
      <FlashSale />

      {/* ── Trending / tabbed ── */}
      <TrendingProducts />

      {/* ── Top brands ── */}
      <TopBrands />

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── Newsletter ── */}
      <NewsletterBanner />
    </div>
  );
}
