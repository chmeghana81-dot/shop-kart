import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories, selectCategoriesLoading } from '@redux/slices/productsSlice';
import { usePageTitle } from '@hooks/usePageTitle';
import { ROUTES }       from '@constants/routes';
import { cn, labelFromSlug } from '@utils/helpers';

const CATEGORY_COLORS = [
  'from-orange-400 to-rose-400',
  'from-blue-400 to-indigo-500',
  'from-purple-400 to-pink-500',
  'from-green-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-teal-400 to-cyan-500',
  'from-rose-400 to-pink-500',
  'from-indigo-400 to-violet-500',
];

const CATEGORY_ICONS = {
  smartphones:       '📱', laptops:         '💻', fragrances:       '🌸',
  skincare:          '✨', groceries:       '🛒', 'home-decoration':'🏠',
  furniture:         '🪑', tops:            '👕', 'womens-dresses': '👗',
  'womens-shoes':    '👠', 'mens-shirts':   '👔', 'mens-shoes':     '👟',
  'mens-watches':    '⌚', 'womens-watches':'⌚', 'womens-bags':    '👜',
  'womens-jewellery':'💍', sunglasses:      '🕶️', automotive:       '🚗',
  motorcycle:        '🏍️', lighting:        '💡',
};

export default function CategoriesPage() {
  usePageTitle('All Categories');
  const dispatch   = useDispatch();
  const categories = useSelector(selectCategories);
  const loading    = useSelector(selectCategoriesLoading);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  return (
    <div className="page-container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title mb-2">All Categories</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Browse our complete collection across {categories.length} categories.
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="skeleton h-32 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1    }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`${ROUTES.PRODUCTS}?category=${cat}`}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-3',
                  'h-32 rounded-2xl overflow-hidden',
                  'bg-gradient-to-br',
                  CATEGORY_COLORS[i % CATEGORY_COLORS.length],
                  'shadow-sm hover:shadow-lg hover:scale-105',
                  'transition-all duration-200 group'
                )}
              >
                {/* Icon */}
                <span className="text-4xl filter drop-shadow-sm" role="img" aria-hidden>
                  {CATEGORY_ICONS[cat] ?? '🛍️'}
                </span>
                {/* Label */}
                <span className="text-white font-semibold text-sm text-center px-3 capitalize leading-tight">
                  {labelFromSlug(cat)}
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
