import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@utils/helpers';
import { PLACEHOLDER_IMAGE } from '@constants/app';

/**
 * Product image gallery with:
 * – Thumbnail strip (horizontal scroll)
 * – Main image with fade transition
 * – Zoom on hover (CSS transform)
 * – Lightbox on click (fullscreen overlay)
 * – Keyboard navigation (← →) in lightbox
 */
export default function ImageGallery({ images = [], title = '' }) {
  const allImages = images.length > 0 ? images : [PLACEHOLDER_IMAGE];

  const [selected,  setSelected]  = useState(0);
  const [zoomed,    setZoomed]    = useState(false);
  const [lightbox,  setLightbox]  = useState(false);

  const prev = useCallback(() => setSelected((i) => (i - 1 + allImages.length) % allImages.length), [allImages.length]);
  const next = useCallback(() => setSelected((i) => (i + 1) % allImages.length), [allImages.length]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e) => {
    if (!lightbox) return;
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape')     setLightbox(false);
  }, [lightbox, prev, next]);

  return (
    <div className="flex flex-col gap-3" onKeyDown={handleKeyDown} tabIndex={-1}>

      {/* ── Main image ── */}
      <div
        className="relative aspect-square bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onClick={() => setLightbox(true)}
        role="img"
        aria-label={`${title} — image ${selected + 1} of ${allImages.length}`}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selected}
            src={allImages[selected]}
            alt={`${title} ${selected + 1}`}
            loading="eager"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: zoomed ? 1.12 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full h-full object-contain p-4"
            onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
          />
        </AnimatePresence>

        {/* Zoom hint */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-700/80 flex items-center justify-center shadow text-gray-500">
          <ZoomIn size={15} />
        </div>

        {/* Prev / Next arrows (when multiple images) */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-700/80 flex items-center justify-center shadow hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-700/80 flex items-center justify-center shadow hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-150',
                i === selected
                  ? 'border-primary-500 shadow-sm'
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
              )}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-contain bg-gray-50 dark:bg-gray-800 p-1"
                onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(false)}
          >
            <motion.img
              key={selected}
              src={allImages[selected]}
              alt={`${title} fullscreen`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-bold"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            {allImages.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-white transition-colors">
                  <ChevronLeft size={22} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-white transition-colors">
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <div className="absolute bottom-4 text-white/60 text-sm">
              {selected + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
