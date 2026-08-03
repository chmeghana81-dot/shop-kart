import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Zap } from 'lucide-react';
import { cn } from '@utils/helpers';
import { ROUTES } from '@constants/routes';

const SLIDES = [
  {
    id: 1,
    tag:      'New Season',
    headline: 'Style That Speaks\nFor Itself',
    sub:      'Explore 10,000+ products from top brands at unbeatable prices.',
    cta:      'Shop Now',
    ctaLink:  ROUTES.PRODUCTS,
    badge:    'Up to 60% off',
    gradient: 'from-orange-500 to-rose-500',
    bg:       'from-orange-50 to-rose-50 dark:from-orange-950/40 dark:to-rose-950/30',
    image:    'https://dummyjson.com/image/600x500/282828/ffffff?text=Fashion+Collection',
    accent:   '#f97316',
  },
  {
    id: 2,
    tag:      'Tech Deals',
    headline: 'Power Up Your\nDigital Life',
    sub:      'Smartphones, laptops, gadgets — all at lowest prices, guaranteed.',
    cta:      'Explore Tech',
    ctaLink:  `${ROUTES.PRODUCTS}?category=smartphones`,
    badge:    'Free Shipping',
    gradient: 'from-blue-500 to-indigo-600',
    bg:       'from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30',
    image:    'https://dummyjson.com/image/600x500/1a1a2e/4fc3f7?text=Tech+Deals',
    accent:   '#3b82f6',
  },
  {
    id: 3,
    tag:      'Home & Living',
    headline: 'Transform Your\nLiving Space',
    sub:      'Furniture, décor and essentials to make every room feel like home.',
    cta:      'Shop Home',
    ctaLink:  `${ROUTES.PRODUCTS}?category=furniture`,
    badge:    'New Arrivals',
    gradient: 'from-emerald-500 to-teal-600',
    bg:       'from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30',
    image:    'https://dummyjson.com/image/600x500/0d1b2a/a8dadc?text=Home+Living',
    accent:   '#10b981',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setCurrent((c) => (c + 1)                 % SLIDES.length), []);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = SLIDES[current];

  return (
    <section
      className={cn('relative overflow-hidden bg-gradient-to-br', slide.bg, 'transition-all duration-700')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero banner"
    >
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[520px] py-12">

          {/* ── Text side ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0   }}
              exit={{    opacity: 0, x: 30  }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="order-2 lg:order-1"
            >
              {/* Tag */}
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white mb-4',
                  `bg-gradient-to-r ${slide.gradient}`
                )}
              >
                <Zap size={11} />
                {slide.tag}
              </span>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight whitespace-pre-line">
                {slide.headline}
              </h1>

              <p className="mt-4 text-base text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
                {slide.sub}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link
                  to={slide.ctaLink}
                  className={cn(
                    'inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white shadow-lg text-sm',
                    `bg-gradient-to-r ${slide.gradient}`,
                    'hover:opacity-90 active:scale-95 transition-all duration-150'
                  )}
                >
                  <ShoppingBag size={17} />
                  {slide.cta}
                </Link>

                <Link
                  to={ROUTES.CATEGORIES}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border-2 border-current text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                >
                  Browse Categories
                </Link>
              </div>

              {/* Badge */}
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                <span className={cn('px-2.5 py-1 rounded-lg text-white text-xs font-bold', `bg-gradient-to-r ${slide.gradient}`)}>
                  {slide.badge}
                </span>
                on thousands of products
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Image side ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${slide.id}`}
              initial={{ opacity: 0, scale: 0.92, x: 30 }}
              animate={{ opacity: 1, scale: 1,    x: 0  }}
              exit={{    opacity: 0, scale: 0.92, x: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                {/* Decorative blob */}
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-20 scale-110"
                  style={{ background: `linear-gradient(135deg, ${slide.accent}, transparent)` }}
                />
                <img
                  src={slide.image}
                  alt={slide.headline.split('\n')[0]}
                  loading="eager"
                  className="relative z-10 w-full max-w-sm lg:max-w-lg rounded-3xl shadow-2xl object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Navigation controls ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              'rounded-full transition-all duration-300',
              i === current
                ? 'w-6 h-2.5 bg-primary-500'
                : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
            )}
          />
        ))}
      </div>
    </section>
  );
}
