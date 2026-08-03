import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeader from '@components/common/SectionHeader';
import { ROUTES }    from '@constants/routes';
import { cn }        from '@utils/helpers';

const BRANDS = [
  { name: 'Apple',     slug: 'Apple',     bg: 'bg-gray-100 dark:bg-gray-800'   },
  { name: 'Samsung',   slug: 'Samsung',   bg: 'bg-blue-50  dark:bg-blue-950/30' },
  { name: 'Huawei',    slug: 'Huawei',    bg: 'bg-red-50   dark:bg-red-950/30'  },
  { name: 'OPPO',      slug: 'OPPO',      bg: 'bg-green-50 dark:bg-green-950/30'},
  { name: 'Maybelline',slug: 'Maybelline',bg: 'bg-pink-50  dark:bg-pink-950/30' },
  { name: 'L\'Oreal',  slug: 'L\'Oreal',  bg: 'bg-purple-50dark:bg-purple-950/30'},
  { name: 'Chanel',    slug: 'Chanel',    bg: 'bg-amber-50 dark:bg-amber-950/30'},
  { name: 'Nike',      slug: 'Nike',      bg: 'bg-orange-50dark:bg-orange-950/30'},
];

export default function TopBrands() {
  return (
    <section className="page-container py-10">
      <SectionHeader
        title="Top Brands"
        subtitle="Shop directly from your favourite brands"
        href={ROUTES.PRODUCTS}
        cta="All Brands"
      />

      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {BRANDS.map((brand, i) => (
          <motion.div
            key={brand.slug}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`${ROUTES.PRODUCTS}?brand=${encodeURIComponent(brand.slug)}`}
              className={cn(
                'flex flex-col items-center justify-center',
                'h-16 rounded-2xl',
                'hover:ring-2 hover:ring-primary-400 hover:shadow-md',
                'transition-all duration-200',
                brand.bg
              )}
            >
              <span className="text-xs font-bold text-gray-700 dark:text-gray-200 text-center px-2 leading-tight">
                {brand.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
