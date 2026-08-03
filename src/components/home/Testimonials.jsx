import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import SectionHeader from '@components/common/SectionHeader';
import { cn } from '@utils/helpers';

const TESTIMONIALS = [
  {
    id: 1,
    name:   'Priya Sharma',
    role:   'Verified Buyer',
    avatar: 'https://dummyjson.com/image/64x64/ff6b6b/ffffff?text=PS',
    rating: 5,
    text:   'ShopKart completely changed how I shop online. The prices are unbeatable and delivery was lightning fast. Highly recommend to everyone!',
    product:'Wireless Earbuds',
  },
  {
    id: 2,
    name:   'Rahul Mehta',
    role:   'Verified Buyer',
    avatar: 'https://dummyjson.com/image/64x64/4facfe/ffffff?text=RM',
    rating: 5,
    text:   'Best online shopping experience I\'ve had. The product quality matched exactly what was shown. Will definitely be a repeat customer.',
    product:'Laptop Stand',
  },
  {
    id: 3,
    name:   'Ananya Patel',
    role:   'Verified Buyer',
    avatar: 'https://dummyjson.com/image/64x64/a8edea/333333?text=AP',
    rating: 4,
    text:   'Great selection, smooth checkout, and fast delivery. Customer service resolved my query within minutes. Love this platform!',
    product:'Skincare Kit',
  },
  {
    id: 4,
    name:   'Vikram Singh',
    role:   'Verified Buyer',
    avatar: 'https://dummyjson.com/image/64x64/fddb92/333333?text=VS',
    rating: 5,
    text:   'I\'ve saved thousands since switching to ShopKart. The flash sales are incredible — got a Samsung phone for almost half price!',
    product:'Samsung Galaxy',
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[idx];

  return (
    <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
      <div className="page-container">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Trusted by over 2 million shoppers across India"
          className="text-center justify-center [&>div]:text-center"
        />

        <div className="relative max-w-2xl mx-auto mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40  }}
              animate={{ opacity: 1, x: 0   }}
              exit={{    opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl p-8 md:p-10 text-center shadow-xl"
            >
              {/* Quote icon */}
              <Quote size={36} className="text-primary-200 dark:text-primary-800 mx-auto mb-4" />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={18}
                    className={s <= t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed italic mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Product badge */}
              <span className="inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-xs font-semibold mb-6">
                Purchased: {t.product}
              </span>

              {/* Author */}
              <div className="flex items-center justify-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-200"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={cn(
                'rounded-full transition-all duration-300',
                i === idx ? 'w-6 h-2.5 bg-primary-500' : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
