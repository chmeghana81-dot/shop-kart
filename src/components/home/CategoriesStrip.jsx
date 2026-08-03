import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn, labelFromSlug } from '@utils/helpers';
import { ROUTES } from '@constants/routes';

// Icon map: category slug → emoji
const CATEGORY_ICONS = {
  smartphones:       '📱',
  laptops:           '💻',
  fragrances:        '🌸',
  skincare:          '✨',
  groceries:         '🛒',
  'home-decoration': '🏠',
  furniture:         '🪑',
  tops:              '👕',
  'womens-dresses':  '👗',
  'womens-shoes':    '👠',
  'mens-shirts':     '👔',
  'mens-shoes':      '👟',
  'mens-watches':    '⌚',
  'womens-watches':  '⌚',
  'womens-bags':     '👜',
  'womens-jewellery':'💍',
  sunglasses:        '🕶️',
  automotive:        '🚗',
  motorcycle:        '🏍️',
  lighting:          '💡',
};

const BG_CLASSES = [
  'bg-orange-50   dark:bg-orange-950/30 text-orange-600',
  'bg-blue-50     dark:bg-blue-950/30   text-blue-600',
  'bg-purple-50   dark:bg-purple-950/30 text-purple-600',
  'bg-green-50    dark:bg-green-950/30  text-green-600',
  'bg-rose-50     dark:bg-rose-950/30   text-rose-600',
  'bg-teal-50     dark:bg-teal-950/30   text-teal-600',
  'bg-amber-50    dark:bg-amber-950/30  text-amber-600',
  'bg-indigo-50   dark:bg-indigo-950/30 text-indigo-600',
];

const SHOW_CATEGORIES = [
  'smartphones', 'laptops', 'womens-dresses', 'mens-shirts',
  'skincare', 'fragrances', 'furniture', 'groceries',
];

export default function CategoriesStrip() {
  return (
    <section className="page-container py-10">
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {SHOW_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to={`${ROUTES.PRODUCTS}?category=${cat}`}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-2xl',
                'hover:scale-105 active:scale-95 transition-transform duration-150',
                BG_CLASSES[i % BG_CLASSES.length]
              )}
            >
              <span className="text-2xl sm:text-3xl" role="img" aria-label={labelFromSlug(cat)}>
                {CATEGORY_ICONS[cat] ?? '🛍️'}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-center leading-tight capitalize">
                {labelFromSlug(cat)}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
