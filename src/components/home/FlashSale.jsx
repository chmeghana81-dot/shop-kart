import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import productService from '@services/productService';
import ProductCard    from '@components/common/ProductCard';
import SkeletonCard   from '@components/common/SkeletonCard';
import SectionHeader  from '@components/common/SectionHeader';
import { ROUTES }     from '@constants/routes';
import { cn }         from '@utils/helpers';

/* ── Countdown timer ─────────────────────────────────────── */
const SALE_HOURS = 8;  // flash sale lasts 8 hours from page load

function useCountdown(hours) {
  const end = useRef(Date.now() + hours * 3_600_000);
  const [left, setLeft] = useState(hours * 3600);

  useEffect(() => {
    const tick = setInterval(() => {
      const secs = Math.max(0, Math.floor((end.current - Date.now()) / 1000));
      setLeft(secs);
      if (secs === 0) clearInterval(tick);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const h  = String(Math.floor(left / 3600)).padStart(2, '0');
  const m  = String(Math.floor((left % 3600) / 60)).padStart(2, '0');
  const s  = String(left % 60).padStart(2, '0');
  return { h, m, s };
}

const TimeBox = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-xl md:text-2xl font-extrabold text-white bg-gray-900/50 rounded-lg px-2.5 py-1 min-w-[2.8rem] text-center tabular-nums">
      {value}
    </span>
    <span className="text-[10px] text-white/70 mt-0.5 uppercase tracking-wider">{label}</span>
  </div>
);

export default function FlashSale() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const { h, m, s } = useCountdown(SALE_HOURS);

  useEffect(() => {
    let cancelled = false;
    productService
      .getAll({ limit: 6, skip: 10 })
      .then(({ data }) => {
        if (!cancelled) setProducts(data.products ?? []);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="bg-gradient-to-br from-rose-500 to-orange-500 py-10">
      <div className="page-container">

        {/* Header with countdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap size={22} className="text-white fill-white" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">Flash Sale</h2>
              <p className="text-white/80 text-sm">Limited time — grab it while stocks last!</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2">
            <span className="text-white/80 text-sm font-medium mr-1 hidden sm:block">Ends in</span>
            <TimeBox value={h} label="hrs"  />
            <span className="text-white text-xl font-bold mb-4">:</span>
            <TimeBox value={m} label="min"  />
            <span className="text-white text-xl font-bold mb-4">:</span>
            <TimeBox value={s} label="sec"  />
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} className="bg-white/90" />
              ))
            : products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))
          }
        </div>
      </div>
    </section>
  );
}
