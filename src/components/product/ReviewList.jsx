import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ChevronDown } from 'lucide-react';
import RatingStars from './RatingStars';
import { formatDate } from '@utils/format';
import { cn } from '@utils/helpers';

const PAGE_SIZE = 4;

/**
 * Displays DummyJSON `reviews` array with rating, date, body.
 * Includes "Show more" pagination and a rating distribution bar.
 */
export default function ReviewList({ reviews = [], overallRating = 0 }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (reviews.length === 0) {
    return (
      <p className="text-sm text-gray-400 italic">No reviews yet. Be the first!</p>
    );
  }

  /* ── Rating distribution ── */
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count:   reviews.filter((r) => Math.round(r.rating) === star).length,
    percent: Math.round((reviews.filter((r) => Math.round(r.rating) === star).length / reviews.length) * 100),
  }));

  return (
    <div className="space-y-8">
      {/* ── Summary ── */}
      <div className="flex flex-col sm:flex-row gap-6 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        {/* Overall score */}
        <div className="flex flex-col items-center justify-center min-w-[100px]">
          <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
            {overallRating.toFixed(1)}
          </span>
          <RatingStars rating={overallRating} size={16} className="mt-1" />
          <span className="text-xs text-gray-400 mt-1">{reviews.length} reviews</span>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 space-y-2">
          {dist.map(({ star, count, percent }) => (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="w-4 text-gray-500">{star}</span>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-6 text-gray-400">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Review list ── */}
      <div className="space-y-4">
        <AnimatePresence>
          {reviews.slice(0, visible).map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i < PAGE_SIZE ? i * 0.05 : 0 }}
              className="card p-4"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400 uppercase flex-shrink-0">
                    {review.reviewerName?.[0] ?? '?'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {review.reviewerName ?? 'Anonymous'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {review.date ? formatDate(review.date) : ''}
                    </p>
                  </div>
                </div>
                <RatingStars rating={review.rating ?? 0} size={13} />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {review.comment}
              </p>

              {/* Helpful button (UI only) */}
              <button className="flex items-center gap-1.5 mt-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <ThumbsUp size={12} />
                Helpful
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show more */}
      {visible < reviews.length && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="flex items-center gap-2 mx-auto btn-secondary text-sm"
        >
          Show more reviews
          <ChevronDown size={15} />
        </button>
      )}
    </div>
  );
}
